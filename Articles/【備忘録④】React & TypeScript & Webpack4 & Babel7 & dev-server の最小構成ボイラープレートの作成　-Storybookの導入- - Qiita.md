---
URL: https://qiita.com/Kento75/items/53e70aefb3fedc96f19e
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
## モジュール追加

`# Storybookをインストール
$ npm install -D @storybook/cli

# プロジェクトへ移動
$ cd <プロジェクトパス>

# Storybookの設定ファイル等の雛形を作成
$ npx -p @storybook/cli sb init`

「.storybook」ディレクトリに設定ファイルが作成される。

「stories」ディレクトリにストーリーのサンプルが作成される。

`.storybook
├── config.js
└── webpack.config.js

stories
└── index.stories.js`

package.jsonにStorybook起動、ビルド用コマンドが自動で追加される。

`"storybook": "start-storybook -p 6006",
"build-storybook": "build-storybook"`

また、基本となるアドオンとプロジェクトに使用しているフレームワーク（ここではReact）用のもジュルも自動で追加される。

`"@storybook/addon-actions": "^5.1.9",
"@storybook/addon-links": "^5.1.9",
"@storybook/addons": "^5.1.9",
"@storybook/react": "^5.1.9",`

## 起動確認

`$ npm run storybook`

「localhost:6006」にアクセス。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F180939%2F9926a8f1-4f82-2329-0afe-95175e4c702c.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=338fc48135bc1cb0bbf62ee7bb69a76c)

## アドオンの追加

便利なアドオンを追加する。

モジュール名
バージョン
詳細




@storybook/addon-knobs
5.1.9
プロパティを変更できる画面を追加


@storybook/addon-viewport
5.1.9
ビューポートを切り替えるボタンを追加


react-docgen-typescript-loader
3.1.0
ストーリーの例とか説明を追加


@storybook/addon-info
5.1.9
TypeScriptの型からコンポーネントのプロパティ説明を追加


@storybook/addon-console
1.2.1
Actionsタブにコンソールログを表示する


react-docgen-typescript-webpack-plugin
1.1.0
react-docgen-typescript-loader用の追加モジュール

モジュールをインストールする。

`$ npm install -D @storybook/addon-knobs @storybook/addon-viewport react-docgen-typescript-loader @storybook/addon-info @storybook/addon-console react-docgen-typescript-webpack-plugin`

TypeScriptで使用するので型定義も追加する。

`$ npm install -D @types/storybook__react @types/storybook__addon-info @types/storybook__addon-actions @types/storybook__addon-knobs @types/storybook__addon-links`

## アドオン追加・設定

ここら辺が参考になる

`https://storybook.js.org/docs/addons/using-addons/`

「.storybook」ディレクトリの下に`addons.js`ファイルを作成する。

storybook/addons.js

`# .storybook/addons.js

import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-viewport/register';
import '@storybook/addon-console';`

### 設定ファイルを修正

storybook/config.js

`# .storybook/config.js

import { configure, addDecorator } from '@storybook/react';
import { setConsoleOptions } from '@storybook/addon-console';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

setConsoleOptions({
  panelExclude: [],
});

const req = require.context('../src', true, /.stories.(tsx|js)$/);

function loadStories() {
  addDecorator(withInfo);
  addDecorator(withKnobs);

  req.keys().forEach(req);
}

configure(loadStories, module);`

storybook/webpack.config.js

`# .storybook/webpack.config.js

const path = require("path");
const SRC_PATH = path.join(__dirname, '../src');

module.exports = ({
  config
}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH],
    use: [{
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            ['react-app', {
              flow: false,
              typescript: true
            }]
          ],
        }
      },
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};`

## 確認用コンポーネントの作成

ボタンクリック時の動作、テキストの変更、表示切り替えが設定できる簡単なコンポーネントを用意する。

src/component/Button/index.tsx

`# src/component/Button/index.tsx

import React from 'react';

export interface IButtonProps {
  text: string;
  flag?: boolean;
  action(): void;
}

const Button = (props: IButtonProps) => {
  const { text, flag, action } = props;
  return (
    <React.Fragment>
      { flag && <p>{text}</p> }
      <button onClick={ action }>Button</button>
    </React.Fragment>
  );
};

export default Button;`

Storybookでの動作確認用コンポーネントを作成する。

src/component/Button/index.stories.tsx

`# src/component/Button/index.stories.tsx

import React from 'react';

import {storiesOf} from '@storybook/react';
import {text, boolean} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';

import Button from '../Button';

const components = storiesOf('Components', module);
components.add('Button', () => (
  <Button
    text={text('テキスト', 'ボタンですよ')}
    flag={boolean('テキスト表示', true)}
    action={action('ボタンを押した!')}
  />
));`

### 起動確認

`$ npm run storybook`

「localhost:6006」にアクセス。

ボタンクリック時の動作、テキストの変更、表示切り替えができることを確認。

![](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/180939/dfbf5b7f-d10c-fea9-6f66-fae7fded5c28.gif)

以上で確認完了。

作成したボイラープレートは [こちら](https://github.com/Kento75/ts-react-sass-simple-boiler-v3)