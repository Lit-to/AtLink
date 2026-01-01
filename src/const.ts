/**
 * URL生成用の定数
 */
const KEY_LINK = {
  /**
   * AtCoderのドメイン
   */
  DOMAIN: "https://atcoder.jp/",
  /**
   * リンクのセパレータ
   */
  SEPARATER: "/",
  /**
   * リンク文字列 ``contests``
   */
  CONTESTS: "contests",
  /**
   * リンク文字列 ``tasks``
   */
  TASKS: "tasks",
  /**
   * 問題の前にあるアンダーバー
   */
  PROBLEM_PREFIX: "_",
};
/**
 * 処理中に置き換えるための仮文字列
 */
const KEY_REPLACE = {
  /**
   * コンテスト名 (``ABC``/``ARC``/``AGC``/``AHC``)
   */
  CONTESTS: "{contests}",
  /**
   * コンテスト番号 (数字三桁)
   */
  TIMES: "{times}",
  /**
   * コンテスト問題 (``A-H``,``Ex``)
   */
  PROBLEMS: "{problem}",
};
/**
 * 文字列の検知するための正規表現
 */
const REGEX_PATTERNS = {
  /**
   * コンテストページの正規表現
   */
  CONTEST: /(?!ABC316)[A][BRGH][C][0-9]{3}/gi,
  /**
   * 問題ページの正規表現
   */
  PROBLEMS: [
    /ARC120F2/gi, //ARC120F2
    /ABC(3(1[9]|[2-9]\d)|[4-9]\d\d|\d{4,})[A-G]/gi, // ABC319以降(A~G)
    /ABC31[78](?:EX|[A-G])/gi, // ABC317,318(A~G,Ex)
    /ABC(23[3-9]|2[4-9]\d|30\d|31[0-5])(?:EX|[A-G])/gi, // ABC233 ~ 315(A~G,Ex)
    /ABC(21[2-9]|22\d|23[0-2])[A-H]/gi, // ABC212 ~ 232(A~H)
    /ABC(12[6-9]|1[3-9]\d|20\d|21[01])[A-F]/gi, // ABC126 ~ 211(A~F)
    /ABC(00[1-9]|0[1-9]\d|1[01]\d|12[0-5])[A-D]/gi, // ABC001 ~ 125(A~D)
    /A[RGH]C[0-9]{3}[A-F]/gi, // ARC AGC AHC(回ごとにばらつきが大きいためすべて)
  ],
};
/**
 * 問題難易度A~Hのキー
 */
const PROBLEM_DIFFS = {
  CHAR_A: "A",
  CHAR_B: "B",
  CHAR_C: "C",
  CHAR_D: "D",
  CHAR_E: "E",
  CHAR_F: "F",
  CHAR_G: "G",
  CHAR_H: "H",
  CHAR_EX: "EX",
  NUM_A: 1,
  NUM_B: 2,
  NUM_C: 3,
  NUM_D: 4,
  NUM_E: 5,
  NUM_F: 6,
  NUM_G: 7,
  NUM_H: 8,
};
/**
 * 古すぎる問題のA~Hと1~8の対応表
 */
const KEY_CONVERT_PROBLEMS = {
  [PROBLEM_DIFFS.CHAR_A]: PROBLEM_DIFFS.NUM_A,
  [PROBLEM_DIFFS.CHAR_B]: PROBLEM_DIFFS.NUM_B,
  [PROBLEM_DIFFS.CHAR_C]: PROBLEM_DIFFS.NUM_C,
  [PROBLEM_DIFFS.CHAR_D]: PROBLEM_DIFFS.NUM_D,
  [PROBLEM_DIFFS.CHAR_E]: PROBLEM_DIFFS.NUM_E,
  [PROBLEM_DIFFS.CHAR_F]: PROBLEM_DIFFS.NUM_F,
  [PROBLEM_DIFFS.CHAR_G]: PROBLEM_DIFFS.NUM_G,
  [PROBLEM_DIFFS.CHAR_H]: PROBLEM_DIFFS.NUM_H,
};
/**
 * 問題ページの文字列を生成するためのURL文字の配列
 */
const PROBLEM_PAGE_TOKENS = [
  KEY_LINK.DOMAIN,
  KEY_LINK.CONTESTS,
  KEY_LINK.SEPARATER,
  KEY_REPLACE.CONTESTS,
  KEY_REPLACE.TIMES,
  KEY_LINK.SEPARATER,
  KEY_LINK.TASKS,
  KEY_LINK.SEPARATER,
  KEY_REPLACE.CONTESTS,
  KEY_REPLACE.TIMES,
  KEY_LINK.PROBLEM_PREFIX,
  KEY_REPLACE.PROBLEMS,
];

/**
 * コンテストページの文字列を生成するためのURL文字の配列
 */
const CONTEST_PAGE_TOKENS = [
  KEY_LINK.DOMAIN,
  KEY_LINK.CONTESTS,
  KEY_LINK.SEPARATER,
  KEY_REPLACE.CONTESTS,
  KEY_REPLACE.TIMES,
];

export {
  KEY_LINK,
  KEY_REPLACE,
  REGEX_PATTERNS,
  PROBLEM_DIFFS,
  KEY_CONVERT_PROBLEMS,
  PROBLEM_PAGE_TOKENS,
  CONTEST_PAGE_TOKENS,
};
