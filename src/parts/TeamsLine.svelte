<script lang="ts">
  import type { Winner } from '$lib/api/Tournaments'
  import TeamName from '/src/parts/TeamName.svelte'
  import T from '/src/parts/T.svelte'

  export let teams: Winner[]
</script>

{#if teams}
  {#each teams as team, index}
    {#if team.rank === 1}🥇{:else if team.rank === 2}🥈{:else if team.rank === 3}🥉{:else}{team.rank}<T>位</T>{/if}<TeamName name={team.name} current_name={team.current_name} />
  {/each}
{/if}