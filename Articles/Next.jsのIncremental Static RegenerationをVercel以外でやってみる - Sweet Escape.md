---
URL: https://www.keisuke69.net/entry/2020/12/09/154446
Created: 2021-01-03T15:08:00
Updated: 2021-01-03T15:11:00
Tags: [topic/技術/React/Nextjs]
---
本記事は[Next.js Advent Calendar 2020](https://qiita.com/advent-calendar/2020/nextjs)の9日目です。

# tl;dr

- Vercel以外でもIncremental Static Regenerationは可能
- 試した範囲ではフルに機能するのはコンテナで動かした場合のみ
- [AWS](http://d.hatena.ne.jp/keyword/AWS)のサーバーレスで動かすのは現時点で絶望的

# はじめに

早速ですが、みなさん、次世代のStatic Site Generation（SSG）と言っても過言ではないIncremental Static Regeneration（ISR）はご存知でしょうか。

一応知らない人のためにすごく簡単に説明をすると、『リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トに対して静的にビルドされたページを返しつつ、有効期限が過ぎたら非同期で静的ページの再生成を[SSR](http://d.hatena.ne.jp/keyword/SSR)で行う』っていうものです。Cache Controlにおけるstale-while-revalidateと同じような考え方が適用されたものとも言えまして、Next.js 9.4から追加された機能です。

嬉しさについても簡単に述べるならば、SSGと[SSR](http://d.hatena.ne.jp/keyword/SSR)それぞれ辛みがあるわけですがその辛みの一端を解消してくれそうな機能と言えます。つまり、これまでパフォーマンス的に、スケーラビリティ的に、運用的にはSSGのほうが楽ではあるものの、[SSR](http://d.hatena.ne.jp/keyword/SSR)でないと動的な処理などは実現できないことがあったわけです。一方でSSGはその性質上ページの数やコンテンツの数が多くなるとビルドが重くなるという課題もありました。それをISRでは言葉どおり段階的にしつつ、[CDN](http://d.hatena.ne.jp/keyword/CDN)のキャッシュを有効活用しつつ、静的ページの更新を自動的に行うので動的に近いこともできるようになった感じです。

さて、そんなISRですが現状ではVercelでしかサポートされていないような雰囲気を感じるじゃないですか。僕もそう思ってました。意外と他のプラットフォームで動かしてるって話を見かけないんですよね。もしかしたら当たり前に動くからってことなのかもしれませんが。

というわけで、他のプラットフォームでも動くと嬉しいよねってことでいろいろ試してみます。

試す[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)サービスとしてはとりあえず今回は自分が一番使い慣れている[AWS](http://d.hatena.ne.jp/keyword/AWS)で試しますが、きっと他の[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)でも有効だと思います。

# サンプルアプリ

試すのに使った[ソースコード](http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9)は[こちら](https://github.com/Keisuke69/isr-demo)です。とてもシンプルな内容です。

```plain text
export default function Index({current}) {
  return (
    <div>
        現在時刻は{current}です。
    </div>
  );
}

export async function getStaticProps() {
    const date = new Date();
    const current = date.toLocaleString()
  return {
    props: {
      current,
    },
    revalidate: 10,
  };
}

```

これだけです。内容的にはビルドされた時刻を取得して出力しているだけです。

```plain text
getStaticProps
```

なのでSSGなのですが、ポイントは

```plain text
revalidate: 10
```

です。この指定によりISRで10秒ごとにビルドし直されています。つまり、10秒間は時刻が更新されず、リビルドされたタイミングでそのときの時刻に更新されるというだけのものです。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/K/Keisuke69/20201207/20201207220243.png)

今回は使いませんが、動的ルーティングする場合はこれに加えて`getStaticPaths`で`fallback: true`を指定する必要がありますね。

# Netlify

さて、まずはNetlifyにデプロイしてみます。NetlifyといえばStaticなサイトの[ホスティング](http://d.hatena.ne.jp/keyword/%A5%DB%A5%B9%A5%C6%A5%A3%A5%F3%A5%B0)サービスってイメージの人も多いと思いますが実はNext.jsのServer Side Rendering（[SSR](http://d.hatena.ne.jp/keyword/SSR)）もできるようになってたりします。

[公式ブログ](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)にあるようにNetlifyでNext.jsを[SSR](http://d.hatena.ne.jp/keyword/SSR)するにはNext on Netlify pluginをインストールするだけです。

そうすると[Github](http://d.hatena.ne.jp/keyword/Github)にNext.jsのアプリケーションをプッシュなりすると動き出すデプロイプロセスの中でうまいことやってくれます。実際にはファンクションとして吐き出してるようで、これを実行しているみたいですね。

というわけで早速デプロイしますが、結論を先に言うとうまくいきませんでした。まず、デプロイはうまく行きますし、実際に動きます。

でも期待した動きをしてくれず、ページのリロードごとに時刻が更新されます。つまりISRではなく毎回[SSR](http://d.hatena.ne.jp/keyword/SSR)で実行されてしまっているようです。正直なんでこんなことになるのかはわかりませんが深くは追っていないです。

ちなみに、この[プラグイン](http://d.hatena.ne.jp/keyword/%A5%D7%A5%E9%A5%B0%A5%A4%A5%F3)は`fallback: false`以外を指定した場合はデプロイ自体失敗するという状況になりました。これも原因は追っていませんが、いずれにせよ現時点ではNetlifyでISRをするのは難しそうでした。

と思ったらタ[イムリ](http://d.hatena.ne.jp/keyword/%A5%A4%A5%E0%A5%EA)ーにこんなアナウンスが。

[www.netlify.com](https://www.netlify.com/blog/2020/12/07/announcing-one-click-install-next.js-build-plugin-on-netlify/)

このアナウンスではISRは現状[SSR](http://d.hatena.ne.jp/keyword/SSR)として処理する方法でサポートしてるってあるので現状ではひとまずそういうことみたいです。

# [AWS](http://d.hatena.ne.jp/keyword/AWS)のサーバーレス

続いて[AWS](http://d.hatena.ne.jp/keyword/AWS)のサーバーレス環境にもデプロイしてみます。デプロイ方法とかは[こちらの記事](https://www.keisuke69.net/entry/2020/11/27/163208)に書いた内容でいきます。つまりServerless FrameworkのServerless Next.js Componentを使うパターンです。

ちなみにこの記事の末尾では現時点ではISRはサポートされていないと書きました。これは公式のReadmeなどの記述をもとにそう書いたのですが実際にどうなのかやってみます。とりあえずServerless Frameworkをインストールして初期セットアップします。

```plain text
$ yarn global add serverless
$ serverless config credentials --provider aws --key <AWS_ACCESS_KEY> --secret <AWS_SECRET_KEY>
```

ちなみに僕はRemote Containersの環境を使っている関係で`global`を指定していますがそうじゃない人はなくても大丈夫だと思います。あと今回は[AWS](http://d.hatena.ne.jp/keyword/AWS)の環境にデプロイするので[AWS](http://d.hatena.ne.jp/keyword/AWS)の認証情報を設定しています。

そして`serverless.yml`を以下のような感じで用意します。

```plain text
myNextApplication:
  component: "@sls-next/serverless-component@1.18.0"
```

用意したらおもむろにデプロイコマンドを実行します。間違っても`serverless deploy`とか実行しないように。初回はCloudFrontの[ディストリビューション](http://d.hatena.ne.jp/keyword/%A5%C7%A5%A3%A5%B9%A5%C8%A5%EA%A5%D3%A5%E5%A1%BC%A5%B7%A5%E7%A5%F3)の作成などもあるので少し時間がかかります。

```plain text
$ serverless
```

そもそもデプロイに失敗するかと思いきやすんなり言ってしまった。そしてアクセスすると普通に表示される。

これはもしや実はいけるのかもと思い、期待に胸ふくらませつつ10秒後にリロード。

なにも変化がなかった。

それ以降、何度リロードしても変化がない。つまりISRはおろか[SSR](http://d.hatena.ne.jp/keyword/SSR)もしてくれていない（そりゃそうかも）。単に初回に生成した静的ページのみがレスポンスされる状況だ。

実は淡い期待を抱いていたのだがこれはどういうことなのだろうか。なんとなくLambdaファンクションの生存期間内であれば再生成とかしてくれるのではないかとも思っていた。詳細を深堀りするにはServerless Next.js ComponentがデプロイするLambdaファンクションの中身とか追う必要がありそうなんですが、時間がないのでひとまずパス。一旦諦めます。

# Container

さて、サーバーレスがいまいちな結果に終わったので今度はコンテナです。ただ、正直これは何も試さなくても動くでしょって感じですね。

というのも、公式のブログではISRをフルサポートしているものとして`next start`とVercelのプラットフォームがあげられていますし、開発時にISR試すときは普通にローカルで`next start`を動かしているはずです。つまり手元の[Mac](http://d.hatena.ne.jp/keyword/Mac)では動くのです（もちろんWinでも大丈夫だと思う）。それはつまり、Node.jsの環境をセットアップしたコンテナイメージでも動くということです。

したがってやることはNext.jsのServer Side Renderingの環境を用意するのと同じと言えます。

早速やっていきます。今回はとりあえずコンテナイメージを用意してFargateという[AWS](http://d.hatena.ne.jp/keyword/AWS)のコンテナ実行環境サービスの上で動かすことだけを目的とします。

ひとまずDockerfileをこんな感じで用意しました。端的に言うとNode.jsのイメージを用意して[ソースコード](http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9)をコピーしてビルドしてってだけですね。

```plain text
FROM node:current-alpine AS base
WORKDIR /base
COPY package*.json ./
RUN yarn install && yarn cache clean
COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN yarn build

FROM node:current-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN yarn add next && yarn cache clean

EXPOSE 3000
CMD yarn start
```

最終的なコンテナイメージのサイズを小さくするためにマルチステージビルドをしています。単純にコピーしてビルドしても当然動くけどゴミも多いのでマルチステージビルドしてビルド用と実行用のイメージをわけるのがいいと思います。ゴミの多いところには悪い人が集まりやすいので。

普段、開発環境としてRemote Containersを使っていてそのときは`node:15.3.0`というイメージを使っています。これはGitとか諸々が含まれたイメージです。そして[Ubuntu](http://d.hatena.ne.jp/keyword/Ubuntu)ベース。

一方でFargateで実行する用としてはalpineベースのイメージでビルドする感じにしています。

まあDockerfileの細かいところは本題ではないのでツッコミあるかもしれないが一端そこは置いておいて。

とりあえずこちらでイメージのビルドを行います。プロジェクトフォルダに移動した上でこんな感じで。細かいところは各自の環境にあわせてください。イメージがビルドできたらDockerHubなりECRなりにプッシュします。今回はDockerHubにしました。

```plain text
$ docker build --pull --rm -f "Dockerfile" --target production -t keisuke69/isrdemo:latest "."
$ docker push keisuke69/isrdemo:latest
```

ではこれを早速Fargateで起動します。細かい設定は特にせずウィザードでイメージを指定してポチポチと作っただけなので手順は割愛します。TaskDefinitionを貼ろうかと思ったけどすごく長くなるのでこれも割愛で。ただ、ほぼデフォルトです。3000番ポートでコンテナを起動して、ALBは80番でListenしています。で、コンテナにリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トをforwardしてるだけですね。難しいことはやっていません。余力があればCDKなりを後日用意します。

さて、作成したらブラウザからアクセスします。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/K/Keisuke69/20201208/20201208154707.png)

はい、普通にアクセスできますね。何度かリロードしても10秒立ってバックグラウンドでリビルドされるまでは時刻が変わりません。わかりにくいのでGIFにしてみましたｗ

![](https://cdn-ak.f.st-hatena.com/images/fotolife/K/Keisuke69/20201208/20201208155547.gif)

GIFにしてもわかりにくかったｗ

目を凝らすと[Chrome](http://d.hatena.ne.jp/keyword/Chrome)の更新ボタンがクリックされてるのがわかると思います。で、何回かは時刻が変更ないまま。つまりこれは前回ビルドされた静的ファイルがレスポンスされているということです。で`revalidate`オプションで指定した秒数（今回は10秒）が経過するとバックグラウンドで静的ファイルがリビルドされるのでそのときの時刻に更新されるということです。

今回はコンテナで試しましたがもちろんEC2などの[仮想マシン](http://d.hatena.ne.jp/keyword/%B2%BE%C1%DB%A5%DE%A5%B7%A5%F3)やオンプレのサーバでも同様です。コンテナに関してもFargateでなくても[Kubernetes](http://d.hatena.ne.jp/keyword/Kubernetes)とかのコンテナ基盤さえあればどこでも動くと思います。

実際には手前にNginx入れるのもよくある構成かと思います。

あと、[AWS](http://d.hatena.ne.jp/keyword/AWS)だと静的ファイルはS3で[ホスティング](http://d.hatena.ne.jp/keyword/%A5%DB%A5%B9%A5%C6%A5%A3%A5%F3%A5%B0)して配信ってパターンもあると思います。このあたりはデプロイ処理を作り込む必要がありますね。

また、実際にはキャッシュのために手前に[CDN](http://d.hatena.ne.jp/keyword/CDN)を入れることも多いでしょう。

とりあえずコンテナでも普通に動くことは確認取れたので何らかの事情でVercelを使えない場合、もしくは普段利用している[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)サービスでサービスしたいなどの場合はひとまずコンテナを利用すれば特に問題はないかと思います。

うん、まあわかってた。

だが、コンテナを用意するのはともかく、コンテナ基盤を用意するとかちょっと面倒だよなーって思うときありますよね。

やっぱりサーバーレスでやりたい。

# [AWS](http://d.hatena.ne.jp/keyword/AWS)のサーバーレス #2

というわけでサーバーレスを再考します。先ほどのServerless Next.js Componentを使う場合は期待した動きにはなりませんでした。なのでなんとかLambdaを使ってできないかと試行錯誤してみます。

Serverless Next.js ComponentはLambda@Edgeが使われるのですが、ISRはサーバーサイドで非同期にリビルドが行われます。つまりバックグラウンドで処理が行われる必要があると想像できます。

とすると、プロセスが常時起動している必要があると言えますよね。コンテナであれば`next start`したイメージを起動させっぱなしにしておけばいいのですが、Lambda@Edgeに限らずLambdaの実行モデルは関数型であり、そのライフサイクルは短命です。したがって、そもそもLambdaの実行モデルとは相性が悪そうです。でも、一応Lambdaの実行時間は最長で15分なのでそれでなんとかなる気もしてきます。

なので、まずはNext.jsのアプリをLambdaファンクションとして実行してみたいと思います。ひとまずは簡単にexpressを使ったカスタムサーバを用意してこれでNext.jsアプリを稼働させるようにします。

その上で、これも以前に紹介した`aws-serverless-express`を使います。これはexpressを使ったWebアプリケーションをLambdaで実行可能にするというものです。これも詳しくは[こちら](https://www.keisuke69.net/entry/2020/11/27/163208)で。

ただ、この`aws-serverless-express`なんですが11/30付けで[aws](http://d.hatena.ne.jp/keyword/aws)からvendiaという企業の[リポジトリ](http://d.hatena.ne.jp/keyword/%A5%EA%A5%DD%A5%B8%A5%C8%A5%EA)に移管されて名前も[aws](http://d.hatena.ne.jp/keyword/aws)が外れて`serverless-express`になっていました。新しい[リポジトリ](http://d.hatena.ne.jp/keyword/%A5%EA%A5%DD%A5%B8%A5%C8%A5%EA)は[こちら](https://github.com/vendia/serverless-express)です。

オリジナルの作者が[AWS](http://d.hatena.ne.jp/keyword/AWS)を退職してVendiaという会社に移ったからのようです。なお、余談ですがこのVendiaという会社はCEO含めて[AWS](http://d.hatena.ne.jp/keyword/AWS)の元サーバーレス関係者が多い企業でした。

さて、では早速用意していきます。まず以下のようなファンクションを`lambda.js`として用意しました。内容的にはNext.jsのカスタムサーバを用意しつつ`serverless-express`で起動するような感じでしょうか。

```plain text
"use strict";

const next = require("next");
const express = require("express");
const dev = "production";
const loaded_next = next({ dev });
const handle = loaded_next.getRequestHandler();
const serverlessExpress = require("@vendia/serverless-express");

function load(event, context) {
  loaded_next.prepare().then(() => {
    const app = express();
    app.get("*", (req, res) => handle(req, res));

    const server = serverlessExpress.createServer(app);
    
    serverlessExpress.proxy(server, event, context);
  });
}

exports.handler = (event, context) => {
  load(event,context)
};

```

今回もServerless Frameworkでデプロイするので以下の内容で`serverless.yml`を用意します。

```plain text
service: isr-demo
plugins:
  - serverless-offline
  - serverless-apigw-binary

frameworkVersion: '2'

provider:
  name: aws
  runtime: nodejs12.x
  region: ap-northeast-1

functions:
  isr-demo:
    handler: lambda.handler
    timeout: 30
    memorySize: 512
    events:
    - http: ANY /
    - http: 'ANY {proxy+}'

custom:
  apigwBinary:
    types: #list of mime-types
      - '*/*'

package:
  individually: true
```

必要なパッケージを追加します。

```plain text
$ yarn add serverless-express
$ yarn add express
```

あとはデプロイするだけです。

```plain text
$ serverless deploy
```

この状態で作成された[API](http://d.hatena.ne.jp/keyword/API)のエンドポイントにアクセスしてみたのですが、残念ながらうまく動きません。ブラウザから実行してみるとしばらく待たされた上に、個人的にエンジニアとして見せたら恥ずかしいと思っている[Internal Server Error](http://d.hatena.ne.jp/keyword/Internal%20Server%20Error)が出ています。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/K/Keisuke69/20201209/20201209144738.png)

Lambdaファンクションのログには以下のようなメッセージが出力されています。

```plain text
{
    "errorType": "Runtime.UnhandledPromiseRejection",
    "errorMessage": "Error: EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'",
    "reason": {
        "errorType": "Error",
        "errorMessage": "EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'",
        "code": "EROFS",
        "errno": -30,
        "syscall": "unlink",
        "path": "/var/task/.next/BUILD_ID",
        "stack": [
            "Error: EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'"
        ]
    },
    "promise": {},
    "stack": [
        "Runtime.UnhandledPromiseRejection: Error: EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'",
        "    at process.<anonymous> (/var/runtime/index.js:35:15)",
        "    at process.emit (events.js:314:20)",
        "    at processPromiseRejections (internal/process/promises.js:209:33)",
        "    at processTicksAndRejections (internal/process/task_queues.js:98:32)"
    ]
}

```

`Error: EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'`と言っているのですが、これはつまりLambdaファンクションのランタイムが動く環境は読み取りしか許可されていないのでNext.jsが行う処理の中で呼ばれる`unlink`という[システムコール](http://d.hatena.ne.jp/keyword/%A5%B7%A5%B9%A5%C6%A5%E0%A5%B3%A1%BC%A5%EB)（ファイルの名前とかリンクを削除するやつ）がエラーになってるってことですね。実際にはこの処理がどういうときに行われているのかは読み解いていないです。

とりあえず、`.next`以下を触っているので出力先を変更できないかと思ったのですが`next.config.js`で`distDir`をLambdaで読み書き可能な一時的な領域である`/tmp`を指定してみたものの、うまく設定できず単に`/var/task/tmp`で同じエラーが。

というわけで普通にやると動かなかったです。そもそもISRとかの前にNext.jsのアプリを実行できない。

なんとなくビルド、パッケージング、デプロイの全体で考えないとうまくいかなさそうです。

# [AWS](http://d.hatena.ne.jp/keyword/AWS)のサーバーレス #3

普通にやったらダメだったので今度はLambdaで最近サポートされたコンテナイメージでのパッケージングと実行で試してみます。なお、コンテナをサポートと言ってもFargate（とか他のコンテナ基盤向け）のイメージをそのまま動かせるわけではない。逆もまた然り。What is portability?

さて、コンテナイメージを試す理由は用意されたランタイム（つまりLambda側が利用するコンテナ）ではなく自分でビルドしたものを使うことで書き込みエラーを回避できるのではないかという淡い期待からです。

というわけでやっていくのですが、Lambdaでコンテナイメージを使ってデプロイするためにベースイメージをこれまでとは異なり、[AWS](http://d.hatena.ne.jp/keyword/AWS)が提供しているものを利用します。1から自分で用意することも可能ですが結構面倒そうなので[AWS](http://d.hatena.ne.jp/keyword/AWS)が提供しているイメージを使うほうが楽だと思います。

というわけでDockerfileを以下のように書き換えます。

```plain text
FROM amazon/aws-lambda-nodejs:12
COPY pages/ ./pages
COPY public/ ./public
COPY styles/ ./styles
COPY lambda.js package.json ./

RUN npm install && npm run build
CMD [ "lambda.handler" ]
```

LambdaにコンテナイメージをデプロイするにはDockerHubではダメでECRに保存しておく必要があります。というわけでイメージをビルドしつつECRにプッシュします。数字の箇所は[AWS](http://d.hatena.ne.jp/keyword/AWS)アカウントIDなので自分で実行する場合は御自身のものに置き換えてください。

```plain text
$ docker build --pull --rm -f "Dockerfile" -t isrdemo:latest "."
$ docker tag isrdemo:latest 1234567890.dkr.ecr.ap-northeast-1.amazonaws.com/isrdemo:latest
$ aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 1234567890.dkr.ecr.ap-northeast-1.amazonaws.com
$ docker push 1234567890.dkr.ecr.ap-northeast-1.amazonaws.com/isrdemo:latest

```

ECRにプッシュしたイメージを指定してLambdaファンクションを作りますが、この部分は普通の手順なので割愛します。

あとは[API](http://d.hatena.ne.jp/keyword/API) [Gateway](http://d.hatena.ne.jp/keyword/Gateway)の設定をするのですが先程と同様の定義でLambda関数をここで作成したものに変更するだけで大丈夫です。

さて実行しますがうまく行きません。先程同様に恥ずべき[Internal Server Error](http://d.hatena.ne.jp/keyword/Internal%20Server%20Error)が出ています。

ログを見てみます。

```plain text
2020-12-09T05:37:53.445Z   f1332f51-c7ae-4609-81ee-c88b23daacb8  ERROR Unhandled Promise Rejection   
{
    "errorType": "Runtime.UnhandledPromiseRejection",
    "errorMessage": "Error: EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'",
    "reason": {
        "errorType": "Error",
        "errorMessage": "EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'",
        "code": "EROFS",
        "errno": -30,
        "syscall": "unlink",
        "path": "/var/task/.next/BUILD_ID",
        "stack": [
            "Error: EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'"
        ]
    },
    "promise": {},
    "stack": [
        "Runtime.UnhandledPromiseRejection: Error: EROFS: read-only file system, unlink '/var/task/.next/BUILD_ID'",
        "    at process.<anonymous> (/var/runtime/index.js:35:15)",
        "    at process.emit (events.js:314:20)",
        "    at processPromiseRejections (internal/process/promises.js:209:33)",
        "    at processTicksAndRejections (internal/process/task_queues.js:98:32)"
    ]
}

```

なるほど。一緒ですね。やはりNext.jsの処理においてLambdaの実行環境内の[ファイルシステム](http://d.hatena.ne.jp/keyword/%A5%D5%A5%A1%A5%A4%A5%EB%A5%B7%A5%B9%A5%C6%A5%E0)への書き込みが失敗しています。Lambdaファンクションとしてコンテナイメージを使った場合もこの辺は変わらないようですね。

もうちょっといろいろやってみようと思ったのですが、Next.jsに関する僕の知識不足もあってひとまず時間切れな感じがあります。悔しいけど。

なんというか、サーバーレスってアプリエンジニアが楽することができるプラットフォームだと思うのだけど、『楽するために苦労する』感がすごくなってきたのでここらでやめて冬休みの宿題としたいと思います。

というか、Serverless Next.js Componentへのコントリビューションというほうが現実的かもしれない。

# まとめ

はい、というわけで結論からするとVercel以外でもIncremental Static Regenerationは可能です。ただし、満足に動くのはコンテナで動かした場合のみ、という結果でした。

# 2020/12/10 追記

ところで、今回時間切れで検証できなかったことがある。それはISRの元となった考え方であるCache Controlにおけるstale-while-revalidateについてだ。

これは何かというとブラウザや[CDN](http://d.hatena.ne.jp/keyword/CDN)におけるキャッシュにおいて、一定期間をキャッシュからレスポンスするが指定時間を経過したら非同期でオリジナルをfetchしてキャッシュをレスポンス/更新するというもの。つまりISRと同じものだ。

ということはこのCache Controlをサポートする[CDN](http://d.hatena.ne.jp/keyword/CDN)であれば実はNext.jsのISRを使わずとも同じことができるのではないかと思ったのだ。これができれば、Next.js側ではISRをせずとも通常の[SSR](http://d.hatena.ne.jp/keyword/SSR)でよくなるので、ISRと同じようなことをするにあたって[ホスティング](http://d.hatena.ne.jp/keyword/%A5%DB%A5%B9%A5%C6%A5%A3%A5%F3%A5%B0)する場所の選択肢が広がると思ったんだが。

ちなみに[AWS](http://d.hatena.ne.jp/keyword/AWS)の[CDN](http://d.hatena.ne.jp/keyword/CDN)であるCloudFrontは現状ではstale-while-revalidateには対応していない（stale-if-errorには対応している）。世の[CDN](http://d.hatena.ne.jp/keyword/CDN)すべてを確認したわけではないがFastlyとCloudflareは対応している模様。