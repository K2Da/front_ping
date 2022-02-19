<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '$lib/util'
  import PopUpA from '/src/parts/PopUpA.svelte'
  export let players: string[]
  export let popup = false
</script>

{#each players as player, index}
  {#if index !== 0}, {/if}
  {#if popup}
    <PopUpA href="{base}/player/detail/?p={sha1(player)}"
            text={player}
    ><slot /></PopUpA>
  {:else}
    <a href="{base}/player/detail/?p={sha1(player)}">{player}</a>
  {/if}
{/each}