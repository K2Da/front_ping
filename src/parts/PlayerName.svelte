<script lang="ts">
  import { base } from '$app/paths'
  import { sha1, cssClass } from '$lib/util'
  import { playerMaster } from '$lib/store/global'
  import PopUpA from '/src/parts/popup/PopUpA.svelte'
  import PlayerPopUp from '/src/parts/popup/PlayerPopUp.svelte'

  export let name: string

</script>

{#if !!$playerMaster.dic[name]}
  <PopUpA href="{base}/player/detail/?p={sha1(name)}"
          text={name}
          condition={!!$playerMaster.dic[name]}
          css_class={cssClass($playerMaster.dic[name].rating)}>
    <PlayerPopUp player={$playerMaster.dic[name]} />
    <slot />
  </PopUpA>
{:else}
  {name}
{/if}