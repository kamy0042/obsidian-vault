---
type: entity
entity-type: spec
aliases: [Design Tokens Community Group, W3Cデザイントークン標準, Design Token Format Modules]
updated: 2026-09-22
---

# DTCG

## 概要

W3C の Design Tokens Community Group。デザイントークンをツール間で相互運用可能にするフォーマット仕様（Design Tokens specification）を策定している。「デザイントークン」という概念と名前は Salesforce デザインシステムチーム（Jon Levine と Jina Anne）に由来する（出典: [[Design Tokens Technical Reports]]）。共通仕様がないとツール間移行（[[Tokens Studio]]→Anima 等）でデータ構造の不整合が起きる、という相互運用問題が存在意義（出典: [[デザイントークンに詳しくなれるスクラップ]]）。

## 仕様の構成と用語

- 仕様は複数モジュールで構成: **Format**（中核。公開済みドラフト）、**Color**（ドラフト作成中）、**Animations**（予定）（出典: [[Design Tokens Technical Reports]]）
- 公式グロッサリの定義: デザイントークン = 「デザイン決定に名前を付けて保存する Single Source of Truth。デザインツールとコーディング言語をまたいで使えるよう配布されるもの」（出典: [[Design Tokens Glossary  Design Tokens Community Group]]）
- 同グロッサリの主要語彙: **translation tool**（YAML 等のトークンセットを CSS custom properties / Sass / Swift / Sketch パレット等へ変換。例: Theo・[[Style Dictionary]]・Diez・Specify）/ **alias**（他トークンへの参照を値に持つ）/ **group**（著者定義の分類）/ **type**（値の分類）/ **composite token**（複数の決定を含む値。text style・border・gradient・shadow）/ **schema**（構文の妥当性を判定する規則）（出典: 同上）
- Format の表記: `$type` `$value` `$description` など `$` 接頭辞はトークン境界のマーカー。2023年時点のドラフトでは color の `$value` は hex 文字列（出典: [[Color Module - First Draft by adekunleoduye · Pull Request 147 · design-tokens-community-group · GitHub]]）

## Color Module ドラフトの論点

以下すべて出典: [[Color Module - First Draft by adekunleoduye · Pull Request 147 · design-tokens-community-group · GitHub]]

- 拡張案: color の `$value` を文字列 hex **または**オブジェクト（`$hex` = 必須の保証されたフォールバック + `$colorSpace` = rgb / srgb / hsl / lch と components 配列）にする。hex フォールバックは sRGB 含意とすべき、という整理
- 広色域（P3）は「50%多い色へのアクセス」だが、知覚的均一性ゆえ値の区別が難しくなるトレードオフ。OKLCH のブラウザ対応は当初 Safari のみ→Chrome/Edge/Firefox（flag付き）へ拡大（2023、kaelig 指摘）
- `$value` 内部のキーに `$` を付けるかは揺れ（他の composite type は非接頭辞。drwpow と James Nash が非接頭辞を支持）
- **`$darkValue` のような拡張プロパティは format 違反**。仕様外プロパティは許されず、単一ファイルでのダーク/ライト表現手段は仕様に存在しない（後述の未解決問題）。編者 James Nash（c1rrus）が2023年11月に requested changes——仕様策定は現在進行形

## 未解決の大問題 — テーマとモード

- **ネイティブなモード/テーマ対応は未決着**（Issue #210。値の表現手段が仕様にない）。現状のダークモードは Style Dictionary の single-token method や Figma Variables などツール側の解決に委ねられている（出典: [[Color Module - First Draft by adekunleoduye · Pull Request 147 · design-tokens-community-group · GitHub]]）
- 実務への波及: Figma が Variables の GUI インポートを提供しない背景の一つも「DTCG のテーマの扱いが未確定」なことにあるとされる。B-43（スマートバンク）は Issue #210 で提案されたフォーマット（Figma 内部の人物による提案で「一番当たりが良さそう」）を先取りした独自プラグインで light / dark を扱った（出典: [[B-43のデザイントークンをTokens Studio for FigmaからVariablesに移行しました - inSmartBank]]）
- **条件付きトークン値の提案**（Issue #169）: 「トークンファイルの外部にある X が変わったら値が変わる」を一般化する。X の例は画面サイズ・色域（srgb / display-p3）・カラースキーム設定・ブランド・プラットフォーム・メディアタイプ・機能サポート。CSS の Conditional At Rules（`@media` `@supports`）の**逆転形**として、トークン側が基本値＋ conditionalValues のリストを持つ。翻訳ツールが条件分岐コードを生成すれば開発者は単一トークン名で動的な結果を得られ、lint で「全色に light / dark 変種があるか」を検証できる（出典: [[Conditional token values · Issue 169 · design-tokens-community-group · GitHub]]）
- **インターフェース提案**（Issue #2、James Nash = UDT 提案者）: OOP の interface のように「スロット」（必須の名前・型・任意のデフォルト値）を定義し、light / dark スキームやブランド A/B/C が**実装**として値を埋める。強い型付けにより (1) 誤参照のエラーチェック（color スロットに length トークンを入れたら検出）(2) 型で絞った賢い UI（ピッカーが互換トークンだけ提示、スロットだけ提示して抽象層を強制→全コンポーネントのテーマ可能性を保証）が可能になる。URL インポートを許せば、サードパーティ widget が「公開デザイントークン API」を interface として公開し、各デザインシステムが自分の値で実装する世界もありうる（出典: [[RFC Theming · Issue 2 · design-tokens-community-group · GitHub]], [[Conditional token values · Issue 169 · design-tokens-community-group · GitHub]]）

## 安定版仕様のリリース — v2025.10

- **2025年10月に最初の安定版仕様 v2025.10 をリリース**。ベンダー非依存の JSON 形式を提供し、Figma・Tokens Studio・GitHub・エンタープライズコードベース間の同期を統合した。「トークンを Figma Variables に置くか Tokens Studio に置くか独自 JSON に置くか」という消耗した議論は「どれにも限定されない。すべて W3C 準拠で同じ基本原則に同期する」に決着し、ワークフローの移植性が上がった（ツールへのロックインが解消）。**複合トークン**（composite tokens）のサポートにより、タイポグラフィマトリクスやレイヤードボックスシャドウのようなマルチプロパティの決定を論理的にグループ化できる（出典: [[Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t.]]）
- 安定版の内容として、**テーマとマルチブランドのネイティブサポート**・**Display P3 / OKLCH などモダン色空間**・**トークンの継承とエイリアス解決**が挙げられている——長年ツール側に委ねられてきたモード/テーマ問題（上述 Issue #210）が標準側で扱われる形（出典: [[Design Systems as Brand Ops Tokens, AI and Stopping Brand Drift]]）
- 注: 「未解決の大問題」の各節は安定版リリース以前のソースに基づく。v2025.10 での解決範囲の詳細（interface 提案の帰趨など）は仕様本体で確認すること
- **標準の上の拡張実践**: DTCG 準拠 JSON に `$intent` ブロック（useFor / doNotUseFor / pairsWith）を追加し、トークンの使用意図を機械可読にする試み（Manychat の Manyfest DS）。AI エージェントがトークン選択を推論できる前提を標準の上に築く（出典: [[How to Build an Agentic Design System People (and Agents) Will Actually Use (Part 1)]]）。詳細は [[AI時代のデザインシステム]]

## 意義と限界

- 標準に沿えば中央のプラットフォーム非依存リポジトリからプロダクト群全体へ一貫した伝播が効く、というのが推進側の主張（出典: [[自信を持ってトークンを設計しましょう。W3Cデザイントークン標準が優れている理由…  ルーカス・オッパーマン著  2026年1月  UX Collective]]※冒頭のみの部分クリップ）
- ただし**仕様が標準化するのは表現（文法）であって義務（どのトークンが存在すべきか）ではない**。「仕様は文法を、契約は各ブランドが埋めるべき語彙リストを与える」——マルチブランド運用には仕様と別に契約層が要る（[[Kevin Muldoon]]）。Nash 自身も値を持たない「design token interface」を Investec で実装しており、Issue #2 の提案と同じ発想が標準側と企業側で独立に収斂している（出典: [[Design Tokens Aren’t a Contract]], [[RFC Theming · Issue 2 · design-tokens-community-group · GitHub]]）。詳細は [[デザインシステムの強制と例外]]
- 2023年11月時点では Format Modules は「標準化に向けた議論が進行中でまだ標準規格ではない」（出典: [[【デザイン】新規サービス開発でデザイントークンを導入してみました！ Design - Qiita]]）
- 標準化の意味論: DTCG は語彙の「**著作の負担を継承に変換**」した成熟経路の実例——各組織が独自にトークン語彙を著作（設計・強制）する負担を、標準からの継承に置き換えた（出典: [[Building language for design systems]]）
- 過渡期への実務的な構え: B/43 は「Format Module と Style Dictionary の利便性の間をとり」、現状は SD でパースできる形式に合わせつつ**将来は文字列置換で DTCG 仕様へ寄せられる形**で設計している——「パラダイムシフトで変更を余儀なくされることを受け入れる」（出典: [[初公開！「家計簿プリカ B-43」のデザイントークンの設計 - inSmartBank]]）

## 登場するソース

[[Design Tokens Technical Reports]], [[Design Tokens Glossary  Design Tokens Community Group]], [[Color Module - First Draft by adekunleoduye · Pull Request 147 · design-tokens-community-group · GitHub]], [[Conditional token values · Issue 169 · design-tokens-community-group · GitHub]], [[RFC Theming · Issue 2 · design-tokens-community-group · GitHub]], [[自信を持ってトークンを設計しましょう。W3Cデザイントークン標準が優れている理由…  ルーカス・オッパーマン著  2026年1月  UX Collective]], [[Design Tokens Aren’t a Contract]], [[Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t.]], [[B-43のデザイントークンをTokens Studio for FigmaからVariablesに移行しました - inSmartBank]], [[【デザイン】新規サービス開発でデザイントークンを導入してみました！ Design - Qiita]], [[デザイントークンに詳しくなれるスクラップ]], [[初公開！「家計簿プリカ B-43」のデザイントークンの設計 - inSmartBank]], [[Design Systems as Brand Ops Tokens, AI and Stopping Brand Drift]], [[How to Build an Agentic Design System People (and Agents) Will Actually Use (Part 1)]], [[Building language for design systems]]

## 関連ページ

[[デザイントークン]], [[Style Dictionary]], [[デザインシステムの強制と例外]], [[デザイントークンのツールチェーン]], [[AI時代のデザインシステム]]
