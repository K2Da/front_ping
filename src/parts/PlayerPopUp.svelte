<script lang="ts">
  import type { PlayerIndex } from '$lib/api/PlayerIndex'
  import T from '/src/parts/T.svelte'
  import S from '/src/parts/S.svelte'

  export let player: PlayerIndex
</script>

<style>
h3 {
  padding: 0;
  margin: 0;
}
</style>

<h3>{player.name}</h3>
<p>
  <T t="rating " />{player.rating}
  <S s={2} />
  {player.entries}<T t=" 大会エントリー" />
  <S s={2} />
  {player.win}<T t=" 勝" />
  <S s={2} />
  {player.lose}<T t=" 敗" />
</p>
