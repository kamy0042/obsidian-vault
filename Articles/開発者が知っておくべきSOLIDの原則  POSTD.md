---
Created: 2021-01-15T20:37:00
URL: https://postd.cc/solid-principles-every-developer-should-know/
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
(編注：2020/08/18、いただいたフィードバックをもとに記事を修正いたしました。)

![](https://cdn-images-1.medium.com/max/2000/1*27QJ5_kV-4rQJ9uhDxVc3w.jpeg)

オブジェクト指向プログラミングが、ソフトウェア開発に新しい設計を持ち込みました。

その結果、開発者は単一の目的を処理するために、全体のアプリケーションに関係なく、1つのクラスの中で、同じ目的や機能を持つデータを結び付けることができるようになりました。

しかし、このオブジェクト指向プログラミングで、分かりにくいプログラムやメンテナンスができないプログラムを防ぐことはできません。

そこで、5つのガイドラインがRobert C. Martinによって作り出されました。これら5つのガイドラインすなわち原則により、開発者にとって読みやすく、メンテナンスが可能なプログラムを作成しやすくなりました。

5つの原則は、S.O.L.I.Dの原則と呼ばれています（頭字語はMichael Feathereによって名付けられました)。

- S：SRP、単一責任の原則
- O：OCP、解放閉鎖の原則
- L：LSP、リスコフの置換原則
- I：ISP、インタフェース分離の原則
- D：DIP、依存性逆転の原則

以下に、これらを詳しく説明しましょう。

**注意：**この投稿中の例のほとんどは、本物としては不十分で物足りなく、現実世界でのアプリケーションには当てはまらないかもしれません。アプリケーションの設計やユースケースに完全に左右されます。**最も重要**なことは、これらの原則を理解し、どのように適用して従うのかを知ることです。

**ヒント：**SOLIDの原則はモジュール性、カプセル化、拡張可能、組み立て可能なコンポーネントを使ってソフトウェアを構築するために設計されています。[Bit](https://github.com/teambit/bit)はこれらの原則を実行するのために最適なツールです。これを使えば、規模の大きいさまざまなプロジェクトでチームとして、このようなコンポーネントを分離したり、共有したり、管理したり簡単にできるようになります。試してみてください。

![](https://postd.cc/wp/wp-content/uploads/2019/01/d_bit.jpg)

*注釈：Bit、コードコンポーネントを共有、ビルドする**
Bitを使えばプロジェクトやアプリケーション間で、新しい機能をビルドするために、コードコンポーネントを共有したり、見つけたり、使ったりできるようになります。また…*

SOLIDの原則とBitについて、もっと知りたい方は[こちら](https://blog.bitsrc.io/introducing-bit-writing-code-in-the-age-of-code-components-fd8512a9aa90)。

## 単一責任の原則

> “任せた仕事は1つだけだったのに…”、LokiからSkurgeへ、出典：トロイ、ラグナロク
  クラスに任せる仕事は1つにするべきだ。

クラスは1つのことだけ責任を負うべきです。もし複数の責任を負っているとすれば、それは連動してしまいます。1つの責任への変更が、他の責任への変更をもたらしてしまいます。

- **注意：**この原則は、クラスだけではなく、ソフトウェアコンポーネントやマイクロサービスにも当てはまります。

例えば、次のような設計を考えてみます。

```plain text
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
    saveAnimal(a: Animal) { }
}

```

Animalクラスは、SRPに違反しています。

*どのようにSRPに違反しているのでしょうか？*

SRPでは、クラスが責任を負うのは1つにするべきだと述べていますが、ここでは、2つの責任を負わせることができます。animalデータベースの管理と、animalプロパティの管理です。コンストラクタとgetAnimalNameはAnimalプロパティを管理し、saveAnimalはデータベース上のAnimalストレージを管理します。

この設計が、今後どのように問題を引き起こすのでしょうか？

アプリケーションがデータベースを管理する関数に影響を及ぼすよう変更された場合。Animalプロパティを利用するクラスは、新しい変更を補うために確認され、再コンパイルされなければならないでしょう。
このシステムは柔軟性が無いように思われるでしょう。これは連鎖反応のようなものです。あるカードに触れると、後に続く他のカード全てに影響が及びます。

これをSRPに一致させるため、以下のように、データベースにanimalを格納する単一の責任を負う別のクラスを生成します。

```plain text
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
}
class AnimalDB {
    getAnimal(a: Animal) { }
    saveAnimal(a: Animal) { }
}

```

> クラスを設計する時には、関連する機能も含めた目標を定めるべきだ。そうすれば、いつ変更する準備をしたとしても、同じ理由で変更する。また、異なる理由で変更するなら、機能を分離しようとするべきである。　－Steve Fenton

このような正しいアプリケーションを用いれば、アプリケーションの凝集性が高まります。

## 開放閉鎖の原則

> ソフトウェアのエンティティ（クラス、モジュール、関数）は拡張に対して開き、修正に対して閉じていなければならない。

Animalクラスの話に戻りましょう。

```plain text
class Animal {
    constructor(name: string){ }
    getAnimalName() { }
}

```

animalのリストを順に処理し、その泣き声を出したいと思います。

```plain text
//...
const animals: Array<Animal> = [
    new Animal('lion'),
    new Animal('mouse')
];
function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(a[i].name == 'lion')
            log('roar');
        if(a[i].name == 'mouse')
            log('squeak');
    }
}
AnimalSound(animals);

```

関数AnimalSoundは開放閉鎖の原則に従っていません。なぜなら、新しい種類のanimalに対して閉じることができないからです。

新しいanimal、Snakeを追加したら、以下のようになります。

```plain text
//...
const animals: Array<Animal> = [
    new Animal('lion'),
    new Animal('mouse'),
    new Animal('snake')
]
//...

```

AnimalSound関数を変更しなければなりません。

```plain text
//...
function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(a[i].name == 'lion')
            log('roar');
        if(a[i].name == 'mouse')
            log('squeak');
        if(a[i].name == 'snake')
            log('hiss');
    }
}
AnimalSound(animals);

```

お分かりのように、新しいanimalごとに、AnimalSound関数に新しいロジックが追加されます。これは、非常に単純な例です。アプリケーションの規模が大きくなり複雑化すると、アプリケーションの全体にわたって、新しいanimalが追加されるたび`AnimalSound`関数の中に`if`文が何度も繰り返されていくのが分かるでしょう。

どうやってAnimalSoundをOCPに一致させるのでしょうか？

```plain text
class Animal {
        makeSound();
        //...
}
class Lion extends Animal {
    makeSound() {
        return 'roar';
    }
}
class Squirrel extends Animal {
    makeSound() {
        return 'squeak';
    }
}
class Snake extends Animal {
    makeSound() {
        return 'hiss';
    }
}
//...
function AnimalSound(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        log(a[i].makeSound());
    }
}
AnimalSound(animals);

```

今度はAnimalに仮想メソッド`makeSound`があります。それぞれのanimalをAnimalクラスに拡張させ、仮想のmakeSoundメソッドを実装します。
あらゆるanimalはmakeSoundの中で、泣き声を出す方法について独自の実装を追加します。AnimalSoudはanimalの配列を順に処理し、makeSoundメソッドをただ呼び出します。
これからは、新しいanimalを追加した場合、AnimalSoundを変更する必要はありません。新しいanimalをanimal配列に追加するだけです。

これでAnimalSoundはOCP原則に一致しました。

別の例を挙げてみます。

あなたはお店を営んでいるとします。下に示すクラスを使って、得意先の顧客に対して20％のディスカウントを行うとします。

```plain text
class Discount {
    giveDiscount() {
        return this.price * 0.2
    }
}

```

VIPの顧客に対して、20％の倍のディスカウントを行おうと決めた時、このクラスを次のように変更するでしょう。

```plain text
class Discount {
    giveDiscount() {
        if(this.customer == 'fav') {
            return this.price * 0.2;
        }
        if(this.customer == 'vip') {
            return this.price * 0.4;
        }
    }
}

```

いえ、これはOCPの原則に不適格です。OCPが禁じています。違ったタイプの顧客に対し新しい値引き率を適用したいなら、新しいロジックを追加する必要があると分かるでしょう。

これをOCPの原則に従うようにするために、Discountを拡張した新しいクラスを追加します。この新しいクラスにおいて、新しい動作を実装します。

```plain text
class VIPDiscount: Discount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}

```

また特別VIPな顧客に対して80％のディスカウントを行うことを決めた場合、これは以下のようにしなくてはいけません。

```plain text
class SuperVIPDiscount: VIPDiscount {
    getDiscount() {
        return super.getDiscount() * 2;
    }
}

```

変更点の無い拡張ですね。

## リスコフの置換原則

> スーパークラスは、そのサブクラスで代用可能でなければならない

この原則の目的は、サブクラスがエラー無く、そのスーパークラスの場所を引き継げることを確かめることです。コードでクラスの型をチェックしているのであれば、この原則に違反しているに違いありません。

Animalを例にとって見てみましょう。

```plain text
//...
function AnimalLegCount(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(typeof a[i] == Lion)
            log(LionLegCount(a[i]));
        if(typeof a[i] == Mouse)
            log(MouseLegCount(a[i]));
        if(typeof a[i] == Snake)
            log(SnakeLegCount(a[i]));
    }
}
AnimalLegCount(animals);

```

これは、LSPの原則に（さらにOCPの原則にも）違反しています。全てのAnimalの型を知り、関連する`leg-counting`関数を呼び出さなければなりません。
animalを新しく追加するたび、新しいanimalを受け入れるために関数を変更する必要があります。

```plain text
//...
class Pigeon extends Animal {

}

const animals[]: Array<Animal> = [
    //...,
    new Pigeon();
]

function AnimalLegCount(a: Array<Animal>) {
    for(int i = 0; i <= a.length; i++) {
        if(typeof a[i] == Lion)
            log(LionLegCount(a[i]));
        if(typeof a[i] == Mouse)
            log(MouseLegCount(a[i]));
         if(typeof a[i] == Snake)
            log(SnakeLegCount(a[i]));
        if(typeof a[i] == Pigeon)
            log(PigeonLegCount(a[i]));
    }
}
AnimalLegCount(animals);

```

この関数をLSPの原則に従うようにするため、Steve Fentonによって唱えられた次のLSPの要求事項に従います。

- スーパークラス（Animal）がスーパークラス型の（Animal）パラメータを受け入れるメソッドを持っている場合、そのサブクラス（Pigeon）も引数として、スーパークラス型（Animal type）あるいは、サブクラス型（Pigeon type）を受け入れなければならない。
- スーパークラスがスーパークラス型（Animal）を返す場合、そのサブクラスはスーパークラス型（Animal type）あるいは、サブクラス型（Pigeon）を返さなければならない。

それでは、AnimalLegCount関数を以下のように、再実装してみましょう。

```plain text
function AnimalLegCount(a: Array<Animal>) {
    for(let i = 0; i <= a.length; i++) {
        a[i].LegCount();
    }
}
AnimalLegCount(animals);

```

AnimalLegCount関数は、Animal型が通過しても気にせず、ただLegCountメソッドを呼び出すだけです。分かっているのは、パラメータがAnimal型で、Animalクラスかそのサブクラスのどちらかでなければならないということだけです。

今は、AnimalクラスにLegCountメソッドを実装、定義する必要があります。

```plain text
class Animal {
    //...
    LegCount();
}

```

また、そのサブクラスにも、LegCountメソッドを実装しなければなりません。

```plain text
//...
class Lion extends Animal{
    //...
    LegCount() {
        //...
    }
}
//...

```

AnimalLegCount関数を通過した時には、関数はlionが持っているlegの数を返します。

お分かりのように、AnimalLegCountはそのleg数を返すのに、Animalの型を知る必要はありません。ただ、Animalクラスのサブクラスに、LegCount関数が実装されていなければならないという取り決めにより、Animal型のLegCountメソッドをただ呼び出します。

## インタフェース分離の原則

> 顧客に特化した細粒度のインタフェースを作れ
  顧客は自分たちが使わないインターフェースに依存することを強いられるべきではない

この原則では、大きなインターフェースの実装における短所を取り上げます。

それでは、以下のIShapeインターフェースについて見ていきましょう。

```plain text
interface IShape {
    drawCircle();
    drawSquare();
    drawRectangle();
}

```

このインターフェースでは、square、circle、rectangleを描きます。IShapeインターフェースを実装しているCircleクラス、Squareクラス、Rectangleクラスは各メソッドdrawCircle()、drawSquare()、drawRectangle()を定義しなければなりません。

```plain text
class Circle implements IShape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}

class Square implements IShape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}

class Rectangle implements IShape {
    drawCircle(){
        //...
    }
    drawSquare(){
        //...
    }
    drawRectangle(){
        //...
    }    
}

```

このコードを見ると、とても奇妙に思えます。Rectangleクラスは利用することのないdrawCircleメソッドとdrawSquareメソッドを実装しています。同じように、SquareクラスはdrawCircleメソッドとdrawRectangleメソッドを、Circleクラスは、drawSquareメソッドとdrawRectangleメソッドを実装しています。

別のメソッド、例えばdrawTriangel()を、IShapeインターフェースに追加すると以下のようになります。

```plain text
interface IShape {
    drawCircle();
    drawSquare();
    drawRectangle();
    drawTriangle();
}

```

新しいメソッドをクラスに実装しなければ、エラーが発生します。
rectangleやsquareやtriangleではなくcircleを描画できるshapeを実装することは不可能だと分かります。オペレーションを実行することができないと表示するエラーを出力するメソッドをただ実装できるだけです。

ISPはこのIShapeインターフェースの設計に対して難色を示します。クライアント（ここではRectangle、Circle、Square）は不要だったり、使用しないメソッドに依存することを強いられるべきではありません。また、ISPはインターフェースは1つのジョブだけを（SRPの原則と同様に）実行するべきだと述べており、余分なbehaviorのグループ化は全て取り除き他のインターフェースに移動させるべきです。
ここで、IShapeインターフェースは他のインターフェースにより別々に処理されなくてはいけないアクションを実行します。

このIShapeインターフェースをISPの原則に従わせるために、actionを異なるインターフェースに分離します。

```plain text
interface IShape {
    draw();
}

interface ICircle {
    drawCircle();
}

interface ISquare {
    drawSquare();
}

interface IRectangle {
    drawRectangle();
}

interface ITriangle {
    drawTriangle();
}

class Circle implements ICircle {
    drawCircle() {
        //...
    }
}

class Square implements ISquare {
    drawSquare() {
        //...
    }
}

class Rectangle implements IRectangle {
    drawRectangle() {
        //...
    }    
}

class Triangle implements ITriangle {
    drawTriangle() {
        //...
    }
}

class CustomShape implements IShape {
   draw(){
      //...
   }
}

```

ICircleインターフェースはcircleの描画だけを処理します。IShapeはどんなShapeの描画も処理します。ISquareはsquareの、IRectangleはrectangleの描画だけを扱います。

あるいは

クラス（Circle、Rectangle、Square、Triangleなど）は、IShapeインターフェースから単に継承し、それぞれの`draw`のbehaviorを実装することができます。

```plain text
class Circle implements IShape {
    draw(){
        //...
    }
}

class Triangle implements IShape {
    draw(){
        //...
    }
}

class Square implements IShape {
    draw(){
        //...
    }
}

class Rectangle implements IShape {
    draw(){
        //...
    }
}         

```

Semi Circle、Right-Angled Triangle、Equilateral Triangle、Blunt-Edged Rectangleのような明示されたShapeを作成するために`I`-インターフェースを使用することができます。

## 依存性逆転の原則

> 依存性は、具体化ではなく抽象化でなければならない。
  A. 高水準モジュールは低水準モジュールに依存してはならない。両者は、抽象化に依存するべきである。
  B. 抽象化は、詳細に依存してはならない。詳細は、抽象化に依存するべきである。

ソフトウェア開発において、アプリがモジュールで構成され大きくなることがあります。このような場合、*依存性注入*を用いて物事をきちんと整理しなければなりません。機能するための低水準コンポーネントに依存する高水準コンポーネントです。

```plain text
class XMLHttpService extends XMLHttpRequestService {}

class Http {
    constructor(private xmlhttpService: XMLHttpService) { }
    get(url: string , options: any) {
        this.xmlhttpService.request(url,'GET');
    }
    post() {
        this.xmlhttpService.request(url,'POST');
    }
    //...
}

```

ここで、Httpは高水準コンポーネントで、HttpServiceは低水水準コンポーネントです。この設計は、DIPのA「高水準モジュールは低水準モジュールに依存してはならない。両者は、抽象化に依存するべきである」に違反しています。

このHttpクラスは、XMLHttpServiceクラスに依存することを強いられています。Httpコネクションサービスを移行するために変更を加える場合、恐らくNodejs を経由してインターネットに接続したい、あるいはhttpサービスを実はMockしたいと考えるかもしれません。コードを編集するためHttpのインスタンスを全て慎重に通り抜けなければいけません。これがOCPの原則に違反しているのです。

Httpクラスは、使用しているHttp serviceの型など気にするべきではありません。下のようにConnetionインターフェースを作成します。

```plain text
interface Connection {
    request(url: string, opts:any);
}

```

`Connection`インターフェースは、リクエストメソッドを持っています。これを用いて、`Http`クラスに`Connection`型の引数を渡します。

```plain text
class Http {
    constructor(private httpConnection: Connection) { }
    get(url: string , options: any) {
        this.httpConnection.request(url,'GET');
    }
    post() {
        this.httpConnection.request(url,'POST');
    }
    //...
}

```

そして今は、Http connection serviceの型がHttpを通過しても、network connectionの型を知ろうと悩むことはなく、簡単にネットワークに接続することができます。
Connectionインターフェースを実装するために、XMLHttpServiceクラスを再実装できます。

```plain text
class XMLHttpService implements Connection {
    const xhr = new XMLHttpRequest();
    //...
    request(url: string, opts:any) {
        xhr.open();
        xhr.send();
    }
}

```

多くのHttp　`Connection`の型を作成し、エラーについて全く気をもむこともなく、Httpクラスにそれを渡すことができます。

```plain text
class NodeHttpService implements Connection {
    request(url: string, opts:any) {
        //...
    }
}

class MockHttpService implements Connection {
    request(url: string, opts:any) {
        //...
    }    
}

```

さて、高水準モジュールも低水準モジュールも抽象化に依存していることが分かるでしょう。`Http`クラス（高水準モジュールは`Connection`インターフェース（抽象化）に依存していますし、Http serviceの型（低水準モジュール）は同様に`Connection`インターフェース（抽象化）に依存しています。

また、このDIPはリスコフの置換原則に違反しないことも求めています。`Connection`型の`Node`–`XML`–`MockHttpService`はその親の`Connection`型の代わりに使用できます。

## まとめ

今回は、ソフトウェア開発者が順守しなければならない5つの原則を取り上げました。最初はこれら全ての原則に従うことに、気がめいってしまうかもしれません。しかし、着実に実践し、順守していくうちに、自分のものとなり、アプリケーションのメンテナンスに多大なる影響をもたらすでしょう。

この投稿に関するご質問や、加筆、修正、削除すべき点があれば、下記からお知らせください。お待ちしてます。

## 連絡先

次のリンクから、ご連絡ください。

- [Twitter](https://twitter.com/ngArchangel)
- [Facebook](https://www.facebook.com/philip.david.5011)
- [Medium](https://medium.com/@kurtwanger40)

以下からお気軽にGitHubのBitを訪れてみてください。*注釈：チームメンバとプロジェクト間のコードを簡単にシェア- teambit/bit*

![](https://postd.cc/wp/wp-content/uploads/2019/01/d_team-bit.jpg)