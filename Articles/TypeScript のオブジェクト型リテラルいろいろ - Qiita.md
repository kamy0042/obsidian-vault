---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
# はじめに

この記事は、TypeScript のオブジェクト型リテラルを主とした型定義メモです。

現在携わっている開発環境では、変数を宣言する際に指定する型の多くが、
クラスやインターフェースによって定義されています。
そのため、即席の型を定義する記述「オブジェクト型リテラル」に触れる、または書くケースが少ないです。
そんなわけでこれらの確認も兼ねて、本記事にまとめました。
TypeScript を使う以上、あまり any は使いたくないものですし。

# 型定義の種類

※ この記事のサンプルは数ある型定義の抜粋です。

type-sample.ts

`export class typeSampleModel {

  // プリミティブな型
    str: string;                              // 文字列
    num: number;                              // 数値
    boolean: boolean;                         // 真偽値

    // なんでもOKの any型
    data: any;

   // オブジェクト型リテラル
    array: any[];                             // 配列
    strArray: string[];                       // 配列内に文字列
    numArray: number[];                       // 配列内に数値
    multiArray: string[][];                   // 多次元配列
    objectArray: {key: string}[];             // 配列内にオブジェクト

    object: {key: string};                    // オブジェクト
    arrayObject: {key: string[]};             // オブジェクト内に配列
    strKeyObject: { [s: string]: string };    // 任意の文字列キーを許容したオブジェクト
    numKeyObject: { [n: number]: string[] };  // 任意の数値キーを許容したオブジェクト

    constructor () {
        this.str = "A";
        this.num = 1138;
        this.boolean = true;
        this.object = { key: "A"};
        this.array = [ "A" ];
        this.strArray = [ "A", "B" ];
        this.numArray = [ 1, 2 ];
        this.multiArray = [ [ "A", "B" ], [ "C", "D" ] ];
        this.objectArray = [ { key: "A" }, { key: "B" } ];
        this.arrayObject = { key: ["A", "B", "C"] };
        this.strKeyObject = { "a": "A", "b": "B", "c": "C" };
        this.numKeyObject = { 1: ["a", "A"], 2: ["b", "B"] }
    }

    // 関数を示すFunction
    // 関数の戻り値がない場合に使うvoid
    var method: Function = (): void => {
        var a:number = 1;
    }
}`

## 参考

- [TypeScriptチートシート](http://qiita.com/morrr/items/4b555e0642ad57c987f3)