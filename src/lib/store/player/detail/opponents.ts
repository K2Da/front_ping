import { derived } from 'svelte/store'
import { apiData } from "$lib/store/player/detail"

export type MergedOpponents = {
  names: string[]
  win: number
  lose: number
}

type Opponent = {
  name: string
  win: number
  lose: number
  matches: string[]
}

export const opponentsData = derived(apiData, ($apiData) => {
  if ($apiData == null) return []

  const opponents_dic: { [name: string]: Opponent } = {}

  for (const match of $apiData.matches) {
    for (const name of match.opponents_list) {
      const win = match.opponent_team_key === match.loser_key
      const match_key = `${match.tnmt_key}/${match.bracket}/${match.round}`

      if (opponents_dic[name] === undefined) {
        opponents_dic[name] = {
          name: name, win: win ? 1: 0, lose: win ? 0 : 1,
          matches: [match_key]
        }
      } else {
        opponents_dic[name].matches.push(match_key)
        win ? opponents_dic[name].win += 1 : opponents_dic[name].lose += 1
      }
    }
  }

  const opponents = Object.values(opponents_dic)

  return [...new Set(Object.values(opponents_dic).map(m => m.matches.join("\t")))]
    .map(j => j.split("\t")).sort((a, b) => b.length - a.length)
    .filter(p => p.length > 1).map((pattern) => {
      const team_up = opponents.filter(o => o.matches.join('\t') === pattern.join('\t'))
      return {
        names: team_up.map(m => m.name),
        win: team_up[0].win,
        lose: team_up[0].lose
      }
    }).sort((a, b) => b.win - a.win)
})