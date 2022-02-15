<style>
    button { padding: 1px 20px; margin: 6px; }
    table td { vertical-align: middle; }
</style>

<script lang="ts">
  import { selectedTeams, teamRelation, selectedMembers, tk, select_members } from './index_store'
  import TeamMatches from './TeamMatches.svelte'
  import PlayerName from '/src/parts/PlayerName.svelte'
  import MemberRelation from './MemberRelation.svelte'
  import T from '/src/parts/T.svelte'
</script>

<h2>{$selectedTeams?.left.name} 🆚 {$selectedTeams?.right.name}</h2>
<h3>対戦</h3>
{#if $teamRelation[tk($selectedTeams.left.name, $selectedTeams.right.name)].matches.length > 0}
  <TeamMatches
    matches={$teamRelation[tk($selectedTeams.left.name, $selectedTeams.right.name)].matches}
    left={$selectedTeams.left.name}
  />
{:else}
  <p>-</p>
{/if}

<h3>メンバー</h3>
<p>上段: 対戦成績  中段: 同一チームでの大会出場回数 下段: 詳細表示</p>
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
          {@const rel = $selectedTeams.member_relation[`${l}\t${r}`]}
          <td>
            {#if rel.wl[0] !== 0 || rel.wl[1] !== 0}{rel.wl[0]} - {rel.wl[1]}{:else}-{/if}
            <br />
            {#if rel.mix_teams.length !== 0 }{rel.mix_teams.length}<T t=" 大会" />{:else}-{/if}
            <br />
            <button on:click={() => select_members($selectedTeams, l, r)}>🔻</button>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

{#if $selectedMembers}
  <MemberRelation />
{/if}