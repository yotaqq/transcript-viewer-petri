<script lang="ts">
  import type { JsonValue } from '../utils/types';
  import { getJsonType } from '../utils/helpers';
  import JsonString from './JsonString.svelte';

  interface Props {
    value: JsonValue;
    displayDataTypes?: boolean;
    collapseStringsAfterLength?: number;
  }

  const { value, displayDataTypes = false, collapseStringsAfterLength = 50 }: Props = $props();

  const type = $derived(getJsonType(value));
  const displayValue = $derived.by(() => {
    switch (type) {
      case 'string':
        return value as string;
      case 'integer':
      case 'float':
        return String(value);
      case 'boolean':
        return String(value);
      case 'null':
        return 'null';
      case 'undefined':
        return 'undefined';
      case 'nan':
        return 'NaN';
      case 'date':
        return (value as Date).toISOString();
      default:
        return String(value);
    }
  });
</script>

<span class="json-value json-{type}">{#if displayDataTypes}
    <span class="json-data-type">{type}</span>
  {/if}{#if type === 'string'}
    <JsonString value={value} {collapseStringsAfterLength} />
  {:else if type === 'null' || type === 'undefined' || type === 'nan'}
    <span class="json-special-value">{displayValue}</span>
  {:else}
    <span class="json-primitive-value">{displayValue}</span>
  {/if}
</span>

<style>
  .json-value {
    display: inline;
  }

  .json-data-type {
    color: var(--json-viewer-meta-color);
    font-size: 0.8em;
    margin-right: 4px;
    font-style: italic;
  }

  .json-primitive-value {
    word-break: break-all;
  }

  .json-string {
    color: var(--json-viewer-string-color);
  }

  .json-number,
  .json-integer,
  .json-float {
    color: var(--json-viewer-number-color);
  }

  .json-boolean {
    color: var(--json-viewer-boolean-color);
  }

  .json-null,
  .json-undefined,
  .json-nan {
    color: var(--json-viewer-null-color);
    font-style: italic;
  }

  .json-date {
    color: var(--json-viewer-date-color);
  }

  .json-special-value {
    font-size: 11px;
    font-weight: bold;
    background-color: var(--json-viewer-special-bg);
    padding: 1px 2px;
    border-radius: 3px;
  }
</style>