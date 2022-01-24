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

</script>

'{y1}<T t="年" /> {m1 < 10 ? '0' : ''}{m1}<T t="月" /> {d1 < 10 ? '0' : ''}{d1}<T t="日" />
〜
{#if dd1.getFullYear() === dd2.getFullYear()}
  {m2 < 10 ? '0' : ''}{m2}<T t="月" /> {d2 < 10 ? '0' : ''}{d2}<T t="日" />
{:else}
  '{y2}<T t="年" /> {m2 < 10 ? '0' : ''}{m2}<T t="月" /> {d2 < 10 ? '0' : ''}{d2}<T t="日" />
{/if}
