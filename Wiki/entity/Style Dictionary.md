---
type: entity
entity-type: product
aliases: [style-dictionary]
updated: 2026-07-12
---

# Style Dictionary

## 概要

Amazon 発の OSS。JSON / YAML 等で著述したデザイントークンを各プラットフォーム向けコード（CSS / SCSS 変数、JS / TS、Android XML、iOS Swift…）へ変換するビルドシステムで、標語は「Style once, use everywhere」。[[DTCG]] グロッサリの言う translation tool（Theo / Diez / Specify と並ぶ）の代表格（出典: [[Design Tokens Glossary  Design Tokens Community Group]], [[トークンベースのUIアーキテクチャを設計する]]）。作者は Danny Banks（CTI 命名規約の考案者としても引かれる。出典: [[Naming Tokens in Design Systems]], [[Design Tokens Aren’t a Contract]]）。Banks 自身は「トークンはマルチプラットフォームDSの一部にすぎない」とし、cohesion（基盤・トークン・共有コンポーネント定義の3層）と autonomy を軸にしたマルチプラットフォーム論を展開している（出典: [[An Introduction to Multi-Platform Design Systems]]。詳細は [[コンポーネント設計]]）。

## 主要な事実

- **処理パイプライン**: config 解析 → source / include のグロブでトークンファイル発見 → パース（JSON/JS は組み込み、カスタムパーサーで YAML 等も可）→ **deep merge**（ファイル分割を自由にし、エイリアスをファイル横断で機能させる）→ プリプロセッサ → **transform**（value 変換は参照を持つトークンをスキップ。3.0からは参照解決後に適用される transitive transform も可）→ **エイリアス解決**（`{size.font.base}` 記法）→ format でファイル出力（内部にフラット配列も持ち、フラットな SCSS 変数出力を可能にする）→ action（アセットコピー・画像生成などの後処理）（出典: [[Architecture  Style Dictionary]]）
- **拡張ポイント**: registerTransform / registerTransformGroup / registerFilter / registerFormat / registerParser / registerAction。config を JS にすれば任意の処理を注入できる（出典: [[【デザインシステム】デザイントークンをコード変換する Style Dictionary が超便利]]）
- トークン構造として **CTI**（Category / Type / Item）を文書化している。[[Nathan Curtis]] の命名論や Muldoon の契約タクソノミーが参照する系譜上の起点のひとつ（出典: [[StyleDictionary design-token-structure]], [[Design Tokens Aren’t a Contract]]）
- **ダークモードの2方式**（作者 Danny Banks 自身の比較検証）: ① single-token method（`value` と `darkValue` を同一トークンに同居。ビルド1回で済むが、SD は `value` しか transform しないため **darkValue は参照であることが必須**。カスタム format / action が大量に要り、SVG はダーク版ソースを別途作る羽目になる）② multi-file method（`.dark.json` 等にファイル分割）。PR 差分は multi-file が +441/−48、single-token が +790/−59 で、**作者は multi-file を推奨**。どちらの方式でも「全カラートークンにダーク値を持たせない」——多層の参照構造なら一握りのトークンだけがダーク値を持てば済む。同じ仕組みで high contrast を加えた4モード（light / dark × 通常 / HC）にも拡張できる（`prefers-contrast` の対応は progressive enhancement として）（出典: [[Dark Mode with Style Dictionary  dbanksdesign]]）
- **実践パターン（国内事例）**: カスタムパーサーで YAML 著述 / registerFormat 改造で JSDoc コメント付き TS 出力 / **Branded Type 出力**——`DesignTokenColor` 型を生成し「カラートークン以外の文字列を props が型で拒否する」。制約を型システムに住まわせる validation の一形態（出典: [[style-dictionary を使ってフロントエンドで利用しやすいデザイントークンを生成する]]）。fontWeight の数値→文字列変換（registerTransform）、`as const` の theme オブジェクト出力（registerFormat）、**プリミティブトークンを registerFilter で実装出力から除外**しセマンティック名だけを見せる（出典: [[【デザインシステム】デザイントークンをコード変換する Style Dictionary が超便利]]）
- **限界**: 全トークンが単一ファイルへ書き出されるため、トークンが増えると import のサジェストが汚染される（出典: [[style-dictionary を使ってフロントエンドで利用しやすいデザイントークンを生成する]]）。コンポーネントトークンの全順列著述（継承・条件式）には表現力不足で、Spectrum は内製著述ツールを要した（出典: [[コンポーネントレベルのデザイントークン：価値はあるか？  Nate Baldwin  Medium]]）。契約マニフェストを SD 内に埋め込むと「契約が実装ツールに閉じ込められる」——SD はビルドパイプラインであって権威（authority）ではない（出典: [[Design Tokens Aren’t a Contract]]）

## 登場するソース

[[Architecture  Style Dictionary]], [[StyleDictionary design-token-structure]], [[Dark Mode with Style Dictionary  dbanksdesign]], [[style-dictionary を使ってフロントエンドで利用しやすいデザイントークンを生成する]], [[【デザインシステム】デザイントークンをコード変換する Style Dictionary が超便利]], [[Style DictionaryとStorybookを使ったデザイントークンの連携フロー  microCMSブログ]], [[トークンベースのUIアーキテクチャを設計する]], [[An Introduction to Multi-Platform Design Systems]], [[Design Tokens Aren’t a Contract]], [[Design Tokens Glossary  Design Tokens Community Group]], [[Naming Tokens in Design Systems]], [[コンポーネントレベルのデザイントークン：価値はあるか？  Nate Baldwin  Medium]]

## 関連ページ

[[デザイントークン]], [[デザイントークンのツールチェーン]], [[DTCG]], [[セマンティックトークン]], [[デザインシステムの強制と例外]]
