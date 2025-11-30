# Svelte JSON Viewer

A performant JSON viewer component for Svelte 5 with collapsible blocks, string truncation, inline short containers, and theming support.

## Features

- 🎯 **Collapsible Objects & Arrays**: Click to expand/collapse nested structures
- ✂️ **String Truncation**: Long strings are automatically truncated with expandable ellipsis
- 📦 **Inline Short Containers**: Smart inline rendering for short objects and arrays
- 🎨 **Theming Support**: Light and dark themes with customizable CSS variables
- 🔍 **Type-aware Rendering**: Different colors for strings, numbers, booleans, null, etc.
- 📊 **Metadata Display**: Shows object key counts and array lengths
- 🎛️ **Configurable**: Customizable indentation, collapse behavior, and display options
- ⚡ **Performance**: Built with Svelte 5 reactivity and optimized for large JSON structures
- 🎪 **Hover Effects**: Visual feedback on hover
- 🗂️ **Modular Architecture**: Well-structured components for maintainability

## Installation

```bash
npm install svelte-json-viewer
```

## Basic Usage

```svelte
<script>
  import { JsonViewer } from 'svelte-json-viewer';
  
  const data = {
    name: "John Doe",
    age: 30,
    hobbies: ["reading", "coding"],
    address: {
      city: "New York",
      zipCode: "10001"
    }
  };
</script>

<JsonViewer value={data} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `JsonValue` | - | The JSON data to display |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme for the viewer |
| `collapsed` | `boolean \| number` | `false` | Control collapse behavior. If boolean, applies to all levels. If number, collapses levels >= that number |
| `collapseStringsAfterLength` | `number` | `50` | Truncate strings longer than this length |
| `indentWidth` | `number` | `12` | Indentation width in pixels |
| `sortKeys` | `boolean` | `false` | Sort object keys alphabetically |
| `displayDataTypes` | `boolean` | `false` | Show data types next to values |
| `displayObjectSize` | `boolean` | `true` | Show object/array size metadata |
| `displayArrayKey` | `boolean` | `false` | Show array indices as keys |
| `inlineShortContainers` | `boolean \| number` | `false` | Render short containers inline. If boolean true, uses 40 char limit. If number, uses that as the character limit |

## Examples

### Custom Theme and Collapse Behavior

```svelte
<JsonViewer 
  value={data} 
  theme="dark"
  collapsed={2}
  collapseStringsAfterLength={30}
  sortKeys={true}
  displayDataTypes={true}
/>
```

### Inline Short Containers

The `inlineShortContainers` feature renders short objects and arrays on a single line while preserving full expand/collapse functionality:

```svelte
<script>
  const data = {
    coordinates: { lat: 40.7128, lng: -74.0060 },
    tags: ["javascript", "svelte", "json"],
    user: { name: "Alice", age: 25 },
    longArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // won't be inlined
  };
</script>

<JsonViewer 
  value={data}
  inlineShortContainers={true}  // Uses 40 character limit
/>

<!-- Or with custom character limit -->
<JsonViewer 
  value={data}
  inlineShortContainers={60}  // Custom 60 character limit
/>
```

This will render short containers like:
- `{lat: 40.7128, lng: -74.0060}` instead of multi-line format
- `["javascript", "svelte", "json"]` instead of each item on separate lines
- Maintains syntax highlighting with proper colors for strings, numbers, etc.
- Containers can still be expanded to full view when clicked

### Minimal Configuration

```svelte
<JsonViewer 
  value={data} 
  displayObjectSize={false}
  indentWidth={8}
/>
```

## Theming

The component supports extensive theming through CSS custom properties:

```css
.my-json-viewer {
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
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm run test
```

## License

MIT