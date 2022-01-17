<script lang="ts">
  import Header from '../Header.svelte'
  import { onMount } from "svelte";
  import { base } from '$app/paths'
  import { apiData } from "../player/index_store";

  onMount(async () => {
    fetch("/center_pin_g/tournament/tournaments.json")
      .then(response => response.json())
      .then(data => apiData.set(data))
      .catch(() => [])
  })
</script>

<Header title="大会一覧" type="article" url="tournament" description="ポケモンユナイトの大会の一覧" />

<h2>大会</h2>

<table style="table-layout: auto">
  <thead>
  <tr>
    <th>開催日</th>
    <th style="text-align: left">大会名</th>
    <th>参加チーム</th>
    <th>参加人数</th>
    <th>試合数</th>
  </tr>
  </thead>
  <tbody>
    {#if $apiData.tournaments}
      {#each $apiData.tournaments as row}
        <tr>
          <td>{new Date(row.date).toLocaleDateString()}</td>
          <td style="text-align: left"><a href="{base}/tournament/detail/?t={row.key}">{row.name}</a></td>
          <td>{row.team_count.toLocaleString()}</td>
          <td>{row.player_count.toLocaleString()}</td>
          <td>{row.match_count.toLocaleString()}</td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>