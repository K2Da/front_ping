<script lang="ts">
  import { selectedMembers } from './index_store'
  import TeamMatches from './TeamMatches.svelte'
</script>

{#if $selectedMembers}
  <h2>{$selectedMembers?.left} : {$selectedMembers?.right}</h2>
  <h3>対戦</h3>
  <TeamMatches
    matches={$selectedMembers.relation.matches}
    left={$selectedMembers.left}
  />
{/if}