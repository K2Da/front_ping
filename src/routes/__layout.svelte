<script lang="ts" context="module">
  import { windowWidth, windowHeight } from '$lib/store/global'
</script>

<script lang="ts">
  import { base } from '$app/paths'
  import { onMount } from 'svelte'

  onMount(async () => {
    // window.location.href = window.location.href.replace('localhost:3000/center_pin_g', 'center-ping.pages.dev')
    window.location.href = window.location.href.replace('k2da.github.io/center_pin_g', 'center-ping.pages.dev')
  })
</script>

<svelte:window bind:innerWidth={$windowWidth} bind:innerHeight={$windowHeight} />

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