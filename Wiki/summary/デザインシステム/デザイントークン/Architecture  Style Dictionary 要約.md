---
type: summary
updated: 2026-07-25
---

# Architecture  Style Dictionary 要約

ソース: [[Architecture  Style Dictionary]]

デザイントークン変換フレームワークStyle Dictionaryの内部動作を9ステップで解説した公式アーキテクチャドキュメント。
処理は設定ファイル（config）のパースから始まり、includeとsourceのglobでトークンファイルを発見し、カスタムパーサーまたは組み込みパーサーでパースした後、全ファイルをdeep mergeして単一の完全なトークンオブジェクトを構築する。
マージによりトークンファイルを自由に分割でき、エイリアス参照（例: "{size.font.base}"）がどのファイルにあっても解決できるのがこの設計の要点である。
その後、preprocessorsの実行、valueキーを持つトークンへのtransformsの適用、エイリアス解決、formatsによるファイル出力を行い、最後にアセットコピー等のカスタム処理であるactionsを実行する。
参照を含むトークンのvalue transformはスキップされるが、v3.0以降は参照解決後に変換するtransitive transformが定義できる点や、フラットなSCSS変数ファイルを出力するため内部でトークンのフラット配列も作られる点も説明されている。
