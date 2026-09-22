---
URL: https://www.to-r.net/media/react-tutorial-hooks-useeffect/
Created: 2020-12-31T16:51:00
Updated: 2020-12-31T16:51:00
Tags: [topic/技術/React]
---


- [JavaScript](https://www.to-r.net/media/category/javascript/)
- 
- [**React**](https://www.to-r.net/media/tag/react/)

# **useEffect / React Hooks – React入門**

2020.04.14

[西畑 一馬](https://www.to-r.net/media/author/kazumanishihata/)

<!-- Column 1 -->


<!-- Column 2 -->


[](https://twitter.com/intent/tweet?text=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80&url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F)[ツイート](https://twitter.com/intent/tweet?text=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80&url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F)

[](https://b.hatena.ne.jp/add?url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F&title=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80)[はてなブックマーク](https://b.hatena.ne.jp/add?url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F&title=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80)

[](https://getpocket.com/edit?url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F&title=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80)[あとで読む](https://getpocket.com/edit?url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F&title=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80)

連載目次 : [React入門](https://www.to-r.net/media/react-tutorial/)
前回の記事 : [useState / React Hooks](https://www.to-r.net/media/react-tutorial-hooks-usestate/)
次回の記事 : [useMemoとuseCallback / React Hooks](https://www.to-r.net/media/react-tutorial-hooks-usememo-usecallback/)

前回のuseStateの解説につづき[Reat Hooks](https://www.to-r.net/media/react-tutorial-hooks/)で最も重要な機能であるuseEffectについて解説を行います。

useEffectは[Classコンポーネント](https://www.to-r.net/media/react-tutorial05/#ClassComponent)に指定できる[ライフサイクルイベント](https://www.to-r.net/media/react-tutorial09/)の代替手法として紹介されることが多いのですが、その理解ですと上手に使いこなすことは難しいです。

useEffectを正しく取り扱うには[functionコンポーネント](https://www.to-r.net/media/react-tutorial05/#FunctionComponent)の再描画(リレンダリング)の仕組みを知る必要があるのでまずは再描画の解説から行います。

# **functionコンポーネントの再描画**

functionコンポーネントは[JSX](https://www.to-r.net/media/react-tutorial04/)として読み込まれた際に最初の描画が行われます。

そして、アプリケーション内で以下の変化が発生したタイミングで再描画されます。

- 親コンポーネントが再描画された時
- 親コンポーネントから引き渡されている[props](https://www.to-r.net/media/react-tutorial06/)が変化した時
- コンポーネント内で[useState](https://www.to-r.net/media/react-tutorial-hooks-usestate/)で定義している変数が変化した時
- カスタムフックより受け取っている変数が変化した時

再描画の際にコンポーネントは初回と同じ処理が実行されるのではなく一部の処理は前回のコンポーネントの状態を引き継ぎます。

たとえばuseStateで値が変化されている状態で再描画が発生すると、useStateで取得される値は初期値ではなく、最後にコンポーネントが保有していた値になります。

以下のコードではボタンをクリックした際にuseStateで定義している値が変化するので、Fooコンポーネントが再描画されFooコンポーネント内で定義している処理が再実行されます。そのため `console.log('再描画',count)`が毎回実行されるのですが、参照している `count`は初期値ではなく変更後の値が参照できるようになっています。

```plain text
const Foo = () => {
  const [count, changeCount] = useState(0)
  console.log('再描画',count)
  return (
    <>
      <p>カウント：{count}</p>
      <input type="button" value="10" onClick={() => changeCount(10)} />
    </>)
}
```

`useEffect`を利用すると初回描画もしくは再描画時に指定した変数に変化があった場合のみにコールバック関数に指定した処理を実行することが可能になります。

# **useEffectの基本**

`useEffect`は`useState`と同様にReactのimport時に`useEffect`を読み込むことで利用できるようになります。

```plain text
import React, { useEffect } from 'react';
```

そして、Function Componentのトップレベルの位置で以下の宣言を行い実行したい処理を定義します。第2引数には依存変数を配列で指定しておくことで依存変数に変更があった場合のみに指定した処理が実行されるようになります。

```plain text
useEffect(() => {
  // 実行したい処理を記述
},[依存変数を配列で記述])
```

第2引数は省略可能で、省略した場合にはfunctionコンポーネントの再描画時に毎回実行されるようになりますが、無限ループの温床になりやすくほとんどのケースでは第2引数の指定が必要となります。

それでは、いくつかの実例をもとに`useEffect`の利用方法を見ていきますしょう。

# **useEffectを利用した通信処理**

コンポーネントが読み込まれた場合に通信を行いたい場合などは`useEffect`を利用します。

以下のサンプルではAjaxで取得してきたデータを`useState`で定義したarticleというState に格納して 描画するサンプルです。

```plain text
const Foo = () => {
  const [articles,changeArticle] = useState([])
  
  useEffect(()=>{
    console.log("fetch")
    const url = `https://xxx/lists?page=1`fetch(url)
      .then( res => res.json() )
      .then( res => {
        changeArticle(res);
      })
  })
  
  return (
    <>
      <ul>
        {articles.map(article=>(
          <li>{article.title}</li>))}
      </ul>
    </>)
}
```

こちらの処理を実行するとコンソール上に `fetch`が何度も表示されてしまいます。

Ajax通信後に`changeArticle`を実行してStateを更新した際にコンポーネントの再描画が走り`useEffect`内の処理が再実行されてしまうためです。

無限ループにならないように`useEffect`の第2引数に依存変数を配列で指定しますが初回のみ実行したい場合は空で指定を行います。

```plain text
  useEffect(()=>{
    console.log("fetch")
    const url = `https://xxx/lists?page=1`fetch(url)
      .then( res => res.json() )
      .then( res => {
        changeArticle(res);
      })
  },[]) // ここを変更
```

これで`useEffect`で処理した内容は初回描画時のみに実行され`changeArticle`が実行された後に再実行されることはありません。

### **ページングの追加**

上記のコードにページング処理を付けてみましょう。

```plain text
const Foo = () => {
  const [page,changePage] = useState(1)
  const [articles,changeArticle] = useState([])
  
  useEffect(()=>{
    const url = `https://xxx/lists?page=${page}`fetch(url)
      .then( res => res.json() )
      .then( res => {
        changeArticle(res);
      })
  },[])
  
  return (
    <>
      <p>{page}ページ</p>
      <input type="button" value="次" onClick={()=>changePage(prevPage=>prevPage+1)} />
      <ul>
        {articles.map(article=>(
          <li>{article.title.rendered}</li>))}
      </ul>
    </>)
}
```

あらたにpageというステートを追加して表示するページ数を定義しています。

ページ内には次へボタンを設置してクリックするたびにページが増加するように定義しています。

ボタンをクリックしていくとp要素内にページ数は切り替わりますが、表示されているリストは切り替わりません。

これは`useEffect`の依存変数に何も指定していないため、コンポーネント初回描画時にしか実行されず`page`が変わった場合に再実行されないためです。

`ureEffect`の第2引数を以下のように変更するだけで修正することができます。

```plain text
  useEffect(()=>{
    const url = `https://xxx/lists?page=${page}`fetch(url)
      .then( res => res.json() )
      .then( res => {
        changeArticle(res);
      })
  },[page]) // ここを変更
```

これによりステートpageが変更された場合も`useEffect`で定義した処理が実行されてあたらしい情報がfetchされて表示されるようになります。

このように `useEffect`を利用する場合には第2引数に適切な依存変数を指定しなくてはいけないので注意が必要です。

# **useEffectの返り値**

`useEffect`で指定したコールバック関数には返り値で関数を指定することができ、指定した関数は以下のタイミングで実行されます。

- Classコンポーネントのライフサイクルメソッド[`componentWillUnmount`](https://www.to-r.net/media/react-tutorial09/#componentWillUnmount)のようにコンポーネントが破棄されるタイミング
- useEffectの依存変数に変更が起こり、新たなuseEffectが実行される前

これはタイマーやイベントなどの再設定によく利用されます。

例えば次のように `setInterval`を利用して1秒ごとにコンソールに現在のカント数を出力しようとした場合、`changeCount`が実行されるたびに新たにタイマーが追加されていく形になります。

```plain text
const Foo = () => {
  const [count, changeCount] = useState(0)
  
  useEffect(()=>{
    setInterval(()=>{
      console.log(count)
    },1000)
  },[count])

  return (
    <>
      <p>カウント：{count}</p>
      <input type="button" value="10" onClick={() => changeCount(10)} />
    </>)
}
```

このような処理を行いたい場合、`useEffect`で新たなタイマーが発行される前に一度`clearInterval`を実行して古いタイマー処理を破棄することが可能になります。

```plain text
  useEffect(()=>{
    const timer = setInterval(()=>{
      console.log(count)
    },1000)
    return () => {
      clearInterval(timer)
    }
  },[count])
```

windowイベントなどに処理を追加したい場合も同様です。`useEffect`で購読処理を設定するのと同時に、返り値で購読破棄の処理を指定することでイベントが重複して設定され続けることを防ぐことができます。

```plain text
  useEffect(()=>{
    const handleScroll = () =>{
      //スクロール時に実行したい処理
    }
    window.addEventListener(handleScroll)
    return () => {
      window.removeEventListener(handleScroll)
    }
  },[])
```

このように`useEffect`を利用することで任意のタイミングで処理の実行や制御が可能になります。

`useEffect`を適切に利用しないとReactの再描画が頻繁に起こりパフォーマンスを損ねる原因になってしまうので注意が必要です。

次回はコンポーネントの再描画時に直前の結果を呼び出す、useMemo / useCallback について解説を行います。

連載目次 : [React入門](https://www.to-r.net/media/react-tutorial/)
前回の記事 : [useState / React Hooks](https://www.to-r.net/media/react-tutorial-hooks-usestate/)
次回の記事 : [useMemoとuseCallback / React Hooks](https://www.to-r.net/media/react-tutorial-hooks-usememo-usecallback/)

**西畑 一馬**

2016年2月に株式会社トゥーアールを設立し、JavaScriptやHTML5を利用したフロントエンドの受託開発やフロントエンドエンジニアの教育事業などを業務として行う。「[Web制作の現場で使うjQueryデザイン入門](https://www.amazon.co.jp/o/ASIN/4048913913/tor0-22/ref=nosim)」や「[JavaScriptコーディング ベストプラクティス](https://www.amazon.co.jp/o/ASIN/4844361791/tor0-22/ref=nosim)」など多数の著書を執筆している。

# 

[この著者の記事一覧](https://www.to-r.net/media/author/kazumanishihata/)

<!-- Column 1 -->


<!-- Column 2 -->


[](https://twitter.com/intent/tweet?text=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80&url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F)[ツイート](https://twitter.com/intent/tweet?text=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80&url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F)

[](https://b.hatena.ne.jp/add?url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F&title=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80)[はてなブックマーク](https://b.hatena.ne.jp/add?url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F&title=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80)

[](https://getpocket.com/edit?url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F&title=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80)[あとで読む](https://getpocket.com/edit?url=https%3A%2F%2Fwww.to-r.net%2Fmedia%2Freact-tutorial-hooks-useeffect%2F&title=useEffect%20%2F%20React%20Hooks%20%E2%80%93%20React%E5%85%A5%E9%96%80)

- « [React styled-components の theme に TypeScript 型定義を追加する](https://www.to-r.net/media/styled-components-theme/)
- [useMemoとuseCallback / React Hooks – React入門](https://www.to-r.net/media/react-tutorial-hooks-usememo-usecallback/) »