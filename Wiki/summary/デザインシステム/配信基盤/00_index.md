---
type: summary
updated: 2026-07-26
---

# 配信基盤 目次

`Wiki/summary/デザインシステム/配信基盤/` の要約ページ目次。要約ページの増減に合わせて機械的に再生成する。現在 24件。

- [[AWS アーキテクトがはじめて Google Cloud で静的 Web ページを配信した話 - G-gen Tech Blog 要約|AWS 経験者の Google Cloud 静的配信]] — Cloud Storage のオリジン保護不可が判明し Cloud Run 構成に到達
- [[CloudFront + S3 + CloudFront Functions で BASIC 認証をかける 要約|CloudFront Functions で BASIC 認証]] — Lambda@Edge でなく軽量な Functions で実現。BASE64 は事前エンコードが要点
- [[CloudFront+S3構成だった自分のサイトをCloudflare+R2に移行した - Lambdaカクテル 要約|Cloudflare+R2 への移行記]] — Worker＋R2 構成への移行。実は ALB 不要だったというオチ
- [[CloudFrontとS3で作成する静的サイト構成の私的まとめ  DevelopersIO 要約|CloudFront+S3 の2構成比較]] — 静的ホスティング vs REST API＋OAI。HTTPS 標準の現在は後者が基本
- [[d.tsをどうつくるか - まさたか日記 要約|d.ts をどうつくるか]] — index.ts + declaration: true で自動生成し types で指す。手書き不要
- [[GitHub Packages の npm レジストリを使って、社内 org 用のプライベートパッケージを公開する手順とインストールする手順 要約|GitHub Packages 社内公開手順（マネーフォワード）]] — .npmrc をパッケージ直下に置き認証経路を NPM_TOKEN に共通化
- [[Github PackagesでPrivateなnpmパッケージを公開する  Sqripts 要約|GitHub Packages で Private 公開（Sqripts）]] — Vite ライブラリモード + vite-plugin-dts、リリース作成トリガーで publish 自動化
- [[GitHub Packagesを使用してprivateなnpmパッケージとして公開する 要約|GitHub Packages 備忘録（Zenn）]] — 落とし穴はインストール許可リポジトリの明示的追加
- [[MUIを使う際に、ViteのSSRの場合で発生したエラーに対処した設定 vite - Qiita 要約|MUI × Vite SSR エラー対処]] — ESM/CJS 互換問題を ssr.noExternal への列挙で解決
- [[Next.js × Ant Designを使ったら、「Cannot use import statement outside a module」で怒られた件 React - Qiita 要約|Next.js × Ant Design エラー対処]] — transpilePackages に antd + rc 系を列挙して解決
- [[package.jsonのexportsフィールドについて 要約|package.json の exports フィールド]] — exports はパッケージのインターフェース定義。Conditional exports で ESM/CJS を吸収
- [[Reactで社内向けUIライブラリ開発・ビルド・公開・布教入門【2024年】 1 要約|React 社内向け UI ライブラリ入門 2024]] — CJS/ESM ハイブリッド配布 + Prefix 付き Tailwind CSS 同梱 + release-please 自動化
- [[Reactのコンポーネントライブラリの開発では、ライブラリの依存関係の指定に気を付けなければいけないという話 Node.js - Qiita 要約|React ライブラリの依存関係指定]] — react を dependencies に入れると二重コピーで Invalid hook call。peerDependencies が正解
- [[S3 バケットとローカルのディレクトリを同期する AWS CLI の aws s3 sync コマンドの初歩的な使い方のメモ。 - 全力で怠けたい 要約|aws s3 sync 使い方メモ]] — 3方向同期と --dryrun / --delete / --exclude の基本
- [[S3を使った静的サイト構築のあるある - Qiita 要約|S3 静的サイトのあるある]] — Basic認証代替のIP制限ポリシー、RoutingRules での404出し分け
- [[StandAloneで稼働しているUIから一部だけライブラリとしてPublishした話 feat. rollup JavaScript - Qiita 要約|既存 UI の一部をライブラリ化（rollup）]] — rollup バンドル配布に改善。React は external 必須、独立ディレクトリ＋別 package.json
- [[TypeScript で npm パッケージを作る - 30歳からのプログラミング 要約|TypeScript で npm パッケージを作る]] — declaration・main/types/files・npm pack での動作確認まで通す入門
- [[Viteのライブラリモードでビルドする際、フォーマットごとにディレクトリを分ける vite - Qiita 要約|Vite ライブラリモードのフォーマット別出力]] — preserveModules + lib.fileName '[format]/[name]' が鍵
- [[Viteのライブラリモードを使ってnpmパッケージを作成&公開してみる 要約|Vite ライブラリモードで npm 公開]] — 「vite build && tsc」の順序で型定義を残すのがポイント
- [[コンポーネントを配信するシステムについて構想する 要約|npm 非経由のコンポーネント配信構想]] — 個別ホスティング + エッジ結合 + Qwik ラップで反映コストとフットプリントを最小化する PoC
- [[パッケージはBundleを配布しない · Webフロントエンド パフォーマンス改善ハンドブック 要約|パッケージは Bundle を配布しない]] — bundle 済みのみの配布は依存重複と Tree Shaking 阻害を招く。2種配布で gzip 765kb→681kb
- [[バンドルサイズに優しい tree shakeable なライブラリを作成する 要約|tree shakeable なライブラリ作成]] — sideEffects 列挙と /*#__PURE__*/ コメントで副作用なしを明示
- [[やんないほうがいいかも、GitHub Actions の setup-xxx での依存キャッシュ保存 - 誰かの役に立てばいいブログ 要約|setup-xxx の依存キャッシュ保存の罠]] — キャッシュはブランチごと名前空間で PR 数だけ重複保存。restore/save 分離で main のみ保存が正解
- [[今日から使えるライブラリ製作者のための Rollup 実践教室 JavaScript - Qiita 要約|Rollup 実践教室]] — 環境別プラグイン出し分けと UMD 出力の name / globals 指定
