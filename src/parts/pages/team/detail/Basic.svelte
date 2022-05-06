<script lang="ts">
  import { apiData } from '$lib/store/team/detail'
  import Span from '/src/parts/Span.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TournamentsStats from '/src/parts/TournamentsStats.svelte'

  function statsToNotes(player_stats: Record<string, { tournament: number, count: number }>) {
    const ret = {}
    for (const player in player_stats) ret[player] = player_stats[player].count
    return ret
  }

  function sortedPlayers(players: string[], player_stats: Record<string, { tournament: number, count: number }>) {
    return players.slice().sort((a, b) => player_stats[b].count - player_stats[a].count)
  }
</script>

<dl>
  <dt>活動期間</dt>
  <dd><Span date1={$apiData.team.first_tournament_date} date2={$apiData.team.latest_tournament_date} length=true /></dd>

  <dt>戦績</dt>
  <dd><TournamentsStats stats={$apiData.team} /></dd>

  {#if $apiData.team.names.length > 0}
    <dt>大会登録名</dt>
    <dd>{$apiData.team.names.join(", ")}</dd>
  {/if}

  <dt>歴代メンバー(出場数)</dt>
  <dd>
    <PlayersLine players={sortedPlayers($apiData.players, $apiData.player_stats)} notes={statsToNotes($apiData.player_stats)} />
  </dd>
</dl>
