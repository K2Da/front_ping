<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '$lib/util'

  export let name: string
</script>

<a href="{base}/player/detail/?p={sha1(name)}">{name}</a>