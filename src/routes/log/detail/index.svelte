<style>
  button { padding: 1px 20px; margin: 6px; }
  table th { vertical-align: middle; }
  table td { vertical-align: middle; }
</style>

<script lang="ts">
  import { onDestroy } from 'svelte'
  import { afterNavigate, goto } from '$app/navigation'
  import { selectedTeams, logHash, apiData, teamRelation, set_api_data, select_team, tk } from '$lib/store/log'
  import { base } from '$app/paths'
  import { browser } from '$app/env'
  import { get_param_hash, fetch_data } from '$lib/util'
  import PlaceHolder from '/src/parts/PlaceHolder.svelte'
  import TeamName from '/src/parts/TeamName.svelte'
  import TeamRelation from '/src/parts/pages/log/TeamRelation.svelte'

  afterNavigate(() => { fetchLog(null) })
  onDestroy(() => apiData.set(null))

 async function fetchLog(log_hash) {
    if (!browser) return
    apiData.set(null)

    logHash.set(get_param_hash(log_hash, 'l'))
    if ($logHash === null) return

    fetch_data(`log/${$logHash}.json`)
      .then(response => {
        if ([403, 404].indexOf(response.status) !== -1) throw new Error('NOT FOUND')
        return response.json()
      })
      .then(data => {
        set_api_data(data)
      })
      .catch(e => { if (e.message === 'NOT FOUND') goto(`${base}/`, {}) })
  }
</script>

{#if $apiData}
  <table style="margin-top: 10px">
    <thead>
      <tr>
        <th class="nw" style="width: 2.5em">No.</th>
        <th class="nw tal" style="width: 10em"></th>
        {#each $apiData.teams as _, i}
          <th class="nw" style="width: 4em">{i + 1}</th>
        {/each}
        <th></th>
      </tr>
    </thead>
    <tbody>
    {#each $apiData.teams as t1, i}
      <tr>
        <th class="nw">{i + 1}</th>
        <td class="nw tal"><TeamName name={t1.team_name} current_name={t1.team_current_name} /></td>
        {#each $apiData.teams as t2, j}
          {@const rel = $teamRelation[tk(t1.team_name, t2.team_name)]}
          <td>
            {#if i !== j}
              {#if rel.matches.length > 0}{rel.wl[0]} - {rel.wl[1]}{/if}
              <br />
              <button on:click={() => select_team($apiData, t1.team_name, t2.team_name)}>🔻</button>
            {/if}
          </td>
        {/each}
        <td></td>
      </tr>
    {/each}
    </tbody>
  </table>
  {#if $selectedTeams}
    <TeamRelation />
  {/if}
{:else}
  <PlaceHolder />
{/if}