---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
TypeScript では型を活用することで、より安全なプログラミングが可能です。

個人的には、共用体型（union）は、お手軽でかつ、効果が高いと思っています。また、TypeScript は強力な型推論を持ち、自由度が高く自然なコードで、型の恩恵を得られます。

今回紹介する事例では、ある基底インターフェースがあり、実態は派生したインターフェースであるような型を活用するものです。

たとえば CMS を作るとします。「文（paragraph）」や「見出し（heading）」や「画像（image）」を並べることができるものです。このときデータ構造としては `contents` 配列の中に、文・見出し・画像などが入るとしましょう。これをキレイに表現し、型安全にすることができるというのが今回紹介する内容となります。

## 共用体型

簡単にいうと、型の or を取るものです。

- [TypeScript: Handbook - Unions and Intersection Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)
- [https://www.google.com/search?q=typescript+union](https://www.google.com/search?q=typescript%20union)

逆に、型の and を取る、交差型（intersection）もあります。

- [https://www.google.com/search?q=typescript+intersection](https://www.google.com/search?q=typescript%20intersection)

セットで覚えておくと便利です。

## シンプルに実装してみよう

冒頭で説明したような CMS のコンテンツを表現する型を定義してみましょう。



`export interface ContentParagrah {
  type: 'paragraph'
  
  content: string
}


export interface ContenHeading {
  type: 'heading'
  
  content: string
  
  textAlign: 'left' | 'center' | 'right'
}


export interface ContentImage {
  type: 'image'
  
  url: string
  
  caption?: string
}`

こういった構造をよく見かけるのではないでしょうか？`type` の値によって、実際の中身が分岐するデータ構造です。

これを共用体型（union）でまとめると以下のようになります。



`export type Content = ContentParagraph | ContentHeading | ContentImage`

### 使い方

定義した `Content` の使い方は、典型的なものでいうとコンテンツをレンダリングする関数になるでしょう。



`const renderParagraph = (content: ContentParagraph) => {
  
}
const renderHeading = (content: ContentHeading) => {
  
}
const renderImage = (content: ContentImage) => {
  
}

export const renderContent = (content: Content) => {
  switch (content.type) {
    case 'paragraph':
      renderParagraph(content)
      break
    case 'heading':
      renderHeading(content)
      break
    case 'image':
      renderImage(content)
      break
  }
}`

`renderParagraph` などの関数は、より詳細化された `ContentParagraph` などを受け付けて実際にレンダリングするものです。`renderParagraph` は、他の型である、見出しや画像についての知識を持つ必要がありません。

`renderContents` は、文・見出し・画像などの共用体型である `Content` を受け取って、個々のレンダリング関数に引き渡すための関数です。

静的型プログラミングに慣れた方であれば `content: Content` を、`renderParagraph` の引数にわたすことに違和感を覚えませんか？

`content` は `Content` 型であり、`renderParagraph` の引数は `ContentParagraph` 型です。普通であれば型が合いません。

TypeScript では、今回のような共用体であれば、`switch(content.type)` と `case` で、`content` の型を絞り込むことができるのです。`case 'paragraph':` の中では、`content` は `ContentParagraph` 型であると型推論されます。

![](https://storage.googleapis.com/zenn-user-upload/qkvzhy98fbmlygugbhv7xuuur348)

TypeScript はとても賢いですね。ちなみに `switch` 文だけではありません。



`const hoge = (content: Content) => {
  if ('url' in content) {
    content 
  }
}`

`if ('url' in content)` の中では `content` は `url` というメンバーを持つ型であると絞り込めるので、今回の定義であれば、`content` は `ContentImage` になります。

![](https://storage.googleapis.com/zenn-user-upload/lqa22yjcc1311whpmpyryg7g4utc)

### 共通パラメータがほしい

共用型を活用する場合、共通パラメータがほしいことが多いはずです。たとえば、コンテンツの個々の要素に ID（UUID）を振りたいとします。

個別の型に `id` というメンバーを増やすのは、安全なプログラミングではありません。

そこで基底となるインターフェースを定義しましょう。



`interface ContentBase<T extends string> {
  type: T
  id: string
}`

`ContentBase<T extends string>` は[ジェネリクス](https://www.typescriptlang.org/docs/handbook/generics.html)と呼ばれるものです。`T` は `string` を継承できる任意の型です。あまり難しく考える必要はありません。今回は `type` で使う `paragraph` `heading` `image` などを渡すためのものです。



`export interface ContentParagraph extends ContentBase<'paragraph'> {
  content: string
}

export interface ContentHeading extends ContentBase<'heading'> {
  content: string
  textAlign: 'left' | 'center' | 'right'
}

export interface ContentImage extends ContentBase<'image'> {
  url: string
  caption?: string
}`

個別の定義から `type: 'paragraph'` が消えました。ジェネリクスの型引数として 'paragraph' 'heading' 'image' を渡しているためです。`ContentBase<'paragraph'>` を展開してみると、



`{
  type: 'paragraph'
  id: string
}`

のようになります。

これを `extends` （継承）した `interface ContentParagraph` を展開してみると、



`interface {
  type: 'paragraph'
  id: string
  content: string
}`

というような定義になります。

今回の記事では `interface` を使いましたが、同様のことは `type` による定義でも可能です。

## type で定義する

まず基底型を定義します。



`export type ContentBase = {
  type: unknown
  id: string
}`

`unknown` とは、字面のとおり「未知の型」です。コンパイル時に `unknown` が残っていればコンパイルエラーになるため `ContentBase` 型を使うためには必ず `type` を上書きしなければいけません。



`export type ContentParagraph = ContentBase & {
  type: 'paragraph'
  content: string
}

export type ContentHeading = ContentBase & {
  type: 'heading'
  content: string
  textAlign: 'left' | 'center' | 'right'
}

export type ContentImage = ContentBase & {
  type: 'image'
  url: string
  caption?: string
}`

`type ContentParagraph` をするためには `ContentBase` と個々の要素を交差型（intersection）で定義します。`type: 'paragraph'` で `unknown` を上書きして、`content: string` パラメータを追加しています。



`{
  type: 'paragraph'
  id: string 
  content: string
}`

というような定義になります。

`interface` のときと同じことが実現できています。

## おまけ

### `Content` 共用型の `type` を取り出したいとき



`export type ContentTypes = Content['type']`

![](https://storage.googleapis.com/zenn-user-upload/mz53m2wuhx9dcfj7axtrlq5ycd7h)

便利ですね！