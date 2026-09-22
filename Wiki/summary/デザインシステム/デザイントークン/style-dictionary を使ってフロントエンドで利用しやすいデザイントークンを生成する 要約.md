---
type: summary
updated: 2026-07-26
---

# style-dictionary を使ってフロントエンドで利用しやすいデザイントークンを生成する 要約

ソース: [[style-dictionary を使ってフロントエンドで利用しやすいデザイントークンを生成する]]

beijaflor 氏（Zenn）による、Style Dictionary の出力を TypeScript フロントエンドで使いやすく拡張する実装解説。
デザイントークンは棚卸しするだけで導入でき実効性も高いため、デザインシステムの最初の一歩として推奨している。
素の設定から出発し、YAML パーサの追加、registerFormat によるカスタムフォーマッタで JSDoc コメント付きの定数出力（IDE でドキュメント参照可能）を実現する。
さらに attributes.category から Branded Type（DesignTokenColor 等）を生成する型定義を出力し、コンポーネントの props が「カラートークンのみ受け付ける」ことを型レベルで強制できるようにする。
javascript/module 形式でメタ情報付きオブジェクトも書き出して Storybook のトークン一覧ページを構成する一方、全トークンが単一ファイルに出力されるためカテゴリ別 import ができない点をライブラリの限界として挙げている。
