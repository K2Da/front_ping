<script lang="ts">
  import PlayerName from '/src/parts/PlayerName.svelte'
  import T from '/src/parts/T.svelte'
  import { playerMaster } from '$lib/store/global'

  export let players: string[]
  export let ratings = false
  export let notes: Record<string, string> = null
</script>


{#each players as player, index}
  {#if index !== 0}, {/if}
  <PlayerName name={player}>
    <slot />
  </PlayerName>{#if ratings && $playerMaster.dic[player] && $playerMaster.dic[player].rating > 1500}
    <T t={'(' + $playerMaster.dic[player].rating.toLocaleString() + ')'} />
  {/if}{#if notes}
    <T t={'(' + notes[player] + ')'} />
  {/if}
{/each}