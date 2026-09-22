---
Created: 2021-06-17T02:35:00
URL: https://www.techscore.com/tech/DesignPattern/Adapter/Adapter1.html/
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
## 2.1 Adapterパターンとは

第2章では Adapter パターンを学びます。adaptという単語は日本語で「適合させる」という意味で、adapterとは「適合させるもの」という意味になります。Adapterパターンは、インタフェースに互換性の無いクラス同士を組み合わせることを目的としたパターンです。

例えば、これまで利用していたメソッドと同じ機能を、よりすぐれた形で提供するメソッドを持つクラスの存在を知ったとします。しかし、このすぐれたメソッドは、これまで利用していたメソッドとは異なるインタフェースを持つため、乗り換えるとなると多大な変更を余儀なくされる場合があります。こんなとき、この2つのメソッドのインタフェースの違いを吸収してやる Adapter を準備することで、少ない変更で新しいメソッドに乗り換えることができるのです。

このような目的を果たすため Adapter パターンでは、2つの方法を与えています。一方は継承を利用した方法で、もう一方は委譲を利用したものです。

それでは、サンプルケースを見てみましょう。

## 2.2 サンプルケース1（継承を利用した Adapter パターン）

あなたは、相変わらず学校の先生をしています。少しずつ学校にも慣れてきたのですが、あなたのクラスはみんなばらばらで、まったくまとまりがありません。あなたは、学級代表を決める必要があると感じ、太郎君に学級代表を任せようと思いました。

<!-- Column 1 -->


<!-- Column 2 -->


<!-- Column 3 -->
太郎君なら、みんなが一緒になって楽しめる学級を作り上げてくれるだろう。 みんなが一緒になって楽しむことができれば、おのずとまとまりも出てくるはずだ！

放課後、あなたは太郎君を職員室に呼び出しました。

<!-- Column 1 -->


<!-- Column 2 -->


<!-- Column 3 -->


話は一向にまとまりそうに無く、陽も落ちてきたので、あなたは太郎君を帰らせました。さてどうしたものでしょう・・・。困り果てたあなたはベテラン先生に相談してみることにしました。

![[Archive/import/2．Adapter パターン 1  TECHSCORE(テックスコア)/New database/New database.base]]

<!-- Column 1 -->
```plain text
public
```

```plain text
class
```

```plain text
Taro{
```

```plain text
public
```

```plain text
void
```

```plain text
enjoyWithAllClassmate(){
```

```plain text
System.out.println(
```

```plain text
"みんなで楽しむ"
```

```plain text
);
```

```plain text
}
```

```plain text
}
```

<!-- Column 1 -->
```plain text
public
```

```plain text
interface
```

```plain text
Chairperson{
```

```plain text
public
```

```plain text
void
```

```plain text
organizeClass();
```

```plain text
}
```

<!-- Column 1 -->
```plain text
public
```

```plain text
class
```

```plain text
Teacher{
```

```plain text
public
```

```plain text
static
```

```plain text
void
```

```plain text
main(String args[]){
```

```plain text
Chairperson chairperson =
```

```plain text
new
```

```plain text
Taro();
```

```plain text
chairperson.organizeClass();
```

```plain text
}
```

```plain text
}
```

![[Attachments/無題のフォルダ/adapter1.gif]]

![[Archive/import/2．Adapter パターン 1  TECHSCORE(テックスコア)/New database/New database.base]]

![[Attachments/無題のフォルダ/adapter2.gif]]

次の日あなたは、太郎君をもう一度呼び出しました。

![[Archive/import/2．Adapter パターン 1  TECHSCORE(テックスコア)/New database/New database.base]]

話はすんなりまとまりました。

## （実習課題1）

Taro クラスと Chairperson インタフェースのインタフェースの違いを埋めるように NewTaro クラスを実装しなさい。 Teacher クラスのmain メソッドの中身を変更することは問題ありません。

## 実習課題1の回答

少し成長した太郎君のソースコードは、以下のようになると考えられます。

<!-- Column 1 -->
```plain text
public
```

```plain text
class
```

```plain text
NewTaro
```

```plain text
extends
```

```plain text
Taro
```

```plain text
implements
```

```plain text
Chairperson{
```

```plain text
public
```

```plain text
void
```

```plain text
organizeClass(){
```

```plain text
enjoyWithAllClassmate();
```

```plain text
}
```

```plain text
}
```

この際、Teacher クラスは以下のように変更する必要があるでしょう。

<!-- Column 1 -->
```plain text
public
```

```plain text
class
```

```plain text
Teacher{
```

```plain text
public
```

```plain text
static
```

```plain text
void
```

```plain text
main(String args[]){
```

```plain text
Chairperson chairperson =
```

```plain text
new
```

```plain text
NewTaro();
```

```plain text
chairperson.organizeClass();
```

```plain text
}
```

```plain text
}
```

太郎君は、少し成長し、学級代表に求められる organizeClass というメソッドが呼ばれたときに、自らの enjoyWithAllClassmate メソッドを呼ぶようにしています。こうすることで、先生は「太郎君クラスをまとめて」と言えば、先生が期待する太郎君の能力を利用できるようになるました。

このように、これまでの太郎君を継承し、なおかつ Chairperson インタフェースを実装することで、太郎君が以前から持っていた能力を、「クラスをまとめる能力」として利用することができるようになりました。

ここで、Adapter パターンを利用していなければ、どのようになっていたでしょう？あなたは、クラスをまとめてほしいときに「太郎君、ちょっとみんなで楽しめるクラスにしてちょうだい」などと、わけのわからないことを言う必要があったかもしれません。さらには、太郎君が別の誰かに、「ちょっとクラスをまとめて」と頼まれたときに、「僕にはそんな能力がありません」と断ることになっていたかも知れません。それに、太郎君のすばらしい能力を「クラスをまとめる」ことに使えることを知っているのが、あなただけになってしまっていた可能性もあります。Adapter パターンを使って本当に良かったですね。

継承を利用した Adapter パターンの一般的なクラス図を描いて見ましょう。

![[Attachments/無題のフォルダ/adapter3.gif]]

サンプルケースでは、 Adapter クラスの役割を NewTaro クラスが担っていたわけです。このように、利用したいメソッドを持つクラスを拡張し、利用したいメソッドを定義するインタフェースを実装する Adapter を間に挟むことで、両者のインタフェースの違いを吸収しているのです。