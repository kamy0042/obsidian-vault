---
type: summary
updated: 2026-07-26
---

# Next.js × Ant Designを使ったら、「Cannot use import statement outside a module」で怒られた件 React - Qiita 要約

ソース: [[Next.js × Ant Designを使ったら、「Cannot use import statement outside a module」で怒られた件 React - Qiita]]

Next.js に Ant Design を導入した際に発生する「Cannot use import statement outside a module」エラーの解決備忘録。
package.json への `"type": "module"` 追加など検索で出てくる一般的な対処では解決しなかった。
Ant Design 公式の GitHub Issue に解決策があり、next.config.js の `transpilePackages` に antd 本体と @ant-design、依存する rc-util / rc-pagination / rc-picker などの rc 系パッケージ群を列挙する。
node_modules 内の ESM パッケージを Next.js 側でトランスパイルしてバンドルさせる必要がある、という MUI × Vite SSR と同型の ESM/CJS 互換問題の事例。
