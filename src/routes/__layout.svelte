<script lang="ts" context="module">
  import { windowWidth, windowHeight } from '$lib/store/global'
</script>

<script lang="ts">
  import { base } from '$app/paths'
  import { loadMaster } from '$lib/store/global'
  import { onMount } from 'svelte'

  onMount(async () => loadMaster())
</script>

<svelte:window bind:innerWidth={$windowWidth} bind:innerHeight={$windowHeight} />

<h1>Center Pin(g)</h1>

<nav>
  <a href="{base}/">top </a> |
  <a href="{base}/tournament">大会</a> |
  <a href="{base}/player">プレイヤー</a> |
  <a href="{base}/team">チーム</a> |
  <a href="{base}/channel">チャンネル</a>
</nav>

<slot />

<footer>
  <a href="https://twitter.com/K2Da">@K2Da</a>
</footer>