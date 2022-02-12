<script lang="ts">
  import { onDestroy } from 'svelte'
  import { afterNavigate, goto } from '$app/navigation'
  import { logHash, apiData, set_api_data } from './index_store'
  import { base } from '$app/paths'
  import { browser } from '$app/env'
  import { get_param_hash } from '$lib/util'
  import PlaceHolder from '/src/routes/PlaceHolder.svelte'

  afterNavigate(() => { fetchLog(null) })
  onDestroy(() => apiData.set(null))

  async function fetchLog(log_hash) {
    if (!browser) return
    apiData.set(null)

    logHash.set(get_param_hash(log_hash, 'l'))
    if ($logHash === null) return

    fetch(`/center_pin_g/log/${$logHash}.json`)
      .then(response => {
        if (response.status === 404) throw new Error('NOT FOUND')
        return response.json()
      })
      .then(data => {
        set_api_data(data)
      })
      .catch(e => { if (e.message === 'NOT FOUND') goto(`${base}/`, {}) })
  }
</script>

{#if $apiData}
  {$apiData}
{:else}
  <PlaceHolder />
{/if}