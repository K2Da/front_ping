import { derived } from 'svelte/store'
import { apiData } from "$lib/store/player/detail"

export type MergedMates = {
  names: string[]
  entry: number
  win: number
  lose: number
}

type Mate = {
  name: string
  tournaments: string[]
}

type Tournament = {
  key: string
  win: number
  lose: number
}

export const matesData = derived(apiData, ($apiData) => {
  if ($apiData == null) return []

  const mates_dic: { [name: string]: Mate } = {}
  const tournaments: Tournament[] = []

  for (const tournament of $apiData.tournaments) {
    const t: Tournament = { key: tournament.tournament_key, win: 0, lose: 0 }

    for (const match of $apiData.matches) {
      if (match.tnmt_key !== tournament.tournament_key) continue
      match.opponent_team_key === match.loser_key
        ? t.win += 1
        : t.lose += 1
    }

    for (const name of tournament.mate_list) {
      mates_dic[name] === undefined
        ? mates_dic[name] = { name: name, tournaments: [tournament.tournament_key] }
        : mates_dic[name].tournaments.push(tournament.tournament_key)
    }

    tournaments.push(t)
  }

  const mates = Object.values(mates_dic)

  const tournament_patterns = [
    ...new Set(Object.values(mates_dic).map(m => m.tournaments.join("\t")))
  ].map(j => j.split("\t")).sort((a, b) => b.length - a.length)

  return tournament_patterns.map((pattern) => {
    const tournament = tournaments.filter(t => pattern.includes(t.key))
    return {
      names: mates
        .filter(m => m.tournaments.sort().join("\t") === pattern.sort().join("\t"))
        .map(m => m.name),
      entry: pattern.length,
      win: tournament.reduce((sum, t) => sum + t.win, 0),
      lose: tournament.reduce((sum, t) => sum + t.lose, 0)
    } as MergedMates
  })
})