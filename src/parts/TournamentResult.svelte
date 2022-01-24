<script lang="ts">
  export let rank: number
</script>

{#if rank === 0}
  -
{:else if rank === 1}
  🥇 <span class="muted">{rank}</span>
{:else if rank === 2}
  🥈 <span class="muted">{rank}</span>
{:else if rank === 3}
  🥉 <span class="muted">{rank}</span>
{:else}
  {rank} <span class="muted">位</span>
{/if}
