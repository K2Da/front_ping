<script lang="ts">
  import { page_size, teamList, filterString, pageNo } from '$lib/store/team'
  import { slimMode } from '$lib/store/global'
  import Pager from '/src/parts/pages/team/Pager.svelte'
  import Header from '/src/parts/Header.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import T from '/src/parts/T.svelte'

  function filter(event) {
    $filterString = event.target.value
    $pageNo = 1
  }

</script>

<Header title="チーム一覧" type="article" url="team" description="ポケモンユナイトの大会のチームの一覧" />

<h2>チーム</h2>

<div>
  <input on:input={filter}
         placeholder="チーム名"
         style="box-sizing: border-box; width: 100%"
         value={$filterString} />
</div>

<Pager />

<table style="table-layout: auto">
  {#if $slimMode}
    <tbody class="triple">
    {#if Array.isArray($teamList)}
      {#each $teamList as team, i}
        {#if ($pageNo - 1) * page_size <= i && i < $pageNo * page_size}
          <tr>
            <td class="nw" rowspan="3" style="vertical-align: middle">{(i + 1).toLocaleString()}</td>
            <td class="tal nw">
              <TeamName name={team.name} current_name={team.name} />
            </td>
            <td class="nw">{team.tournament_count}<T t=" 大会" /></td>
            <td class="nw">{team.win}<T t=" 勝" /></td>
            <td class="nw">{team.lose}<T t=" 敗" /></td>
          </tr>
          <tr>
            <td class="tal" colspan="4">
              <T t="大会登録名" />
              {#each team.names.filter(n => team.name !== n) as name, index}
                {#if index !== 0}, {/if}{name}
              {/each}
            </td>
          </tr>
          <tr>
            <td class="tal" colspan="4">
              {team.members.length}
              <T t="名" />
              <PlayersLine players={team.members} />
            </td>
          </tr>
        {/if}
      {/each}
    {:else}
      <PlaceHolder />
    {/if}
    </tbody>
  {:else}
    <thead>
      <tr>
        <th></th>
        <th>チーム名</th>
        <th colspan="3">戦績</th>
        <th>大会登録チーム別名</th>
        <th>参加プレイヤー</th>
      </tr>
      </thead>
      <tbody>
      {#if Array.isArray($teamList)}
        {#each $teamList as team, i}
          {#if ($pageNo - 1) * page_size <= i && i < $pageNo * page_size}
            <tr>
              <td class="nw">{(i + 1).toLocaleString()}</td>
              <td class="tal nw"><TeamName name={team.name} current_name={team.name} /></td>
              <td class="nw">{team.tournament_count}<T t=" 大会" /></td>
              <td class="nw">{team.win}<T t=" 勝" /></td>
              <td class="nw">{team.lose}<T t=" 敗" /></td>
              <td class="tal">
                {#each team.names.filter(n => team.name !== n) as name, index}
                  {#if index !== 0}, {/if}{name}
                {/each}
              </td>
              <td class="tal">
                {team.members.length}
                <T t="名" />
                <PlayersLine players={team.members} />
              </td>
            </tr>
          {/if}
        {/each}
      {:else}
        <PlaceHolder />
      {/if}
    </tbody>
  {/if}
</table>

<Pager />
