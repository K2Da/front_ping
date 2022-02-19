<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '$lib/util'
  import { masterData } from '$lib/store/global'
  import PopUpA from '/src/parts/PopUpA.svelte'
  import PlayerPopUp from '/src/parts/PlayerPopUp.svelte'
  export let players: string[]
</script>


{#each players as player, index}
  {#if index !== 0}, {/if}
  {#if $masterData.player_dic[player]}
    <PopUpA
      href="{base}/player/detail/?p={sha1(player)}" text={player}
      max_width={640}
    >
      <PlayerPopUp player={$masterData.player_dic[player]} />
      <slot />
    </PopUpA>
  {:else}
    <a href="{base}/player/detail/?p={sha1(player)}">{player}</a>
  {/if}
{/each}