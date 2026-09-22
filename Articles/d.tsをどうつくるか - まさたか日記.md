---
タグ: []
作成日時: 2024-03-07T16:56:00
URL: https://mk.hatenablog.com/entry/2017/09/29/174339
Tags: [topic/デザインシステム/配信基盤]
---
![[og-image-1500 14.png]]

Angularが教えてくれた。

TypeScriptの学びの中で、他のライブラリの型情報をどう手に入れるかは説明されているのだけど、ライブラリとしてどのように型情報を提供するのかはあまり説明されていない。[ECMAScript](http://d.hatena.ne.jp/keyword/ECMAScript)で書かれたライブラリに後付けでindex.d.tsだけ書かれ、それが@typesに登録されているというのがよくあるケースだけども、そもそもTypeScriptで書いてる場合はどうしたらよいのか。まさか二度手間にチマチマ書きおろすわけもなかろうと調べてるうちに、事例としてとてつもなく巨大なのがあるのを思い出しました。Angularです。たぶんこいつはTypeScriptで書かれた世界最大のソフトウェアなんじゃないかなと思います。実際に、Angularはチマチマindex.d.tsを書くなんてことはしていなく、以下のようなindex.tsを用意しています。

```plain text
// index.ts
export * from './public_api';

```

このexportしている元を辿って行っても、何段階かは同じようにexport * from XXXというのが徐々に増えながら続いたりもします。そしてこの[ソースコード](http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9)を以下の[コンパイラ](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%E9)オプションで変換する。出力先は私はlibにしましたが、これはお好きなもので結構です。

```plain text
// tsconfig.json
{
    "compilerOptions": {
        "outDir": "lib",
        "declaration": true,
    }
}

```

declarationスイッチをtrueにすると、全ての.tsファイルから.jsファイルと.d.tsファイルのペアを生成します。index.tsを[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)すると、index.jsとindex.d.tsを作ってくれる。そしてこのできたindex.d.tsをpackage.[json](http://d.hatena.ne.jp/keyword/json)で明らかにすればよい。

```plain text
// package.json
{
    "main": "./lib/index.js",
    "types": "./lib/index.d.ts",
}

```

これでライブラリを利用するのが[ECMAScript](http://d.hatena.ne.jp/keyword/ECMAScript)からでもTypeScriptからでも可能になります。

昨日から日本に来てます。

[facebook.github.io](https://facebook.github.io/react/blog/2017/09/26/react-v16.0.html)

さて、炎上の末にライセンスがMITになったReactのv16がリリースされたと同時期に、Enzymeもv3がリリース。v3からsetupに変化がありました。

[Working with React 16.x · Enzyme](http://airbnb.io/enzyme/docs/installation/react-16.html)

説明とおりにしたけど動かねー。[CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)ーで引っ掛けてたパターンが全滅。@types/enzymeはエラー、さらにはReact本体も警告だしている。

```plain text
Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills
```

[React 16 JavaScript Environment.md · GitHub](https://gist.github.com/gaearon/9a4d54653ae9c50af6c54b4e0e56b583)

いろいろ読んで解決しました。

### requestAnimationFrameの対処

```plain text
// package.json部分
    "jest": {
        "moduleFileExtensions": [
            "ts",
            "tsx",
            "js"
        ],
        "setupFiles": [
            "raf/polyfill",
            "./tools/enzyme.setup.js"
        ],
        "transform": {
            "^.+\\.(ts|tsx)$": "./node_modules/ts-jest/preprocessor.js"
        },
        "testMatch": [
            "**/__tests__/*((Test|Spec)\\.(ts|tsx))"
        ]
    },

```

yarn add raf -D をしたあとで、package.[json](http://d.hatena.ne.jp/keyword/json)のjest.setupFilesに、raf/polyfillを追加すると警告は消える。rafはレガシーブラウザでrequestAnimationFrameを埋めるライブラリ。JsDOMがEnzymeの依存で入ってくる古いものだったので、試みに最新に上げてもみましたが、このrequestAnimationFrameは手当しないとダメだった。

### @types/enzymeの対処

node_modulesの中の@types/enzymeを見ると、自身の腹にnode_modules/@types/reactを抱え込んでいた。これが悪影響するので抱え込んでるnode_modulesを削除で、問題解決。デプロイのミスかな？

### Enzyme v3への[マイグレーション](http://d.hatena.ne.jp/keyword/%A5%DE%A5%A4%A5%B0%A5%EC%A1%BC%A5%B7%A5%E7%A5%F3)

[Migration from 2.x to 3.x · Enzyme](http://airbnb.io/enzyme/docs/guides/migration-from-2-to-3.html)

まず説明されてることとして、Jest起動時に走らせるsetupでEnzymeのアダプターなるものを導入する。

```plain text
// ./tools/enzyme.setup.js
// Enzyme v3かつJsDOM v11
var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);

```

「the internal implementation of enzyme has been almost completely rewritten.」とのことですが説明されてい[たこ](http://d.hatena.ne.jp/keyword/%A4%BF%A4%B3)とは私の問題には関係なく、調べて見ると次と同じ現象？

[Unable to parse selectors with numeric values in exponential notation · Issue #1155 · airbnb/enzyme · GitHub](https://github.com/airbnb/enzyme/issues/1155)

テスト対象のノードを取りやすくするために、id="0"、id="1"、...、id="7"とidに数字を使ってたのですが、form.find('#0')とすると爆発。これはidをid="zero"、id="one"、...、id="seven"と文字で振り直して、form.find('\#zero')とすればOK。その後にIDは数字で始まっちゃダメなルールだということをスレッドで教わりました。v2まで通ってたほうがバグでv3で修正されたとの結論。

### Reactライクライブラリ

EnzymeのアダプターはReactの各バージョンの挙動の違いに対応するものを整理したと同時に、将来はReactライクライブラリの対応もしたいとのことが書いてありました。PreactやInfernoってこの[マイグレーション](http://d.hatena.ne.jp/keyword/%A5%DE%A5%A4%A5%B0%A5%EC%A1%BC%A5%B7%A5%E7%A5%F3)ガイドで初めてしりましたが面白そう。material-uiやreact-routerなどエコシステムのこともあるので近日の現実解ではないけど、JSX変換や基本的な[API](http://d.hatena.ne.jp/keyword/API)のところをカバーして差し替え可能にするというのはこのEnzymeだけでなく、TypescriptやBabelにもすでにあるので将来無謀なことではないように思います。

[GitHub - developit/preact: ⚛️ Fast 3kb React alternative with the same ES6 API. Components & Virtual DOM.](https://github.com/developit/preact)

[GitHub - infernojs/inferno: An extremely fast, React-like JavaScript library for building modern user interfaces](https://github.com/infernojs/inferno)

TypeScriptの勉強が嵩じて、一個、Reactのフォーム画面を作るときのめんどくさいところをまとめた小さなライブラリを作りました。

[github.com](https://github.com/masataka-kurihara/react-form-enhancer/tree/master)

何がめんどくさいと思っていたかというと、

- フォームの一時的状態をどこに持つか悩む。Reduxストアに持つのは大げさじゃないかなあ
- Reactでフォームを便利にする系ライブラリは、UI[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)をがっつり提供することが多い。でもこれやられちゃうとそのライブラリに対応したUI[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)しか使えない。愛するmaterial-uiがつかえないじゃないか、というのも。必要なのはUI[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の[value](http://d.hatena.ne.jp/keyword/value)プロパティを設定して、onChangeをフックするだけなのに
- テスト書く時に、書きやすい作りは、Reactのプロパティの仕組みだけでやってるものかな。古いライブラリだとMixin、ちょっと前だとContextを使うのだけど、たぶんHOCでユーティリティをぶっ込んだ方がシンプルになると思った
- Reduxは当然つかう。だからReduxのストアから値をもってきて初期化、UIローカルに値を作ってから、最後にSubmitでDispatchできるようにする
- Submitはもちろん、値のバリデーションも同期だけでなく、非同期対応も必要

この辺、Reactの標準のState ＆ Propertyの仕組みに閉じた[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)で、非同期はPromiseにだけ対応と決め打ちで作ったらライブラリ本体は結構すぐできました。HOCでやってるのでEnzymeではshallowで[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)できず、mountしないとならないのがちょっと美しく無い。

ところで問題は、手元のアプリケーションの中に埋め込みでライブラリとなるクラスおよび関数を作るところではなく、その後ライブラリに切り出すところにありました。以下のトライ＆エラーで週末どっぷりでしたよ。

- そもそもNodeモジュールを作ったことがなかった
- TypeScriptの型定義ファイルの作り方がわからなかった -> angularのソースから気がつき解決！
- [Github](http://d.hatena.ne.jp/keyword/Github)に公開するのがはじめてなのでドキドキした
- やってみると、gitコマンド操作が怪しい

まだ作りも緩いのでnpmには登録してません。TypeScriptも初めて間も無くなので、まだまだ怪しくうさんくさい。もし試してみてくださる奇特な方がいらっしゃれば、以下のコマンドで。やってませんがes5に[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)してあるのでES5以上で使えるはず。この辺もまだまだ怪しい。

```plain text
$ yarn add https://github.com/masataka-kurihara/react-form-enhancer.git

```

~~今、devブランチでちょいちょい仕上げ作業をしているので、終わってmasterにマージできたらnpm登録もトライしてみたい。~~

```plain text
$ yarn add react-form-enhancer

```

10/20(PT) npmに公開しました。Try it!

[TypeScript 2.1 · TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html)

このTypeScript2.1で追加されたという keyof[演算子](http://d.hatena.ne.jp/keyword/%B1%E9%BB%BB%BB%D2)をうまくつかうと、オブジェクトのプロパティを縛るのに有用でした。

```plain text
test ('power of keyof', () => {
    // 返値のin keyofという受け方が今回の話題。今回Nは捨て型だけど、使ってT[N]とか可能。
    function checkObject<T>(props: T): { [N in keyof T]?: string } {
        return Object.keys(props).reduce(
            (prior, key) => {
                // 値をとるためにstringのキー&anyの値セットを持つものとしてasで受ける
                const value = (props as { [key: string]: any })[key];
                if (typeof value === 'number' && value > 0) {
                    return prior;
                }
                return { ...prior, [key]: `${key} is invalid.` };
            },
            {},
        );
    }
    type Target = {
        first: string,
        second: number,
        third: number,
        fourth: boolean,
    };
    const target: Target = { first: '', second: 10, third: -3, fourth: true };
    const result = checkObject<Target>(target);
    expect(result.first).toBe('first is invalid.'); // <- この"first"でIDEの補完が効く！
    expect(result.second).toBeUndefined(); // 以下、resultのプロパティ名がTargetのそれと同じ
    // result.fifth; // <- これはコンパイルエラー！素敵。
});

```

props: Tに対して、props[key]と直接できないのは、便宜上 (props as { [key: string]: any })[key]とas演算で逃げておいて、その後の戻値については、 { [N in keyof T]?: string }なので、プロパティ名は関数呼び出しの時に決めたTのプロパティ名と同じになり、[IDE](http://d.hatena.ne.jp/keyword/IDE)でも補完されるし、もちろん違う名前を使ってると[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)エラー。素敵。

上記URLの最後、関数[オーバーロード](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D0%A1%BC%A5%ED%A1%BC%A5%C9)（記事のOverloads項目）なる言語仕様について。まずは以下のようなのがあったとします。

```plain text
// .tsxファイル まずはこんなのがあったとします。
import * as React from 'react';

type P = { message: string };
type PP = { greeting: string };

function hoc(Comp: React.ComponentType<Partial<P>>): React.ComponentClass<PP> {
    return class extends React.Component<PP> {
        render () {
            return <Comp message={this.props.greeting} />;
        }
    };
}

```

たった一箇所のJSXタグのために.[tsx](http://d.hatena.ne.jp/keyword/tsx)にするが、それもまたよし。しかしなんか美しくない気がしてReact.createElementを使って書き直したかったけどはじめは理屈がわからなかったので難しかった。言語仕様を勉強してからcreateElementを見直し、簡単に例えると以下のようになっていたことがわかりました。

```plain text
test('Function Overload', () => {
    function hoge(arg: number): number; // 後方の緩い関数に型の縛りをつけたエリアス、その1
    function hoge(arg: string): string; // 後方の緩い関数に型の縛りをつけたエリアス、その2
    function hoge(arg: any): any { // <- 関数の実体。anyで受けてanyで返す。でも型が緩くてイヤ
        if (typeof arg === 'number') {
            return arg * arg;
        } else if (typeof arg === 'string') {
            return arg + ', Hi!';
        }
        return false;
    }
    expect(hoge(5)).toEqual(25);
    expect(hoge('Masataka')).toBe('Masataka, Hi!');
});

```

[hoge](http://d.hatena.ne.jp/keyword/hoge)関数はnumberを引数にとるとnumberを、stringを引数にとるとstringを返す関数です。同じようにcreateElementは、StatelessComponentを引数にとるとSFCElement、ComponentClassを引数にとるとCElementを返してました。[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)だとプリミティブ型だけで実装型がないから気にせずなんでもできるけど、TypeScriptではそのままだと型が緩くなってイヤ。なので関数の実体は一つだけど、エリアスをつけて型の縛りだけやっときましょうというもの。

React.ComponentTypeという型が、React.StatelessComponent | React.ComponentClassというユニオン型で、一度引数に渡されてきてこの型になっちゃったら、React.ComponentClassとReact.StatelessComponentのどちらの単体にもそのままでは再キャストすることはできない。

```plain text
// .tsファイル
import {
    Component, ComponentClass, StatelessComponent, ComponentType, createElement,
} from 'react';

type P = { message: string };
type PP = { greeting: string };

function hoc(Comp: ComponentType<Partial<P>>): ComponentClass<PP> {
    return class extends Component<PP> {
        render () {
            const props = { message: this.props.greeting };
            // ComponentClassかStatelessComponentのどちらかにas演算
            // 関数オーバーロードされているし、実行時はTypeScript型はなくなるのでOK
            return createElement<P>(Comp as ComponentClass<P>, props);
        }
    };
}

```

as演算は型キャストとちがって型チェックエラーが発生しないので役立ちます。他の実装系での同様機能は型があわない場合は[コンパイラ](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%E9)エラーだったりnullに変換されたりしますが、TypeScriptは実行時には[ECMAScript](http://d.hatena.ne.jp/keyword/ECMAScript)にトランスパイルされて実装型がなくなるので余計なことは起きない。ただそこにある値の正しい扱いか間違いなのか関係なくコードが書けるだけ。操作によって実行時エラーが起きるか起きないかは実装内容次第。

- 引数によって戻値内容が変化する関数をTypeScriptで型表現するには関数[オーバーロード](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D0%A1%BC%A5%ED%A1%BC%A5%C9)
- ユニオン型は、その構成要素の互換性のない単体型それぞれにキャストすることができない
- ユニオン型もしくはanyで引数を受けたら、内部ではas演算で型をあわせると辻褄があい、実行時はそもそも無問題

### 結論

ほかにもユニオン型で書いて怒られても理由がわからず、結局anyに緩くしちゃってたところの解決方法が副作用として理解できました。なるほどユニオン型を構成要素にはキャストできないのか。わかってみるとそりゃそうですね、だからユニオン型で書くのだし。見よう見まねでasをよくわからず書いてたところも、その意味が理解できた。型定義ファイルで大量に同じ名前のものが並んでるのも納得できる。

TypeScriptのユニオン型と関数[オーバーロード](http://d.hatena.ne.jp/keyword/%A5%AA%A1%BC%A5%D0%A1%BC%A5%ED%A1%BC%A5%C9)とas[演算子](http://d.hatena.ne.jp/keyword/%B1%E9%BB%BB%BB%D2)をセットで理解したら、一段上がってかなり目が開けたような気がします。理解できない型チェックエラーが劇的に減りました。