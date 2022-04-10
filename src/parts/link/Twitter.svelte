<script lang="ts">
  export let account: string
</script>

{#if account}
  <i class="fab fa-twitter"></i> <a href="https://twitter.com/{account}" target="_blank"> {account}</a>
{/if}