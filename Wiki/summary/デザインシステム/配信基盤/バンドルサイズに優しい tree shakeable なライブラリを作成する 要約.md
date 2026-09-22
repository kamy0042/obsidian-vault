---
type: summary
updated: 2026-07-26
---

# バンドルサイズに優しい tree shakeable なライブラリを作成する 要約

ソース: [[バンドルサイズに優しい tree shakeable なライブラリを作成する]]

tree shaking が効く JavaScript ライブラリの作り方を解説する記事（クリップは記事後半のみの部分クリップ）。
副作用のあるコードを含むファイルは package.json の sideEffects フィールドに配列で列挙し、バンドラーに伝える。
React.createContext のようなトップレベルで実行されるコードは副作用ありと判断されてしまうため、/*#__PURE__*/ コメントを挿入して文単位で副作用がないことを明示する（react-redux などが実際に採用）。
このコメントはバンドラー内部の minifier（terser 等）が解釈する。
デザインシステムの重要性の高まりや monorepo ツールの普及でライブラリ開発の機会が増えており、dual package 配布の難しさには publint や Packemon などの検証ツールも検討するとよいと補足する。
