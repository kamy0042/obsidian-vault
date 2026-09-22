---
タグ: []
作成日時: 2023-03-17T19:07:00
URL: https://kiyobl.com/basic-a11y-test/
Tags: [topic/アクセシビリティ, topic/技術/テスト]
---
![[cropped-download20220900154731.png]]

## A11y とは

アクセシビリティの略です. Accessibility の A と y の間に 11文字あります.

アクセシビリティとは、障害のある人たちにも使いやすいコンテンツにすることを指します

以下は、アクセシビリティを向上させる例です.

- コントラストをはっきりさせる
- 画像の説明を入れて、スクリーンリーダーを使っている人にも届くようにする
- キーボード操作をできるようにする

**Q:**では、今回実施する Storybook のアクセシビリティテストは、何を基準にその扱いやすさを決めるのでしょう？

**A:**[WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)(Web Contents Accessibility Guidelines) というガイドラインに沿って、テストが実行されるみたいです.

すべてのガイドラインに目を通すのは難しそうだったので、次の章のテストを実施して、改善できるところから理解していくのがよさそうです！

## Storybook 上で手動でテスト

必要なパッケージをインストール

```plain text
yarn add -D @storybook/addon-a11y
```

.storybook/main.js の addons に** “@storybook/addon-a11y”**を追加

↓コンポーネントを用意

```plain text
type Props = {
  label: string;
};

export const Button = ({ label }: Props) => {
  return <button>{label}</button>;
};
```

↓ストーリーファイルを用意

```plain text
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./Button";

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => {
  return <Button {...args} />;
};
```

現在の状態で、Storybook を実行すると、Accessibility タブが追加されているはずです.

2つは Pass して、1つは Violations になっています.

***Critical***: *Element does not have inner text that is visible to screen readers*

というエラーになっています.

Button の label を指定してあげると、3つとも Pass します.

## Test Runner を使ってテストを自動実行

### 準備

**1**CLI からテストを実行できるように、パッケージをインストール

```plain text
yarn add -D @storybook/test-runner
```

**2** npm script にコマンドを追加

{ “scripts”: { “test-storybook”: “test-storybook” } }

**3**アクセシビリティのテストをするためにパッケージをインストール

```plain text
yarn add -D axe-playwright
```

※ [axe-playwright](https://www.npmjs.com/package/axe-playwright) とは、accessibility engine で、chromium や Firefox などのテストを API でできる、Playwright と合わせて使うことでアプリのアクセシビリティテストを可能にしてくれるパッケージです.

**4** **test-runner.js ファイルを追加**

```plain text
const { injectAxe, checkA11y } = require("axe-playwright");

module.exports = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page) {
    await checkA11y(page, "#root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};
```

- preRender: ストーリーがレンダリングされる前に実行
    - injectAxe: axe-core runtime をページに注入する
- postRender: ストーリーがレンダリングされた後に実行
    - checkA11y: ページがレンダリングされた結果アクセシビリティに問題がないかをチェックして、レポートしてくれる

### 実行

手動でテストした時と同様、まずは Storybook を起動

```plain text
yarn storybook
```

test-runner は起動中の Storybook のページのレンダリング結果からテストを実行します.

テスト実行！

```plain text
yarn test-storybook
```

コマンドライン上で、Critical なエラーが確認できます. ストーリーが増えても、全ての結果を出してくれるので、便利ですね。

label に値を入れてあげると、pass します！
※ Storybook の Control パネルから入れた値はテスト結果に反映されないみたいです. おそらく、Storybook の build が走り直さないとテスト結果は変わらないです.

スポンサーリンク

## まとめ

最後まで読んでいただき、ありがとうございました！

今回は、アクセシビリティテストをしてみました。Web に限らず、アクセシビリティを向上させることが幅広いユーザー体験の向上につながります。

できるたけ、すべてのテストが Pass した状態で公開したいですね！

今回、参考にさせていただいた [Storybook の公式ドキュメントのページ](https://storybook.js.org/docs/react/writing-tests/accessibility-testing)です.

このブログの内容は、YouTube でも配信予定なのでお楽しみに〜

Twitter では、ブログの更新などをお知らせしたり最新技術の話題できる限り早くシェアしています。ぜひチェックしてみてください！