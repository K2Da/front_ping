<script lang="ts">
  import { ga_view } from '$lib/store/global'

  export let title: string
  export let type: string
  export let url: string
  export let description: string

  function title_ga() {
    ga_view(title)
    return title
  }
</script>

<svelte:head>
  <title>Center Pin(g): {title_ga()}</title>

  <meta property="og:type" content="{type}" />
  <meta property="og:url" content="https://center-ping.pages.dev/{url}" />
  <meta property="og:site_name" content="Center Pin(g)" />
  <meta property="og:description" content="{description}" />
  <meta name="twitter:card" content="summary" />
</svelte:head>
