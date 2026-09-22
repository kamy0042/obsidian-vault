---
Created: 2022-08-01T09:20:00
URL: https://zenn.dev/kata_n/articles/099ec8fe6322d0
Tags: [topic/技術/TypeScript]
---
TypeScriptでオブジェクトにある値だけを許容する型を作成して活用する方法です

以下のオブジェクトを例にして具体的に説明しています  
• ３つのプロパティをまとめたオブジェクトを定義しています 
• それぞれのプロパティにはファイル名、値として数字を定義しています  

`// オブジェクトから値(1,2,3）だけを許容する型を作って、他の場所で活用したい
const FILE_DATA_LIST = {
 fileDataNo1: 1,
 fileDataNo2: 2,
 fileDataNo3: 3
}
`

## まず結論

以下の例のように書くと、型である`fileDataType`はオブジェクト`FILE_DATA_LIST`のプロパティに設定されている値(`1,2,3`)しか許容しなくなります

```plain text
const FILE_DATA_LIST = {
 fileDataNo1: 1,
 fileDataNo2: 2,
 fileDataNo3: 3
} as const

type fileDataType = typeof FILE_DATA_LIST[keyof typeof FILE_DATA_LIST]

```

下記のように、`1,2,3`以外の値を代入しようとすると、エラーで教えてくれます

```plain text
// OK
const exampleFileNo1:fileDataType = 1

// エラー出してくれる
// Type '4' is not assignable to type 'fileDataType'
const exampleFileNo4:fileDataType = 4

```

実際に試したい人はこちら(TypeScript Playground)

## 説明

このやり方ではTypeScriptの`as const`と`keyof`と`typeof`を組み合わせています

### 1.`const as const`をオブジェクトに指定する

オブジェクトを代入しているのに加えて、後ろに`as const`をつけています

`as const`をつけない場合、プロパティの値はどうなるでしょうか

```plain text
const FILE_DATA_LIST = {
 fileDataNo1: 1, // 'number' 型
 fileDataNo2: 2, // 'number' 型
 fileDataNo3: 3, // 'number' 型
}

```

プロパティの値はプリミティブ(`number型`)となります

これはTypeScriptが**オブジェクトのプロパティの値は変わるもの**として扱う為です。

(これをリテラルタイプwideningと言います)

これに対し`as const`をつけると、`readonly`プロパティが付与されます

これにより、値そのものを型として扱う事ができます

なので、代入しようとするとエラーがでるようになります

### 2.`keyof`を指定する

`keyof`を使うとtypeなどで型定義されたものに対して、プロパティ名のユニオン型を取得できます

```plain text
type FILE_DATA_LIST = {
 fileDataNo1: number
 fileDataNo2: number
 fileDataNo3: number
}

type list = keyof FILE_DATA_LIST;

// プロパティ名のユニオン型、つまりこうなります(上と同義)
type list = "fileDataNo1" | "fileDataNo2" | "fileDataNo3";

```

### 3.`typeof`を指定する

最後に`typeof`ですが、これは与えられた値から**型を取得する**ことができるものです

```plain text
let FileName = "hogehoge"
let FileNo = 20

// "hogehoge"という値から、string型と判断。これをFileNameTypeに代入する
type FileNameType = typeof FileName // string型

// 20という値から、number型と判断。これをFileNameTypeに代入する
type FileNoType = typeof FileNo　// number型

```

### 以上を組み合わせると...

ここでもう一度、いちばん最初に記載したコードを見てみます

```plain text
const FILE_DATA_LIST = {
 fileDataNo1: 1, // as constにより'fileDataNo1:1' 型となる
 fileDataNo2: 2, // as constにより'fileDataNo1:2' 型となる
 fileDataNo3: 3, // as constにより'fileDataNo1:3' 型となる
} as const

type fileDataType = typeof FILE_DATA_LIST[keyof typeof FILE_DATA_LIST]

```

どうでしょうか。`as const`は型が変わっている事が分かりやすいですね

問題はこの部分です

まず`[keyof typeof FILE_DATA_LIST]`で`[]`で囲まれている部分

そして、上記のユニオン型に`typeof FILE_DATA_LIST`の"添字"として上記ユニオン型を渡します

これで、オブジェクトにある値だけを許容する型(`fileDataType`)が完成しました🎊

## ✨何が嬉しいのか

### 上書きする事ができない

上記の`as const`と重複しますが、他の場所で変数を上書きする事ができません

```plain text
const FILE_DATA_LIST = {
 fileDataNo1: 1
 fileDataNo2: 2
} as const
type fileDataType = typeof FILE_DATA_LIST[keyof typeof FILE_DATA_LIST]

let exampleFileNo:fileDataType
exampleFileNo = FILE_DATA_LIST.fileDataNo1　 // 1 しか許容しない
exampleFileNo = 1000 // Type '1000' is not assignable to type '1'

```

なので`as const`で定義されている値だけ見れば、変数に何の値が代入されているのを確認できますし、他の場所で書き換えられていない事が保証されるので、精神的にも非常に楽です

### 型定義を変更する必要がない

嬉しい所の2つ目は、**値から型を作成している**ところです

例えば、今までの３つのファイル定義に加えて、4つ目のファイル定義が必要になったとします

この場合、オブジェクトに4つ目のファイル定義をするだけでOKです

```plain text
const FILE_DATA_LIST = {
 fileDataNo1: 1,
 fileDataNo2: 2,
 fileDataNo3: 3,
 fileDataNo4: 4 // ここに加えるだけ!!
} as const

type fileDataType = typeof FILE_DATA_LIST[keyof typeof FILE_DATA_LIST]

```

`1 | 2 | 3 | 4`だけ許容した型ができる

これを型定義から行った場合、変更がある度に型定義まで変更しないといけなくなります。

❌よくない

```plain text
// 型定義を最初に行うパターン
type fileDataList = "fileDataNo1" | "fileDataNo2" | "fileDataNo3"
type faileDatavalue = 1 | 2 | 3

const FILE_DATA_LIST: Record<fileDataList, faileDatavalue> = {
 fileDataNo1: 1,
 fileDataNo2: 2,
 fileDataNo3: 3,
 // 足そうとすると、上で定義した型まで変えないといけなくなってしまう
 fileDataNo4: 4
}

```

値から型を作成するパターンの方が変更も一箇所で済みますし、可読性も上がります。

### 他の修正箇所に気づきやすくなる

また、他の修正するべき箇所に気づきやすくなります

例えば`switch`で処理を分岐するシーンが出てきたとします

❌よくない

```plain text
const FILE_DATA_LIST = {
 fileDataNo1: 1,
 fileDataNo2: 2,
 fileDataNo3: 3,
 fileDataNo4: 4 // 4つ目を追加
}

// 引数にfileDataNo4(数字の4)を渡してdataUpload関数を実行
dataUpload(FILE_DATA_LIST.fileDataNo4);

```

`switch`文にfileDataNo4の場合を追記していないので`default`節に処理が流れてしまいます...

```plain text
function dataUpload(fileDataNo:number){
  switch(fileDataNo){
   case FILE_DATA_LIST.fileDataNo1:
      // 1番目の処理
     break;
   case FILE_DATA_LIST.fileDataNo2:
      // 2番目の処理
     break;
   case FILE_DATA_LIST.fileDataNo3:
      // 3番目の処理
     break;
   // defaultの処理がされてしまうが、エラーにはならない
   default:
     break;
  }
}

```

数行なら気付けるかもしれませんが、大量のコードがある中でピンポイントで気付くのは中々大変な作業です

⭕️`default`節に`never`型をセットする

```plain text
const FILE_DATA_LIST = {
 fileDataNo1: 1,
 fileDataNo2: 2,
 fileDataNo3: 3,
 fileDataNo4: 4　// 4つ目を追加
} as const
type fileDataType = typeof FILE_DATA_LIST[keyof typeof FILE_DATA_LIST]

// 引数にfileDataNo4(数字の4)を渡してdataUpload関数を実行
dataUpload(FILE_DATA_LIST.fileDataNo4);

function dataUpload(fileDataNo:fileDataType){
  switch(fileDataNo){
   case FILE_DATA_LIST.fileDataNo1:
      // 1番目の処理
     break;
   case FILE_DATA_LIST.fileDataNo2:
      // 2番目の処理
     break;
   case FILE_DATA_LIST.fileDataNo3:
      // 3番目の処理
     break;
   default:
     const imageFileNo: never = fileDataNo;
     // Type 'number' is not assignable to type 'never'エラーになる
     throw new Error(${imageFileNo} は存在しません);
  }
}

```

変更点

- `dataUpload`関数の引数に`fileDataType`を指定する
- `default`の処理の中で`never`型を指定する

fileDataTypeで型を定義している以上`default`節に処理が来ることはあり得ないので、fileDataNo4が追加されるとエラーになります

この様に`never`などの他のTypeScriptの型を組み合わせることで、値を追加・変更した場合の他の修正箇所が分かりやすくなり、開発がしやすくなります。

## まとめ

オブジェクトで定義した値のみを許容する型を作りたいときは、`as const`と`keyof`と`typeof`を組み合わせて使おう

### Discussion

![[discussion 4.png]]