export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export type JsonType = 
  | 'string' 
  | 'number' 
  | 'integer'
  | 'float'
  | 'boolean' 
  | 'null' 
  | 'undefined'
  | 'nan'
  | 'date'
  | 'object' 
  | 'array';

export interface JsonViewerProps {
  value: JsonValue;
  theme?: 'light' | 'dark';
  collapsed?: boolean | number;
  collapseStringsAfterLength?: number;
  indentWidth?: number;
  sortKeys?: boolean;
  displayDataTypes?: boolean;
  displayObjectSize?: boolean;
  displayArrayKey?: boolean;
  enableClipboard?: boolean;
  inlineShortContainers?: boolean | number;
}

export interface JsonNodeProps {
  value: JsonValue;
  name?: string | number;
  depth?: number;
  collapsed?: boolean | number;
  collapseStringsAfterLength?: number;
  indentWidth?: number;
  sortKeys?: boolean;
  displayDataTypes?: boolean;
  displayObjectSize?: boolean;
  displayArrayKey?: boolean;
  theme?: 'light' | 'dark';
  isLast?: boolean;
  isRoot?: boolean;
  inlineShortContainers?: boolean | number;
  inline?: boolean;
}

export interface ExpandState {
  [path: string]: boolean;
}