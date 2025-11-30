// Main component
export { default as JsonViewer } from './components/JsonViewer.svelte';

// Individual components for advanced usage
export { default as JsonObject } from './components/JsonObject.svelte';
export { default as JsonArray } from './components/JsonArray.svelte';
export { default as JsonValue } from './components/JsonValue.svelte';
export { default as JsonString } from './components/JsonString.svelte';
export { default as JsonProperty } from './components/JsonProperty.svelte';
export { default as JsonMeta } from './components/JsonMeta.svelte';
export { default as ExpandIcon } from './components/ExpandIcon.svelte';
export { default as ContainerWrapper } from './components/ContainerWrapper.svelte';

// Types
export type {
  JsonValue,
  JsonObject,
  JsonArray,
  JsonType,
  JsonViewerProps,
  JsonNodeProps,
  ExpandState
} from './utils/types';

// Utilities
export {
  getJsonType,
  isExpandable,
  getObjectSize,
  shouldCollapseByDepth,
  shouldCollapseString,
  truncateString,
  escapeString,
  getNamespace,
  getNamespacePath
} from './utils/helpers';

// Theme utilities
export { themes, getThemeStyles, applyTheme } from './utils/theme';