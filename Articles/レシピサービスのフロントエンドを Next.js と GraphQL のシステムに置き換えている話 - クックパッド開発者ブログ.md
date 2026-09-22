---
URL: https://techlife.cookpad.com/entry/2020/12/01/093000
Created: 2021-01-15T18:13:00
Updated: 2021-01-15T18:24:00
Tags: [topic/技術/React/Nextjs]
---
技術部の外村（[@hokaccha](https://twitter.com/hokaccha)）です。今回はクックパッドのウェブサイトのフロントエンドを Next.js などを使って作り直している話を書きます。

この記事で紹介する新システムは、スマートフォン向けのレシピページで確認することができます。もし興味があるかたはレシピページをスマートフォンのユーザーエージェントで開いて DevTools などで確認してみてください。 Next.js と GraphQL で動いているのがわかると思います。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hokaccha/20201130/20201130205054.png)

ご存じの方も多いかもしれませんが、クックパッドのウェブサイトはモノリシックな Rails で作られていて、10年以上 Rails で開発を続けてきました。10 年以上同じシステムで開発を重ねれば当然レガシーな部分が大量に生まれてきますが、特にフロントエンドはその影響が顕著でした。

こういった状態なので当然開発効率は悪くなりますし、開発のモチベーションも低くなります。その結果ユーザーに価値を届けるまでのスピードが遅くなってしまうのが最大の問題です。この問題を根本的に解決するため、今回 Next.js でフロントエンドを作り直すという決断をしました。

以降では今回のシステムの技術要素やパフォーマンスへの影響について説明します。

## 技術要素

今回のシステムにおける重要な技術要素は以下です。

- TypeScript（言語）
- Next.js（フロントエンドフレームワーク）
- GraphQL（API）

技術選択する上でまず最初に考えたのは、TypeScript を中心に据えることです。型チェックによる整合性の検査、補完やリファクタリングを中心としたエディタの支援など、TypeScript を導入することによる生産性の向上は非常に大きいものがあります。

次にフロントエンドの描画ライブラリはシェアの大きさやTypeScript との相性、使いやすさなどを考慮したうえで React を採用することにし、サイトの性質上 Server Side Rendering（以下 SSR）は必要になると思っていたので、React.js で SSR がいい感じに動くフレームワークということで Next.js を採用しました。Next.js は技術選定をした少し前に [TypeScript 対応を強化](https://nextjs.org/blog/next-9#built-in-zero-config-typescript-support)したり、[動的なルーティング](https://nextjs.org/blog/next-9#dynamic-route-segments)をサポートしたりと、いい感じのアップデートがあったのも決め手の一つでした。

次に API です。クックパッドにはモバイルアプリなどで使われている、社内では Pantry と呼ばれている REST API のシステムがあります。最初は Pantry を直接 Next.js から利用する方向で考えていましたが、認証の問題や、リクエスト・レスポンスへの TypeScript の型付けの問題、将来的に Pantry 以外のサービスにもリクエストが必要になる可能性を考えると、BFF レイヤーに GraphQL を導入するのがよさそうという結論になり、GraphQL を導入することにしました。

現状の GraphQL サーバーの仕事のほとんどは Pantry へのリクエストですが、Pantry へのリクエストのところを少し工夫して楽することに成功したので紹介します。

Pantry は [Garage](https://github.com/cookpad/garage) というフレームワークを用いて実装されている API サーバーです。Garage には fields というクエリストリングで取得するリソースのフィールドを絞り込めるという機能があります。

```plain text
/v1/recipes/:id?fields=id,title,user[id,name]
```

このような感じです。カンマ区切りで取得したいフィールドを指定し、`user[id,name]` のようにネストしたリソースのフィールドも絞り込めます。これは GraphQL のクエリに非常によく似ています。GraphQL で表現すると次のようになるでしょう。

```plain text
query {
  recipe(id: $id) {
    id
    title
    user {
      id
      name
    }
  }
}
```

Garage の fields は Facebook の [Graph API](https://developers.facebook.com/docs/graph-api/) を参考にされて作られており、Graph API  が GraphQL の原型であるという経緯により、このような類似したインターフェースになっているようです。今回のシステムではこの性質を利用し、GraphQL のクエリを Garage の fields に自動で変換し、Pantry へリクエストするという機能を実装しました。これはうまく動いており、 GraphQL のサーバー実装が大幅に簡略化されました。

## システム構成

今回はすべての画面をリプレイスするわけではなく、一部の画面だけ新システムに向けるので、その制御を前段のリバースプロキシ（Nginx）で振り分けています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hokaccha/20201130/20201130093752.png)

`/recipe/:id`のスマートフォンからのリクエストを Next.js へ、`/graphql` を GraphQL のサーバーへルーティングし、残りはこれまで通りの Rails のアプリケーションへルーティングします。Next.js のサーバーでは SSR をおこない、HTML を作ってユーザーに返します。GraphQL へのリクエストについては、Next.js が SSR 時に GraphQL の API を呼び出す場合と、クライアントがブラウザから直接 GraphQL の API を呼び出す場合があります。

SSR の是非については色々と議論があるでしょうが、パフォーマンス（特に LCP（Largest Contentful Paint））の最適化、OGP 対応などを考慮して SSR を採用しています。

## パフォーマンス

パフォーマンスの変化についても少し触れておきます。フロントエンドのパフォーマンス計測には [Calibre](https://calibreapp.com/) というサービスを利用しており、以下が Calibre での before/after です。

### before

![](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hokaccha/20201127/20201127165227.png)

### after

![](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hokaccha/20201127/20201127165251.png)

これを見てもらうとわかるように、システムを刷新したことで大幅にパフォーマンスが向上しました。特に First Contentful Paint (以下 FCP) が圧倒的に速くなっているのがわかると思います。なお、これは低速回線（上記の数値は 3G 回線相当で計測）で特に顕著で、LTE 相当だともう少し差は小さくなります。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hokaccha/20201201/20201201101339.png)

きれいな崖ができた様子

元の実装の FCP が遅かったのはシステムをリニューアルする前からわかっていた問題点のひとつで、巨大な CSS や defer できない JS が head で読まれていて、クリティカルレンダリングパスの最適化ができていないのが原因でした。なんとかしようにもどこで読まれているかわからない CSS が大量にあって消すのが難しい、haml（Rails の View）に埋めこまれた JS が head で読まれる JS に依存していて defer できない、などの理由で FCP の最適化が難しい状態でした。

ですので Rails が遅い、Next.js だと速い、というフレームワークの差ではありません。Rails でもスクラッチで書き直してチューニングすれば同程度のパフォーマンスはでます。ただ、Next.js はそういったパフォーマンス最適化をある程度自動でやってくる点においては非常に楽でした。また、Next.js に組み込まれた [Web Vitals の計測機能](https://nextjs.org/docs/advanced-features/measuring-performance)を使って Web Vitals の数値を記録するようにしたのでこれを使って今後も改善を進めていく予定です。特に LCP、TTI（Time To Interactive） あたりはもう少しどうにかしたいですね。

## まとめ

Next.js や GraphQL を使ってウェブサイトのフロントエンドのシステムを刷新している話を書きました。今後も適用範囲を広げていき、開発の生産性をあげることでユーザーに届ける価値を最大化していきます。また、今回書いた以外にも、認証やロギング、エラートラッキング、CSS in JS、描画のパフォーマンス最適化、A/B テストなど色々と面白い知見が溜まっているのでまた別の機会に共有したいと思います。

最後に、クックパッドではモダンなフロントエンドの基盤を作っていく仕事や、この基盤を使ってサービス開発する仕事が大量にあります（切実）。もし少しでも興味があればお気軽にお問い合わせください！

- [https://twitter.com/hokaccha](https://twitter.com/hokaccha)
- [https://cookpad.jobs/](https://cookpad.jobs/)
- [1](about:blank#ipfootnote0):CoffeeScript は今回の話とは別のプロジェクトでなくすことに成功しましたがこの話はまた別の機会に。
- [2](about:blank#ipfootnote1):調べたら現時点で1600以上のルーティングがありました
- [3](about:blank#ipfootnote2):Pantry を始めとするバックエンドの API サーバーは Ruby なのでそこを変更する必要があれば当然コンテキストスイッチは発生しますが。
- [4](about:blank#ipfootnote3):GraphQL のサーバーは別。
1. `vendor/assets` にファイルを入れてリポジトリにコミットするという運用。`app/assets` 以下のファイルやディレクトリ名に規則や規約もなく、どこにファイルを置いていいかすらよくわからない、という状態です。
2. 一度にすべての画面を置き換えるのは無理なのでまずは最も活発に開発されておりユーザーからの利用も多いところから始めることにして、スマートフォン版のレシピページをターゲットに決め、今年の2月ぐらいから開発をはじめて先月リリースすることができました。比較的うまくいっているので今後も適用する画面を広げていく予定です。
3. [graphql-codegen](https://graphql-code-generator.com/) を利用することで GraphQL のスキーマから TypeScript の型定義ファイルを自動生成しています 。また、GraphQL のサーバー実装も TypeScript （素朴な [express-graphql](https://github.com/graphql/express-graphql) を使った実装）を採用し、単一の言語でフロントエンドと API を開発できるので言語のコンテキストスイッチが少なくなるようにしています。
4. 社内では Node.js でサーバーを運用した知見がほとんどなかったので、性能や運用の面で不安がありましたが、社内には ECS によるコンテナのデプロイ基盤が整っており、Docker で動きさえすればマルチプロセス化などは考えずに 1vCPU でタスクを横に並べるだけでいいので思っていたよりも楽に運用が可能でした。性能面でも、Next.js の SSR サーバーは 200rps 強を 1vCPU のタスク 7 つ前後で捌けているのでまずまずといったところです。