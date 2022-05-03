<script lang="ts">
  import { teamsData } from '$lib/store/player/detail/teams'
  import Date from '/src/parts/Date.svelte'
  import Span from '/src/parts/Span.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
</script>

<h3>チーム履歴</h3>
<dl>
  {#each $teamsData as t}
    <dt class="tal nw"><TeamName name={t.name} current_name={t.name} /></dt>
    <dd>
      {t.tournament_count}回出場<br />
      {#if t.first_match_at === t.last_match_at}
        <Date date={t.first_match_at} />
      {:else}
        <Span date1={t.first_match_at} date2={t.last_match_at} />
      {/if}
    </dd>
  {/each}
</dl>
