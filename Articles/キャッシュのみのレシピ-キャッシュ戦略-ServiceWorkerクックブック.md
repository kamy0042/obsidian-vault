---
Updated: 2021-01-08T03:48:00
Created: 2021-01-08T03:48:00
URL: https://serviceworke.rs/strategy-cache-only.html
Tags: [topic/技術/PWA]
---
[Readme](https://serviceworke.rs/strategy-cache-only.html)

[デモ](https://serviceworke.rs/strategy-cache-only_demo.html)

[index.js](https://serviceworke.rs/strategy-cache-only_index_doc.html)

[server.js](https://serviceworke.rs/strategy-cache-only_server_doc.html)

[service-worker.js](https://serviceworke.rs/strategy-cache-only_service-worker_doc.html)

レシピは、`fetch`イベントのキャッシュから常に応答するサービスワーカーを提供します。

## 困難

初心者

## 使用事例

サイトの特定のバージョンには、コンテンツの周囲のシェルなど、変更されない静的コンテンツがあります。

## 解決

Service Workerのインストール中に静的コンテンツを追加し、ネットワークが使用可能かどうかに関係なく、キャッシュを使用してコンテンツを取得します。

## カテゴリー

キャッシング戦略

## 役に立ちましたか？

コメントを残して、このレシピについてどう思うか教えてください！