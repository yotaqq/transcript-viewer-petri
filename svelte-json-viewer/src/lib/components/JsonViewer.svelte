<script lang="ts">
  import type { JsonValue, JsonViewerProps } from '../utils/types';
  import { getJsonType, isExpandable } from '../utils/helpers';
  import { applyTheme } from '../utils/theme';
  import JsonObject from './JsonObject.svelte';
  import JsonArray from './JsonArray.svelte';
  import JsonValueComponent from './JsonValue.svelte';

  interface Props extends JsonViewerProps {
    value: JsonValue;
    theme?: 'light' | 'dark';
    collapsed?: boolean | number;
    collapseStringsAfterLength?: number;
    indentWidth?: number;
    sortKeys?: boolean;
    displayDataTypes?: boolean;
    displayObjectSize?: boolean;
    displayArrayKey?: boolean;
    inlineShortContainers?: boolean | number;
  }

  const { 
    value,
    theme = 'light',
    collapsed = false,
    collapseStringsAfterLength = 50,
    indentWidth = 12,
    sortKeys = false,
    displayDataTypes = false,
    displayObjectSize = true,
    displayArrayKey = false,
    inlineShortContainers = false
  }: Props = $props();

  let containerRef: HTMLDivElement;

  const jsonType = $derived(getJsonType(value));
  const expandableValue = $derived(isExpandable(value));

  // Apply theme when it changes
  $effect(() => {
    if (containerRef) {
      applyTheme(containerRef, theme);
    }
  });
</script>

<div 
  bind:this={containerRef}
  class="json-viewer"
  class:light={theme === 'light'}
  class:dark={theme === 'dark'}
>
  {#if expandableValue}
    {#if jsonType === 'array'}
      <JsonArray 
        value={value}
        depth={0}
        {collapsed}
        {displayObjectSize}
        {displayArrayKey}
        {collapseStringsAfterLength}
        {displayDataTypes}
        {sortKeys}
        {indentWidth}
        {inlineShortContainers}
        isRoot={true}
      />
    {:else}
      <JsonObject 
        value={value}
        depth={0}
        {collapsed}
        {displayObjectSize}
        {displayArrayKey}
        {collapseStringsAfterLength}
        {displayDataTypes}
        {sortKeys}
        {indentWidth}
        {inlineShortContainers}
        isRoot={true}
      />
    {/if}
  {:else}
    <JsonValueComponent 
      {value}
      {displayDataTypes}
      {collapseStringsAfterLength}
    />
  {/if}
</div>

<style>
  .json-viewer {
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.4;
    background-color: var(--json-viewer-bg);
    color: var(--json-viewer-property-color);
    padding: 8px;
    border-radius: 4px;
    overflow: visible;
    border: 1px solid var(--json-viewer-border-color);
  }

  .json-viewer :global(.json-property) {
    color: var(--json-viewer-property-color);
  }

  .json-viewer :global(.json-string) {
    color: var(--json-viewer-string-color);
  }

  .json-viewer :global(.json-number) {
    color: var(--json-viewer-number-color);
  }

  .json-viewer :global(.json-boolean) {
    color: var(--json-viewer-boolean-color);
  }

  .json-viewer :global(.json-null) {
    color: var(--json-viewer-null-color);
  }

  .json-viewer :global(.json-brace),
  .json-viewer :global(.json-bracket) {
    color: var(--json-viewer-brace-color);
  }

  .json-viewer :global(.json-comma) {
    color: var(--json-viewer-comma-color);
  }

  .json-viewer :global(.json-colon) {
    color: var(--json-viewer-colon-color);
  }

  .json-viewer :global(.json-meta) {
    color: var(--json-viewer-meta-color);
  }

  .json-viewer :global(.json-ellipsis) {
    color: var(--json-viewer-ellipsis-color);
  }

  /* Light theme defaults */
  .json-viewer.light {
    --json-viewer-bg: #ffffff;
    --json-viewer-string-color: #d73a49;
    --json-viewer-number-color: #005cc5;
    --json-viewer-boolean-color: #d73a49;
    --json-viewer-null-color: #6f42c1;
    --json-viewer-property-color: #032f62;
    --json-viewer-brace-color: #24292e;
    --json-viewer-bracket-color: #24292e;
    --json-viewer-comma-color: #24292e;
    --json-viewer-colon-color: #24292e;
    --json-viewer-meta-color: #6a737d;
    --json-viewer-ellipsis-color: #6a737d;
    --json-viewer-hover-bg: #f6f8fa;
    --json-viewer-border-color: #e1e4e8;
    --json-viewer-indent-guide-color: #e1e4e8;
    --json-viewer-expand-icon-color: #586069;
    --json-viewer-expand-icon-hover-color: #0366d6;
  }

  /* Dark theme defaults */
  .json-viewer.dark {
    --json-viewer-bg: #24292e;
    --json-viewer-string-color: #9ecbff;
    --json-viewer-number-color: #79b8ff;
    --json-viewer-boolean-color: #f97583;
    --json-viewer-null-color: #b392f0;
    --json-viewer-property-color: #e1e4e8;
    --json-viewer-brace-color: #e1e4e8;
    --json-viewer-bracket-color: #e1e4e8;
    --json-viewer-comma-color: #e1e4e8;
    --json-viewer-colon-color: #e1e4e8;
    --json-viewer-meta-color: #6a737d;
    --json-viewer-ellipsis-color: #6a737d;
    --json-viewer-hover-bg: #2f363d;
    --json-viewer-border-color: #444d56;
    --json-viewer-indent-guide-color: #444d56;
    --json-viewer-expand-icon-color: #959da5;
    --json-viewer-expand-icon-hover-color: #79b8ff;
  }
</style>