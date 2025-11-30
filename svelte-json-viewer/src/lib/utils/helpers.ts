import type { JsonValue, JsonType } from './types';

export function getJsonType(value: JsonValue): JsonType {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  
  const type = typeof value;
  
  if (type === 'number') {
    if (isNaN(value as number)) return 'nan';
    if ((value as number) % 1 !== 0) return 'float';
    return 'integer';
  }
  
  if (type === 'object' && value instanceof Date) return 'date';
  
  return type as JsonType;
}

export function isExpandable(value: JsonValue): boolean {
  return Array.isArray(value) || (typeof value === 'object' && value !== null && !(value instanceof Date));
}

export function getObjectSize(value: JsonValue): number {
  if (Array.isArray(value)) {
    return value.length;
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length;
  }
  return 0;
}

export function shouldCollapseByDepth(depth: number, collapsed: boolean | number): boolean {
  if (typeof collapsed === 'boolean') {
    return collapsed;
  }
  return depth >= collapsed;
}

export function shouldCollapseString(str: string, collapseAfter?: number): boolean {
  if (typeof collapseAfter !== 'number') return false;
  return str.length > collapseAfter;
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length);
}

export function escapeString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

export function getNamespace(parentNamespace: string[], name: string | number): string[] {
  return [...parentNamespace, String(name)];
}

export function getNamespacePath(namespace: string[]): string {
  return namespace.join('.');
}

export function shouldRenderInline(value: JsonValue, inlineShortContainers?: boolean | number, collapseStringsAfterLength?: number): boolean {
  if (!inlineShortContainers) return false;
  
  let maxLength: number;
  if (typeof inlineShortContainers === 'number') {
    maxLength = inlineShortContainers;
  } else {
    maxLength = 40;
  }
  
  const inlineString = getInlineString(value, collapseStringsAfterLength);
  
  return inlineString.length <= maxLength;
}

function getInlineString(value: JsonValue, collapseStringsAfterLength?: number): string {
  if (Array.isArray(value)) {
    const items = value.map(item => {
      if (isExpandable(item)) {
        return getInlineString(item, collapseStringsAfterLength);
      } else {
        return formatPrimitiveValue(item, collapseStringsAfterLength);
      }
    });
    return `[${items.join(', ')}]`;
  }
  
  if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
    const pairs = Object.entries(value).map(([key, val]) => {
      const formattedValue = isExpandable(val) ? getInlineString(val, collapseStringsAfterLength) : formatPrimitiveValue(val, collapseStringsAfterLength);
      return `"${key}": ${formattedValue}`;
    });
    return `{${pairs.join(', ')}}`;
  }
  
  return formatPrimitiveValue(value, collapseStringsAfterLength);
}

function formatPrimitiveValue(value: JsonValue, collapseStringsAfterLength?: number): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') {
    let stringValue = value;
    // Apply string truncation if specified
    if (collapseStringsAfterLength && stringValue.length > collapseStringsAfterLength) {
      stringValue = truncateString(stringValue, collapseStringsAfterLength) + '...';
    }
    return `"${escapeString(stringValue)}"`;
  }
  if (typeof value === 'number') {
    if (isNaN(value)) return 'NaN';
    if (value === Infinity) return 'Infinity';
    if (value === -Infinity) return '-Infinity';
    return String(value);
  }
  if (typeof value === 'boolean') return String(value);
  if (value instanceof Date) return value.toISOString();
  
  return String(value);
}