<script lang="ts">
  import PopUp from '/src/parts/popup/PopUp.svelte'

  export let href: string
  export let text: string
  export let max_width = 640

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

<span><a
  href={href}
  on:mouseover={over}
  on:focus={over}
  on:mouseleave={leave}
  on:focusout={leave}>{text}</a>{#if popup}<PopUp {max_width} {rect}><slot /></PopUp>{/if}</span>