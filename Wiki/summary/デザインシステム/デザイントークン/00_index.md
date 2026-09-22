---
type: summary
updated: 2026-09-22
---

# デザイントークン 目次

`Wiki/summary/デザインシステム/デザイントークン/` の要約ページ目次。要約ページの増減に合わせて機械的に再生成する。現在 39件。

- [[Architecture  Style Dictionary 要約|Style Dictionary Architecture]] — config パースから出力まで、トークン変換9ステップの公式解説
- [[B-43のデザイントークンをTokens Studio for FigmaからVariablesに移行しました - inSmartBank 要約|B/43 の Variables 移行]] — Tokens Studio の運用障壁から Figma Variables へ。独自プラグインで API 制限を回避
- [[Color Tokens - Goldman Sachs Design 要約|Goldman Sachs の Color Tokens]] — セマンティック命名＋デフォルト/ダーク2値。Surface/Border/Text/Status 分類と数式ベースのインタラクション状態
- [[Component and token naming in Design Systems  by Nate Baldwin  Medium 要約|コンポーネントとトークンの命名（Nate Baldwin）]] — ケース記法の全体統一は不要、重要なのは Design API。「uniformity でなく unity」
- [[Dark Mode with Style Dictionary  dbanksdesign 要約|Style Dictionary でダークモード]] — single-token 方式 vs multi-file 方式の実装比較。カスタマイズが軽い multi-file 推奨
- [[Design Systems as Brand Ops Tokens, AI and Stopping Brand Drift 要約|Brand Ops としてのトークン]] — トークンは「ブランドのガバナンスインフラ」。DTCG v2025.10 安定版、Supernova 運用実態調査（63%バージョン管理なし）、デプロイ前ブランド監査
- [[Design tokens - Foundations - Atlassian Design System 要約|Atlassian のトークン基礎]] — トークン＝意図ベースの名前と値のペア。Foundation→Property→Modifier の3部命名。「見た目の色一致で選ぶな」
- [[Design tokens - Spectrum 要約|Spectrum のトークン設計]] — Global / Alias / Component-specific の3タイプ。「Global は控えめに、Alias を常に」
- [[Design tokens 101 要約|Design tokens 101（Mae Capozzi）]] — 成熟度3レベル（なし→非構造化→構造化）。値ベース命名の破綻と共通トークン仕様のメリット
- [[Design Tokens An Introduction 要約|Design Tokens 入門（Andy Barnes）]] — トークンの5利点と XD + Style Dictionary → npm 配布のワークフロー
- [[Design Tokens Aren’t a Contract 要約|Design Tokens Aren’t a Contract]] — トークンは実装であり契約ではない。値を持たないマニフェストを API 化した Dow Jones の事例
- [[Design tokens need more than semantics 要約|トークンにはセマンティクス以上が要る]] — communication／constructionを分け、structural templatesからレイアウトトークンを導く
- [[Garth Braithwaite on Design Tokens, Governance, and Scaling Spectrum at Adobe  Knapsack 要約|Garth Braithwaite（Adobe Spectrum）対談]] — JSON Schema 検証付き配布、命名の鍵はコンテンツストラテジスト。「DS 警察になるな」
- [[How to create a color palette for design systems  Blog 要約|カラーパレットの作り方（imperavi）]] — ベースカラー＋透明度重ねのカラービルダー。1スケール15値が最適、色名で命名しセマンティックは別層
- [[Material Design 3 要点まとめ 7 Color - Color system｜パジェロ｜COMPASS 要約|Material Design 3 Color system 要点まとめ]] — 5キーカラー×13トーン。トーン値差 40/50 でコントラスト比を保証するデフォルトアクセシブル設計
- [[Naming Tokens in Design Systems 要約|Naming Tokens in Design Systems（Nathan Curtis）]] — Base / Modifier / Object / Namespace の4グループに命名レベルを体系化。早すぎる全体化はしない
- [[Spacing Systems The Foundation Every Design System Gets Wrong 要約|Spacing Systems]] — 関係性から設計する余白。数学的スケール＋光学的例外、目的ベースのセマンティックトークン、値は5〜7個に制限
- [[Stop using OKLCH lightness for your color scale 要約|OKLCH lightnessを尺度に使うな]] — OKLCHは生成のブラシ、CIE L*と実測コントラストは測定の定規として使い分ける
- [[Style DictionaryとStorybookを使ったデザイントークンの連携フロー  microCMSブログ 要約|microCMS のトークン連携フロー]] — Figma Tokens → GitHub PR → Style Dictionary → Netlify プレビュー。デザイナー主導のトークン管理
- [[style-dictionary を使ってフロントエンドで利用しやすいデザイントークンを生成する 要約|フロントエンドで利用しやすいトークン生成]] — YAML 記述・JSDoc 付き出力・Branded Type による型レベルのトークン強制
- [[The Anatomy of a Design Token 要約|The Anatomy of a Design Token]] — トークンは Name / Type / Meta / Data の4要素。名前と値の疎結合が進化を可能にする
- [[The Aspirational Bloat Trap Why Your Design System is Failing 要約|憧れの肥大化の罠]] — 企業規模DSの模倣が肥大化を生む。Target/Role/State 分類と state layer で 195→25トークンに削減、Codex+Figma MCP で監査
- [[The cost of over-abstraction in design tokens. 要約|トークンの過剰抽象化のコスト]] — トークンは非セマンティックな定数。「Design Tokens → Theme Tokens → UI」の2層で十分
- [[The Token Structure That Survives Five Products (Google Uses It Too) 要約|5プロダクトを生き延びるトークン構造]] — M3 の reference/system/component 3層。「コンポーネントは生の値を指さない」を lint で封印、トークンは AI エージェントが読む契約
- [[Tokens Studio for FigmaとStyle Dictionaryでデザインの共通言語をつくる - 弁護士ドットコム株式会社 Creators’ blog 要約|弁護士ドットコムの共通言語づくり]] — GitLab 連携 + storybook-design-token でドキュメント自動生成。トークンは組織の共通言語
- [[Vol.436 - Frontend Weekly Tokyo 要約|Frontend Weekly Tokyo Vol.436]] — DS エコシステムの段階的成長論・CSS 変数命名・Web Components などの横断リソース集
- [[When “semantic tokens” are no longer semantic. 要約|セマンティックトークンがセマンティックでなくなるとき]] — Nate Baldwin の Goldilocks zone 論。共通構造の抽象化が汎用/特化のバランス解
- [[Why Your Color Tokens Must Describe Purpose, Not Just Appearance 要約|色トークンは見た目でなく目的を語れ]] — Global／Alias／Componentの3層と目的命名でテーマ変更を局所化する
- [[【デザイン】新規サービス開発でデザイントークンを導入してみました！ Design - Qiita 要約|レコチョク P!TNE のトークン導入]] — ミニマムスタートとフィボナッチ基盤のモジュラースケール。数値確認のやり取りが消滅
- [[【デザインシステム】デザイントークンをコード変換する Style Dictionary が超便利 要約|Style Dictionary が超便利（マイベスト）]] — registerTransform 等で Tokens Studio 管理のトークンを TS コードに変換。Figma と実装の変数一致
- [[コンポーネントレベルのデザイントークン：価値はあるか？  Nate Baldwin  Medium 要約|コンポーネントレベルトークンの価値]] — Spectrum で一時21万トークン・18MB JSON の bloat。完全運用が割に合うのは5条件が揃う場合のみ
- [[デザイナーと開発者の連携を効率化するデザイントークンとは何か？  アドビUX道場 UXDojo 要約|デザイントークンとは何か（アドビUX道場）]] — 変数との違いは用途情報の有無。命名規則・JSON 化・承認ワークフローの入門ベストプラクティス
- [[デザインシステムにおけるタイポグラフィーの試行錯誤 - DMM inside 要約|DMM Turtle のタイポグラフィー]] — Global 15段階 + Alias 3種のみ。多サービス展開では詳細度を上げずコンポーネントに集約
- [[デザインシステムのためのカラーパレットの作成：改訂版 要約|カラーパレットの作成：改訂版（imperavi）]] — 透明度ベースの Color Builder で17値を自動生成。鏡映し命名でダークテーマ対応を自動化
- [[デザイントークン  プロダクト  SmartHR Design System 要約|SmartHR のデザイントークン]] — プリミティブ/セマンティクスの2層構成の公式リファレンス
- [[デザイントークンって何？｜seya｜note 要約|デザイントークンって何？（seya）]] — W3C 定義ベースの日本語入門。「方法論であってただの変数化ではない」
- [[デザイントークンに詳しくなれるスクラップ 要約|デザイントークンに詳しくなれるスクラップ]] — DTCG 仕様と validator、「ユースケース・カバレッジ」概念によるタクソノミー構築
- [[トークンベースのUIアーキテクチャを設計する 要約|トークンベースのUIアーキテクチャ（martinfowler.com）]] — option/decision/component 3層、Git を SSoT とする自動配信パイプライン。小規模には過剰
- [[初公開！「家計簿プリカ B-43」のデザイントークンの設計 - inSmartBank 要約|B/43 のトークン設計]] — Reference/System 2分類、Style Dictionary で5プラットフォーム向けビルド。課題はキャッチアップコスト
