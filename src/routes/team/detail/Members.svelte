<script lang="ts">
  import { apiData } from './index_store'
  import PlayerName from '/src/parts/PlayerName.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'
</script>

{#if $apiData}
  <table style="width: 100%">
    <thead>
      <tr>
        <th></th>
        <th colspan={$apiData.reversed_tournaments.length + 1} class="tal">参加大会#</th>
      </tr>
      <tr>
        <th style="width: 10em"></th>
        {#each $apiData.reversed_tournaments as t, i}
          <th style="width: 2em" >
            <TournamentName name={$apiData.reversed_tournaments.length - i} key={t.tournament_key} />
          </th>
        {/each}
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each $apiData.players as p}
        <tr>
          <td class="tal"><PlayerName player={p} /></td>
          {#each $apiData.reversed_tournaments as t}
            <td>{#if t.player_list.indexOf(p) !== -1}➜{/if}</td>
          {/each}
          <td></td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}