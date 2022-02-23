<script lang="ts">
  import type { TeamIndex } from '$lib/api/TeamIndex'
  import T from '/src/parts/T.svelte'
  import Date from '/src/parts/Date.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'

  export let team: TeamIndex
</script>

<h3>{team.name}</h3>
<p>
  <T t="大会登録名 " />{team.names.join(", ")}
</p>

<h4>戦績</h4>
<p>
  {team.tournament_count}
  <T t="大会" />
  {team.win}
  <T t="勝" />
  {team.lose}
  <T t="敗" />
</p>

<h4>最新大会</h4>
<p>
  <Date date={team.latest_tournament_date} spacing={false} /> {team.latest_tournament_name}
  <TournamentResult rank={team.latest_tournament_rank} />
</p>

<h4>メンバー</h4>
<p>
  {team.members.join(", ")}
</p>
