<script lang="ts">
  import { page_size, apiData, playerList, filterString, showRecord, showSns, showTournament, pageNo } from '$lib/store/player'
  import { onMount } from 'svelte'
  import { base } from '$app/paths'
  import Pager from '../../parts/player/Pager.svelte'
  import Header from '../../parts/Header.svelte'
  import PlaceHolder from '../../parts/PlaceHolder.svelte'
  import TeamName from '/src/parts/TeamName.svelte'

  function filter(event) {
    $filterString = event.target.value
    $pageNo = 1
  }

  onMount(async () => {
    fetch("/center_pin_g/data/player/players.json")
      .then(response => response.json())
      .then(data => apiData.set(data))
      .catch(() => [])
  })
</script>

<Header title="プレイヤー一覧" type="article" url="player" description="ポケモンユナイトの大会のプレイヤーの一覧" />

<h2>プレイヤー</h2>

<div>
  <input on:input={filter}
         placeholder="プレイヤー名 / チーム名"
         style="box-sizing: border-box; width: 100%"
         value={$filterString} />

  <div style="text-align: center">
    <input id="tournament" type="checkbox" bind:checked={$showTournament} />
    <label for="tournament">最新参加大会</label>
    <input id="record" type="checkbox" bind:checked={$showRecord} />
    <label for="record">通算戦績</label>
    <input id="sns" type="checkbox" bind:checked={$showSns} />
    <label for="sns">アカウント</label>
  </div>
</div>

<Pager />

<table style="table-layout: auto">
  <thead>
    <tr>
      <th colspan="3"></th>
      {#if $showTournament}
        <th colspan="2">最新参加大会</th>
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
      <th>No.</th>
      <th class="tal">名前</th>
      <th class="tal">チーム</th>
      {#if $showTournament}
        <th class="tal">大会</th>
        <th class="tal">開催日</th>
      {/if}
      {#if $showRecord}
        <th>出場</th>
        <th>勝</th>
        <th>敗</th>
      {/if}
      {#if $showSns }
        <th class="tal">twitter</th>
        <th class="tal">youtube</th>
        <th class="tal">twitch</th>
      {/if}
      <th>rating</th>
    </tr>
  </thead>
  <tbody>
  {#if Array.isArray($playerList)}
    {#each $playerList as player, i}
      {#if ($pageNo - 1) * page_size <= i && i < $pageNo * page_size}
        <tr>
          <td>{(i + 1).toLocaleString()}</td>
          <td class="tal"><a href="{base}/player/detail/?p={player.hash}">{player.name}</a></td>
          <td class="tal"><TeamName name={player.latest.team} /></td>
          {#if $showTournament}
            <td class="tal">{player.latest.tournament}</td>
            <td class="tal">{new Date(player.latest.date).toLocaleDateString()}</td>
          {/if}
          {#if $showRecord}
            <td>{player.entries}</td>
            <td>{player.win}</td>
            <td>{player.lose}</td>
          {/if}
          {#if $showSns }
            <td class="tal">
              {#if player.data && player.data.twitter}
                <i class="fab fa-twitter"></i> <a href="https://twitter.com/{player.data.twitter}">@{player.data.twitter}</a>
              {/if}
            </td>
            <td class="tal">
              {#if player.data && player.data.youtube}
                <i class="fab fa-youtube"></i> <a href="https://www.youtube.com/{player.data.youtube[0]}">{player.data.youtube[1]}</a>
              {/if}
            </td>
            <td class="tal">
              {#if player.data && player.data.twitch}
                <i class="fab fa-twitch"></i> <a href="https://www.twitch.tv/{player.data.twitch}">{player.data.twitch}</a>
              {/if}
            </td>
          {/if}
          <td>{(player.rating ?? 0).toLocaleString()}</td>
        </tr>
      {/if}
    {/each}
  {:else}
    <PlaceHolder />
  {/if}
  </tbody>
</table>

<Pager />
