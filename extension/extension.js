// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  let copyPathLines = function (withLineNumber = false) {
    let alertMessage = "File path not found!";
    if (!vscode.workspace.rootPath) {
      vscode.window.showWarningMessage(alertMessage);
      return false;
    }

    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage(alertMessage);
      return false;
    }

    let doc = editor.document;
    if (doc.isUntitled) {
      vscode.window.showWarningMessage(alertMessage);
      return false;
    }

    let path = vscode.workspace.asRelativePath(doc.fileName);

    if (withLineNumber) {
      let ranges = [];

      editor.selections.forEach((selection) => {
        let startLine = selection.start.line;
        let endLine = selection.end.line;

        if (selection.isEmpty) {
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

      let blocks = merged.map((range) => {
        let header = `${path}:${range.start}-${range.end}`;

        let codeLines = [];
        for (let line = range.start; line <= range.end; line++) {
          codeLines.push(doc.lineAt(line - 1).text);
        }

        let code = codeLines.join("\n");
        return `${header}\n\`\`\`\n${code}\n\`\`\`\n`;
      });

      return blocks.join("\n");
    } else {
      return path;
    }
  };

  let toast = function (message) {
    vscode.window.setStatusBarMessage(
      "`" + message + "` is copied to clipboard",
      3000
    );
  };

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "copy-relative-path-and-line-numbers" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let cmdBoth = vscode.commands.registerCommand(
    "copy-relative-path-and-line-numbers.both",
    () => {
      let message = copyPathLines(true);
      if (message !== false) {
        vscode.env.clipboard.writeText(message).then(() => {
          toast(message);
        });
      }
    }
  );

  let cmdPathOnly = vscode.commands.registerCommand(
    "copy-relative-path-and-line-numbers.path-only",
    () => {
      let message = copyPathLines();
      if (message !== false) {
        vscode.env.clipboard.writeText(message).then(() => {
          toast(message);
        });
      }
    }
  );

  context.subscriptions.push(cmdBoth, cmdPathOnly);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
