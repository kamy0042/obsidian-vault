---
タグ: []
作成日時: 2022-12-23T22:21:00
URL: https://zenn.dev/moneyforward/articles/2d7f3ece1a1b93
Tags: [topic/ツール/Storybook]
---
この記事は、[Money Forward Engineering 2 Advent Calendar 2022](https://qiita.com/advent-calendar/2022/moneyforward)の21日目の投稿です。

21日目の記事は、[Taiga KIYOKAWA](https://zenn.dev/taigakiyokawa)さんによる『[react-i18next で日本語の改行箇所を制御したい時は、設定で wbr タグを使えるようにしよう](https://zenn.dev/moneyforward/articles/20221220-react-i18next-wbr)』でした。

本日は、マネーフォワードに入社して3ヶ月目の私が、「コンポーネントを高品質に保つためのStorybook運用」というテーマで、記事を書いていきます👊

## 背景

私が開発に携わっているプロジェクトでは、[マネーフォワードクラウド](https://biz.moneyforward.com/)にある複数のプロダクトを横断して利用される機能を開発しており、その機能を**マイクロフロントエンド**としてプロダクト側に提供しています。

より詳しく知りたい方は、[Money Forward Engineering 1 Advent Calendar 2022](https://adventar.org/calendars/7397)の14日目に投稿された、こちらの記事をご覧ください。

マイクロフロントエンドでプロダクトに提供するということは、機能だけでなく**提供するUIの品質まで担保する責任があります。**
 その責任を担っているのが、**Storybook**です。

## Storybookをどのように使うか

Storybookとは、ものすごく簡単に表現すると、コンポーネントのカタログを生成することができるツールです。
 プロダクトに組み込まなくとも、独立した開発環境でコンポーネントの開発ができます。

私たちは、自チームが開発するマイクロフロントエンドコンポーネントをプロダクト側が信頼して使えるように、高品質なコンポーネントであることを保証する責任があります。

そのために、下記3点の観点でStorybookを活用しております。

- 開発環境としてのStorybook
- 品質検査としてのStorybook
- コミュニケーションツールとしてのStorybook

! 高品質なコンポーネントの定義  
• UI(見た目と動き)が仕様通りであり、ユーザーも開発者も使いやすい状態であること 
• コードの変更によって影響されづらい、または影響に気づける状態であること 

## 開発環境としてのStorybook

UI開発をする際に、基本的にはページ上にコンポーネントを配置して開発することが多いと思います。
 しかし、私達はマイクロフロントエンドの開発をしているため、将来的には様々なプロダクトを横断して組み込まれます。

そのため、特定のプロダクトの開発環境上ではなく、Storybook上で開発することが多いです。
 さらに、バックエンドとのAPI通信をモッキングすることで、スタンドアローンで開発することも可能です。

### コンポーネントのパターンを網羅するようStoryを作成する

直接プロダクトにコンポーネントを組み込んだ場合、プロダクトを操作しないとコンポーネントの状態の変化を確認することができません。
 また、エラーやローディングなどプロダクトの操作では発生させることが困難な状態がある場合、網羅的に確認することが難しいかもしれません。

Storybookでは、同じComponentでもあらゆる状態ごとにStoryを作成することができるため、網羅的に確認することが可能です。

![[a0a96b98378f-20221220.png]]

## 品質を検査するためのStorybook

Storybook上では、追加したStoryに対して様々なテストを実行することが可能です。
 私が携わっているプロジェクトでは、コンポーネントの品質を守るために必要なテストを積極的に導入しております。

### コンポーネントテスト

コンポーネントテストとは、コンポーネントが想定通りに機能しているかを検証するテストを指します。(単体テストをコンポーネントに対して書いているイメージです。)

`@storybook/testing-react`が提供する`composeStories`関数を用いることで、Storyで定義したコンポーネントをそのままjestで使うことができます。

```plain text
import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';
import * as stories from './MultipleSelect.stories';

const { Loading } = composeStories(stories);

describe('when loading', () => {
  it('renders progress icon', async () => {
    const { queryByRole } = render(<Loading />);

    expect(queryByRole('progressbar')).toBeInTheDocument();
  });
});

```

### ビジュアルリグレッションテスト

ビジュアルリグレッションテスト(VRT)とは、名前の通り、ビジュアル(見た目)の回帰(リグレッション)のテストです。
 修正前後のスクリーンショットを撮影用いて差分を検知することで、想定していないUIの変更に気づくことができます。

私たちは`Chromatic`を使っており、コミット毎にStorybookをデプロイし、同時にStoryのスクリーンショットを撮影して差分検知をしております。

! Storyのビジュアルリグレッションテストのみ行うのであれば、[storycap](https://www.npmjs.com/package/storycap)を使う方法もあります。 
機能はChromaticの方が充実していますが、コスパでいうとstorycapの方が良いため、 お財布と相談して使うツールを選ぶと良いと思います。

### インタラクションテスト

インタラクションテストとは、要素のクリックやフォームへの入力などの操作が正しくできているかをテストすることです。[CSF 3.0](https://storybook.js.org/blog/component-story-format-3-0/)で追加された`play()`を使うことで、Storybook上でインタラクションを表現できます。

```plain text
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { CommentTextarea } from './CommentTextarea';

type Component = typeof CommentTextarea;
type Meta = ComponentMeta<Component>;
type Story = ComponentStoryObj<Component>;

const meta: Meta = {
  component: CommentTextarea,
  args: {
    required: true,
  },
};

export default meta;

export const CharactersCountExceedScenario: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = canvas.getByRole('textbox');
    await userEvent.paste(textbox, '文字数over' + 'r'.repeat(251));
  },
};

```

```plain text
import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import * as stories from './CommentTextarea.stories';

const { CharactersCountExceedScenario } =
  composeStories(stories);

describe('play CharactersCountExceedScenario', () => {
  it('renders error message', async () => {
    const { container, getByText } = render(<CharactersCountExceedScenario />);

    await CharactersCountExceedScenario.play({ canvasElement: container });

    waitFor(() => {
      expect(getByText('255文字以下で入力してください。')).toBeInTheDocument();
    });
  });
});

```

### アクセシビリティテスト

今はまだ本格的にはできていませんが、今後はアクセシビリティテストも実施していきたいと思います。
 アクセシビリティテストとは、すべての人が利用できるコンポーネントかを判定するテストであり、`@storybook/addon-a11y`を導入することでStorybook上でテストを実施することができます。

## コミュニケーションツールとしてStorybook

高品質なコンポーネントであるためには、エンジニアだけではなくデザイナーやPdMなどプロダクトに携わっているすべての人が確認できる、理解できることが大事であると考えております。

ここでは、私たちがStorybookを通じてどのようにコミュニケーションをとっているかを紹介いたします。

### Chromaticにコミット毎にStorybookをデプロイ

コミット毎にStorybookをデプロイすることで、実装中のコンポーネントもStorybookで確認できるようになります。
 そのため、Storybookを見ながら開発途中の仕様確認や議論をすることができます。

### Chromaticでデザイナーがレビューできる仕組みの導入

先ほどお話したビジュアルリグレッションテストの結果では、コメントを残すことができます。
 この機能を活用し、新規コンポーネントが追加された時にはデザイナーに見てもらい、レビューをいただいております。

### コンポーネントごとにDocsを残す

Storybookには、Storyに対してドキュメントを残すことができる機能があります。

`addon-docs`というアドオンを追加することで、storybook用に拡張されたmarkdown(MDX)記法で書くことができます。

この取り組みはまだできていませんが、今後、運用方法や何かしらの制約などコンポーネントに対して決まりごとがあった時に、ドキュメントもStorybookに集約していければ良いなと思っています。

## 最後に

あまり使い慣れていない人からすると、Storybookを導入することで普段の開発にプラスアルファーの工数がかかると感じる人もいるかもしれません。
 しかしながら、Storybookは簡単な記述を書くだけでより高品質なコンポーネント管理をすることができますので、ぜひご活用ください。

また、このようなStorybook運用ができる基盤を整えてくださった[@sainu](https://zenn.dev/sainu)さん、[@silverbirder](https://zenn.dev/silverbirder)さんに感謝を述べたいと思います。

### 求人

マネーフォワードの名古屋拠点ではエンジニアを募集してます！
 主に新規プロダクト開発を行っており、非常にモダンな技術を用いた開発に挑戦できます。
 まずは気軽にカジュアル面談からでも歓迎ですのでご応募お待ちしてます。

👉 [求人ページはこちら](https://hrmos.co/pages/moneyforward/jobs/1705418982829588494)

### Discussion