<script lang="ts">
  import { base } from '$app/paths'

  export let name: string
  export let key: string
</script>

<a href="{base}/tournament/detail/?t={key}">{name}</a>