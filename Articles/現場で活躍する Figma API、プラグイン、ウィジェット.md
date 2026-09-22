---
タグ: []
作成日時: 2024-01-20T16:56:00
URL: https://zenn.dev/seya/articles/924aadf933034d
Tags: [topic/ツール/Figma]
---
こちらは [Figma 開発アドベントカレンダー](https://qiita.com/advent-calendar/2022/figma-development)1日目の記事です。

Figma は UI デザインツールとデファクトスタンダードの地位を確立してきました。

そんな Figma にはコードを使って Figma 上の情報を取得してゴニョゴニョできる手段が３つ用意されています。

API、プラグイン、ウィジェットの３つです。

これらの手段を知っていると Figma 上の要素をコードで使うものに変換したり、または日々のデザイン作業自体の効率化にもとても役立ちます。公開されているプラグインでは要求を満たせないものでも自分でコードを書けば、自分のプロダクトに 100％マッチした満足のいくものが作れることでしょう。

もし今まで知らなかったのであれば是非この記事の事例を読んでみてください。きっと仕事で役に立つアイデアが思い浮かぶと思います。

## メインターゲット

- デザインをコードに反映する作業を楽にしたいエンジニア
- 自分のデザイン作業を楽にしたいデザイナー

がちょっと何か作ってみようかな〜という気持ちになれることをゴールにしています。

## 前準備

プラグインとウィジェットのコードを書くのは基本的に TypeScript です。Figma API は HTTP リクエストが飛ばせる状況なら何でも良いですが、この記事では Node.js で書いていくのでインストールしておくと捗ります。

node.js の公式サイトからダウンロードしてもいいですし、私は最近は volta というツールを使っています。

▼ Volta ドキュメント

# [Documentation | Volta](https://docs.volta.sh/)

[The Volta guide.docs.volta.sh](https://docs.volta.sh/)

TypeScript が初めてだよ〜という方は有用なリソースが色々あるのでぜひ下記などを参考に学んでみてください。

▼ サバイバル TypeScript

# [TypeScript | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/)

[TypeScript入門『サバイバルTypeScript』〜実務で使うなら最低限ここだけはおさえておきたいこと〜typescriptbook.jp](https://typescriptbook.jp/)

▼ TypeScript Deep Dive 日本語版

# [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/)

[typescript-jp.gitbook.io](https://typescript-jp.gitbook.io/deep-dive/)

またウィジェットに関しては React っぽい書き方をします。(内部は違うものっぽいのですが)

ウィジェットをとりあえず動かすだけならそこまで React の習熟はいらないと思いますが、もしご興味湧けばガッツリ学んでみましょう。

▼ React ドキュメント

# [Getting Started – React](https://ja.reactjs.org/docs/getting-started.html)

[ユーザインターフェース構築のための JavaScript ライブラリja.reactjs.org](https://ja.reactjs.org/docs/getting-started.html)

## Figma API vs. プラグイン vs. ウィジェット

Figma に対してコードを実行する方法としては API, プラグイン, ウィジェットの３つの方法があります。

下記にざっくり思いつくそれぞれのメリットデメリットを書き出してみました。

![[d36e81713b09-20220903.png]]

それぞれに適したユースケースがあるので、自分がやりたいこと・課題に応じて適切な手段を選んでいけると良いでしょう。

次に API、プラグイン、ウィジェットそれぞれの現場での活用事例や、作っていく上でのテクニックなどをご紹介していきます。

## 💻 API を使ってスタイルをコードで使える形に変換しよう

まずは API です。

▼ Figma API のドキュメント

# [Figma](https://www.figma.com/developers/api)

[www.figma.com](https://www.figma.com/developers/api)

最近仕事で API を使って Figma で作ったライブラリからスタイルを取得し、コードで扱える形に変換するスクリプトを書いたので、その例を紹介していきます。

## トークンを取得する

Figma API を実行するためには Figma のアクセストークンを取得する必要があります。

(OAuth ２ で Figma ログインする方法もあります。)

トークンを取得するにはまず Figma を開いて右上のアイコンを押し「設定」を押します。

![[a01952d474a4-20230911.png]]

スクロールすると「個人アクセストークン」というセクションがあるので、ここにトークンの名前をつけて Enter を押すと新しいトークンが発行されます。

後ほど使うので大事にコピって保存しておいてください。

※自分が権限がある Figma ファイルの読み書きができてしまうので外部には漏れないように注意しましょう！

## ファイル ID の取得

続いて API を実行したい対象のファイル ID を取得します。

ファイル ID は URL に ID が使われているのでそれをコピーするだけです。

```plain text
https://www.figma.com/file/ZgWqWx2XXXXXXXXXXXXXX/

```

みたいな URL の `file/` より後ろの部分です。

デスクトップアプリとして Figma を開いている場合はタブの部分を右クリックして「リンクをコピー」を押せば URL がコピーされます。

## API を実行してみる

それでは先ほど取得したトークンを使って API を実行してみます。

```plain text
const baseUrl = 'https://api.figma.com/v1/';
const figmaToken = '先ほど取得した Figma トークン';
const fileId = 'さっき取得したファイルID';

const fetchStylesData = async () => {
  const res = await fetch(`${baseUrl}files/${fileId}/styles`, {
    headers: {
      'X-Figma-Token': figmaToken,
    },
  });
  return await res.json();
};

fetchStylesData().then(console.log);

```

これを実行すると無事コンソールに Figma ファイルのスタイルのデータが表示されていると思います！

ただこのデータにはスタイルの ID や type が取得できているだけで具体的なプロパティは取れていません。(font-size とか color とか)

なので、次に取得した ID を元にスタイルのノードを取ります。

```plain text
const fetchStyleNodes = async nodeIds => {
  const res = await fetch(`${baseUrl}files/${fileId}/nodes?ids=${nodeIds.join()}`, {
    headers: {
      'X-Figma-Token': figmaToken,
    },
  });
  return await res.json();
};

```

### 取ったデータを整形する

ここからはもはやあまり Figma API 関係なくただのプログラミングです。

```plain text
// タイポグラフィのスタイルの ID の配列を取得し
const typographyStyleIds = styles.filter(style => style.style_type === 'TEXT').map(style => style.node_id);

// 具体的なデータを取得します
const typographyStyleData = await fetchStyleNodes(typographyStyleIds);

```

こうやって取得したデータを元にコードのような文字列を組み立ててファイルを書き込みます。

```plain text
const writeTypographyStyles = async typographyStyleData => {
  const typographyStyles = Object.values(typographyStyleData.nodes).map(node => {
    return {
      // 私が働いているところでは '/' 区切りのネーミングルールなので、これで分割して '-' で繋いでいます
      // この辺りはご自身の Figma のネーミングルールでよしなに調整してください
      styleName: node.document.name
        .split('/')
        .join('-')
        .toLowerCase(),
      ...node.document.style,
    };
  }); // ここは弊社で使っている stitches というライブラリに合わせた書き方になっています。

  // ご自身の CSS の書き方でいい感じに書き換えてください！
  const stitchesString = `
type TypographyNames = ${typographyStyles.map(style => `'${style.styleName}'`).join(' | ')};

export const typographySettings = (value: TypographyNames) => {
      switch (value) {
${typographyStyles
  .map(style => {
    return `        case '${style.styleName}':
          return {
            fontFamily: "${style.fontFamily}",
            fontSize: "${style.fontSize / REM_SIZE}rem",
            letterSpacing: ${style.letterSpacing},
            lineHeight: "${style.lineHeightPx / REM_SIZE}rem",
            fontWeight: "${style.fontWeight}"
          };`;
  })
  .join('\n')}
        default:
          return {
            fontSize: 14,
          };
      }
    }
`;

  // 文字列ができたら最後にファイルに書き込みましょう！
  fs.writeFileSync(`./src/styles/typographySettings.ts`, stitchesString);
};

```

Figma Tokens -> Style Dictionary -> コード、みたいなパターンもよく見ますが、「そこまでするほどでもないな...」という時にお試しください。

### API のその他の応用例

上記以外にもアイコンや画像を一気に書き出すのにも便利です。

▼ Figma からアイコンの画像を生成して GitHub の PR を作る Widget の作り方

アイデア次第で色んなことが実現できそうです💪

### 開発を楽にするためのライブラリ

非公式ですが Figma API を操作できる fimga-js というライブラリがあります。

具体の使用例としては次のような感じで、より楽に Figma API を操作できる & 型もつくのでぜひ試してみてください。

```plain text
import * as Figma from 'figma-js';

const token = 'XXXXXXXXXX';

const client = Figma.Client({
  accessToken: token,
});

client.file('file-id').then(({ data }) => {
  console.log(data);
});

```

## 🔌 プラグイン

API のお次はプラグインです。

プラグインと言えばコミュニティで数々の便利なプラグインがありますが、もちろん自分の組織専用に作ることができます。

公開されている事例としては LINE さんが作っていたり

▼ 社内のデザイナーの業務をサポートする LDSG Figma Plugin を作りました

海外でも Netflix などが自社のデザインシステム専用のプラグインを作っていたりします。

▼ Guidance over governance - Jen Yee, Luca Orio (Schema 2021)

### React コードを生成するプラグインを作ってみた

ちょっと全部のコードを載せると長過ぎるので記事とレポジトリだけ貼っていくのですが、Figma から実際のコードに反映するためのプラグインの開発をしてみました。

▼ GitHub Figma to React Component

▼ 作ろう！自分だけの Figma コード生成機✨

また、これは自分が所属している組織でしか試していないですが、このプラグインを更に応用して諸々のファイル生成をして PR を作るように改良したりもしました。

正直このプラグインに関しては実運用で軌道に乗せるには様々な課題があるのですが、自分の組織固有のものとしてハードコードしまくってよければそれなりに有用なものも作れる感覚もあるのでぜひトライしてみてほしいです。

### どうやって配布するか

めちゃくちゃざっくり事例を紹介したところで、次に実際に作った場合に他のチームメンバーにも使ってもらえるようにする方法をご紹介します。

自社専用のプラグインを作ったとして、チームの人全員で使う方法は大きく３つあります。

1. Organization プランにして private プラグインを使う

Organization プランの場合 private なプラグインを作ることができます。

ただ Organization プランは一名あたり $45 と中々お高く、Private プラグインのためだけに Organization プランにするくらいならこれから紹介する打ち手を取った方がいいと思います。

あくまで Organization に他の理由で既にしている時についでに使えるくらいの感覚の方が合っているかなと。

2. 使う人各自でコードをダウンロードして使う

プラグインを作ってビルドした JS コードとプラグインのマニフェストファイルを各自でダウンロードなり GitHub から pull するなりして、Figma 上から下記のようにマニフェストファイルを読み込めば使えるようになります。

これのデメリットとしてはアップデートする度に都度ダウンロードしてもらう必要があるというところです。Git で pull スタイルでみんな使えるならそこまで手間にもならないかもしれません。

3. コミュニティに公開しちゃう

コミュニティに公開しちゃえば誰でも使えますので、そんなに機密感がないプラグインならこの方法が良いのではないかと思います。

ただ、こういった組織固有のプラグインが Figma の審査が通るか、私は試したことがないのでそこは自己責任でお願いします。もし通ったら Twitter なりで呟いた後私(@sekikazu01)にメンションなり DM なりで教えてくださいぜひ。

### ※プラグインの注意点

実際に作る前の注意点として「プラグインはViewer(閲覧)権限のみだと実行できない」ということです。

組織によってはエンジニアが閲覧権限のみだったりすることはあるでしょう。なのでエンジニアがメインのユーザとなるプラグインではお金がかかる、というのは事前に認識しておくべきでしょう。

(都度ファイルを Duplicate すれば無料でも使えなくはないですが流石にめんどくさすぎるので...)

### プラグインの作り方

基本的な作り方は割とリソースが溢れているので良さげなもののリンクをいくつか貼っておきます。

▼ Figma プラグインの作り方

▼ 公式チュートリアル(英語)

▼ 公式チュートリアル動画(英語)

ライトに始めるならとりあえずプラグイン -> 開発 -> プラグインの新規作成を選んでいけばミニマムなプロジェクトが作られるのでそこから開発してみるといいでしょう。

という感じで入門的な内容を他のサイトに丸投げしたところで、ここではもう少しディープな例を書いていこうかなと思います。

### Figma プラグインのアーキテクチャ

初めに認識しておくべきこととして、プラグインを作る時には「サンボボックススレッド」と「UI スレッド」という二つのコードが走る環境があるということです。

引用: [https://zenn.dev/ixkaito/articles/how-to-make-a-figma-plugin](https://zenn.dev/ixkaito/articles/how-to-make-a-figma-plugin)

前者のサンドボックススレッドでは Figma のデータに触ることができます。対して UI スレッドでは Figma のデータには直接触れないですが、プラグインの UI (HTML + CSS で作る)を表示したり、外部にリクエストを送ったりブラウザの API を使えたりします。

それぞれ役割とアクセスできるデータ・APIが違うので、それぞれで必要なものを交換しつつプログラミングしていきます。

▼ サンドボックスから UI へのデータの渡し方

こんな感じで送ります。

```plain text
figma.ui.postMessage({
    type: "event",
    data: "これを受け取って！",
});

```

そしたら UI 側では onmessage という関数で受け取りを検知できます。

```plain text
<html>
  <body>
    <script>
      onmessage = (event) => {
        if (event.data.pluginMessage.type === 'event') {
	  // これを受け取って！ がログ出力
	  console.log(event.data.pluginMessage.data)
        }
      };
    </script>
  </body>
</html>

```

▼ UI からサンドボックスへのデータの渡し方

UI からは `parent.postMessage` という関数を使います。

```plain text
<script>
  parent.postMessage({ pluginMessage: { type: "hoge", content: "aaaaa" } }, '*');
</script>

```

そしてサンドボックスでは `figma.ui.onmessage` を使って通知を受け取ります。

```plain text
export type MessageType = 'notify-something';

figma.ui.onmessage = (msg: { type: MessageType, content?: string }) => {
  if (msg.type === 'notify-something') {
    figma.notify('受け取ったぜ！');
    figma.closePlugin();
  }
};

```

それぞれで何ができて何ができないのかを理解して適切なコーディングに繋げるのが肝要です！ぜひ覚えておきましょう。

それでは、ここからは私がプラグイン開発していた時に沼って手に入れた知見をいくつか共有していこうと思います。

### UI スレッドを使いたいが UI は何も表示させたくない場合

UI スレッドでしかできない処理はたくさんあるので(主にブラウザの API に関わるものや外部にリクエストを飛ばすなど)、そちらで処理を行いたいが UI 自体は特にいらない、というケースは意外とよくあります。

そんな時は基本的に `showUI` メソッドで visible: false を指定すれば大丈夫です。

```plain text
figma.showUI(__html__, {
    visible: false,
});

```

が、これでなぜか動かない処理が稀によくあります(原因不明)

そんな時はものすごい遠くに飛ばすという手法を取れば大丈夫です。これぞ発想の勝利というやつです。

```plain text
figma.showUI(__html__, {
  visible: true,
  width: 0,
  height: 0,
  position: { x: 999999999999, y: 999999999999 },
});

```

### クリップボードにコピー

普通のブラウザ環境であれば navigator.clipboard という API を使えば実現できるのですが、Figma の UI 環境では存在しないのでちょっと古めの方法を取る必要があります。

```plain text
// textarea を作ってコピーしたいテキストを value にセット
let textArea = document.createElement('textarea');
textArea.value = textToCopy;

// 一応画面外に飛ばしとく
textArea.style.position = 'fixed';
textArea.style.left = '-999999px';
textArea.style.top = '-999999px';
document.body.appendChild(textArea);

// select して実行
textArea.focus();
textArea.select();
document.execCommand('copy');

```

ちなみに MIME type も指定したい場合はこんな感じです。

```plain text
function copyListener(data, e) {
  e.clipboardData.setData('your-mime-type', data);
  e.preventDefault();
}

const listener = copyListener.bind(this, JSON.stringify(obj));
document.addEventListener('copy', listener);

try {
  document.execCommand('copy');
} finally {
  document.removeEventListener('copy', listener);
  const msg = { type: 'notify-copy-success' };
  parent.postMessage({ pluginMessage: msg }, '*');
}

```

### 画像の取り扱い

Figma プラグイン環境にて画像は Fills(背景)の一タイプとして扱われています。

なのでこんな感じで画像かどうかを判定して

```plain text
const isImage = (node: RectNode | FrameNode) => {
    return (
      Array.isArray(node.fills) &&
      node.fills.length > 0 &&
      (node.fills[0] as Paint).type === 'IMAGE'
    );
}

if(isImade(node)) {
  const imagePaint = (node.fills as Paint[])[0] as ImagePaint;
}

```

そしてそうやって取得した imagePaint は具体的な画像のデータは持っておらず、imageHash というものを使って更に取得する必要があります。

参考: [https://www.figma.com/plugin-docs/api/Paint/](https://www.figma.com/plugin-docs/api/Paint/)

```plain text
const image = figma.getImageByHash(imagePaint.imageHash || '');
// これで画像データのバイナリが取得できる
const bytes = await image?.getBytesAsync();

```

更にアドバンスドな内容ですが、画像の元のサイズを取得するには画像が持っている Transform から計算する必要があります。Transform はアフィン変換という座標の拡大縮小や平行移動などを表現する2次元の配列として定義されて、私も実はよくわかっていないですがとりあえず下記のように書けばお望みの値が手に入ります。

```plain text
function extractTransformValues(transform?: Transform) {
  if (transform) {
    return {
      scaleX: transform[0][0],
      scaleY: transform[1][1],
      translateX: transform[0][2],
      translateY: transform[1][2],
    };
  } else {
    return { scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 };
  }
}

const { scaleX, scaleY, translateX, translateY } = extractTransformValues(
  imagePaint.imageTransform
);

const originalWidth = node.width / scaleX;
const originalHeight = node.height / scaleY;

```

更にアドバンスドな内容として、画像が Crop (トリミング)されていたとしても、上記の getImageByHash で手に入るデータはトリミングされる前のオリジナルなデータです。なのでトリミングされた状態にするにはなんと自分で実装する必要があるのですが(Figma プラグイン頑張ってくれ)、それをするためには Canvas を使う必要があり、Canvas は UI スレッドにしかないので UI スレッドにデータを飛ばして次のような処理を行います。

```plain text
async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = (error: Event | string) => reject(error);

    image.src = url;
  });
}

export async function transformImage(data: any) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const url = URL.createObjectURL(new Blob([data.imgByteArray]));
  const image = await createImage(url);

  const {
    xOffset,
    yOffset,
    width,
    height,
    imageWidth,
    imageHeight,
    scaleMode,
  } = data;

  if (scaleMode === ScaleMode.Crop) {
    const xScale = image.width / imageWidth;
    const yScale = image.height / imageHeight;

    canvas.width = width;
    canvas.height = height;

　　　　　　　　// Canvas の drawImage で Crop することができる(ただし画質は幾分落ちる模様)
    ctx?.drawImage(
      image,
      xOffset * xScale,
      yOffset * yScale,
      width * xScale,
      height * yScale,
      0,
      0,
      width,
      height
    );
  } else {
    canvas.width = image.width;
    canvas.height = image.height;

    ctx?.drawImage(image, 0, 0);
  }

  const base64Str = canvas.toDataURL('image/png');

  canvas.remove();

  return base64Str;
}

```

### JSX で Figma に描画

10/7 のアップデートで JSX で Figma のレイヤーを描画できる API が追加されていました。

例えば、従来は画像のノードを作る時はこんな感じで若干直感的でない感じだったのですが、

```plain text
const node = figma.createFrame();
node.fills = [
    {
      type: 'IMAGE',
      imageHash: figma.createImage(msg.imageData as Uint8Array).hash,
      scaleMode: 'FILL',
    },
];

```

この JSX の API が生えたことによりこんな感じ作れます。いいね！！

```plain text
const { Image } = figma.widget

const node = await figma.createNodeFromJSXAsync(
  <Image src="https://picsum.photos/200" width={200} height={200} />
)

```

ちなみに[型](https://github.com/figma/widget-typings/blob/main/index.d.ts#L54)を見るに現状は次の１１コンポーネントがある模様です。

Span もテキストの一部だけスタイル変えるみたいなのがシンプルに記述できて重宝しそうです。

- AutoLayout: AutoLayout
- Frame: Frame
- Image: ImageComponent
- Rectangle: Rectangle
- Ellipse: Ellipse
- Text: TextComponent
- SVG: SVG
- Input: InputComponent
- Line: Line
- Fragment: Fragment
- Span: Span

### ライブラリを使う

Figma Plugin Helper functions というめちゃくちゃ便利なライブラリがあり、知らないと損することも多々あるので何かしら実現したいことがめんどくさすぎる場合に見てみてください。

<p align="center">

<img src="[https://storage.googleapis.com/zenn-user-upload/2c27ffee7d78-20220901.png](https://storage.googleapis.com/zenn-user-upload/2c27ffee7d78-20220901.png)" width="200">

</p>

私が使ったことのある例で言うと、parseTextStyle という関数が大変便利でした。

Figma では一つのテキストノードの中に複数のテキストスタイルがあり、それを区別して扱いたい場合に Figma プラグイン素の API だと getRangeXXX という関数でどこからどこまでのスタイルは何かを取る、という関数しか用意されておらず地獄のような For loop を書かなければいけないのですが、それをやってくれたのがこのライブラリの parseTextStyle です。

こんな感じで使うとスタイルが違うところで分割された配列になります。感謝。

```plain text
const textStyles = parseTextStyle(node, 0);

```

### 開発者ツールでデバッグ

Figma ではブラウザ同様に開発者ツール(Chrome の devtool)が開けます。

開き方はブラウザと同じショートカットの Option + ⌘ + I で開けます。

あと小話ですがここから Figma 自体の UI の実装を眺めるみたいな楽しみもできます。

### 先人のコードを見る

私含め多くの人が Figma プラグインを GitHub 上で公開してくれています。

私もどうやって実現するか分からない動作がある時、該当の動作をするプラグインがソースコードを公開しているか確認して、コードを読む、ということをして解決した経験が何度もあります。

もし公開している場合は Figma コミュニティ上のプラグインのページにリンクが貼ってあることが多いです。

リンクがなくても GitHub でプラグイン名で検索すると意外と出てきます。

### Discord コミュニティに入る

作っていると時にどうやって実現すればいいか皆目見当がつかない時があるでしょう。そんな時に Figma の Discord 内に開発用のスレッドがいくつかあるので、ここで探したり質問をすると答えが見つかったりします。(英語 Only)

あと Figma の中の Developer Advocate もいるのでいい感じの答えが返ってくる可能性が高いです。

▼ Discord コミュニティの招待リンク

### コミュニティ公開時のテクニック

申請には最大 2 週間かかります。

私の場合初めて出したプラグインは 2 週間、その後出したものは 3、4 日で Approve されました。

実は後からのアップデートには審査が入らないで即時 Publish されます。

なので、ミニマムな機能でとりあえず申請しちゃって、待っている間によりリッチな機能の開発をすると初公開までのリードタイムを短くすることができます。

若干こすいテクニックですがお急ぎの場合にお試しください！

### アップデートについて

アップデートをした時にどれくらい即時で実行されるかという話ですが、過去に自分がアップデートした時、数分後に Twitter でそのアップデートに気づいた人を観測したので割と即時なのだと思います。

開発者ツールを開いてリクエストを見てみると次のようなプラグインの情報を取るリクエストが確認できます。

おそらくプラグインを実行する時はアップデートがあるかチェックして、あったら再度プラグインのスクリプトを取得して実行みたいな作りになっているのではないかと思います。

なので、アップデートした時のラグとかはあまり気にしなくて大丈夫でしょう。

## 🏠 ウィジェット

ウィジェットはしばらく FigJam のみの機能でしたが、今年(2022 年)の６月に Figma でも使えるようになりました！

ウィジェットは扱えるデータの操作はプラグインと同じですが、「デザインファイルに設置できて誰でも使える」と言うのがプラグインとは異なる点になります。

これによってワンクッションアクションを削減したり、定期実行して表示内容を自動で変えたりなどできることの幅が広がりました。

またチェキが撮れる Widget などおふざけにも活躍間違いなしです。

### 実際に現場で作った例: アイコンをアップデートする Widget

実際に仕事で作ったウィジェットの例として「アイコンを作ったら自動でコードにも反映するウィジェット」がありますので紹介します。

ウィジェットとしてやっていることは至極単純で、クリックされたら GitHub の API を叩いているだけです。

以下がウィジェットのコードで、

```plain text
const githubIconImg = 'data:image/png;base64,...';

const { widget } = figma;
const { Text, AutoLayout, Image } = widget;

function Widget() {
  return (
    <AutoLayout
      fill={[
        {
          type: 'solid',
          color: '#fff',
        },
      ]}
      padding={{ vertical: 12, horizontal: 20 }}
      verticalAlignItems="center"
      spacing={8}
      cornerRadius={4}
    >
      <Image src={githubIconImg} width={24} height={24} />
      <Text
        fontSize={20}
        onClick={() => {
          return new Promise(resolve => {
            figma.showUI(__html__, { visible: false });
            figma.ui.postMessage({ message: 'sync-github' });
          });
        }}
      >
        アイコンを GitHub と同期
      </Text>
    </AutoLayout>
  );
}

widget.register(Widget);

figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === 'close-plugin') {
    figma.notify('synced to GitHub👍');
    figma.closePlugin();
  }
};

```

ボタンがクリックされた時に下記の HTML が読み込まれて GitHub API にリクエストをしています。

```plain text
<script>
  window.onmessage = event => {
    if (event.data.pluginMessage.message === 'sync-github') {
      const invokeWebhookUrl = 'https://api.github.com/repos/{YOUR_ORG_NAME}/{YOUR_REPO_NAME}/dispatches';
      const githubPAT = ''; // set your GitHub access token

      fetch(invokeWebhookUrl, {
        method: 'POST',
        body: `{"event_type": "your-webhook-title"}`,
        headers: {
          Authorization: 'token ' + githubPAT,
        },
      }).then(() => {
        parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*');
      });
    }
  };
</script>

```

この辺りのコードは GitHub にも公開しているのでよければご参照ください。

こうやってリクエストを受けた GitHub 側ではアイコンを生成するスクリプトを実行しています。

その具体的な中身は社のテックブログに書いたのでご参照ください！

実際に仕事で作ってみた感想として思ったプラグインと比較した時のウィジェットのメリットとして以下のことを感じました。

- 他の人にインストールさせる必要がない
- プラグインを探して開くというワンステップがいらなくなる

`そのファイルを使う人誰もが実行する` ようなアクションがある場合に輝くのかなと感じています。

### 定期実行の仕方

※ こちら後から気づいたのですが、他のプラグイン/Widget を実行すると止まってしまうようです。またなんかすごいラグくなります。

触らずとも定期実行みたいなことをしたいことがあると思います。

waitForTask という関数を使ってその中で定期実行させることで実現できます。

```plain text
useEffect(() => {
  waitForTask(
    new Promise(resolve => {
      setInterval(() => {
        tick();
        resolve('Date updated');
      }, 1000);
    }),
  );
});

```

参考: [https://github.com/rak-shit/Figma-Clock-Widget/blob/master/code.tsx](https://github.com/rak-shit/Figma-Clock-Widget/blob/master/code.tsx)

### ウィジェットを作り始めるのに便利なテンプレート

ウィジェットを作り始める時一番シンプルなやり方は Figma 上で右クリックしてこんな感じでポチポチ選んでいくことです。

これでもシンプルなウィジェットであれば必要十分なのですが、ビルドが速い Vite にしたいな〜とか UI 部分 React で作りたいな〜などを感じた際には Figma の Developer Advocate の方が作っているテンプレートが便利です。

使い方は至極シンプルでコマンドラインから `npm init @figma/widget` を実行して質問にポチポチ答えていくだけです。

後は Figma 上から先ほど作られたプロジェクトの manifest.json を読み込めば動かせます。

ウィジェットは Figma に登場したのが比較的最近なのもあってまだまだ本格的なユースケースが発掘されていないのかな感があります。ぜひ社内用でもコミュニティでもどんどんアイデアを出して活用していきましょう💪

## おわりに

以上現場でも大活躍間違いなしの Figma の API、プラグイン、ウィジェットの作り方や事例について紹介してきました。

アイデア次第でデザイン作業、コーディング作業をより効率化したり、おもしろウィジェットを作って職場の雰囲気をいい感じにすることができます。

プログラミングスキルも(作りたいものにもよりますが)そこまで求めらないのでぜひ気軽にチャレンジしてみてください！

それではよき Figma ライフを〜！

## 参考