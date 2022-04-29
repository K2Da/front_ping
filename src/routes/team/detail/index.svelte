<script lang="ts">
  import { get_param_hash, fetch_data } from '$lib/util'
  import { onDestroy } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { teamHash, apiData, set_api_data } from '$lib/store/team/detail'
  import { browser } from '$app/env'
  import Header      from '/src/parts/Header.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import Tournaments from '/src/parts/pages/team/detail/Tournaments.svelte'
  import Members     from '/src/parts/pages/team/detail/Members.svelte'
  import SimilarTeam from '/src/parts/pages/team/detail/SimilarTeam.svelte'
  import Basic       from '/src/parts/pages/team/detail/Basic.svelte'
  import Matches     from '/src/parts/pages/team/detail/Matches.svelte'

  afterNavigate(() => { fetchTeam(null) })
  onDestroy(() => apiData.set(null))

  async function redirectTeam(team_hash) {
    fetch_data('team/team_aliases.json')
      .then(response => response.json())
      .then(data => { fetchTeam(data[team_hash]) })
      .catch(() => [])
  }

  async function fetchTeam(team_hash) {
    if (!browser) return
    apiData.set(null)
    teamHash.set(get_param_hash(team_hash, 'm'))
    if ($teamHash === null) return

    fetch_data(`team/${$teamHash}.json`)
      .then(response => {
        if (response.status === 404) throw new Error('NOT FOUND')
        return response.json()
      })
      .then(data => { set_api_data(data) })
      .catch(e => {
        if (e.message === 'NOT FOUND' && team_hash === null) {
          redirectTeam($teamHash)
        }
      })
  }
</script>

{#if $apiData}
  <Header title="{$apiData.team.name}"
          type="article"
          url="team/detail/?t={$teamHash}"
          description="" />

  <h2>{$apiData.team.name}</h2>

  <h3>基本情報</h3>
  <Basic />

  <SimilarTeam />

  <h3>参加大会</h3>
  <Tournaments />

  <h3>メンバー</h3>
  <Members />

  <h3>試合</h3>
  <Matches />
{:else}
  <PlaceHolder />
{/if}