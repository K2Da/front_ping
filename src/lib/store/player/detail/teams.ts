import { derived } from 'svelte/store'
import { apiData } from '$lib/store/player/detail'

export type Team = {
  name: string
  tournament_count: number
  first_match_at: number
  last_match_at: number
}

export const teamsData = derived(apiData, ($apiData) => {
  if ($apiData == null) return []

  const teams:  Record<string, Team> = {}
  for (const tournament of $apiData.tournaments) {
    const name = tournament.team_current_name
    if (teams[name] === undefined) {
      teams[name] = {
        name: name, tournament_count: 1,
        last_match_at: tournament.tournament_date,
        first_match_at: tournament.tournament_date
      }
    } else {
      teams[name].tournament_count += 1
      teams[name].last_match_at = Math.max(tournament.tournament_date, teams[name].last_match_at)
      teams[name].first_match_at = Math.min(tournament.tournament_date, teams[name].first_match_at)
    }
  }

  return Object.values(teams).sort((t) => -t.last_match_at)
})