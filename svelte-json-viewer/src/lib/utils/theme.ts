export const themes = {
  light: {
    '--json-viewer-bg': '#ffffff',
    '--json-viewer-string-color': '#d73a49',
    '--json-viewer-number-color': '#005cc5',
    '--json-viewer-boolean-color': '#d73a49',
    '--json-viewer-null-color': '#6f42c1',
    '--json-viewer-date-color': '#6a737d',
    '--json-viewer-special-bg': 'rgba(111, 66, 193, 0.1)',
    '--json-viewer-property-color': '#032f62',
    '--json-viewer-brace-color': '#24292e',
    '--json-viewer-bracket-color': '#24292e',
    '--json-viewer-comma-color': '#24292e',
    '--json-viewer-colon-color': '#24292e',
    '--json-viewer-meta-color': '#6a737d',
    '--json-viewer-ellipsis-color': '#6a737d',
    '--json-viewer-hover-bg': '#f6f8fa',
    '--json-viewer-border-color': '#e1e4e8',
    '--json-viewer-indent-guide-color': '#e1e4e8',
    '--json-viewer-expand-icon-color': '#586069',
    '--json-viewer-expand-icon-hover-color': '#0366d6'
  },
  dark: {
    '--json-viewer-bg': '#24292e',
    '--json-viewer-string-color': '#9ecbff',
    '--json-viewer-number-color': '#79b8ff',
    '--json-viewer-boolean-color': '#f97583',
    '--json-viewer-null-color': '#b392f0',
    '--json-viewer-date-color': '#6a737d',
    '--json-viewer-special-bg': 'rgba(179, 146, 240, 0.1)',
    '--json-viewer-property-color': '#e1e4e8',
    '--json-viewer-brace-color': '#e1e4e8',
    '--json-viewer-bracket-color': '#e1e4e8',
    '--json-viewer-comma-color': '#e1e4e8',
    '--json-viewer-colon-color': '#e1e4e8',
    '--json-viewer-meta-color': '#6a737d',
    '--json-viewer-ellipsis-color': '#6a737d',
    '--json-viewer-hover-bg': '#2f363d',
    '--json-viewer-border-color': '#444d56',
    '--json-viewer-indent-guide-color': '#444d56',
    '--json-viewer-expand-icon-color': '#959da5',
    '--json-viewer-expand-icon-hover-color': '#79b8ff'
  }
};

export function getThemeStyles(theme: 'light' | 'dark'): string {
  const themeVars = themes[theme];
  return Object.entries(themeVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
}

export function applyTheme(element: HTMLElement, theme: 'light' | 'dark'): void {
  const themeVars = themes[theme];
  Object.entries(themeVars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}