<script lang="ts">
  import PopUp from '/src/parts/PopUp.svelte'

  export let href: string
  export let text: string

  let popup = false

  function over(player: string) {
    return () => {
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

<span><a href={href}
  on:mouseover={over(text)}
  on:focus={over(text)}
  on:mouseleave={leave}
  on:focusout={leave}>{text}</a>{#if popup}<PopUp><slot /></PopUp>{/if}</span>