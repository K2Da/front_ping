<script lang="ts">
  import { onMount } from 'svelte'
  import { slimMode } from '/src/routes/global_store'
  import { base } from '$app/paths'
  import { apiData } from '../player/index_store'

  import Header from '../Header.svelte'
  import PlaceHolder from '../PlaceHolder.svelte'
  import T from '/src/parts/T.svelte'
  import Date from '/src/parts/Date.svelte'

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
    {#if !$slimMode}
      <tr>
        <th>開催日</th>
        <th class="tal">大会名</th>
        <th class="tar">参加チーム</th>
        <th class="tar">参加人数</th>
        <th class="tar">試合数</th>
        <th></th>
      </tr>
    {/if}
  </thead>
  <tbody class="{$slimMode ? 'double' : ''}">
    {#if $apiData.tournaments}
      {#each $apiData.tournaments as row}
          {#if $slimMode}
            <tr>
              <th class="tal" colspan="4"><a href="{base}/tournament/detail/?t={row.key}">{row.name}</a></th>
            </tr>
            <tr>
              <td class="tal"><Date date={row.date} /></td>
              <td>{row.team_count.toLocaleString()} <T t="チーム" /></td>
              <td>{row.player_count.toLocaleString()} <T t="人" /></td>
              <td>{row.match_count.toLocaleString()} <T t="試合" /></td>
            </tr>
          {:else}
            <tr>
              <td><Date date={row.date} /></td>
              <td class="tal"><a href="{base}/tournament/detail/?t={row.key}">{row.name}</a></td>
              <td class="tar">{row.team_count.toLocaleString()}</td>
              <td class="tar">{row.player_count.toLocaleString()}</td>
              <td class="tar">{row.match_count.toLocaleString()}</td>
              <td></td>
            </tr>
          {/if}
      {/each}
    {:else}
      <PlaceHolder />
    {/if}
  </tbody>
</table>