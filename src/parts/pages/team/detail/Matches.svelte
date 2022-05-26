<script lang="ts">
  import { apiData } from '$lib/store/team/detail'
  import { slimMode } from '$lib/store/global'
  import PlayerLine from '/src/parts/PlayersLine.svelte'
  import MatchResult from '/src/parts/MatchResult.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'
  import T from '/src/parts/T.svelte'
  import Date from '/src/parts/Date.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
</script>

{#each $apiData.tournaments as t}
  <h3 id={t.tournament_key}>
    <TournamentName name={t.tournament_name} key={t.tournament_key} official={false} />
  </h3>
  <dl>
    <dt>開催日</dt>
    <dd><Date date={t.tournament_date} spacing={false} /></dd>
    <dt>エントリーチーム名</dt>
    <dd>{t.name}</dd>
    <dt>結果</dt>
    <dd><TournamentResult rank={t.result} /></dd>
    <dt>メンバー</dt>
    <dd><PlayersLine players={t.player_list} /></dd>
  </dl>

  {#if $slimMode}
    <table>
      <tbody class="triple">
        {#each $apiData.matches as m}
          {#if m.tnmt_key === t.tournament_key }
            <tr>
              <td class="tal">{m.bracket} <T t="R " /> {m.round} <MatchResult win={m.wl} /></td>
              <td>{m.score_text}</td>
            </tr>
            <tr>
              <td class="tal">
                <T t="vs. " />
                <TeamName name={m.opponent_team_name} current_name={m.opponent_team_current_name} />
              </td>
              <td><T t="" /> <TournamentResult rank={m.opponent_team_rank} /></td>
            </tr>
            <tr>
              <td colspan="2" class="tal" style="padding-left: 1em"><PlayerLine players={m.opponents_list} /></td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  {:else}
    <table>
      <thead>
        <tr>
          <th style="width: 6%">ブラケット</th>
          <th style="width: 6%">ラウンド</th>
          <th style="width: 6%">勝敗</th>
          <th style="width: 6%">スコア</th>
          <th style="width: 23%; text-align: left">対戦相手</th>
          <th style="width: 6%">順位</th>
          <th style="width: 47%; text-align: left">メンバー</th>
        </tr>
      </thead>
      <tbody>
      {#each $apiData.matches as m}
        {#if m.tnmt_key === t.tournament_key }
          <tr>
            <td>{m.bracket}</td>
            <td>{m.round}</td>
            <td><MatchResult win={m.wl} /></td>
            <td>{m.score_text}</td>
            <td class="tal"><TeamName name={m.opponent_team_name} current_name={m.opponent_team_current_name} /></td>
            <td><TournamentResult rank={m.opponent_team_rank} /></td>
            <td class="tal"><PlayerLine players={m.opponents_list} /></td>
          </tr>
        {/if}
      {/each}
      </tbody>
    </table>
  {/if}
{/each}