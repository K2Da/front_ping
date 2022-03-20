<script lang="ts">
  export let num: number
</script>

<span class="muted"> 約</span>
{#if num > 100000}
  {#if Math.floor(num / 100000000.0) > 0}{Math.floor(num / 100000000.0)}<span class="muted"> 億</span>{/if}
  {Math.floor((num % 100000000) /10000.0).toLocaleString()}<span class="muted"> 万</span>
{:else}
  {(Math.floor(num / 100.0) * 100).toLocaleString()}
{/if}