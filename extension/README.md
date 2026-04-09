# Copy: Relative Path and Selection

Copy relative paths or selected code as AI-ready context.

Accessible through right-click menu items in editor tabs and the editor window, or via the Command Palette (Ctrl+Shift+P / ⇧⌘P).

## Commands

- **Copy: Relative Path** (`copy-relative-path-and-line-numbers.path-only`)
  - Output: `relative/path/to/file`

- **Copy: Selection** (`copy-relative-path-and-line-numbers.both`)
  - Output: `relative/path/to/file:start-end` followed by a code block containing the selected lines
  - Supports multi-cursor and multi-selection; non-contiguous selections are output as separate blocks

### Example (Copy: Selection)

```text
src/utils/auth.js:43-44
```
```js
// When selecting whole lines...
// Adjust to get the actual last line.
```

## Attribution

This extension is modified from ezforo's **Copy Relative Path and Line Numbers** (v0.3.1).
