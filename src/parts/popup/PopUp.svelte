<script lang="ts">
  import { windowWidth, windowHeight } from '$lib/store/global'

  export let rect: DOMRect
  export let max_width: number

  function style() {
    const width = Math.min(max_width, $windowWidth - 100)
    let left = Math.min(($windowWidth - rect.left - width - 50), 0)
    let direction = rect.top < $windowHeight / 2 ? "top" : "bottom"
    return `left: ${left}px; ${direction}: 2em; width: ${width}px`
  }
</script>

<style>
</style>

<div class="popup" style={style()}>
  <slot />
</div>