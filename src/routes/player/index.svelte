<script lang="ts">
  import { filterString, showSns, showTournament, pageNo } from '$lib/store/player'
  import { slimMode } from '$lib/store/global'
  import Pager from '/src/parts/pages/player/Pager.svelte'
  import Header from '/src/parts/Header.svelte'
  import Table from '/src/parts/pages/player/Table.svelte'
  import SlimTable from '/src/parts/pages/player/SlimTable.svelte'

  function filter(event) {
    $filterString = event.target.value
    $pageNo = 1
  }
</script>

<Header title="プレイヤー一覧" type="article" url="player" description="ポケモンユナイトの大会のプレイヤーの一覧" />

<h1>プレイヤー</h1>

<div>
  <input on:input={filter}
         placeholder="プレイヤー名 / チーム名 / SNSアカウント"
         style="box-sizing: border-box; width: 100%"
         value={$filterString} />

  {#if !$slimMode}
    <div style="text-align: center">
      <input id="tournament" type="checkbox" bind:checked={$showTournament} />
      <label for="tournament">最新参加大会</label>
      <input id="sns" type="checkbox" bind:checked={$showSns} />
      <label for="sns">アカウント</label>
    </div>
  {/if}
</div>

<Pager />

{#if $slimMode}
  <SlimTable />
{:else}
  <Table />
{/if}

<Pager />
