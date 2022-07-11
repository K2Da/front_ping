<script lang="ts">
  import PopUp from '/src/parts/popup/PopUp.svelte'

  export let href: string;
  export let text: string;
  export let condition: boolean;
  export let max_width = 640;
  export let css_class = '';

  let rect: DOMRect
  let popup = false

  function over(e: { originalTarget: { getBoundingClientRect: () => DOMRect }}) {
    rect = e.originalTarget.getBoundingClientRect()
    popup = true
  }

  function leave() {
    popup = false
  }
</script>

<style>
  span { position: relative }
</style>


{#if condition}
<span><a
  href={href}
  class={css_class}
  on:mouseover={over}
  on:focus={over}
  on:mouseleave={leave}
  on:focusout={leave}>{text}</a>{#if popup}<PopUp {max_width} {rect}><slot /></PopUp>{/if}</span>
{:else}
  <a href={href} class={css_class}>{text}</a>
{/if}