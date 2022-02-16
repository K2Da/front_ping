import type { PlayerDetail } from '$lib/api/PlayerDetail'
import { Writable, writable } from 'svelte/store'

export const playerHash: Writable<(string|null)> = writable('')
export const apiData: Writable<(PlayerDetail|null)> = writable(null)

export function set_api_data(data: PlayerDetail): void {
  for (const m of data.matches) {
    m.wl = m.opponent_team_key === m.loser_key
    m.score_text = m.wl
      ? `${m.winner_score} - ${m.loser_score}`
      : `${m.loser_score} - ${m.winner_score}`
  }

  apiData.set(data)
}