---
タグ: []
作成日時: 2024-04-12T17:24:00
URL: https://qiita.com/msk6252/items/c25442a7f5651828fc65
Tags: [topic/デザインシステム/配信基盤]
---
![[https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png]]

Next.js × AntDesignで個人開発を行っています。

AntDesignを導入後、「Cannot use import statement outside a module」というエラーが発生し、解決までに時間を要したので、備忘も兼ねて残しておきます。

殴り書きなので、ご容赦ください。

## 「Cannot use import statement outside a module」とは

直訳では「モジュール環境外ではimportが使えない」という意味になります。

一般的な解決方法は、 に を追加するなどになりますが、Google検索で出てきた内容を一通りやりましたが、解決できませんでした。

## 解決方法

Ant Designの[Github Issue](https://github.com/ant-design/ant-design/issues/46053)が立てられており、に以下を追加する必要があります。

node_modulesに入っているパッケージをトランスパイルし、バンドルする必要があるようです。

そのためには、 を使う必要があります。

```plain text
const nextConfig = {
  reactStrictMode: true,
  // === 下記を追加 ===
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],
}

```