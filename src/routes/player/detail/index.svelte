<script lang="ts">
  import { onDestroy } from 'svelte'
  import { playerHash, apiData, set_api_data } from './index_store'
  import { browser } from '$app/env'
  import { currentUrl, slimMode } from '../../global_store'

  import Header      from '../../Header.svelte'
  import Profile     from './Profile.svelte'
  import Teams       from './Teams.svelte'
  import Tournaments from './Tournaments.svelte'
  import Matches     from './Matches.svelte'
  import Mates       from './Mates.svelte'
  import Opponents   from './Opponents.svelte'
  import PlaceHolder from '../../PlaceHolder.svelte'

  onDestroy(() => apiData.set(null))

  async function redirectPlayer(player_hash) {
    fetch(`/center_pin_g/player/player_aliases.json`)
      .then(response => response.json())
      .then(data => fetchPlayer(data[player_hash]))
      .catch(() => [])
  }

  async function fetchPlayer(player_hash) {
    if (!browser) return

    apiData.set(null)
    if (player_hash === null) {
      playerHash.set(new URLSearchParams(window.location.search).get('p'))
    } else {
      playerHash.set(player_hash)
    }
    if ($playerHash === null || $playerHash === undefined) return

    fetch(`/center_pin_g/player/${$playerHash}.json`)
      .then(response => {
        if (response.status === 404) throw new Error('NOT FOUND')
        return response.json()
      })
      .then(data => { set_api_data(data) })
      .catch(e => {
        if (e.message === 'NOT FOUND' && player_hash === null) {
          redirectPlayer($playerHash)
        }
      })
  }

  $: {
    $currentUrl
    fetchPlayer(null)
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

  <div class="{$slimMode ? '' : 'grid'}">
    <div class="l"><Profile /></div>
    <div class="r"><Teams /></div>
    <div class="l"><Mates /></div>
    <div class="r"><Opponents /></div>
  </div>

  <h3>参加大会</h3>
  <Tournaments />
  <Matches />
{:else}
  <PlaceHolder />
{/if}