---
プロパティ: ""
Created: 2021-01-15T18:08:00
URL: https://qiita.com/lagenorhynque/items/389679018aafaabd2d24
Tags: [topic/技術/関数型プログラミング]
---
**ポリモーフィズム**([polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)); 多態, 多相)」というとオブジェクト指向プログラミングにおける**継承**(インターフェースの継承)による実現手法がよく知られている。
しかし、ポリモーフィズムを実現するための手法はオブジェクト指向的な型階層によるものに限らず様々なものがある。
ここでは、[Expression Problem](https://en.wikipedia.org/wiki/Expression_problem)に対する解決策として挙げられる、継承によらないポリモーフィズムの代表的な実現手法として、

- **型クラス**(type class)
- **プロトコル**(protocol)
- **マルチメソッド**(multimethod)

による実装を複数言語で試してみた。
いずれの方法も明示的な継承関係を必要とせず、拡張に対して開いているため、既存の型(例えば言語組み込み型)に対しても容易に拡張可能なことが特徴的で、ある種のインターフェース定義に対する実装を追加することで、いつでも適用範囲を拡大できる。

# 0. 継承([inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)); cf. [subtyping](https://en.wikipedia.org/wiki/Subtyping))

## Java

### インターフェース定義

Copied!

`public interface WhoAmI {
  String identify();
}`

### インターフェース実装

Copied!

`// クラス定義
public class Complex implements WhoAmI {
  private final double real;
  private final double imag;
  public Complex(double real, double imag) {
    this.real = real;
    this.imag = imag;
  }
  public double getReal() {
    return real;
  }
  public double getImag() {
    return imag;
  }
  @Override
  public String toString() {  // pretty print用に設定
    return String.format("Complex(%s, %s)", real, imag);
  }
  // 新たに定義する型に対して実装
  @Override
  public String identify() {
    return String.format("私はComplexの%sです。", this);
  }
}

// 既存の型に対して実装するのは直接的にはできない(Expression Problem)`

### インターフェース利用

Copied!

`public class Who {
  public static void ask(WhoAmI who) {
    System.out.println("あなたは誰? ―― " + who.identify());
  }
}

> Who.ask(new Complex(42.0, 0.0))
あなたは誰? ―― 私はComplexのComplex(42.0, 0.0)です。`

# 1. 型クラス([type class](https://en.wikipedia.org/wiki/Type_class))

## Haskell

### インターフェース定義

Copied!

`class WhoAmI a where
    identify :: a -> String`

### インターフェース実装

Copied!

- `- データ型定義
data Complex = Complex { real :: !Double , imag :: !Double } deriving Show
complex :: Complex -- デフォルト値設定
complex = Complex { real = 0.0, imag = 0.0 }
-- 新たに定義した型に対して実装
instance WhoAmI Complex where identify x = "私はComplexの" ++ show x ++ "です。"
-- 既存の型に対して実装
instance WhoAmI Integer where identify x = "あたしはIntegerの" ++ show x ++ "だよ〜。"
instance WhoAmI Double where identify x = "うちはDoubleの" ++ show x ++ "っ!"`

### インターフェース利用

Copied!

`ask :: WhoAmI a => a -> IO ()
ask who = putStrLn $ "あなたは誰? ―― " ++ identify who

> ask complex { real = 42.0 }
あなたは誰? ―― 私はComplexのComplex {real = 42.0, imag = 0.0}です。
> ask 42
あなたは誰? ―― あたしはIntegerの42だよ〜。
> ask 42.0
あなたは誰? ―― うちはDoubleの42.0っ!`

## Scala

### インターフェース定義

Copied!

`trait WhoAmI[A] {
  def identify(x: A): String
}
object WhoAmI {
  def identify[A: WhoAmI](x: A): String = implicitly[WhoAmI[A]].identify(x)
  // または、明示的にimplicit parameterを利用して
  // def identify[A](x: A)(implicit who: WhoAmI[A]): String = who.identify(x)
}`

### インターフェース実装

Copied!

`// ケースクラス定義
case class Complex(real: Double = 0.0, imag: Double = 0.0)

// 新たに定義した型に対して実装
implicit object ComplexWhoAmI extends WhoAmI[Complex] {
  def identify(x: Complex): String = s"私はComplexの${x}です。"
}

// 既存の型に対して実装
implicit object IntWhoAmI extends WhoAmI[Int] {
  def identify(x: Int): String = s"あたしはIntの${x}だよ〜。"
}
implicit object DoubleWhoAmI extends WhoAmI[Double] {
  def identify(x: Double): String = s"うちはDoubleの${x}っ!"
}`

### インターフェース利用

Copied!

`def ask[A: WhoAmI](who: A): Unit = println("あなたは誰? ―― " + WhoAmI.identify(who))

> ask(Complex(real = 42.0))
あなたは誰? ―― 私はComplexのComplex(42.0,0.0)です。
> ask(42)
あなたは誰? ―― あたしはIntの42だよ〜。
> ask(42.0)
あなたは誰? ―― うちはDoubleの42.0っ!`

# 2. プロトコル(protocol)

## Clojure

### インターフェース定義

Copied!

`(defprotocol WhoAmI
  (identify [x]))`

### インターフェース実装

Copied!

`;; レコード定義
(defrecord Complex [real imag])
(defn complex [& {:keys [real imag]  ; デフォルト値設定
                  :or {real 0.0, imag 0.0}}]
  (->Complex real imag))

;; 新たに定義した型に対して実装
(extend-protocol WhoAmI
  Complex
  (identify [x] (format "私はComplexの%sです。" (pr-str x))))

;; 既存の型に対して実装
(extend-protocol WhoAmI
  Long
  (identify [x] (format "あたしはLongの%sだよ〜。" x))
  Double
  (identify [x] (format "うちはDoubleの%sっ!" x)))`

### インターフェース利用

Copied!

`(defn ask [who]
  (println (str "あなたは誰? ―― " (identify who))))

> (ask (complex :real 42.0))
あなたは誰? ―― 私はComplexの#user.Complex{:real 42.0, :imag 0.0}です。
nil
> (ask 42)
あなたは誰? ―― あたしはLongの42だよ〜。
nil
> (ask 42.0)
あなたは誰? ―― うちはDoubleの42.0っ!
nil`

## Elixir

### インターフェース定義

Copied!

`defprotocol WhoAmI do
  def identify(x)
end`

### インターフェース実装

Copied!

`# 構造体定義
defmodule Complex do
  defstruct real: 0.0, imag: 0.0
end

# 新たに定義した型に対して実装
defimpl WhoAmI, for: Complex do
  def identify(x), do: "私はComplexの#{inspect(x)}です。"
end

# 既存の型に対して実装
defimpl WhoAmI, for: Integer do
  def identify(x), do: "あたしはIntegerの#{x}だよ〜。"
end
defimpl WhoAmI, for: Float do
  def identify(x), do: "うちはFloatの#{x}っ!"
end`

### インターフェース利用

Copied!

`  defmodule Who do
    def ask(who), do: IO.puts "あなたは誰? ―― " <> WhoAmI.identify(who)
  end

> Who.ask(%Complex{real: 42.0})
あなたは誰? ―― 私はComplexの%Complex{imag: 0.0, real: 42.0}です。
:ok
> Who.ask(42)
あなたは誰? ―― あたしはIntegerの42だよ〜。
:ok
> Who.ask(42.0)
あなたは誰? ―― うちはFloatの42.0っ!
:ok`

# 3. マルチメソッド(multimethod)/多重ディスパッチ([multiple dispatch](https://en.wikipedia.org/wiki/Multiple_dispatch))

## Clojure

### インターフェース定義

Copied!

`(defmulti identify class)`

### インターフェース実装

Copied!

`;; レコード定義
(defrecord Complex [real imag])
(defn complex [& {:keys [real imag]  ; デフォルト値設定
                  :or {real 0.0, imag 0.0}}]
  (->Complex real imag))

;; 新たに定義した型に対して実装
(defmethod identify Complex [x]
  (format "私はComplexの%sです。" (pr-str x)))

;; 既存の型に対して実装
(defmethod identify Long [x]
  (format "あたしはLongの%sだよ〜。" x))
(defmethod identify Double [x]
  (format "うちはDoubleの%sっ!" x))`

### インターフェース利用

Copied!

`(defn ask [who]
  (println (str "あなたは誰? ―― " (identify who))))

> (ask (complex :real 42.0))
あなたは誰? ―― 私はComplexの#user.Complex{:real 42.0, :imag 0.0}です。
nil
> (ask 42)
あなたは誰? ―― あたしはLongの42だよ〜。
nil
> (ask 42.0)
あなたは誰? ―― うちはDoubleの42.0っ!
nil`

## Common Lisp

### インターフェース定義

Copied!

`(defgeneric identify (x))`

### インターフェース実装

Copied!

`;; クラス定義
(defclass my-complex ()
  ((real
    :initarg :real
    :initform 0.0
    :reader re)
   (imag
    :initarg :imag
    :initform 0.0
    :reader im)))
(defmethod print-object ((x my-complex) stream)  ; pretty print用に設定
  (print-unreadable-object (x stream)
    (format stream "my-complex :real ~a :imag ~a" (re x) (im x))))

;; 新たに定義した型に対して実装
(defmethod identify ((x my-complex))
  (format nil "私はmy-complexの~aです。" x))

;; 既存の型に対して実装
(defmethod identify ((x integer))
  (format nil "あたしはintegerの~aだよ〜。" x))
(defmethod identify ((x float))
  (format nil "うちはfloatの~aっ!" x))`

### インターフェース利用

Copied!

`(defun ask (who)
  (princ (concatenate 'string "あなたは誰? ―― " (identify who))))

> (ask (make-instance 'my-complex :real 42.0))
あなたは誰? ―― 私はmy-complexの#<my-complex :real 42.0 :imag 0.0>です。
"あなたは誰? ―― 私はmy-complexの#<my-complex :real 42.0 :imag 0.0>です。"
> (ask 42)
あなたは誰? ―― あたしはintegerの42だよ〜。
"あなたは誰? ―― あたしはintegerの42だよ〜。"
> (ask 42.0)
あなたは誰? ―― うちはfloatの42.0っ!
"あなたは誰? ―― うちはfloatの42.0っ!"`

# まとめ

- 型クラス、プロトコル、マルチメソッドといった言語機能/手法によってもポリモーフィズムは実現できる
- これらは拡張に対して開いているという点で従来の継承によるポリモーフィズムよりも自由度が高い

# Further Reading

- [『プログラミングHaskell』](http://shop.ohmsha.co.jp/shop/shopdetail.html?brandcode=000000000045)
- 第10章 型とクラスの定義
- [『Scalaスケーラブルプログラミング 第3版』](http://book.impress.co.jp/books/1116101021)
- 第21章 暗黙の型変換とパラメーター
- [『プログラミングClojure 第2版』](http://shop.ohmsha.co.jp/shop/shopdetail.html?brandcode=000000001949)
- 第6章 プロトコルとデータ型
- 第8章 マルチメソッド
- [『プログラミングElixir』](http://shop.ohmsha.co.jp/shop/shopdetail.html?brandcode=000000004675)
- 第22章 プロトコル―――ポリモーフィック関数
- [『実践Common Lisp』](http://shop.ohmsha.co.jp/shop/shopdetail.html?brandcode=000000001789)
- 第16章 オブジェクト指向再入門：総称関数