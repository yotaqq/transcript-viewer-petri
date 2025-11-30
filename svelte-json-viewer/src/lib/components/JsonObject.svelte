<script lang="ts">
  import type { JsonValue, JsonNodeProps, JsonObject as JsonObjectType } from '../utils/types';
  import { isExpandable } from '../utils/helpers';
  import JsonMeta from './JsonMeta.svelte';
  import JsonProperty from './JsonProperty.svelte';
  import JsonArray from './JsonArray.svelte';
  import JsonValueComponent from './JsonValue.svelte';
  import JsonObjectSelf from './JsonObject.svelte';
  import ContainerWrapper from './ContainerWrapper.svelte';

  interface Props extends JsonNodeProps {
    value: JsonObjectType;
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

  const keys = $derived(Object.keys(value || {}));
  const hasItems = $derived(keys.length > 0 || Object.keys(value).length > 0);
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
    <span class="json-brace">&#123;</span
    >{#each keys as key, index (key)}
      <JsonProperty name={key} displayArrayKey={false} isArrayIndex={false}
      />{#if isExpandable(value[key])}
        {#if Array.isArray(value[key])}
          <JsonArray 
            value={value[key]}
            {inlineShortContainers}
            inline={true}
        />{:else}
          <JsonObjectSelf 
            value={value[key]}
            {inlineShortContainers}
            inline={true}
        />{/if}
      {:else}
        <JsonValueComponent 
          value={value[key]}
          {displayDataTypes}
          {collapseStringsAfterLength}
      />{/if}{#if index < keys.length - 1}<span class="json-comma">,&nbsp;</span>{/if}
    {/each}{#if !inlineRoot}<span class="json-brace">&#125;</span>{/if}
  {/snippet}
  
  {#snippet collapsedView()}
    <span class="json-brace">&#123;</span>
    <JsonMeta {value} {displayObjectSize} {displayArrayKey} />
    <span class="json-ellipsis">...</span>
    <span class="json-brace">&#125;</span>
  {/snippet}
  
  {#snippet expandedView()}
    <div class="json-object-content">
      {#each keys as key, index (key)}
        <div class="json-object-item">
          {#if isExpandable(value[key])}
            {#if Array.isArray(value[key])}
              <JsonArray 
                value={value[key]}
                name={key}
                depth={depth + 1}
                {collapsed}
                {displayObjectSize}
                {displayArrayKey}
                {collapseStringsAfterLength}
                {displayDataTypes}
                {sortKeys}
                {indentWidth}
                {inlineShortContainers}
                isLast={index === keys.length - 1}
            />{:else}
              <JsonObjectSelf 
                value={value[key]}
                name={key}
                depth={depth + 1}
                {collapsed}
                {displayObjectSize}
                {displayArrayKey}
                {collapseStringsAfterLength}
                {displayDataTypes}
                {sortKeys}
                {indentWidth}
                {inlineShortContainers}
                isLast={index === keys.length - 1}
            />{/if}
          {:else}
            <div class="json-object-primitive" style="margin-left: {indentWidth}px">
              <JsonProperty name={key} {displayArrayKey} isArrayIndex={false} /><JsonValueComponent 
                value={value[key]}
                {displayDataTypes}
                {collapseStringsAfterLength}
              />{#if index < keys.length - 1}<span class="json-comma">,</span>{/if}
            </div>
          {/if}
        </div>
      {/each}
    </div><div class="json-object-footer">
      <span class="json-brace">&#125;</span>
      {#if !isLast && !isRoot}
        <span class="json-comma">,</span>
      {/if}
    </div>
  {/snippet}
  
  {#snippet emptyView()}
    <span class="json-brace">&#123;&#125;</span>
    {#if !isLast && !isRoot}
      <span class="json-comma">,</span>
    {/if}
  {/snippet}
</ContainerWrapper>

<style>
  .json-brace {
    color: var(--json-viewer-brace-color);
  }

  .json-ellipsis {
    color: var(--json-viewer-ellipsis-color);
    font-style: italic;
    margin: 0 4px;
  }

  .json-object-content {
    border-left: 1px solid var(--json-viewer-indent-guide-color);
    margin-left: 8px;
    padding-left: 4px;
  }

  .json-object-item {
    position: relative;
  }

  .json-object-primitive {
    line-height: 1.4;
    padding: 1px 0;
  }

  .json-object-footer {
    display: flex;
    align-items: center;
    line-height: 1.4;
    margin-left: 8px;
  }

  .json-comma {
    color: var(--json-viewer-comma-color);
  }
</style>