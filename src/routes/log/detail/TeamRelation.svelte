<style>
    button { padding: 1px 20px; margin: 6px; }
    table td { vertical-align: middle; }
</style>

<script lang="ts">
  import { selectedTeams, teamRelation, selectedMembers, tk, select_members } from './index_store'
  import TeamMatches from './TeamMatches.svelte'
  import PlayerName from '/src/parts/PlayerName.svelte'
  import MemberRelation from './MemberRelation.svelte'
</script>

{#if $selectedTeams}
  <h2>{$selectedTeams?.left.name} : {$selectedTeams?.right.name}</h2>
  <h3>対戦</h3>
  <TeamMatches
    matches={$teamRelation[tk($selectedTeams.left.name, $selectedTeams.right.name)].matches}
    left={$selectedTeams.left.name}
  />

  <h3>メンバー</h3>
  <table style="margin-top: 10px">
    <thead>
      <tr>
        <td style="width: {$selectedTeams.column_width}%"></td>
        {#each $selectedTeams.right.members as r}
          <td style="width: {$selectedTeams.column_width}%">
            <PlayerName name={r} />
          </td>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each $selectedTeams.left.members as l}
        <tr>
          <td class="tar">
            <PlayerName name={l} />
          </td>
          {#each $selectedTeams.right.members as r}
            {@const wl = $selectedTeams.member_relation[`${l}\t${r}`].wl}
            <td>
              {#if wl[0] !== 0 || wl[1] !== 0}{wl[0]} - {wl[1]}{/if}
              <br />
              <button on:click={() => select_members($selectedTeams, l, r)}>-</button>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  {#if $selectedMembers}
    <MemberRelation />
  {/if}
{/if}