---

Tags: [topic/技術/React]
---
[https://zenn.dev/dinii/articles/7eba16ed5513c1](https://zenn.dev/dinii/articles/7eba16ed5513c1)

![](https://storage.googleapis.com/zenn-user-upload/topics/489b9436a3.png)

こんにちは、ダイニーの Feature team でソフトウェアエンジニアをしている [@ta21cos](https://x.com/ta21cos) です。

最近は新規事業である決済関連の機能の開発をメインに行なっています。

ダイニーにおける Feature team は機能にフォーカスした開発・運用を行っているチームです。最近は複数の事業毎に Unit として分かれて開発を進めています。

本日は、普段の開発で実際にあった Pull Request のレビューコメントから得た学びについて紹介します。

## Dialog を実装しよう

React を使ってある Dialog を作成するため、以下のようなコードを書きました（コードは簡略化しています）。

```plain text
// useSample ファイル
// 内部でロジックと Dialog をを同時に定義している hook

const Dialog = memo<{ progress: number, ... }>(({ ... }) => { ... })

const createSampleDialogComponent = useCallback(({ Layout }: { Layout: ... }) =>
	() =>
		isDialogVisible ? (
			<Dialog
				progress={progress}
				Layout={Layout}
				...
			/>
		)  : null,
		[isDialogVisible, progress, ...],
	);

===========

// 利用側
const { createSampleDialogComponent, ... } = useSample();

// 見た目の情報は hook でなく表示側で注入する
const SampleDialog = useMemo(() =>
	createSampleDialogComponent({ Layout: DialogLayout }), [createSampleDialogComponent]);

...（省略）...

return (
	...
	<SampleDialog />
	...
)

```

今見ると改善点が残っているコードですが、今回はコンポーネントの作成方法について絞って見ていきます。まずはコードの意図を説明します。

この Dialog は特定の処理と関連して表示され、ロジックに関する部分を `useSample` という hook にまとめて定義しています。見た目部分の責務を分離するため、hook は Dialog を生成する関数しか露出せず、`Layout` という見た目を表したコンポーネントを hook を利用する側で注入して生成しています。動作としては、`progress` が変わるたびに表示が変わっていくようなものになっています。

このような書き方をする場合、 `createSampleDialogComponent` を rename して `{renderSampleDialog()}` とするコードを良く見かけると思いますが、上記のように書けば `<SampleDialog />` と表現できるのでは？と当時の私は考えていました。

いつも通り動作確認完了後に Pull Request を提出すると、レビュワーから次のようなコメントを頂きました（実際のレビューコメントです）。

![](https://storage.googleapis.com/zenn-user-upload/77e0849ffa69-20240906.png)

私はこのコメントを頂いてもすぐには理解できず、さらに質問したところ大変ありがたいことに簡略化した例で説明してもらえました。

> 
> 更新ありがとうございます！ ややこしいので簡略化したコードで説明しますね！
> 
> ```plain text
> const Component = () => {
>  const [state, setState] = useState("something");
> 
>  const InnerComponent = useCallback(() => <Text>{state}</Text>, [state]);
>  const renderInner = useCallback(() => <Text>{state}</Text>, [state]);
> 
>  return (
>    <View>
>      <InnerComponent />
>      {renderInner()}
>    </View>
>  );
> };
> 
> ```
> 
> 実はここでの `<InnerComponent />` と `{renderInner()}` は意味が結構違います。
> 
> 前者は ReactElement （要は JSX.Element）として配置されて、実際の値は `{ type: InnerComponent, props: {}, key: null }` 的な感じになります。後者は戻り値の `<Text>{state}</Text>` がそのまま入ります。
> 
> ![](https://storage.googleapis.com/zenn-user-upload/7e411e8327f8-20240906.png)
> 
> ```plain text
> InnerComponent
> ```
> 
> ```plain text
> renderInner
> ```
> 
> ```plain text
> renderInner
> ```
> 
> ```plain text
> <Text>{state}</Text>
> ```
> 
> ```plain text
> InnerComponent
> ```
> 
> ```plain text
> <div />
> ```
> 
> ```plain text
> <span />
> ```

（この PR は ReactNative のコードなので、 `<View />` が使われています。）

これだけでも理解できた方はいらっしゃるかもしれませんが、当時の私はこれでもなかなか腑に落ちませんでした。

なぜ `{renderInner()}` のほうが処理を抑制できるのでしょうか？

私が理解するには、React の少し deep な仕様まで調べる必要がありました。

## JSX はどのように ReactElement に変換されるのか？

まずは評価の仕組みです。React のコードを書くうえで、コンポーネントの返り値の部分には次の2つのパターンを書くと思います。

- `<Component .. />`
- `{式}`

この2つは評価のされ方が異なります。

### 1. `<Component … />`

このケースでは、ReactElement（React 内部での HTML 要素の表現） には `Component` がそのまま使われます。次のような値のイメージです。

```plain text
{
	type: Component, // コンポーネントは関数で表現される
	props: {...},
	key: null,
	childern: ...,
	...
}

```

### 2. `{式}`

```plain text
const render = useCallback(() => <p>Hello!</p>, [])
...
return (
	...
	{render()}
	...
}

```

における `{render()}` は `<p>Hello!</p>` となり、ReactElement にすると

```plain text
{
	type: "p",
	key: null
	props: {
		...
		children: "Hello!
	},
	...
}

```

となります。

## React の state が変わったときに何が起こるのか？

こちらは React を普段から使っている方からすればおさらいになります。

コンポーネント内で定義している state が変化した場合、コンポーネントの関数自体が再度実行されます。返り値である React 要素を用いて、前回からの差分を計算します（いわゆる Reconciliation）。ここで差分のあった React 要素に対して HTML の再構築を行います。

以上の内容を踏まえて、レビューコメントのコードを見てみます。

## 依存が変化したときの挙動が変わる

レビューコメントにあったサンプルコードに戻り、わかりやすくするためのログを付与します。

```plain text
const InnerImpl = memo(({ name }: { name: string }) => {
	useEffect(() => {
		console.log(`${name} re-rendered!`);
	}, [])
	return null
});

const Component = () => {
  const [state, setState] = useState("default");

  useEffect(() => {
	  setTimeout(() => {
		  setState("updated");
	  }, 2000);
  }, []);

  const InnerComponent = useCallback(() => {
	  return <InnerImpl name="asComponent" />;
  }, [state]);

  const renderInner = useCallback(() => {
	  // InnerImpl は state への依存がない
	  return <InnerImpl name="asFunction" />;
  }, [state]);

  return (
    <>
      <InnerComponent />
      {renderInner()}
    </>
  );
};

```

これをよしなに実行すると、次のようなログが出ます。

```plain text
asComponent re-rendered!
asFunction re-rendered!
asComponent re-rendered!
asFunction re-rendered!
// 2秒後
asComponent re-rendered!
asComponent re-rendered!

```

（strict mode によって2回 useEffect が実行されていますが）2秒後の更新時に `InnerComponent` が再度描画されているのは asComponent のみとなりました。

このからくりは、先程の評価方法を考慮し`renderInner` を書き下すとわかります。

まず、`renderInner` は依存している state が変わるたびに評価されますが、return 部分は常に `<InnerImpl name="asFunction" />` を返す関数なので、評価された結果の React 要素は常に一定となります（ `InnerImpl` はコンポーネントの外で定義されたオブジェクトなので、参照は一定になる）。

```plain text
{
	type: InnerImpl, // コンポーネントの外で定義されたオブジェクトなので不変
	props: {...},
	key: null,
	childern: ...,
	...
}

```

state が変わっても `<InnerImpl name="asFunction" />` は同一と判断されるので、こちらは再描画されないわけですね。

一方で `InnerComponent` はそれ自体が React 要素の type となります。そのため、state が変化し `InnerComponent` 関数自体が再生成されると、これは異なるオブジェクトになります。その結果 React 要素の type のオブジェクトが変化するため、React は全く異なるコンポーネントが格納されたと判断し、ゼロから再描画を行います。

```plain text
{
	type: InnerComponent, // state の変化で再生成されるとオブジェクトが変わる
	props: {...},
	key: null,
	childern: ...,
	...
}

```

## 冒頭のコード

サンプルの例は state を依存として指定しているものの実際に返す値は state には依存しないという特殊な例でした。改めて実際のコードで何が問題だったかを整理します。

```plain text
// useSample ファイル
// 内部でロジックと Dialog をを同時に定義している hook

const Dialog = memo<{ progress: number, ... }>(({ ... }) => { ... })

const createSampleDialogComponent = useCallback(({ Layout }: { Layout: ... }) =>
	() =>
		isDialogVisible ? (
			<Dialog
				progress={progress}
				Layout={Layout}
				...
			/>
		)  : null,
		[isDialogVisible, progress, ...],
	);

===========

// 利用側
const { createSampleDialogComponent, ... } = useSample();

// 見た目の情報は hook でなく表示側で注入する
const SampleDialog = useMemo(() =>
	createSampleDialogComponent({ Layout: DialogLayout }), [createSampleDialogComponent]);

...（省略）...

return (
	...
	<SampleDialog />
	...
)

```

`createSampleDialogComponent` の依存する state のいずれかが変化すると、useMemo により `SampleDialog` も更新され、新たなオブジェクトになります。その結果異なる React 要素として解釈されてしまい、`Dialog` がゼロから再描画されることになります。

確認ダイアログのように、visible フラグで表示・非表示が切り替わるだけであればどのタイミングでも全体が再描画されるので大きな問題はないのですが、今回のケースでは `progress` という state によってダイアログの表示中も内部の表示を更新しているため、この変化のたびにダイアログ全体が再描画されることになってしまいます。

上記のコードの問題点は、**コンポーネントの中でコンポーネントを定義してしまっていた**ことでした。すなわち、利用側のコンポーネントの宣言の中で、 `SampleDialog` というコンポーネントを作ってしまっていました。コンポーネントの中で作られたコンポーネントは、利用側コンポーネントのライフサイクルに合わせて毎度再生成されてしまうため、パフォーマンスが悪化してしまう傾向にあります。

再描画コストを減らしたコード例も次に示します。

```plain text
// useSample ファイル
// 内部でロジックと Dialog をを同時に定義している hook

const Dialog = memo<{ progress: number, ... }>(({ ... }) => { ... })

const renderSampleDialogComponent = useCallback(({ Layout }: { Layout: ... }) =>
	isDialogVisible ? (
		<Dialog
			progress={progress}
			Layout={Layout}
			...
		/>
	)  : null,
	[isDialogVisible, progress, ...],
);

===========

// 利用側
const { renderSampleDialogComponent, ... } = useSample();

...（省略）...

return (
	...
	{renderSampleDialogComponent({ Layout: DialogLayout })}
	...
)

```

よく見るようなコードですね。こちらであれば `renderSampleDialogComponent` がその場で評価され、React 要素には `Dialog` が格納されることになります。加えてこの `Dialog` は（isDialogVisible の変化でなければ）常に React 要素の type は同一と判断できます。

state のいずれかが変化した際は React 要素の props が変化しますが、ハンドリングは `Dialog` のコンポーネント自体の評価側で行うことができます。（ここから先は私の理解も深くないので省略させていただきますが）これにより、少なくとも再描画を抑えることができる可能性が上がります。

## まとめ

今回触れたような実装のパフォーマンスへの影響は、実際の影響としては大きな問題となることは少ないとは思います。しかし、React に意図されている方法で実装されているかは重要です。React の意図している方法で実装されているからこそ、React は最もパワフルなパフォーマンスを発揮できます。

この記事では React の少し deep な仕様までとりあげて、コードの改善例を紹介しました。ダイニーでは引用したコメントのような、リスペクトを伴ったレビューを積極的に行う文化があります。

レビューが活発なチームで働きたい方は、ぜひ一度お話しましょう。

31

[ta21cos](https://zenn.dev/ta21cos)
ダイニーのソフトウェアエンジニア

[Dinii Tech Blog](https://zenn.dev/p/dinii)[Publication](https://zenn.dev/faq#what-is-publication)

### Discussion

![](https://static.zenn.studio/images/drawing/discussion.png)