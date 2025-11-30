<script lang="ts">
  import { shouldCollapseString, truncateString, escapeString } from '../utils/helpers';

  interface Props {
    value: string;
    collapseStringsAfterLength?: number;
  }

  const { value, collapseStringsAfterLength = 50 }: Props = $props();

  let expanded = $state(false);

  const isCollapsible = $derived(shouldCollapseString(value, collapseStringsAfterLength));
  const escapedValue = $derived(escapeString(value));
  const displayValue = $derived(
    isCollapsible && !expanded && collapseStringsAfterLength
      ? truncateString(escapedValue, collapseStringsAfterLength)
      : escapedValue
  );

  // $inspect(isCollapsible);
  // $inspect(expanded);
  // $inspect(collapseStringsAfterLength);
  // $inspect(displayValue);

  const showEllipsis = $derived(isCollapsible && !expanded);
  const truncatedLength = $derived(
    isCollapsible && !expanded && collapseStringsAfterLength
      ? collapseStringsAfterLength
      : null
  );

  function toggleExpanded() {
    if (isCollapsible) {
      expanded = !expanded;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (isCollapsible && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      toggleExpanded();
    }
  }
</script>

<span class="json-string"
  ><span class="json-quote">"</span
  ><span 
    class="json-string-content"
    class:clickable={isCollapsible}
    role={isCollapsible ? "button" : undefined}
    tabindex={isCollapsible ? 0 : undefined}
    onclick={isCollapsible ? toggleExpanded : undefined}
    onkeydown={isCollapsible ? handleKeydown : undefined}
  >
    {displayValue
    }{#if showEllipsis}
      <span class="json-ellipsis">...</span>
    {/if}
  </span
  ><span class="json-quote">"</span
  >{#if truncatedLength}
    <span class="json-truncate-indicator">{value.length} chars</span>
  {/if}
</span>

<style>
  .json-string {
    color: var(--json-viewer-string-color);
    word-break: break-all;
  }

  .json-quote {
    color: var(--json-viewer-string-color);
  }

  .json-string-content {
    white-space: pre-wrap;
  }

  .json-string-content.clickable {
    cursor: pointer;
  }

  .json-string-content.clickable:hover {
    /* Removed underline for cleaner appearance */
  }

  .json-ellipsis {
    color: var(--json-viewer-ellipsis-color);
    font-style: italic;
  }

  .json-truncate-indicator {
    color: var(--json-viewer-meta-color);
    font-size: 0.8em;
    margin-left: 4px;
    font-style: italic;
  }
</style>