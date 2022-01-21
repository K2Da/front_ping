<script lang="ts">
  import { apiData } from './index_store'
  import { base } from '$app/paths'
  import { sha1 } from '../../../util'
</script>

{#if $apiData}
  <table>
    <thead>
    <tr>
      <th class="tal">大会名</th>
      <th>開催日</th>
      <th>結果</th>
      <th>rating</th>
      <th class="tal">チーム名</th>
      <th class="tal">エントリー名</th>
      <th class="tal">メンバー</th>
    </tr>
    </thead>
    <tbody>
    {#each $apiData.tournaments as t}
      <tr>
        <td class="tal"><a href="#{t.tournament_key}">{t.tournament_name}</a></td>
        <td>{new Date(t.tournament_date).toLocaleDateString()}</td>
        <td>{t.team_result === 0 ? '-' : `${t.team_result}位`}</td>
        <td>{t.rating.toLocaleString()}</td>
        <td class="tal">{t.team_name}</td>
        <td class="tal">{t.member_name}</td>
        <td class="tal">
          {#each t.mate_list as member, index}
            {#if index !== 0}, {/if}
            <a href="{base}/player/detail/?p={sha1(member)}">{member}</a>
          {/each}
        </td>
      </tr>
    {/each}
    </tbody>
  </table>

  {#each $apiData.tournaments as t}
    <h4 id={t.tournament_key}>{t.tournament_name}</h4>

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
            <td style="font-weight: bold">
              {#if m.opponent_team_key === m.loser_key}
                <span style='color: red'>W</span>
              {:else}
                <span style='color: dodgerblue;'>L</span>
              {/if}
            </td>
            <td>
              {#if m.opponent_team_key === m.loser_key}
                {m.winner_score} - {m.loser_score}
              {:else}
                {m.loser_score} - {m.winner_score}
              {/if}
            </td>
            <td class="tal">{m.opponent_team_name}</td>
            <td>{m.opponent_team_rank === 0 ? '-' : `${m.opponent_team_rank}位`}</td>
            <td class="tal">
              {#each m.opponents_list as member, index}
                {#if index !== 0}, {/if}
                <a href="{base}/player/detail/?p={sha1(member)}">{member}</a>
              {/each}
            </td>
          </tr>
        {/if}
      {/each}
      </tbody>
    </table>
  {/each}
{/if}