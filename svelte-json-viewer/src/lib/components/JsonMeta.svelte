<script lang="ts">
  import type { JsonValue } from '../utils/types';
  import { getObjectSize } from '../utils/helpers';

  interface Props {
    value: JsonValue;
    displayObjectSize?: boolean;
    displayArrayKey?: boolean;
  }

  const { value, displayObjectSize = true, displayArrayKey = true }: Props = $props();

  const size = $derived(getObjectSize(value));
  const isArray = $derived(Array.isArray(value));
  const isObject = $derived(typeof value === 'object' && value !== null && !Array.isArray(value));

  const shouldShowMeta = $derived(
    displayObjectSize && (isArray || isObject) && size > 0
  );

  const metaText = $derived(
    isArray 
      ? (size === 1 ? '1 item' : `${size} items`)
      : isObject 
        ? (size === 1 ? '1 key' : `${size} keys`)
        : ''
  );
</script>

{#if shouldShowMeta}
  <span class="json-meta">
    {metaText}
  </span>
{/if}

<style>
  .json-meta {
    color: var(--json-viewer-meta-color);
    font-size: 0.9em;
    margin-left: 4px;
    font-style: italic;
  }
</style>