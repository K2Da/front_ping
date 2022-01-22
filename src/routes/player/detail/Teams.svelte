<script lang="ts">
  import { teamsData } from './index_store'
  import { slimMode } from '../../global_store'
  import { date_to_s, span_to_s } from '../../../util'
</script>

<table>
  <thead>
    <tr>
      <th>期間</th>
      {#if $slimMode}
        <th class="tal" colspan="2">チーム名 / 大会数</th>
      {:else}
        <th class="tal">チーム名</th>
        <th>大会参加数</th>
      {/if}
    </tr>
  </thead>
  <tbody>
  {#each $teamsData as t}
    <tr>
      <td>
        {#if t.first_match_at === t.last_match_at}
          {date_to_s($slimMode, t.first_match_at)}
        {:else}
          {@html span_to_s($slimMode, t.first_match_at, t.last_match_at)}
        {/if}
      </td>
      <td class="tal">{t.name}</td>
      <td>{t.tournament_count}</td>
    </tr>
  {/each}
  </tbody>
</table>
