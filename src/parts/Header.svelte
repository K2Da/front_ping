<script lang="ts">
  import { browser } from '$app/env'
  import { ga_view } from '$lib/store/global'

  export let title: string
  export let type: string
  export let url: string
  export let description: string

  function title_ga(t) {
    if (browser) ga_view(t);
    return t;
  }
</script>

<svelte:head>
  <title>Center Pin(g): {title_ga(title)}</title>

  <meta property="og:title" content={title} />
  <meta property="og:type" content={type} />
  <meta property="og:url" content="https://center-ping.pages.dev/{url}" />
  <meta property="og:site_name" content="Center Pin(g)" />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://center-ping.pages.dev/ogp.png" />
  <meta name="twitter:card" content="summary" />
</svelte:head>
