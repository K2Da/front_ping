<script lang="ts">
  import type { PlayerIndex } from '$lib/api/PlayerIndex'
  import T from '/src/parts/T.svelte'
  import S from '/src/parts/S.svelte'
  import Date from '/src/parts/Date.svelte'

  export let player: PlayerIndex
</script>

<h3>{player.name}</h3>
{#if player.data && player.data.aliases.length > 0}<p><T>登録名 </T>{player.data.aliases.join(", ")}</p>{/if}
<p>
  <T t="rating " />{#if player.rating}{player.rating.toLocaleString()}{/if}
  <S s={2} />
  {player.entries}<T t=" 大会エントリー" />
  <S s={2} />
  {player.win}<T t=" 勝" />
  <S s={2} />
  {player.lose}<T t=" 敗" />
</p>
{#if player.latest}
  <h4>最新大会</h4>
  <p>
    <Date date={player.latest.date} spacing={false} /> {player.latest.tournament_name}
  </p>
  <p>
    <T t="チーム " />{player.latest.team}
  </p>
{/if}
