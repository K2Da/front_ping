<script lang="ts">
  import { days } from '$lib/util'
  import T from './T.svelte'

  export let date1: number
  export let date2: number
  export let length = false
  const s = '&nbsp;'

  $: dd1 = new Date(date1)
  $: dd2 = new Date(date2)
  $: y1 = dd1.getFullYear() % 100
  $: m1 = dd1.getMonth() + 1
  $: d1 = dd1.getDate()
  $: y2 = dd2.getFullYear() % 100
  $: m2 = dd2.getMonth() + 1
  $: d2 = dd2.getDate()
  $: day_count = Math.floor(days(date1, date2))
</script>

'{y1}<T t="年" /> {@html m1 < 10 ? s : ''}{m1}<T t="月" /> {@html d1 < 10 ? s : ''}{d1}<T t="日" />
{#if y1 !== y2 || m1 !== m2 || d1 !== d2}
  〜
  {#if dd1.getFullYear() === dd2.getFullYear()}
    {@html m2 < 10 ? s : ''}{m2}<T t="月" /> {@html d2 < 10 ? s : ''}{d2}<T t="日" />
  {:else}
    '{y2}<T t="年" /> {@html m2 < 10 ? s : ''}{m2}<T t="月" /> {@html d2 < 10 ? s : ''}{d2}<T t="日" />
  {/if}
  {#if length}
    <T>({day_count}日)</T>
  {/if}
{/if}
