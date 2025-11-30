<script lang="ts">
  interface Props {
    expanded: boolean;
    onclick?: () => void;
  }

  const { expanded, onclick }: Props = $props();
</script>

<button
  class="expand-icon"
  class:expanded
  onclick={onclick}
  aria-label={expanded ? 'Collapse' : 'Expand'}
>
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M4 3L8 6L4 9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<style>
  .expand-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-right: 2px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--json-viewer-expand-icon-color);
    transition: color 0.2s, transform 0.2s;
    border-radius: 2px;
  }

  .expand-icon:hover {
    color: var(--json-viewer-expand-icon-hover-color);
  }

  .expand-icon:focus {
    outline: 2px solid var(--json-viewer-expand-icon-hover-color);
    outline-offset: 1px;
  }

  .expand-icon svg {
    transition: transform 0.2s;
  }

  .expand-icon.expanded svg {
    transform: rotate(90deg);
  }
</style>