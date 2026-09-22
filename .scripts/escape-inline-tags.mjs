// Articles 本文中のインラインタグ(#xxx)を \#xxx にエスケープして偽タグ化を防ぐ
// 使い方: node .scripts/escape-inline-tags.mjs        (Vault ルートで実行 / 変更を適用)
//         node .scripts/escape-inline-tags.mjs --dry  (対象の確認のみ)
// 対象外(中の # は壊さない): frontmatter / コードブロック(``` ~~~ / 4スペース・タブインデント) /
//         見出し行 / インラインコード / Markdownリンクの()内URL(括弧ネスト対応) / 生URL(http...)
import fs from "node:fs";
import path from "node:path";

const VAULT = "/Users/kamy0042/Documents/Obsidian Vault";
const DRY = process.argv.includes("--dry");

// Obsidianのタグ判定を厳密再現:
//   タグ本体の有効文字 = 英数字 / _ - / と 非ASCII(日本語等)
//   # の直前がタグ本体構成文字(またはバックスラッシュ)なら非タグ → 直前が非タグ文字/行頭のみ対象
const BODY = "A-Za-z0-9_\\-/\\u00C0-\\uFFFF";
const TAG_RE = new RegExp("(^|[^" + BODY + "\\\\])#([" + BODY + "]+)", "g");
// 数字/記号のみ(英字も日本語もない)のものは無効タグ。1文字でも文字を含めば有効。
const isTag = (t) => !/^[0-9_\-/]+$/.test(t);

const escapeSegment = (seg) =>
  seg.replace(TAG_RE, (m, pre, tag) => (isTag(tag) ? `${pre}\\#${tag}` : m));

// 行を「地の文」と「保護トークン」に手動スキャンで分割する。
// 保護トークン: インラインコード `...` / Markdownリンクの ](url) / 生URL http(s)://...
// Markdownリンクの url は括弧のネスト(例 /John_Gall_(author)#... )に対応して対応する ) まで取る。
function splitLine(line) {
  const out = []; // {text, protect}
  let buf = "";
  const flush = () => { if (buf) { out.push({ text: buf, protect: false }); buf = ""; } };
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    // インラインコード
    if (c === "`") {
      const end = line.indexOf("`", i + 1);
      if (end !== -1) { flush(); out.push({ text: line.slice(i, end + 1), protect: true }); i = end; continue; }
    }
    // Markdownリンク/画像の url 部: 直前が "](" のとき、対応する ) まで(括弧ネスト対応)
    if (c === "(" && line[i - 1] === "]") {
      let depth = 1, j = i + 1;
      while (j < line.length && depth > 0) {
        if (line[j] === "(") depth++;
        else if (line[j] === ")") depth--;
        j++;
      }
      flush(); out.push({ text: line.slice(i, j), protect: true }); i = j - 1; continue;
    }
    // 生URL: http(s):// から空白/山括弧/角括弧まで(丸括弧はURLに含めうるので許容)
    if ((c === "h") && /^https?:\/\//.test(line.slice(i))) {
      let j = i;
      while (j < line.length && !/[\s<>\]]/.test(line[j])) j++;
      flush(); out.push({ text: line.slice(i, j), protect: true }); i = j - 1; continue;
    }
    buf += c;
  }
  flush();
  return out;
}
const escapeLine = (line) =>
  splitLine(line).map((t) => (t.protect ? t.text : escapeSegment(t.text))).join("");

let changedFiles = 0, escaped = 0;
for (const f of fs.readdirSync(path.join(VAULT, "Articles")).filter((f) => f.endsWith(".md"))) {
  const p = path.join(VAULT, "Articles", f);
  const lines = fs.readFileSync(p, "utf8").split("\n");
  const close = lines[0] === "---" ? lines.indexOf("---", 1) : -1;
  let inFence = false, dirty = false;
  for (let i = 0; i < lines.length; i++) {
    if (close >= 0 && i <= close) continue;                  // frontmatter
    if (/^\s*(```|~~~)/.test(lines[i])) { inFence = !inFence; continue; }
    if (inFence) continue;
    if (/^( {4}|\t)/.test(lines[i])) continue;               // インデント型コードブロック
    if (/^#{1,6}\s/.test(lines[i])) continue;                // Markdown見出し行
    const next = escapeLine(lines[i]);
    if (next !== lines[i]) {
      escaped += (next.match(/\\#/g) || []).length - (lines[i].match(/\\#/g) || []).length;
      lines[i] = next;
      dirty = true;
    }
  }
  if (dirty) {
    changedFiles++;
    if (DRY) console.log("対象:", f);
    else fs.writeFileSync(p, lines.join("\n"));
  }
}
console.log(`${DRY ? "[dry] " : ""}変更ファイル: ${changedFiles}件 / エスケープ箇所: ${escaped}箇所`);
