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
    <PopUpA href="{base}/player/detail/?p={sha1(player)}" text={player} condition={!!$playerMaster.dic[player]}>
      <PlayerPopUp player={$playerMaster.dic[player]} />
      <slot />
    </PopUpA>
  {#if ratings}
    {#if ratings[player] > 1500}
      <T t={'(' + ratings[player].toLocaleString() + ')'} />
    {/if}
  {/if}
{/each}