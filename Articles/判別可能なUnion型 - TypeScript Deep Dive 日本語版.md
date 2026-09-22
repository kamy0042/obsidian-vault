---
Created: 2021-02-17T22:38:00
URL: https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions
Tags: [topic/技術/TypeScript]
---
![[-LTmolPFWBmik71vTPly.png]]

例として、`Square`と`Rectangle`のUnionを考えてみましょう。ここでは`kind`（特定のリテラル型）は両方のUnion型のメンバに存在しています:

判別用のプロパティ(ここでは`kind`)に対して、型安全なチェック(`==`、`===`、`!=`、`!==`)または`switch`を使用すると、TypeScriptはあなたのために、そのリテラル型を持つオブジェクトの型を特定し、型の絞り込みを行います :)

```plain text
functionarea(s: Shape){if(s.kind ==="square"){// Now TypeScript *knows* that `s` must be a square ;)// So you can use its members safely :)return s.size * s.size;// Wasn't a square? So TypeScript will figure out that it must be a Rectangle ;)// So you can use its members safely :)return s.width * s.height;
```

一般論として、あなたはユニオンのすべてのメンバに対して漏れなくコード(またはアクション)が存在していることを確認したいでしょう。

```plain text
    kind:"square";    size:number;// We would like to let TypeScript give an error at any place that *needs* to cater for this    kind:"circle";type Shape = Square | Rectangle | Circle;
```

`Circle`のインスタンスが渡された場合に悪いことが起きる例：

```plain text
functionarea(s: Shape){if(s.kind ==="square"){return s.size * s.size;elseif(s.kind ==="rectangle"){return s.width * s.height;// Would it be great if you could get TypeScript to give you an error?
```

これをチェックするには、フォールスルー(else)を追加し、そのブロックの推論された型が`never`型と互換性があるかを確認するだけです。たとえば、その網羅チェックを追加すると、ナイスなエラーが発生します:

```plain text
functionarea(s: Shape){if(s.kind ==="square"){return s.size * s.size;elseif(s.kind ==="rectangle"){return s.width * s.height;const _exhaustiveCheck: never = s;
```

これによって、あなたは新しいケースに対応することを強制されます：

```plain text
functionarea(s: Shape){if(s.kind ==="square"){return s.size * s.size;elseif(s.kind ==="rectangle"){return s.width * s.height;elseif(s.kind ==="circle"){return Math.PI*(s.radius **2);const _exhaustiveCheck: never = s;
```

ヒント：もちろん、`switch`ステートメントでも同じことが可能です：

```plain text
functionarea(s: Shape){switch(s.kind){case"square":return s.size * s.size;case"rectangle":return s.width * s.height;case"circle":return Math.PI* s.radius * s.radius;default:const _exhaustiveCheck: never = s;
```

strictNullChecksを使用して網羅チェックを行っている場合、TypeScriptは"not all code paths return a value"というエラーを出すかもしれません。そのエラーを黙らせるには、シンプルに`_exhaustiveCheck`変数(never型)を返すだけです:

```plain text
functionarea(s: Shape){switch(s.kind){case"square":return s.size * s.size;case"rectangle":return s.width * s.height;case"circle":return Math.PI* s.radius * s.radius;const _exhaustiveCheck: never = s;
```

引数として`never`を取る関数を書くことができます(したがって、この関数は`never`として推論された変数で呼ばれた場合にのみ呼ばれます)。そして、次のように、関数の本体が実行された場合に例外を投げるように書きます。

```plain text
functionassertNever(x:never): never {thrownewError('Unexpected value. Should have been never.');
```

```plain text
    kind:"square";type Shape = Square | Rectangle;functionarea(s: Shape){switch(s.kind){case"square":return s.size * s.size;case"rectangle":return s.width * s.height;// If a new case is added at compile time you will get a compile error// If a new value appears at runtime you will get a runtime errordefault:returnassertNever(s);
```

次のような形のデータ構造があるとします。

そして、`DTO`をさまざまな場所で使用した後に、`name`という名前は良くない選択だったことに気が付いたとします。このような場合には、*リテラルの数値*(または望むなら文字列)を追加したDTOの新しい*ユニオン型*を定義することで、後から型にバージョニングを追加することができます。*strictNullChecks*を有効にしていれば、バージョン0を`undefined`とマークするだけで、そのバージョンの型が使われているかどうかのチェックを自動的に行えます。

```plain text
   version: undefined,// version 0   name:string,   version:1,    version:2,    firstName:string,
```

このように定義したDTOは、次のように利用します。

```plain text
functionprintDTO(dto:DTO){if(dto.version ==null){console.log(dto.name);}elseif(dto.version ==1){console.log(dto.firstName,dto.lastName);}elseif(dto.version ==2){console.log(dto.firstName, dto.middleName, dto.lastName);const _exhaustiveCheck: never = dto;
```

ユニオン判別を活用しているポピュラーなライブラリはreduxです。

```plain text
import{ createStore }from'redux' * The shape of the state is up to you: it can be a primitive, an array, an object,functioncounter(state =0, action: Action){switch(action.type){return state +1return state -1let store =createStore(counter)// You can use subscribe() to update the UI in response to state changes.// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.store.subscribe(()=>console.log(store.getState())store.dispatch({type:'INCREMENT'})store.dispatch({type:'INCREMENT'})store.dispatch({type:'DECREMENT'})
```

これをTypeScriptで使うことにより、型安全性とリファクタ容易性、そしてコードの自己文書化を図ることができます。

[Union型の判別(Discriminated Union)](https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions)[網羅チェック(Exhaustive Checks)](https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions)[スイッチ(Switch)](https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions)[strictNullChecks](https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions)[網羅チェックの中で例外を投げる](https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions)[Retrospective Versioning](https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions)[Redux](https://typescript-jp.gitbook.io/deep-dive/type-system/discriminated-unions)