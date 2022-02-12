<script lang="ts" context="module">
  import { windowWidth } from './global_store'
</script>

<script lang="ts">
  import { base } from '$app/paths'
</script>

<svelte:window bind:innerWidth={$windowWidth}/>

<h1>Center Pin(g)</h1>

<nav>
  <a href="{base}/">top </a> |
  <a href="{base}/tournament">大会</a> |
  <a href="{base}/player">プレイヤー</a> |
  <a href="{base}/team">チーム</a>
</nav>

<slot />

<footer>
  <a href="https://twitter.com/K2Da">@K2Da</a>
</footer>
