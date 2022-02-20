<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '$lib/util'
  import { playerMaster } from '$lib/store/global'
  import PopUpA from '/src/parts/popup/PopUpA.svelte'
  import PlayerPopUp from '/src/parts/popup/PlayerPopUp.svelte'
  import T from '/src/parts/T.svelte'

  export let players: string[]
  export let ratings: { [name: string]: number }|null = null
</script>


{#each players as player, index}
  {#if index !== 0}, {/if}
  {#if $playerMaster.player_dic[player]}
    <PopUpA
      href="{base}/player/detail/?p={sha1(player)}" text={player}
      max_width={640}
    >
      <PlayerPopUp player={$playerMaster.player_dic[player]} />
      <slot />
    </PopUpA>
  {:else}
    <a href="{base}/player/detail/?p={sha1(player)}">{player}</a>
  {/if}
  {#if ratings}
    {#if ratings[player] > 1500}
      <T t={'(' + ratings[player].toLocaleString() + ')'} />
    {/if}
  {/if}
{/each}