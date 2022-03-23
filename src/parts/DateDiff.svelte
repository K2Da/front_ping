<script lang="ts">
  import T from './T.svelte'
  import DateTime from './DateTime.svelte'

  export let datetime: number

  const dd = new Date(datetime).getTime()
  const diff = Date.now() - dd
</script>

<span class="m">
  {#if diff < 1000.0 * 60.0}
    {Math.round(diff / 1000.0)}<T>秒前</T>
  {:else if diff < 1000.0 * 60.0 * 60.0}
    {Math.round(diff / 1000.0 / 60.0)}<T>分前</T>
  {:else if diff < 1000.0 * 60.0 * 60.0 * 24.0}
    {Math.round(diff / 1000.0 / 60.0 / 60.0)}<T>時間前</T>
  {:else if diff < 1000.0 * 60.0 * 60.0 * 24.0 * 7.0}
    {Math.round(diff / 1000.0 / 60.0 / 60.0 / 24.0)}<T>日前</T>
  {:else}
    <DateTime datetime={datetime} />
  {/if}
</span>