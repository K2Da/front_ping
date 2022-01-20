<script lang="ts">
  import { teamsData } from './index_store'
</script>

<table>
  <thead>
    <tr>
      <th class="tal">大会参加チーム名</th>
      <th>参加大会数</th>
      <th>期間</th>
    </tr>
  </thead>
  <tbody>
  {#each $teamsData as t}
    <tr>
      <td class="tal">{t.name}</td>
      <td>{t.tournament_count}</td>
      <td>
        {#if t.first_match_at === t.last_match_at}
          {new Date(t.first_match_at).toLocaleDateString()}
        {:else}
          {new Date(t.first_match_at).toLocaleDateString()} 〜 {new Date(t.last_match_at).toLocaleDateString()}
        {/if}
      </td>
    </tr>
  {/each}
  </tbody>
</table>
