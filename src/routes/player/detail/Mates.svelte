<script lang="ts">
  import { matesData } from './mates_store'
  import { base } from '$app/paths'
  import { sha1 } from '../../../util'
</script>

<table>
  <thead>
  <tr>
    <th class="tal">チームメイト</th>
    <th>参加大会数</th>
    <th>戦績</th>
  </tr>
  </thead>
  <tbody>
    {#each $matesData as m}
      <tr>
        <td class="tal">
          {#each m.names as name, i}
            {#if i > 0}, {/if}
            <a href="{base}/player/detail/?p={sha1(name)}">{name}</a>
          {/each}
        </td>
        <td>{m.entry}大会</td>
        <td>{m.win}勝{m.lose}敗</td>
      </tr>
    {/each}
  </tbody>
</table>