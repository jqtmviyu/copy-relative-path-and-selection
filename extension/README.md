# Copy: Path and Selection

Copy current file paths or selected code as AI-ready context with absolute or relative paths.

Accessible through right-click menu items in the editor window, or via the Command Palette (Ctrl+Shift+P / ⇧⌘P).

## Commands

- **Copy: Path** (`copy-relative-path-and-line-numbers.relative-path`)
  - Output: `relative/path/to/file`

- **Copy: Path (Absolute)** (`copy-relative-path-and-line-numbers.absolute-path`)
  - Output: `absolute/path/to/file`

- **Copy: Selection** (`copy-relative-path-and-line-numbers.relative-selection`)
  - Output: starts with a blank line, then `relative/path/to/file:start-end` followed by a code block containing the selected lines
  - Supports multi-cursor and multi-selection within the active file; non-contiguous selections are output as separate blocks
  - Ignores untitled files and files outside the workspace

- **Copy: Selection (Absolute)** (`copy-relative-path-and-line-numbers.absolute-selection`)
  - Output: starts with a blank line, then `absolute/path/to/file:start-end` followed by a code block containing the selected lines

### Example (Copy: Selection)

#### contiguous selection (relative)

````markdown

src/utils/auth.js:43-46
```
function isExpired(token) {
  return token.exp <= Date.now();
}
```
````

#### contiguous selection (absolute)

````markdown

/workspace/project/src/utils/auth.js:43-46
```
function isExpired(token) {
  return token.exp <= Date.now();
}
```
````

#### multiple selections

````markdown

src/utils/auth.js:10-12
```
function getUser() {
  return currentUser;
}
```

src/utils/auth.js:20-22
```
function logout() {
  currentUser = null;
}
```
````

## Attribution

This extension is modified from ezforo's **Copy Relative Path and Line Numbers** (v0.3.1).
