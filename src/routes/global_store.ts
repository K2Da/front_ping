import { writable } from 'svelte/store'
import { browser } from '$app/env';

export const currentUrl = writable('')

export function ga_view(url: string, title: string): void {
  if (browser) {
    // @ts-ignore
    gtag('set', 'page_path', window.location.pathname)
    // @ts-ignore
    gtag('set', 'page_title', title)
    // @ts-ignore
    gtag('event', 'page_view')
  }
}