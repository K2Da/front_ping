<script lang="ts">
  import { base } from '$app/paths'
  import { sha1 } from '../util'

  export let player: string
</script>

<a href="{base}/player/detail/?p={sha1(player)}">{player}</a>