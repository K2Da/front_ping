<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '../util'

  export let name: string
</script>

<a href="{base}/team/detail/?t={sha1(name)}">{name}</a>