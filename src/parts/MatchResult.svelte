<script lang="ts">
  export let win: boolean
</script>

{#if win}
  <span style='font-weight: bold; color: red'>W</span>
{:else}
  <span style='font-weight: bold; color: dodgerblue'>L</span>
{/if}