<script lang="ts">
  import T from '/src/parts/T.svelte'

  export let stats: {
    tournament_count: number;
    top_1: number;
    top_4: number;
    win: number;
    lose: number;
  }
</script>

{#if stats.win !== 0 || stats.lose !== 0}
  {stats.tournament_count}<T t=" 大会出場" />
  <br />
  {#if stats.top_1 > 0}<T>🥇 </T>{stats.top_1}<T>回</T>{/if}
  {#if stats.top_4 > 0}<T>Top4 </T>{stats.top_4}<T>回</T>{/if}
  <br />
  {stats.win}<T t="勝" />
  {stats.lose}<T t="敗" />
{/if}