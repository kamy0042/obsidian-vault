---
URL: https://developers.cyberagent.co.jp/blog/archives/29396/
Updated: 2021-11-17T16:32:00
Created: 2021-11-16T23:04:00
Tags: [topic/技術/ビルドツール]
---
## はじめに

Web フロントエンドエンジニアとして株式会社 WinTicket で内定者アルバイトをしていた佐々木です。

この記事では1ヶ月の成果を紹介します。

内定者アルバイト期間中は、主にパフォーマンス改善を行いました。パフォーマンスは世の中的に Core Web Vitals の影響で注目が集まっており、ユーザー視点および事業視点でとても重要な要素となっています。

大雑把にパフォーマンス改善というと様々な文脈を持ちますが、今回はリソースの初期読み込みの速度を改善することを目的として、JavaScript のファイルサイズ (バンドルサイズ)を削減しました。

[WINTICKET](https://www.winticket.jp/) では React と Node.js を用いて Isomophic なアプリケーションを作っています。

しかし、アプリケーションが大きくなるにつれてバンドルサイズが肥大化しており、改善が必要な状況でした。そのため、今回はこのバンドルサイズを中心にパフォーマンスの改善を行いました。

結果としてバンドルサイズを大きく削減できました。具体的には、[FCP (First Contentful Paint)](https://web.dev/fcp/) や[ LCP (Largest Contentful Paint)](https://web.dev/lcp/) 、などの初期読み込みを表す指標を大きく改善することができました。

最終的に Lighthouse の結果は以下のようになりました。 Mobile では 32 点から 51 点になり、PC では 80 点から 98 点まで向上させることができました。

*Mobile (黄緑色の線)*

![[42830a0f050f744d2a50ff6320138f4f-2048x713.jpg]]

*PC (黄緑色の線)*

## 取り組んだこと

今回の改善では1ヶ月という期間の中でできるだけスピード感のある改善を行いたかったため、サービスに影響が伴わないように改善を行いました。

以下に今回行った試作を取りあげます。

1. Webpack の最適化
2. Chunk 見直し
3. スクリプト読み込みの最適化
4. 画像の最適化

### **webpack の最適化**

まずは webpack の最適化についてです。

WINTICKET ではアプリケーション全体で使われるモジュールを共通の bootstrap.js というファイルにバンドルしています。しかし、この bootstrap.js が巨大化してしまっていてファイルの読み込みおよび、パースに多くの時間を費やしてしまっていました。

そこでまずは bootstrap.js に焦点を当てて改善を行ないました。改善する際には、[HTTP/2](https://developers.google.com/web/fundamentals/performance/http2) を意識して問題を解決するようにしました。

HTTP/2 はすでに多くのブラウザでサポートされている技術で、 HTTP/2 を使うことで大幅なパフォーマンス改善が見込まれます。HTTP/2 と HTTP/1 系 では最適化の方法が異なります。 HTTP/1 系 では一度に 1 つのリソースしか配信できないため、大きなリソースがブロックしてしまうと後続のリソースがブロックされてしまうという問題がありました。

そのためできるだけ配信するリソースをバンドルして減らしたり、ドメインごとに複数のコネクションをつないで配信する[ドメインシャーディング](https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x#domain_sharding)といった方法が最適化の手法として取られていました。

しかし、 HTTP/2 では 1 つの TCP コネクションに複数のデータのストリームを送ることができる[多重化](https://developers.google.com/web/fundamentals/performance/http2#request_and_response_multiplexing)という技術によってリソースがブロックされることなくリソースを受け取れます。

このため、バンドルされた大きな1ファイルを配信するよりは、細かく区切ったリソースを配信した方が効率が良いことになります。[このリソースは際限なく細分化すれば良いわけではなく](https://web.dev/granular-chunking-nextjs/#more-http-requests)、パフォーマンスを測りながら最適な配信方法を調整する必要があります。

今回の最適化では、 bootstrap.js から node_modules と webpack の runtime を切り出すことでファイルサイズを減らしました。

webpack では以下のようにして、ファイルを分割します。

```plain text
module.exports = {
  // ...
  optimization: {
    // ...
    splitChunks: {
      // ...
      cacheGroups: {
        // ...
        vendors: {
          test: /[\\/]node_modules[/\\]/,
          chunks: 'initial',
          name: 'vendors',
          minChunks: 1,
        },
        // ...
      }
    }
  }
}
```

また、webpack の[ chunkFilename](https://webpack.js.org/configuration/output/#outputchunkfilename) を [name].[chunkhash].js としていたところを [chunkhash].js に短縮しました。これによって bootstrap.js のサイズを gzip なしで 4KB ほどサイズを減らすこともできました。

webpack では [name] 部分にディレクトリ構造をハイフンで区切った文字列が挿入されます。例えば /client/pages/home.ts の場合は、client-pages-home のような形式で [name] に渡されます。このため、ディレクトリの階層が深くなるとその分挿入される文字列が長くなってしまいます。

さらに [chunkFilename は webpack の runtime の中に含まれる](https://webpack.js.org/configuration/output/#outputchunkfilename)ので chunkFilename が長くなるにつれてバンドルサイズが増加することになります。

### 無駄なnode_modulesの削除

置き換え可能な node_modules を探して自前で実装できるところは実装して、それ以外の大きなモジュールは小さいサイズのものを探すということを行いました。結果として置き換えられたのは以下の3つです。

### **fast-html-parser**

fast-html-parser は、 HTML の body から先頭の140文字を取得して、meta タグの description に文字列を設定する処理のために使われていました。しかし、特定の機能にしか使っていないことや多少の不具合なども含まれていたため、必要最低限の機能のみ実装した自前のパーサーで置き換えることに決めました。 自前のパーサーに置き換えることで、 パーサーのサイズを 17.1KB (gzip) から 600B (gzip) までサイズを削減できました。また [FP (First Paint)](https://developer.mozilla.org/en-US/docs/Glossary/First_paint) を 250.3ms から 172.8ms まで短縮できました。

*Before (FP: 250.3ms)*

![[chrome_devtool_fp_before.png]]

*After (FP: 172.8ms)*

### url

[url](https://github.com/defunctzombie/node-url#readme) は SSR を行なっている都合上、 Node.js とブラウザの互換性を保つために使われていました。しかし標準の URL API (WHATWG URL API) は Node.js の[ v10.0.0](https://nodejs.org/ja/blog/release/v10.0.0) から Global Object として公開されています。そのため、標準の API と置き換えることでこのモジュールを取り除きました。これにより 4KB (gzip) ほどサイズを削減できました。

### hls.js

hls.js は動画周りの処理を受け持ってくれるモジュールですが、これには機能を絞った[ Light 版のモジュール](https://github.com/video-dev/hls.js#build-tasks)があるため、そちらに置き換えてサイズを減らしました。置き換えることで 20KB (gzip) ほどサイズを削減できました。

### **Chunk 見直し**

Chunk 見直しでは、使われていないにも関わらず同じバンドルとして含まれてしまっているモジュールを洗い出し、使われているモジュールでのみ読み込まれるように修正しました。例えば、以下のような大きな定数定義をするファイルがあったとします。

```plain text
// bigConstants.js

export const Events = {
  eventName: { /* ... */ },
  // ...
};
```

さらにこのファイルを読み込んでいる a.js が以下のようになっているとします。

```plain text
import { Events } from './bigConstants';

export const doSomething = () => {
  const eventName = Events.eventName;
  // ...
};

export const doNothing = () => {
  // ...
};
```

doSomething では Events を使っていますが、 doNothing では Events を使っていないことに注意してください。

さらにこの a.js を読み込む b.js と c.js があったとします。

```plain text
// b.js

import { doNothing } from './a';

doNothing();

// c.js

import { doSomething } from './a';

doSomething();
```

この時、 b.js では doNothing のみを使用しています。 A ページ で b.js 、B ページ では c.js を使用しているとします。この場合、Tree Shaking が効かずに A ページ では不要な Events を b.js が連れてきてしまいます。

この問題を解決するためには、 a.js の doNothing を別ファイルに分けて、 b.js で読み込む必要があります。

他の例として、WINTICKET ではアイコンを以下のようにまとめて export している箇所がありました。

```plain text
// icons/index.js
export { Circle } from './circle';
export { Times } from './times';
// ...
```

使用側では以下のように使います。

```plain text
import { Circle } from './icons';
// ...
```

この場合、 Times アイコンがどこでも使われていなければ Tree Shaking が消してくれます。しかし、Times アイコンが他の場所で使われている場合、 Tree Shaking が効かずにモジュールが重複する、または cacheGroups として切り出している場合は共通モジュールが無駄に読み込まれてしまうことになります。

これは以下のように修正することで問題を解決しました。

```plain text
import { Circle } from './icons/circle';
// ...
```

今回はこのような変更をいくつか行い 50KB (gzip) ほどサイズを削減できました。

### **スクリプト読み込みの最適化**

スクリプト読み込みの最適化として実施したのは以下の施策です。

- script は async or defer で読み込む
- body 閉じタグの前で読み込んでいる async or defer 付きの script タグをできるだけ上の方で読み込む
- [src のない script タグで defer は適用されない](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)ので、別ファイルに切り出すか、HTML の下の方で読み込む

スクリプト読み込みの最適化では [async/defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) 属性を使って最適化しました。

Web における script には[クラシックスクリプト](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)と[モジュールスクリプト](https://html.spec.whatwg.org/multipage/webappapis.html#module-script)の2種類のスクリプトがあります。クラシックスクリプトは type=”text/javascript” である script で、モジュールスクリプトは type=”module” である script を差します。

[クラシックスクリプトは async/defer 属性の影響を受けるのに対し、モジュールスクリプトはデフォルトで遅延処理がなされるので defer 属性の影響を受けません](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)。 またクラシックスクリプトであっても src がついていない script タグでは効果がありません。

async 属性がついている script タグは HTML のパース処理と並列で fetch 処理を走らせ、 fetch が終わるとすぐに実行されます。defer 属性は HTML のパース処理と並列で fetch を走らせるのは async 属性と同じです。これに加えて、 defer 属性の場合は読み込み後すぐに実行されるのではなく、 HTML のパース処理が終わってから実行されます。

async/defer 属性の強みは HTML のパース処理と並列で fetch 処理を行ってくれることです。そのため、 HTML ファイルのできるだけ上の方で読み込み、fetch のタイミングを早くする方が効率が良いです。

反対に async/defer 属性を付与できないようなインラインのクラシックスクリプトについては、並列で読み込むことができないので、 HTML のパースを邪魔しないように HTML ファイルの一番下に置くことで[クリティカルレンダリングパス](https://developers.google.com/web/fundamentals/performance/critical-rendering-path)を改善できます。

モジュールスクリプトの場合は、[HTML ファイル上のどこに script タグが宣言されていたとしても、HTML が完全にパースされて依存関係がフェッチされるまで実行されません](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)。

### **画像の最適化**

画像の最適化では以下のような施策を行いました。

- 画像は[ WebP](https://web.dev/serve-images-webp/) を使う
- ページ内で使われるリソースはできるだけ[ Preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) で先読みする

キービジュアルのような固定で保存されている画像については、 WebP に変換して保存するようにしました。今回のケースでは 32KB ほど減らすことができ、JPEG で 品質 80 から 60 に変更した場合と同じくらいのサイズを削減できました。

動的な画像については社内 Saas の Hayabusa という image proxy がすでに最適化を実施しているため、ここの部分は除いて最適化を行いました。

今後は新しく AVIF というフォーマットも出てくるので期待したいです。

また Preload を使うことでリソースの優先順位を宣言できます。これにより HTML が パースされてからリソースを読み込むよりも早くリソースを読み込むことができます。

WINTICKET では React を使っており、 Image コンポーネントという画像を扱う共通のコンポーネントを用意しています。今回はこの Image コンポーネント内で [react-helmet](https://github.com/nfl/react-helmet) を使って head に preload を挿入するようにして対応しました。

今回紹介した preload は無闇に使えば無限に最適化ができるものではなく、あくまでも現在のページで必要となるリソースを早い段階で読み込んですぐに表示できるようにするものです。そのため [Chrome の DevTools では window.onload が呼ばれてから 3 秒以内にそのリソースが使われなかった場合、コンソールタブで Warning を出力します。](https://nhiroki.jp/2021/05/06/resource-loading-apis#preload)

## 改善結果

上述の通り、1ヶ月間で様々な施策を実施しました。結果として、以下のように、共通で使われる bootstrap.js のサイズを 224KB (gzip) から 120KB (gzip) まで減らすことができました。

*Before*

*After*

さらに Lighthouse の指標で見ると、モバイルのスコアが 32 点から 51 点 、 PC が 80 点から 98 点まで改善できました。モバイルのスコアをもう少しあげたいところではありましたが、大幅に改善することができ多くの学びを得られた1ヶ月でした。

*Mobile (黄緑色の線)*

*PC (黄緑色の線)*

![[026553f17addeedcc5367e228bd602a3-2048x757.jpg]]

## **内定者アルバイト期間の学び**

今回の学びとしては、「この施策によってパフォーマンスが改善するのはなぜか」といった裏付けを考えながら改善でき、結果として無駄な改善を行うことなく1ヶ月を終えることができました。

また、技術的な話として特に刺激的だったのは、fast-html-parser を自前のパーサーで置き換えるという改善に取り組んだのはとても良い経験でした。ミニマムなパーサーですが、実務で経験できたのは貴重な体験だと感じました。

他にも依存見直しで紹介したような事例は今回初めて改善した部分だったので、アーキテクチャの大切さについて改めて考えることができました。

## 最後に

最後になりますが、メンターの大塚さんといろいろな面でサポートしてくださった和田さんにはとても感謝しています。1ヶ月間ありがとうございました。