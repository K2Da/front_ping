<script lang="ts">
  import type * as api from '$lib/api/types'
  import { split_by_team } from '$lib/api/types'
  import Match from './Match.svelte'

  export let matches: api.Match[]
  export let left: string
</script>

<table>
<tbody class="quad">
{#each matches as match}
  {@const teams = split_by_team(match, left)}
  <Match {match} {teams} />
{/each}
</tbody>
</table>