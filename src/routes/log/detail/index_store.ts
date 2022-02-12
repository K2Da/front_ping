import type * as api from '$lib/api/types'
import { Writable, writable } from 'svelte/store'

export const logHash: Writable<(string|null)> = writable('')
export const apiData: Writable<api.LogData|null> = writable(null)
export const selectedTeams: Writable<[string, string]|null> = writable(null)
export const teamRelation: Writable<TeamRelation> = writable({})

export type TeamRelation = {
  [teams: string]: { matches: api.Match[], wl: [number, number]}
}

export function set_api_data(data: api.LogData): void {
  apiData.set(data)
  const team_relation: TeamRelation = {}

  for (const t1 of data.teams) {
    for (const t2 of data.teams) {
      team_relation[`${t1.team_name}\t${t2.team_name}`] = { matches: [], wl: [0, 0] }
    }
  }

  for (const match of data.team_matches) {
    const w_key = `${match.winner_current_name}\t${match.loser_current_name}`
    const l_key = `${match.loser_current_name}\t${match.winner_current_name}`

    team_relation[w_key].wl[0] += 1
    team_relation[w_key].matches.push(match)
    team_relation[l_key].wl[1] += 1
    team_relation[l_key].matches.push(match)
  }
  teamRelation.set(team_relation)
}

export function tk(t1: string, t2: string) {
  return `${t1}\t${t2}`
}
