<script lang="ts">
  import { get_param_hash, fetch_data, get_param } from '$lib/util'
  import { afterNavigate } from '$app/navigation'
  import { teamHash, apiData, set_api_data } from '$lib/store/team/detail'
  import { browser } from '$app/env'
  import PageTab     from '/src/parts/PageTab.svelte'
  import Header      from '/src/parts/Header.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import Tournaments from '/src/parts/pages/team/detail/Tournaments.svelte'
  import Members     from '/src/parts/pages/team/detail/Members.svelte'
  import SimilarTeam from '/src/parts/pages/team/detail/SimilarTeam.svelte'
  import Basic       from '/src/parts/pages/team/detail/Basic.svelte'
  import Matches     from '/src/parts/pages/team/detail/Matches.svelte'

  let current_mode = 'basic';

  afterNavigate(() => { fetchTeam(null) })

  async function redirectTeam(team_hash) {
    fetch_data('team/team_aliases.json')
      .then(response => response.json())
      .then(data => { fetchTeam(data[team_hash]) })
      .catch(() => [])
  }

  async function fetchTeam(team_hash) {
    if (!browser) return
    current_mode = get_param("basic", "mode");

    const hash = get_param_hash(team_hash, 'm');
    if ($teamHash === hash || hash === null) return;
    apiData.set(null);

    teamHash.set(hash)
    fetch_data(`team/${$teamHash}.json`)
      .then(response => {
        if ([403, 404].indexOf(response.status) !== -1) throw new Error('NOT FOUND')
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

  <h1>{$apiData.team.name}</h1>
  <div class="detail-tab">
    <PageTab current_mode={current_mode} mode="basic" name="基本" url="/team/detail?m={$teamHash}&mode=basic" /> |
    <PageTab current_mode={current_mode} mode="tournament" name="大会" url="/team/detail?m={$teamHash}&mode=tournament" /> |
    <PageTab current_mode={current_mode} mode="member" name="メンバー" url="/team/detail?m={$teamHash}&mode=member" /> |
    <PageTab current_mode={current_mode} mode="relation" name="関連" url="/team/detail?m={$teamHash}&mode=relation" />
  </div>

  {#if current_mode === "basic"}
    <Basic />
  {/if}

  {#if current_mode === "tournament"}
    <h2>参加大会</h2>
    <Tournaments />
    <Matches />
  {/if}

  {#if current_mode === "member"}
    <h2>メンバー</h2>
    <Members />
  {/if}

  {#if current_mode === "relation"}
    <h2>関連</h2>
    <SimilarTeam />
  {/if}
{:else}
  <PlaceHolder />
{/if}