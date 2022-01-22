<script lang="ts">
  import { onDestroy } from 'svelte'
  import { playerHash, apiData } from './index_store'
  import { browser } from '$app/env'
  import { currentUrl } from '../../global_store'

  import Header from '../../Header.svelte'
  import Profile from './Profile.svelte'
  import Teams from './Teams.svelte'
  import Tournaments from './Tournaments.svelte'
  import Mates from './Mates.svelte'
  import Opponents from './Opponents.svelte'
  import PlaceHolder from '../../PlaceHolder.svelte'

  onDestroy(() => apiData.set(null))

  async function fetchPlayer() {
    if (!browser) return

    apiData.set(null)
    playerHash.set(new URLSearchParams(window.location.search).get('p'))

    fetch(`/center_pin_g/player/${$playerHash}.json`)
      .then(response => response.json())
      .then(data => { apiData.set(data) })
      .catch(() => [])
  }

  $: {
    $currentUrl
    fetchPlayer()
  }
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .grid .l { padding: 0 10px 0 0 }
  .grid .r { padding: 0 0 0 10px }
</style>

{#if $apiData}
  <Header title="{$apiData.player.collated_name}"
          type="article"
          url="player/detail/?q={$playerHash}"
          description="" />

  <h2>{$apiData.player.collated_name}</h2>

  <div class="grid">
    <div class="l"><Profile /></div>
    <div class="r"><Teams /></div>
    <div class="l"><Mates /></div>
    <div class="r"><Opponents /></div>
  </div>

  <h3>参加大会</h3>
  <Tournaments />
{:else}
  <PlaceHolder />
{/if}