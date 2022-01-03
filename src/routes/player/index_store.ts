import { writable, derived } from 'svelte/store'

export const apiData = writable([])

export const showRecord = writable(true)
export const showTournament = writable(false)
export const showSns = writable(false)

export const filterString = writable('')

export const playerList = derived([apiData, filterString], ([$apiData, $filterString]) => {
  if ($apiData) {
    if ($filterString) {
      return $apiData.filter(
        s => [s.name, s.latest.team].filter(
          f => f.toLowerCase().includes($filterString.toLowerCase())
        ).length > 0
      )
    } else {
      return $apiData
    }
  }

  return []
})