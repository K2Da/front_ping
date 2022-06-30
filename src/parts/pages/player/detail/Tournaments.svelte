<script lang="ts">
  import { apiData } from '$lib/store/player/detail'
  import { slimMode } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'
  import Date from '/src/parts/Date.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TeamName from '/src/parts/TeamName.svelte'

  function rate(t: null | number) {
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
          <td class="nw">{#if t.rating == null}-{:else}{rate(t.rating)} <T>({rate(t.rank)}位 / {rate(t.total)}人)</T>{/if}</td>
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
        <th colspan="3">rating (順位 / 全体人数)</th>
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
          <td class="tar">{rate(t.rank)}</td>
          <td class="tar">{rate(t.total)}</td>
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