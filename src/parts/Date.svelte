<script lang="ts">
  import T from './T.svelte'

  export let date: number

  const dd = new Date(date)
  const y = dd.getFullYear() % 100
  const m = dd.getMonth() + 1
  const d = dd.getDate()
</script>

<span class="m">
  '{y}<T t="年" /> {@html m < 10 ? '&nbsp' : ''}{m}<T t="月" /> {@html d < 10 ? '&nbsp' : ''}{d}<T t="日" />
</span>