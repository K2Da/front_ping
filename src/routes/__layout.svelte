<script lang="ts" context="module">
  import { currentUrl } from './global_store'
  export async function load(arg: { url: URL }): Promise<{ status: number }> {
    currentUrl.set(arg.url.toString())
    return { status: 200 }
  }
</script>

<script lang="ts">
  import { base } from '$app/paths'
</script>

<h1>Center Pin(g)</h1>

<nav>
  <a href="{base}/">top </a> |
  <a href="{base}/tournament">大会</a> |
  <a href="{base}/player">プレイヤー</a>
</nav>

<slot />

<footer>
  <a href="https://twitter.com/K2Da">@K2Da</a>
</footer>
