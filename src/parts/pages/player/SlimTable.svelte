<script lang="ts">
  import { page_size, playerList, pageNo } from '$lib/store/player';
  import { cssClass } from '$lib/util';
  import { base } from '$app/paths';
  import PlaceHolder from '/src/parts/PlaceHolder.svelte';
  import TeamName from '/src/parts/TeamName.svelte';
  import Date from '/src/parts/Date.svelte';
  import T from '/src/parts/T.svelte';
  import TournamentName from '/src/parts/TournamentName.svelte';
  import Twitter from '/src/parts/link/Twitter.svelte';
  import Youtube from '/src/parts/link/Youtube.svelte';
  import Twitch from '/src/parts/link/Twitch.svelte';
</script>

{#if Array.isArray($playerList)}
  <table style="table-layout: auto">
    <tbody class="double">
      {#each $playerList as player, i}
        {#if ($pageNo - 1) * page_size <= i && i < $pageNo * page_size}
          <tr>
            <td class="row_no">{player.rank.toLocaleString()}:</td>
            <td class="tal">
              <a href="{base}/player/detail/?p={player.hash}" class={cssClass(player.rating)}>{player.name}</a>
              <T>{#if player.data?.aliases?.length > 0}({player.data?.aliases?.join(', ')}){/if}</T>
            </td>
            <td class="tar">
              {(player.rating ?? 0).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td class="tal" style="padding-left: 2em;" colspan="3">
              {player.entries}<T>大会</T>
              {#if player.top_1 > 0}<T>🥇 </T>{player.top_1}<T>回</T>{/if}
              {#if player.top_4 > 0}<T>Top4 </T>{player.top_4}<T>回</T>{/if}
              {player.win}<T>勝</T>
              {player.lose}<T>敗</T>

              <br />
              <T>📅</T>
              <Date date={player.latest.date} spacing={false} />
              <br />
              <T>🚩</T>
              <TeamName name={player.latest.team} current_name={player.latest.team_current} />
              <br />
              <T>⚔</T>
              <TournamentName name={player.latest.tournament_name} key={player.latest.tournament_key} official={false} />
              <br />
              <Twitter account={player.data?.twitter} />
              <Youtube channel={player.data?.youtube && player.data.youtube[0]} name={player.data?.youtube && player.data.youtube[1]} />
              <Twitch account={player.data?.twitch} />
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
{:else}
  <PlaceHolder />
{/if}
