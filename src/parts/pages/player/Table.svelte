<script lang="ts">
  import { page_size, playerList, showSns, showTournament, pageNo } from '$lib/store/player';
  import { cssClass } from '$lib/util';
  import { base } from '$app/paths';
  import PlaceHolder from '/src/parts/PlaceHolder.svelte';
  import TeamName from '/src/parts/TeamName.svelte';
  import TournamentName from '/src/parts/TournamentName.svelte';
</script>

<table style="table-layout: auto">
  <thead>
  <tr>
    <th colspan="4"></th>
    {#if $showTournament}
      <th colspan="2">最新参加大会</th>
    {/if}
    <th colspan="5">通算戦績</th>
    {#if $showSns }
      <th colspan="3">アカウント</th>
    {/if}
    <th></th>
  </tr>
  <tr>
    <th>No.</th>
    <th class="tal">名前</th>
    <th class="tal">大会参加名</th>
    <th class="tal">チーム</th>
    {#if $showTournament}
      <th class="tal">大会</th>
      <th class="tal">開催日</th>
    {/if}
    <th>出場</th>
    <th>🥇</th>
    <th>Top 4</th>
    <th>勝</th>
    <th>敗</th>
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
          <td>{player.rank.toLocaleString()}</td>
          <td class="tal"><a href="{base}/player/detail/?p={player.hash}" class={cssClass(player.rating)}>{player.name}</a></td>
          <td class="tal">{#if player.data?.aliases}{player.data?.aliases?.join(', ')}{/if}</td>
          <td class="tal"><TeamName name={player.latest.team} current_name={player.latest.team_current} /></td>
          {#if $showTournament}
            <td class="tal">
              <TournamentName name={player.latest.tournament_name} key={player.latest.tournament_key} official={false} />
            </td>
            <td class="tal">{new Date(player.latest.date).toLocaleDateString()}</td>
          {/if}
          <td>{player.entries}</td>
          <td>{player.top_1}</td>
          <td>{player.top_4}</td>
          <td>{player.win}</td>
          <td>{player.lose}</td>
          {#if $showSns}
            <td class="tal">
              {#if player.data && player.data.twitter}
                <i class="fab fa-twitter"></i> <a href="https://twitter.com/{player.data.twitter}">{player.data.twitter}</a>
              {/if}
            </td>
            <td class="tal">
              {#if player.data && player.data.youtube}
                <i class="fab fa-youtube"></i> <a href="https://www.youtube.com/channel/{player.data.youtube[0]}">{player.data.youtube[1]}</a>
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