<script lang="ts">
  import { apiData } from '$lib/store/team/detail'
  import { playerMaster } from '$lib/store/global'
  import PlayerName from '/src/parts/PlayerName.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
</script>

<table style="width: 100%">
  <thead>
    <tr>
      <th colspan="2"></th>
      <th colspan={$apiData.reversed_tournaments.length + 1} class="tal">参加大会#</th>
    </tr>
    <tr>
      <th style="width: 10em"></th>
      <th style="width: 5em">rating</th>
      <th class="tal" style="width: 100px">前チーム</th>
      {#each $apiData.reversed_tournaments as t, i}
        <th style="width: 2em" >
          <TournamentName
            name={$apiData.reversed_tournaments.length - i}
            key={t.tournament_key}
            official={false}
          />
        </th>
      {/each}
      <th class="tal">最新チーム</th>
    </tr>
  </thead>
  <tbody>
    {#each $apiData.players as p}
      {@const previous_team = $apiData.previous_teams[p]}
      {@const player = $playerMaster.dic[p]}
      <tr>
        <td class="tal"><PlayerName name={p} /></td>
        <td>{#if player && player.rating}{player.rating.toLocaleString()}{/if}</td>
        <td class="tal nw">
          {#if previous_team}
            <TeamName name={previous_team} current_name={previous_team} />
          {/if}
        </td>
        {#each $apiData.reversed_tournaments as t}
          <td>{#if t.player_list.indexOf(p) !== -1}➜{/if}</td>
        {/each}
        <td class="tal nw">
          {#if player && player.latest.team_current !== $apiData.team.name}
            <TeamName name={player.latest.team_current} current_name={player.latest.team_current} />
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>