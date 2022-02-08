<script lang="ts">
  import { onDestroy } from 'svelte'
  import { base } from '$app/paths'
  import { goto } from '$app/navigation'
  import { tournamentKey } from '../../tournament/detail/index_store'
  import { teamHash, apiData, set_api_data } from './index_store'
  import { browser } from '$app/env'
  import { currentUrl, slimMode } from '../../global_store'
  import T           from '/src/parts/T.svelte'
  import Header      from '/src/routes/Header.svelte'
  import PlaceHolder from '/src/routes/PlaceHolder.svelte'
  import Tournaments from './Tournaments.svelte'
  import Members     from './Members.svelte'
  import SimilarTeam from './SimilarTeam.svelte'

  onDestroy(() => apiData.set(null))

  async function redirectTeam(team_hash) {
    fetch(`/center_pin_g/team/team_aliases.json`)
      .then(response => response.json())
      .then(data => fetchTeam(data[team_hash]))
      .catch(() => [])
  }

  async function fetchTeam(team_hash) {
    if (!browser) return

    apiData.set(null)
    if (team_hash === null) {
      teamHash.set(new URLSearchParams(window.location.search).get('m'))
    } else {
      teamHash.set(team_hash)
    }
    if ($teamHash === null || $teamHash === undefined) return

    fetch(`/center_pin_g/team/${$teamHash}.json`)
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

  $: {
    $currentUrl
    fetchTeam(null)
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