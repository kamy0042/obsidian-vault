---
プロパティ: ""
Created: 2021-01-15T18:08:00
URL: https://qiita.com/msakuta/items/e723bbb889c9bba464b3
Tags: [topic/技術/関数型プログラミング]
---
ポリモーフィズムとは一言でいうと同じコードの中の同じ変数が、実際の値に応じて異なる振る舞いをすることを言います。
たとえば `a + b` という式が行う処理は、 a と b が数値型かベクトルかによって変化するような性質のことです。

特にオブジェクト指向におけるポリモーフィズムとは、仮想関数を継承＆オーバーライドすることによってオブジェクトの実体ごとに異なる挙動を持たせるということを意味することが多いです。

# オブジェクト指向

まず、オブジェクト指向でもって普通に継承とオーバーライドで実装してみます。`console.log("behaving...")` の部分は、実際にはめちゃくちゃ長いコードで、繰り返し書きたくない、なんて場合を想像してください。

Copied!

`class Animal{
  behave(){
    console.log("behaving...")
    this.cry()
  }
}

class Cat extends Animal{
  cry(){
    console.log("meow")
  }
}

class Dog extends Animal{
  cry(){
    console.log("bow wow")
  }
}

const cat = new Cat()
const dog = new Dog()

cat.behave()
dog.behave()`

# 関数型？

関数型アプローチではこのようになります。
めちゃくちゃ短いですね。

Copied!

`const behave = cry => () => {
  console.log("behaving...")
  cry();
}

const cat = behave(() => console.log("meow"))
const dog = behave(() => console.log("bow wow"))

cat()
dog()`

# 複数のクラス階層

ここで人間に登場してもらって、２足歩行する動物として `legs()` メソッドで `2` を返してもらいます。
４足歩行する犬と猫は共通の `QuadrupedalAnimal` を継承して `legs()` メソッドを共有してもらいましょう。

Copied!

`class Animal{
  behave(){
    console.log("behaving...")
    this.cry()
    console.log(`walking with ${this.legs()} legs...`)
  }
}

class QuadrupedalAnimal extends Animal{
  legs(){
    return 4;
  }
}

class Cat extends QuadrupedalAnimal{
  cry(){
    console.log("meow")
  }
}

class Dog extends QuadrupedalAnimal{
  cry(){
    console.log("bow wow")
  }
}

class Human extends Animal{
  cry(){
    console.log("boo hoo")
  }
  legs(){
    return 2;
  }
}

const cat = new Cat()
const dog = new Dog()
const human = new Human()

cat.behave()
dog.behave()
human.behave()`

こんな単純なことをするのにやたら長いですね。

# 関数の部分適用

関数型なら部分適用によって中間層のクラスに相当するものを作るのも容易です。

Copied!

`const behave = (cry, legs) => () => {
  console.log("behaving...")
  cry()
  console.log(`walking with ${legs()} legs...`)
}

const quadrupedalAnimal = cry => behave(cry, () => 4)
const cat = quadrupedalAnimal(() => console.log("meow"))
const dog = quadrupedalAnimal(() => console.log("bow wow"))
const human = behave(() => console.log("boo hoo"), () => 2)

cat()
dog()
human()`

メソッドに名前がついてないと、引数が増えてきたときに順番がごっちゃになるのではないかと心配する向きには、簡単に名前を付ける方法があります。

Copied!

`const behave = ({cry, legs}) => () => {
  console.log("behaving...")
  cry()
  console.log(`walking with ${legs()} legs...`)
}

const quadPedalAnimal = ({cry}) => behave({cry, legs: () => 4})
const cat = quadPedalAnimal({cry: () => console.log("meow")})
const dog = quadPedalAnimal({cry: () => console.log("bow wow")})
const human = behave({cry: () => console.log("boo hoo"), legs: () => 2})

cat()
dog()
human()`

# オブジェクトを返す

え、欲しいのは関数じゃなくて、複数のメソッドやフィールドを持ったオブジェクトのような振る舞いをするものですか？
まあ、別に問題ありません。

Copied!

`const animal = ({cry, legs}) => ({
  behave: () => {
    console.log("behaving...")
    cry()
  },
  walk: () => console.log(`walking with ${legs()} legs...`)
})

const quadPedalAnimal = ({cry}) => animal({cry, legs: () => 4})
const cat = quadPedalAnimal({cry: () => console.log("meow")})
const dog = quadPedalAnimal({cry: () => console.log("bow wow")})
const human = animal({cry: () => console.log("boo hoo"), legs: () => 2})

cat.behave()
cat.walk()
dog.behave()
dog.walk()
human.behave()
human.walk()`

これはファクトリ関数パターンとしてよく知られているものですね。

猫や犬のファクトリが欲しいけど、名前だけカスタマイズしたい？下の `catWithName` や `dogWithName` のようにできます。

Copied!

`const animal = ({name, cry}) => ({
  name,
  behave: () => {
    console.log(`${name} behaving...`)
    cry()
  },
})

const namedAnimal = params => name => animal({name, ...params})
const catWithName = namedAnimal({cry: () => console.log("meow")})
const dogWithName = namedAnimal({cry: () => console.log("bow wow")})

const cat = catWithName("Michel")
const dog = dogWithName("Taro")
cat.behave()
dog.behave()`

さらにクレイジーな例として、名前は先に Michel にするって決めているけど、どんな動物かは後で決めたい、なんて場合は次の `animalNamedMichel` みたいなのでどうでしょう。

Copied!

`const animal = ({name, cry}) => ({
  name,
  behave: () => {
    console.log(`${name} behaving...`)
    cry()
  },
})

const animalNamed = name => animal => animal(name)
const animalNamedMichel = animalNamed("Michel")
const namedAnimal = params => name => animal({name, ...params})
const catWithName = namedAnimal({cry: () => console.log("meow")})
const dogWithName = namedAnimal({cry: () => console.log("bow wow")})

const cat = animalNamedMichel(catWithName)
const dog = animalNamedMichel(dogWithName)
cat.behave()
dog.behave()`

まぁあまりやりすぎると可読性を損なうのでほどほどにしておくべきだと思いますが、関数型アプローチが JavaScript のオブジェクトモデルと相まって、どれだけコードを簡素にしうるかの片鱗を垣間見ることができると思います。

# C++の場合

C++のような静的型付け言語でもジェネリックラムダを使えば関数型ポリモーフィズムが実現できます。 JavaScript ほどは簡潔には書けませんが。

Copied!

`\#include <iostream>

int main(){
    auto behave = [](auto cry){
        return [cry](){
            std::cout << "behaving..." << std::endl;
            cry();
        };
    };

    auto cat = behave([](){ std::cout << "meow\n"; });
    auto dog = behave([](){ std::cout << "bow wow\n"; });

    cat();
    dog();

    return 0;
}`

注意点としては、この場合の `cat` と `dog` という変数は別の型を持つので、同じ型を期待する関数の引数や配列に一緒に入れることはできません。
どうしても必要な場合は `std::function` でくるんでやる必要があります。~~これは動的メモリを使用するということを意味しますので、 オブジェクト指向的ポリモーフィズムの仮想関数に比べてパフォーマンス面でハンデになるかもしれません。~~ `std::function` だからといって必ずしも動的メモリを必要とするわけではありません。詳しくはコメント欄をご覧ください。

## テンプレートを使う

さらには、 `std::function` も仮想関数テーブルのオーバーヘッドも支払いたくないというパフォーマンスフリークの皆様方には、テンプレートによる静的ポリモーフィズムがございます。

Copied!

`\#include <iostream>

template<typename Cry>
struct Animal{
    void behave(){
        std::cout << "behaving..." << std::endl;
        Cry::cry();
    }
};

struct CatCry{
    static void cry(){
        std::cout << "meow\n";
    }
};
struct DogCry{
    static void cry(){
        std::cout << "bow wow\n";
    }
};

int main(){
    auto cat = Animal<CatCry>();
    auto dog = Animal<DogCry>();

    cat.behave();
    dog.behave();

    return 0;
}`

しかし、これはラムダ式と同様に全く異なる型となってしまい、同じ制約に縛られます。最適化をかければジェネリックラムダと同じ機械語に翻訳される可能性も高いです。ジェネリックラムダが使えるコンパイラと状況であれば、そちらを使ったほうがよいでしょう。

# Rust の場合

Rust の場合は入れ子になったラムダ式を書くのが若干 C++ より楽です。
ただし、ボローチェッカーのお導きにより、メソッドは内側のクロージャにムーブしてもらう必要がありますので、 `move` キーワードがネストされたラムダ式の間に入ります。

Copied!

`fn main(){
    let behave = |cry: fn()| move || {
        println!("behaving...");
        cry();
    };

    let cat = behave(|| println!("meow"));
    let dog = behave(|| println!("bow wow"));

    cat();
    dog();
}`

# 実際役に立つ場面

実際にはデータモデルの定義よりは、込み入ったロジックの繰り返しを減らすときに役に立つ気がします。
例えば下記のようにほとんど同じだけどちょっとだけ対象のオブジェクトに応じてカスタマイズしたい部分がところどころにあるコードを繰り返し適用したい場合、

Copied!

`for(let object in objects){
  いろいろ込み入ったことをする(object)

  ちょっとだけカスタマイズしたい部分(object)

  もっといろいろ込み入ったことをする(object)

  もうちょっとだけカスタマイズしたい部分(object)
}`

次のような関数を定義しておくと便利です。

Copied!

`const 繰り返す部分 = (ちょっとだけカスタマイズしたい部分,
                      もうちょっとだけカスタマイズしたい部分) =>
                     (object) =>
{
  いろいろ込み入ったことをする(object)

  ちょっとだけカスタマイズしたい部分(object)

  もっといろいろ込み入ったことをする(object)

  もうちょっとだけカスタマイズしたい部分(object)
}`

このためだけに基底クラスを定義して、派生クラスを実装して…なんて美しくないですよね。
これも広い意味でのポリモーフィズムです。

[追記]
別の方法としてはそれぞれのカスタマイズしたい場所で場合分けする方法があり、普通の人はこれを選ぶと思います。

Copied!

`for(let object in objects){
  いろいろ込み入ったことをする(object)

  if(isObjectType(object, TypeA))
    TypeA用のちょっとだけカスタマイズしたい部分(object)
  else if(isObjectType(object, TypeB))
    TypeB用のちょっとだけカスタマイズしたい部分(object)
  else
    それ以外のちょっとだけカスタマイズしたい部分(object)

  もっといろいろ込み入ったことをする(object)

  if(isObjectType(object, TypeA))
    TypeA用のもうちょっとだけカスタマイズしたい部分(object)
  else if(isObjectType(object, TypeB))
    TypeB用のもうちょっとだけカスタマイズしたい部分(object)
  else
    それ以外のもうちょっとだけカスタマイズしたい部分(object)
}`

しかしこれは object の種類の数が増えてくるととっても醜いです。
TypeAやTypeBがクラスとして定義されていればメソッドを定義することもできますが、ただのテーブルや配列であることもあります。前述のようにこのためだけにクラス化して継承関係を作るのもあほくさいです。
そもそも object が一つの変数とは限らず、いくつかの関連するデータをひとつのループ内で処理したい場合もあります。

# あとがき

オブジェクト指向がもてはやされなくなってきて久しいですが、伝統的なオブジェクト指向の代表的な使い道である継承とポリモーフィズムについても、関数型アプローチで結構簡単に実現できてしまいます。
特にJavaScript(およびその派生言語)の文法は非常に簡潔で、伝統的なオブジェクト指向で書かれた同じロジックなど冗長すぎて見る気も失せてきます。

あえてオブジェクト指向のいいところもフォローをしておきますと、カプセル化の概念は関数型のアプローチで実現するのは難しいです  。

また、関数型ではリフレクションや RTTI のような機能は一切使えません。 instanceof なんかで継承関係を調べることはできません。

1. まあそうは言ってもメンバフィールドに公開せずにファクトリ関数の引数としてクロージャにキャプチャさせるだけにしておけば、オブジェクト構築以降、外からは触れない変数はプライベート変数っぽくなりますけどね。 [↩](about:blank#ipfootnote1)
2. [1](about:blank#ipfootnote0)