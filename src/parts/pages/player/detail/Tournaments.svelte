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
      <tbody class="double">
      {#each $apiData.tournaments as t, i}
        <tr>
          <td class="tal">
            <T>#{i + 1}</T>
            <Date date={t.tournament_date} spacing={false} />
          </td>
          <td class="nw"><TournamentResult rank={t.team_result} />
          <td class="nw"><T>{rate(t.rating)}</T></td>
        </tr>
        <tr>
          <td colspan="3" class="tal">
            <a href="#{t.tournament_key}">{t.tournament_name}</a>
          </td>
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
          <td class="tal"><a href="#{t.tournament_key}">{t.tournament_name}</a></td>
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