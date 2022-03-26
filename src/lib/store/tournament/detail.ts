import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export const tournamentKey: Writable<(string|null)> = writable('')
export const apiData = writable(null)
