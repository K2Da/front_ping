<script lang="ts">
  import { apiData } from '$lib/store/player/detail'
  import TournamentsStats from '/src/parts/TournamentsStats.svelte'
</script>

<style>
    p { padding-left: 1em; }
</style>

<dl>
{#if $apiData.data}
  <dt>エントリー名</dt>
  <dd>{[...new Set($apiData.tournaments.map((t) => t.member_name))].join(', ')}</dd>
{/if}
<dt>戦績</dt>
  <dd>
    <TournamentsStats stats={ { ...$apiData.player, tournament_count: $apiData.player.entries } } />
  </dd>

<dt>レート</dt>
<dd>{($apiData.player.rating ?? 0).toLocaleString()}</dd>

{#if $apiData.data}
  {#if $apiData.data.twitter}
    <dt><i class="fab fa-twitter"></i> twitter</dt>
    <dd><a href="https://twitter.com/{$apiData.data.twitter}">{$apiData.data.twitter}</a></dd>
  {/if}
  {#if $apiData.data.youtube}
    <dt><i class="fab fa-youtube"></i> youtube</dt>
    <dd><a href="https://www.youtube.com/channel/{$apiData.data.youtube[0]}">{$apiData.data.youtube[1]}</a></dd>
  {/if}
  {#if $apiData.data.twitch}
    <dt><i class="fab fa-twitch"></i> twitch</dt>
    <dd><a href="https://www.twitch.tv/{$apiData.data.twitch}">{$apiData.data.twitch}</a></dd>
  {/if}
{/if}
</dl>
