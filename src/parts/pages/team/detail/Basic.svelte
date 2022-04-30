<script lang="ts">
  import { apiData } from '$lib/store/team/detail'
  import { slimMode } from '$lib/store/global'
  import Span from '/src/parts/Span.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TeamStats from '/src/parts/TeamStats.svelte'

  function statsToNotes(player_stats: Record<string, { tournament: number, count: number }>) {
    const ret = {}
    for (const player in player_stats) ret[player] = player_stats[player].count
    return ret
  }

  function sortedPlayers(players: string[], player_stats: Record<string, { tournament: number, count: number }>) {
    return players.sort((a, b) => player_stats[b].count - player_stats[a].count)
  }
</script>

<style>
  p { padding-left: 1em; }
</style>

{#if $slimMode}
  <h4>活動期間</h4>
  <p><Span date1={$apiData.team.first_tournament_date} date2={$apiData.team.latest_tournament_date} length=true /></p>

  <h4>戦績</h4>
  <p><TeamStats stats={$apiData.team} /></p>

  <h4>大会登録チーム名</h4>
  <p>{$apiData.team.names.join(", ")}</p>

  <h4>歴代メンバー(出場数)</h4>
  <p>
    <PlayersLine players={sortedPlayers($apiData.players, $apiData.player_stats)} notes={statsToNotes($apiData.player_stats)} />
  </p>
{:else}
  <table>
    <thead style="border-bottom: 0">
    <tr>
      <th style='width: 20%'></th>
      <th style='width: 80%'></th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th class="tal">活動期間</th>
      <td class="tal">
        <Span date1={$apiData.team.first_tournament_date} date2={$apiData.team.latest_tournament_date} length=true />
      </td>
    </tr>
    <tr>
      <th class="tal">戦績</th>
      <td class="tal">
        {#if $apiData.team.win !== 0 || $apiData.team.lose !== 0}
          <TeamStats stats={$apiData.team} />
        {:else}
          -
        {/if}
      </td>
    </tr>
    <tr>
      <th class="tal">大会登録チーム名</th>
      <td class="tal">{$apiData.team.names.join(", ")}</td>
    </tr>
    <tr>
      <th class="tal">歴代メンバー(出場数)</th>
      <td class="tal">
        <PlayersLine players={sortedPlayers($apiData.players, $apiData.player_stats)} notes={statsToNotes($apiData.player_stats)} />
      </td>
    </tr>
    </tbody>
  </table>
{/if}