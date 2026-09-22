---
Created: 2021-01-15T20:18:00
URL: https://mizchi.hatenablog.com/entry/2019/04/07/074634
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
## 追記: 前提部分

開発環境を docker-compose で抽象することが最近のベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスだとされているが、フロントエンドをコンテナに突っ込むと無視できないIO[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)が発生する。

とくにwebpackのファイル監視からのビルドで発生する高頻度のIO処理を捌くために、フロントエンドだけはホスト環境に移したほうがいい、という主張。

これについて

[speakerdeck.com](https://speakerdeck.com/odanado/knowledge-of-docker-in-javascript?slide=10)

## 自分の意見

- Web開発者の主要な開発環境である Docker for [Mac](http://d.hatena.ne.jp/keyword/Mac) は I/O がとにかく遅い (3x~5x)
- data volume の driver やら cache を工夫しても遅い
- npm install/webpack は 基本的に I/O ヘヴィー
- とくに大規模開発時の [watch](http://d.hatena.ne.jp/keyword/watch) => build がクリティカル
- webpack.conifg の entry で自分が関与する部分以外[コメントアウト](http://d.hatena.ne.jp/keyword/%A5%B3%A5%E1%A5%F3%A5%C8%A5%A2%A5%A6%A5%C8)して開発してることもある
- フロントエンドの最終成果物(.js, .[css](http://d.hatena.ne.jp/keyword/css), .html)に環境依存なプログラムが含まれない(含まれてたらおかしい)
- そもそも JS という言語自体が[クロスプラットフォーム](http://d.hatena.ne.jp/keyword/%A5%AF%A5%ED%A5%B9%A5%D7%A5%E9%A5%C3%A5%C8%A5%D5%A5%A9%A1%BC%A5%E0)に配慮された言語なので、ホスト環境によるランタイム差がほぼない

## ネイティブモジュール周りの既知の問題

- fsevents: webpack や chokidar などの裏側で[ファイルシステム](http://d.hatena.ne.jp/keyword/%A5%D5%A5%A1%A5%A4%A5%EB%A5%B7%A5%B9%A5%C6%A5%E0)監視を行うモジュール。npm の lockfile がビルドした環境次第で optional dependencies の native module をうまく依存に含めることができず npm install で再現されないことがある。ファイル変更監視が低速化するだけで動くには動く。yarn でこれが起きたことはない。
- node-sass: libsass の node [バインディング](http://d.hatena.ne.jp/keyword/%A5%D0%A5%A4%A5%F3%A5%C7%A5%A3%A5%F3%A5%B0)だが、ややビルドが不安定。nodeのバージョン上げると大抵コケるのでキャッシュ捨てて再ビルドが必要。最近は [css](http://d.hatena.ne.jp/keyword/css)in-js が流行ってるのでnode-sass見かけることが減った。
- node-gyp: node本体のビルドツール(python2)。 python3 にパスが刺さってる状態でネイティブモジュールをビルドすると失敗する。node でネイティブモジュールを使う環境は `python` が python2 を指している必要があるが、これは他のビルドツールでも何かと要求される要件ではある。

これらを知っていればそこまでクリティカルにはならない。

## 運用どうするか

CircleCI、デプロイ時、初期セットアップの手数を少なくするためにとりあえずNodeイメージ経由でのフロントエンドのビルドタスクは用意する。開発環境では使わない。

他の[プログラミング言語](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0%B8%C0%B8%EC)の人から本体のバージョンを固定することを強く要望されることがあるが(それらの言語が不安定なことが多い)、直近の Stable 使ってる限りは Node の実行に差が出ることは稀で、フロントエンドのビルドツールツェインに関してはそこはあまり抽象してメリットがあるレイヤーではない。が、自分の詳しくない領域の安心感がほしいのはわかるので、上述のビルドタスクを提供する。

node のインストールが困難な開発メンバーがいる場合はサポートする。たぶん二手ぐらいで終わるので、docker それ自体の導入より遥かに簡単。

## [Windows](http://d.hatena.ne.jp/keyword/Windows)/WSL環境 の場合

すいません自分が[Windows](http://d.hatena.ne.jp/keyword/Windows)でフロントエンド開発したことないです。

あんまり人権がある方ではないとは聞いてる。

## サーバーサイド node の場合

他のサーバーサイドと環境と違ってビルドによる環境差がそこまでないので気にしなくていいと思っているが、 node はネイティブモジュールの数次第で、 [imagemagick](http://d.hatena.ne.jp/keyword/imagemagick) あたりが鬼門。こいつは常に鬼門。別環境に追い出したい。

node server を運用する際はこの限りではない。

というのが自分の意見です。