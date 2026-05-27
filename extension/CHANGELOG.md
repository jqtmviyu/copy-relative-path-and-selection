# Changelog

## 0.0.5

- Limit selection copying to the active file while keeping multi-selection support within that file
- Prefix selection output with a blank line for easier pasting into multi-line prompts
- Switch VSIX packaging to `vsce` and keep GitHub Release uploads while leaving Marketplace publish commented out

## 0.0.4

- Add `Copy: Path` to copy current file relative path from editor context menu
- Add `Copy: Path (Absolute)` to copy current file absolute path from editor context menu
- Rename relative selection command to `Copy: Selection`
- Rename absolute selection command to `Copy: Selection (Absolute)`
- Add GitHub Actions workflow to package and publish `.vsix` artifacts on manual runs and tag pushes

## 0.0.3

- Replace `Copy: Relative Path` with `Copy: Selection (Relative)`
- Make `Copy: Selection` copy selected code with absolute file paths
- Keep relative-path selection copying under the new `Copy: Selection (Relative)` command

## 0.0.2

- Add support for collecting the latest non-empty selections across multiple workspace files before copying
- Ignore untitled files and files outside the workspace when caching selections
- Clear cached selections when a file closes or after copying

## 0.0.1

Forked from ezforo's Copy Relative Path and Line Numbers (v0.3.1).

- Change output format to be AI-friendly:
  - `path` for path-only
  - `path:start-end` + fenced code block for selections
  - support multi-selection and non-contiguous selections
- Rename command titles to:
  - Copy: Relative Path
  - Copy: Selection
- Remove the default keybinding

## Upstream

The original changelog entries below are from the upstream extension.

## 0.3.0

Add support for Windows WSL

## 0.2.8

Show an alert message when the file path is not accessible (e.g. `Untitled-1`).
