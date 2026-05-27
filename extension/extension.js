// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  let alertMessage = "File path not found!";

  let getEditorState = function (editor) {
    if (!editor) {
      return false;
    }

    let doc = editor.document;
    if (doc.isUntitled) {
      return false;
    }

    let folder = vscode.workspace.getWorkspaceFolder(doc.uri);
    if (!folder) {
      return false;
    }

    return {
      key: doc.uri.toString(),
      doc,
      relativePath: vscode.workspace.asRelativePath(doc.uri),
      absolutePath: doc.uri.fsPath,
    };
  };

  let getRanges = function (selections, includeEmptySelection = false) {
    let ranges = [];

    selections.forEach((selection) => {
      let startLine = selection.start.line;
      let endLine = selection.end.line;

      if (selection.isEmpty) {
        if (!includeEmptySelection) {
          return;
        }

        startLine = selection.active.line;
        endLine = selection.active.line;
      } else if (
        selection.end.character === 0 &&
        selection.end.line > selection.start.line
      ) {
        // 当按“整行”方式选择多行时，VS Code 的 selection.end 可能指向“下一行的开头”。
        // 这里将 endLine 往回减 1，确保拿到实际选区的最后一行。
        endLine = selection.end.line - 1;
      }

      ranges.push({ start: startLine + 1, end: endLine + 1 });
    });

    ranges.sort((a, b) => a.start - b.start || a.end - b.end);

    // 合并重叠/相邻的选区：比如 5、6、7 行合并为 5-7。
    let merged = [];
    ranges.forEach((range) => {
      let last = merged[merged.length - 1];
      if (!last) {
        merged.push({ ...range });
        return;
      }

      if (range.start <= last.end + 1) {
        last.end = Math.max(last.end, range.end);
      } else {
        merged.push({ ...range });
      }
    });

    return merged;
  };

  let getSelectionEntry = function (editor, includeEmptySelection = false) {
    let state = getEditorState(editor);
    if (!state) {
      return false;
    }

    let ranges = getRanges(editor.selections, includeEmptySelection);
    if (!ranges.length) {
      return false;
    }

    return {
      ...state,
      ranges,
    };
  };

  let buildBlocks = function (entry, useAbsolutePath = false) {
    let blocks = entry.ranges
      .map((range) => {
        let path = useAbsolutePath ? entry.absolutePath : entry.relativePath;
        let header = `${path}:${range.start}-${range.end}`;

        let codeLines = [];
        for (let line = range.start; line <= range.end; line++) {
          codeLines.push(entry.doc.lineAt(line - 1).text);
        }

        let code = codeLines.join("\n");
        return `${header}\n\`\`\`\n${code}\n\`\`\`\n`;
      })
      .join("\n");

    return `\n${blocks}`;
  };

  let copyPathLines = function (withLineNumber = false, useAbsolutePath = false) {
    let editor = vscode.window.activeTextEditor;

    if (withLineNumber) {
      let entry = getSelectionEntry(editor) || getSelectionEntry(editor, true);

      if (!entry) {
        vscode.window.showWarningMessage(alertMessage);
        return false;
      }

      return buildBlocks(entry, useAbsolutePath);
    } else {
      let state = getEditorState(editor);
      if (!state) {
        vscode.window.showWarningMessage(alertMessage);
        return false;
      }

      return useAbsolutePath ? state.absolutePath : state.relativePath;
    }
  };

  let toast = function (message) {
    vscode.window.setStatusBarMessage(
      "`" + message + "` is copied to clipboard",
      3000
    );
  };

  let copyToClipboard = function (message) {
    if (message === false) {
      return;
    }

    vscode.env.clipboard.writeText(message).then(() => {
      toast(message);
    });
  };

  let registerCopyCommand = function (command, withLineNumber, useAbsolutePath) {
    return vscode.commands.registerCommand(command, () => {
      copyToClipboard(copyPathLines(withLineNumber, useAbsolutePath));
    });
  };

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "copy-relative-path-and-line-numbers" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let cmdAbsoluteSelection = registerCopyCommand(
    "copy-relative-path-and-line-numbers.absolute-selection",
    true,
    true
  );

  let cmdRelativeSelection = registerCopyCommand(
    "copy-relative-path-and-line-numbers.relative-selection",
    true,
    false
  );

  let cmdAbsolutePath = registerCopyCommand(
    "copy-relative-path-and-line-numbers.absolute-path",
    false,
    true
  );

  let cmdRelativePath = registerCopyCommand(
    "copy-relative-path-and-line-numbers.relative-path",
    false,
    false
  );

  context.subscriptions.push(
    cmdAbsoluteSelection,
    cmdRelativeSelection,
    cmdAbsolutePath,
    cmdRelativePath
  );
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
