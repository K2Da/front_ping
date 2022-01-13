<script lang="ts">
  import { onMount } from "svelte";
  import { player_hash } from './index_store'
  import Header from '../Header.svelte'

  onMount(async () => {
    player_hash.set(new URLSearchParams(window.location.search).get('p'))
  })
</script>

<main>
  <Header title="{$player_hash}" type="article" url="player/detail?q={$player_hash}" description="" />
  <p>{$player_hash}</p>
</main>