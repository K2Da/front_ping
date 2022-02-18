<script lang="ts">
  import { matesData } from '$lib/store/player/detail/mates'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import T from '/src/parts/T.svelte'
</script>

<h4>チームメイト</h4>
<table>
  <thead>
  <tr>
    <th class="nw" style="width: 5em"></th>
    <th class="nw" style="width: 7em"></th>
    <th></th>
  </tr>
  </thead>
  <tbody>
    {#each $matesData as m}
      <tr>
        <td class="nw">{m.entry}<T t=" 大会" /></td>
        <td class="nw">{m.win}<T t=" 勝" /> {m.lose}<T t=" 敗" /></td>
        <td class="tal"><PlayersLine players={m.names} /></td>
      </tr>
    {/each}
  </tbody>
</table>