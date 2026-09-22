---
Created: 2021-01-02T17:39:00
URL: https://thomasjs8.hatenablog.com/entry/2019/09/17/182625
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
以前、同じタイトルで記事を書いたあとに、非公開にした記事を編集しようと思ったら、消えていたので再度投稿します。

# はじめに

[reddit](http://d.hatena.ne.jp/keyword/reddit)

で以下の投稿があったので、自分の考えをアウトプットしようと思いました。

[www.reddit.com](https://www.reddit.com/r/reactjs/comments/bozklf/react_hooks_and_presentationalcontainer_components/)

※参考[medium.com](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

React+Reduxで[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を書いているときに、[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)思想の1つとしてPresentational+Container componentsがあります。

■Presentational+Container componentsの概要

Presentational component
    View部分を担当
    
    
    Container component
    ロジック部分を担当

この思想によって、メンテンスのしやすい[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)が出来ると思います。
ただ、参考に載せていたように、React開発に携わっているDanさんの言っていることもわかります。

> Update from 2019: I wrote this article a long time ago and my views have since evolved. In particular, I don’t suggest splitting your components like this anymore. If you find it natural in your codebase, this pattern can be handy. But I’ve seen it enforced without any necessity and with almost dogmatic fervor far too many times. The main reason I found it useful was because it let me separate complex stateful logic from other aspects of the component. Hooks let me do the same thing without an arbitrary division. This text is left intact for historical reasons but don’t take it too seriously.Presentational and Container Components - Dan Abramov - Medium

「hooksが出てきたので、もう分けなくていいんじゃないか」ってことですね。
そうですねーって感じです。hooksを使っていて思いますが、とにかくstate管理が楽です。Presentational+Container componentsでhooksを使うときは、正直view側に書きたいです。(viewでしかstate使わないし。。。storeにあるstateみたいなグローバル的なstateとは違うし。。。)

ただ、やっぱりPresentational+Container componentsの思想も個人的には捨てきれないです。(小規模アプリは除く)
以下の理由からです。
1. 1つのファイルにviewとlogicを書くと、とにかく長くなって見にくい。
2. viewとlogicを分けることによって、設計が楽になる。

私自身もどちらがいいというのは決定しきれていませんが、今の所はPresentational+Container componentsの思想でやっていこうと思います。
connect使おうが使わまいが、[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)自体の再利用性、メンテナンス性をしっかり考えるべきだなと思いました。
(無駄にContainer作って、[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を増やのは嫌なので。。。)

また、記事アップデートします。
以上です。