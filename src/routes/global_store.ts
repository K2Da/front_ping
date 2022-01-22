import { writable, derived } from 'svelte/store'
import { browser } from '$app/env'

export const currentUrl = writable('')
export const windowWidth = writable(0)
export const slimMode = derived(windowWidth, ($windowWidth) => {
  return $windowWidth <= 1280
})

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