<script lang="ts">
  import { page_size, playerList, showSns, showTournament, pageNo } from '$lib/store/player'
  import { base } from '$app/paths'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import Date from '/src/parts/Date.svelte'
  import T from '/src/parts/T.svelte'
  import Twitter from '/src/parts/link/Twitter.svelte'
  import Youtube from '/src/parts/link/Youtube.svelte'
  import Twitch from '/src/parts/link/Twitch.svelte'
</script>

<table style="table-layout: auto">
  <tbody class="quad">
  {#if Array.isArray($playerList)}
    {#each $playerList as player, i}
      {#if ($pageNo - 1) * page_size <= i && i < $pageNo * page_size}
        <tr>
          <td rowspan="4" style="vertical-align: middle">{(i + 1).toLocaleString()}</td>
          <td class="tal">
            <a href="{base}/player/detail/?p={player.hash}">{player.name}</a>
            <T>{#if player.data?.aliases?.length > 0}({player.data?.aliases?.join(', ')}){/if}</T>
          </td>
          <td class="tar">
            {player.entries}
            <T>大会</T>
            {player.win}
            <T>勝</T>
            {player.lose}
            <T>敗</T>
            <T>ratings</T>
            {(player.rating ?? 0).toLocaleString()}
          </td>
        </tr>
        <tr>
          <td class="tal" colspan="2">
            <T>最新</T>
            <Date date={player.latest.date} spacing={false} />
            <T>チーム</T>
            <TeamName name={player.latest.team} />
          </td>
        </tr>
        <tr>
          <td class="tal" colspan="2">
            <T>大会</T>
            {player.latest.tournament}
          </td>
        </tr>
        <tr>
          <td class="tal" colspan="2">
            <Twitter account={player.data?.twitter} />
            <Youtube channel={player.data?.youtube && player.data.youtube[0]} name={player.data?.youtube && player.data.youtube[1]} />
            <Twitch account={player.data?.twitch} />
          </td>
        </tr>
      {/if}
    {/each}
  {:else}
    <PlaceHolder />
  {/if}
  </tbody>
</table>