<script lang="ts">
  import type * as api from '$lib/api/types'
  import Date from '/src/parts/Date.svelte'
  import TournamentName from '/src/parts/TournamentName.svelte'
  import T from '/src/parts/T.svelte'
  import S from '/src/parts/S.svelte'
  import Team from './Team.svelte'
  import MatchResult from '/src/parts/MatchResult.svelte'

  export let match: api.Match
  export let teams: api.SplitTeam
</script>

{#if match}
  <tr>
    <td class="tal" colspan="3">
      <Date date={match.tournament_date} />
      <S s={2} />
      <T t="大会" />
      <TournamentName name={match.tournament_name} key={match.tournament_key} />
      {#if match.match_bracket}
        <S s={2} />
        <T t="ブラケット" />
        {match.match_bracket}
      {/if}
      <S s={2} />
      <T t="ラウンド" />
      {match.match_round}
    </td>
  </tr>
  <tr>
    <td class="tal" colspan="3">
      <S s={2} />
      <T t="結果" />
      <S s={1} />
      {teams.team1.current_name}
      <S s={2} />
      <MatchResult win={teams.team1.result === 'w'} />
      <S s={1} />
      {teams.team1.score} - {teams.team2.score}
      <S s={1} />
      <MatchResult win={teams.team2.result === 'w'} />
      <S s={2} />
      {teams.team2.current_name}
    </td>
  </tr>
  <Team team_match={teams.team1} />
  <Team team_match={teams.team2} />
{/if}