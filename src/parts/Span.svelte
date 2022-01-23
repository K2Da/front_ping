<script lang="ts">
  import T from './T.svelte'

  export let date1: number
  export let date2: number

  let dd1: Date
  let dd2: Date

  $: {
    dd1 = new Date(date1)
    dd2 = new Date(date2)
  }
</script>

'{dd1.getFullYear() % 100}<T t="年 " />{dd1.getMonth() + 1}<T t="月 " />{dd1.getDate()}<T t="日" />
〜
{#if dd1.getFullYear() === dd2.getFullYear()}
  '{dd2.getMonth() + 1}<T t="月 " />{dd2.getDate()}<T t="日" />
{:else}
  '{dd2.getFullYear() % 100}<T t="年 " />{dd2.getMonth() + 1}<T t="月 " />{dd2.getDate()}<T t="日" />
{/if}
