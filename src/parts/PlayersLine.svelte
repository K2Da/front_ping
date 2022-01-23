<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '../util'

  export let players: string[]
</script>

{#each players as player, index}
  {#if index !== 0}, {/if}
  <a href="{base}/player/detail/?p={sha1(player)}">{player}</a>
{/each}