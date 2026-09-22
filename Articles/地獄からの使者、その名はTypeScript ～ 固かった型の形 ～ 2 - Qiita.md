---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
# 地獄からの使者、その名はTypeScript ～ 固かった型の形 ～

TypeScriptは便利である。変な書き方をしていれば教えてくれるし、開発環境が入力補完の支援もしてくれる。まさにヘブンである。しかし書き方を知らないと、その世界は地獄と化す。真っ赤なエラーに焼き尽くされた地獄に。

地獄を回避するためには解決法を知ることである。TypeScriptは今も刻一刻と進化しており、昨日の知識は原始の人間が棒の握り方を覚えたに等しい。

ということで地獄を渡り、天国へ到達するための知恵の一部を紹介していきたいと思う。たぶん他にもあるような気がするのだが、TypeScriptを使い始めてだいぶ慣れてしまったので、何に困ったのか全てを覚えていない。思い出したら、記事を追記して投稿していこうと思う。こういう場合にどう解決するべきなのかという疑問があれば、それを考えていきたい。

## 1. JavaScriptからTypeScript移行時に最初に訪れる試練、連想配列

これを一度もやらずにTypeScriptを使っている者がいたとすれば驚愕である。JavaScriptからTypeScriptに移行する場合に、最初に放ってくる地獄からの息吹である。これに心を折られ、踵を返してしまうものもいることだろう。

- 失敗例
プロパティの存在しないオブジェクトが作られ、aが入らない

`const value1 = {}
value1.a = 10 //ここでエラー
console.log(value1.a)`

- 修正例
連想配列にする

`const value1:{[key:string]:any} = {}
value1.a = 10
console.log(value1.a)`

## 2. interfaceを使うほどでもないので、何度も同じ型を定義してしまう

こうして型を付けるのがかったるいと思ってしまうのだ

`const value1: { a?: number, b?: number } = { a: 100 }
const value2: { a?: number, b?: number } = { b: 200 }`

typeofで型が再利用できる

`const value1: { a?: number, b?: number} = { a: 100 }
const value2: typeof value1 = { b: 200 }
console.log(value2.a) //コンパイルが通る`

## 3. イキってstrictをtrueにしたときに訪れる試練、オブジェクトのキー

valuesは **a|b|c** のキーしか持たないので、string型のkeyを突っ込むとエラーにされる。Object.keysから推論して欲しいところだが、現在はそうなっていない。

`const values =  {'a':100,'b':200,'c':300}
for(const key of Object.keys(values)){
    console.log(`${key}:${values[key]}`) //values[key]でエラー
}`

よく見かけるのはアンチパターンの対処法だ。型を吹き飛ばして無理やり引っ張り出す手法だ。テロリストを倒すのに、住民もろとも爆撃してしまうような暴挙と呼べる。この場合はkeyの型を正しく認識させなければいけない。typeofで型を取り出し、さらにkeyofでキーの型を取り出すという二重構造だ。

`const value2 = { 'a': 100, 'b': 200, 'c': 300 }
for (const key of Object.keys(value2)) {
    console.log(`${key}:${value2[key as keyof typeof value2]}`)
    //console.log(`${key}:${(value2 as any)[key]}`) //よくあるアンチパターン
}`

※2019/05/23追記
　Object.keysの宣言を上書きして適切な型を返すようにすれば、地獄にいるのに清涼感を味わえる
　そもそもkeyを返しているのにstringが返る、元の定義が微妙なのではないだろうか？

`interface ObjectConstructor {
    keys<T>(o: T): (keyof T)[];
}
const value2 = { 'a': 100, 'b': 200, 'c': 300 }
for (const key of Object.keys(value2)) {
    console.log(`${key}:${value2[key]}`) //そのまま通る
}`

## 4.1 intarface中のプロパティの型が欲しい場合

interface自体を使えればよいのだが、中のプロパティの型が欲しいケース
　巨大な構造だったら再定義は本当の地獄だ

`interface AnyData{
    values:{
        a:number
        b:number}[]
   }
}

const proc = (values)=>{ //←ここで型を付けないといけない
    console.log(`a:${values.a} b:${values.b}`)
}
const anyData: AnyData = { values: [{ a: 100, b: 200 }] }
proc(anyData.values) //インタフェイスの中の一部分を渡す`

ちなみにインタフェイス中のプロパティの型を取得する方法は、「もしかしてこれがやりたいんでしょ」とVSCodeが教えてくれた
　VSCode先生、一生はついていかないけど適当なところまではついていきます！

`interface AnyData {
    value: {
        a: number
        b: number
    }
}
//const proc = (values: {a:number,b:number}) => { //再定義してしまう書き方
const proc = (values: AnyData["value"]) => { //元の定義を利用
    console.log(`a:${values.a} b:${values.b}`)
}
const anyData: AnyData = { value: { a: 100, b: 200 } }
proc(anyData.value)`

## 4.2 intarface中のプロパティの型が欲しいのに ? が邪魔をしている場合

※ 2019/5/23 追記
　以前書いたプログラムの手直しをしていたら、こういうケースに遭遇した
　現時点のtsで型の否定(undefinedを除外)をする方法が導入されていない以上、詰んだかと思われたが何とかなった

`interface AnyData {
    value?: { //?がついていると、aやbの型にたどり着けなくなる
        a: number
        b: number
    }
}
const proc = (value: AnyData["value"]["a"]) => { //aが存在しないと怒られる
    console.log(value)
}`

オラ、この地獄でワクワクしてきたぞ

`interface AnyData {
    value?: { 
        a: number
        b: number
    }
}
const proc = (value: (AnyData["value"] & {})["a"]) => { //{}を詰め込む
    console.log(value)
}`

やった者勝ちみたいな世界だ

※ 2019/5/28 追記 recordareさんから
　-?を使った書き方

`interface AnyData {
  value?: {
     a: number
     b: number
  }
}
type IgnoreOptional<T, K extends keyof T=keyof T> = {[P in K]-?: T[P]}[K];
const proc = (value: IgnoreOptional<AnyData["value"]>["a"]) => { 
    console.log(value)
}`

※ 2019/5/28 追記 uhyoさんから
　NonNullableで除去可能だった

`interface AnyData {
    value?: { 
        a: number
        b: number
    }
}
const proc = (value: NonNullable<AnyData["value"]>["a"]) => {
    console.log(value)
}`

## 4.3 分かれ道に差し掛かった場合

※ 2019/5/28 追記

Extractで分かれ道も条件を指定可能
　もう、何でもありか・・・

`interface AnyData {
    value: {
        a: number
        b: number

    }|{
         c:number;
         d:number;
    }
}
const proc = (value: Extract<AnyData["value"],{"a":any}>["a"]) => { 
    console.log(value)
}`

## 5. プロパティがあるか確認しようとするとエラーになるケース

これは解説記事が多いので、いまさらかもしれない

`//プロパティがあるか確認しようとするとエラー
interface A{
    a:number
}
interface B{
    b:number
}
const proc2 = (value: A | B)=>{
    if(typeof value.a !== 'undefined') //この時点でaが使えない
        console.log(value.a)
}
proc2({a:100})`

`interface A {
    a: number
}
interface B {
    b: number
}
const proc2 = (value: A | B) => {
    if ("a" in value) //TypeScriptではこう書かないといけない
        console.log(value.a)
}
proc2({ a: 100 })`

## 6. HTMLElementに追加プロパティを設定したい場合

素のJavaScriptで気軽にやっていたこれは、エラーとなる

`const divElement = document.createElement('div')
divElement.numValue = 100 //HTMLDIVElementにnumValueが存在しないのでエラー`

よくあるアンチパターンがこれだ
　なんでもanyさえあれば解決という使い方
　anyは免罪符か何かだろうか？

`const divElement = document.createElement('div');
(divElement as any).numValue = 100 //アンチパターン`

わざわざinterfaceを作るまでも無く、その場でプロパティを追加したければ以下のように設定する

`const divElement: HTMLDivElement & { numValue?: number } = document.createElement('div')
divElement.numValue = 100`

## 7. childNodesでclassNameなどが使えない場合

childNodesの中に入っているのがChildNodeになっている
　素のJavaScriptからプログラムを持ってくると、かなりの確率で引っかかるポイントだ

`const divElement = document.querySelector('div')
if (divElement) {
    const childNodes = divElement.childNodes //これが NodeListOf<ChildNode> になっている
    for (let i = 0, length = childNodes.length; i < length; i++) {
        const node = childNodes[i]
        node.className = 'CustomClass' //これが使えない
    }
}`

HTMLElementにキャストしてやれば、関連プロパティにアクセスできる

`const divElement = document.querySelector('div')
if (divElement) {
    const childNodes = divElement.childNodes as NodeListOf<HTMLElement>
    for (let i = 0, length = childNodes.length; i < length; i++) {
        const node = childNodes[i]
        node.className = 'CustomClass'
    }
}`

きちんとチェックすれば as はいらない

`const divElement = document.querySelector('div')
if (divElement) {
    const childNodes = divElement.childNodes
    for (let i = 0, length = childNodes.length; i < length; i++) {
        const node = childNodes[i]
        if (node instanceof HTMLElement)
            node.className = 'CustomClass'
    }
}`

# 地獄から天国への道

TypeScriptの地獄から、天国へいたる道は長く険しい。そして何人もの人間がエンマ大王に舌を抜かれ沈黙する。しかしそこを抜けた先には、必ずやヘブンがあるはずだ。釜茹でにされようが、針で刺されようが、地道に賽の河原で石を積み上げていくしか方法はないのである。

地獄を知らぬ者に、天国を感じることはできないのだから。