<script lang="ts">
  import { matesData } from './mates_store'
  import { base } from '$app/paths'
  import { sha1 } from '../../../util'
</script>

<table>
  <thead>
  <tr>
    <th class="nw">大会数</th>
    <th class="nw">戦績</th>
    <th class="tal">チームメイト</th>
  </tr>
  </thead>
  <tbody>
    {#each $matesData as m}
      <tr>
        <td class="nw">{m.entry}大会</td>
        <td class="nw">{m.win}勝{m.lose}敗</td>
        <td class="tal">
          {#each m.names as name, i}
            {#if i > 0}, {/if}
            <a href="{base}/player/detail/?p={sha1(name)}">{name}</a>
          {/each}
        </td>
      </tr>
    {/each}
  </tbody>
</table>