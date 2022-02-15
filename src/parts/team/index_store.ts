import { writable, derived } from 'svelte/store'

export const page_size = 200
export const apiData = writable([])
export const pageNo = writable(1)
export const filterString = writable('')

export const teamList = derived(
  [apiData, filterString], ([$apiData, $filterString]
  ) => {
  if ($apiData) {
    if ($filterString) {
      return $apiData.filter(
        t => [t.name].filter(
          f => f.toLowerCase().includes($filterString.toLowerCase())
        ).length > 0
      )
    } else {
      return $apiData
    }
  }

  return []
})