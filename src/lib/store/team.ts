import { writable, derived } from 'svelte/store'
import { teamMaster } from '$lib/store/global'

export const page_size = 200
export const pageNo = writable(1)
export const filterString = writable('')

export const teamList = derived(
  [teamMaster, filterString], ([$teamMaster, $filterString]
  ) => {
  if ($teamMaster.list) {
    if ($filterString) {
      return $teamMaster.list.filter(
        t => [t.name].filter(
          f => f.toLowerCase().includes($filterString.toLowerCase())
        ).length > 0
      )
    } else {
      return $teamMaster.list
    }
  }

  return []
})