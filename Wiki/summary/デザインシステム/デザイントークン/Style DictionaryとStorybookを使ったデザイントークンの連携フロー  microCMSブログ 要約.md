---
type: summary
updated: 2026-07-26
---

# Style DictionaryとStorybookを使ったデザイントークンの連携フロー  microCMSブログ 要約

ソース: [[Style DictionaryとStorybookを使ったデザイントークンの連携フロー  microCMSブログ]]

microCMS の UI リニューアルに伴い、デザイナー組織の誕生を機にエンジニア・デザイナー間のトークン連携フローを整備した事例。
Figma 上のデザイントークンは Figma Tokens プラグインで一元管理して JSON 出力し、Style Dictionary で CSS カスタムプロパティ（variables.css）へビルドする。
Figma Tokens の GitHub 連携でデザイナーがトークン差分を Pull Request として送れるようにし、デザイナー主導のトークン管理と変更コストの最小化を実現した。
Storybook は Netlify にホスティングし PR ごとにプレビュー URL を発行するため、開発サーバーを立てずにトークン変更をレビューできる。
発展として hygen による対話式コンポーネント生成（`npm run create:ui`）を導入し、フロントエンド以外のメンバーでも Storybook 構成ファイル込みの新規コンポーネントを作れるようにしている。
