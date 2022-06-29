<script lang="ts">
  import { base } from '$app/paths'
  import { tournamentMaster } from '$lib/store/global'
  import PopUpA from '/src/parts/popup/PopUpA.svelte'
  import TournamentPopUp from '/src/parts/popup/TournamentPopUp.svelte'

  export let name: string
  export let key: string
  export let official = false
  export let rating = false
</script>

{#if official}<span style="color: greenyellow">✔</span>{/if}{#if rating}📈{/if}
<PopUpA href="{base}/tournament/detail/?t={key}" text={name} condition={!!$tournamentMaster.dic[key]}>
  <TournamentPopUp tournament={$tournamentMaster.dic[key]} />
</PopUpA>