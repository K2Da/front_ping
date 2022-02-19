<script lang="ts">
  import { onDestroy } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { playerHash, apiData, set_api_data } from '$lib/store/player/detail'
  import { browser } from '$app/env'
  import { get_param_hash } from '$lib/util'
  import { slimMode } from '$lib/store/global'

  import Header      from '/src/parts/Header.svelte'
  import Profile     from '/src/parts/player/detail/Profile.svelte'
  import Teams       from '/src/parts/player/detail/Teams.svelte'
  import Tournaments from '/src/parts/player/detail/Tournaments.svelte'
  import Matches     from '/src/parts/player/detail/Matches.svelte'
  import Mates       from '/src/parts/player/detail/Mates.svelte'
  import Opponents   from '/src/parts/player/detail/Opponents.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'

  afterNavigate(() => { fetchPlayer(null) })
  onDestroy(() => apiData.set(null))

  async function redirectPlayer(player_hash) {
    fetch(`/center_pin_g/data/player/player_aliases.json`)
      .then(response => response.json())
      .then(data => fetchPlayer(data[player_hash]))
      .catch(() => [])
  }

  async function fetchPlayer(player_hash) {
    if (!browser) return
    apiData.set(null)

    playerHash.set(get_param_hash(player_hash, 'p'))
    if ($playerHash === null) return

    fetch(`/center_pin_g/data/player/${$playerHash}.json`)
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