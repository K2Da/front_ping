import type { Writable } from 'svelte/store'
import type { TeamDetail, TeamTournament } from '$lib/api/TeamDetail'
import { writable } from 'svelte/store'

export const teamHash: Writable<(string|null)> = writable('')
export const apiData: Writable<TeamDetailView|null> = writable(null)

export type TeamDetailView = TeamDetail & {
  players: string[]
  reversed_tournaments: TeamTournament[]
  player_stats: Record<string, { tournament: number, count: number }>
}

export function set_api_data(data: TeamDetail): void {
  const player_stats: Record<string, { tournament: number, count: number }> = {};

  for (const [i, t] of data.tournaments.entries()) {
    for (const p of t.player_list){
      if (player_stats[p] === undefined) {
        player_stats[p] = { tournament: i, count: 0 }
      }
      player_stats[p].count += 1
    }
  }

  const players = Object.keys(player_stats)
  players.sort((p1: string, p2: string) =>
    (player_stats[p1].tournament === player_stats[p2].tournament)
      ? player_stats[p2].count - player_stats[p1].count
      : player_stats[p1].tournament - player_stats[p2].tournament
  )

  if (!data.matches) data.matches = [];

  for (const m of data.matches) {
    m.wl = m.opponent_team_key === m.loser_key
    m.score_text = m.wl ? `${m.winner_score} - ${m.loser_score}` : `${m.loser_score} - ${m.winner_score}`
  }

  const reversed_tournaments = [...data.tournaments].reverse()
  const view_data: TeamDetailView = { ...data, players, reversed_tournaments, player_stats }

  apiData.set(view_data)
}