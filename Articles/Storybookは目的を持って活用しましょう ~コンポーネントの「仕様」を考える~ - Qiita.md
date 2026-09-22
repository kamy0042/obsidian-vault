---
Created: 2022-12-20T09:47:00
URL: https://qiita.com/Kontam/items/299078aceb1988e8ac66
Tags: [topic/デザインシステム/コンポーネント設計]
---
# はじめに

## この記事に書くこと

Storyを盲目的に作成せず、目的を持って作ることによってStorybookは本当の価値を発揮できます。
 結論から書くと、重視すべき点は以下です。

- Storybook上で何を検証したいのかを考える
- そのコンポーネントはどんな仕様を持つのか考える
- 実アプリ上で組み合わせられる他のコンポーネントとの責務分けを明示する

詳しくは記事の中で詳しく解説します。

## この記事に書かないこと

- Storybookのアドオン活用について

Storybookにデフォルトで組み込まれている機能のみで解説します。
 アドオンがあれば更に便利ですが、無くても十分に活用しがいがあるツールであることを紹介するためです。

## 記事を書く動機と筆者の経験

筆者は複数のモダンフロントエンド開発に携わり、実開発及び開発環境の構築を行なってきました。
 近年行う開発では全てStorybookを活用しており、どのプロジェクトにおいてもその重要性を実感してきました。
 不慣れな開発者は網羅率（カバレッジ）に目が向きがちで、Storyを用意する本当の理由に辿り着けず、作成の手間に苦しめられるばかりになってしまうことがあります。
 そのような人に有用な活用方法を共有して、苦しみを取り除いて快適な開発ツールとしてのStorybookを提供したいと考えました。

# Storybookの価値は生み出すものである

## Storybookが腐ってしまうプロジェクト

時々、Storybookが導入されているにも関わらずほとんど活用されていないプロジェクトを見ます。多数あるコンポーネントのうち、半数以下しかStoryが作成されていないこともあります。

そのようなプロジェクトメンバーに話を聞いてみると以下のような理由が挙げられました。

- 他にテストを用意しているため、両方維持し続けるのは過剰だと感じてStorybookはメンテナンスされなくなった
- デザイナーとの協業が薄いため、コンポーネントカタログを用意する意義がないと感じたから
- 汎用ボタンのような多数の画面で利用されるコンポーネントなら価値を感じるが、3,4ヶ所でしか使われないコンポーネントのStoryはあまり見返されることがないから

どれも合理的な理由で、限りある工数の中でプロダクト開発を進める上では仕方ない決断であると思います。

これらに共通することは「Storybookが存在する意義が見出せなかった」ということになります。
 私の考えとしては、Storybookは開発効率の向上に貢献するツールです。**念のために作っておくカタログではありません。**
 もし、カタログのような感覚でStoryを作っているのであれば、そのプロジェクトではStorybookの本来の価値を引き出せていない可能性があるのではないかと思います。
 価値を引き出し、存在意義が強くなればStorybookが腐るのを防ぐことができます。

## Storybookの存在意義

Storybookはどんな目的ために存在するべきでしょうか。

これはプロジェクト毎に違うものだと思いますので一概には言えませんが、私のオススメは「コンポーネントの**仕様**を確認する」という目的です。
 至極当然な事であるように見えると思いますが**コンポーネントの仕様に着目することを忘れると、見た目の確認ができるだけのStoryになりかねません。**
 見た目は仕様の一部に過ぎず、その確認ができるだけでは価値が薄いと言えるでしょう。

コンポーネントの仕様とは何なのか？ について今一度詳しく考えてみていただきたいと思います。

# コンポーネントの仕様とは

## 説明用サンプルコンポーネントの紹介

ここからは実際にサンプルコードを使いながら解説します。コードは以下のリポジトリから閲覧できます。[https://github.com/Kontam/storybook-components](https://github.com/Kontam/storybook-components)

簡単なTodoリストを例にコンポーネントの仕様を考えてみましょう。
 例えば、下記のようなコンポーネントの構成でTodoリストが作られていたとします。

![[https3A2F2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com2F02F6011552Fd912154f-70cd-8c99-aee9-a87a738b1fd4.png]]

色分けされている部分がコンポーネントの境界と考えてください。
 以下の３つのコンポーネントから構成されています。

- Container
- TodoList
- TodoItem

この３つのコンポーネントの実装を紹介しつつ、**Storyはどのようなものであるべきか**考えてみることにします。

## Container

まずはContainerコンポーネントのソースから見ていきましょう。非常にシンプルです。

```plain text
import { ReactNode } from "react";
import styles from "./Container.module.css";

type Props = {
  children?: ReactNode;
};

export const Container: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
			<h1 className={styles.heading}>Container</h1>
			{props.children}
    </div>
  );
};

export default Container;

```

### コンポーネントの仕様を言語化する

Containerコンポーネントの仕様をソースコードから読み解くと仕様は以下のみで、非常にシンプルです。

- childrenをラップして装飾する。

このようなシンプルなものであっても**コンポーネントの仕様を言語化することがStory作成において重要な前準備**となります。
 仕様からStorybookで確認できるようにしたいことは以下のようになると思います。

A. コンポーネントのデザイン
 B. 特定のコンポーネントではなく、任意のコンポーネントをラップできること

### Storyを作成する

これを踏まえるとStoryのコードは以下のようになります。

```plain text
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "./";

export default {
  title: "Container",
  component: Container,
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	children: <h2>Children</h2>
};

```

上で挙げたA,Bが確認できるかどうか見てみましょう。

A. Storybook上の表示でデザインが確認できる
 B. TodoList以外のコンポーネントがラップされた状態で表示されるので、任意のコンポーネントをラップできるとわかる

**このStoryで大切なのはBを確認できるように作成することです。****以下のようなStoryを作ってしまうと確認できることが少なくなるので、あまり推奨できません。**

- childrenを実際のアプリ上の利用ケースと同じTodoListにしてしまい、Bの確認ができない
- childrenを渡すのを忘れてしまい、何も表示されないStoryになってA,Bの確認が両方できない

先に述べたStorybookは腐ってしまうプロジェクトではこのようなStoryが多く作られていた印象があります。

## TodoList

次は一番メインのように見えるTodoListコンポーネントです。

```plain text
import { useState } from "react";
import { TODO } from "../../types";
import TodoItem from "../TodoItem";
import styles from "./TodoList.module.css";

type Props = {
  todos: TODO[];
};

export const TodoList: React.FC<Props> = (props: Props) => {
  const [todos, setTodos] = useState<TODO[]>(props.todos);

  // TODOに完了チェックを入れる
  const handleChange = (id: string) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, done: !todo.done };
      return todo;
    });
    setTodos(nextTodos);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>TodoList</h2>
      <ul>
        {todos.map((item) => (
          <li key={item.id} className={styles.item}>
            <TodoItem todo={item} handleChange={handleChange} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;


```

### コンポーネントの仕様を言語化する

TodoListコンポーネントの仕様をソースコードから読み解くと下記のようになります。

- TODOオブジェクトの配列をpropsとして受け取り、TODOリストの初期値として扱う
- TODOの数だけTodoItemコンポーネントをリスト表示する
- TodoItemがクリックされた時、TODOオブジェクトの完了フラグ（done)を反転させる

### Storyを作成する

コンポーネントの仕様を踏まえてStoryで何を確かめたいのかを考えます。
 私が思いつくのは以下のあたりです。

A. TODO配列のStateを管理しているのはこのコンポーネントか、親のコンポーネントか
 B. TODOが存在する時、0件の時**それぞれ**どのような表示になるか
 C. リストのアイテムは任意のコンポーネントを差し込めるのか
 D. 完了フラグを立てる動作はList側の仕様かItem側の仕様か

これらを確認できるStoryを作成すると以下のようなコードになると思います。

```plain text
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TodoList } from "./";

export default {
  title: "TodoList",
  component: TodoList,
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => (
  <TodoList {...args} />
);

// TODOが存在する時の表示確認
export const Primary = Template.bind({});
Primary.args = {
  todos: [
    {
      id: "1",
      name: "name1",
      done: false,
    },
    {
      id: "2",
      name: "name2",
      done: false,
    },
  ],
};

// TODOが0件の時の表示確認
export const Empty = Template.bind({});
Empty.args = {
  todos: [],
};

```

このStoryで先ほどあげたA,B,Cの確認が可能かを考えてみましょう

A. Storybook上でチェックボックスの付け外しを操作できるため、Stateは親ではなく自身で持っていることがわかる。
 B. TODO2件、0件の2種類のStoryがあるので両方デザイン確認できる。
 C. 実アプリケーション上と同様にリストアイテムはTodoItemが表示されているので、任意のコンポーネントは差し込めないだろうと推測できる。
 D. 完了フラグをList、Itemどちらが立てているかは**このStoryだけでは確認できない**

Cはあくまで推測できるだけですが、**この推測を可能にしているのは前述のContainerコンポーネントのStorybookが任意のchildrenを受け取れる確認ができるように作られているからです。**
 任意のコンポーネントを差し込めるコンポーネントはその仕様を正しくStorybook上で確認できるように作ることで、そうではないコンポーネントと見分けがつくようになります。

**また、DをこのStoryで確認することができないことがTodoItemのStoryを作るモチベーションになります。**
 TodoItemのデザインはこのStory上でも確認できる上、非常にシンプルなので工数節約のために作らない選択肢もあるでしょう。
 それでも作るメリットは十分にあることをTodoItemのStoryを見ながら確認していきます。

## TodoItem

```plain text
import { TODO } from "../../types";
import styles from "./TodoItem.module.css";

type Props = {
  todo: TODO;
  handleChange: (id: string) => void;
};

export const TodoItem: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <label>
        <input
          type="checkbox"
          checked={props.todo.done}
          onChange={() => props.handleChange(props.todo.id)}
        />
        {props.todo.name}
      </label>
    </div>
  );
};

export default TodoItem;


```

### コンポーネントの仕様を言語化する

TodoItemコンポーネントの仕様をソースコードから読み解くと仕様は以下だけです。

- TODOオブジェクトをpropsとして受け取り、名前と完了フラグを表示する

仕様はこれだけですが、前述のTodoListとの兼ね合いを考えるとStorybook上で確認したいことは少し増えます。

A. コンポーネントのデザイン
 B. **完了フラグを立てる動作はList側の仕様かItem側の仕様か**

### Storyを作成する

これを踏まえてStoryのコードは非常にシンプルに以下のようになります。

```plain text
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TodoItem } from './';

export default {
  title: 'TodoItem',
  component: TodoItem,
} as ComponentMeta<typeof TodoItem>;

const Template: ComponentStory<typeof TodoItem> = (args) => <TodoItem {...args} />;

export const Primary = Template.bind({});
Primary.argTypes = {
	handleChange: { action: 'handleChange'}
}
Primary.args = {
	todo: {
		id: "1",
		name: "name",
		done: false,
	},
};


```

Storybookで検証すべきことが全て満たされるかを確認します。

A. コンポーネントのデザインは表示されるため確認できる。（チェック有無はControlsでdoneを変更して確認できる）
 B. **クリックしても変化しないこと**でこのコンポーネントでは完了フラグを操作していないことが確認できる

TodoItemは非常にシンプルなコンポーネントな上、TodoListに内包されているためStoryの存在意義に疑問を感じるかもしれません。
 実際には上のBのように、**このコンポーネントが動作を持たないことを確認できる**というのも重要になることがあります。

不具合調査の際には、どの層がどんな責務を持っているかを把握して切り分けながら調査していくことが大切になります。
 TodoListとTodoItem両方のStoryがあることで、責務の分担がソースコードを読まずとも明確になるので調査速度に大きく向上するでしょう。

# 網羅率（カバレッジ）の話

Storyの実例紹介はここまでです。結局のところ全てのコンポーネントにおいて、Storyを作成する価値があることがわかると思います。
 では取捨選択も何もなしに、全てのStoryを作成することが正義なのでしょうか？
 これについて正解は無いと思っていますが、考えを述べさせていただきます。

## 網羅率は重要であるか

テストの話題でもよく語られるのが網羅率です。カバレッジとも言われます。
 結論、網羅率は大切です。理由は下記です。

- 「既存コンポーネントのStoryは恐らくあるからStorybookを見てみよう」という意識が芽生える
- 新しいコンポーネントを作成したときに、Storyも一緒に用意する文化になる

つまり、**Storybookの存在感をプロジェクトメンバー、特に経験の浅いメンバーに示す**ために有効になってきます。
 複雑なコンポーネントのみStoryを用意するだけでは網羅率が下がり、存在感が消え、特定の人のみが参照するようになりやがて腐っていく可能性が高いです。
 仕様が少ないコンポーネントに対してStoryを用意することも時には重要であるし、余裕があるのなら作成しておくと良いものです。

私は最近で3つのフロントエンド開発プロジェクトに携わりましたが、いずれのプロジェクトも網羅率は100％でした。

### どうやってStoryを効率良く作っていくのか

コードジェネレーターを活用するのがおすすめです。
 私は[hygen](https://www.hygen.io/)を使ってコンポーネントファイルを作成する時にセットでStoryファイルも生成されるような仕組みを作るようにしています。
 もちろんそれだけでは前述のような「仕様を考慮したStory」にはなりませんが、雛形が自動生成されるだけでハードルは格段に下がります。

具体的な実装はtakepepeさんのこちらの記事が参考になります。
 私も開発環境を整える際は、この方法を真似したジェネレーターを活用しています。[hygen で生成 - 対話形式の Component 雛形 -](https://zenn.dev/takepepe/articles/hygen-template-generator)

### 全てのコンポーネントにStoryを用意しなければいけないのか？

あればあるほど良いと思っていますが、大きな犠牲を払ってまで網羅率を100%にすることは重要ではありません。

Storybookを腐らせてしまうプロジェクトは立ち上げ当初、網羅率に対して強い意識を持っている傾向があるなと感じます。
 良くあることとして、開発を続けていくうちに新規メンバーがStorybookの存在を知らずにコンポーネントファイルのみを作ってしまったり、あるいは単純に作り忘れたりすることで徐々に網羅率が下がっていきます。
 そして、「もうあまり網羅できてないから捨ててしまおう」という結論になりがちです。

網羅率が高くなくても、メンバー1人1人がこの記事で書いたような「Storybookでどんな確認ができたら便利なのか」ということを考えることができていれば、作成するStoryの数を絞ってもStorybookの価値は十分に出てくると思います。
 上で書いた例で言えば、Containerのような振る舞いを持たないコンポーネントでは作成しない等の**意味のある取捨選択**ができていればとても良いです。

# まとめ

Storyは盲目的に作成せず、コンポーネントの仕様を考慮してどんな確認をStorybook上で行いたいかを考えることが大切です。

Storyの内容、網羅率の両方を理想的な形で保ち続けるのはチーム開発では難しいので、以下のどちらかの方針でStorybook運用をしていくのが良いのでは無いかと私は考えます。

- コードジェネレーターのような仕組みを整え、理想的な内容でなくてもとりあえず100％に近い網羅率を確保できるようにする。
- 高い網羅率は目標とせず、メンバー1人1人と「どのようにStorybookを活用するか」の認識を合わせてあるべきStoryのみを作成していく。

Register as a new user and use Qiita more conveniently

1. You get articles that match your needs
2. You can efficiently read back useful information

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)

Comments