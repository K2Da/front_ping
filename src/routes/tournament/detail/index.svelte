<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { get_param_hash, fetch_data } from '$lib/util'
  import { slimMode } from '/src/lib/store/global'
  import { onDestroy } from 'svelte'
  import { tournamentKey, apiData } from '$lib/store/tournament/detail'
  import type { TournamentTeam } from '$lib/api/Tournaments'
  import { browser } from '$app/env'
  import TeamName from '/src/parts/TeamName.svelte'
  import Date from '/src/parts/Date.svelte'
  import Header from '/src/parts/Header.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import T from '/src/parts/T.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'

  afterNavigate(() => { fetchTournament() })
  onDestroy(() => apiData.set(null))

  async function fetchTournament() {
    if (!browser) return

    apiData.set(null)
    tournamentKey.set(get_param_hash(null, 't'))
    if ($tournamentKey === null) return

    fetch_data(`tournament/${$tournamentKey}.json`)
      .then(response => response.json())
      .then(data => { apiData.set(data) })
      .catch(() => [])
  }

  function sortTeam(teams: TournamentTeam[]) {
    return teams.sort((a, b) => {
      let r = a.team_rank - b.team_rank
      if (r !== 0) return r

      let l = (a?.lose || 0) - (b?.lose || 0)
      if (l !== 0) return l

      return (a?.win || 0) - (b?.win || 0)
    })
  }
</script>

{#if $apiData}
  <Header title="{$apiData.tournament.name}" type="article" url="tournament" description="{$apiData.tournament.name}の概要" />
  <h1>{$apiData.tournament.name}</h1>
  {#if $apiData.data}
    <dl>
      <dt>開催日</dt>
      <dd><Date date={$apiData.tournament.date} spacing={false} /></dd>
      <dt>形式</dt>
      <dd>{#if $apiData.data.official}<span style="color: greenyellow">公式 ✔</span>{/if} {$apiData.data.type}</dd>
      <dt>rating計算</dt>
      <dd>{#if $apiData.tournament.rating}対象{:else}非対象{/if}</dd>
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
  {#if $slimMode}
    <table>
      <tbody class="double">
        {#each sortTeam($apiData.teams) as t}
          <tr>
            <td class="nw tal">
              <TournamentResult rank={t.team_rank} />
              <TeamName name={t.team_name} current_name={t.team_current_name} show_results={true} />
            </td>
            <td class="nw" style="text-align: center">
              {#if t.win !== 0 || t.lose !== 0}
                {t.win}<T t="勝" /> {t.lose}<T t="敗" />
              {:else}
                -
              {/if}
            </td>
          </tr>
          <tr>
            <td colspan="2" class="tal" style="padding-left: 2em">
              <PlayersLine players={t.members} ratings={true} />
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
        {#each sortTeam($apiData.teams) as t}
          <tr>
            <td><TournamentResult rank={t.team_rank} /></td>
            <td class="tal"><TeamName name={t.team_name} current_name={t.team_current_name} show_results={true} /></td>
            <td style="text-align: center">
              {#if t.win !== 0 || t.lose !== 0}
                {t.win}<T t=" 勝 " /> {t.lose}<T t=" 敗" />
              {:else}
                -
              {/if}
            </td>
            <td class="tal">
              <PlayersLine players={t.members} ratings={true} />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{:else}
  <PlaceHolder />
{/if}