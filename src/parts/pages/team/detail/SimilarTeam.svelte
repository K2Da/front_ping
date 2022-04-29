<script lang="ts">
  import { apiData } from '$lib/store/team/detail'
  import type { TeamDetailView } from '$lib/store/team/detail'
  import { teamMaster } from '$lib/store/global'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import Span from '/src/parts/Span.svelte'
  import type { TeamIndex } from '$lib/api/TeamIndex'

  function sort_similar_teams(teams: string[], team_dic: Record<string, TeamIndex>) {
    return teams.sort((a, b) => team_dic[b]?.first_tournament_date - team_dic[a]?.first_tournament_date);
  }

  function common_players($apiData: TeamDetailView, team: string, team_dic: Record<string, TeamIndex>) {
    return $apiData.players.filter(p => team_dic[team].members.includes(p) > 0)
  }
</script>

{#if $apiData && $teamMaster.list.length > 0 && $apiData.similar_team.length > 0}
  <h3>3名以上のメンバーが共通するチーム</h3>
  <table style="width: 100%">
    <tbody>
      {#each sort_similar_teams($apiData.similar_team, $teamMaster.dic) as name}
        {@const master = $teamMaster.dic[name] }
        <tr>
          <td class="tal" style="width: 20em">
            <TeamName name={name} current_name={name} />
          </td>
          <td class="tal">
            <Span date1={master.first_tournament_date} date2={master.latest_tournament_date} />
          </td>
          <td class="tal">
            <PlayersLine players={common_players($apiData, name, $teamMaster.dic)} />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}