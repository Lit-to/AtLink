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
  CONTEST: /A[BRGH]C[0-9]{3}/gi,
  /**
   * 問題ページの正規表現
   */
  PROBLEM: /(A[BRGH]C)\d{3}(EX|F2|[A-H])/gi,
};

/**
 * 問題のA~HとURL文字列の対応表
 */
const KEY_CONVERT_PROBLEMS = {
  A: { LEGACY: "1", LATEST: "A" },
  B: { LEGACY: "2", LATEST: "B" },
  C: { LEGACY: "3", LATEST: "C" },
  D: { LEGACY: "4", LATEST: "D" },
  E: { LEGACY: "5", LATEST: "E" },
  F: { LEGACY: "6", LATEST: "F" },
  G: { LEGACY: "7", LATEST: "G" },
  H: { LEGACY: "8", LATEST: "H" },
  EX: { LEGACY: "", LATEST: "H" },
  F2: { LEGACY: "", LATEST: "F2" },
};

/**
 * 問題ページの文字列を生成するためのURL文字の配列
 */
const TOKEN_PROBLEM_PAGE = [
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
const TOKEN_CONTEST_PAGE = [
  KEY_LINK.DOMAIN,
  KEY_LINK.CONTESTS,
  KEY_LINK.SEPARATER,
  KEY_REPLACE.CONTESTS,
  KEY_REPLACE.TIMES,
];

export { KEY_LINK, KEY_REPLACE, REGEX_PATTERNS, KEY_CONVERT_PROBLEMS, TOKEN_PROBLEM_PAGE, TOKEN_CONTEST_PAGE };
