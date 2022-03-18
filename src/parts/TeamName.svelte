<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '$lib/util'
  import { teamMaster } from '$lib/store/global'
  import PopUpA from '/src/parts/popup/PopUpA.svelte'
  import TeamPopUp from '/src/parts/popup/TeamPopUp.svelte'
  import T from '/src/parts/T.svelte'

  export let name: string
  export let current_name: string
  export let show_results = false

  $: master = $teamMaster?.dic[current_name]
</script>
<PopUpA href="{base}/team/detail/?m={sha1(current_name)}" text={name} condition={!!master}>
  <TeamPopUp team={$teamMaster.dic[current_name]} />
</PopUpA>
{#if show_results && master}
  <T>(</T> {master.tournament_count} <T>大会</T> {master.win} <T>勝</T> {master.lose} <T>敗)</T>
{/if}