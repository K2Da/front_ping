import type { PlayerIndex } from '$lib/api/PlayerIndex'
import { Writable, writable, derived } from 'svelte/store'
import { browser } from '$app/env'

export const windowWidth = writable(0)
export const slimMode = derived(windowWidth, ($windowWidth) => {
  return $windowWidth <= 1280
})
export const masterData: Writable<MasterData> = writable({ players: [] })

export type MasterData = {
  players: PlayerIndex[]
}

export function loadMaster(): null {
  fetch("/center_pin_g/data/player/players.json")
    .then(response => response.json())
    .then(data => masterData.set({ ...masterData, players: data }))
    .catch(() => [])
  return null
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