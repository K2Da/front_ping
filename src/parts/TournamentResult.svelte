<script lang="ts">
  export let rank: number
</script>

{#if rank === 0}
  -
{:else if rank === 1}
  {rank} 🥇
{:else if rank === 2}
  {rank} 🥈
{:else if rank === 3}
  {rank} 🥉
{:else}
  {rank} <span class="muted">位</span>
{/if}
