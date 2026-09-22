---
title: "Meta's Astryx Returns to GitHub Trending: JSON Manifest Stops AI Agents From Hallucinating UI Props"
source: https://www.techtimes.com/articles/320761/20260716/metas-astryx-returns-github-trending-json-manifest-stops-ai-agents-hallucinating-ui-props.htm
author:
  - "[[Joshua Mitchell]]"
published: 2026-07-17
created: 2026-07-22
description: Meta Astryx design system is back on GitHub Trending, with a JSON manifest CLI that gives AI coding agents a machine-readable contract for every command — eliminating the prop hallucination that
tags:
  - topic/デザインシステム/AI活用
---
![アストリックス](https://d.techtimes.com/en/full/469044/astryx.webp?w=836&f=81d04b0759db83ea640d496cc862e001)

Astryx.atmeta.com

MetaのオープンソースReactデザインシステムAstryxが、本日 [GitHubトレンドに再登場しました。](https://trendshift.io/repositories/65106) [7月16日に約943個の新しいスター](https://repositoryradar.dev/repo/facebook/astryx) を獲得し 、公開から約3週間後には合計で約9,000個を超えました。開発者がこのリポジトリに戻ってくる理由は、コンポーネントの数ではありません。CLIが `npx astryx manifest --json` サポートするすべてのコマンド、引数、フラグ、および応答タイプを記述した機械可読なJSONペイロードを出力する単一のCLIコマンド、です。

AI コーディング エージェントに shadcn/ui または MUI を使用して UI を構築するように依頼すると、構造化された仕様がない場合にエージェントが行う動作、つまり人間向けのドキュメントを読み込み、トレーニング データとパターン マッチングを行い、もっともらしく見えるが存在しない props を参照するコンポーネント呼び出しを生成します。49,000人以上の開発者から回答を集めた [Stack Overflow 2025 開発者調査](https://survey.stackoverflow.co/2025/ai) では、回答者の 66% が挙げた AI ツールに対する最大の不満は、「ほぼ正しいが、完全には正しくない」ソリューションであることがわかりました。Astryx の JSON マニフェストは、この惜しい問題を構造化された仕様の問題に変換します。これは、ソフトウェア業界がすでに解決方法を知っている問題です。

他の主要な設計システムにはこれに匹敵するものはなく、この事実が埋めるギャップは、AIコーディングエージェントが主流になって以来、ソフトウェア業界が抱えてきた課題でした。Astryx [のエージェント対応アーキテクチャ](https://www.marktechpost.com/2026/06/27/metas-astryx-brings-a-cli-and-mcp-server-to-an-open-source-react-design-system-agents-can-read/) の意義は、まさにこの構造化された契約を、すべてのMCP互換コーディング環境で同時に利用できるようにすることにあります。

**続きを読む：** [**MetaのAstryxは、AIコーディングエージェントに実際に読み取れるデザインシステムを提供する**](https://www.techtimes.com/articles/319202/20260627/metas-astryx-gives-ai-coding-agents-design-system-they-can-actually-read.htm)

### Meta Productionの8年間の活動が、ついに公開される。

[Astryxは、Metaのエンジニアリング組織内で](https://github.com/facebook/astryx) 8年間かけて成長し、日々それを利用するデザイナー、エンジニア、プロダクトチームによって形作られてきました。社内で最も利用され、最大のデザインシステムとなり、 Facebook、Instagram、Threadsなど [13,000以上の社内アプリケーションを支えています](https://astryx.atmeta.com/blog/introducing-astryx) 。パブリックベータ版は2026年6月18日にリリースされ、MITライセンスのGitHubリポジトリ（facebook/astryx）は6月28日に公開されました。

[スタイリングレイヤーは、Metaが2023年12月にオープンソース化した](https://stylexjs.com/blog/introducing-stylex/) コンパイル時CSSエンジンであるStyleXです 。StyleXはランタイムCSS-in-JSライブラリではありません。ビルド時に実行されるBabelプラグインであり、ソースファイルを走査してすべてのスタイル宣言を抽出し、各固有のプロパティと値のペアを単一のアトミックCSSクラス名に変換し、コードベース全体でこれらの名前をグローバルに重複排除し、コードがブラウザに到達する前に静的スタイルシートを出力します。その結果、CSSバンドルはアプリケーションのサイズに比例して増加しなくなります。Meta [の規模では、StyleXは冗長なスタイル宣言を排除することで、CSSサイズを約80%削減しました](https://engineering.fb.com/2025/11/11/web/stylex-a-styling-library-for-css-at-scale/) 。Figma [やSnowflakeなどの外部企業もStyleXを採用しており](https://engineering.fb.com/2025/11/11/web/stylex-a-styling-library-for-css-at-scale/) 、コンパイル時パイプラインはMeta以外のエンタープライズ規模でも検証済みです。

Astryxでは、テーマはCSSカスタムプロパティトークンの連鎖として実装されています。トークンの値を変更すると、システム内のすべてのコンポーネントが同時にスタイル変更され、コンポーネントのJavaScriptコードを変更する必要はありません。 [リリース時には](https://www.marktechpost.com/2026/06/27/metas-astryx-brings-a-cli-and-mcp-server-to-an-open-source-react-design-system-agents-can-read/) 、default、neutral、daily、butter、chocolate、matcha、stone、gothic、brutalist、y2kの10種類のテーマが同梱されており、すべて完全にカスタマイズ可能です。

システムのコンポーネント数には、文書化された矛盾点があります。GitHubリポジトリのドキュメントには90個以上のReactコンポーネントが記載されているのに対し、 [Metaの公式ドキュメントサイトでは150個以上が記載されています](https://www.marktechpost.com/2026/06/27/metas-astryx-brings-a-cli-and-mcp-server-to-an-open-source-react-design-system-agents-can-read/) 。Metaはこのギャップを直接認めており、追加のコンポーネントは内部的に存在しているものの、外部ユーザー向けにはまだ完全に文書化されていないとのことです。コードベースの約75%はTypeScriptで記述されています。

### JSONマニフェストがAIエージェントに実際にもたらすもの

AstryxにおけるAIコーディングワークフローにとって最も重要な技術的革新は、CLIのmanifestコマンドです。このコマンドを実行すると `npx astryx manifest --json` 、CLIがサポートするすべてのコマンドとその引数、フラグ、フラグタイプ、許容値、デフォルト値、JSON出力を受け入れるかどうか、各コマンドが出力できる応答タイプ識別子を一覧表示する自己記述型のペイロードが返されます。OpenAPIエコシステムを熟知している開発者であれば、このパターンをすぐに理解できるでしょう。これは、バックエンドの世界で10年間使われてきた構造化された契約と同じもので、フロントエンド設計システムのコマンドラインインターフェースに初めて適用されたものです。

CLI は、 `astryx` または省略形として呼び出すことができます `xds` 。 [コマンド `component` は、指定されたコンポーネントの完全なドキュメントを返します。 `template` コマンドは、本番環境で使用可能なページ テンプレートの完全なソースを出力します。 `manifest --json` コマンドは、完全な機械可読契約を返します](https://www.marktechpost.com/2026/06/27/metas-astryx-brings-a-cli-and-mcp-server-to-an-open-source-react-design-system-agents-can-read/) 。CLI は、公開リリースにおいて急速に進歩しており、 [2026 年 7 月時点でバージョン 0.1.6](https://repositoryradar.dev/repo/facebook/astryx) に達しています。公開ライフサイクルはまだ初期段階ですが、活発に開発が進められています。

CLIには、 `--dense` コンポーネントのドキュメントから人間中心の文章を削除し、LLMコンテキストウィンドウに最適化されたトークン効率の良いペイロードを生成するフラグも含まれています。すべてのコンポーネントには、構成ヒントを含むJSDoc注釈が付与されています。これは、コンポーネントがどのように連携するように意図されているかを示す明示的なインラインガイダンスであり、人間の開発者とTypeScript対応環境で動作するAIコーディングエージェントの両方が読み取ることができます。

CLIとは別に、MCPサーバーが同梱されています。このサーバーは、 [2024年11月にAnthropicが発表した](https://www.anthropic.com/news/model-context-protocol) オープンスタンダードであるModel Context Protocolを実装しており、トランスポート層としてJSON-RPC 2.0を使用しています。MCP互換のAIコーディング環境であれば、どれでもAstryxに接続し、新しいプロジェクトのひな形作成、利用可能なコンポーネントの閲覧、テーマの生成、構造化ドキュメントの取得などを、人間の開発者がCLI経由で使用するのと同じAPIを使って行うことができます。

### MCP規格が設計システムにとっての重要事項を変える理由

AstryxがMCPサーバーを出荷した当時、それは既に本来の文脈から逸脱し始めていた標準規格に基づいていた。Anthropicは2024年11月に、AIモデルが外部データソースやツールに構造的にアクセスできるようにする方法としてMCPを導入した。2025年12月までに、 [AnthropicはこのプロトコルをLinux FoundationのAgentic AI Foundationに寄贈し、OpenAIとGoogle DeepMindはともに、エージェントとツールの相互運用性のための共有プロトコルとしてこれを採用した](https://www.techtimes.com/articles/319202/20260627/metas-astryx-gives-ai-coding-agents-design-system-they-can-actually-read.htm) 。

Astryxが直接は明言していないものの、そのアーキテクチャによって可能になるのは、MCP互換のJSONマニフェストインターフェースを公開するツールは、MCP上に構築されたあらゆるエージェント（現在では主要なAIコーディング環境すべてを含む）からアクセス可能になるという点です。Astryxは、8年間の内部検証を経て、本番環境の設計システムにこれを適用するとどうなるかを実証しています。このパターンは応用可能です。現在、AIエージェントにインターフェースを公開するためにカスタム統合作業が必要なエンタープライズツールも、Astryxが提供するものと同じ構造化マニフェストを実装することで、原理的にはAIコーディングエージェントのエコシステム全体と相互運用できるようになります。

### 現在のベータ版における「エージェント対応」の実際のコストとは

Astryxベータ版には特有のトレードオフが存在します。CLIは2026年7月にバージョン0.1.6に到達しましたが、これはAPIが今後変更される可能性があることを意味します。リポジトリ内の2つのパッケージは、まだ安定したnpmリリースでは利用できません。1つは実験的なコンポーネント用のlabパッケージ、もう1つはStorybookとプロジェクトサンドボックスで内部的に使用されるVega/Vega-Liteチャートラッパーです。チャートコンポーネントを必要とするチームは、まだ安定した公開リリースを通じてこれらのコンポーネントにアクセスできません。

より構造的な懸念事項は、メンテナーの集中です。RepositoryRadar [によるリポジトリの分析（2026年7月16日更新）によると、バスファクターは2となっています](https://repositoryradar.dev/repo/facebook/astryx) 。これは、過去6か月間のコミットの半分以上を2人のメンテナーが占めていることを意味します。この指標に基づくと、プロジェクトの短期的なロードマップは少数のコアコントリビューターに依存しており、統合サイクルが長いチームは、サプライチェーンのリスクを慎重に検討する必要があります。

コンポーネント数の不一致について：GitHubリポジトリのコンポーネント数とドキュメントサイトのコンポーネント数の差は、Meta社内に存在するものの、外部チーム向けにまだドキュメント化されていない実際のコンポーネントの存在を反映しています。この差は機能上の制限ではなく、ドキュメントが不足しているため、構造化されたドキュメントに基づいて正確なコードを生成する外部開発者やAIエージェントが、不足しているコンポーネントをまだ確実に使用できないことを意味します。

### AstryxとShadcn/uiおよびMUIの比較

shadcn/ui が最も近い比較対象と言えるでしょう。どちらもコンポーネントの所有権を重視し、CLI のスキャフォールディングと構成可能なプリミティブによってベンダーロックインを回避しています。Astryx [は構造的に 2 つの点で異なります](https://www.marktechpost.com/2026/06/27/metas-astryx-brings-a-cli-and-mcp-server-to-an-open-source-react-design-system-agents-can-read/) 。まず、コンパイル時の Babel プラグインである StyleX をスタイリングエンジンとして提供しており、Tailwind のユーティリティクラスのアプローチとは異なり、実行時のオーバーヘッドなしでアトミックで重複のない CSS を生成します。次に、shadcn/ui にはない JSON マニフェストと MCP サーバーレイヤーを提供しています。

[MUI（Material UI）は、デフォルトでEmotionランタイムCSSエンジンを使用しており、実行時にスタイルを挿入します。また、エージェントツールは一切付属していません](https://www.marktechpost.com/2026/06/27/metas-astryx-brings-a-cli-and-mcp-server-to-an-open-source-react-design-system-agents-can-read/) 。その成熟度とコミュニティ規模は、現在のベータ版のAstryxを大幅に上回っています。大規模な既存エコシステム、包括的な外部ドキュメント、安定した公開APIを必要とするチームは、Astryxのベータ版指定が解除されるまで待つべきです。

評価を希望するチームにとって、インストール手順は簡単です。AstryxにはCSSがプリインストールされているため、ビルドプラグインは不要で、StyleXもユーザーが設定する必要のある依存関係ではありません。最も簡単なセットアップでは、テーマプロバイダーをインポートし、コアパッケージとテーマを1つインストールするだけで、システムはすぐに任意のReactプロジェクトで使用できるようになります。

---

## よくある質問

### Astryxとは何ですか？また、shadcn/uiやMUIとはどのように異なりますか？

AstryxはMetaのオープンソースReactデザインシステムで、Metaのエンジニアリング組織内で8年間開発された後、MITライセンスの下で一般公開されました。shadcn/uiとMUIの主な違いは、エージェントツールレイヤーにあります。自己記述型のJSONマニフェストを出力するCLI（すべてのコマンド、引数、フラグのOpenAPI仕様のように機能します）と、AIコーディングエージェント（Cursor、Claude Code、GitHub Copilotなど）にコンポーネント、テンプレート、テーマへの構造化されたプログラムによるアクセスを提供するModel Context Protocolサーバーです。shadcn/uiとMUIには、これに匹敵するものは含まれていません。また、コンパイル時にCSSを生成するStyleXコンパイル時CSSエンジンも、競合製品との違いです。実行時ではなく、ビルド時にアトミックで重複のない静的CSSを生成します。

### Astryx MCPサーバーは、CursorやClaude CodeのようなAIコーディングエージェントにどのように接続するのですか？

Astryx MCPサーバーは、2024年11月に発表され、2025年12月にLinux Foundationに寄贈されたオープンスタンダードであるモデルコンテキストプロトコル（Model Context Protocol）を実装しており、そのトランスポートとしてJSON-RPC 2.0を使用しています。このプロトコルは、OpenAIやGoogle DeepMindにも採用されています。MCP互換のコーディング環境であれば、追加の統合作業なしにAstryxに接続できます。接続が完了すると、エージェントはプロジェクトのスキャフォールディング、JSDoc構成ヒントを使用した利用可能なコンポーネントの参照、テーマの生成または検証、構造化された形式での完全なCLIマニフェストの取得を行うことができます。このマニフェストは、CLIインターフェースの完全な機械可読契約として機能し、誤ったプロパティ名や利用できないコンポーネント呼び出しを生み出すパターンマッチングによる即興的な処理を排除します。

### AstryxのJSONマニフェストは、UI生成におけるAIエージェントコードの誤作動を減少させるのはなぜですか？

AI コーディング エージェントがツールの API の構造化された仕様を持っていない場合、トレーニング データとのパターン マッチングに頼ることになりますが、これはもっともらしく見えるものの、実際には間違った出力、つまり存在しない props を参照するコンポーネント呼び出しや、公開されていないコンポーネント呼び出しを生成します。Stack [Overflow の 2025 開発者調査](https://survey.stackoverflow.co/2025/ai) では、開発者の 66% が AI に関する最大の不満として「ほぼ正しいが、完全には正しくない」と回答しています。Astryx が配布する JSON マニフェストは、 `npx astryx manifest --json` 構造化されていないドキュメントの問題を構造化された仕様の問題に変換します。エージェントは 1 つのペイロードを読み込むだけで CLI サーフェス全体を把握できるため、エージェントが推測する API と実際の API との間のギャップが解消されます。

### Astryxは、Meta以外のチームでもすぐに利用できる状態になっていますか？

基盤となるエンジニアリングは成熟しており、Facebook、Instagram、Threads を大規模に支える 8 年間の内部開発を経て、StyleX は Figma と Snowflake で外部検証されています。一般公開は新しいため、外部コミュニティ、ドキュメントの完全性、サードパーティ統合のエコシステムはすべて初期段階にあります。ラボ実験コンポーネントパッケージと Vega チャートラッパーの 2 つのパッケージは、まだ安定した npm リリースでは利用できません。CLI は 2026 年 7 月にバージョン 0.1.6 に達し、開発が継続されています。バスファクター分析によると、最近のコミットの大部分は 2 人のメンテナーによって行われています。採用前に大規模な既存コミュニティと安定した公開 API を必要とするチームは、ベータ版指定が解除されるまで待つ必要があります。初期段階のツールに慣れており、貢献する意欲のあるチームは、技術的な基盤がしっかりしていると感じるでしょう。