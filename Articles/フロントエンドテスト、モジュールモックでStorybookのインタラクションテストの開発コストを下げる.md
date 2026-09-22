---
タグ: []
作成日時: 2023-03-21T01:30:00
URL: https://zenn.dev/sora_kumo/articles/43f399cc73c0f3
Tags: [topic/ツール/Storybook]
---
# Storybook のインタラクションテストのコストを下げる

Storybook を使用すると、ブラウザ上で動作を確認しながらテストコードを記述できるため、生の Jest よりも開発が容易になります。ただし、Storybook には Jest にある重要な機能である jest.mock がないという欠点があります。jest.mock は、テスト対象のコンポーネントがインポートしているモジュールをフックして、簡単にモックを作成することができますが、Storybook ではこの機能は使用できません。ビルド時に他のファイルへの干渉が防止されてしまいます。

この問題を解決するために、以下の Addon を使用することで、jest.mock と同じような機能を Storybook 上で利用することができます。

![[8312e0b023ee9c421296f4f5.gif]]

## npm

# [storybook-addon-module-mock](https://www.npmjs.com/package/storybook-addon-module-mock)

[Provides module mocking functionality like `jest.mock` on Storybook.. Latest version: 1.0.7, last puwww.npmjs.com](https://www.npmjs.com/package/storybook-addon-module-mock)

## サンプルプログラム

# [SoraKumo001/storybook-module-mock](https://github.com/SoraKumo001/storybook-module-mock)

[sample of storybook-addon-module-mock1TypeScript](https://github.com/SoraKumo001/storybook-module-mock)

## 動作内容

# [Webpack App](https://sorakumo001.github.io/storybook-module-mock/?path=%2Fstory%2Fcomponents-formmock--primary)

[sorakumo001.github.io](https://sorakumo001.github.io/storybook-module-mock/?path=%2Fstory%2Fcomponents-formmock--primary)

# ログイン用フォームの動作チェック

## FormMock.tsx

フォームにユーザー名とパスワードを入力し、ボタンのクリックイベントで login を呼び出しています。

```plain text
import React, { FC } from "react";
import login from "./login";

interface Props {}

/**
 * FormMock
 *
 * @param {Props} { }
 */
export const FormMock: FC<Props> = ({}) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(e.currentTarget["user"].value, e.currentTarget["password"].value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          User:
          <input type="text" name="user" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

```

## FormMock.stories.tsx

Submit を使用してフォームのインタラクションテストを実行しています。具体的には、ユーザー名とパスワードを入力してボタンをクリックし、login 関数のモック化された引数が正常にユーザー名とパスワードを渡すかどうかを確認しています。この機能をモック化できない場合、テストを作成することは非常に困難になります。

```plain text
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { createMock, getMock } from "storybook-addon-module-mock";
import { FormMock } from "./FormMock";
import * as login from "./login";

const meta: ComponentMeta<typeof FormMock> = {
  title: "Components/FormMock",
  component: FormMock,
};
export default meta;

export const Primary: ComponentStoryObj<typeof FormMock> = {};

export const Submit: ComponentStoryObj<typeof FormMock> = {
  args: {},
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(login);
        return mock;
      },
    },
  },
  play: async ({ canvasElement, parameters }) => {
    const mock = getMock(parameters, login);

    const canvas = within(canvasElement);
    const userInput = await canvas.findByLabelText("User:");
    const passwordInput = await canvas.findByLabelText("Password:");
    userEvent.type(userInput, "User");
    userEvent.type(passwordInput, "Password");
    userEvent.click(await canvas.findByText("Submit"));
    expect(mock.mock.lastCall).toStrictEqual(["User", "Password"]);
  },
};

```

# 再レンダリングのサポート

## FormMock.tsx

getMessage 関数からテキストを取得し、それを表示するだけのコンポーネントです。

```plain text
import React, { FC } from "react";
import { getMessage } from "./message";

interface Props {}

/**
 * ReRender
 *
 * @param {Props} { }
 */
export const ReRender: FC<Props> = ({}) => {
  const value = getMessage();
  return <div>{value}</div>;
};

```

## FormMock.stories.tsx

今回、DOM からのイベントは発生していません。代わりに、getMessage 関数の戻り値を置き換え、強制的に再レンダリングを行っています。これにより、表示内容が Test1/Test2 に切り替わります。この機能は、Storybook の標準機能には含まれていませんが、実際には非常に重要です。

```plain text
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { waitFor, within } from "@storybook/testing-library";
import { createMock, getMock, render } from "storybook-addon-module-mock";
import * as message from "./message";
import { ReRender } from "./ReRender";

const meta: ComponentMeta<typeof ReRender> = {
  title: "Components/ReRender",
  component: ReRender,
};
export default meta;

export const Primary: ComponentStoryObj<typeof ReRender> = {};

export const ReRenderTest: ComponentStoryObj<typeof ReRender> = {
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(message, "getMessage");
        return [mock];
      },
    },
  },
  play: async ({ canvasElement, parameters }) => {
    const canvas = within(canvasElement);
    const mock = getMock(parameters, message, "getMessage");
    mock.mockReturnValue("Test1");
    render(parameters);
    await waitFor(() => {
      expect(canvas.getByText("Test1")).toBeInTheDocument();
    });
    mock.mockReturnValue("Test2");
    render(parameters);
    await waitFor(() => {
      expect(canvas.getByText("Test2")).toBeInTheDocument();
    });
  },
};

```

# まとめ

今回、必要な機能を Addon で実装して Storybook でテストを行いました。今後も何か必要な機能が思いついた場合は、Addon に機能を追加し、より便利で効率的なテストを実行できるようにしていきたいと考えています。

[GitHubで編集を提案](https://github.com/SoraKumo001/zenn/blob/master/articles/43f399cc73c0f3.md)

[ツイート](https://twitter.com/intent/tweet?url=https%3A%2F%2Fzenn.dev%2Fsora_kumo%2Farticles%2F43f399cc73c0f3&text=%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%83%86%E3%82%B9%E3%83%88%E3%80%81%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%83%A2%E3%83%83%E3%82%AF%E3%81%A7Storybook%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%A9%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%86%E3%82%B9%E3%83%88%E3%81%AE%E9%96%8B%E7%99%BA%E3%82%B3%E3%82%B9%E3%83%88%E3%82%92%E4%B8%8B%E3%81%92%E3%82%8B%EF%BD%9C%E7%A9%BA%E9%9B%B2&hashtags=zenn)

車輪の再発明が生業

バッジを贈って著者を応援しようバッジを受け取った著者にはZennから現金やAmazonギフト券が還元されます。

### Discussion