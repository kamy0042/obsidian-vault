---
type: summary
updated: 2026-07-26
---

# やんないほうがいいかも、GitHub Actions の setup-xxx での依存キャッシュ保存 - 誰かの役に立てばいいブログ 要約

ソース: [[やんないほうがいいかも、GitHub Actions の setup-xxx での依存キャッシュ保存 - 誰かの役に立てばいいブログ]]

GitHub Actions の setup-go 等が提供する cache: true の簡易キャッシュ設定に潜む落とし穴の解説。
キャッシュはブランチごとに名前空間が分かれて保存される仕様のため、多人数開発では PR（ブランチ）の数だけ同一キーのキャッシュが重複保存され、merge queue 併用でさらに2倍になる。
筆者のリポジトリではこれによりキャッシュ容量上限の 10GiB を1日で使い果たしていた。
解決策は簡易設定をやめて actions/cache/restore と actions/cache/save を使い分けること。
restore-keys の prefix マッチで他ブランチ由来のキャッシュも再利用しつつ、保存は main ブランチでのみ行うのが正しい構成だと結論づける。
