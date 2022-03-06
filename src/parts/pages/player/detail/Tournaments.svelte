<script lang="ts">
  import { apiData } from '$lib/store/player/detail'
  import { slimMode } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'
  import Date from '/src/parts/Date.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'

  function rate(t: any) {
    if (t == null) return "-"
    return t.toLocaleString()
  }
</script>

{#if $apiData}
  {#if $slimMode}
    <table>
      <tbody class="triple">
        {#each $apiData.tournaments as t}
          <tr><th class="tal" colspan="3"><TournamentName key={t.tournament_key} name={t.tournament_name} /></th></tr>
          <tr class="tal">
            <td class="tal"><Date date={t.tournament_date} /></td>
            <td class="tal"><T t="チーム " />
              <TeamName name={t.team_name} current_name={t.team_current_name} />
            </td>
            <td class="nw"><T t="結果 " /><TournamentResult rank={t.team_result} />
          </tr>
          <tr>
            <td class="tal" colspan="3">{t.member_name}, <PlayersLine players={t.mate_list} /></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <table>
      <thead>
      <tr>
        <th>開催日</th>
        <th class="tal">大会名</th>
        <th>結果</th>
        <th>rating</th>
        <th class="tal">登録チーム名</th>
        <th class="tal">メンバー</th>
      </tr>
      </thead>
      <tbody>
      {#each $apiData.tournaments as t}
        <tr>
          <td><Date date={t.tournament_date} /></td>
          <td class="tal"><TournamentName key={t.tournament_key} name={t.tournament_name} /></td>
          <td><TournamentResult rank={t.team_result} /></td>
          <td>{rate(t.rating)}</td>
          <td class="tal">
            <TeamName name={t.team_name} current_name={t.team_current_name} />
          </td>
          <td class="tal">{t.member_name}, <PlayersLine players={t.mate_list} /></td>
        </tr>
      {/each}
      </tbody>
    </table>
  {/if}
{/if}