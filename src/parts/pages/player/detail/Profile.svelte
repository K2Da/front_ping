<script lang="ts">
  import { apiData } from '$lib/store/player/detail'
  import { slimMode } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
</script>

<h4>基本情報</h4>
<table>
  <thead>
  <tr style="">
    <th style="{$slimMode ? '' : 'width: 20%'}"></th>
    <th style="{$slimMode ? '' : 'width: 80%'}"></th>
  </tr>
  </thead>
  <tbody>
  {#if $apiData.data}
    <tr>
      <th class="tal">エントリー名</th>
      <td class="tal">{[...new Set($apiData.tournaments.map((t) => t.member_name))].join(', ')}</td>
    </tr>
  {/if}
  <tr>
    <th class="tal">戦績</th>
    <td class="tal">
      {$apiData.player.entries}<T t=" 大会エントリー" /> {$apiData.player.win}<T t=" 勝" /> {$apiData.player.lose}<T t=" 敗" />
    </td>
  </tr>
  <tr>
    <th class="tal">レート</th>
    <td class="tal">{($apiData.player.rating ?? 0).toLocaleString()}</td>
  </tr>
  {#if $apiData.data}
    {#if $apiData.data.twitter}
      <tr>
        <th class="tal"><i class="fab fa-twitter"></i> twitter</th>
        <td class="tal"><a href="https://twitter.com/{$apiData.data.twitter}">@{$apiData.data.twitter}</a></td>
      </tr>
    {/if}
    {#if $apiData.data.youtube}
      <tr>
        <th class="tal"><i class="fab fa-youtube"></i> youtube</th>
        <td class="tal"><a href="https://www.youtube.com/{$apiData.data.youtube[0]}">{$apiData.data.youtube[1]}</a></td>
      </tr>
    {/if}
    {#if $apiData.data.twitch}
      <tr>
        <th class="tal"><i class="fab fa-twitch"></i> twitch</th>
        <td class="tal"><a href="https://www.twitch.tv/{$apiData.data.twitch}">{$apiData.data.twitch}</a></td>
      </tr>
    {/if}
  {/if}
  </tbody>
</table>