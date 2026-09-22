---
Created: 2021-01-15T18:01:00
URL: http://mk.hatenablog.com/entry/2019/12/04/202929
Updated: 2021-01-15T18:01:00
Tags: [topic/技術/ビルドツール]
---
昨年夏ぐらいから、TSLintは終わらせてESLintでTypeScriptプロジェクトも対応していこう、という世界的な流れになってました。「脱TSLint」とか「ESLintでTypeScript」とかググればその辺の記事が出てきます。当時早速私も乗っとこうとESLintに移行しようとしたのですが、対応レシピが複雑で未成熟なことからすぐに諦めて延期していました。今回、手元で新しいプロジェクトを始めるにあたってESLintを試してみたのですがスッキリいい感じ。機は熟した、ESLintでOK。

### ESLintとTypeScriptのセットアップ

```plain text
{
    "scripts": {
        "lint": "eslint src --ext .ts,.tsx"
    },
    "eslintConfig": {
        "extends": ["airbnb", "plugin:@typescript-eslint/recommended"],
        "plugins": ["@typescript-eslint"],
        "parser": "@typescript-eslint/parser",
    },
    "devDependencies": {
        "@typescript-eslint/eslint-plugin": "^2.10.0",
        "@typescript-eslint/parser": "^2.10.0",
        "eslint": "^6.7.2",
        "eslint-config-airbnb": "^18.0.1",
        "eslint-plugin-import": "^2.18.2",
        "eslint-plugin-jsx-a11y": "^6.2.3",
        "eslint-plugin-react": "^7.17.0",
        "eslint-plugin-react-hooks": "^2.3.0",
        "typescript": "^3.7.2"
    }
}

```

devDependenciesにある一連のものをインストールしますが、前提としてはTypeScriptでReactアプリを書いてます。基本は厳しいことで無条件に信奉している[AirBnB](http://d.hatena.ne.jp/keyword/AirBnB)にTypeScriptの手当を最低限だけ。プロジェクトはJSの混入無し前提。全てTSと[TSX](http://d.hatena.ne.jp/keyword/TSX)で書いてます。

ここから先は settings と rules をこまめに調整しています。

### Unable to resolve path to module 対策

まず必要だったのはimport文が「Unable to resolve path to module」と全滅なところ。これは無設定ではJSしかimport先を追いかけないためで、以下を追加しています。

```plain text
{
    "eslintConfig": {
        "settings": {
            "import/resolver": {
                "node": {
                    "extensions": [".js", ".json", ".ts", ".tsx"]
                }
            }
        }
    }
}

```

これは、みたまま通りimport文でソースファイルの拡張子が省略されているところを補完する候補を増やすもの。TSと[TSX](http://d.hatena.ne.jp/keyword/TSX)が必要で、その上でnode_modulesの下にインストールされているものを読み込むためにJSが必要。あとはJsonModuleを有効にしている際には[JSON](http://d.hatena.ne.jp/keyword/JSON)も加えます。よってこのようになりました。

### Expected a line break after this opening brace 対策

以下のようなコードで問題があったのを記述で解決します。

```plain text
<Button icon={props.icon} onClick={() => props.dispatch(props.action)}>OK</Button>

// Must use destructuring props assignmenteslint(react/destructuring-assignment)

```

Reactのプロパティを展開する際に、props.* のように使ってしまうと react/destructuring-assignment に引っかかる。ならばと、以下のように書き直します。

```plain text
const { icon, dispatch, action } = props;

<Button icon={icon} onClick={() => dispatch(action)}>OK</Button>

```

これで「Must use destructuring props assignmenteslint」とは言われなくなりますが、今度は「Expected a line break after this opening brace」と言われるようになる。プロパティをオブジェクトに展開しているところで、1行で書いちゃだめだと。。。改行入れればいいだけなのですが、どうにも縦長になってしまうので object-curly-newline はオフにしました。該当箇所は以下の通り。

```plain text
{
    "eslintConfig": {
        "rules": {
            "object-curly-newline": ["off"]
        }
    }
}

```

### [TSX](http://d.hatena.ne.jp/keyword/TSX)への対応

無設定では、JSXタグが、拡張子JSXのファイルでだけ許すという設定になっています。しかし私は[TSX](http://d.hatena.ne.jp/keyword/TSX)オンリーなことにしましたので、以下の手当。

```plain text
{
    "eslintConfig": {
        "rules": {
            "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }]
        }
    }
}

```

一般的には、[".jsx, ".[tsx](http://d.hatena.ne.jp/keyword/tsx)"]とJSXも残しておくのでしょうね。私には不要でしたが。

### React[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)プロパティの型問題

JSで書く際には型が無いので、React[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のプロパティについては prop-types ライブラリを用いていちいちプロパティとして受け入れる値の定義を示します。しかしTypeScriptで書くとこれがいらない。[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)プロパティについてがっちりTypeScript型システムでガードされるので[AirBnB](http://d.hatena.ne.jp/keyword/AirBnB)は許さずとも、私は検出をオフにします。

```plain text
{
    "eslintConfig": {
        "rules": {
            "react/prop-types": ["off"]
        }
    }
}

```

### devDependencies問題

私は、テストやビルドに用いるための外部ライブラリは全て devDependencies に置くようにしてますが、テストで用いるEnzymeやStoryBook関連のライブラリは手当しないとdevDependenciesではなくdependenciesに置くよう「'enzyme' should be listed in the project's dependencies, not devDependencies」などと言われます。テストとStoryBookはパスパターンで除外しておきます。

```plain text
{
    "eslintConfig": {
        "rules": {
            "import/no-extraneous-dependencies": ["error", {
                "devDependencies": ["**/*.test.ts*", "src/stories/**/*"]
            }]
        }
    }
}

```

私は上記だけにしましたが、あとは `**/*.spec.ts*` も必要でしょうかね。末尾 `.ts*` としているのは、テストにTSだけでなく、Enzymeで書く[TSX](http://d.hatena.ne.jp/keyword/TSX)があるからです。[正規表現](http://d.hatena.ne.jp/keyword/%C0%B5%B5%AC%C9%BD%B8%BD)使えないのでこうなりました。。。と、もしかして[正規表現](http://d.hatena.ne.jp/keyword/%C0%B5%B5%AC%C9%BD%B8%BD)書けるのかな？わからず。

### 書き癖で直したく無いもの

```plain text
{
    "eslintConfig": {
        "rules": {
            "@typescript-eslint/explicit-function-return-type": ["off"],
            "react/jsx-props-no-spreading": ["off"]
        }
    }
}

```

色々考えましたが、@typescript-eslint/explicit-function-return-type と react/jsx-props-no-spreading は自分の書き癖でも直したくなかったのでOFF。

```plain text
// イベントハンドラでも関数戻値の型を書く？次の行では「:void」をあえて書いてみましたが…
<Button icon={icon} onClick={(): void => dispatch(action)}>OK</Button>

// 高階関数や、カリー化した関数では戻値の型を書くのスペース的に難しい
const combineReducer = <S, P>(reducers: ReducerFactory<S, P>[]) => (initialState: S) => {
    const combineded = R.reduce<Reducer<S, P>, Reducer<S, P>>(
        (previous, current) => (state, action) => current(previous(state, action), action),
        (state) => state,
        R.map((r) => r(initialState), reducers),
    );
    return React.useReducer(combineded, initialState);
};

```

まず、@typescript-eslint/explicit-function-return-type の方ですが上記の２つの例のように[イベントハンドラ](http://d.hatena.ne.jp/keyword/%A5%A4%A5%D9%A5%F3%A5%C8%A5%CF%A5%F3%A5%C9%A5%E9)・[高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4)・カリー化した関数では戻値の型を書くのがスペース的に美しく無い。またこれ以外にも関数戻値をTypeScriptの[型推論](http://d.hatena.ne.jp/keyword/%B7%BF%BF%E4%CF%C0)エンジンに任せなければならない稀有な場合もある。よって戻値は[型推論](http://d.hatena.ne.jp/keyword/%B7%BF%BF%E4%CF%C0)エンジンにおか任せするのが吉と思います。おかしなコード書いたらちゃんとトランスパイル通らないし。

```plain text
<Component {...state} />

// もしくは
<Component {...{ prop1, prop2, prop3, prop4, prop5 }} />

```

React[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)にたくさんの属性引き渡さないといけない時に、どうしてもこういうオブジェクトスプレッド記法で書きたいです。そうしないとここに5個も10個も書かねばならない時もある。上記例での後の方の書き方だけ許すようなルールのオプションもあるのですが、どのみちめんどくさいので、 react/jsx-props-no-spreading はオフ。

### グローバルオブジェクトの対応

```plain text
{
    "eslintConfig": {
        "env": {
            "browser": true,
            "jest": true
        }
    }
}

```

宣言無しに用いるグローバルオブジェクトでLintエラーを出さないために、env設定を行います。私の場合はJestを用いることでdescribeやitなど、domを直[接触](http://d.hatena.ne.jp/keyword/%C0%DC%BF%A8)るようなコードを書く場合には、windowやdocumentのために、それぞれbrowser: trueやjest:trueを設定します。

### Fragmentの書き方

[AirBnB](http://d.hatena.ne.jp/keyword/AirBnB)のデフォルトでは、React.Fragmentの書き方が省略記法を推奨されてます。

```plain text
<>{ /*ReactElementの配列など*/ }</>

// 以下はできない
<key={key}>{ /*ReactElementの配列など*/ }</>

```

これはさっぱりした見かけで私は不慣れながら書いてりゃ見慣れるのですけど、keyを設定したりができない。

```plain text
<React.Fragment key={key}>{ /*ReactElementの配列など*/ }</React.Fragment>

```

省略せずにFragmentを書く方が良いかな。react/jsx-fragments で element をオプション指定。

```plain text
{
        "rules": {
            "react/jsx-fragments": ["error", "element"]
        }
    }
}

```

### 結果

もともとTSLintで[AirBnB](http://d.hatena.ne.jp/keyword/AirBnB)用いて書いてたから、書き癖を重んじてもルールもいじるところ少なくてスムーズに導入できました。ESLintへの移行部分としては[プラグイン](http://d.hatena.ne.jp/keyword/%A5%D7%A5%E9%A5%B0%A5%A4%A5%F3)設定するだけなので難しいことがない。自分ルールとしてインデントは全部スペース4つと決めています。

完成は以下の通り。ただしESLintに関係するところだけです。

```plain text
{
    "scripts": {
        "lint": "eslint src --ext .ts,.tsx"
    },
    "eslintConfig": {
        "extends": ["airbnb", "plugin:@typescript-eslint/recommended"],
        "plugins": ["@typescript-eslint"],
        "parser": "@typescript-eslint/parser",
        "env": {
            "browser": true,
            "jest": true
        },
        "settings": {
            "import/resolver": {
                "node": {
                    "extensions": [".js", ".json", ".ts", ".tsx"]
                }
            }
        },
        "rules": {
            "@typescript-eslint/explicit-function-return-type": ["off"],
            "import/no-extraneous-dependencies": ["error", {
                "devDependencies": ["**/*.test.ts*", "src/stories/**/*"]
            }],
            "indent": ["error",4],
            "object-curly-newline": ["off"],
            "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
            "react/jsx-fragments": ["error", "element"],
            "react/jsx-indent": ["error", 4],
            "react/jsx-indent-props": ["error", 4],
            "react/jsx-props-no-spreading": ["off"],
            "react/prop-types": ["off"]
        }
    },
    "devDependencies": {
        "@typescript-eslint/eslint-plugin": "^2.10.0",
        "@typescript-eslint/parser": "^2.10.0",
        "eslint": "^6.7.2",
        "eslint-config-airbnb": "^18.0.1",
        "eslint-plugin-import": "^2.18.2",
        "eslint-plugin-jsx-a11y": "^6.2.3",
        "eslint-plugin-react": "^7.17.0",
        "eslint-plugin-react-hooks": "^2.3.0",
        "typescript": "^3.7.2"
    }
}

```