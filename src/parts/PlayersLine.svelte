<script lang="ts">
  import PlayerName from '/src/parts/PlayerName.svelte'
  import T from '/src/parts/T.svelte'

  export let players: string[]
  export let ratings: { [name: string]: number }|null = null
</script>


{#each players as player, index}
  {#if index !== 0}, {/if}
    <PlayerName name={player}>
      <slot />
    </PlayerName>
  {#if ratings}
    {#if ratings[player] > 1500}
      <T t={'(' + ratings[player].toLocaleString() + ')'} />
    {/if}
  {/if}
{/each}