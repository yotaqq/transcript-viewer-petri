<script lang="ts">
  interface Props {
    name: string | number;
    displayArrayKey?: boolean;
    isArrayIndex?: boolean;
  }

  const { name, displayArrayKey = true, isArrayIndex = false }: Props = $props();

  const shouldShow = $derived(!isArrayIndex || displayArrayKey);
  const displayName = $derived(isArrayIndex ? `[${name}]` : `"${name}"`);
</script>

{#if shouldShow}
  <span class="json-property">{displayName}</span
  ><span class="json-colon">:&nbsp;</span
>{/if}

<style>
  .json-property {
    color: var(--json-viewer-property-color);
    font-weight: normal;
  }

  .json-colon {
    color: var(--json-viewer-colon-color);
  }
</style>