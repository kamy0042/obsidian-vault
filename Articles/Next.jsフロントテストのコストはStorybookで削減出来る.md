---
タグ: []
作成日時: 2023-02-15T10:51:00
URL: https://zenn.dev/sora_kumo/articles/8a79531e726b29#%E3%83%9C%E3%82%BF%E3%83%B3%E3%81%A7%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%82%92%E3%83%A2%E3%83%83%E3%82%AF%E3%81%99%E3%82%8B
Tags: [topic/ツール/Storybook]
---
# １．フロントテストと Storybook の活用

# ２．Storybook によるテスト環境の構築(Next.js 用)

### 表示内容

Storybook 上では次のように表示され、テスト結果が出力されます。

![[1fc8d0b212252afa65e3ca27.png3fsha3d43d771bb732a8745e561b379e54d46e6eb0d5330]]

## ボタンでクリックイベントをモックする

ボタンコンポーネントを作ります。

```plain text
yarn scaffold create -t https://github.com/node-libraries/scaffold/tree/master/templates/storybook6 Samples/Button

```

### src/components/Samples/Button/Button.tsx

ボタンの引数で okClick を受け取るようにします。

```plain text
import React, { FC } from "react";
import styled from "./Button.module.scss";

interface Props {
  onClick: () => void;
}

/**
 * Button
 *
 * @param {Props} { }
 */
export const Button: FC<Props> = ({ onClick }) => {
  return (
    <button className={styled.root} onClick={onClick}>
      Button
    </button>
  );
};

```

### src/components/Samples/Button/Button.stories.tsx

`args` に `onClick: jest.fn()` を設定することで、モック関数として扱われる `onClick` を受け取ることができます。これにより、コンポーネントのクリックイベントが実行された際に、`onClick` が呼び出されたことを確認するテストが作成できます。

```plain text
import { expect, jest } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: ComponentMeta<typeof Button> = {
  title: "Components/Samples/Button",
  component: Button,
  parameters: {
    //  nextRouter: { asPath: '/' },
  },
  args: {},
};
export default meta;

export const Primary: ComponentStoryObj<typeof Button> = {
  args: { onClick: jest.fn() },
  play: async ({ canvasElement, args: { onClick } }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByRole("button", { name: "Button" }));
    expect(onClick).toBeCalled();
  },
};

```

## ログインフォームのテストを行う

### src/components/Samples/Login/Login.module.scss

```plain text
.root {
  .form {
    width: 300px;
    display: grid;
    gap: 8px;
  }
  .input {
    display: flex;
    :first-child {
      width: 120px;
    }
  }
  .error {
    color: red;
    font-size: 0.5em;
  }
}

```

### src/components/Samples/Login/Login.tsx

ログイン用フォームにて、入力値のバリデーションが行われ、認証が成功した場合は、`/main` へのルーティングが行われます。

```plain text
import React, { DOMAttributes, FC, useState } from "react";
import styled from "./Login.module.scss";
import { useRouter } from "next/router";

interface Props {}

/**
 * Login
 *
 * @param {Props} { }
 */
export const Login: FC<Props> = ({}) => {
  const router = useRouter();
  const [userError, setUserError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [loginError, setLoginError] = useState<string>();
  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = (e) => {
    const user = e.currentTarget.user.value;
    const password = e.currentTarget.password.value;
    if ([user, password].includes("")) {
      user === "" && setUserError("ユーザ名を入力してください");
      password === "" && setPasswordError("パスワードを入力してください");
    } else {
      if (user === "user" && password === "password") {
        router.push("/main");
      } else {
        setLoginError("認証に失敗しました");
      }
    }
    e.preventDefault();
  };
  return (
    <div className={styled.root}>
      <form onSubmit={handleSubmit} className={styled.form}>
        <div className={styled.input}>
          <label htmlFor="user" placeholder="ユーザ名">
            ユーザ名
          </label>
          <input type="text" id="user" />
        </div>
        {userError && (
          <div className={styled.error} role="alert">
            {userError}
          </div>
        )}
        <div className={styled.input}>
          <label htmlFor="password" placeholder="パスワード">
            パスワード
          </label>
          <input id="password" type="password" />
        </div>
        {passwordError && (
          <div className={styled.error} role="alert">
            {passwordError}
          </div>
        )}
        <button type="submit">ログイン</button>
        {loginError && (
          <div className={styled.error} role="alert">
            {loginError}
          </div>
        )}
      </form>
    </div>
  );
};

```

### src/components/Samples/Login/Login.stories.tsx

`Primary`は素の表示状態、`Error`は入力のバリデーションチェックに引っかかった場合、`Fail`は認証失敗、`Pass`は認証成功のテストを行っています。認証成功時の判定は`nextRouter`の`push`をモック化して行っています。

`Primary`は元の状態を表示します。`Error`は入力値のバリデーションチェックで失敗した場合、`Fail`は認証に失敗した場合、`Pass`は認証に成功した場合のテストを行います。認証に成功した場合の判定は、`nextRouter`の`push`メソッドをモック化して行います。

```plain text
import { expect, jest } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Login } from "./Login";
import { waitFor } from "@testing-library/dom";

const meta: ComponentMeta<typeof Login> = {
  title: "Components/Samples/Login",
  component: Login,
  parameters: {
    //  nextRouter: { asPath: '/' },
  },
  args: {},
};
export default meta;

export const Primary: ComponentStoryObj<typeof Login> = {};

export const Error: ComponentStoryObj<typeof Login> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
    });
    await waitFor(() => {
      expect(
        canvas.getByText("ユーザ名を入力してください")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        canvas.getByText("パスワードを入力してください")
      ).toBeInTheDocument();
    });
  },
};
export const Fail: ComponentStoryObj<typeof Login> = {
  parameters: {
    nextRouter: {
      push: jest.fn(),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await userEvent.type(canvas.getByLabelText("ユーザ名"), "fail", {
        delay: 10,
      });
    });
    await waitFor(async () => {
      await userEvent.type(canvas.getByLabelText("パスワード"), "password", {
        delay: 10,
      });
    });
    await waitFor(() => {
      userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
    });
    await waitFor(() => {
      expect(canvas.getByText("認証に失敗しました")).toBeInTheDocument();
    });
  },
};
export const Pass: ComponentStoryObj<typeof Login> = {
  parameters: {
    nextRouter: {
      push: jest.fn(),
    },
  },
  play: async ({
    canvasElement,
    parameters: {
      nextRouter: { push },
    },
  }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await userEvent.type(canvas.getByLabelText("ユーザ名"), "user", {
        delay: 10,
      });
    });
    await waitFor(async () => {
      await userEvent.type(canvas.getByLabelText("パスワード"), "password", {
        delay: 10,
      });
    });
    await waitFor(() => {
      userEvent.click(canvas.getByRole("button", { name: "ログイン" }));
    });
    await waitFor(() => {
      expect(push).lastCalledWith("/main");
    });
  },
};

```

### 表示内容

## Coverage の確認

テストを実行します。

実行結果として、以下のような出力が得られます。これを CI/CD に組み込めば、PR でテストが網羅的に行われているか確認することができます。

# ３．まとめ

Storybook では、表示状態の確認とテストの実行を同時に行うことで、テストの作成コストを大幅に削減することができます。一方、Jest の場合、テスト作成時に表示状態を目視することができませんが、Storybook では動作状態を視覚的に確認しながらテストを作成することが可能です。これは大きなメリットとなります。また、Storybook のテスト実行環境はブラウザに近いものとなっており、jsdom などを使って環境をエミュレートする場合よりも、実際の環境に近いテストが実施できます。フロントエンドテストの負担に困っているプロジェクトでは、Storybook へのテストの移行を検討することをお勧めします。

- 今回作ったサンプルソース

[GitHubで編集を提案](https://github.com/SoraKumo001/zenn/blob/master/articles/8a79531e726b29.md)

### Discussion

1. [１．フロントテストと Storybook の活用](https://zenn.dev/sora_kumo/articles/8a79531e726b29#%EF%BC%91%EF%BC%8E%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%83%86%E3%82%B9%E3%83%88%E3%81%A8-storybook-%E3%81%AE%E6%B4%BB%E7%94%A8)
2. [２．Storybook によるテスト環境の構築(Next.js 用)](https://zenn.dev/sora_kumo/articles/8a79531e726b29#%EF%BC%92%EF%BC%8Estorybook-%E3%81%AB%E3%82%88%E3%82%8B%E3%83%86%E3%82%B9%E3%83%88%E7%92%B0%E5%A2%83%E3%81%AE%E6%A7%8B%E7%AF%89(next.js-%E7%94%A8))