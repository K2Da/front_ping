<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '$lib/util'
  import { playerMaster } from '$lib/store/global'
  import PopUpA from '/src/parts/popup/PopUpA.svelte'
  import PlayerPopUp from '/src/parts/popup/PlayerPopUp.svelte'

  export let name: string
  function cssClass() {
    if ($playerMaster.dic[name]) {
      if ($playerMaster.dic[name].rating > $playerMaster.t1) return 't1';
      if ($playerMaster.dic[name].rating > $playerMaster.t2) return 't2';
    }
    return '';
  }
</script>

{#if !!$playerMaster.dic[name]}
  <PopUpA href="{base}/player/detail/?p={sha1(name)}" text={name} condition={!!$playerMaster.dic[name]} css_class={cssClass()}>
    <PlayerPopUp player={$playerMaster.dic[name]} />
    <slot />
  </PopUpA>
{:else}
  {name}
{/if}