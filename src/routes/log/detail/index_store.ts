import { Writable, writable } from 'svelte/store'

export const logHash: Writable<(string|null)> = writable('')
export const apiData = writable(null)

export function set_api_data(data: any): void {
  apiData.set(data)
}