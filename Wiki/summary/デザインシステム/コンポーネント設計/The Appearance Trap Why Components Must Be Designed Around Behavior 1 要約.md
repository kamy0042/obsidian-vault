---
type: summary
updated: 2026-09-22
---

# The Appearance Trap Why Components Must Be Designed Around Behavior 1 要約

ソース: [[The Appearance Trap Why Components Must Be Designed Around Behavior 1]]

コンポーネントを静的な見た目ではなく、ユーザーとシステムの関係を規定する「振る舞いの契約」と捉えるべきだと論じる。
外観だけを設計すると、成功時しかない画面、同じ見た目で異なる振る舞いをする部品、実装の重複が生じる。
そこで、選択・確認・移動などの動詞から始め、入力・出力・制約・状態・遷移を定義する Verb First と状態機械の設計を提案する。
その契約はデザイナーとエンジニアが早期に共同作成し、状態図・操作規則・アクセシビリティ要件を Behavioral Spec として残す。
視覚表現を契約の結果として扱うことで、現実の失敗や例外にも耐える予測可能なプロダクトになると結論づける。
