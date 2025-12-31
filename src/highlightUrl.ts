import * as vscode from "vscode";

interface highlightString {
  start: number;
  end: number;
  content: string;
  link: string;
}
const key = {
  domain: "https://atcoder.jp/",
  contest: "{contest}",
  times: "{times}",
  problem: "{problem}",
  sep: "/",
};
const problemPage = [
  key.domain,
  "contests",
  key.sep,
  key.contest,
  key.times,
  key.sep,
  "tasks",
  key.sep,
  key.contest,
  key.times,
  "_",
  key.problem,
];
const contestPage = [key.domain, "contests", key.sep, key.contest, key.times];

/**
 * 必要な情報からコンテストか問題URLを取得する関数
 * @param contest コンテスト名(ABC/ARC/AGC/AHC)
 * @param times コンテスト番号
 * @param problem 問題(A~H)
 * @returns 問題/コンテストURL
 */
function createLink(contest: string, times: string, problem: string) {
  let page: string[];
  if (problem == "") {
    page = contestPage;
  } else {
    page = problemPage;
  }
  let url = [];
  for (let i = 0; i < page.length; ++i) {
    if (page[i] == key.contest) {
      url.push(contest);
    } else if (page[i] == key.times) {
      url.push(times);
    } else if (page[i] == key.problem) {
      url.push(problem);
    } else {
      url.push(page[i]);
    }
  }
  return url.join("");
}

/**
 *
 * @param matchedString
 * @param document
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
      content: i[0],
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
function addUrl(document: vscode.TextDocument, token: vscode.CancellationToken) {
  let links: vscode.DocumentLink[] = [];
  const contestRegex = /[Aa][BRGHbrgh][Cc][0-9]{3}/g;
  const problemRegex = /[Aa][BRGHbrgh][Cc][0-9]{3}[A-Ha-h]/g;
  let setLinks: Set<number> = new Set<number>();
  links = links.concat(generateLinkObject(document, problemRegex, setLinks));
  links = links.concat(generateLinkObject(document, contestRegex, setLinks));
  return links;
}
export { addUrl };
