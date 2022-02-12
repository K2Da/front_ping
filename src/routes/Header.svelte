<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { ga_view } from "./global_store";

  export let title: string
  export let type: string
  export let url: string
  export let description: string

  afterNavigate(() => { ga_view(title) })
</script>

<svelte:head>
  <title>Center Pin(g): {title}</title>

  <meta property="og:type" content="{type}" />
  <meta property="og:url" content="https://k2da.github.io/center_pin_g/{url}" />
  <meta property="og:site_name" content="Center Pin(g)" />
  <meta property="og:description" content="{description}" />
  <meta name="twitter:card" content="summary" />
</svelte:head>
