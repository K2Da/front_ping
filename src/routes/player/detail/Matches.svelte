<script lang="ts">
  import { apiData } from './index_store'
  import { slimMode } from '../../global_store'
  import PlayerLine from '/src/parts/PlayersLine.svelte'
  import MatchResult from '/src/parts/MatchResult.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'
  import T from '/src/parts/T.svelte'
  import Date from '/src/parts/Date.svelte'
</script>

{#if $apiData}
  {#each $apiData.tournaments as t}
    <h4 id={t.tournament_key}>{t.tournament_name}</h4>
    <dl class="one_line">
      <dt>開催日</dt>
      <dd><Date date={t.tournament_date} /></dd>
      <dt>チーム</dt>
      <dd>{t.team_name}</dd>
      <dt>結果</dt>
      <dd><TournamentResult rank={t.team_result} /></dd>
    </dl>

    {#if $slimMode}
      <table>
        <tbody class="triple">
          {#each $apiData.matches as m}
            {#if m.tnmt_key === t.tournament_key }
              <tr>
                <td class="tal">{m.bracket} <T t="Round" /> {m.round} <T t="試合結果" /> <MatchResult win={m.wl} /></td>
                <td><T t="スコア"/> {m.score_text}</td>
              </tr>
              <tr>
                <td class="tal"><T t="対戦相手" /> {m.opponent_team_name}</td>
                <td><T t="最終順位" /> <TournamentResult rank={m.opponent_team_rank} /></td>
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
              <td class="tal">{m.opponent_team_name}</td>
              <td><TournamentResult rank={m.opponent_team_rank} /></td>
              <td class="tal"><PlayerLine players={m.opponents_list} /></td>
            </tr>
          {/if}
        {/each}
        </tbody>
      </table>
    {/if}
  {/each}
{/if}