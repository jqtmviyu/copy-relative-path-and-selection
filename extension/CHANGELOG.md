# Changelog

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
