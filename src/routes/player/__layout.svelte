<script lang="ts">
  import { base } from '$app/paths'
</script>

<nav>
  <a rel="external" href="{base}/index.html">top </a> |
  <a rel="external" href="{base}/tournament/index.html">大会</a> |
  <a href="{base}/player/list">プレイヤー</a>
</nav>

<slot />