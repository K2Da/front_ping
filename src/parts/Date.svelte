<script lang="ts">
  import T from './T.svelte'

  export let date: number

  const dd = new Date(date)
  const y = dd.getFullYear() % 100
  const m = dd.getMonth() + 1
  const d = dd.getDate()
</script>

<span class="m">
  '{y}<T t="年" /> {m < 10 ? '0' : ''}{m}<T t="月" /> {d < 10 ? '0' : ''}{d}<T t="日" />
</span>