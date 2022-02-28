import { playerMaster } from '$lib/store/global'
import { writable, derived } from 'svelte/store'

export const page_size = 200

export const showRecord     = writable(true)
export const showTournament = writable(false)
export const showSns        = writable(false)
export const pageNo         = writable(1)

export const filterString = writable('')

export const playerList = derived([playerMaster, filterString], ([$playerMaster, $filterString]) => {
  if ($playerMaster.players.length > 0) {
    if ($filterString) {
      return $playerMaster.players.filter(
        s => {
          let target = [s.name, s.latest.team]
          if (s.data && s.data?.aliases) {
            target = target.concat(s.data.aliases)
          }
          return target.filter(
            f => f.toLowerCase().includes($filterString.toLowerCase())
          ).length > 0
        }
      )
    } else {
      return $playerMaster.players
    }
  }

  return []
})