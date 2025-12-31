import * as vscode from "vscode";
import * as highlightUrl from "./highlightUrl";
/**
 * 拡張機能が有効になったときに起動する関数
 * 各種機能をcontextに追加する
 * @param context 自動で挿入されるコンテキストオブジェクト
 * @returns void
 */
function activate(context: vscode.ExtensionContext) {
  const events = generateEvents();
  for (let i = 0; i < events.length; ++i) {
    context.subscriptions.push(events[i]);
  }
}

/**
 * この拡張機能で有効になるイベントを生成する
 * @returns 配列
 */
function generateEvents() {
  let events = Array(0);
  // events.push(vscode.workspace.onDidChangeTextDocument(addUrl));
  return events;
}
vscode.languages.registerDocumentLinkProvider({ scheme: "file" }, { provideDocumentLinks: highlightUrl.addUrl });

function deactivate() {
  return;
}

export { activate, deactivate };
