<script lang="ts">
  export let current_mode: string;
  export let mode: string;
  export let name: string;
  export let url: string;
</script>

{#if current_mode === mode}
  {name}
{:else}
  <a href="{url}">{name}</a>
{/if}
