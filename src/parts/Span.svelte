<script lang="ts">
  import T from './T.svelte'

  export let date1: number
  export let date2: number

  const dd1 = new Date(date1)
  const dd2 = new Date(date2)

  const y1 = dd1.getFullYear() % 100
  const m1 = dd1.getMonth() + 1
  const d1 = dd1.getDate()
  const y2 = dd2.getFullYear() % 100
  const m2 = dd2.getMonth() + 1
  const d2 = dd2.getDate()
  const s = '&nbsp;'
</script>

'{y1}<T t="年" /> {@html m1 < 10 ? s : ''}{m1}<T t="月" /> {@html d1 < 10 ? s : ''}{d1}<T t="日" />
〜
{#if dd1.getFullYear() === dd2.getFullYear()}
  {@html m2 < 10 ? s : ''}{m2}<T t="月" /> {@html d2 < 10 ? s : ''}{d2}<T t="日" />
{:else}
  '{y2}<T t="年" /> {@html m2 < 10 ? s : ''}{m2}<T t="月" /> {@html d2 < 10 ? s : ''}{d2}<T t="日" />
{/if}
