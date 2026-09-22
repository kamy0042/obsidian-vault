---
Created: 2021-01-15T18:09:00
Tags: [topic/技術/パフォーマンス]
---
![](https://images-fe.ssl-images-amazon.com/images/I/51ln3zS%2BqFL._SL160_.jpg)

[Webフロントエンド ハイパフォーマンス チューニング](http://www.amazon.co.jp/exec/obidos/ASIN/4774189677/hacking15dog-22/)

- 作者: 久保田光則
- 出版社/メーカー: [技術評論社](http://d.hatena.ne.jp/keyword/%B5%BB%BD%D1%C9%BE%CF%C0%BC%D2)
- 発売日: 2017/05/26
- メディア: 単行本（ソフトカバー）
- [この商品を含むブログを見る](http://d.hatena.ne.jp/asin/4774189677/hacking15dog-22)

## 感想

パフォーマンスチューニングというよりかは、ブラウザがHTMLをどのように処理をして描画されてるのかの理解を深めるために読んだが、めちゃくちゃ勉強になった。
この本は、原理を知って、計測して意味のあるチューニング(全体の1%だと[インパク](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%D1%A5%AF)トが少ないから効果が薄いなど)をしようというスタンスで、実践的なところも良かった。
記事等で、パフォーマンスチューニングの話を見聞していたが、「何故か？」の部分までは踏み込めてなかったので、そのような意味でも良かった。[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)エンジン周りはもう少し理解を深めたい。

## 目次

## 1. ウェブパフォーマンスとは何か

### パフォーマンスの定義

**ユーザの様々な振る舞いに対してウェブページが応答を返す速さ**
即ち、初期読み込みのみでなく、jsなどによる操作も含む。

ハイブリッドアプリでは、jsが一度[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)エンジンに解釈された上で初めて[コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)されるため、ネイティブアプリより一般に遅くなる。

## 2. ブラウザの[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)の仕組み

デスクトップブラウザの[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)エンジン

ブラウザ

[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)

エンジン

[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)

エンジン

[Google Chrome](http://d.hatena.ne.jp/keyword/Google%20Chrome)

Blink
V8

[Mozilla Firefox](http://d.hatena.ne.jp/keyword/Mozilla%20Firefox)

[Gecko](http://d.hatena.ne.jp/keyword/Gecko)

[SpiderMonkey](http://d.hatena.ne.jp/keyword/SpiderMonkey)

[Safari](http://d.hatena.ne.jp/keyword/Safari)

[WebKit](http://d.hatena.ne.jp/keyword/WebKit)

Nitro

[Internet Explorer](http://d.hatena.ne.jp/keyword/Internet%20Explorer)

Trident

[Chakra](http://d.hatena.ne.jp/keyword/Chakra)

[Microsoft Edge](http://d.hatena.ne.jp/keyword/Microsoft%20Edge)

EdgeHTML

[Chakra](http://d.hatena.ne.jp/keyword/Chakra)

[Opera](http://d.hatena.ne.jp/keyword/Opera)

Blink
V8

[Vivaldi](http://d.hatena.ne.jp/keyword/Vivaldi)

Blink
V8(？)

モバイルブラウザの[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)エンジン

ブラウザ

[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)

エンジン

[Google Chrome](http://d.hatena.ne.jp/keyword/Google%20Chrome)

Blink

[Safari](http://d.hatena.ne.jp/keyword/Safari)

[WebKit](http://d.hatena.ne.jp/keyword/WebKit)

UC Browser
U3(

[WebKit](http://d.hatena.ne.jp/keyword/WebKit)

ベース)

[Opera](http://d.hatena.ne.jp/keyword/Opera)

独自エンジン/Blink

[Android](http://d.hatena.ne.jp/keyword/Android)

Browser

[WebKit](http://d.hatena.ne.jp/keyword/WebKit)

[IE](http://d.hatena.ne.jp/keyword/IE)

Mobile
Trident

上表のように、[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)エンジンは[WebKit](http://d.hatena.ne.jp/keyword/WebKit)系が主流である。**そのため、パフォーマンスチューニングにおいては、**[**WebKit**](http://d.hatena.ne.jp/keyword/WebKit)**を抑えるのが重要。**

[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)の処理の流れは以下の通り。

1. リソース読み込み(Loading)
2. [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)実行(Scripting)
3. レイアウトツリー構築(Rendering)
4. [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)結果の描画(Painting)

### 1. リソース読み込み(Loading)

主な処理の流れは下記の通り。

5. リソースのダウンロード
6. リソースのパース
7. HTMLからDOMツリーを構築
8. DOMツリーに紐づく[CSS](http://d.hatena.ne.jp/keyword/CSS)や画像などのリソースの取得、読み込み

### HTMLファイルの処理の流れ

9. 字句解析による[トーク](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)ンのリスト化
10. [構文解析](http://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%B2%F2%C0%CF)により[構文木](http://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%CC%DA)の構築
11. [構文木](http://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%CC%DA)内にある[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)を実行しつつDOMツリーの構築

### [CSS](http://d.hatena.ne.jp/keyword/CSS)の読み込み

読み込まれた[CSS](http://d.hatena.ne.jp/keyword/CSS)は、[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)エンジンによってパースされて CSSOM([CSS](http://d.hatena.ne.jp/keyword/CSS) Object Model)ツリーに変換される。

### 2. [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)実行(Scripting)

主な処理の流れは下記の通り。

12. 字句解析
13. [構文解析](http://d.hatena.ne.jp/keyword/%B9%BD%CA%B8%B2%F2%C0%CF)
14. [コンパイル](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%D1%A5%A4%A5%EB)
15. 実行

### 3. レイアウトツリー構築(Rendering)

主な処理の流れは下記の通り。

16. スタイルの計算
17. [CSS](http://d.hatena.ne.jp/keyword/CSS)ルールのマッチング処理
18. DOMの要[素数](http://d.hatena.ne.jp/keyword/%C1%C7%BF%F4) x [CSS](http://d.hatena.ne.jp/keyword/CSS)ルールセットの数のマッチング処理を行う
19. [CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)のマッチング
20. [CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)から、DOMに適用すべきか判定を行う
21. 適用される[CSS](http://d.hatena.ne.jp/keyword/CSS)プロパティの算出
22. マッチングした[CSS](http://d.hatena.ne.jp/keyword/CSS)ルールの優先度を計算しながら、適用するルールを算出する
23. レイアウト
24. 以下のようなものを決める、視覚的なレイアウト情報の計算を行うこと。
25. 要素の大きさ
26. 要素のマージン
27. 要素のパディング
28. 要素の位置
29. 要素のz軸の位置

### 4. [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)結果の描画(Painting)

30. ペイント
31. 2Dグラフィックエンジン向けの命令を生成する
32. ラスタライズ
33. 命令を元に、レイヤーごとに[ピクセル](http://d.hatena.ne.jp/keyword/%A5%D4%A5%AF%A5%BB%A5%EB)へと描画する
34. レイヤーの合成
35. [ピクセル](http://d.hatena.ne.jp/keyword/%A5%D4%A5%AF%A5%BB%A5%EB)にしたレイヤーを合成して最終的な[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)結果を生成

## 3. チューニングの基礎

### 「ハイパフォーマンスWebサイト-高速サイトを実現させる14のルール」のベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティス

ベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスも前提条件を理解していないと、逆効果の可能性もある。

36. HTTPリク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トを減らす
37. [CDN](http://d.hatena.ne.jp/keyword/CDN)を使う
38. Expiresヘッダを設定する
39. [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を[gzip](http://d.hatena.ne.jp/keyword/gzip)する
40. [スタイルシート](http://d.hatena.ne.jp/keyword/%A5%B9%A5%BF%A5%A4%A5%EB%A5%B7%A1%BC%A5%C8)は先頭に置く
41. [スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)は最後に置く
42. [CSS](http://d.hatena.ne.jp/keyword/CSS) expressionの使用を控える
43. [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)と[CSS](http://d.hatena.ne.jp/keyword/CSS)は外部ファイル化する
44. [DNS](http://d.hatena.ne.jp/keyword/DNS)ルックアップをへらす
45. [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)を縮小化する
46. リダイレクトを避ける
47. [スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)を重複させない
48. ETagの設定を変更する
49. [Ajax](http://d.hatena.ne.jp/keyword/Ajax)をキャッシュ可能にする

![](https://images-fe.ssl-images-amazon.com/images/I/51hIDIWHmYL._SL160_.jpg)

[ハイパフォーマンスWebサイト ―高速サイトを実現する14のルール](http://www.amazon.co.jp/exec/obidos/ASIN/487311361X/hacking15dog-22/)

- 作者: Steve Souders,ス[ティー](http://d.hatena.ne.jp/keyword/%A5%C6%A5%A3%A1%BC)ブサウダーズ,武舎広幸,福地太郎,武舎るみ
- 出版社/メーカー: [オライリージャパン](http://d.hatena.ne.jp/keyword/%A5%AA%A5%E9%A5%A4%A5%EA%A1%BC%A5%B8%A5%E3%A5%D1%A5%F3)
- 発売日: 2008/04/11
- メディア: 大型本
- 購入: 32人 クリック: 676回
- [この商品を含むブログ (125件) を見る](http://d.hatena.ne.jp/asin/487311361X/hacking15dog-22)

### 目標設定

50. パフォーマンス指標 RAIL

[developers.google.com](https://developers.google.com/web/fundamentals/performance/rail?hl=ja)

項目
基準時間
備考




Response
100ms



Animation
16ms
60FPSを満たすのに必要。

JSの実行時間は6ms以下が望ましい。


Idle
50ms
JSの処理とユーザからのアクションは同一のスレッドで行なわれるので、JSの実行時間が長いと良くない。


Load
1000ms

### [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)による測定

- [Navigation Timing API](https://developer.mozilla.org/ja/docs/Web/API/Navigation_timing_API)
- [User Timing API: あなたの Web アプリをもっと理解するために - HTML5 Rocks](https://www.html5rocks.com/ja/tutorials/webperformance/usertiming/)
- [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API)
- [Performance Observer](https://developers.google.com/web/updates/2016/06/performance-observer)

Date.now()は精度が低いので、perfomance.now()を使いましょう

### パフォーマンス診断ツール

## 4. リソース読み込みのチューニング

方針

51. 読み込むリソースの大きさと数を減らす
52. [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)をブロックする読み込みを減らす
53. ブラウザとサーバ間の遅延を減らす
54. ブラウザのキャッシュを活用する

### [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)の非同期読み込み

- 同期で読み込むと、[CSS](http://d.hatena.ne.jp/keyword/CSS)ファイルの読み込み等をブロックして、パフォーマンスが悪くなる
- 外部のjsファイルを参照する際には、deferかasyncを指定して非同期に読み込む
- DOMツリーが構築されてから[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)が実行される
- defer
- ファイルの読み込み順が保証される
- async
- ファイルの読み込み順が保証されない

### [CSS](http://d.hatena.ne.jp/keyword/CSS)の読み込み

- ブラウザは[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)前に、[CSS](http://d.hatena.ne.jp/keyword/CSS)の取得と読み込みを待つ。
- [CSS](http://d.hatena.ne.jp/keyword/CSS)の当たってないコンテンツが表示されると不快なため。
- [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)のブロックを防ぐために、メディアクエリを設定する。

media属性
説明




screen
PC,SPなどのディスプレイ


print
印刷時のみ


(min-width: 920px)
ビューポートの横幅が920px以上

### [CSS](http://d.hatena.ne.jp/keyword/CSS)スプライトを使って複数の画像をまとめる

![](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hacking15dog/20181126/20181126140642.png)

### リソースの事前読み込み

```plain text
// DNSプリフェッチ
<link rel="dns-prefetch" href="http://example.com">
// リソースの事前読み込み
<link rel="prefetch" href="./image.gif">
// ウェブページのプレレンダリング
<link rel="prerender" href="//example.com/prerender.html">
// 接続の投機的開始
<link rel="preconnect" href="//example.com">

```

### その他

55. [Gzip](http://d.hatena.ne.jp/keyword/Gzip)圧縮
56. [CDN](http://d.hatena.ne.jp/keyword/CDN)
57. [ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)シャーディング
58. [DNS](http://d.hatena.ne.jp/keyword/DNS)の名前解決で逆に遅延になりうるので要注意
59. ブラウザのキャッシュ
    1. Expiresヘッダー
    2. Cache-Controlヘッダー
    3. Last-Modifiedヘッダー
    4. ETagヘッダー
60. ServiceWorkerの利用

## 5. [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)実行のチューニング

### [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)の実行モデル

61. UIスレッド
62. [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)は基本的には、UIスレッド上で実行され、複数の[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)が並列で動くわけではない
63. レイアウトの計算や[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)処理やDOMイベントの発火もこのスレッドで実行される
64. イベントループと実行キュー
65. 実行キューを順に処理していく。
66. [Ajax](http://d.hatena.ne.jp/keyword/Ajax)などの非同期処理での待ち時間はブロックせずに他の処理が実行される。
67. alert()関数などは例外でUIスレッドをブロックする

### [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)の[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)を特定する

[Chrome](http://d.hatena.ne.jp/keyword/Chrome) DevToolsで[Javascript](http://d.hatena.ne.jp/keyword/Javascript)の実行のプロファイルを取る方法

68. Performanceパネルによる計測
69. [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)エンジンの行うほとんどの処理のプロファイルを取得できる
70. Memoryパネルによる計測

### [メモリリーク](http://d.hatena.ne.jp/keyword/%A5%E1%A5%E2%A5%EA%A5%EA%A1%BC%A5%AF)を防ぐ

71. console.log()も[メモリリーク](http://d.hatena.ne.jp/keyword/%A5%E1%A5%E2%A5%EA%A5%EA%A1%BC%A5%AF)の原因
    1. いつでも表示できるように、特殊な参照が付くため。
72. DOMリーク
    2. 親子などが参照を持つため、DOMツリー全体が[メモリリーク](http://d.hatena.ne.jp/keyword/%A5%E1%A5%E2%A5%EA%A5%EA%A1%BC%A5%AF)になる

### WeakMapとWeakSet

- オブジェクトを弱参照で持つことができる

### [Web Workers](http://d.hatena.ne.jp/keyword/Web%20Workers)の利用

UIスレッドとは別のバックグラウンドのスレッドで[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)のコードを実行できるようになる。

[developer.mozilla.org](https://developer.mozilla.org/ja/docs/Web/API/Web_Workers_API/Using_web_workers)

```plain text
// 論理コア数を得られる
navigator.hardwareConcurrency
```

一部のブラウザでのみしかサポートされていないが、推測するライブラリなども公開されている。

[github.com](https://github.com/oftn-oswg/core-estimator)

[Web Workers](http://d.hatena.ne.jp/keyword/Web%20Workers)で動作する[スクリプト](http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A5%D7%A5%C8)では、下記のオブジェクトが利用できない。

- DOM要素
- documentオブジェクト
- windowオブジェクト
- parentオブジェクト
- scrollなどの高頻発に発生するイベントをハンドリングする場合は、一定時間毎に処理を行うようにする
- モバイル端末でのclickイベント
- 一部のブラウザでは、clickイベントは[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)エンジンによって擬似的に発生する
- ダブルタップを検知するために、touchendから300ms後にclickイベントを発火する仕組みになっている
- input要素やa要素のclickイベントも含む。
- viewportの設定で回避する。

### ページ表示状態を確認する

```plain text
// ページが現在表示されているかどうか(他のタブを開いていないかどうか)
document.hidden

// 可視状態のevent
document.addEventListener('visibilitychnage', function(){})

document.visibilityState // visible, hidden, prerendering:
```

### DocumentFragment

DOM要素に一括で処理できる仕組み。
大量にDOM要素を追加したりするときに、有効的に使える。

### IntersectionObserver

あるDOM要素とそのDOM要素の親要素が視覚的に交差しているかどうかを監視できる。

### requestAnimationFrame

- setIntervalなどで指定した場合は、シングルスレッドのために実行時間が保証されない。

### [WebGL](http://d.hatena.ne.jp/keyword/WebGL)

- [Pixi.js](https://github.com/GoodBoyDigital/pixi.js)
- [Three.js](https://github.com/mrdoob/three.js/)

## 6. レイアウトツリー構築のチューニング

### レイアウトツリー構築の流れ

73. [CSS](http://d.hatena.ne.jp/keyword/CSS)のマッチング処理
74. 右から左に評価してマッチングするか処理する
75. DOM要素の位置情報を計算する

### レイアウトツリー構築におけるパフォーマンスの計測

### 高速な[CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)の記述

- [CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)の書き方と、DOMツリーも含めて考える
- [CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)をシンプルにする
- nestを深くしたりしない
- 子孫[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)・間接[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)を避ける
- 全称[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)との組み合わせを避ける

### BEMを用いる

76. [BEM](https://en.bem.info/)
77. [SMACSS](https://smacss.com/)
78. [AMCSS](http://amcss.github.io/)
79. [SUIT CSS](http://suitcss.github.io/)

### [CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)のマッチング処理を避ける

styleを動的に変えるには、2つ方法があるが、それぞれ用途に応じて使い分ける。

- styleを直接変更する
- 保守性は低い
- [CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)のマッチングが増加しないので、高速なパフォーマンスが求められる際には望ましい。
- DOMに[css](http://d.hatena.ne.jp/keyword/css)のクラスを付与する
- 保守性は高い
- [CSS](http://d.hatena.ne.jp/keyword/CSS)[セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)のマッチングが増えるので、高速なパフォーマンスが求められる際には望ましくない。

その他のマッチング処理を避ける方法

80. 利用していない[CSS](http://d.hatena.ne.jp/keyword/CSS)ルールセットを減らす
81. マッチング処理数 ≒ DOM数 x [CSS](http://d.hatena.ne.jp/keyword/CSS)ルールセット数
82. [UNCSS](https://github.com/uncss/uncss)等を利用して進めると便利。
83. 適用されていない[CSS](http://d.hatena.ne.jp/keyword/CSS)ルールセットを検出、削除できる
84. メディアクエリを指定する

### レイアウトを避ける

Layoutを引き起こす原因は主に3つ。

85. DOM要素の差表や大きさの変化
86. DOMツリーの構造の変化
87. DOM要素のコンテンツの変化
88. テキスト量が変わり、DOMの高さが変わるなど

### その他

- DOMツリーから切り離して処理する
- 全体に影響を及ぼさないように、DOMツリー外で操作してから、DOMツリー内に戻す
- レイアウトを減らす非表示
- visibilityCSSをhiddenに設定する(Layoutそのものは行われる)
- displayCSSをnoneに設定する
- img要素のサイズを固定する
- 画像読み込み前ではサイズがわからないので、読み込み後にLayoutが走る

## 7. [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)結果の描画のチューニング

### [レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)結果の描画の流れ

89. ペイント(Paint)
90. Display List(描画命令列)をレイヤーごとに生成
91. ラスタライズ(Rasterize)
92. Display Listを実行して、実際に[ピクセル](http://d.hatena.ne.jp/keyword/%A5%D4%A5%AF%A5%BB%A5%EB)化を行い、ビットマップを生成
93. レイヤーの合成(Composite Layers)
94. 各レイヤーを一枚に合成する

### 再描画

再描画が引き起こされる原因は3つ。

95. 前段階に当たるRenderingのLayoutが呼び出される
96. Paintingだけが呼び出されるとき
97. [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)でstyleプロパティのみが変更されたときなど
98. Composite Layersのみが呼び出される
99. opacityCSSプロパティが別の値に更新された場合
100. transformCSSプロパティが別の値に設定された場合、もしくは新たに設定された場合

[CSS](http://d.hatena.ne.jp/keyword/CSS)プロパティの変更がどのような作用を起こすかは、[CSS Triggers](https://csstriggers.com/)で確認できる。

### レイヤーの生成条件

### [GPU](http://d.hatena.ne.jp/keyword/GPU)によって合成されるレイヤー

101. 3D変形を指定したtransformCSSはプロパティを持つ要素
102. [WebGL](http://d.hatena.ne.jp/keyword/WebGL)を用いた[canvas](http://d.hatena.ne.jp/keyword/canvas)要素
103. ハードウェア[アクセラ](http://d.hatena.ne.jp/keyword/%A5%A2%A5%AF%A5%BB%A5%E9)レーションを有効にしている状態での2Dコンテキストを使用した[canvas](http://d.hatena.ne.jp/keyword/canvas)要素
104. [CSS](http://d.hatena.ne.jp/keyword/CSS) Filterを使用した要素

### translateZハック

transformCSSプロパティにtransformZ(0)を指定して、表示を変更せずにレイヤーを生成し、[GPU](http://d.hatena.ne.jp/keyword/GPU)で合成させるテクニック。

## 8. 高度なチューニング

### 1. 大量のDOM要素をあつかうバーチャル[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)

105. バーチャル[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)のコンセプト
106. UITableViewやListViewみたいなイメージ。
107. [アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)の概要
108. 高さのある空のscroll領域を生成する。
109. ユーザに見える部分の要素だけ、DOMツリーに追加して表示する

### 2. なめらかなアニメーション

110. 指標と基本的な考え方
111. RAILの指標に従って、評価する
112. 再[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)時の不要なフェーズを減らす
113. スタイルの計算をスキップする
114. DOMツリーに変更を加えないこと
115. styleを変更したいときは、直接指定すること
116. レイアウトをスキップする
117. transformを使う
118. ペイントをスキップする
119. opacityやtransformを使う
120. レイヤーの合成を最適化する
121. [GPU](http://d.hatena.ne.jp/keyword/GPU)上での処理を使い回せるように、translateZハックを使う

### 3. [CSS](http://d.hatena.ne.jp/keyword/CSS) Containmentで再[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)を最適化する

will-changeCSSプロパティと同様に、パフォーマンス最適化のために利用される[CSS](http://d.hatena.ne.jp/keyword/CSS)プロパティ。
DOM等が変更されて再[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)される場合には、document全体が対象になるケースが多いが、これを局所的に抑えるためのプロパティ。
現在は、[Chrome](http://d.hatena.ne.jp/keyword/Chrome)と[Opera](http://d.hatena.ne.jp/keyword/Opera)のみサポートされてる。

[CSS Containment Module Level 1](https://drafts.csswg.org/css-contain/)

## 9. 認知的チューニング

indicatorを表示するなどして、体感速度を良くしようと言う話。

- [IndexedDB](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API)ブラウザでのキャッシュ方法の一つ。