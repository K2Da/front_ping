<script lang="ts">
  import { apiData } from './index_store'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
</script>

{#if $apiData && Object.keys($apiData.similar_team).length > 0}
  <h3>3名以上のメンバーが共通するチーム</h3>
  <table style="width: 100%">
    <tbody>
      {#each Object.keys($apiData.similar_team) as name}
        <tr>
          <td class="tal" style="width: 20em"><TeamName name={name} /></td>
          <td class="tal"><PlayersLine players={$apiData.similar_team[name]} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}