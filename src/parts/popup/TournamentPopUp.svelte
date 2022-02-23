<script lang="ts">
  import type { TournamentIndex } from '$lib/api/TournamentIndex'
  import T from '/src/parts/T.svelte'
  import Date from '/src/parts/Date.svelte'

  export let tournament: TournamentIndex
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
