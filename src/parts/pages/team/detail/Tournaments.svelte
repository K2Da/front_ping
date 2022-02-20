<script lang="ts">
  import { apiData } from '$lib/store/team/detail'
  import { slimMode } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'
  import Date from '/src/parts/Date.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'
</script>

{#if $slimMode}
  <table>
    <tbody class="triple">
      {#each $apiData.tournaments as t, i}
        <tr>
          <th rowspan="3" style="vertical-align: middle;">#{i + 1}</th>
          <th class="tal" colspan="3">
            <TournamentName name={t.tournament_name} key={t.tournament_key} official={false} />
          </th>
        </tr>
        <tr class="tal">
          <td class="tal"><Date date={t.tournament_date} /></td>
          <td class="tal"><T t="登録チーム名" /> {t.name}</td>
          <td class="nw"><T t="結果" /> <TournamentResult rank={t.result} />
        </tr>
        <tr>
          <td class="tal" colspan="3"><PlayersLine players={t.player_list} /></td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <table>
    <thead>
    <tr>
      <th class="tar">#</th>
      <th>開催日</th>
      <th class="tal">大会名</th>
      <th>結果</th>
      <th class="tal">登録チーム名</th>
      <th class="tal">メンバー</th>
    </tr>
    </thead>
    <tbody>
    {#each $apiData.tournaments as t, i}
      <tr>
        <td class="tar">{i + 1}</td>
        <td><Date date={t.tournament_date} /></td>
        <td class="tal">
          <TournamentName name={t.tournament_name} key={t.tournament_key} official={false} />
        </td>
        <td><TournamentResult rank={t.result} /></td>
        <td class="tal">{t.name}</td>
        <td class="tal"><PlayersLine players={t.player_list} /></td>
      </tr>
    {/each}
    </tbody>
  </table>
{/if}
