<script lang="ts">
  import { selectedMembers } from '$lib/store/log'
  import Date from '/src/parts/Date.svelte'
  import TeamMatches from './TeamMatches.svelte'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'
</script>

<h2>{$selectedMembers?.left} 🆚 {$selectedMembers?.right}</h2>
<h3>対戦</h3>
{#if $selectedMembers.relation.matches.length > 0}
  <TeamMatches
    matches={$selectedMembers.relation.matches}
    left={$selectedMembers.left}
  />
{:else}
  <p>-</p>
{/if}

<h3>同一チーム出場</h3>
{#if $selectedMembers.relation.mix_teams.length > 0}
  <table>
    <tbody>
    {#each $selectedMembers.relation.mix_teams as team}
      <tr>
        <td><Date date={team.tournament_date} /></td>
        <td class="tal"><TournamentName name={team.tournament_name} key={team.tournament_key} official={false} /></td>
        <td class="tal"><TeamName name={team.team_name} /></td>
        <td><TournamentResult rank={team.team_rank} /></td>
        <td class="tal"><PlayersLine players={team.team_players} /></td>
      </tr>
    {/each}
    </tbody>
  </table>
{/if}