<script lang="ts">
  import PopUp from '/src/parts/PopUp.svelte'

  export let href: string
  export let text: string
  export let max_width: number
  let rect: DOMRect

  let popup = false

  function over(player: string) {
    return (e: { originalTarget: { getBoundingClientRect: () => DOMRect }}) => {
      rect = e.originalTarget.getBoundingClientRect()
      popup = true
    }
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
  on:mouseover={over(text)}
  on:focus={over(text)}
  on:mouseleave={leave}
  on:focusout={leave}>{text}</a>{#if popup}<PopUp {max_width} {rect}><slot /></PopUp>{/if}</span>