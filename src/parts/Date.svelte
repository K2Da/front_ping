<script lang="ts">
  import T from './T.svelte'

  export let date: number

  $: dd = new Date(date)
</script>

'{dd.getFullYear() % 100}<T t="年 " />{dd.getMonth() + 1}<T t="月 " />{dd.getDate()}<T t="日" />