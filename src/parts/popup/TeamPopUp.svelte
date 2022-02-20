<script lang="ts">
  import type { TeamIndex } from '$lib/../../../../center_ping/src/api/TeamIndex'
  import T from '/src/parts/T.svelte'
  import S from '/src/parts/S.svelte'
  import Date from '/src/parts/Date.svelte'

  export let team: TeamIndex
</script>

<h3>{team.name}</h3>
<p>
  <T t="大会登録名 " />{team.names.join(", ")}
</p>
