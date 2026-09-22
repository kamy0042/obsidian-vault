---
Created: 2025-02-02T21:55:00
URL: https://blog.uhy.ooo/entry/2022-10-01/tailwind/#fn-2
Tags: [topic/技術/CSS]
---
![[blog-logo-256 1.png]]

- [Tailwind の命名を先送りできる嬉しさ](https://zenn.dev/yahsan2/articles/c899978c83243c)

### JavaScriptがない場合について

上の話もそうですが、UIライブラリなどを用いてコンポーネント化できることが前提の議論となっています。

そうなると、ちょっとしたLPを作成する場合や完全なMPAの場合など、そもそもUIライブラリを使わないケースでTailwindの利点が出るのではないかという意見もありました。

このケースはこの記事の考慮から漏れていたので、普通にそうだと思いました。グローバルにクラス名の管理をするのが辛いのは歴史が証明しており、JavaScriptを介さない方法の中ではTailwindが有力な選択肢となると思います。Vanilla-extractとも差別化できています。