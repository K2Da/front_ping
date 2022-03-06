<script lang="ts">
  import type { Tournaments } from '$lib/api/Tournaments'
  import { tournamentMaster } from '$lib/store/global'
  import T from '/src/parts/T.svelte'
  import Date from '/src/parts/Date.svelte'
  import TeamsLine from '/src/parts/TeamsLine.svelte'

  export let tournament: Tournaments
</script>

<h3>{tournament.name}</h3>
<p>
  <Date date={tournament.date} spacing={false} />
</p>
<h4>参加数</h4>
<p>
  <T t="team" /> {tournament.team_count.toLocaleString()}
  <T t="player" /> {tournament.player_count.toLocaleString()}
  <T t="matches" /> {tournament.match_count.toLocaleString()}
</p>
<h4>結果</h4>
<p>
  <TeamsLine teams={$tournamentMaster.winners[tournament.key]} />
</p>
