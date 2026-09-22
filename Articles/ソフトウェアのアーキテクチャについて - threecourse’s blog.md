---
Created: 2021-05-02T14:44:00
URL: https://threecourse.hatenablog.com/entry/2020/10/17/162923
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[Attachments/無題のフォルダ/og-image-1500 1.png]]

最近、小〜中規模のプログラムを保守性高く記述するにはどうすればよいかが気になっていて、 ソフトウェアの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)について調べていました。

### 本を読んでみる

以下の本を浅めに読み通してみました。どの本もそれぞれ学ぶべき点があって興味深かったです。

- .NETの[エンタープライズ](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%BF%A1%BC%A5%D7%A5%E9%A5%A4%A5%BA)アプリケーション[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)第2版 [https://www.amazon.co.jp/dp/B00ZQZ8JNE](https://www.amazon.co.jp/dp/B00ZQZ8JNE) [C#](http://d.hatena.ne.jp/keyword/C%23)での設計の話。[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)駆動設計など、設計に関わるトピックが広く触れられていて良い。
- Adaptive Code [C#](http://d.hatena.ne.jp/keyword/C%23)実践開発手法 第2版 [https://www.amazon.co.jp/dp/B07DJ2BL4Y](https://www.amazon.co.jp/dp/B07DJ2BL4Y) [C#](http://d.hatena.ne.jp/keyword/C%23)での実装の話。SOLID原則を中心に、実装に関わるトピックが広く触れられていて良い。
- Clean Architecture 達人に学ぶソフトウェアの構造と設計 [https://www.amazon.co.jp/dp/B07FSBHS2V](https://www.amazon.co.jp/dp/B07FSBHS2V) もう少し具体的な話に突っ込んでほしい気はしつつ、[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)についての問題意識を全体的に学ぶことができる。
- アプリケーション[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)設計パターン [https://www.amazon.co.jp/dp/B076BY4VJH](https://www.amazon.co.jp/dp/B076BY4VJH) [Java](http://d.hatena.ne.jp/keyword/Java)のごつめの[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)を含む話。実務の問題意識に基づいていて具体的なのは好印象。
- 新装版 [リファクタリング](http://d.hatena.ne.jp/keyword/%A5%EA%A5%D5%A5%A1%A5%AF%A5%BF%A5%EA%A5%F3%A5%B0) 既存のコードを安全に改善する [https://www.amazon.co.jp/dp/B0831M1RK5](https://www.amazon.co.jp/dp/B0831M1RK5) [リファクタリング](http://d.hatena.ne.jp/keyword/%A5%EA%A5%D5%A5%A1%A5%AF%A5%BF%A5%EA%A5%F3%A5%B0)で行う処理に名前を付けてパターン化したもの。基本ではあるが、なるほどという感じ。
- Game Programming Patterns ソフトウェア開発の問題解決メニュー [https://www.amazon.co.jp/dp/B015R0M8W0](https://www.amazon.co.jp/dp/B015R0M8W0) [GoF](http://d.hatena.ne.jp/keyword/GoF)の[デザインパターン](http://d.hatena.ne.jp/keyword/%A5%C7%A5%B6%A5%A4%A5%F3%A5%D1%A5%BF%A1%BC%A5%F3)でなく、実際にゲーム関係で使われる[デザインパターン](http://d.hatena.ne.jp/keyword/%A5%C7%A5%B6%A5%A4%A5%F3%A5%D1%A5%BF%A1%BC%A5%F3)が説明されているのが良い。 Unityの思想が少し理解しやすくなる。
- [C++](http://d.hatena.ne.jp/keyword/C%2B%2B)のための[API](http://d.hatena.ne.jp/keyword/API)デザイン [https://www.amazon.co.jp/dp/B00EYXMA6Q](https://www.amazon.co.jp/dp/B00EYXMA6Q) [C++](http://d.hatena.ne.jp/keyword/C%2B%2B)で[API](http://d.hatena.ne.jp/keyword/API)を設計するという視点から、他の本で触れられていないトピックも扱われていて良い。

### 学んだこと

### [疎結合](http://d.hatena.ne.jp/keyword/%C1%C2%B7%EB%B9%E7)の重要性

とにかく[疎結合](http://d.hatena.ne.jp/keyword/%C1%C2%B7%EB%B9%E7)にすることが重要。分割すると脳のリソースにも優しいし、分担して作業できるし、テストもできる。

[インターフェイス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%D5%A5%A7%A5%A4%A5%B9)は、振る舞いだけを定義し、基本的に実装を記述しない要素。[C#](http://d.hatena.ne.jp/keyword/C%23)などの強い型付けの言語では使われるが、[Python](http://d.hatena.ne.jp/keyword/Python)などではあまり使われない印象がある（[Python](http://d.hatena.ne.jp/keyword/Python)のabcモジュールはあるが）[インターフェイス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%D5%A5%A7%A5%A4%A5%B9)を使うと、具体的なクラスでなく振る舞いに対して記述することが強く意識付けられ、 具体的なクラスに依存しづらくなるため、[疎結合](http://d.hatena.ne.jp/keyword/%C1%C2%B7%EB%B9%E7)なプログラムを作りやすいように思える。

### 依存性の注入([Dependency](http://d.hatena.ne.jp/keyword/Dependency) Injection)

「依存オブジェクトの注入」と理解した方が良さそう。 依存オブジェクトを内部で生成するとテストがしづらいが、コンスト[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)タなどから与えるとモックなどを使ったテストができるようになる。
 注入が必要な依存オブジェクトが増えると面倒になるが、その場合にはDI[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)を用いる選択肢がある。

### （参考）SOLID原則

※各原則は私の要約です。（書籍などに明確に定義が記述されていないものもあるため）

### S - 単一責務の原則

「クラスを変更する理由はひとつのみであるべき」
 クラスの責務はひとつのみであるべき。それはそう。

### O - 開放・閉鎖の原則

「拡張に対して開いており、変更に対して閉じているべき」 
 要するに、モジュールの振る舞いを拡張できるとともに、拡張したときに既存のコードに変更が発生しないということ。
 これを満たすには、モジュールの機能をどう拡張するかの拡張ポイントを考えることになる。

### L - リスコフの置換原則

「SがTの派生型であるとすれば、T型のオブジェクトをS型のオブジェクトと置き換えたとしても、プログラムは動作しつづけるはず」
 要するに、あるオブジェクトを派生型のオブジェクトに置き換えたとしても動作しつづけるはずということ。 これもそれはそう。

「クライアントが使用しないメソッドに依存するよう強制されるべきではない」
 上記「[インターフェイス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%D5%A5%A7%A5%A4%A5%B9)」参照

### D - 依存性反転の原則

「上位レベルのモジュールは下位レベルのモジュールに依存すべきではない。両方とも抽象に依存すべき」
 「抽象は詳細に依存してはならない。詳細が抽象に依存すべき」
 確かにそれはそう。実現するには、[インターフェイス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%BF%A1%BC%A5%D5%A5%A7%A5%A4%A5%B9)を使った上で依存関係を上手くほぐしていく必要がありそう。