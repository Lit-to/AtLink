import * as vscode from "vscode";
import * as CONST from "./const";
/**
 * ハイライト文字列のインターフェース
 * 文書全体のハイライト位置とURLの情報を持つ
 */
interface highlightString {
  /**
   * 文書内のハイライト半開区間の開始位置
   */
  start: number;
  /**
   * 文書内のハイライト半開区間の終了位置
   * ※文書内のstartの後にハイライトが無くなる最初の文字の位置
   */
  end: number;
  /**
   * この区間に持たせるリンク情報
   */
  link: string;
}

/**
 * 問題ページの文字列を生成するためのトークン配列
 */
const problemPage = [
  CONST.KEY_LINK.DOMAIN,
  CONST.KEY_LINK.CONTESTS,
  CONST.KEY_LINK.SEPARATER,
  CONST.KEY_REPLACE.CONTESTS,
  CONST.KEY_REPLACE.TIMES,
  CONST.KEY_LINK.SEPARATER,
  CONST.KEY_LINK.TASKS,
  CONST.KEY_LINK.SEPARATER,
  CONST.KEY_REPLACE.CONTESTS,
  CONST.KEY_REPLACE.TIMES,
  CONST.KEY_LINK.PROBLEM_PREFIX,
  CONST.KEY_REPLACE.PROBLEMS,
];

/**
 * コンテストページの文字列を生成するためのトークン配列
 */
const contestPage = [
  CONST.KEY_LINK.DOMAIN,
  CONST.KEY_LINK.CONTESTS,
  CONST.KEY_LINK.SEPARATER,
  CONST.KEY_REPLACE.CONTESTS,
  CONST.KEY_REPLACE.TIMES,
];

/**
 * 問題ページのリンクを生成する関数
 * ※問題欄が空文字列の場合はコンテストページを生成する
 * @param contests コンテスト名(ABC/ARC/AGC/AHC)
 * @param times コンテスト番号
 * @param problem 問題(A~H)
 * @returns 問題/コンテストURL
 */
function createLink(contests: string, times: string, problem: string) {
  let page: string[];
  if (problem == "") {
    page = contestPage;
  } else {
    page = problemPage;
  }
  let url = [];
  for (let i = 0; i < page.length; ++i) {
    if (page[i] == CONST.KEY_REPLACE.CONTESTS) {
      url.push(contests);
    } else if (page[i] == CONST.KEY_REPLACE.TIMES) {
      url.push(times);
    } else if (page[i] == CONST.KEY_REPLACE.PROBLEMS) {
      url.push(problem);
    } else {
      url.push(page[i]);
    }
  }
  return url.join("");
}

/**
 * 文書内から正規表現にマッチする位置をすべて検索し、リンクオブジェクトを生成する関数
 * リンクオブジェクトは重複を排除する
 * @param document VSコードの文書オブジェクト
 * @param regex 正規表現
 * @param setLinks 生成済み管理hashSet
 * @returns
 */
function generateLinkObject(document: vscode.TextDocument, regex: RegExp, setLinks: Set<number>) {
  let links: vscode.DocumentLink[] = [];
  const matchedIter = document.getText().matchAll(regex);
  for (let i of matchedIter) {
    if (setLinks.has(i.index)) {
      continue;
    }
    const url = createLink(i[0].substring(0, 3), i[0].substring(3, 6), i[0].substring(6, 7));
    const matchedString: highlightString = {
      start: i.index,
      end: i.index + i[0].length,
      link: url,
    };
    const startPos: vscode.Position = document.positionAt(matchedString.start);
    const endPos: vscode.Position = document.positionAt(matchedString.end);
    const linkRange: vscode.Range = new vscode.Range(startPos, endPos);
    const linkObject: vscode.Uri = vscode.Uri.parse(matchedString.link);
    links.push(new vscode.DocumentLink(linkRange, linkObject));
    setLinks.add(i.index);
  }
  return links;
}

/**
 * リンク生成エントリポイント
 * 複数の正規表現を順にマッチさせてリンクオブジェクトを生成する
 * @param document 文書オブジェクト
 * @param tasks 長時間の処理を行うときのレスポンスオブジェクト
 * @returns リンクオブジェクトをまとめた配列
 */
function addUrl(document: vscode.TextDocument, tasks: vscode.CancellationToken) {
  let links: vscode.DocumentLink[] = [];
  let setLinks: Set<number> = new Set<number>();
  links = links.concat(generateLinkObject(document, CONST.REGEX_PATTERNS.PROBLEM, setLinks));
  links = links.concat(generateLinkObject(document, CONST.REGEX_PATTERNS.CONTEST, setLinks));
  return links;
}
export { addUrl };
