<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '$lib/util'
  import { teamMaster } from '$lib/store/global'
  import PopUpA from '/src/parts/popup/PopUpA.svelte'
  import TeamPopUp from '/src/parts/popup/TeamPopUp.svelte'

  export let name: string
</script>
<PopUpA href="{base}/team/detail/?m={sha1(name)}"} text={name} condition={!!$teamMaster?.dic[name]}>
  <TeamPopUp team={$teamMaster.dic[name]} />
</PopUpA>