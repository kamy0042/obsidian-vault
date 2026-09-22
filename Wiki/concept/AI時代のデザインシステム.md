---
type: concept
updated: 2026-08-03
---

# AI時代のデザインシステム

## 概要

生成AIが「一貫したUIを速く大量に作る」というデザインシステムの中核価値を自動化しつつあることで、デザインシステムとデザイナーの価値の所在がどこへ移るかという論点。

## ボトルネックの移動（制約理論からの分析)

以下すべて出典: [[デザインシステムはボトルネックではない  アンドレアス・ヨハンソン著  2026年2月  デザインシステムズ・コレクティブ]]

- Goldratt の制約理論（Theory of Constraints）: 「**制約以外の場所での改善はすべて幻想**」。かつての制約は「一貫したUIをいかに速くスケールして生産するか」であり、デザインシステムはその論理的な解だった
- Malewicz の観察: 「AIは実際にデザインする人を置き換えたのではなく、**デザインシステムが作られた目的の大部分を置き換えた**」（一貫したUI生成、コンポーネントライブラリ維持、視覚的整合の強制）。彼は「Design systems are dead now」とまで題するが、Johansson は「そこまでは言わない。ただしデザインシステムは常に**橋であって目的地ではなかった**」とする
- ボトルネックはフィードバックループと意思決定品質へ移動した。AIが出力を瞬時にするなら、組織が高速なテスト・学習・軌道修正を支えられない限り、その速度は「より多くの無駄をより速く生産する」だけ（untested designs = WIP）
- デザイナーの役割も移動する: webmaster（何でも1人）→ 職能細分化 → product designer への統合、の次は戦略・リサーチ・ファシリテーション・AI活用まで含む統合。価値の測定は output（画面数）から outcome（ユーザー行動の変化、Josh Seiden）へ
- 組織側の含意: stream-aligned なクロスファンクショナルチーム（Team Topologies）でハンドオーバーを減らし、フィードバックループを高速化することが、AIツール導入より重要

## 「AI時代の恐竜」

- 「AIがコーディングに革命をもたらしている一方で、デザインシステムは過去にとらわれたままで、私たちを前進させるのではなく停滞させています」。次の挑戦は「AIの力を活用して、必要なときに一貫性を保ちながら、真にダイナミックでインテリジェントで適応性のあるデザインを作成する」こと（出典: [[翻訳記事：デザインシステムの破られた約束；なぜルールに従っても優れた製品が得られないのに従うのか｜Nobuya Sato]] = [[Itai Vonshak]]）

## AIエージェントは契約を要求する

以下すべて出典: [[Your design system has opinions. They’re just not being enforced]]（[[Murphy Trueman]]）

- デザインシステムの利用者が人間・AIエージェント・その両方になると、ドキュメントを「読んで解釈してもらう」運用は成立しない。「人間は少し間違った実装でも目を細めて『何とか動かす』ことができる。**エージェントにはできない。彼らは明確な構造を必要とする**」。契約（構造・制約）を機械的に強制できないデザインシステムはインフラとして扱えない。関連: [[デザインシステムの強制と例外]]
- 「AIはデザインシステムを増幅する。システムが堅牢ならAIはそれをより強力にし、不整合ならその不整合を無視できないものにする」。validation が前者を保証する手段
- エージェント対応の3つのシグナル:
  - **プロトコルレベル — Google A2UI**: UIを実行可能コードではなく「メッセージ」として扱う。レンダリングはクライアントが所有し、エージェントはクライアントがサポートするカタログからしかコンポーネントを要求できない。メッセージがスキーマ検証を通らなければ拒否される。「信頼境界はスキーマとカタログで解決する」。エージェントUIを作らなくても翻訳可能な3原則: ①コンポーネントカタログを公開する（unknown component をハードエラーに）②構成（親子関係）を提案ではなく契約としてモデル化する ③構造と実装を分離する
  - **ツーリングレベル — [[Storybook]] MCP server**: AIツールに構造化されたコンポーネントコンテキストを提供し、インタラクション/アクセシビリティテストを回す自律修正ループを可能にする。AIがUIの大部分を書くようになれば「nice to have」ではなくなる
  - **デザイン資産のデータ化 — Nathan Curtis のコンポーネント定義 / TJ Pitre の FigmaLint**: コードが書かれる前のデザイン層で検証する。エラーは下流に流れるほど複合する

## 構造化契約の実装第一号 — Meta Astryx

以下すべて出典: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]]

- Meta の [[Astryx]] は、`npx astryx manifest --json` で CLI の全コマンド・引数・フラグ・応答タイプの機械可読契約を返し、[[Model Context Protocol]] サーバーを同梱する初のデザインシステム。他の主要 DS（shadcn/ui、MUI）に比肩する機能はない
- 幻覚の機序: 構造化仕様がないエージェントは人間向けドキュメントとトレーニングデータのパターンマッチングに頼り、「もっともらしく見えるが存在しない props」を参照するコンポーネント呼び出しを生成する。Stack Overflow 2025 開発者調査（回答49,000人超）では66%が「ほぼ正しいが、完全には正しくない」を AI ツール最大の不満に挙げた
- JSON マニフェストはこの「惜しい問題」を、バックエンドが OpenAPI で10年前に解いた**構造化仕様の問題に変換する**。エージェントは1ペイロードで CLI サーフェス全体を把握でき、推測する API と実際の API のギャップが消える
- 8年間・13,000超の社内アプリで検証済みの本番 DS での実証であり、同じ構造化マニフェストのパターンは「AI エージェントへの公開にカスタム統合が必要な」エンタープライズツール全般に応用可能
- ただし契約にも未文書化の限界がある: GitHub リポジトリ90+ vs 公式サイト150+ というコンポーネント数の矛盾は、社内に実在するが未文書化のコンポーネントを、構造化ドキュメントから正確なコードを生成する AI エージェントがまだ確実に使えないことを意味する（機能の制限ではなくドキュメントの欠落）。関連: 後述の「どう公正に保つか」問題

## 機械可読プロダクトインフラへ — 契約・意図・レジストリ

- 機械可読 DS の4要件: ①セマンティックトークン層 ②構造化された決定文書 ③明示的な使用制約 ④バージョン付きクエリ可能 API。design-to-code ドリフトの構造的原因は人間の解釈層が累積する「翻訳ロス」であり、AI 下では機械速度で複利化する。AI クエリに耐える安定範囲の定義や AI 生成物の検証といった「AI 消費者向けのガバナンス層」も新たに必要になる（出典: [[Design Systems as Machine-Readable Product Infrastructure]]）
- コンポーネントライブラリの「レジストリ」化: 各コンポーネントが目的・意図・必要データ・使用禁止条件を含む判断単位になる「Design System 2.0」論。トークンも `risk.high` `confidence.low` のような状態の意味論へ拡張され、パターンの整理軸は機能別から意図別（緊急購入・ギフト等）へ移る（出典: [[Design Systems Beyond Components]]）
- トークンへの意図メタデータ: Manychat は DTCG 形式に `$intent` ブロック（useFor / doNotUseFor / pairsWith）を追加し、3プラットフォームに乖離した DS を AI 駆動の「Manyfest DS」として10営業日で再構築した。AI は欠落を直感ではなくパターンで埋めるため、構造とセマンティクスの明確さが従来以上に効く。ただし10日は数ヶ月分の従来型構築の蓄積が前提——「AI に決めさせず、加速させる」（出典: [[How to Build an Agentic Design System People (and Agents) Will Actually Use (Part 1)]]）
- トークンはエージェントが読む「API の型システム＝契約」でもある。マルチエージェント協調（A2A）では共有真実源になる（出典: [[The Token Structure That Survives Five Products (Google Uses It Too)]]。プロトコルの詳細は [[Model Context Protocol]]）
- props は命名の統制が構造的に不可能（88コンポーネント・200超 props で type/variant、outline/outlined/bordered、sm/small/s 等10件のドリフト実測）であり、機械可読な prop map を読むエージェントが唯一の橋になる（出典: [[Building language for design systems]]）
- 振る舞いの JSON 契約「Component Contracts」: Aparat（イラン最大の動画基盤）は視覚を除外して props・状態機械・トリガー・a11y を JSON 契約化し、エージェントマニフェスト同梱で AI ハンドオフに供給。仕様の曖昧さ70%減、スループット 0.8→9.6 SP/D、ボトルネックが開発からデザイン側へ反転した。「Figma Make と素の Claude の品質差はモデルではなくコンテキストの差」（出典: [[Component Contracts The missing piece for AI-era Design System handoff]]）
- ビジョンとしての agentic DS: 受動的な「ファイリングキャビネット」から、自然言語の意図記述に文脈を理解した提案を返し、フィードバックで学習し続ける存在へ。DS の価値は元々コンポーネント数ではなく蓄積された知識と決定にあった、という史観（出典: [[Design Systems Are About to Start Thinking]]）

## 2026年の現在地 — インフラは来たが、チームが来ていない

以下すべて出典: [[Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t.]]（Oleksandr Konovalov、2026-04）

- 企業チームのうち自社DSを「非常に安定している」と評価するのは**わずか8%**、ほぼ半数が深刻な不安定性を報告。「私たちは多くのインフラを構築したが、それを維持管理しなかった」——2026年の問題は「どう構築するか」ではなく「**どう公正（honest）に保つか**」。リリース日のあるプロジェクト扱いのままでは、メタデータが6ヶ月古いだけでエージェントが存在しないボタンを幻覚する
- **MCP がハンドオフを恒久的に変えた**: 運用パラダイムは「デザイン→開発者への引き渡し」から「**デザイン→エージェントのオーケストレーション**」へ。Figma ファイルは成果物ではなく**クエリ可能なデータベース**になり（Dev Mode の Model Context Protocol 統合）、Cursor / Windsurf / Claude Code が API 経由で直接消費して、実装エラーの大半が発生していた「人間の翻訳レイヤー」を迂回する。ただし「**煩雑なDSへのMCPアクセスは開発を速くしない。大規模な幻覚をより速くするだけ**」
- **セマンティック命名はベストプラクティスから必須要件へ**: `blue-500` や `header-large` はエージェントに行動のコンテキストを与えず推測を強いる。`{category}-{role}-{variant}-{state}` の4部構成（例 `color-surface-danger-hover`）なら人間の説明なしに適用範囲を理解できる。「もはや人間向けに名前を付けるのではなく、その名前に基づいて推論する機械向けに名前を付ける。**命名そのものが振る舞いの仕様となる**」（詳細は [[デザイントークンの命名]]）
- **GenUI のアーキテクチャ転換**: 2025年初頭の「LLM が生の React/HTML 文字列を生成」は脆弱でインジェクションに弱かった。2026年は Zod スキーマで LLM を制約し、**事前承認されたDSコンポーネントに厳密にマッピングされる構造化 JSON ツリー**だけを出力させる。「デザインシステムは AI 生成における**制約層**となる。UI を記述するだけでなく、**AI が構築できるものを制限する**」——DSアーキテクトの役割は「手動で設計することのないインターフェースを生成する AI のための**文法ルール**を作成する」ことへ。ただし前提（クリーンで意味構造化された MCP 公開済みDS）を満たす組織は少なく、「ほとんどの組織はまだ GenUI を使う権利を得ていない」
- 規制・コスト面: DTCG 仕様の安定版公開（[[DTCG]]）と EAA 施行（[[デザインシステムとアクセシビリティ]]）が同時に到来し、さらに AI 機能の従量課金による「**トークン税**」（Supernova の AI プロトタイピングは複雑なビルド1回で最大130クレジット）が「座席数＋コンピューティング費用」時代の利用ガバナンスを要求する
- 総括: 「現在、あなたのデザインシステムは、AI の動作を制約し、法的アクセシビリティ要件を満たし、標準化された仕様を通じてツール間で同期する、**機械可読な API** となっている。人間のデザイナーも利用するが、もはや構造化における主要な対象ではない」

## 供給側の活用 — DS 制作作業への AI 適用（Big Medium）

以下すべて出典: [[AI and Design Systems  Brad Frost]]（2024-03、Big Medium の Kevin Coyle らの実践）

- 「AI は**賢いがときどき未熟なジュニア開発者**」——人間の開発者と同様にレビューと修正依頼を前提に使う。6つの適用領域:
  1. **コンポーネントコード生成**: DS のコードベース・規約・構文・ドキュメントで LLM を訓練すると「ステロイドを打ったボイラープレート生成器」になる。**手書き比で40〜90%高速**と見積もる。汎用 AI コードジェネレータには懐疑的——特定の技術・構文で出力するため、エンタープライズが苦労して築いた規約と非互換。「**組織固有の規約に密着した仕立て**」を選ぶ
  2. **フレームワーク間の翻訳**: LitElement の Web Component を数打鍵で React 化する等、技術スタック移行の労力とエラーを劇的に削減。「write once, deploy anywhere」に近づき、Prettier が Spaces vs Tabs 聖戦を武装解除したように、**実装詳細（スタック・規約・構文）の重要度を下げる**。`<a>` → Next.js `<Link>` のようなプラットフォーム固有慣習への適応・ラッパー・codemod・糊コードにも
  3. **ユニットテスト生成**: 擬似コードのようなプロンプト（「アコーディオンをクリック。開いた？ もう一度。閉じた？」）から実テストコードへ。締切に追われるとテストが先送りされる問題への保険——「もうユニットテストがない言い訳はできない」
  4. **アクセシビリティレビュー**: pass/fail のチェックリストを超えて、**組織固有の a11y ガイドラインを統合**し、ベストプラクティスの文脈と枠組みを添えて返す——チームの a11y 理解を育てる副次効果
  5. **ドキュメント執筆**: 「誰も書きたがらず、誰も読みたがらないが、成功に不可欠」という文書のパラドックスに対し、デザインファイル・コード・リサーチから人間可読の文書を抽出。ワークフローに配線すれば**文書が現実と乖離しない**
  6. **ドキュメント閲覧（バベルフィッシュ）**: 職能・スキルレベル・文脈・母語に合わせて文書が個人向けに変形する——ジュニアデザイナーとシニア、利用側 FE とデザイナーでは必要な説明が違う。「共有語彙の実現」という DS の宿願への一手（詳細は [[デザインシステムのドキュメンテーション]]）
- 運用6原則: **Respect**（機械に単調作業を、人間に充実した仕事を）／**組織固有の解**（文化・技術・好みの内在化が前提）／**セキュリティとプライバシー**（知財を ChatGPT に投げ込むよりオンプレミス優先）／**入出力の人間所有**（訓練素材と出力物への完全なコントロール）／**予測可能性と信頼性**（重要インフラに近づける最低条件）／**置換ではなく強化**（苦労して得た資産・アーキテクチャの「木目に沿って」働かせる）

## AI は「第3のオーディエンス」— 記憶・文書化・Skill

- デザイナー・開発者に続く第3のオーディエンスとして AI が加わった。構造化知識がなければ AI は不整合を量産するだけで、成熟した DS こそが AI の信頼できる出力の前提になる（出典: [[Building a Design System That Scales Creating Consistency for Humans and AI]]）
- AI の課題は理解ではなく「記憶」（セッションごとに再教育が要る）。Claude Skill を「システムの記憶層」とし、スタイルガイド→コンポーネントライブラリ→Skill→npm パッケージの4層で構築したソロ DesignOps の実践では、生成→検証→修正→永続化のループが agentic layer 構築の本体で、デザイナーの役割は「作る人」から「オーケストレーター」へ転換し、品質ゲートが人からシステムへ移った（出典: [[How I turned a static design system into an AI teammate]]）
- Skill 化の技法: SKILL.md＋参照ファイルの progressive disclosure（メタデータ→本文→参照の段階ロード）でトークン効率を確保し、500行を超えたら関心ごとに分割する。description のキーワード設計がトリガー精度を決める。「AI に自分をインタビューさせて」暗黙の設計判断を文書化する手法も（出典: [[Design Systems in 2026 Turn Your System into a Claude Skill]]）
- ドキュメントの優先順位は AI の失敗が教える: LLM は「見つからないと発明する」ため、実 UI を作らせて失敗した箇所（グローバルパターンは成功し、ドロワーやステータス等プロダクト固有パターンで失敗）がそのまま文書化の優先順位マップになる。ただし古いトークン等の基盤問題は AI レイヤーより先に解決する（出典: [[How the errors are guiding the Harness Design System]]）
- 「AI を意識した文書化」: AI が DS の知識を理解すると組織固有ルールで動く（Grammarly の Figma リンター等）。AI はデザイナーとエンジニアの「共有中間言語」になる（出典: [[Design Systems Are No Longer Component Libraries. They Are Strategic Business Infrastructure.]]）
- AI は弱いシステムの欠陥を可視化する装置でもある。生産が速くなるほど強いルールが必要になり（出典: [[Design Systems Are Not Just for Products Anymore]]）、既存システムの再建では Codex＋Figma MCP による監査（同一プリミティブでも役割別に別トークンへマッピングする文脈依存の整理）が実用されている（出典: [[The Aspirational Bloat Trap Why Your Design System is Failing]]）
- 需要側の組織変化（デザイナーの直接 PR、ハンドオフ工程の消滅、Atlassian の AI プロトタイピング実績）は [[デザインエンジニアリング]] と [[Atlassian Design System]] を参照

## 契約の実行可能化 — エピステミックな圧力

- 「エージェントがデザインシステムにかける圧力は美的なものではなく**認識論的（epistemic）**なもの」——彼らは「私たちが何を・なぜ決めたか」を解釈不要の形式で必要とする。経験豊富なデザイナーのように視覚的整合から意図を推測できないため、意思決定はルール・制約・検証可能な契約としてエンコードされ、**実行可能（executable）**にならなければならない（出典: [[Design systems are contracts, not libraries]]。契約論の本体は [[宣言的デザインシステム]]、強制の実装は [[デザインシステムの強制と例外]]）
- 同じ含意の簡潔な表現:「**あなたのドキュメントは AI を訓練できる程度に良質であるべき**」（出典: [[Design System Wisdom 2023]]）

## 実行可能な制約システムの個人実践 — compound design system

以下すべて出典: [[Building a Design System for the AI Era]]（Aaron、インタラクションデザイン出身のインディー開発者）

- AI にデザインシステムを**制約として与えて** production 水準のデザイン案を生成させる「compound design system」の構築記録。Google が2026年3月末に公開した機械可読仕様プロトコル **DESIGN.md** を起点に、制約を「**デザイントークン（視覚的原子）・デザイン言語（判断）・デザインパターン（シナリオ雛形）**」の3層に整理した
- DESIGN.md を「反復可能なルールモデル」として扱い、**過学習/学習不足**の診断で v0.9 まで反復して一貫スタイルの生成を実現。曖昧な言語指定は汎用テンプレへ回帰する「AI look」を招くため、制約の具体度が品質を決める
- 検証ツールの選定では Stitch（Google Labs。Google 色が混入する）と Claude Design（内部補正がかかり評価不能）を退け、素の挙動を確認できる Claude Code を採用した
- 結論: AI 時代のデザインシステムは「**実行可能な制約システム**」であり、人とモデルの協働問題を解くもの。前述の GenUI「制約層」論・DESIGN.md 公開の動きを個人開発者が実地で裏付けた事例

## 成果物はコンポーネントから「チェック（evals）」へ

- CHI 2026 研究: ライブコンポーネントレジストリを参照させても AI の DS 準拠率は約95%が上限（スタイルガイドのプロンプト貼付はそれ以下）。機械速度では5%のドリフトが自己複製する——1つのミスが40画面に増殖する（出典: [[Your design system’s real job in 2026 is catching the AI.]]）
- 処方箋は [[Murphy Trueman]] の validation 論の具体化: 機械的チェック（props 実在・トークン解決・実コンポーネント使用）と判断チェック（LLM-as-a-judge＋ルーブリック）を CI で実行する。「ルーブリックはチェックリストの服を着たデザイン判断」であり、判断を明文化できる DS デザイナーの価値はむしろ上がる（出典: 同上）
- 市場の動き: 2026-03 に OpenAI が evals ツール promptfoo を買収、Google Labs は機械可読仕様 DESIGN.md を OSS 公開（出典: [[Your design system’s real job in 2026 is catching the AI.]]）
- ブランド面でも agentic AI を CI/CD に組み込む「デプロイ前ブランド監査」が構想され、漸進的なブランドドリフトを機械的に検出する（出典: [[Design Systems as Brand Ops Tokens, AI and Stopping Brand Drift]]。ブランド運用論は [[ブランドとデザインシステム]]）

## 現場の温度感 — Adobe Spectrum

- Spectrum 2 を率いる Shawn Cheris の展望: チャットのような馴染みある形式の先に「**タスク実行時に必要なインターフェイスがリアルタイムで生成される**」動的 UI の可能性がある一方、「AI のための理想的なインターフェイスはまだ発明されていない。仮に発明されていても、人がまだついて行けていない」——理解の醸成と共通言語の形成には時間がかかる（出典: [[10年ぶりのデザイン言語刷新に乗り出すアドビ　担当者に聞く「Spectrum 2」誕生の経緯と目的｜Real Sound｜リアルサウンド テック]]）

- Spectrum はドキュメントを読み込んで質問に答える **AI ヘルプボット**を構築中（サポートを人力でスケールできないため）。ただし Garth Braithwaite の評価は慎重: AI はアイデア出しとプロトタイピングの道具であり（デザイナーが AI で Figma プラグインを自作する等）、プロダクション品質ではない。「自分のコンポーネントライブラリの制約の中で UI を組ませる」方向はまだ そこまで到達していない——「遊ぶには良い場所」（出典: [[Garth Braithwaite on Design Tokens, Governance, and Scaling Spectrum at Adobe  Knapsack]]）。詳細は [[Adobe Spectrum]]
- 国内の実務では「**AI-Ready**」が合言葉になりつつある: Gaudiy は「AI がアクセス可能な状態で情報を整備することは、これからの情報設計における前提条件」とし、ガイドラインの言語化・構造化を AI-Ready への投資と位置付ける。LLM によるガイドライン叩き台の生成も常用（出典: [[「専任ゼロ」でも育て続ける、Gaudiyのデザインシステム運用｜TORAJIRO]]）。KARTE も「AI 活用を深めるためにもドキュメントが重要」と GitBook 移行の効果を語る（出典: [[デザインシステム疲れからの再出発：持続可能な運用への実践的アプローチ｜ishigakijunichi]]）

## 登場するソース

[[10年ぶりのデザイン言語刷新に乗り出すアドビ　担当者に聞く「Spectrum 2」誕生の経緯と目的｜Real Sound｜リアルサウンド テック]], [[AI and Design Systems  Brad Frost]], [[Building a Design System for the AI Era]], [[Building a Design System That Scales Creating Consistency for Humans and AI]], [[Building language for design systems]], [[Component Contracts The missing piece for AI-era Design System handoff]], [[Design System Wisdom 2023]], [[Design Systems Are About to Start Thinking]], [[Design Systems Are No Longer Component Libraries. They Are Strategic Business Infrastructure.]], [[Design Systems Are Not Just for Products Anymore]], [[Design Systems as Brand Ops Tokens, AI and Stopping Brand Drift]], [[Design Systems as Machine-Readable Product Infrastructure]], [[Design Systems Beyond Components]], [[Design Systems in 2026 Turn Your System into a Claude Skill]], [[Design Systems in April 2026 The Infrastructure Is Here. Most Teams Still Aren’t.]], [[Design systems are contracts, not libraries]], [[Garth Braithwaite on Design Tokens, Governance, and Scaling Spectrum at Adobe  Knapsack]], [[How I turned a static design system into an AI teammate]], [[How the errors are guiding the Harness Design System]], [[How to Build an Agentic Design System People (and Agents) Will Actually Use (Part 1)]], [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props]], [[The Aspirational Bloat Trap Why Your Design System is Failing]], [[The Token Structure That Survives Five Products (Google Uses It Too)]], [[Your design system has opinions. They’re just not being enforced]], [[Your design system’s real job in 2026 is catching the AI.]], [[「専任ゼロ」でも育て続ける、Gaudiyのデザインシステム運用｜TORAJIRO]], [[デザインシステムはボトルネックではない  アンドレアス・ヨハンソン著  2026年2月  デザインシステムズ・コレクティブ]], [[デザインシステム疲れからの再出発：持続可能な運用への実践的アプローチ｜ishigakijunichi]], [[翻訳記事：デザインシステムの破られた約束；なぜルールに従っても優れた製品が得られないのに従うのか｜Nobuya Sato]]

## 関連ページ

[[デザインシステム批判論]], [[デザインシステムの強制と例外]], [[デザインシステムと組織構造]], [[宣言的デザインシステム]], [[デザイントークンの命名]], [[セマンティックトークン]], [[DTCG]], [[デザインシステムとアクセシビリティ]], [[デザインシステムのドキュメンテーション]], [[ブランドとデザインシステム]], [[デザインエンジニアリング]], [[Itai Vonshak]], [[Adobe Spectrum]], [[Astryx]], [[Atlassian Design System]], [[Model Context Protocol]], [[Murphy Trueman]]
