# Copy: Relative Path and Selection

Copy relative paths or selected code as AI-ready context.

Accessible through right-click menu items in editor tabs and the editor window, or via the Command Palette (Ctrl+Shift+P / ⇧⌘P).

## Commands

- **Copy: Relative Path** (`copy-relative-path-and-line-numbers.path-only`)
  - Output: `relative/path/to/file`

- **Copy: Selection** (`copy-relative-path-and-line-numbers.both`)
  - Output: `relative/path/to/file:start-end` followed by a code block containing the selected lines
  - Supports multi-cursor and multi-selection; non-contiguous selections are output as separate blocks
  - Supports collecting the latest non-empty selections across multiple workspace files before copying
  - Ignores untitled files and files outside the workspace; cached selections are cleared when a file closes or after copying

### Example (Copy: Selection)

#### Single file, contiguous selection

````markdown
src/utils/auth.js:43-46
```js
function isExpired(token) {
  return token.exp <= Date.now();
}
```
````

#### Single file, multiple selections

````markdown
src/utils/auth.js:10-12
```js
function getUser() {
  return currentUser;
}
```

src/utils/auth.js:20-22
```js
function logout() {
  currentUser = null;
}
```
````

#### Multiple files, multiple selections

````markdown
src/utils/auth.js:43-46
```js
function isExpired(token) {
  return token.exp <= Date.now();
}
```

src/components/LoginForm.js:12-14
```js
const submit = async () => {
  await login(username, password);
};
```
````

## Attribution

This extension is modified from ezforo's **Copy Relative Path and Line Numbers** (v0.3.1).
