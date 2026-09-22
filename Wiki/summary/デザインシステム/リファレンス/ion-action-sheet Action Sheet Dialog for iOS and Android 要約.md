---
type: summary
updated: 2026-07-26
---

# ion-action-sheet Action Sheet Dialog for iOS and Android 要約

ソース: [[ion-action-sheet Action Sheet Dialog for iOS and Android]]

Ionic Framework の Action Sheet コンポーネント `ion-action-sheet` の公式 API リファレンス（日本語版）のクリップ。
アクセシビリティ節では role として `dialog` が設定されること、ARIA 仕様に合わせて `aria-label` か `aria-labelledby` の設定が必須であること、`header` プロパティを定義すれば `aria-labelledby` が自動設定されるため強く推奨されることを解説する。
アイコンのみのボタンには `htmlAttributes` 経由で `aria-label` を割り当てる必要があるなど、スクリーンリーダー対応の具体的な作法を Angular / JavaScript / React / Vue のコード例付きで示す。
API 仕様としては ActionSheetButton / ActionSheetOptions のインターフェース、animated・backdropDismiss・mode（ios/md）等のプロパティ、present/dismiss 系のイベントとメソッドを網羅する。
スタイリングは CSS Shadow Parts ではなく `--background` や `--button-color` など20超の CSS カスタムプロパティで行う設計になっており、プラットフォーム別スタイル切替を持つコンポーネント API 設計の参考例として読める。
