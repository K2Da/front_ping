<script lang="ts" context="module">
  import { slimMode } from '/src/routes/global_store'
  import { base } from '$app/paths'
  import { currentUrl } from './index_store'
  import { sha1 } from '/src/util'
  import TeamName from '/src/parts/TeamName.svelte'

  export async function load(arg: { url: URL }): Promise<{ status: number }> {
    currentUrl.set(arg.url.toString())
    return { status: 200 }
  }
</script>

<script lang="ts">
  import { onDestroy } from 'svelte'
  import { teamHash } from '../../team/detail/index_store'
  import { tournamentKey, apiData } from './index_store'
  import { browser } from '$app/env'
  import Date from '/src/parts/Date.svelte'
  import Header from '../../Header.svelte'
  import PlaceHolder from '../../PlaceHolder.svelte'
  import T from '/src/parts/T.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'

  onDestroy(() => apiData.set(null))

  async function fetchTournament() {
    if (!browser) return

    apiData.set(null)
    tournamentKey.set(new URLSearchParams(window.location.search).get('t'))

    if ($tournamentKey === null || $tournamentKey === undefined) return

    fetch(`/center_pin_g/tournament/${$tournamentKey}.json`)
      .then(response => response.json())
      .then(data => { apiData.set(data) })
      .catch(() => [])
  }

  $: {
    $currentUrl
    fetchTournament()
  }
</script>

{#if $apiData}
  <Header title="{$apiData.tournament.name}" type="article" url="tournament" description="{$apiData.tournament.name}の概要" />
  <h2>{$apiData.tournament.name}</h2>
  {#if $apiData.data}
    <dl>
      <dt>開催日</dt>
      <dd><Date date={$apiData.tournament.date} /></dd>
      <dt>形式</dt>
      <dd>{#if $apiData.data.official}<span style="color: greenyellow">公式 ✔</span>{/if} {$apiData.data.type}</dd>
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
  {#if $slimMode}
    <table>
      <tbody class="double">
        {#each $apiData.teams as t}
          <tr>
            <td class="nw"><TournamentResult rank={t.team_rank} /></td>
            <td class="tal"><TeamName name={t.team_name} /></td>
            <td class="nw" style="text-align: center">{t.win}<T t="勝" /> {t.lose}<T t="敗" /></td>
          </tr>
          <tr>
            <td colspan="3" class="tal" style="padding-left: 2em">
              {#each t.members as player, index}
                {#if index !== 0}, {/if}
                {#if player in $apiData.ratings}
                  <a href="{base}/player/detail/?p={sha1(player)}">{player}</a>
                  {#if $apiData.ratings[player] > 1500}
                    <T t={'(' + $apiData.ratings[player].toLocaleString() + ')'} />
                  {/if}
                {:else}
                  {player}
                {/if}
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <table>
      <thead>
        <tr>
          <th>結果</th>
          <th class="tal">チーム名</th>
          <th>戦績</th>
          <th class="tal">メンバー</th>
        </tr>
      </thead>
      <tbody>
        {#each $apiData.teams as t}
          <tr>
            <td><TournamentResult rank={t.team_rank} /></td>
            <td class="tal"><TeamName name={t.team_name} /></td>
            <td style="text-align: center">{t.win}<T t=" 勝 " /> {t.lose}<T t=" 敗" /></td>
            <td class="tal">
              {#each t.members as player, index}
                {#if index !== 0}, {/if}
                {#if player in $apiData.ratings}
                  <a href="{base}/player/detail/?p={sha1(player)}">{player}</a>
                  {#if $apiData.ratings[player] > 1500}
                    <T t={'(' + $apiData.ratings[player].toLocaleString() + ')'} />
                  {/if}
                {:else}
                  {player}
                {/if}
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{:else}
  <PlaceHolder />
{/if}