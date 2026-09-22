---
Created: 2021-06-07T22:39:00
URL: https://mizchi.hatenablog.com/entry/2018/07/31/124354
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
このテーマで書く前に、まず、最初に自分に多少の偏りがあることを認めておかなくてはなりません。

階層化されたツリー構造([GUI](http://d.hatena.ne.jp/keyword/GUI)/リレーショナルな参照構造)に埋め込まれる状態はコード品質を悪化させるので、できるだけ出現するべきではない。 ただし、状態は確実に存在する。だからこそ慎重に扱うべきだ、という派閥です

## [アンチパターン](http://d.hatena.ne.jp/keyword/%A5%A2%A5%F3%A5%C1%A5%D1%A5%BF%A1%BC%A5%F3): 特に理由もないクラスメソッドへの所属

何かのバリデータを実装したいとします。

その関数がどこに所属するかについて、よく見るこれらの実装は全部[アンチパターン](http://d.hatena.ne.jp/keyword/%A5%A2%A5%F3%A5%C1%A5%D1%A5%BF%A1%BC%A5%F3)といっていいと思います

```plain text
export class Validator {
  static validate() {...}
}

export class Validator {
  validate() {...}
}

export default ({
  validate: () => ...
})

```

正解

```plain text
export function validate() {
  ...
}

```

状態は割れ窓です。最終的な出力に関与される余地は、できるだけ減らしたほうがいいです。(詳しくは後述します)

また、[名前空間](http://d.hatena.ne.jp/keyword/%CC%BE%C1%B0%B6%F5%B4%D6)がほしいだけのクラスも不要です。そもそもvalidateにもっと厳密な名前をつけるか、import 時に[エイリアス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%A4%A5%EA%A5%A2%A5%B9)を付ける、といった解決策はいくらでもあります。参照スコープが限定されているモジュールシステムの中ではあまり厳密ではありません。

new でヒープに積むから効率がどうこう、実際あまり問題じゃありません。ほとんどの場合、それを気にするのは早すぎる最適化です。パフォーマンスチューニングは良いコードだったらいくらでもやる余地はあって、今回は忘れるべきです。

古い[Java](http://d.hatena.ne.jp/keyword/Java)のような、クラスにしかメソッドが所属できないモジュールシステムばかりの時代じゃありません。 **クラスは基本的に不要だと思います**

### 状態は割れ窓

思いつき限り最悪のコードを書きます。

```plain text
const validator = new Validator({defaultWithXXX: true})
validator.ignoreMethodOptions = true
const result = validator.validate({ withXXX: false })

```

オプションがたくさんあるから手続き的に組み立てたいんだ！という主張があるとしたら、オプションを組み立てる部分を別関数にするべきだと思います。 僕だったら[高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4)でこうしますが…

```plain text
const buildValidator = (options) => (input) => ...
const validate = buildValidator({...})
```

これは関数スコープにoptionsを保持するので不変であることは保証されます。とはいえ、カリー化のないJSで[高階関数](http://d.hatena.ne.jp/keyword/%B9%E2%B3%AC%B4%D8%BF%F4)をやるのは型の支援がないと難しいので、 僕も Flow/TypeScript で型が保証されてる時にしかやりません。

## [アンチパターン](http://d.hatena.ne.jp/keyword/%A5%A2%A5%F3%A5%C1%A5%D1%A5%BF%A1%BC%A5%F3): クラスと継承

現代では、継承は基本的に使うべきではない。ということは同意が取れることとします。基本的には、「継承より[コンポジション](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A5%B8%A5%B7%A5%E7%A5%F3)」です。

それでもやらないといけないとしたら、ストラテ[ジー](http://d.hatena.ne.jp/keyword/%A5%B8%A1%BC)パターンを想定したライブラリから、一回だけ、です。それも、プラットフォームが提供するような練られた実装だけから、です。

```plain text
class Foo extends View {
  render(){...}
}
```

たしかに継承は、ライブラリなどのよく練られた[API](http://d.hatena.ne.jp/keyword/API)の一回目の継承は規約として強烈なのですが、それが多段に継承されると protected が乱用され閉鎖原則が破綻しがちで、経験上この先は最悪なコードしか見ません。リスコフの置換原則が守られないのは、歴史が明らかにしています。[GUI](http://d.hatena.ne.jp/keyword/GUI)での標準[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を多段継承するのは最悪で、React / Backbone / [Android](http://d.hatena.ne.jp/keyword/Android) / [Flash](http://d.hatena.ne.jp/keyword/Flash) / Unity で地獄を見ました。

([Rails](http://d.hatena.ne.jp/keyword/Rails) の Controller 継承は悩ましくて、認証漏れを起こすぐらいだったら規約で縛るのもアリな気がするんですが、読み解くのオーバーヘッド大きくてあんまり好きじゃなくて、それこそ mixin とかでどうにかなるような…)

Go や Rust など、最近の言語ではそもそも継承は実装されないことも増えてきました。[コンポジション](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A5%B8%A5%B7%A5%E7%A5%F3)の手段として [Scala](http://d.hatena.ne.jp/keyword/Scala) では trait, Swift では protocol が提供されているので、基本的に避けられると思います。完全コンスト[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)タ制約があれば実質イミュータブルみたいなもんでしょう。

### イミュータブルだと思いこむ

副作用ではなく[GC](http://d.hatena.ne.jp/keyword/GC)に頼り切ってイミュータブルなオブジェクトを返す、という実装のが最近は推奨されると思います。

```plain text
function setA(obj, a) {
  return {...obj, a}
}
```

基本的にすべてをイミュータブルだと思って使って、古い参照は[GC](http://d.hatena.ne.jp/keyword/GC)に落としてもらうことが前提です。これである時点でのその参照へのアクセスは保証されます。[GC](http://d.hatena.ne.jp/keyword/GC)負荷が…と気にするのも早すぎる最適化ですね。

イミュータブル参照を守っていると、リスナーの関数[クロージャ](http://d.hatena.ne.jp/keyword/%A5%AF%A5%ED%A1%BC%A5%B8%A5%E3)でアクセスするオブジェクトがアクセスするたびに値が変わる、といったことは避けられます。redux の reducer なんて、それを実現するだけの関数ですからね。

[POJO](http://d.hatena.ne.jp/keyword/POJO)や[JSON](http://d.hatena.ne.jp/keyword/JSON)のような、薄いオブジェクトを扱っていると、[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)しやすいというのあります。JSは[JSON](http://d.hatena.ne.jp/keyword/JSON)があるので特殊な環境といえばそうなんですが、他の言語でも ORM にマップするときや、通信のために[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)するときなんかも有用でしょう。クラスの[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)から関数以外のプロパティを落として[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)するのは簡単ですが、その逆のデシ[リアラ](http://d.hatena.ne.jp/keyword/%A5%EA%A5%A2%A5%E9)イザを常に用意するのは大変なので、そもそも切り離す、という感じです。

データと実装を切り離して、常にデータだけを[シリアライズ](http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA)する、というアプローチは、データの可用性を大きく高めてくれます。批判があるとしたら、それは「[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)モデル貧血症」じゃないか？というのがありそうですが、それは[名前空間](http://d.hatena.ne.jp/keyword/%CC%BE%C1%B0%B6%F5%B4%D6)の所属だけの問題だと、自分は思います。

ただ、これも型がある環境じゃないとやりづらいとは思います。

## 最後に

もっといろんな言語の立場を書きたかったけど、JSの立場により過ぎた気します。

書き始めた理由としては、以下の2つの記事が念頭にあります。

この2つの記事に同意してるわけじゃないですが、そういう意見が出る時代だろうという認識です。

最近読んだ本の中では、[オブジェクト指向](http://d.hatena.ne.jp/keyword/%A5%AA%A5%D6%A5%B8%A5%A7%A5%AF%A5%C8%BB%D8%B8%FE)を振り返るにあたって、「Game Programming Patterns ソフトウェア開発の問題解決メニュー」 が最高の本でした。

[Game Programming Patterns ソフトウェア開発の問題解決メニュー impress top gearシリーズ](http://www.amazon.co.jp/exec/obidos/ASIN/B015R0M8W0/hatena-blog-22/)

![[51b16u3rFJL._SL160_.jpg]]

ゲームプログラミングと銘打ってますが(実際にゲーム特有のパターンはあるものの)、単にゲームを題材にした、ステートフルな対象をどう扱うか、という本で、ゲームでよくある[C++](http://d.hatena.ne.jp/keyword/C%2B%2B)の実装例だけではなく、筆者が関数型や動的型付けならこうなるからこのパターンは不要と切り捨てたりするので、非常にバランスが良いです。とくに継承批判とシングルトン批判が強烈です。

日頃思ってたことを書いてみたけど、すべての立場の想定反論を用意できたわけではないので、反論がたくさんありそう。ファイッ