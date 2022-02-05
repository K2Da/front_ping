<script lang="ts">
  import { base } from '$app/paths'

  export let name: string
  export let key: string
  export let official: boolean
</script>

{#if official}<span style="color: greenyellow">✔</span>{/if} <a href="{base}/tournament/detail/?t={key}">{name}</a>