<script lang="ts">
  import { apiData } from '$lib/store/team/detail'
  import { slimMode } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'
  import Date from '/src/parts/Date.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
</script>

{#if $slimMode}
  <table>
    <tbody class="double">
      {#each $apiData.tournaments as t, i}
        <tr>
          <td class="tal" colspan="2">
            <T>#{i + 1}</T>
            <Date date={t.tournament_date} spacing={false} />
          </td>
          <td class="nw"><TournamentResult rank={t.result} />
        </tr>
        <tr>
          <td colspan="3" class="tal">
            <a href="#{t.tournament_key}">{t.tournament_name}</a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <table>
    <thead>
    <tr>
      <th class="tar">#</th>
      <th>開催日</th>
      <th class="tal">大会名</th>
      <th>結果</th>
      <th class="tal">登録チーム名</th>
      <th class="tal">メンバー</th>
    </tr>
    </thead>
    <tbody>
    {#each $apiData.tournaments as t, i}
      <tr>
        <td class="tar">{i + 1}</td>
        <td><Date date={t.tournament_date} /></td>
        <td class="tal"><a href="#{t.tournament_key}">{t.tournament_name}</a></td>
        <td><TournamentResult rank={t.result} /></td>
        <td class="tal">{t.name}</td>
        <td class="tal"><PlayersLine players={t.player_list} /></td>
      </tr>
    {/each}
    </tbody>
  </table>
{/if}
