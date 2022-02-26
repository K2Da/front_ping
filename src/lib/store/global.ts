import { fetch_data } from '$lib/util'
import type { PlayerIndex } from '$lib/api/PlayerIndex'
import type { TeamIndex } from '$lib/api/TeamIndex'
import type { TournamentIndex } from '$lib/api/TournamentIndex'
import { Writable, writable, derived } from 'svelte/store'
import { browser } from '$app/env'

export const windowWidth = writable(0)
export const windowHeight = writable(0)
export const slimMode = derived(windowWidth, ($windowWidth) => {
  return $windowWidth <= 1280
})

export const playerMaster: Writable<PlayerMaster> = writable({ players: [], dic: {} })
export type PlayerMaster = {
  players: PlayerIndex[]
  dic: Record<string, PlayerIndex>
}

export const tournamentMaster: Writable<TournamentMaster> = writable({ list: [], dic: {} })
export type TournamentMaster = {
  list: TournamentIndex[]
  dic: Record<string, TournamentIndex>
}

export const teamMaster: Writable<TeamMaster> = writable({ list: [], dic: {} })
export type TeamMaster = {
  list: TeamIndex[]
  dic: Record<string, TeamIndex>
}

export function loadMaster(): void {
  fetch_data("player/players.json")
    .then(response => response.json())
    .then(data => playerMaster.set({ players: data, dic: player_dic(data) }))
    .catch((e) => console.log(e))

  fetch_data("tournament/tournaments.json")
    .then(response => response.json())
    .then(data => tournamentMaster.set({
      list: data.tournaments, dic: tournament_dic(data.tournaments)
    }))
    .catch((e) => console.log(e))

  fetch_data("team/teams.json")
    .then(response => response.json())
    .then(data => teamMaster.set({ list: data, dic: team_dic(data) }))
    .catch((e) => console.log(e))
}

function player_dic(players: PlayerIndex[]): Record<string, PlayerIndex> {
  const ret: Record<string, PlayerIndex> = {}
  for (const p of players) ret[p.name] = p
  return ret
}

function team_dic(teams: TeamIndex[]): Record<string, TeamIndex> {
  const ret: Record<string, TeamIndex> = {}
  for (const t of teams) {
    for (const alias of t.names) {
      ret[alias] = t
    }
  }
  return ret
}

function tournament_dic(tournaments: TournamentIndex[]): Record<string, TournamentIndex> {
  const ret: Record<string, TournamentIndex> = {}
  for (const t of tournaments) ret[t.key] = t
  return ret
}

export function ga_view(title: string): void {
  if (browser) {
    // @ts-ignore
    gtag('set', 'page_path', window.location.pathname)
    // @ts-ignore
    gtag('set', 'page_title', title)
    // @ts-ignore
    gtag('event', 'page_view')
  }
}