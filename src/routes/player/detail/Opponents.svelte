<script lang="ts">
  import { opponentsData } from './opponents_store'
  import { base } from '$app/paths'
  import { sha1 } from '../../../util'
  import T from '/src/parts/T.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
</script>

<h4>試合の多いプレイヤー(2戦以上)</h4>
<table>
  <thead>
  <tr>
    <th class="nw" style="width: 7em"></th>
    <th></th>
  </tr>
  </thead>
  <tbody>
    {#each $opponentsData as m}
      <tr>
        <td class="nw">{m.win} <T t="勝" /> {m.lose} <T t="敗" /></td>
        <td class="tal"><PlayersLine players={m.names} /></td>
      </tr>
    {/each}
  </tbody>
</table>