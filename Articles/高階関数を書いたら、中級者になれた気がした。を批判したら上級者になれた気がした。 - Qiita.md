---
プロパティ: ""
Created: 2021-01-15T20:25:00
Tags: [topic/技術/関数型プログラミング]
---
# はじめに

[「高階関数を書いたら、中級者になれた気がした」](https://qiita.com/Yametaro/items/fe863978994861f36611)という記事を読んで色々ともやもやしたので批判をしてみる。といった趣旨の記事です。

あくまで、こういう捉え方もあるんだな程度の目線でご覧ください。

きっかけはこちらのツイートから⇒[https://twitter.com/ababupdownba/status/1241509344329363457?s=20](https://twitter.com/ababupdownba/status/1241509344329363457?s=20)

# 謝辞

この記事の不適切で良くないところを指摘し、記事の品質向上に貢献して頂いた皆さん[@kazatsuyu](https://qiita.com/kazatsuyu)[@pink_bangbi](https://qiita.com/pink_bangbi)[@le_panda_noir](https://qiita.com/le_panda_noir)[@kussytessy](https://qiita.com/kussytessy)[@Zuishin](https://qiita.com/Zuishin)[@kodama321](https://qiita.com/kodama321)[@Mafty](https://qiita.com/Mafty)
に感謝の意を表します。本当にありがとうございます。

# 早速見ていこう

あの記事の流れは、社長の無茶ぶりに頑張って答えながら進んでいくというものだ。

最初の社長の指令はこうだった。

> 社長「お仕事を持ってきたで」
社長「今日は↓こんな関数を作ってくれ」引数として受け取ったHTML要素の高さを100ピクセルにする社長「関数の名前はsetHeightで頼むわ」
社長「使うときのイメージとしては↓こんな感じや」

そしてそれに対応したコードがこれだ。

`// boxと言うIDを持った要素を取得。
const box = document.getElementById("box");

// 関数を呼び出して高さを設定。
setHeight(box);`

`const setHeight = element => {
    element.style.height = '100px';
};`

ここまでは特に悪い所は無い。(強いて言えば`setHeight`という名前は少々わかりずらいので、`setElementStyleHeight`とかの方がよさそうといった所だが、)

そして次の社長の指令はコチラ

> 社長「一つだけ要件を言い忘れてたんや・・・」高さを100ピクセルにして、更に背景色を赤くしたい場合もある

そしてそれに対応して修正したコードがこれだ。

`// 高さを100ピクセルにするだけの場合
setHeight(box);

// 高さを100ピクセルにして、更に背景を赤くしたい場合
setHeight(box, true);`

`const setHeight = (element, toRed) => {
    element.style.height = '100px';

    if(toRed){
        element.style.backgroundColor = 'red';
    }
};`

このコードにはひとつ問題点がある。
まあ、あえてこのような問題のあるコードにしてあるのは後で**高階関数**を使うための布石なのだろうが、そもそもこの例では**高階関数**を使うメリットは微塵もないので、念のため指摘していく。

**[問題] 関数の命名がおかしい**`setHeight`はその名が意味するなら、高さを設定する関数だ。なので、背景色を赤にする処理を記述するのは間違っている。
一応、元記事でも`setHeight`が機能過多になってしまっていることについて言及されている。

> ワイ「もうsetHeight以外の処理がメインになってますやん・・・」
ワイ「名前とやってること違いますやん・・・」

ここではその問題のある程度の改善を試みてみることにする。
そもそもの関数の目的が良くわからないので正確な命名は不可能だが、以下のように分割したほうがまだマシだと思われる。
(関数名から、`'100px'`にすることや`'red'`にする意図が見えてこないのでまだ不適切だが)

`// 高さを100ピクセルにするだけの場合
setHeight(box);

// 高さを100ピクセルにして、更に背景を赤くしたい場合
setHeightAndBackground(box);`

`const setHeight = (element) => {
    element.style.height = '100px';
};

const setHeightAndBackground = (element) => {
    setHeight(element);
    element.style.backgroundColor = 'red';
};`

しかし、よく考えてほしい。社長は`setHeight`関数を作って欲しいと言っているのだ。
だが、あきらかに`setHeight`は命名がおかしいのでここは頑張って社長を説得するしかない。

とまあ、こんな感じであの記事では`setHeight`関数にどんどん機能が上乗せされていく。高さを変えるという以外の機能が、だ。

あの記事では最終的に`setHeight`関数の実装は以下の様になる。

`const setHeight = (element, toRed, width) => {
    element.style.height = '100px';
    if(toRed){
        element.style.backgroundColor = 'red';
    }

    // 第三引数のwidthがあったら、要素の横幅を変更する
    if(width){
        element.style.width = width + 'px';
    }
};`

`setHeight`関数があまりにも機能を持ちすぎているという問題をあの記事では、**コールバック関数**というものを使って解決している。
そのコードがこちら。

`const setHeight = (element, callback) => {
    element.style.height = '100px';
    callback(element);
}`

`setHeight(box, element => {
    element.style.color = 'green';
    element.innerHTML = 'こんにちわ！';
});`

高さを`100px`にすること以外の処理を**コールバック関数**に任せることで、機能を分割しているのである。
正直言って意図が分かりにくく、あまり良くないコードだと思う。

**[問題]そもそもコールバック関数を使うメリットが無い****コールバック関数**なんて複雑で読みにくいものなんか使わずに、以下のようにすればいいだけなのだ。

`const setHeight = (element) => {
    element.style.height = '100px';
}`

`setHeight(box);
box.style.color = "green";
box.innerHTML = "こんにちわ！";`

**コールバック関数**を使う適切な動機ではない。

# 問題まとめ

- 例で出てくる関数の命名が適切ではない
- コールバック関数、および高階関数を使うメリットが全くない（むしろデメリットしかない）場合なのに、むりやり使っている。

一つ目の問題はさほど問題でもないが、二つ目が一番のモヤモヤするポイントだった。高階関数の記事なのに高階関数を使うメリットが分からなかったからだ。

しかし、高階関数の書き方を知ってもらうキッカケという視点で考えた時、あの記事はとても価値があるものだと思う。

# 本題：じゃあ、高階関数を使うメリットってなんなの？

元記事ではあまり分からなかった高階関数を使うメリットについて述べていきたいと思う。
ここで全てのメリットを挙げるのは大変だが、一つ上げると**処理の責務**と**処理呼び出しの責務**と**処理結果の扱いの責務**を分離したいときに**高階関数**を使うと短く書けて嬉しいというメリットがある。

## 利用例1

まずは**処理の責務**と**処理呼び出しの責務**とを分離する例を見てみよう。

以下は5回カウントした後に特定の処理をする`FiveCounter`クラスの実装と使用の例である。

`class FiveCounter{
    constructor(){
        this.currentCount = 0;
    }
    count(){
        this.currentCount++;
        if(this.currentCount == 5)
            this.invoke(); //処理呼び出しの責務を果たしている
    }

    invoke(){
        //処理の責務を果たしている
        console.log("起きて―！！");
    }
}

const fiveCounter = new FiveCounter();
fiveCounter.count();
fiveCounter.count();
fiveCounter.count();
fiveCounter.count();
fiveCounter.count();`

[https://wandbox.org/permlink/X52G121qKKD9vldJ](https://wandbox.org/permlink/X52G121qKKD9vldJ)

注目すべきは責務だ。`FiveCounter`クラスは5回カウント後に処理される`Invoke`関数の実装を持っているし、`Invoke`関数がいつ呼び出されるかも管理している。（5回カウントされた後にのみ呼び出すということですね）
これはつまり、`FiveCounter`クラスは**処理の責務**も**処理の呼び出しの責務**も担っているということになる。
もし、5回カウント後に実行される処理内容を柔軟に変えれるようにしようとしたらどうすればいいだろうか？
それは、`FiveCounter`クラスから**処理の責務**を分離する必要があることを意味する。
試しにクラスを分けてみようか。

`//処理の責務を果たしている
class Okite{
    invoke(){
        console.log("起きて―！！");
    }
}

//処理の責務を果たしている
class Nero{
    invoke(){
        console.log("寝ろ");
    }
}

class FiveCounter{
    constructor(fiveCountedProcessObject){
        this.currentCount = 0;
        this.fiveCountedProcessObject = fiveCountedProcessObject;
    }
    count(){
        this.currentCount++;
        if(this.currentCount == 5)
            //処理呼び出しの責務を果たしている
            this.fiveCountedProcessObject.invoke();
    }
}

const fiveCounter1 = new FiveCounter(new Okite);
fiveCounter1.count();
fiveCounter1.count();
fiveCounter1.count();
fiveCounter1.count();
fiveCounter1.count();

const fiveCounter2 = new FiveCounter(new Nero);
fiveCounter2.count();
fiveCounter2.count();
fiveCounter2.count();
fiveCounter2.count();
fiveCounter2.count();`

[https://wandbox.org/permlink/rJzhu6mc3d8P3xqH](https://wandbox.org/permlink/rJzhu6mc3d8P3xqH)

このようにして、責務を分割して処理を柔軟に変更することができた。
しかし、考えても見てほしい。いちいち新しい処理が増えることに`Okite`とか`Nero`とか毎回クラスを作ったりするのは面倒ではないか？
そこで**高階関数**を使う。
以下が**高階関数**を使ったversionだ。

`class FiveCounter{
    constructor(onFiveCounted){
        this.currentCount = 0;
        this.onFiveCounted = onFiveCounted;
    }
    count(){
        this.currentCount++;
        if(this.currentCount == 5)
            this.onFiveCounted();
    }
}

const fiveCounter1 = new FiveCounter( () => console.log("起きて―！！") );
fiveCounter1.count();
fiveCounter1.count();
fiveCounter1.count();
fiveCounter1.count();
fiveCounter1.count();

const fiveCounter2 = new FiveCounter( () => console.log("寝ろ") );
fiveCounter2.count();
fiveCounter2.count();
fiveCounter2.count();
fiveCounter2.count();
fiveCounter2.count();`

[https://wandbox.org/permlink/33egchRR4pAdRXfd](https://wandbox.org/permlink/33egchRR4pAdRXfd)

このように、関数にクラスを渡すのではなく、関数を渡す。関数に関数を渡すことが**高階関数**というものである。
これ以外にも、関数を返す関数も**高階関数**と呼ぶ。
つまり、**高階関数**は関数を引数で受け取ったり、関数を返したりする関数のことを言う。

利用例１では、`constructor`関数が関数を引数で受け取り、`FiveCounter`オブジェクトを返す高階関数とみなせる。

## 利用例2

利用例1では**処理の責務**と**処理呼び出しの責務**とを分離する例だった。ここにさらに、**処理をした結果の責務**について考えていこうと思う。
そのために、以下の問題を例として使う

> 数値の配列の要素一つ一つを倍にした配列を作るdoubleArray関数を実装してほしい。元の配列を直接変更しても構わない。数値の配列の要素一つ一つから-10にした配列を作るtenMinusArray関数を実装してほしい。元の配列を直接変更しても構わない。

まずは何も考えずに実装してみよう。

`const doubleArray = (array) => {
    for(let i = 0; i < array.length; i++)
        array[i] = array[i]*2;
    return array;
};

const tenMinusArray = (array) => {
    for(let i = 0; i < array.length; i++)
        array[i] = array[i]-10;
    return array;
};

console.log(doubleArray([1,2,3,4]))
console.log(tenMinusArray([10,20,30,40]))`

[https://wandbox.org/permlink/77zhhqzApnmMyH2X](https://wandbox.org/permlink/77zhhqzApnmMyH2X)

このコードには無駄がある。まずはそれを見つけるために処理を分解していこう。

- 配列の中身を1つずつ取り出すfor文
- array[i]=の要素更新処理結果を代入する
- 要素を更新する処理`array[i]*2`と`array[i]-10`
- 結果を返すreturn文

要素を更新する処理以外は共通する部分だ。**処理の責務**を要素を更新する処理。**処理呼び出しの責務**をfor文内の処理。**処理をした結果の責務**を要素更新処理結果を代入する処理と考える。
そうして、**処理の責務**だけを関数から分離したmapArray関数を高階関数を使って実装してみよう。
(JavaScriptには配列の標準のメソッドとしてmap関数があるが、今回の目的は高階関数を学ぶことなので車輪の再発明をやっていく)

`const mapArray = (array,func) => {
    for(let i = 0; i < array.length; i++)
        array[i] = func(array[i]);
    return array;
}

const doubleArray = (array) =>
    mapArray(array,x=>x*2);

const tenMinusArray = (array) =>
    mapArray(array,x=>x-10);

console.log(doubleArray([1,2,3,4]))
console.log(tenMinusArray([10,20,30,40]))`

[https://wandbox.org/permlink/TZ8jbMSRF4pHKUO1](https://wandbox.org/permlink/TZ8jbMSRF4pHKUO1)

## 利用例2(オマケ)

利用例2はカリー化と部分適用を使ってさらに綺麗に美しく書くことができる。
まあ、これを美しいと感じるかどうかは人によるが。

`const mapArray = func =>
    array => {
        for(let i = 0; i < array.length; i++)
            array[i] = func(array[i]);
        return array;
    };

const doubleArray = mapArray(x => x*2);

const tenMinusArray = mapArray(x => x-10);

console.log(doubleArray([1,2,3,4]))
console.log(tenMinusArray([10,20,30,40]))`

[https://wandbox.org/permlink/XYiqSHvxwjeM9DyK](https://wandbox.org/permlink/XYiqSHvxwjeM9DyK)

## 利用例3

**高階関数**には変数のスコープを短くするのにも役に立つ。
以下の例ではboxという変数がずっと下までスコープが続いてしまう。
もしboxは上の三行でしか使わないのならば、可読性が低くなる。

` const box = document.getElementById("box");
 box.innerHTML = 'こんにちわ！';
 box.style.height = '100px';
.
.
.
//下にもプログラムは続く。`

これを**高階関数**でスコープを適切な範囲に狭めるとこうなる。

`const setElementDesign = (elementId,callback) => {
    callback(document.getElementById(elementId));
};

setElementDesign("box",element => {
     element.innerHTML = 'こんにちわ！';
     element.style.height = '100px';
});//element変数のスコープはここまで。`

element変数のスコープが`{}`によって限定されているのがわかるだろう。
元記事でも、`document.getElementById`の処理を`setHeight`内に閉じ込めていればこの恩恵は得られたはずなので惜しかった。

でも、これは少しメリットが弱い。なぜなら以下の様に書いても同じようにスコープを狭めることはできるからだ。

`{
     const box = document.getElementById("box");
     box.innerHTML = 'こんにちわ！';
     box.style.height = '100px';
}`

`(()=>{
     const box = document.getElementById("box");
     box.innerHTML = 'こんにちわ！';
     box.style.height = '100px';
})();`

`(function(){
     const box = document.getElementById("box");
     box.innerHTML = 'こんにちわ！';
     box.style.height = '100px';
})();`

# 高階関数まとめ

**高階関数**は関数を引数に取る関数や関数を返す関数をそう呼んでいるだけで、一般的な関数と同じ。**高階関数**は**処理の責務**と**処理の呼び出し責務・処理をした結果の責務**を分離する時に短く書けるので便利。
無秩序に何でもかんでも何も考えずに**高階関数**にするのではなく、適切な場合のみに使用していきましょう。（過度に使いまくると後悔関数になってしまうかも……？）

えっ？**高階関数**使いまくりたい？じゃあHaskellかScalaかLispへGo！。