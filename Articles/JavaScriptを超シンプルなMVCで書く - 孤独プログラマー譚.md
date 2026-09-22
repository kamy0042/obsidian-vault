---
Created: 2021-01-15T20:25:00
URL: https://lonely-programmer.hatenablog.jp/entry/2016/07/09/193821
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
- 単一のWebページに、簡単な[イベントハンドラ](http://d.hatena.ne.jp/keyword/%A5%A4%A5%D9%A5%F3%A5%C8%A5%CF%A5%F3%A5%C9%A5%E9)を3つ、4つ程書きたい。
- でも[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)を使う程の規模ではない。
- 本能の赴くままに[イベントハンドラ](http://d.hatena.ne.jp/keyword/%A5%A4%A5%D9%A5%F3%A5%C8%A5%CF%A5%F3%A5%C9%A5%E9)を書いてたら、訳が分からなくなってきた。
- 触るとバグりそうなので、もう触りたくない。

上記のようなこと、あると思います。というか、今の自分です。

サラッと見通しよく書きたいなぁ…ということで、簡単なサンプルを書いてみました。

```plain text
var model = {
    flg: true, // 初期値
    change: function() {
        if(this.flg) {
            this.flg = false;
        } else {
            this.flg = true;
        }
    }
}

```

まずモデルは、データ層として考える。プロパティ ＝ アプリが保持すべきデータ。
条件分岐はモデルでやる。
例えば、[ファミコン](http://d.hatena.ne.jp/keyword/%A5%D5%A5%A1%A5%DF%A5%B3%A5%F3)のボタンが押されたら、その「ボタンを押した」という信号がモデルに渡されるイメージ。
信号をどう捌くかは、モデルに任せる。

自分が昔よくやってたのが、

```plain text
var oldText = $('button').text();
var newText;
if (oldText === '乃木坂46') {
    newText = '欅坂46';
} else {
    newText = '乃木坂46';
}
$('button').text(newText);

```

DOMの値を直接読みにいって、それを使って諸々の処理を行う。
もうやめとこう。これからは、モデルのプロパティに状況を持たせる。DOMが持ってるデータは使わない。

```plain text
var view = {
    render: function() {
        if(model.flg) {
            $('button').text('乃木坂46');
        } else {
            $('button').text('欅坂46');
        }
    }
}

```

ビューからモデル内のデータを読んで、[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)する。

```plain text
$(function() {
    $('button').on('click', function() {
        model.change();
        view.render();
    });
    view.render(); // 初期表示
});

```

コントローラ。モデルとビューを使う。

まとめると、

```plain text
(function() {
    var model = {
        flg: true,
        change: function() {
            if(this.flg) {
                this.flg = false;
            } else {
                this.flg = true;
            }
        }
    }
    var view = {
        render: function() {
            if(model.flg) {
                $('button').text('乃木坂46');
            } else {
                $('button').text('欅坂46');
            }
        }
    }
    $(function() {
        $('button').on('click', function() {
            model.change();
            view.render();
        });
        view.render();
    });
})();

```

無名関数で囲って、[グローバル変数](http://d.hatena.ne.jp/keyword/%A5%B0%A5%ED%A1%BC%A5%D0%A5%EB%CA%D1%BF%F4)は作らないようにする。

これで何とか見通しよくなってくれないかなぁ…。