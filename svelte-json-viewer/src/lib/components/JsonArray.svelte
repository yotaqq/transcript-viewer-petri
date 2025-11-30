<script lang="ts">
  import type { JsonValue, JsonNodeProps } from '../utils/types';
  import { isExpandable } from '../utils/helpers';
  import JsonMeta from './JsonMeta.svelte';
  import JsonProperty from './JsonProperty.svelte';
  import JsonObject from './JsonObject.svelte';
  import JsonValueComponent from './JsonValue.svelte';
  import JsonArraySelf from './JsonArray.svelte';
  import ContainerWrapper from './ContainerWrapper.svelte';

  interface Props extends JsonNodeProps {
    value: JsonValue[];
    inline?: boolean;
    inlineRoot?: boolean;
  }

  const { 
    value, 
    name, 
    depth = 0, 
    collapsed = false,
    displayObjectSize = true,
    displayArrayKey = true,
    collapseStringsAfterLength = 50,
    displayDataTypes = false,
    sortKeys = false,
    indentWidth = 12,
    isLast = false,
    isRoot = false,
    inlineShortContainers = false,
    inline = false,
    inlineRoot = false
  }: Props = $props();

  const hasItems = $derived(value.length > 0);
</script>

<ContainerWrapper 
  {value}
  {name}
  {depth}
  {collapsed}
  {displayObjectSize}
  {displayArrayKey}
  {collapseStringsAfterLength}
  {displayDataTypes}
  {sortKeys}
  {indentWidth}
  {isLast}
  {isRoot}
  {inlineShortContainers}
  {inline}
  {hasItems}
>
  {#snippet inlineView()}
    <span class="json-bracket">[</span
    >{#each value as item, index (index)}
      {#if isExpandable(item)}
        {#if Array.isArray(item)}
          <JsonArraySelf 
            value={item}
            {inlineShortContainers}
            inline={true}
        />{:else if item !== null && typeof item === 'object'}
          <JsonObject 
            value={item}
            {inlineShortContainers}
            inline={true}
        />{/if}
      {:else}
        <JsonValueComponent 
          value={item}
          {displayDataTypes}
          {collapseStringsAfterLength}
      />{/if}{#if index < value.length - 1}
        <span class="json-comma">,&nbsp;</span>
      {/if}
    {/each}{#if !inlineRoot}<span class="json-bracket">]</span>{/if}
  {/snippet}
  
  {#snippet collapsedView()}
    <span class="json-bracket">[</span>
    <JsonMeta {value} {displayObjectSize} {displayArrayKey} />
    <span class="json-ellipsis">...</span>
    <span class="json-bracket">]</span>
  {/snippet}
  
  {#snippet expandedView()}
    <div class="json-array-content">
      {#each value as item, index (index)}
        <div class="json-array-item">
          {#if isExpandable(item)}
            {#if Array.isArray(item)}
              <JsonArraySelf 
                value={item}
                depth={depth + 1}
                {collapsed}
                {displayObjectSize}
                {displayArrayKey}
                {collapseStringsAfterLength}
                {displayDataTypes}
                {sortKeys}
                {indentWidth}
                {inlineShortContainers}
                isLast={index === value.length - 1}
              />
            {:else if item !== null && typeof item === 'object'}
              <JsonObject 
                value={item}
                depth={depth + 1}
                {collapsed}
                {displayObjectSize}
                {displayArrayKey}
                {collapseStringsAfterLength}
                {displayDataTypes}
                {sortKeys}
                {indentWidth}
                {inlineShortContainers}
                isLast={index === value.length - 1}
              />
            {/if}
          {:else}
            <div class="json-array-primitive" style="margin-left: {indentWidth}px">
              <JsonValueComponent 
                value={item}
                {displayDataTypes}
                {collapseStringsAfterLength}
              />{#if index < value.length - 1}<span class="json-comma">,</span>{/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    
    <div class="json-array-footer">
      <span class="json-bracket">]</span>
      {#if !isLast && !isRoot}
        <span class="json-comma">,</span>
      {/if}
    </div>
  {/snippet}
  
  {#snippet emptyView()}
    <span class="json-bracket">[]</span>
    {#if !isLast && !isRoot}
      <span class="json-comma">,</span>
    {/if}
  {/snippet}
</ContainerWrapper>

<style>
  .json-bracket {
    color: var(--json-viewer-bracket-color);
  }

  .json-ellipsis {
    color: var(--json-viewer-ellipsis-color);
    font-style: italic;
    margin: 0 4px;
  }

  .json-array-content {
    border-left: 1px solid var(--json-viewer-indent-guide-color);
    margin-left: 8px;
    padding-left: 4px;
  }

  .json-array-item {
    position: relative;
  }

  .json-array-primitive {
    line-height: 1.4;
    padding: 1px 0;
  }

  .json-array-footer {
    display: flex;
    align-items: center;
    line-height: 1.4;
    margin-left: 8px;
  }

  .json-comma {
    color: var(--json-viewer-comma-color);
  }
</style>