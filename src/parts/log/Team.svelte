<script lang="ts">
  import type * as api from '$lib/api/types'
  import PlayersLine from '/src/parts/PlayersLine.svelte'
  import T from '/src/parts/T.svelte'
  import S from '/src/parts/S.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import TournamentResult from '/src/parts/TournamentResult.svelte'

  export let team_match: api.Team
</script>

<tr>
  <td class="tal" style="width: 20em;">
    <S s={2} />
    <T t="登録名 " />
    <TeamName name={team_match.name} />
  </td>
  <td class="tal" style="width: 4em;"><TournamentResult rank={team_match.rank} /></td>
  <td class="tal"><PlayersLine players={team_match.players} /></td>
</tr>