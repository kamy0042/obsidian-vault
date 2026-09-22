---
Created: 2021-06-07T22:41:00
URL: https://noah.plus/blog/020/
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[icon-512x512.png]]

オライリー『JavaScriptパターン』の第7章で紹介されているデザインパターンのうちの一つ、「オブザーバ」パターンについてみていく。

本で紹介されているデモは以下のURLに公開されている。

## 「オブザーバ」パターンについて

オブザーバパターンは購読者/発行者パターンとも呼ばれる。その名前の通り、このパターンには発行者と購読者が存在する。発行者はイベントが発生すると登録されている購読者を呼び出すというのがざっくりとした仕組み。 発行者側に必要なメンバは以下の通り。

-  
subscribers
    - 購読者の一覧が登録されているリスト
-  
subscribe()
    - 購読者リストへの追加
-  
unsubscribe()
    - 購読者リストからの削除
-  
publish()
    - 購読者の呼び出し（メソッドの呼び出し）

購読者リストはオブジェクト内にまとめることで、購読者の種類で構造化しておくことができる。

```plain text
// 発行者オブジェクト
var publisher = {
    // タイプごとに購読者リストを増やしていくイメージ
    subscriber: {
        any: [],
        type1: [],
        type2: [],
        type3: [],
        ...続く...
    },
    subscribe: function() {...},
    unsubscribe: function() {...},
    publish: function() {...}
}
```

`subscribe()` は購読者のタイプをチェックし、適切な配列に分類する。

```plain text
var publisher = {
    ...省略...

    subscribe: function (fn, type) {
        type = type || 'any';
        if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    }

    ...省略...
}
```

`unsubscribe()` と `publish()` についてはヘルパーメソッド `visitSubscriber()`を新しく追加して実装する。

```plain text
var publisher = {
    ...省略...

    unsubscribe: function (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function (publication, type) {
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type) {
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;

        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                subscribers[i](arg);
            } else {
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }

    ...省略...
};
```

必要最低限の機能を備えた発行者オブジェクトの全容は以下の通り。

```plain text
var publisher = {
    subscribers: {
        any: []
    },
    subscribe: function (fn, type) {
        type = type || 'any';
        if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    },
    unsubscribe: function (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function (publication, type) {
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type) {
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;

        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                subscribers[i](arg);
            } else {
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};
```

`publisher` オブジェクトを再利用すれば、発行者の作成が容易になる。このデモでは`publisher` オブジェクトのプロパティを他のオブジェクトにコピーすることで継承を行なう。（ミックスインパターン）

ミックスインを行うためのメソッド `makePublicher()` は以下の通り。

```plain text
function makePublisher(o) {
    var i;
    for (i in publisher) {
        // メソッドの設定
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
            o[i] = publisher[i];
        }
    }
    // 購読者リストの設定
    o.subscribers = {any: []};
}
```

発行者オブジェクトを実装する準備が整ったので、新聞を読者に届ける `paper` オブジェクトで試してみる。`paper` オブジェクトは日刊と月刊という2タイプの発行ができる。

```plain text
var paper = {
    daily: function() {
        //   publish("ニュースの内容")
        this.publish("big news today");
    },
    monthly: function() {
        //   publish("ニュースの内容", "購読者リストの種類")
        this.publish("interesting analytsis", "monthly")
    }
}

makePublisher(paper);
```

発行者 `paper` を無事実装できたので、続いて購読者オブジェクトを作成する。

```plain text
var joe = {
    drinkCoffee: function (paper) {
        console.log('Just read ' + paper);
    },
    sundayPreNap: function (monthly) {
        console.log('About to fall asleep reading this ' + monthly);
    }
};

// paperを購読
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');
```

これによって`paper.subscribers.any` に `joe.drinkCoffee` が登録され、`paper.subscribers.monthly` に `joe.sundayPreNap` が登録された。

`paper.daily()` が実行されると `any` タイプの購読者リストが呼び出され、`paper.monthly()` が実行されると `montly` タイプの購読者リストが呼び出される。

```plain text
paper.daily(); // Just readbig news today
paper.monthly(); // About to fall asleep reading this interesting analysis
```

「オブザーバ」パターンのすごいところは `paper` オブジェクトと `joe` オブジェクトが疎結合になっているという部分。ハードコーディングされている部分がないので柔軟に発行者と購読者を組み替えることができる。

以下のように `joe` を発行者に、`paper` を購読者にすることも簡単にできる。

```plain text
makePublisher(joe);

joe.tweet = function (msg) {
    this.publish(msg);
};

paper.readTweets = function (tweet) {
    console.log('Call big meeting! Someone ' + tweet);
};

joe.subscribe(paper.readTweets);

joe.tweet("hated the paper today"); // Call big meeting! Someone hated the paper today
```

- [← Re-ducksパターン：React + Redux のディレクトリ構成ベストプラクティス](https://noah.plus/blog/021/)
- [オライリー『JavaScriptパターン 優れたアプリケーションのための作法』を読んだ →](https://noah.plus/blog/019/)

[noah.plus](https://noah.plus/)