<script lang="ts">
  import { opponentsData } from './opponents_store'
  import { base } from '$app/paths'
  import { sha1 } from '../../../util'
</script>

<table>
  <thead>
  <tr>
    <th class="tal">対戦通算(計2戦以上)</th>
    <th>戦績</th>
  </tr>
  </thead>
  <tbody>
    {#each $opponentsData as m}
      <tr>
        <td class="tal">
          {#each m.names as name, i}
            {#if i > 0}, {/if}
            <a href="{base}/player/detail/?p={sha1(name)}">{name}</a>
          {/each}
        </td>
        <td>{m.win}勝{m.lose}敗</td>
      </tr>
    {/each}
  </tbody>
</table>