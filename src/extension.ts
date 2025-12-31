import * as vscode from "vscode";
import * as highlightUrl from "./highlightUrl";
/**
 * 拡張機能が有効になったときに起動する関数
 * 各種機能をVSコードのコンテキストに追加する
 * @param context 自動で挿入されるコンテキストオブジェクト
 * @returns void
 */
function activate(context: vscode.ExtensionContext) {
  const linkProvider = vscode.languages.registerDocumentLinkProvider(
    { scheme: "file" },
    { provideDocumentLinks: highlightUrl.addUrl }
  );
  context.subscriptions.push(linkProvider);
}

export { activate };
