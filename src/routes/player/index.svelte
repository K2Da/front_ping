<script lang="ts">
  import { apiData, playerList, filterString, showRecord, showSns, showTournament } from './index_store'
  import { onMount } from 'svelte'

  onMount(async () => {
    fetch("/center_pin_g/player/players.json")
      .then(response => response.json())
      .then(data => apiData.set(data))
      .catch(() => [])
  })
</script>

<main>
  <h1>Center Pin(g)</h1>
  <nav>
    <a rel="external" href="https://k2da.github.io/center_pin_g/index.html">top </a> |
    <a rel="external" href="https://k2da.github.io/center_pin_g/tournament/index.html">大会</a>
    | プレイヤー
  </nav>

  <h2>プレイヤー</h2>

  <div>
    <input bind:value={$filterString} placeholder="プレイヤー名 / チーム名" style="display: inline-block "/>
    <input id="tournament" type="checkbox" bind:checked={$showTournament} />
    <label for="tournament">最新参加大会</label>
    <input id="record" type="checkbox" bind:checked={$showRecord} />
    <label for="record">通算戦績</label>
    <input id="sns" type="checkbox" bind:checked={$showSns} />
    <label for="sns">アカウント</label>
  </div>

  <table style="table-layout: auto">
    <thead>
      <tr>
        <th></th>
        {#if $showTournament}
          <th colspan="3">最新参加大会</th>
        {/if}
        {#if $showRecord}
          <th colspan="3">通算戦績</th>
        {/if}
        {#if $showSns }
          <th colspan="3">アカウント</th>
        {/if}
        <th></th>
      </tr>
      <tr>
        <th style="text-align: left">名前</th>
        {#if $showTournament}
          <th style="text-align: left">チーム</th>
          <th style="text-align: left">大会</th>
          <th style="text-align: left">開催日</th>
        {/if}
        {#if $showRecord}
          <th>出場</th>
          <th>勝</th>
          <th>敗</th>
        {/if}
        {#if $showSns }
          <th style="text-align: left">twitter</th>
          <th style="text-align: left">youtube</th>
          <th style="text-align: left">twitch</th>
        {/if}
        <th>rating</th>
      </tr>
    </thead>
    <tbody>
      {#each $playerList as player}
        <tr>
          <td style="text-align: left"><a rel="external" href="./{player.hash}.html">{player.name}</a></td>
          {#if $showTournament}
            <td style="text-align: left">{player.latest.team}</td>
            <td style="text-align: left">{player.latest.tournament}</td>
            <td style="text-align: left">{new Date(player.latest.date).toLocaleDateString()}</td>
          {/if}
          {#if $showRecord}
            <td>{player.entries}</td>
            <td>{player.win}</td>
            <td>{player.lose}</td>
          {/if}
          {#if $showSns }
            <td style="text-align: left">
              {#if player.data && player.data.twitter}
                <i class="fab fa-twitter"></i> <a href="https://twitter.com/{player.data.twitter}">@{player.data.twitter}</a>
              {/if}
            </td>
            <td style="text-align: left">
              {#if player.data && player.data.youtube}
                <i class="fab fa-youtube"></i> <a href="https://www.youtube.com/{player.data.youtube[0]}">{player.data.youtube[1]}</a>
              {/if}
            </td>
            <td style="text-align: left">
              {#if player.data && player.data.twitch}
                <i class="fab fa-twitch"></i> <a href="https://www.twitch.tv/{player.data.twitch}">{player.data.twitch}</a>
              {/if}
            </td>
          {/if}
          <td>{player.rating.toLocaleString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>