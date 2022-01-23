import { writable } from 'svelte/store'

export const playerHash = writable('')
export const apiData = writable(null)

export function set_api_data(data: any): void {

  for (const m of data.matches) {
    m.wl = m.opponent_team_key === m.loser_key
    m.score_text = m.wl
      ? `${m.winner_score} - ${m.loser_score}`
      : `${m.loser_score} - ${m.winner_score}`
  }

  apiData.set(data)
}