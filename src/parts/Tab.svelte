<script lang="ts">
  export let current_mode;
  export let mode: string;
  export let name: string;
</script>

<style>
  button {
    padding: 1px 20px;
    margin: 2px;
    font-size: smaller;
  }
  button:disabled {
    border: aqua 1px solid;
    color: white;
    opacity: 1.0;
  }
</style>

<button
  disabled={mode === current_mode}
  on:click={() => { current_mode = mode }}>{name}</button>