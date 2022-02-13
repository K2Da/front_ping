<script lang="ts">
  import { apiData } from './index_store'
  import PlayerName from '/src/parts/PlayerName.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
</script>

{#if $apiData}
  <table style="width: 100%">
    <thead>
      <tr>
        <th colspan="2"></th>
        <th colspan={$apiData.reversed_tournaments.length + 1} class="tal">参加大会#</th>
      </tr>
      <tr>
        <th style="width: 10em"></th>
        <th style="width: 5em">rating</th>
        {#each $apiData.reversed_tournaments as t, i}
          <th style="width: 2em" >
            <TournamentName
              name={$apiData.reversed_tournaments.length - i}
              key={t.tournament_key}
              official={false}
            />
          </th>
        {/each}
        <th class="tal">最新チーム</th>
      </tr>
    </thead>
    <tbody>
      {#each $apiData.players as p}
        <tr>
          <td class="tal"><PlayerName name={p} /></td>
          <td>{$apiData.player_info[p].rating.toLocaleString()}</td>
          {#each $apiData.reversed_tournaments as t}
            <td>{#if t.player_list.indexOf(p) !== -1}➜{/if}</td>
          {/each}
          <td class="tal nw">
            {#if $apiData.player_info[p].latest_team !== $apiData.team.name}
              <TeamName name={$apiData.player_info[p].latest_team} />
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}