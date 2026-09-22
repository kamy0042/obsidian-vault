---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
# はじめに

業務でJavascript/TypeScriptを用いて開発をしていて、
毎日のようにデバッグするのですが
そんな中でChrome Dev Tools(DevTools)を使用したお気に入りのデバッグ方法があり、まとめてみました。

以前React Dev ToolsでのReactのデバッグ方法も紹介していますので、興味があれば読んでください。[React Developer Toolsのすすめ](https://qiita.com/ssuzuki0301/items/9c2af4b28ba665cc0744)

既にご存知の方には当たり前の方法で
記事にするほどのことでもない！と思われるかと思いますが、
知らなかった方が効率よくデバッグできるようになれば幸いです。

# 対象読者

- Javascript/TypeScriptで開発しているが、デバッグ方法がいまいち分からない方
- **console.logを多用してデバッグをしている方**
- デバッグを効率化したい方

# JavaScript/TypeScripのデバッグ

**console.logでのデバッグ**
多くの方が行うJavaScript/TypeScripのデバッグとして、
console.logを随所に記述してDevToolsのconsoleから値を見たり、どの処理を通っているかを確認する方法があります。
私自身もよく使いますが、console.logを記述して削除するのが手間だったり、消し忘れでレビューで指摘されたり、コードを汚してしまうことがあるので、面倒だなと感じる部分がありました。

ReactでのJSのコードの抜粋ですが、API通信時の挙動を見たい時など、こんな感じでconsole.logを使いますよね。

`...

const countriesApi = "https://restcountries.eu/rest/v2/all";
  useEffect(() => {
    console.log('useEffect');
    const getData = async () => {
      setIsLoading(true);
      const response = await axios.get(countriesApi);
      console.log(`response:${response}`);
      setAllCountries(response.data);
      console.log(`data:${response.data}`);
      setIsLoading(false);
    };
    getData();
  },[]);

...`

そしてDevToolsのconsoleで確認。
デバッグ対象のアプリをChromeで開いて、
DevToolsを開いて（Macはcommand + option + iでショートカット）、**Console**のタブに移動します。
少し分かりにくいし、見にくいです。たくさんconsole.logするとどれか分かるように記述しないと読み取りにくい...。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2F9df3a16e-b668-23e6-575b-cc7c4f50ae1f.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=e260751885b075771b00e74c2cfa5da4)

このようなデバッグをDevToolsのSourceを使用することで、
より便利に効率的にデバッグが可能になります！

# Chrome Dev ToolsのSourceを利用したデバッグ

まず、デバッグ対象のアプリをChromeで開きます。
DevToolsを開きます（Macはcommand + option + iでショートカット）。**Source**のタブに移動します。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2Fa1c33410-6ce2-6b5d-29dc-ee20a4e6df13.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=1d4e1d3861358df2280d1962d857edf4)

左側のディレクトリツリーからデバッグしたい対象のファイルを選択します。
そうするとソースコードがDevTools上に表示されます。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2F4f53b51e-de55-4a33-b19f-1b7a757e12a6.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=9c6dfdd3b80184c2c8b70aa25ef2b289)

デバッグしたい箇所を選択します。
コード表示の行数の左をクリックすることで緑色になり、ブレークポイントを貼ることができます。
これがconsole.logと同じような役割となります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2Ff141a972-2499-38d8-6017-c7b71e19f890.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=248f0a3cb42b474685d97505f9330397)

この状態でアプリを動かします。
今回は簡易的な電話帳アプリを動かします。
人名検索が可能なので、テキストボックスに文字を入力します。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2F994ca58f-158f-374f-75d2-81821d426285.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=6e6d984cdfce6a695c556a299890d39a)

文字を入力した瞬間に、ブレークポイントを貼った人名をフィルターする処理で止まってデバッガが動作しました！！

アプリ側に「Paused in debugger」が出てくるので、それの赤枠の右三角を押します。
次のブレークポイントの処理まで実行させることができます。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2F507ed345-c8f5-af52-948f-57cb573c77be.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=78cbd4fe306e020ebdc302392fc3d44d)

デバッガを進めていくと、右側に実行結果などのログが出ます。
見たい値や変数のところにマウスオーバーすると、パラメータが見れます。
この方法だとコードに**console.logを記述する必要がありません。**
見れるパラメータもより詳細です。
実際に動かしながら確認するので、直感的にデバッグが可能です。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2Fd5d0c636-e0dc-cce3-2b00-2df2f9991c87.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=9a4180bed833d31309701672c19411c1)

確認したいパラメータもマウスオーバーすることで簡単に、詳細な情報が得られます。**personsの中身**

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2Fc3e9237d-c567-6a23-a3a6-95aae8df9e39.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=39bd288bc00d484c2539806363c8b2b9)

**console.logだと指定した情報しか表示できませんが、****この方法だとブレークポイントを貼った以外の部分の実行された処理のパラメータの確認ができます。**
ブレークポイントを貼っていないhandleFilterChangeのeventのパラメータ。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2F0858a119-b9e1-dd02-a499-c2b61c8d3838.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=5dcd91bba3e7e91df389bb5fd1d2f27f)

下記のマークを押していくことで、コードを１行ずつステップ実行することも可能です。
別の関数にジャンプしたり、処理を１つずつ実行してくれます。
(フレームワーク使用していると、フレームワーク自体の処理に入り込んでしまうことが多いので、コードのデバッグだと向いてないかもしれません。)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F530688%2F975811d3-ac43-0e35-d2cc-2ec6bf616c49.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=0163288fd874ac323c92c4a9df5acb60)

# まとめ

Chrome Dev ToolsのSourceのデバッガを使うことで、

- **console.logを記述しなくて済む**
- **動作した処理全てのパラメータを簡単に確認できる**
- **アプリを動かしながら直感的にデバッグができる**

といった効率的なデバッグをすることが可能となります。

私もこの方法でデバッグを始めてから、作業が格段に速くなりました。
undefinedで値が取れていない部分も、どこで処理が失敗しているのかも、すぐに見つけることができます。
かつ、コードがどのように動いているのかを把握できるようになったので言語やフレームワークの理解が深まりました。

知らなかった！という方は是非試してみてください。
どなたかの参考になれば幸いです。

最後まで読んで頂き、ありがとうございました。