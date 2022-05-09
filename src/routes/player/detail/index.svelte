<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { playerHash, apiData, set_api_data } from '$lib/store/player/detail'
  import { browser } from '$app/env'
  import { get_param_hash, fetch_data, get_param } from '$lib/util'

  import Header      from '/src/parts/Header.svelte'
  import Profile     from '/src/parts/pages/player/detail/Profile.svelte'
  import Teams       from '/src/parts/pages/player/detail/Teams.svelte'
  import Tournaments from '/src/parts/pages/player/detail/Tournaments.svelte'
  import Matches     from '/src/parts/pages/player/detail/Matches.svelte'
  import Mates       from '/src/parts/pages/player/detail/Mates.svelte'
  import Opponents   from '/src/parts/pages/player/detail/Opponents.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import PageTab     from '/src/parts/PageTab.svelte'

  let current_mode = 'basic';

  afterNavigate(() => { fetchPlayer(null) })

  async function redirectPlayer(player_hash) {
    fetch_data('player/player_aliases.json')
      .then(response => response.json())
      .then(data => fetchPlayer(data[player_hash]))
      .catch(() => [])
  }

  async function fetchPlayer(player_hash) {
    if (!browser) return
    current_mode = get_param("basic", "mode");

    const hash = get_param_hash(player_hash, 'p');
    if ($playerHash === hash || hash === null) return;
    apiData.set(null);

    playerHash.set(hash);
    fetch_data(`player/${$playerHash}.json`)
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

{#if $apiData}
  <Header title="{$apiData.player.collated_name}"
          type="article"
          url="player/detail/?q={$playerHash}"
          description="" />

  <h2>{$apiData.player.collated_name}</h2>

  <PageTab current_mode={current_mode} mode="basic" name="基本" url="/player/detail?p={$playerHash}&mode=basic" /> |
  <PageTab current_mode={current_mode} mode="tournament" name="大会" url="/player/detail?p={$playerHash}&mode=tournament" /> |
  <PageTab current_mode={current_mode} mode="relation" name="関連" url="/player/detail?p={$playerHash}&mode=relation" />

  {#if current_mode === "basic"}
    <Profile />
    <Teams />
  {/if}
  {#if current_mode === "tournament"}
    <h3>参加大会</h3>
    <Tournaments />
    <Matches />
  {/if}
  {#if current_mode === "relation"}
    <Mates />
    <Opponents />
  {/if}
{:else}
  <PlaceHolder />
{/if}