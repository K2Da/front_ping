<script lang="ts">
  import { days } from '$lib/util'
  import { page_size, teamList, filterString, pageNo } from '$lib/store/team'
  import { slimMode } from '$lib/store/global'
  import Pager from '/src/parts/pages/team/Pager.svelte'
  import Header from '/src/parts/Header.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import T from '/src/parts/T.svelte'
  import Span from '/src/parts/Span.svelte'

  function filter(event) {
    $filterString = event.target.value
    $pageNo = 1
  }
</script>

<Header title="チーム一覧" type="article" url="team" description="ポケモンユナイトの大会のチームの一覧" />

<h2>チーム</h2>

<div>
  <input on:input={filter}
         placeholder="チーム名/メンバー名"
         style="box-sizing: border-box; width: 100%"
         value={$filterString} />
</div>

<Pager />

{#if Array.isArray($teamList)}
  <table style="table-layout: auto">
    {#if $slimMode}
      <tbody class="double">
        {#each $teamList as team, i}
          {#if ($pageNo - 1) * page_size <= i && i < $pageNo * page_size}
            <tr>
              <td class="row_no">{(i + 1).toLocaleString()}:</td>
              <td class="tal" style="margin-left: 0; padding-left: 0">
                <TeamName name={team.name} current_name={team.name} />
                {#if team.names.length > 1}<T>(別名{team.names.length - 1}件)</T>{/if}
              </td>
            </tr>
            <tr>
              <td colspan="2" class="tal">
                {team.tournament_count}<T t=" 大会" />
                {#if team.top_1 > 0}<T>🥇 </T>{team.top_1}<T>回</T>{/if}
                {#if team.top_4 > 0}<T>Top4 </T>{team.top_4}<T>回</T>{/if}
                {team.win}<T t="勝" />
                {team.lose}<T t="敗" />
                <br />
                <PlayersLine players={team.members.slice(0, 5)} />
                {#if team.members.length > 5}<T>(他{team.members.length - 5}人)</T>{/if}
                <br />
                <Span date1={team.first_tournament_date} date2={team.latest_tournament_date} length=true />
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    {:else}
      <thead>
        <tr>
          <th></th>
          <th colspan="2">チーム名</th>
          <th colspan="5">戦績</th>
          <th colspan="2">活動期間</th>
          <th colspan="2">参加プレイヤー</th>
        </tr>
      </thead>
      <tbody>
        {#each $teamList as team, i}
          {#if ($pageNo - 1) * page_size <= i && i < $pageNo * page_size}
            <tr>
              <td class="nw">{(i + 1).toLocaleString()}</td>
              <td class="tal nw"><TeamName name={team.name} current_name={team.name} /></td>
              <td class="tal">{#if team.names.length > 1}<T>(別名{team.names.length - 1}件)</T>{/if}</td>
              <td class="nw">{team.tournament_count}<T t=" 大会" /></td>
              <td class="nw">{#if team.top_1 > 0}<T>🥇 </T>{team.top_1}<T>回</T>{/if}</td>
              <td class="nw">{#if team.top_4 > 0}<T>Top4 </T>{team.top_4}<T>回</T>{/if}</td>
              <td class="nw">{team.win}<T t="勝" /></td>
              <td class="nw">{team.lose}<T t="敗" /></td>
              <td class="nw tal"><Span date1={team.first_tournament_date} date2={team.latest_tournament_date} /></td>
              <td class="nw tal"><T>({days(team.first_tournament_date, team.latest_tournament_date)}日)</T></td>
              <td class="tal"><PlayersLine players={team.members.slice(0, 5)} /></td>
              <td>{#if team.members.length > 5}<T>(他{team.members.length - 5}人)</T>{/if}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
    {/if}
  </table>
{:else}
  <PlaceHolder />
{/if}

<Pager />
