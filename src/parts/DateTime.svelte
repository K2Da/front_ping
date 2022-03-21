<script lang="ts">
  import T from './T.svelte'

  export let datetime: number

  const dd = new Date(datetime)
  const y = dd.getFullYear() % 100
  const m = dd.getMonth() + 1
  const d = dd.getDate()
  const hh = dd.getHours()
  const mm = dd.getMinutes()
</script>

<span class="m">
  '{y}<T t="年" /> {m}<T t="月" /> {d}<T t="日" /> {hh}<T>時</T> {mm}<T>分</T>
</span>