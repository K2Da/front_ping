import type * as api from '$lib/api/types'
import { Writable, writable } from 'svelte/store'

export const logHash: Writable<(string|null)> = writable('')
export const apiData: Writable<api.LogData|null> = writable(null)
export const teamRelation: Writable<TeamRelation> = writable({})
export const selectedTeams: Writable<SelectedTeams|null> = writable(null)
export const selectedMembers: Writable<SelectedMembers|null> = writable(null)

export type SelectedTeams = {
  left: SelectedTeam
  right: SelectedTeam
  member_relation: MemberRelationDic
  column_width: number
}

export type SelectedMembers = {
  left: string
  right: string
  relation: MemberRelation
}

export type SelectedTeam = {
  name: string
  members: string[]
}

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

export type MemberRelation = {
  matches: api.Match[]
  wl: [number, number]
  mix_teams: api.MembersTeam[]
}

export type MemberRelationDic = {
  [members: string]: MemberRelation
}

export function select_team(apiData: api.LogData, team1: string, team2: string): void {
  const left_members = apiData.teams.filter(t => t.team_name == team1).flatMap(t => t.members)
  const right_members = apiData.teams.filter(t => t.team_name == team2).flatMap(t => t.members)
  const member_relation = member_matches(apiData, left_members, right_members)
  selectedTeams.set({
    left: { name: team1, members: left_members },
    right: { name: team2, members: right_members },
    column_width: Math.floor(100.0 / (right_members.length + 1)),
    member_relation
  })
  selectedMembers.set(null)
}

export function select_members(selectedTeams: SelectedTeams, member1: string, member2: string): void {
  selectedMembers.set({
    left: member1,
    right: member2,
    relation: selectedTeams.member_relation[`${member1}\t${member2}`]
  })
}

function member_matches(apiData: api.LogData, left_members: string[], right_members: string[]) {
  const ret: MemberRelationDic = {}

  for (const l of left_members) {
    for (const r of right_members) {
      const key = `${l}\t${r}`
      ret[key] = { matches: [], wl: [0, 0], mix_teams: [] }
    }
  }
  for (const match of apiData.member_matches) {
    for (const l of left_members) {
      for (const r of right_members) {
        const key = `${l}\t${r}`
        if (match.winner_players.includes(l) && match.loser_players.includes(r)) {
          ret[key].wl[0] += 1
          ret[key].matches.push(match)
        }

        if (match.winner_players.includes(r) && match.loser_players.includes(l)) {
          ret[key].wl[1] += 1
          ret[key].matches.push(match)
        }
      }
    }
  }
  for (const match of apiData.mix_teams) {
    for (const l of left_members) {
      for (const r of right_members) {
        if (match.team_players.includes(l) && match.team_players.includes(r)) {
          const key = `${l}\t${r}`
          ret[key].mix_teams.push(match)
        }
      }
    }
  }
  console.log(ret)
  return ret
}

export function tk(t1: string, t2: string): string {
  return `${t1}\t${t2}`
}
