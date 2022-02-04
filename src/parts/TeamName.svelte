<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '../util'

  export let team_name: string
</script>

<a href="{base}/player/detail/?p={sha1(team_name)}">{team_name}</a>