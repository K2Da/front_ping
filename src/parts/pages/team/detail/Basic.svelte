<script lang="ts">
  import { apiData } from '$lib/store/team/detail'
  import { slimMode } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import Span from '/src/parts/Span.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
</script>
<table>
  <thead style="border-bottom: 0">
  <tr>
    <th style="{$slimMode ? '' : 'width: 20%'}"></th>
    <th style="{$slimMode ? '' : 'width: 80%'}"></th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <th class="tal">活動期間</th>
    <td class="tal">
      <Span date1={$apiData.team.first_tournament_date} date2={$apiData.team.latest_tournament_date} length=true />
    </td>
  </tr>
  <tr>
    <th class="tal">戦績</th>
    <td class="tal">
      {#if $apiData.team.win !== 0 || $apiData.team.lose !== 0}
        {$apiData.team.tournament_count}<T t=" 大会" />
        <T>優勝 </T>{$apiData.team.top_1} <T>回</T>
        <T>Top4 </T>{$apiData.team.top_4} <T>回</T>
        {$apiData.team.win}<T t=" 勝" />
        {$apiData.team.lose}<T t=" 敗" />
      {:else}
        -
      {/if}
    </td>
  </tr>
  <tr>
    <th class="tal">大会参加登録チーム名</th>
    <td class="tal">
      {#each $apiData.team.names as name, index}
        {#if index !== 0}, {/if}{name}
      {/each}
    </td>
  </tr>
  <tr>
    <th class="tal">歴代メンバー</th>
    <td class="tal">
      <PlayersLine players={$apiData.team.members} />
    </td>
  </tr>
  </tbody>
</table>
