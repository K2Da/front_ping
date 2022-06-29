<script lang="ts">
  import { slimMode } from '$lib/store/global'
  import { tournamentMaster } from '$lib/store/global'

  import Header from '/src/parts/Header.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import T from '/src/parts/T.svelte'
  import Date from '/src/parts/Date.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'
  import TeamsLine from '/src/parts/TeamsLine.svelte'
</script>

<Header title="大会一覧" type="article" url="tournament" description="ポケモンユナイトの大会の一覧" />

<h1>大会</h1>
<T><span style="color: greenyellow">✔</span> 公式 📈 ratings計算対象</T>
<table style="table-layout: auto">
  <thead>
    {#if !$slimMode}
      <tr>
        <th>開催日</th>
        <th class="tal">大会名</th>
        <th class="tar">参加チーム</th>
        <th class="tar">参加人数</th>
        <th class="tar">試合数</th>
        <th class="tar"> </th>
        <th></th>
      </tr>
    {/if}
  </thead>
  <tbody class="{$slimMode ? 'triple' : ''}">
    {#if Array.isArray($tournamentMaster.list)}
      {#each $tournamentMaster.list as row}
          {#if $slimMode}
            <tr>
              <th class="tal" colspan="4">
                <TournamentName name={row.name} key={row.key} official={row.info.official} rating={row.rating} />
              </th>
            </tr>
            <tr>
              <td class="tal" style="padding-left: 0.5em;"><Date date={row.date} /></td>
              <td>{row.team_count.toLocaleString()} <T t="チーム" /></td>
              <td>{row.player_count.toLocaleString()} <T t="人" /></td>
              <td>{row.match_count.toLocaleString()} <T t="試合" /></td>
            </tr>
            <tr>
              <td class="tal" style="padding-left: 0.5em;" colspan="4">
                <TeamsLine teams={$tournamentMaster.winners[row.key]} />
              </td>
            </tr>
          {:else}
            <tr>
              <td><Date date={row.date} /></td>
              <td class="tal">
                <TournamentName name={row.name} key={row.key} official={row.info.official} rating={row.rating} />
              </td>
              <td class="tar">{row.team_count.toLocaleString()}</td>
              <td class="tar">{row.player_count.toLocaleString()}</td>
              <td class="tar">{row.match_count.toLocaleString()}</td>
              <td class="tal">
                <TeamsLine teams={$tournamentMaster.winners[row.key]} />
              </td>
              <td></td>
            </tr>
          {/if}
      {/each}
    {:else}
      <PlaceHolder />
    {/if}
  </tbody>
</table>