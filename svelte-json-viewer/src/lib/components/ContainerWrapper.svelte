<script lang="ts">
  import type { JsonNodeProps } from '../utils/types';
  import { shouldCollapseByDepth, shouldRenderInline } from '../utils/helpers';
  import ExpandIcon from './ExpandIcon.svelte';
  import JsonProperty from './JsonProperty.svelte';
  import { tick } from 'svelte';

  interface Props extends JsonNodeProps {
    hasItems: boolean;
    inlineView: any;
    collapsedView: any;
    expandedView: any;
    emptyView: any;
    inline?: boolean;
  }

  const { 
    hasItems,
    name, 
    depth = 0, 
    collapsed = false,
    displayArrayKey = true,
    collapseStringsAfterLength = 50,
    indentWidth = 12,
    isLast = false,
    isRoot = false,
    inlineShortContainers = false,
    inline = false,
    inlineView,
    collapsedView,
    expandedView,
    emptyView,
    value
  }: Props = $props();

  const indentStyle = $derived(`margin-left: ${isRoot ? 0 : indentWidth}px`);
  const shouldInline = $derived(shouldRenderInline(value, inlineShortContainers, collapseStringsAfterLength));
  
  // Determine initial collapsed state
  let expanded = $state(true);
  
  // Initialize expanded state properly
  $effect(() => {
    if (shouldInline && isReady) {
      // If we're attempting inline but content doesn't fit, start expanded
      expanded = !inlineFits;
    } else {
      // Use normal collapse logic when not attempting inline
      expanded = !shouldCollapseByDepth(depth, collapsed);
    }
  });
  let hovered = $state(false);

  // Measurement logic for inline rendering
  let measurementDiv: HTMLDivElement | undefined = $state();
  let measurementHeight = $state(0);
  let isReady = $state(false);
  
  const lineHeight = 20;
  
  $effect(() => {
    if (shouldInline && measurementDiv && !expanded && hasItems) {
      tick().then(() => {
        if (measurementDiv) {
          measurementHeight = measurementDiv.clientHeight;
          isReady = true;
        }
      });
    } else {
      isReady = true;
    }
  });
  
  const inlineFits = $derived(measurementHeight <= lineHeight * 1.2);
  const shouldShowInlineContent = $derived(shouldInline && isReady && inlineFits);
  const shouldShowCollapsedSummary = $derived(!shouldInline || (isReady && !inlineFits));

  // Helper functions for brace/bracket rendering
  const isArray = $derived(Array.isArray(value));
  const openBrace = $derived(isArray ? '[' : '{');
  const braceClass = $derived(isArray ? 'json-bracket' : 'json-brace');

  function toggleExpanded() {
    expanded = !expanded;
  }


  $inspect("shouldInline", shouldInline);
  $inspect("inline", inline);
  $inspect("collapsed", collapsed);
  $inspect("measurementHeight", measurementHeight);
</script>

{#if inline}
  {@render inlineView()}
{:else}
<div 
  class="json-container"
  class:hovered
  class:root={isRoot}
  style={indentStyle}
  role="group"
  onmouseenter={() => hovered = true}
  onmouseleave={() => hovered = false}
>
  <div class="json-container-header">
    {#if hasItems}
      <ExpandIcon {expanded} onclick={toggleExpanded} />
    {/if}
    
    {#if name !== undefined}
      <JsonProperty {name} {displayArrayKey} isArrayIndex={false} />
    {/if}
    
    {#if hasItems && expanded}
      <span class={braceClass}>{openBrace}</span>
    {/if}
    
    {#if !hasItems}
      {@render emptyView()}
    {:else if expanded}
      <!-- Expanded state - render content below -->
    {:else}
      {#if shouldInline}
        <!-- Hidden measurement div -->
        <div 
          bind:this={measurementDiv}
          style="position: absolute; visibility: hidden; pointer-events: none; background-color: red; opacity: 0.5;"
          class="json-inline-content"
        >
          {#if hasItems}
            <ExpandIcon {expanded} onclick={toggleExpanded} />
          {/if}
          {#if name !== undefined}
            <JsonProperty {name} {displayArrayKey} isArrayIndex={false} />
          {/if}
          {@render inlineView()}
        </div>
      {/if}
      <!-- Collapsed state with items -->
      {#if shouldShowInlineContent}
        <!-- Inline content that fits -->
        <div class="json-inline-content">
          {@render inlineView()}
        </div>
      {:else}
        <!-- Normal collapsed view when not attempting inline -->
        {@render collapsedView()}
      {/if}
    {/if}
  </div>{#if hasItems && expanded}
    <!-- Render expanded content outside the header for proper alignment -->
    <div class="json-expanded-content">
      {@render expandedView()}
    </div>
  {/if}
</div>
{/if}

<style>
  .json-container {
    position: relative;
    transition: background-color 0.2s;
  }

  .json-container:hover {
    background-color: var(--json-viewer-hover-bg);
  }

  .json-container-header {
    display: flex;
    align-items: center;
    line-height: 1.4;
  }

  .json-inline-content {
    white-space: nowrap;
    display: inline;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  .json-expanded-content {
    display: block;
    margin-top: 0;
  }

  .json-brace {
    color: var(--json-viewer-brace-color);
  }

  .json-bracket {
    color: var(--json-viewer-bracket-color);
  }
</style>