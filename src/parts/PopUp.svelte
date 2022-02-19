<script lang="ts">
</script>

<style>
  div {
      position: absolute;
      left: -3px;
      top: calc(1em + 5px);

      min-width: 200px;
      min-height: 10px;

      border: var(--border) solid 2px;
      border-radius: 5px;

      background-color: var(--background-body);
      padding: 10px;
      z-index: 256;
  }
</style>

<div>
  <slot />
</div>