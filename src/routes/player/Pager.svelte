<script lang="ts">
  import { page_size, pageNo, playerList } from './index_store'
  $: max_page = Math.ceil($playerList.length / page_size)
</script>

<style>
  button {
    padding-top: 1px;
    padding-bottom: 1px;
    margin: 6px;
  }
</style>


<div style="text-align: right;">
  {#if $pageNo !== 1 }
    <button on:click={() => $pageNo = 1}><i class="fas fa-fast-backward"></i></button>
    {' '}
    <button on:click={() => $pageNo -= 1}><i class="fas fa-step-backward"></i></button>
  {:else}
    <button disabled on:click={() => $pageNo = 1}><i class="fas fa-fast-backward"></i></button>
    {' '}
    <button disabled on:click={() => $pageNo -= 1}><i class="fas fa-step-backward"></i></button>
  {/if}

  {$pageNo} / {max_page}
  {' '}

  {#if $pageNo !== max_page }
    <button on:click={() => $pageNo += 1}><i class="fas fa-step-forward"></i></button>
    {' '}
    <button on:click={() => $pageNo = max_page}><i class="fas fa-fast-forward"></i></button>
  {:else}
    <button disabled on:click={() => $pageNo += 1}><i class="fas fa-step-forward"></i></button>
    {' '}
    <button disabled on:click={() => $pageNo = max_page}><i class="fas fa-fast-forward"></i></button>
  {/if}
</div>
