---
Created: 2022-06-04T21:15:00
URL: https://qiita.com/Yametaro/items/9b2f0ab2037450004816
Tags: [topic/技術/TypeScript]
---
# とある休日

娘「パパ」

ワイ「なんや？娘ちゃん」

娘「あのね、お友達が」
 娘「TypeScriptの**便利な型**を忘れちゃったの」

ワイ「そうなんや」
 ワイ「便利な型を忘れてもうて、どうなってんねんそれ」
 ワイ「ほな、ワイも一緒に考えてあげるから、その型の特徴を教えてみてよ」

娘「ええとね、例えば」

```plain text
type User = {
  firstName: string
  familyName: string
}

```

娘「↑この型を」

```plain text
type PartialUser = {
  firstName?: string // オプショナルになった
  familyName?: string // オプショナルになった
}

```

娘「↑こんな型に変身させてくれる」
 娘「そんな便利な型らしいんだけど」

ワイ「おー、`Partial<T>`やないか」
 ワイ「その特徴はもう完全にコーンフレーク・・・やなくて`Partial<T>`やがな」

娘「コーンフレーク？」

ワイ「いや`Partial<T>`のことやがな」

ワイ「↑こうするだけやがな」
 ワイ「型を渡すと、それを元に別の型を返してくれる」
 ワイ「**型の関数**みたいな、便利なやつやで」

娘「でも分からないの」

ワイ「何が分からへんのよ」

娘「いや私も`Partial<T>`だと思ったんだけどね」
 娘「お友達が言うには」

```plain text
type User = {
  tag: string
  firstName: string
  familyName: string
}

```

娘「↑こんな風に、`tag`っていう`string`型のプロパティがあった場合には」
 娘「その便利な型を使っても」

```plain text
type PartialUser = {
  tag: string // ここだけオプショナルにならない
  firstName?: string
  familyName?: string
}

```

娘「↑こんな風に、`tag`だけはオプショナルにならないって言ってた」

ワイ「ほな`Partial<T>`と違うか」
 ワイ「`Partial<T>`は、全てのプロパティをオプショナルにしてしまうもんな」

娘「そうなの」

# 自作の便利型

ワイ「ほな、こんな便利な型を自作すればええんとちゃうか？」

```plain text
// tag 以外のプロパティをオプショナルにしてくれる便利型
type PartialWithoutTag<T> = Partial<T> & { tag: string }

```

ワイ「↑こうや」
 ワイ「この型を使えば」

```plain text
type User = {
  tag: string
  firstName: string
  familyName: string
}

```

ワイ「↑この型を」

ワイ「↑こうして」

```plain text
type PartialUser = {
  tag: string // ここだけオプショナルにならない
  firstName?: string
  familyName?: string
}

```

ワイ「↑こんな型を作ってくれるイメージやで」

娘「でも、その型って」

> 
> - 全てのプロパティをオプショナルにしつつ
> - `tag`というプロパティを追加する

娘「↑こんな感じの型だから」

娘「↑こう、元々`tag`を持っていない型を渡したときに」

```plain text
type Hoge = {
  tag: string // プロパティが増えている
  aaa?: string
}

```

娘「↑こう、`tag`プロパティが増えちゃうでしょ」

ワイ「せやな」

# 勝手に`tag`プロパティを増やして欲しくはない

娘「元々`tag`プロパティがない型を渡した場合には」
 娘「`tag`プロパティを増やして欲しくはないの」

ワイ「ぐぬぬ」
 ワイ「つまり・・・」

- 元の型を加工して返してくれる便利な型
- 全てのプロパティをオプショナルにしてくれる 
    - `tag`プロパティがあった場合 → そこだけはオプショナルにしない
    - `tag`プロパティがない場合 → ないままでいい

ワイ「↑こういうことか・・・」

娘「そう」
 娘「そういう、**条件によって変わる型**を作りたいの」

ワイ「ほな`Conditional Types`やないか」

ワイ「ええと」

```plain text
type PartialWithoutTag<T> =
  T extends { tag: string } // 条件
  ? Partial<T> & { tag: string } // 真の場合に返す型
  : Partial<T> // 偽の場合に返す型

```

ワイ「↑こうやな」
 ワイ「三項演算子みたいに書くねん」
 ワイ「いや、四項演算子か」

娘「そっか、なるほど」
 娘「`Conditional Types`を使えばよかったんだね」
 娘「ちょっと、コメントを変えてみていい？」

ワイ「おお、ええで！」

娘「ありがとう」
 娘「えっと・・・」

```plain text
type PartialWithoutTag<T> =
  T extends { tag: string } // tag という string 型のプロパティを持っていた場合
  ? Partial<T> & { tag: string } // tag プロパティ以外をオプショナルにする
  : Partial<T> // そうでない場合、全てのプロパティをオプショナルにする

```

娘「↑こういうことだね！」

ワイ「せやな！」

娘「渡された型`T`が、`tag`プロパティを持っていた場合には」
 娘「`tag`以外をオプショナルにしてくれるし」
 娘「そうでない場合には」
 娘「全てのプロパティをオプショナルにしてくれる・・・」
 娘「できたね！」
 娘「パパ、ありがとう！」

ワイ「かめへん、かめへん！」

娘「でも分からないの」

ワイ「いやまだあんのかい」

# `tag`プロパティが`string`型じゃないこともある

娘「そういえばお友達が」

> 
> お友達「`tag`プロパティは必ずしも`string`型じゃないんだ」

娘「↑こう言ってた」
 娘「`tag`プロパティの型は、場合によって色々だって」

ワイ「ぐぬぬ」
 ワイ「ほな`any`型やないかい」
 ワイ「その特徴はもう、なんでも許してくれる便利な`any`型や！」

娘「`any`型は危険だから、`tsconfig.json`で禁止してるってお友達が言ってた」

ワイ「ほな`any`型と違うか」
 ワイ「ええと、さっきの型は」

> 
> - tag という string 型のプロパティがあった場合

ワイ「↑こういう条件やったけど」
 ワイ「それを」

> 
> - tag という**何らかの型の**プロパティがあった場合

ワイ「↑こういう条件に変えなアカン訳やな」
 ワイ「どうすればええんや・・・？」

娘「あ、分かった！」

娘「ええと、`extends`の右側の部分だけど」
 娘「`{ tag: string }`とは限らないから」
 娘「条件を広げるために」
 娘「`{ tag: infer U }`に変えるね」

```plain text
type PartialWithoutTag<T> =
  T extends { tag: infer U } // string から infer U に変更
  ? Partial<T> & { tag: string }
  : Partial<T>

```

娘「↑こうだね」
 娘「`extends`の右側で`{ tag: infer U }`ってすることで」
 娘「`tag`プロパティの型を推論して」
 娘「`U`という**型変数**に入れてくれるの」

ワイ「おお」
 ワイ「`tag`プロパティの型、つまり**何か分からん型**に」
 ワイ「`U`っていう名前をつけるイメージやな」

娘「うん」

ワイ「なるほどな」

> 
> - tag という string 型のプロパティがあった場合

ワイ「↑こういう条件を」

> 
> - tag という**何らかの型の**プロパティがあった場合

ワイ「↑こういう条件に広げたい場合に」
 ワイ「`infer`が使えるんやな」

娘「そうだね」
 娘「そして、その型変数`U`を」
 娘「後ろの部分で使ってあげないといけないから」

```plain text
type PartialWithoutTag<T> =
  T extends { tag: infer U }
  ? Partial<T> & { tag: U } // string から U に変更
  : Partial<T>

```

娘「↑こうだね！」

ワイ「なるほどな」
 ワイ「コメントを付け直すとすると」

```plain text
type PartialWithoutTag<T> =
  T extends { tag: infer U } // tag プロパティがあった場合、その型を U とする
  ? Partial<T> & { tag: U } // tag プロパティの型は U のまま引き継ぐ
  : Partial<T>

```

ワイ「↑こんな感じやね」

娘「そうだね」
 娘「ちなみに`infer`というのは、**推論する**って意味だね」

ワイ「なるほどな」
 ワイ「`tag`プロパティの型を**推論**して、`U`という型変数に入れてくれる訳やもんな」

娘「そうだね」

ワイ「そうかー」
 ワイ「`infer`ってよく分かってなかったけど」
 ワイ「`Conditional Types`の`extends`の右側で使うものだったんやな」
 ワイ「そんで、条件を汎用的にできるんやな」

娘「そんな感じだね」

ワイ「さすが娘ちゃんや」
 ワイ「これで、自作の便利型が1つ作れたやないか」

娘「えへへ」

- `A extends B ? C : D`という形式で、条件分岐のロジックをもった型を作れる 
    - `A extends B`が**条件**にあたる
    - `C`は**真の場合に返す型**
    - `D`は**偽の場合に返す型**
- `B`の部分で`infer`というキーワードを使うことができる 
    - 型を推論し**型変数**に格納できる
    - **何か分からない型**でも条件に使うことができる
    - 型変数に格納した型は、**返す型**を書くときに使える

ワイ「`Conditional Types`を忘れてしまって、思い出したいなんて」
 ワイ「変わったお友達がおるんやね」
 ワイ「一体どんなお友達なん？」

娘「そんなお友達はいないの」

ワイ「ファッ！？」

娘「パパに、`Conditional Types`と`infer`の使い方を理解して欲しくて」
 娘「仮の問いをしてみたの」

ワイ「そ、そうなん・・・？」
 ワイ「ま、まあ、おかげで勉強になったからええわ」
 ワイ「ありがとうやで」

**〜おしまい〜**

# Findy Engineer Labさんにも記事を寄稿しましたやで

![[Attachments/無題のフォルダ/qiitan-for-login-modal-014e085d3e40a240e3fe8d61b70b29a9 1.png]]

Why not register and get more from Qiita?

1. We will deliver articles that match youBy following users and tags, you can catch up information on technical fields that you are interested in as a whole
2. you can read useful information later efficientlyBy "stocking" the articles you like, you can search right away

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

[Sign up](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2FYametaro%2Fitems%2F9b2f0ab2037450004816&realm=qiita)

[Login](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2FYametaro%2Fitems%2F9b2f0ab2037450004816&realm=qiita)

みんな知ってるあのサービスも、ゆめみが一緒に作ってます。スマホアプリ/Webサービスの企画・UX/UI設計、開発運用の内製化支援。Swift,Kotlin,Rust,Go,Flutter,ML,React,AWS等エンジニア・クリエイターの会社です。Twitterで情報配信中https://twitter.com/yumemiinc