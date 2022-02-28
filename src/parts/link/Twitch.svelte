<script lang="ts">
  export let account: string
</script>

{#if account}
  <i class="fab fa-twitch"></i> <a href="https://www.twitch.tv/{account}">{account}</a>
{/if}