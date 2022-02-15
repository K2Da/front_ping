import { Writable, writable } from 'svelte/store'

export const teamHash: Writable<(string|null)> = writable('')
export const apiData = writable(null)

export function set_api_data(data: any): void {
  const player_stats: { [name: string]: { tournament: number, count: number } } = {};

  for (const [i, t] of data.tournaments.entries()) {
    for (const p of t.player_list){
      if (player_stats[p] === undefined) {
        player_stats[p] = { tournament: i, count: 0 }
      }
      player_stats[p].count += 1
    }
  }

  data.players = Object.keys(player_stats)
  data.players.sort((p1: string, p2: string) => {
    if (player_stats[p1].tournament === player_stats[p2].tournament) {
      return player_stats[p1].count < player_stats[p2].count
    } else {
      return player_stats[p1].tournament > player_stats[p2].tournament
    }
  })
  data.reversed_tournaments = [...data.tournaments].reverse()

  apiData.set(data)
}