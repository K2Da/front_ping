<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { tournamentKey, apiData } from './index_store'
  import { base } from '$app/paths'
  import Header from '../../Header.svelte'

  onMount(fetchPlayer)
  onDestroy(() => apiData.set(null))

  async function fetchPlayer() {
    tournamentKey.set(new URLSearchParams(window.location.search).get('t'))

    fetch(`/center_pin_g/tournament/${$tournamentKey}.json`)
      .then(response => response.json())
      .then(data => { apiData.set(data) })
      .catch(() => [])
  }
</script>

{#if $apiData}
  <Header title="{$apiData.tournament.name}" type="article" url="tournament" description="{$apiData.tournament.name}の概要" />
  <h2>{$apiData.tournament.name}</h2>
  {#if $apiData.data}
    <dl>
      <dt>開催日</dt>
      <dd>{new Date($apiData.tournament.date).toLocaleDateString()}</dd>
      <dt>形式</dt>
      <dd>{$apiData.data.type}</dd>
      {#if $apiData.data.note}
        <dt>備考</dt>
        <dd>{$apiData.data.note}</dd>
      {/if}
      <dt>関連URL</dt>
      <dd>
      <ul>
        {#each $apiData.data.urls as link}
          <li><i class="{link.icon}"></i> <a href="{link.url}">{link.title}</a></li>
        {/each}
      </ul>
    </dd>
    </dl>
  {/if}
  <h3>参加チーム</h3>
  <table>
    <thead>
    <tr>
      <th>結果</th>
      <th style="text-align: left">チーム名</th>
      <th style="text-align: left">メンバー</th>
    </tr>
    </thead>
    <tbody>
      {#each $apiData.teams as t}
        <tr>
          <td>{t.team_rank === 0 ? '-' : `${t.team_rank}位`}</td>
          <td style="text-align: left">{t.team_name}</td>
          <td style="text-align: left">
            {#each t.members as member, index}
              {#if index !== 0}, {/if}
              <a href="{base}/player/detail?p={member[1]}">{member[0]}</a>
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}