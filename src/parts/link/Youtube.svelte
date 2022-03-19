<script lang="ts">
  export let channel: string
  export let name: string
</script>

{#if channel && name}
  <i class="fab fa-youtube"></i> <a href="https://www.youtube.com/channel/{channel}">{name}</a>
{/if}