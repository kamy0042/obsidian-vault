---
Created: 2021-01-15T18:12:00
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
こんにちは。最近Slackのカスタム絵文字作りにハマっている友野です。Holmesでサーバーサイドエンジニアをしています。

Holmesが提供するホームズ[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)は、今年8月にサービスローンチ3周年を迎えました！

これまでの支持に感謝し、これからも長く使ってもらえるようにプロダクト改善に取り組んでいます。そのひとつとして、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)駆動設計（以下、DDDと表記します）適用に関する取り組みについてご紹介します。似たような状況や同じ課題を持つ誰かの一助になれば幸いです。

## 背景と現状

ホームズ[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)は[PMF](http://d.hatena.ne.jp/keyword/PMF)（Product Market Fit：プロダクトマーケットフィット）を経て、サービスシェア拡大のために[トレードオフ](http://d.hatena.ne.jp/keyword/%A5%C8%A5%EC%A1%BC%A5%C9%A5%AA%A5%D5)スライダーをスピードに全振りしていました。Spring Bootを利用した三層+[MVC](http://d.hatena.ne.jp/keyword/MVC)[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)を採用し、ローンチ以来、機能追加・改善を繰り返し行ってきました。

日本ではCLM（Contract Lifecycle Management：契約ライフサイクルマネジメント）領域はまだ深く浸透しておらず、認知度向上のためにはとにかく市場評価する必要があり、スピード最優先にする戦略・[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)採用は間違っていなかったと思います。

一方で、コア[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)である契約関連機能はその仕様の複雑さも相まって、コードの複雑性も増加の一途を辿り、メンテナンスコストが上がってきました。サービスローンチから3年をふりかえり、市場変化に合わせて**「変更に強いプロダクト」**を作ることがCTOはじめメンバー全員の共通認識になり、DDD採用を決める後押しになりました。

## まずはじめたこと

採用を決めたものの、**DDDとは何だろうか？**というメンバーが多い状態から第一歩を踏み出すために、[有識者](http://d.hatena.ne.jp/keyword/%CD%AD%BC%B1%BC%D4)の力が必要でした。

[DDD Community JP](https://ddd-community-jp.connpass.com/)を主宰している松岡さんに声をかけ、力を貸してくれるようお願いしたところ、快く引き受けてくれた上にライブ[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)とライブコーディングまでしてくれる運びとなりました（感謝しかありません）。それまでにメンバーは松岡さんの[YouTube](https://www.youtube.com/channel/UCbHtbIUxtfGjrDy1WcqxExw)で基礎知識をインプットし、モブワークに臨みます。

テキストベースのコミュニケーションをはさみながら、モブワークを2回ほど実施した後のメンバーの感想は以下の通りです。

> モデルクラスにロジック集約してると動くドキュメント感あってよい正しい状態しか作れないと処理がシンプルになる！1クラスだけ見ればいいのは楽だし安心ドメインやモデルが定義されていないソフトウェアからDDDを始めるには? 再設計/モデリング?

不安に思いながらも、多くのメンバーがその効果と威力に期待を膨らませ、モチベーションを高めていきました。

## 戦略的[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)

[先日の記事](https://tech.holmescloud.com/entry/2020/10/16/150605)で触れたように、社内で勉強会を重ねた上で、仕様の共通理解と深掘りを行うために[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)に取り組み始めました。具体的には、弁護士資格を持つ社員を[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)エキスパートとして[スクラム](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%E9%A5%E0)のリファインメントに招き、[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)を実施しています。[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)自体初めてのメンバーが多いため、以下の書籍を参考に[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)の進め方ガイドを作り、適宜ふりかえりを交えながら進めています。

[little-hands.booth.pm](https://little-hands.booth.pm/items/1835632)

現在リモートワーク中心での勤務体系のため、議論はオンラインホワイトボード[miro](https://miro.com/)上で行い、[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)をした後にバージョン管理のために[PlantUML](https://miro.com/)でまとめています。

## そして、戦術的な設計

しかし、既存の資産、かつ稼働しているサービスにおいて、どこから手をつけるか非常に悩ましい課題です。最初は[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)した成果を活かすために、**集約をコードで表現すること**からスモールスタートすることに決めました。

## 採用するパターン2つ

集約をコードで表現するために以下の2つのプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスを採用します。

- [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデルを反映したオブジェクトを置くパッケージの作成
- 既存テーブル構造に依存しない`Repository`+`Adapter`パターン

### [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデルを反映したオブジェクトを置くパッケージの作成

まず何より、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデルを反映した[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトを置く場所を決めます。既存のパッケージ構成では、Spring [MVC](http://d.hatena.ne.jp/keyword/MVC)やSpring Data [JPA](http://d.hatena.ne.jp/keyword/JPA)の[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に合わせ、`controller`、`service`を中心に、`entity`や`request`などのモデルのパッケージを切っています。`service`パッケージのクラスには、データモデルが渡されて手続き的に処理されるコードがあるため、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトを配置するのは適切ではありません。[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトを置く`domain`パッケージを作ることにしました。`service`パッケージのクラスの修正は最小限に留め、ビジネスルールに関する操作を[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトに移譲する状態をゴールとしています。

- `service`パッケージ内のクラスが担う責務
- 全体の流れを構成する責務
- データの取得、永続化（を依頼する）責務
- `domain`パッケージ内のクラスが担う責務
- ビジネスルールに基づく判断／加工／計算の責務

いわゆる三層[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)+[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトのパターンで、これは以下の書籍を参考にしています。

[現場で役立つシステム設計の原則 〜変更を楽で安全にするオブジェクト指向の実践技法：書籍案内｜技術評論社](https://gihyo.jp/book/2017/978-4-7741-9087-7)[gihyo.jp](https://gihyo.jp/book/2017/978-4-7741-9087-7)

### 既存テーブル構造に依存しない`Repository`+`Adapter`パターン

![](https://cdn-ak.f.st-hatena.com/images/fotolife/a/a-tomono/20201027/20201027000355.png)

Repository以降で既存資産との変換を行う（※図はサンプル）

では、この`Adapter`クラスをどこに置くかというと、また新しく`infrastructure`パッケージを追加しました。前節では三層[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)+[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトと記載しましたが、ここに関しては部分的に”依存関係逆転の原則”に従い、ヘキサゴナル[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)（ポート&アダプター）の構造になっています。

## ふりかえり

設計変更の効果と[開発プロセス](http://d.hatena.ne.jp/keyword/%B3%AB%C8%AF%A5%D7%A5%ED%A5%BB%A5%B9)への影響度合い、実装イメージの共有を目的として一部追加機能で実装を始めた段階です。結果が出るのはまだ少し先になりそうですが、既存のデータモデルに引きずられず、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)した結果をうまくコードで表現できていると思います。また、追加機能の実装を中心的に推進してくれたメンバーからは以下のようなコメントをもらっています。

> 既存のテーブルに依存せず、本当に必要なものだけをドメインモデルで表すという考え方はとてもシンプルで分かりやすい。実際に出来上がったドメインモデルを見ると、必要な情報が思っていたより少なくて驚いた。ドメインモデルがシンプルなので処理の流れもシンプルになるという好循環。Repository+Adapterの実装パターンのおかげで、既存のテーブルを気にせずドメインモデルをコードに起こすことに集中できた。まだ理解しきれていない部分も多くあり、詰まる部分もあるが、実践していく中でドメイン駆動設計の良さに気づけることもあるので継続していきたい。

最も複雑、かつコア[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)である契約領域への適用は、ロードマップに従って順次進めていきます。並行して、本記事で触れていないプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスについても有効性を確認しながら適用していこうと考えています（少なくとも、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)サービスはかなり悩んだ／悩んでいるので、別途記事にできればと思います）。

## まとめ

戦略的な[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)と並行して取り組んでいる、コードで表現する最小限のパターンをご紹介しました。本記事で触れた以外にも多くのプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスがありますが、すべてをすぐにプロダクトへ適用するのは難しいものです。なにより既存資産、既存サービスへの影響を考えながら、手段と目的を履き違えぬよう注意深く進めなくてはなりません。

[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)知識を育てながら、愚直に[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)プログラミングをするのが、一番のDDD成功への近道と言えそうです。

## 最後に

Holmesでは、今後もコア[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)に注力し、変更に強いプロダクト構築を通じて、お客様の契約業務に関する課題の解決とCLM市場拡大を進めていきます。
DDDに関して知見や興味があり、一緒にHolmesの目指す世界観を作りたい方、是非力を貸してください！

Holmesでは現在エンジニアを募集しています。
興味がある方は是非こちらからご連絡ください！

[lab.holmescloud.com](https://lab.holmescloud.com/jobs/cat_jobs/engineer)

- [1](about:blank#ipfootnote0):集約、値オブジェクト、エンティティ、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)サービス等のプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスや[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)などを指します。詳細は以下の書籍をご参照ください。

[エリック・エヴァンスのドメイン駆動設計（牧野 祐子 牧野 祐子 今関 剛 今関 剛 今関 剛 和智 右桂 和智 右桂 Eric Evans）｜翔泳社の本](https://www.shoeisha.co.jp/book/detail/9784798121963)[www.shoeisha.co.jp](https://www.shoeisha.co.jp/book/detail/9784798121963)

- [2](about:blank#ipfootnote1):厳密にはJPARepositoryインタフェースを継承していて、Springが暗黙的に実装していますが、分かりやすさを優先しています。
- [3](about:blank#ipfootnote2):念のため補足すると、既存資産が腐っているという意味ではありません。念のため…。
- [4](about:blank#ipfootnote3):さすがに[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)を無視してDDDだ！はないとは思いますが…
1. [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)だけでも一定の価値はあると考えています。これに加えて、戦術的な設計領域
まで踏み込むことでさらにDDD採用の効果を高め、変更に強い状態を作ることを目指しています。
2. [クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)では、データ永続化のライブラリとしてSpring Data [JPA](http://d.hatena.ne.jp/keyword/JPA)を採用しており、`Repository`インタフェースはあるものの、直接`JPARepository`を実装しているのが現状です。つまり、[JPA](http://d.hatena.ne.jp/keyword/JPA)エンティティ（DDDのエンティティではないので[JPA](http://d.hatena.ne.jp/keyword/JPA)をつけています）を渡さないと永続化できません。これでは既存のDB構造に強く依存してしまい、[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトの構造自体が既存構造に引きずられかねません。
3. `Repository`インタフェースに[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)オブジェクトを渡したいので、[JPA](http://d.hatena.ne.jp/keyword/JPA)用の`Adapter`クラスを実装して、[JPA](http://d.hatena.ne.jp/keyword/JPA)エンティティへの変換と永続化責務を移譲することにしました。これで、既存資産の[JPA](http://d.hatena.ne.jp/keyword/JPA)エンティティへの依存を切ることが出来ました。DDDの文脈でのコンテキストマップにおいて腐敗防止層という考え方がありますが、これを既存概念（データモデル）に適用した形です。
4. **◯◯をしたからDDDやってます！もなければ、△△していないのならDDDとは呼べない！というのはない**と考えています。