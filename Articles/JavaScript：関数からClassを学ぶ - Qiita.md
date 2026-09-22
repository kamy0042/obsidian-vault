---
Created: 2021-01-15T20:26:00
Tags: [topic/技術/JavaScript]
---
みなさんこんにちは [ジーズアカデミー 主席講師 山崎ですm(_ _)m](https://gsacademy.jp/mentor/)
今回は「JavaScript 関数からClassを学ぶ」です。

# JavaScript：関数からClassを学ぶ

JavaScript初心者は関数化をしっかり理解することでClassへの理解も進みます。

## 記事の目的

Classの基本的な記述方法（一例）を知る

## ターゲット

- JavaScript初心者から中級へ向かってる人
- 関数を理解したレベル
- Classを学ぼうとして？がでている
- thisの意味を理解してるレベル

## VisualStudioCode

[Visual Studio Code ： Documents](https://docs.microsoft.com/ja-jp/visualstudio/products/?WT.mc_id=DT-MVP-5000050)

## １．Dateオブジェクトで例を作りました。

Classは関連性のある処理、functionや変数を一纏めにする際に便利です。
今回はDateオブジェクトを例に進めて行きます。

## ２．Function定義（Dateオブジェクトを細分化）

関数型
今回はDateオブジェクトを関数化（細分化）した例を元に見てみましょう。
※ 接頭辞に"_"が付いてる関数は意識的にprivate/localという意味づけにしてあります。

test1.html

`<body>
    <h1>ここに日時を表示させる</h1>
    <script>
        //***************************
        //private関数 （関数からしか呼ばれない関数には"_"を接頭辞につけて見分けるようにする）
        //***************************
        //年
        function _y() {
            return new Date().getFullYear();
        };
        //月
        function _m() {
            return _o(new Date().getMonth() + 1);
        };
        //日
        function _d() {
            return _o(new Date().getDate());
        };
        //時
        function _h() {
            return _o(new Date().getHours());
        };
        //分
        function _i() {
            return _o(new Date().getMinutes());
        };
        //秒
        function _s() {
            return _o(new Date().getSeconds());
        };
        //2桁0対応
        function _o(s) {
            return ('0' + s).slice(-2);
        }
        //年-月-日
        function _D() {
            return "-";
        };
        //時:分:秒
        function _T() {
            return ":";
        };
        //***************************
        //public関数
        //***************************
        //年-月-日
        function ymd() {
            return _y() + _D() + _m() + _D() + _d();
        };
        //時:分:秒
        function his() {
            return _h() + _T() + _i() + _T() + _s();
        };
        //***************************
        //関数を実行し、日時を表示
        //***************************
        document.querySelector("h1").innerHTML = ymd() + " " + his();
    </script>
</body>`

functionが沢山出来ましたね。
日時に関する関数なので一つに括りたいですね。そこで登場するのが、
Classになります。関連性のあるfunctionや変数を一括にできるのがClassです。
以下のCODEは、”DateTimeというClassを作り” その中に”上記function” を入れた例になります。

## ３．Class定義 （上記functionをClassにする…）

上記関数をClass化すると以下のような感じでしょう。

- class内ではfunctionの記述はいらない
- class名の接頭辞を大文字にする（慣例）
- class内で使用する変数などはconstructor関数内にthis.＊＊＊と宣言する（class内どこでも使用可能）
- class内の変数、関数を使用する際「this.****」のようにthis.を付ける必要がある。
- 以下コードを読み解いてください。

test2.html

`<body>
    <h1>ここに日時を表示させる</h1>
    <script>
        //***************************
        //Class定義DateTimeを作成
        //***************************
        class DateTime {
            //曜日配列を用意
            day = ["日", "月", "火", "水", "木", "金", "土"];
            constructor() {
                this.D = new Date();
            }
            //==========================
            //private関数
            //==========================
            //年
            _year() {
                return this.D.getFullYear();
            };
            //月
            _month() {
                return this._o(this.D.getMonth() + 1);
            };
            //日
            _date() {
                return this._o(this.D.getDate());
            };
            _day() {
                return this.D.getDay();
            };
            //時
            _hours() {
                return this._o(this.D.getHours());
            };
            //分
            _minutes() {
                return this._o(this.D.getMinutes());
            };
            //秒
            _seconds() {
                return this._o(this.D.getSeconds());
            };
            //2桁0対応
            _o(s) {
                return ('0' + s).slice(-2);
            }
            //年-月-日
            _D() {
                return "-";
            };
            //時:分:秒
            _T() {
                return ":";
            };
            //Space
            _S() {
                return " ";
            }
            //==========================
            //public関数
            //==========================
            ymd() {
                return this._year() + this._D() + this._month() + this._D() + this._date();
            };
            his() {
                return this._hours() + this._T() + this._minutes() + this._T() + this._seconds();
            };
            ymdhis() {
                return this.ymd() + this._S() + this.his()
            }
            ymddhis() {
                return this.ymd() + "(" + this.day[this._day()] + ") " + this.his()
            }
        }

        //Classをオブジェクト化
        const d = new DateTime();
        //オブジェクト内のメソッドを実行し日時を表示
        document.querySelector("h1").innerHTML = d.ymddhis();
    </script>
</body>`

## ４．Class＆Extends（継承）

Class化した内容にprivate/publicの関数（メソッド）が混ざってます、外から使用するpublic関数は継承したClassに記述してみましょう。

- extends（継承)は、メインのclassを読み込み、そこに追加して使用するイメージ
- 以下のコードを読み解いてください。class Datetimeを extendsしたclass Dの例を記載しました。
- 上記、関数、Classと以下extendsの3例を読み解くと見えてくると思います。

test3.html

`<body>
    <h1>ここに日時を表示させる</h1>
    <script>
        //***************************
        //Class定義DateTimeを作成
        //***************************
        class DateTime {
            day = ["日", "月", "火", "水", "木", "金", "土"];
            constructor() {
                this.D = new Date();
            }
            //==========================
            //private関数
            //==========================
            //年
            _year() {
                return this.D.getFullYear();
            };
            //月
            _month() {
                return this._o(this.D.getMonth() + 1);
            };
            //日
            _date() {
                return this._o(this.D.getDate());
            };
            _day() {
                return this.D.getDay();
            };
            //時
            _hours() {
                return this._o(this.D.getHours());
            };
            //分
            _minutes() {
                return this._o(this.D.getMinutes());
            };
            //秒
            _seconds() {
                return this._o(this.D.getSeconds());
            };
            //2桁0対応
            _o(s) {
                return ('0' + s).slice(-2);
            }
            //年-月-日
            _D() {
                return "-";
            };
            //時:分:秒
            _T() {
                return ":";
            };
            //Space
            _S() {
                return " ";
            }
        }

        //==========================
        // DateTimeを継承し新しいD Clasｓを作成
        // public関数群（外から使用する）
        //==========================
        class D extends DateTime {
            ymd() {
                return this._year() + this._D() + this._month() + this._D() + this._date();
            };
            his() {
                return this._hours() + this._T() + this._minutes() + this._T() + this._seconds();
            };
            ymdhis() {
                return this.ymd() + this._S() + this.his()
            }
            ymddhis() {
                return this.ymd() + "(" + this.day[this._day()] + ") " + this.his()
            }
        }

        //***************************
        //関数を実行し、日時を表示
        //***************************
        //継承したClassをオブジェクト化
        const d = new D();
        //オブジェクト内のメソッドを実行し日時を表示
        document.querySelector("h1").innerHTML = d.ymddhis();

    </script>
</body>`

### 上記３つの状態の変化からClassの理解していただければ良いかと思います。

基本は関数です。関数の理解が無く、Classは覚えられませんので関数をしっかり身につけることからがだいじです。その先にClassが見えてきます。

### もっと詳細に解説したかったのですが、時間の都合上、ざっくりな記事になりました。いつか更新します！

### Classができるとどうなるの？

私の場合は Githubに上がってるようなJSライブラリなど作っています。

実際に私が作成したライブラリはこちら↓[BmapQuery.js](https://github.com/yamazakidaisuke/BmapQuery)
メインのライブラリ/src/BmapQuery.jsの中は以下[https://github.com/yamazakidaisuke/BmapQuery/blob/master/src/BmapQuery.js](https://github.com/yamazakidaisuke/BmapQuery/blob/master/src/BmapQuery.js)
こちらを見ていただけるとClassは処理を纏めるには適している事を知っていただけるのではないでしょうか。

# 参考

[https://qiita.com/niisan-tokyo/items/83582bc0646239cf6cb8](https://qiita.com/niisan-tokyo/items/83582bc0646239cf6cb8)

[https://html5experts.jp/takazudo/17355/](https://html5experts.jp/takazudo/17355/)

以上