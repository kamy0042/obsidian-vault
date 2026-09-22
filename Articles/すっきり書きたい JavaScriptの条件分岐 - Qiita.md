---
Created: 2021-01-15T20:25:00
Tags: [topic/技術/JavaScript]
---
(※追記 2020/2/19 コメントのご指摘をもとに、記事を修正しました)

# はじめに

未経験からNode.jsの現場に配属された2019年新卒エンジニアが、学習の振り返りとしてJavaScriptの基礎の基礎をまとめます。

過去のJavaScript基礎シリーズ↓[JavaScriptでvarが推奨されない理由を整理してみた](https://qiita.com/taiju_suzuki/items/49ed558bd837452353b8)

今回は、多くの書き方が存在するJavaScriptの条件分岐に関して、よりすっきりとした書き方を考えていきます。

# Goal

- 思考停止のelseやswitchから離れる
- 可読性やリファクタリングのしやすさの観点から、JavaScriptの条件分岐を使いこなす

# まず「すっきり」を定義する

本記事で目指したい「すっきり」を、以下のように定義します。

- コードの可読性が高いこと
- バグが生まれにくいこと
- 後からリファクタリングがしやすいこと

## コードの可読性が高いこと

プロジェクトとして複数人で開発をする際に、可読性の高いコードを書くことはとても重要です。

「可読性」という言葉の意味するところは本記事では割愛しますが、[こちらの記事](https://qiita.com/icoxfog417/items/f737d6c84b733f649461)がわかりやすくとても参考になるので、詳しく掘り下げたい方は併せてお読みください。

可読性については、一人で自習ばかりしているとおろそかになってしまいがちな考え方なので、常に考えておく癖をつけておきたいですね。

## バグが生まれにくいこと

これは、書き忘れや書き間違いによるバグが発生しにくい、といった意味合いです。期待していない動作の場合に、エラーとして表示される等でバグに気づきやすい書き方は、未然にバグを防げます。

## 後からリファクタリングがしやすいこと

後から仕様の追加や変更があった際に、対応しやすいコーディングを指します。

ピンとこない方は[こちらの記事](https://qiita.com/kyntk/items/d60fdbc51df4f1d4c3c7)が、リファクタリングの重要性を分かりやすくまとめていただいていますので、ぜひお読みください。

# JavaScriptの条件分岐をおさらい

ということで、「可読性が高く」「バグが生まれにくく」「後からリファクタリングがしやすい」条件分岐の書き方を考えていきたいと思うのですが、その前にまず、JavaScriptの条件分岐に用いられる基本的な構文を整理します。

**基本的な書き方**

- else文
- if...else文
- switch文

**やや応用的な書き方**

- 三項演算子
- ショートサーキット評価を用いた構文

## 基本的な書き方

### else文

`const pokemon = {
  name: "ヤドン"
};

const galarCheck = pokemon => {
  if (pokemon.name === "ヤドン") {
    return "ヤドンはガラルちほうにしゅつげんします";
  } else {
    return undefined;
  }
};

console.log(galarCheck(pokemon));  // ログの出力結果は"ヤドンはガラルちほうにしゅつげんします"`

多くのプログラミング教材で最初に習う条件分岐が、おそらくこの構文ではないかと思われます。if文で条件に合致した場合の式が実行され、合致しなかった場合はelseが実行されます。

ただし、**条件に合致しない場合はif文以下の実行が無視されるだけ**なので、上の例のようにすぐにreturn が書ける条件分岐であれば、以下のようにelseを省略することが可能です。

`const galarCheck = pokemon => {
  if (pokemon.name === "ヤドン") {
    return "ヤドンはガラルちほうにしゅつげんします";
  } 
  return undefined;
};`

### else if...文

`const yadon = {
  name: "ヤドン"
};
const galarPokemon = {
  name: "ヌオー",
  galarNumber: 101
};
const kantoPokemon = {
  name: "ヒトデマン"
};

const isGalar = pokemon => {
  if (pokemon.galarNumber) {
    return "ガラルちほうにしゅつげんします";
  } else if (pokemon.name === "ヤドン") {
    return "ガラルちほうにしゅつげんします";
  } else {
    return "ガラルちほうにはしゅつげんしません";
  }
};

console.log(isGalar(yadon)); // 出力結果は"ガラルちほうにしゅつげんします"
console.log(isGalar(galarPokemon)); // 出力結果は"ガラルちほうにしゅつげんします"
console.log(isGalar(kantoPokemon)); // 出力結果は"ガラルちほうにはしゅつげんしません"`

こちらも、初歩的な条件分岐としてよく出てきますね。3つ以上の条件分岐が必要な場合に活用する構文です。

ただ、**JavaScriptに「else if」構文というものはありません。** 実際の挙動としては**else文の中でさらにif節とelse節のネストが生成されているのと等しい**ようです。
また、この書き方でもelseの省略が可能です。以下のコードは上記の例と同様の実行結果となります。

`const isGalar = pokemon => {
  if (pokemon.galarNumber) {
    return "ガラルちほうにしゅつげんします";
  } 
  if (pokemon.name === "ヤドン") {
    return "ガラルちほうにしゅつげんします";
  } 
  return "ガラルちほうにはしゅつげんしません";
};`

### switch文

`const evolutionEevee = stone => {
  let eevee;
  switch (stone) {
    case "ほのおのいし":
      eevee = "ブースター";
      break;
    case "みずのいし":
      eevee = "シャワーズ";
      break;
    case "かみなりのいし":
      eevee = "サンダース";
      break;
    default:
      eevee = "イーブイ";
  }
  return eevee;
};

console.log(evolutionEevee("ほのおのいし")); // 出力結果は"ブースター"
console.log(evolutionEevee("みずのいし")); // 出力結果は"シャワーズ"
console.log(evolutionEevee("かみなりのいし")); // 出力結果は"サンダース"
console.log(evolutionEevee("かたいいし")); // 出力結果は"イーブイ"`

こちらも、複数の分岐が発生する条件式における定番の書き方です。`case ○○:`で条件を分岐させ、いずれのcaseにも一致しなかった場合は`default`の式が実行されます。

注意すべき点は、case節やdefault節で条件分岐の処理を書いた後の`break`の有無によって、switchの実行が異なるという点です。

switch文は、処理の中でbreakが入力されていた場合に条件の判定をやめ、switch文を抜けて次の文から実行を続けます。

breakが入力されていないと**条件に合致したcase節があってもswitch文が継続されてしまう**のです。

breakが無い場合の挙動は以下のようになります。

`const evolutionKlink = pokemon => {
  let grade;
  switch (true) {
    case /ギギギアル/.test(pokemon):
      grade = 3;
    case /ギギアル/.test(pokemon):
      grade = 2;
    case /ギアル/.test(pokemon):
      grade = 1;
  }
  return grade;
};

console.log(evolutionKlink("ギギギアル"));
console.log(evolutionKlink("ギギアル"));
console.log(evolutionKlink("ギアル"));
// いずれも出力結果は「1」`

上の例では、test関数を利用して、引数pokemonを正規表現によって判定する関数を実行しているのですが、breakを書かなかったせいで、手前のcaseに合致する場合でも全てのcaseで判定が行われ、意図しない結果が出力されてしまっています。breakを書けばこのバグは防ぐことができます。

あえてbreakしないswitchの書き方というのもあるようですが、基本的にswitchを使うならbreakを忘れずに書いた方が安心ではないかと思います。

もしくは、**case節で直接return文を書き、条件に一致したcase以降の式を読み取らせないようにするのが良い**でしょう。

## やや応用的な書き方

### 三項演算子

ifを用いない条件分岐の書き方として、三項演算子というものがあります。
これは、**if文でブロックを分けたくない場合に、コンパクトに条件分岐を書くことができる**とても便利な構文です。構文は以下の通りです。

`条件式 ? 条件がtrueの場合の処理 : 条件がfalseの場合の処理`

たとえば以下のように、変数に代入する値を条件分岐で決めたい時に使われることが多いです。

`// 例
const pokemon = {
  name: "サニーゴ",
  region: "ガラルちほう"
};

const typeCheck = sunnygo => {
  const type = sunnygo.region === "ガラルちほう" ? "ゴースト" : "みず・いわ";
  return `サニーゴは${type}タイプです`;
};

console.log(typeCheck(pokemon)); // 出力結果は"サニーゴはゴーストタイプです"`

三項演算子を使わずにこれを記述すると、以下のようになります。

`const pokemon = {
  name: "サニーゴ",
  region: "ガラルちほう"
};

const typeCheck = sunnygo => {
  let type;
  if (sunnygo.region === "ガラルちほう") {
    type = "ゴースト";
  } else {
    type = "みず・いわ";
  }
  return `サニーゴは${type}タイプです`;
};

console.log(typeCheck(pokemon)); // 出力結果は"サニーゴはゴーストタイプです"`

else文だと、コードのブロックが増えていたり、関数の上部でletを宣言してから再代入をするような書き方を余儀なくされたり、少し「すっきり」ではなくなっている、という感覚を掴んでいただけるかと思います。

### ショートサーキット評価を用いた構文

**&&** (論理AND) や **||** (論理OR)といった論理演算子を用いた書き方も、条件分岐の一種として活用することができます。構文は以下の通りです。

`値A || 値B
　値Aがfalseの判定の場合、値Bが判定される 

値A && 値B
　値Aがtrueの判定の場合、値Bが判定される`

`const letsGo = pokemon => {
  const partner = pokemon || "イーブイ";
  return partner;
};

console.log(letsGo("ピカチュウ")); // 出力結果は"ピカチュウ"
console.log(letsGo(null)); // 出力結果は"イーブイ"`

上の例では、引数pokemonがfalsyな値（false, 0, -0, NaN, null, undefined, 空文字列（""））だった場合に、必ず"イーブイ"を戻り値にする関数が実行されています。

**条件がfalsyだった場合、デフォルトの返り値を短いコードで表現する際に、よく用いられる書き方**です。

この書き方が見慣れない方は、以下のコードを見てもらえば挙動のイメージがつくかと思います。

`const letsGo = pokemon => {
  if (!pokemon) {
    return "イーブイ";
  }
  return pokemon;
};`

ちなみに、ショートサーキット評価ではfalsyな値を全て一律に評価するので、たとえば引数がundefinedの時のみデフォルトを返すようにしたい、というような場合は、以下のように書く必要があります。

`const letsGo = pokemon => {
  const partner = pokemon === undefined ? "イーブイ" : pokemon;
  return partner;
};

console.log(letsGo()); // 出力結果は"イーブイ"
console.log(letsGo(null)); // 出力結果はnull`

# すっきりな条件分岐を考える

JavaScriptの主な条件分岐の書き方をおさらいしたところで、ここから「可読性が高く」、「バグが生まれにくく」、「後からリファクタリングがしやすい」、すっきりした条件分岐の書き方を追求します。

結論から言うと、本記事の主張は以下の3点です。

- ショートカット演算子は使いどころをきちんと定め、多用しないようにする
- 早期returnができるケースでは、elseを必要以上に使わない
- 複数の条件分岐はswitch以外の書き方も覚えておくこと

## 何でもショートカット演算子、ではNG

三項演算子やは、一行で条件分岐が記述できる便利な構文のため、つい多用してしまいがちになりますが、何にでも使えばいいというわけではなく、かえって可読性を下げてしまう場面もあります。

`const sunnygo = {
  region: "カントー地方"
};

const galarCheck = sunnygo => {
  return sunnygo.type === "ゴースト" || sunnygo.type === ""
    ? (sunnygo.isGalar = true)
    : (sunnygo.type = "みず・いわ");
};

galarCheck(sunnygo);

console.log(sunnygo); // 出力結果は`{ region: 'カントー地方', type: 'みず・いわ' }``

上記のコードでは、引数sunnygoのtypeプロパティが"ゴースト"という文字列か空文字だった場合はisGalar:trueのプロパティを追加し、それ以外の場合はtypeの値を"みず・いわ"にする、というような関数を無理やりショートカット演算子で1行にして記述していますが、何が返ってくる関数なのかが一目で分かりづらいことになっていますね。

（実際にこんなコードを書く人はいないと思いますが、あくまで「やろうと思えばこういうことが出来てしまう」という悪い例なので大目に見てください……。）

入り組んだ条件分岐は、素直にifで書きましょう。

`const sunnygo = {
  region: "カントー地方"
};

const galarCheck = sunnygo => {
  if (sunnygo.type === "ゴースト") {
    sunnygo.isGalar = true;
  } else if (sunnygo.type === "") {
    sunnygo.isGalar = true;
  } else {
    sunnygo.type = "みず・いわ";
  }
  return sunnygo;
};

galarCheck(sunnygo);

console.log(sunnygo); // 出力結果は`{ region: 'カントー地方', type: 'みず・いわ' }``

### elseを毎回書く必要はない

(※2/19追記)`当初「elseは必要ない」との趣旨で書き進めておりましたが、多くの方から不勉強な旨の指摘をいただき、内容を修正しております。`

ifとセットで用いられるelseは、先述の通り、**書かなくても挙動に影響のない場面**があります。
elseは条件分岐を明示的にするのに適した書き方ではありますが、**ブロックを増やしてしまうデメリットがあります。**ブロックが増えるのは単に読みづらくなるだけでなく、JavaScriptで主に使われる`const`で宣言された変数が**ブロックスコープ**であるため、ブロックを増やすことで自然な宣言が行えなくなる可能性もあります。そのような場合は、関数を分けたり、三項演算子を活用した方がかえって「すっきり」します。

また、elseによる場合分けを行うことは、**2つのケースがどちらも正常系であることを明示する**書き方でもあるようです。（コメントで提供していただいた[こちらの記事](http://dqn.sakusakutto.jp/2012/08/if-else.html)が非常に分かりやすかったです。ご教示いただきありがとうございます。）
反対に、elseを用いずすぐに関数内でreturnするような書き方は「ガード節」とも呼ばれる書き方で、正常系の処理と異常系の条件をはっきり分けたい場合に用いられます。

記述したい内容が**2つの正常系を場合分けしたい**のか**正常条件に対する特殊条件を明示したい**のかによって、elseを使い分けるのが良さそうです。

### switchばかり使うのは危険？

複数の条件分岐を書こうというときにswitch文は非常に便利な構文ですが、switchしか解決法を持っていないと、しばしば困る場面も訪れます。

先述のとおり、switchはbreakの仕様のおかげで、気をつけないとバグを生んでしまう構文です。また、3～4ケースの条件分岐ならあまり気になりませんが、分岐が100ケースを超えたりすると、switchだと**非常に読みづらい**です。

`const pokemon = {
  name: "ニャース"
};

const pokemonIndex = pokemon => {
  switch (pokemon.name){
    case "フシギダネ":
      return 1;
    case "フシギソウ":
      return 2;
    case "フシギバナ":
      return 3;
    case "ヒトカゲ":
      return 4;
    case "リザード":
      return 5;
    case "リザードン":
      return 6;
    case "ゼニガメ":
      return 7;
    case "カメール":
      return 8;
    // 以下、図鑑No.151まで続く...
  }
};`

上記は、ポケモンの名前に応じた図鑑ナンバーを返すプログラムを書こうとしているところなのですが、switchで151ケース（default含めると152ケース）の条件分岐を行うことがいかに無謀なことなのかは、何となくお分かりいただけるかと思います。。

しかも、この書き方だとポケモンに少し詳しい人じゃないと図鑑ナンバーのことを言っていることが伝わりづらい。。

こうした時のために、switch以外で複数の条件分岐を書く術も、いくつかあると良いでしょう。

私がよく使っているのが、find関数を用いた条件分岐です。

Array.prototype.find

`array.find( callback関数() )`

これは、配列の要素それぞれに対してコールバック関数を実行し、最初にtrueな値を返すという関数です。もちろん、本来は配列を扱うための関数なのですが、これを活用することで、たとえば以下のように条件分岐を書くことができます。

`const pokemonList = [
  { name: "フシギダネ", No: 1 },
  { name: "フシギソウ", No: 2 },
  { name: "フシギバナ", No: 3 },
  { name: "ヒトカゲ", No: 4 },
  { name: "リザード", No: 5 },
  { name: "リザードン", No: 6 },
  { name: "ゼニガメ", No: 7 },
  { name: "カメール", No: 8 },
  { name: "カメックス", No: 9 },
  { name: "キャタピー", No: 10 },
  { name: "トランセル", No: 11 },
  { name: "バタフリー", No: 12 },
  // 以下、図鑑No.151まで続く
];


const pokemon = {
  name: "ニャース"
};

const pokemonIndex = pokemon => {
  const pokemonNumber = pokemonList.find(p => p.name === pokemon.name).No;

  return pokemonNumber;
};

console.log(pokemonIndex(pokemon));  //出力結果は52;`

上記のコードでは、配列pokemonListに分岐の対象となっているポケモンの名前と図鑑ナンバーのセットを格納し、関数pokemonIndexで、引数に指定したポケモンの名前とpokemonListに格納されたnameが一致するまで配列内で検索を行い、配列で最初に一致した値を返しています。

switchで書く場合と比較して、objectとして要素を扱うのでコピペがしやすかったり、ページ内検索がかけやすかったりするため、リファクタリングのしやすさが格段に上がっていることがお分かりいただけたら幸いです。これなら、ある日突然、全国図鑑になったとしても充分に対応できます。

# まとめ

- else文：使わなくても平気
- switch文：便利だけど、ときに不便
- 三項演算子：変数の代入でサクッと条件分岐したいときに使おう
- 短絡演算子：デフォルトの値を明示したいときに使おう
- find関数は良いぞ

JavaScriptには色々な構文がありますが、それぞれの長所・短所を踏まえつつ、すっきりしたコーディングを目指していけると良いのかな、と思います。

以上です。
間違い、不足点の指摘などあれば、コメントをお願いいたします。