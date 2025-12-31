/**
 * URL生成用の定数
 */
const KEY_LINK = {
  DOMAIN: "https://atcoder.jp/",
  SEPARATER: "/",
  CONTESTS: "contests",
  TASKS: "tasks",
  PROBLEM_PREFIX: "_",
};
const KEY_REPLACE = {
  CONTESTS: "{contests}",
  TIMES: "{times}",
  PROBLEMS: "{problem}",
};
const REGEX_PATTERNS = {
  CONTEST: /[Aa][BRGHbrgh][Cc][0-9]{3}/g,
  PROBLEM: /[Aa][BRGHbrgh][Cc][0-9]{3}[A-Ha-h]/g,
};
export { KEY_LINK, KEY_REPLACE, REGEX_PATTERNS };
