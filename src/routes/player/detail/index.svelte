<script lang="ts">
  import { onMount } from "svelte";
  import { base } from '$app/paths'
  import { player_hash } from './index_store'

  onMount(async () => {
    player_hash.set(new URLSearchParams(window.location.search).get('p'))
    console.log($player_hash)
  })
</script>

<main>
  <p>{$player_hash}</p>
  <a href="{base}/player/proto">back</a>
</main>