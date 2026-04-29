# Copy: Selection and Relative Selection

Copy selected code as AI-ready context with absolute or relative paths.

Accessible through right-click menu items in editor tabs and the editor window, or via the Command Palette (Ctrl+Shift+P / ⇧⌘P).

## Commands

- **Copy: Selection** (`copy-relative-path-and-line-numbers.absolute-selection`)
  - Output: `absolute/path/to/file:start-end` followed by a code block containing the selected lines

- **Copy: Selection (Relative)** (`copy-relative-path-and-line-numbers.relative-selection`)
  - Output: `relative/path/to/file:start-end` followed by a code block containing the selected lines
  - Supports multi-cursor and multi-selection; non-contiguous selections are output as separate blocks
  - Supports collecting the latest non-empty selections across multiple workspace files before copying
  - Ignores untitled files and files outside the workspace; cached selections are cleared when a file closes or after copying

### Example (Copy: Selection)

#### Single file, contiguous selection (relative)

````markdown
src/utils/auth.js:43-46
```
function isExpired(token) {
  return token.exp <= Date.now();
}
```
````

#### Single file, contiguous selection (absolute)

````markdown
/workspace/project/src/utils/auth.js:43-46
```
function isExpired(token) {
  return token.exp <= Date.now();
}
```
````

#### Single file, multiple selections

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

#### Multiple files, multiple selections

````markdown
src/utils/auth.js:43-46
```
function isExpired(token) {
  return token.exp <= Date.now();
}
```

src/components/LoginForm.js:12-14
```
const submit = async () => {
  await login(username, password);
};
```
````

## Attribution

This extension is modified from ezforo's **Copy Relative Path and Line Numbers** (v0.3.1).
