<script lang="ts" context="module">
  import { currentUrl } from './index_store'
  export async function load(arg: { url: URL }): Promise<{ status: number}> {
    currentUrl.set(arg.url.toString())
    return { status: 200 }
  }
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { playerHash, apiData } from './index_store'
  import { base } from '$app/paths'
  import Header from '../../Header.svelte'

  onDestroy(() => apiData.set(null))

  async function fetchPlayer(url) {
    playerHash.set(new URLSearchParams(new URL(url).search).get('p'))

    fetch(`/center_pin_g/player/${$playerHash}.json`)
      .then(response => response.json())
      .then(data => { apiData.set(data) })
      .catch(() => [])
  }

  $: fetchPlayer($currentUrl)
</script>

{#if $apiData}
  <Header title="{$apiData.player.collated_name}" type="article" url="player/detail?q={$playerHash}" description="" />

  <h2>{$apiData.player.collated_name}</h2>
  <table>
    <thead>
      <tr>
        <th style="width: 20%; text-align: left">基本情報</th>
        <th style="width: 80%; text-align: left"></th>
      </tr>
    </thead>
    <tbody>
      {#if $apiData.data}
        <tr>
          <th style="text-align: left">大会エントリー名</th>
          <td style="text-align: left">{[...new Set($apiData.tournaments.map((t) => t.member_name))].join(', ')}</td>
        </tr>
      {/if}
      <tr>
        <th style="text-align: left">戦績</th>
        <td style="text-align: left">{$apiData.player.entries}大会エントリー {$apiData.player.win}勝 {$apiData.player.lose}敗</td>
      </tr>
      <tr>
        <th style="text-align: left">レート</th>
        <td style="text-align: left">{$apiData.player.rating.toLocaleString()}</td>
      </tr>
      {#if $apiData.data}
        {#if $apiData.data.twitter}
          <tr>
            <th style="text-align: left"><i class="fab fa-twitter"></i> twitter</th>
            <td style="text-align: left"><a href="https://twiter.com/{$apiData.data.twitter}">@{$apiData.data.twitter}</a></td>
          </tr>
        {/if}
        {#if $apiData.data.youtube}
          <tr>
            <th style="text-align: left"><i class="fab fa-youtube"></i> youtube</th>
            <td style="text-align: left"><a href="https://www.youtube.com/{$apiData.data.youtube[0]}">{$apiData.data.youtube[1]}</a></td>
          </tr>
        {/if}
        {#if $apiData.data.twitch}
          <tr>
            <th style="text-align: left"><i class="fab fa-twitch"></i> twitch</th>
            <td style="text-align: left"><a href="https://www.twitch.tv/{$apiData.data.twitch}">{$apiData.data.twitch}</a></td>
          </tr>
        {/if}
      {/if}
    </tbody>
  </table>
  <h3>参加大会</h3>
  <table>
    <thead>
    <tr>
      <th style="text-align: left">大会名</th>
      <th>開催日</th>
      <th>結果</th>
      <th>rating</th>
      <th style="text-align: left">チーム名</th>
      <th style="text-align: left">エントリー名</th>
      <th style="text-align: left">メンバー(同チーム回数)</th>
    </tr>
    </thead>
    <tbody>
    {#each $apiData.tournaments as t}
      <tr>
        <td style="text-align: left"><a href="#{t.tournament_key}">{t.tournament_name}</a></td>
          <td>{new Date(t.tournament_date).toLocaleDateString()}</td>
          <td>{t.team_result === 0 ? '-' : `${t.team_result}位`}</td>
          <td>{t.rating.toLocaleString()}</td>
          <td style="text-align: left">{t.team_name}</td>
          <td style="text-align: left">{t.member_name}</td>
          <td style="text-align: left">
          {#each t.mates_hash as member, index}
            {#if index !== 0}, {/if}
            <a href="{base}/player/detail?p={member[1]}">{member[0]}</a>
          {/each}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>

  {#each $apiData.tournaments as t}
    <h4 id={t.tournament_key}>{t.tournament_name}</h4>

    <table>
      <thead>
        <tr>
          <th style="width: 6%">ブラケット</th>
          <th style="width: 6%">ラウンド</th>
          <th style="width: 6%">勝敗</th>
          <th style="width: 6%">スコア</th>
          <th style="width: 23%; text-align: left">対戦相手</th>
          <th style="width: 6%">順位</th>
          <th style="width: 47%; text-align: left">メンバー</th>
        </tr>
      </thead>
      <tbody>
        {#each $apiData.matches as m}
          {#if m.tnmt_key === t.tournament_key }
            <tr>
              <td>{m.bracket}</td>
              <td>{m.round}</td>
              <td style="font-weight: bold">
                {#if m.opponent_team_key === m.loser_key}
                  <span style='color: red'>W</span>
                {:else}
                  <span style='color: dodgerblue;'>L</span>
                {/if}
              </td>
              <td>
                {#if m.opponent_team_key === m.loser_key}
                  {m.winner_score} - {m.loser_score}
                {:else}
                  {m.loser_score} - {m.winner_score}
                {/if}
              </td>
              <td style="text-align: left">{m.opponent_team_name}</td>
              <td>{m.opponent_team_rank === 0 ? '-' : `${m.opponent_team_rank}位`}</td>
              <td style="text-align: left">
                {#each m.opponents_hash as member, index}
                  {#if index !== 0}, {/if}
                  <a href="{base}/player/detail?p={member[1]}">{member[0]}</a>
                {/each}
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  {/each}
{:else}
  <div style="height: 2480px"></div>
{/if}