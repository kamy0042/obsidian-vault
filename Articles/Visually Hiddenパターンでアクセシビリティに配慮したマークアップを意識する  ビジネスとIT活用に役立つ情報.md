---
タグ: []
作成日時: 2024-01-20T16:52:00
URL: https://www.asobou.co.jp/blog/web/visually-hidden
Tags: [topic/アクセシビリティ]
---
![[visually-hidden-main.jpg]]

React Testing Library や Chrome の開発者ツールでアクセシビリティツリーが見えるようになるなど、最近はただ見た目通りにマークアップするだけではなく、アクセシビリティに配慮したマークアップも必要なスキルセットになってきている流れを感じます。

筆者といえば、最近HTMLやCSSをよく書くようになり、マークアップ完全に理解したからマークアップなんも分からんとなっている状況です。（アクセシビリティも同様）

今回はマークアップなんも分からんといった状況の筆者が、アクセシビリティに配慮したマークアップを意識するといった内容になります。HTML、CSS、アクセシビリティは難しいので鵜呑みにせずに適宜MDNなどのドキュメントをご確認ください。

INDEX

- [例えばチェックボックスを装飾したい](https://www.asobou.co.jp/blog/web/visually-hidden#i)
- [display: none の要素をスクリーンリーダーなどの支援技術は読み上げてくれない](https://www.asobou.co.jp/blog/web/visually-hidden#display_none)
- [視覚的に隠したいけど、スクリーンリーダーには読み上げて欲しい](https://www.asobou.co.jp/blog/web/visually-hidden#i-2)
- [display: none を Visually Hidden に置き換える](https://www.asobou.co.jp/blog/web/visually-hidden#display_none_Visually_Hidden)
- [さいごに](https://www.asobou.co.jp/blog/web/visually-hidden#i-3)

## 例えばチェックボックスを装飾したい

無性にチェックボックスを装飾したいとき、あると思います。

例えばこんな感じのチェックボックスですね。

![[01.gif]]

inputタグのチェックボックスではできる装飾が限られているので、一定以上の装飾を施したいとなったら、疑似要素や他の要素に施した装飾でチェックボックスの擬似的な見た目を作り、input  [type=”checkbox”]  を隠すことが多いと思います。

この時点での開発者ツールのアクセシビリティツリーはこのようになっています。

![[02.png]]

※Chrome開発者ツールのアクセシビリティツリーの使用方法は [こちら](https://developer.chrome.com/blog/full-accessibility-tree/) を参照

チェックボックスの装飾も終わったので、 input[type=”checkbox”]  は  display: none  で隠すとしましょう。

![[03.gif]]

いい感じですね。今夜は祝杯するしかない。

ここで開発者ツールのアクセシビリティツリーをもう一度確認してみます。

![[04.png]]

お分かりいただけたでしょうか。

チェックボックスがアクセシビリティツリー上からいなくなっています。

## display: none の要素をスクリーンリーダーなどの支援技術は読み上げてくれない

CSSで  display: none  とした要素をスクリーンリーダーは読み上げてくれません。

直訳すると  表示:なし  としてるんだから当然といえばその通り。

## 視覚的に隠したいけど、スクリーンリーダーには読み上げて欲しい

こういった時に役立つ Visually Hidden というパターンがあります。

参照

- [Hide content – The A11Y Project](https://www.a11yproject.com/posts/how-to-hide-content/)
- [Visually hidden · Bootstrap v5.0](https://getbootstrap.jp/docs/5.0/helpers/visually-hidden/)

Bootstrapや主要なCSSフレームワークでもユーティリティクラスとして提供されているようですね。

色々と流儀はあるようですが概ねこんな感じのCSSです。

```plain text
.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}
```

VoiceOverが読み上げるにはwidth, heightが1px以上必要で、

また  white-space: nowrap  を指定しないことでスクリーンリーダーがスペースをつなげて不自然な読み上げ（※1）をしてしまうことがあるようです。

※1 参考：[Beware smushed off-screen accessible text](https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe)

## display: none を Visually Hidden に置き換える

inputタグに指定していた  display: none  を削除して、 .visually-hidden  クラスをinputタグに指定するようにします。

![[05.gif]]

Visually Hiddenに置き換えたチェックボックス

見た目は  display: none  と変わりありません。

![[06.png]]

Visually Hiddenに置き換えたアクセシビリティツリー

アクセシビリティツリーにもチェックボックスが表示されるようになりました。

今回のケースではここまで話題に挙げていませんでしたが、 display: none  で隠したinput要素にはフォーカスが当たらなくなります。

筆者はフォームなどではキーボードのタブ移動を使用することが多いのですが、タブ移動ができないフォームはちょっとしたストレスです。

今回のケースでは Visually Hidden パターンを使用することで、タブ移動時にフォーカスが当たるようになる副次的なメリットもあります。

![[07.gif]]

## さいごに

今回実装したチェックボックスのコードを記載しておきます。

※create-viteを使用して作成した Vite + React + TypeScriptを使用

### App.tsx

```plain text
import { FC } from "react";

import './App.css'

export const App: FC = () => {
  return (
    <div className="App">
      <label htmlFor="c-01" className="checkbox-wrapper">
        <input type="checkbox" id="c-01" name="checkbox" className="visually-hidden" />
        <span className="icon" />
        <span className="label">Alice</span>
      </label>
      <label htmlFor="c-02" className="checkbox-wrapper">
        <input type="checkbox" id="c-02" name="checkbox" className="visually-hidden" />
        <span className="icon" />
        <span className="label">Bob</span>
      </label>
      <label htmlFor="c-03" className="checkbox-wrapper">
        <input type="checkbox" id="c-03" name="checkbox" className="visually-hidden" />
        <span className="icon" />
        <span className="label">Charlie</span>
      </label>
    </div>
  )
}
```

### App.css

アクセシビリティに配慮することで、スクリーンリーダーのような支援技術が必要な方だけでなく、タブ移動をする方など全ての方に体験がよい（アクセシブルな）マークアップを日頃から意識していきたいですね。