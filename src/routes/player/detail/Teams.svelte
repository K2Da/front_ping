<script lang="ts">
  import { teamsData } from './teams_store'
  import Date from '/src/parts/Date.svelte'
  import Span from '/src/parts/Span.svelte'
</script>

<h4>チーム履歴</h4>
<table>
  <thead>
    <tr>
      <th style="width: 30%;"></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {#each $teamsData as t}
    <tr>
      <td>
        {#if t.first_match_at === t.last_match_at}
          <Date date={t.first_match_at} />
        {:else}
          <Span date1={t.first_match_at} date2={t.last_match_at} />
        {/if}
      </td>
      <td class="tal nw">{t.name}</td>
      <td class="nw">{t.tournament_count}</td>
    </tr>
  {/each}
  </tbody>
</table>
