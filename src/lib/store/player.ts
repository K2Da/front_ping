import { playerMaster } from '$lib/store/global'
import { writable, derived } from 'svelte/store'
import type { PlayerIndex } from '$lib/api/PlayerIndex'

export const page_size = 200

export const showTournament = writable(false)
export const showSns        = writable(false)
export const pageNo         = writable(1)

export const filterString = writable('')

export type RankedPlayer = PlayerIndex & {
  rank: number
}

export const playerList = derived(
  [playerMaster, filterString],
  ([$playerMaster, $filterString]) => {
  if ($playerMaster.players.length === 0) return []
    const ranked_players = []
    let prev = { rank: 0, rating: 0 }
    for (const [current, p] of $playerMaster.players.entries()) {
      const rank = p.rating === prev.rating ? prev.rank : current + 1
      ranked_players.push({ ...p, rank })
      prev = { rank, rating: p.rating }
    }

    if ($filterString) {
      return ranked_players.filter(
        s => {
          let target = [s.name, s.latest.team]
          if (s.data) {
            if (s.data && s.data?.aliases) target = target.concat(s.data.aliases)
            if (s.data.twitter) target.push(s.data.twitter);
            if (s.data.twitch) target.push(s.data.twitch);
          }

          return target.filter(
            f => f.toLowerCase().includes($filterString.toLowerCase())
          ).length > 0
        }
      )
    } else {
      return ranked_players
    }
  }
)