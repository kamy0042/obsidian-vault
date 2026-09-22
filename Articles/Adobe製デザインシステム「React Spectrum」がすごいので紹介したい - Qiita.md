---
タグ: []
作成日時: 2022-07-25T15:52:00
URL: https://qiita.com/so99ynoodles/items/bc924b7ee8c265b09723
Tags: [topic/デザインシステム/リファレンス]
---
# React Spectrum

7月15日にAdobeのデザインシステム `react-spectrum` がリリースされました。
デザイン製も優れていますが、他の部分でのクォリティーが個人的にショックだったので、紹介したいと思いました。

## どこがすごいの？

- ロジックとUIを完全に分解して、ロジックのところを **再利用可能** にしたところ
- 自分・自社のデザインシステムを作りたい場合、ロジックだけ借りて実装することができる
- ロジック部分のクォリティーが高すぎる（cross-platformやaccessibility、多言語対応を一年半以上掛けて開発・テスト）
- 普通にUIが綺麗

タイトルのは `react-spectrum` がすごいと書きましたが、実際にすごいのはこのロジックの部分です。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F375274%2F2809f871-c825-3dab-11af-5c5ee8a8c648.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=b94ae276c8f823dc0232bcedd88d50f5)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F375274%2Fb189c882-0be8-a22a-2824-8e5c695e90be.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=4bf191ccf4dfd9575b102dea31831aa4)

- `react-aria` は、カスタムHooksを利用して、プラットフォームやデバイスによって異なる動作を共通化してくれる
- 例えば、`onClick` の挙動はマウスを使わない他のデバイスでは聞かないことがあるが、そこを `onPress` というイベントで統一してくれる
- `react-stately` は、platformに依存しない複雑な `React` のコンポーネントのロジックを、UI依存なしで提供してくれる
- DatePicker, Table, Search, Navigation, Toast, Virtualizerなど
- ロジックの部分を組み合わせることで、アクセシビリティの高い好きなコンポーネントが作りやすくなる
- まだまだ開発中のコンポーネントもあるっぽいです。

## 紹介動画

↑開発に至った経緯と、何ができるかをわかりやすく説明してくれてますので、
時間がある方は**ぜひ見ることをおすすめ**します。

## ドキュメント

**React Spectrum**[https://react-spectrum.adobe.com/index.html](https://react-spectrum.adobe.com/index.html)

**Repository**[https://github.com/adobe/react-spectrum](https://github.com/adobe/react-spectrum)

## 最後に

昨日Twitterから流れてきて、凄くモチベーションが上がってしまったので、シェアさせていただきました。

> 書いてみたら、デザインシステムを作りたい人とか、コンポーネントライブラリーを探している人以外にはあまり需要がなさそう…（泣）

現在の業務でも使ってるデザインシステムがあるのですが、**多様なプラットフォームに対応したロジック部分などを作って行くのが辛く**、結構微妙な感じになっちゃってました。
そこらへんの改修にもすごく役立ちそうで楽しみです。

個人的にも自分がデザインしたコンポーネントライブラリーを作りたいという欲求があったので、色々試していきたいです。