import type { PlayerIndex } from '$lib/api/PlayerIndex'
import { Writable, writable, derived } from 'svelte/store'
import { browser } from '$app/env'

export const windowWidth = writable(0)
export const windowHeight = writable(0)
export const slimMode = derived(windowWidth, ($windowWidth) => {
  return $windowWidth <= 1280
})
export const playerMaster: Writable<MasterData> = writable({
  players: [], player_dic: {}, tournaments: []
})
export const tournamentMaster = writable(null)

export type MasterData = {
  players: PlayerIndex[]
  player_dic: Record<string, PlayerIndex>
}

export function loadMaster(): null {
  fetch("/center_pin_g/data/player/players.json")
    .then(response => response.json())
    .then(data => playerMaster.set({ players: data, player_dic: player_dic(data)}))
    .catch((e) => console.log(e))

  fetch("/center_pin_g/data/tournament/tournaments.json")
    .then(response => response.json())
    .then(data => { tournamentMaster.set(data) })
    .catch((e) => console.log(e))

  return null
}

function player_dic(players: PlayerIndex[]): Record<string, PlayerIndex> {
  const ret: Record<string, PlayerIndex> = {}
  for (const p of players) {
    ret[p.name] = p
  }
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