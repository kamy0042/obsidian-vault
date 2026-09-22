---
Created: 2021-12-02T21:48:00
URL: https://speakerdeck.com/tak_iwamoto/storesyu-yue-wozhi-eruhurontoendoji-shu
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[Attachments/無題のフォルダ/slide_0 2.jpg]]

## Transcript

1.  organisms: atoms, moleculesに副作用が入ったモノ(context, 状態管理ライブラリのstate, APIリクエストなど) • templates: Next.jsの/pagesに配置するコンポーネント • hooks: APIリクエストやロジックなどのcustom hooks • contexts: ReactのContext APIを使用したグローバルな値 • interfaces: 共通で使用する型 ├── atoms ├── molecules ├── organisms ├── templates ├── hooks ├── contexts ├── interfaces
    ### [\#heytalk 現在のディレクトリ構成 • atoms: HTML標準のタグに固有のスタイルを持つ • molecules: アプリケーション固有の型、複数atomsを持つ •](https://files.speakerdeck.com/presentations/88efc25e742f4eb986a95fd67dfa3db7/slide_11.jpg)
2.  frequently updating data, and you don’t need to pre-render the data, you can fetch the data on the client side. An example of this is user-speciﬁc data. https://nextjs.org/docs/basic-features/data-fetching
    ### [\#heytalk アンチパターン: 認証情報が必要なページでSSRする リクエスト時に明示的に認証情報を付与 する必要がある。 If your page contains](https://files.speakerdeck.com/presentations/88efc25e742f4eb986a95fd67dfa3db7/slide_17.jpg)
3.  approach works well for user dashboard pages, for example. Because a dashboard is a private, user-speciﬁc page, SEO is not relevant and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching. https://nextjs.org/docs/basic-features/data-fetching • CSR: 予約時の入力画面など • SSR: オーナー様のサービス紹介 画面など
    ### [\#heytalk 現在のデータ取得のポリシー （管理画面） （サービス画面） CSR CSR + SSR This](https://files.speakerdeck.com/presentations/88efc25e742f4eb986a95fd67dfa3db7/slide_18.jpg)