<script lang="ts">
  import { get_param_hash } from '$lib/util'
  import { onDestroy } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import { teamHash, apiData, set_api_data } from '$lib/store/team/detail'
  import { browser } from '$app/env'
  import { slimMode } from '$lib/store/global'
  import T           from '/src/parts/T.svelte'
  import Header      from '/src/parts/Header.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import Tournaments from '/src/parts/pages/team/detail/Tournaments.svelte'
  import Members     from '/src/parts/pages/team/detail/Members.svelte'
  import SimilarTeam from '/src/parts/pages/team/detail/SimilarTeam.svelte'

  afterNavigate(() => { fetchTeam(null) })
  onDestroy(() => apiData.set(null))

  async function redirectTeam(team_hash) {
    fetch(`/center_pin_g/data/team/team_aliases.json`)
      .then(response => response.json())
      .then(data => { fetchTeam(data[team_hash]) })
      .catch(() => [])
  }

  async function fetchTeam(team_hash) {
    if (!browser) return
    apiData.set(null)
    teamHash.set(get_param_hash(team_hash, 'm'))
    if ($teamHash === null) return

    fetch(`/center_pin_g/data/team/${$teamHash}.json`)
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
  <h4>基本情報</h4>
  <table>
    <thead>
      <tr style="">
        <th style="{$slimMode ? '' : 'width: 20%'}"></th>
        <th style="{$slimMode ? '' : 'width: 80%'}"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>戦績</th>
        <td class="tal">
          {$apiData.team.tournament_count}<T t=" 大会" />
          {$apiData.team.win}<T t=" 勝" />
          {$apiData.team.lose}<T t=" 敗" />
        </td>
      </tr>
      <tr>
        <th>大会参加登録チーム名</th>
        <td class="tal">
          {#each $apiData.team.names as name, index}
            {#if index !== 0}, {/if}{name}
          {/each}
        </td>
      </tr>
    </tbody>
  </table>

  <h3>参加大会</h3>
  <Tournaments />

  <h3>メンバー</h3>
  <Members />

  <SimilarTeam />
{:else}
  <PlaceHolder />
{/if}