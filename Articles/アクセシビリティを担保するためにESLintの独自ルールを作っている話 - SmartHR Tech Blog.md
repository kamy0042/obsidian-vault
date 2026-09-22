---
タグ: []
作成日時: 2024-03-20T17:27:00
URL: https://tech.smarthr.jp/entry/2024/03/19/150235
Tags: [topic/アクセシビリティ, topic/技術/テスト]
---
![[1518583134492221.bin]]

こんにちは。プロダクトエンジニアのatsushimと言います。

社内ではプロダクトを開発する傍ら、アクセシビリティを高めるための改善や仕組みづくりを進めています。

この記事ではSmartHR独自のESLintのルールを作っている話をしたいと思います。

SmartHRでは アクセシビリティ（以降a11y） を考慮したアプリの開発・改善を行っており、過去記事でその様子をご確認いただけます。

[SmartHR Tech Blog: アクセシビリティ の検索結果](https://tech.smarthr.jp/search?q=%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B7%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3)

ただ普段の開発中、a11yを意識しつつ開発を行うことは、エンジニアにかなりの負荷がかかります。

- フロントエンドの経験が少なく基本的なマークアップの知識が足りていない
- アクセシビリティを意識してね！といわれても何をすればいいのかわからない

そのため、SmartHRでは独自のESLint ルールを作成し、CIに組み込むことでa11yを担保、改善する仕組みを取り入れています。

[eslint-plugin-smarthr](https://github.com/kufu/eslint-plugin-smarthr)

**え、わざわざ作ってるの？**

[**eslint-plugin-jsx-a11y**](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)** を使えば良いのでは？**

そう思われたそこのあなた。この記事を読むとESLintの独自ルールを作りたくなるかも？

## a11yのルールをつくろう！となったきっかけ

SmartHRで独自のルールを作ろう！となった理由は主に **eslint-plugin-jsx-a11y はデフォルトでは通常のタグしかチェックできない** ことが原因です。

eslint-plugin-jsx-a11yは素晴らしいESLintプラグインであり、機械的にチェックできるa11yに関するルールは一通り揃っています。

[https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#readme](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#readme)

実装されているルールの例

- img要素にはaltを設定する 
    - [https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md)
- a要素はchildrenを持つ 
    - [https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md)

改めて **これでええやん** と思われるかと思いますが、これらのルールでは以下のコードの場合チェックでエラーにすることはできません。

```plain text
<>
  {/* 画像だがalt属性無し */}
  <SampleImage />
  {/* a要素だが内容物無し */}
  <DownloadAnchor />
</>

```

人間が見れば「`SampleImage` はimg要素なのにaltがないな？」といったことを判断できるかもしれないですが、ESLintからしてみたら `SampleImage` が画像であることや、`DownloadAnchor` がアンカーであることは判断できません。

`SampleImage` は **divでラップされたimg要素** かもしれないし、そもそも **名称にImageがついているだけで画像ですらない** かもしれない可能性だってありえます。

またSmartHRの場合、歴史的経緯から [styled-components](https://styled-components.com/) を利用しているプロダクトが多く存在します。

styled-componentsでstyleを設定された要素を作成する場合、前述の `SampleImage` のようにeslint-plugin-jsx-a11yの検査対象外のコンポーネントを容易に作り出せてしまいます。

```plain text
const SampleImage = styled.img`
  max-width: 200px;
`

```

eslint-plugin-jsx-a11yには[configurations](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#configurations)が存在しており、**SampleImage は img として扱う** といった設定も行えますが、これらの設定は完全一致の場合のみ扱いを変えるというもので、正規表現は指定できません。

そのため実際の開発において、これらの設定を完璧に行うことは少々無理があります。

（想像してほしいのですが、リファクタリングでコンポーネント名を変更した、というだけでチェックされなくなったりするわけです。つらい...）

またSmartHRでは [smarthr-ui](https://github.com/kufu/smarthr-ui/tree/master) というUI コンポーネントライブラリをほぼすべてのプロダクトで使っており、これらで提供されるコンポーネントも当然ながら通常のタグではないため、eslint-plugin-jsx-a11yでチェックすることはできません。

これらの状況からSmartHRでもeslint-plugin-jsx-a11yの設定を行っていますが、**本来行いたいチェックがほぼできていませんでした。**

そのため、** SmartHRの場合にも無理なく利用できるa11yのチェックを行うESLintプラグイン** の作成が決まりました。

## `eslint-plugin-smarthr` の仕組みについて

そんなわけで現在SmartHRでは [eslint-plugin-smarthr](https://github.com/kufu/eslint-plugin-smarthr)をフロントエンドの実装が必要なプロダクト、すべてで導入しています。

SmartHRの独自ルールの特徴は

- eslintrcの設定などを一切行わずともちゃんと動作する 
    - 前述の `SampleImage` なども画像として判断、という仕組みがある
- smarthr-uiが提供するコンポーネントを正しく利用するように誘導する

ことが特徴です。

今回は[a11y-image-has-alt-attribute](https://github.com/kufu/eslint-plugin-smarthr/blob/main/rules/a11y-image-has-alt-attribute/index.js)を例に解説したいと思います。

このルールは名称の通り「画像にalt属性が設定されていないとエラーになる」というものですが、それ以外も以下の様なコードをエラーとします。

```plain text
// img要素のコンポーネントであることがSampleという名称からわからないためエラー
const Sample = styled.img``

// img系と予想されるコンポーネントを拡張しているのに名称から予測できないためエラー
const DownloadExample = styled(AnyImage)``

// 名称は画像と予測できるが、拡張元が画像ではないためエラー
const DescriptionImage = styled.div``

```

以下の場合はOKとなります

```plain text
// コンポーネント名から拡張元が画像であることが予測できるためOK
const SampleImg = styled.img``
const DownloadExampleImage = styled(AnyImage)``
const DescriptionImage = styled(DownloadExampleImage)``

```

例から分かる通り「画像として扱うべきコンポーネントは名称末尾に Img、もしくはImageとつける」ことを強制しています。

これらの「名称末尾を固定する仕組み」により、そのコンポーネントが何要素か？を正規表現で予測することを(完璧ではありませんが)可能にしています。

この仕組みにより、画像か・画像ではないかを判断できるようになったため、以下のようなチェックを行えるようになりました。

```plain text
// altが無いためNG
<img />
<SmapleImg />

// altがあるためOK
<DownloadExampleImage alt="ダウンロード方法例:~" />
<DescriptionImage alt="SmartHR eslintの仕組みの構成図" />

```

これはESLint独自ルールのために決めた仕様でしたが、副次的効果として人間も内容を予測しやすくなり、結果としてコードのクオリティを上げることに貢献しています。

(ちなみにこの実装方法を考案したのは[ますぴー](https://twitter.com/masuP9)です。この場を借りて感謝します)

またこのESLintのルールはsmarthr-uiを使っていることを前提としているため、その事情が折り込まれていることもあります。

例えばIconという名称末尾のコンポーネントは画像が期待されるコンポーネントであり、smarthr-uiが提供するIconも大半がsvg要素ではありますがalt属性として代替テキストを設定可能にしています。

そんなIconコンポーネントですが、SmartHRのプロダクトではsmarthr-ui/Buttonコンポーネントの中にIconを設置することがよくあります。

```plain text
<Button prefix={<RequestButonIcon />}>バックグラウンドジョブで実行する</Button>

```

このような構成の場合、Iconにalt属性を設定しなくても、 `バックグラウンドジョブで実行する` というテキストで十分にButtonの動作を説明できているため、altを設定しなくても問題はありません。

SmartHRのプロダクトでIconを利用する場合、そのほとんどはButtonコンポーネント・AnchorButtonコンポーネントでの利用であり、それ以外のケースは稀です。

そのため、「[Iconという名称末尾のコンポーネントには例外的にaltを設定しなくても良い](https://github.com/kufu/eslint-plugin-smarthr/blob/main/rules/a11y-image-has-alt-attribute/index.js#L16)」という条件分岐がルールに組み込まれています。

例外の例外として 「Button内に目で見えるテキストは存在せず、Iconのみ」というパターンも存在しますが、その場合は別ルールの [a11y-clickable-element-has-text](https://github.com/kufu/eslint-plugin-smarthr/tree/main/rules/a11y-clickable-element-has-text) がIconに代替テキストを設定することを強制しています。

## 実際にルールを作成・運用してみてどうなったか

現在、新しい独自ルールを作成する場合、

1. 事前にどんな独自ルールを作ろうとしているか定例などで共有
2. ルールを作成し、warn状態でリリース
3. しばらく運用してみてフィードバックを収集し改良
4. errorにしてもよいか？という確認を定例などで行い変更

という方法を取ります。

このような方法を取っている背景ですが

- 各プロダクトで思ったより修正箇所が大量発生した

という経緯があります。

例えば [a11y-input-has-name-attribute](https://github.com/kufu/eslint-plugin-smarthr/tree/main/rules/a11y-input-has-name-attribute) という **入力要素にはname属性を設定しよう** という独自ルールが存在しますが、このルールが存在する以前では **ほぼ全ての入力要素でname属性が設定されていない** 状態でした。

これは Reactの利用、SPA化などにより、旧来の **Form要素内にinput要素を設置し、submitを行う** 方法から **APIにFormインスタンスを設定しrequestする** 方法に変更したことに由来するもので、name属性がなくてもAPI Requestのインターフェースにさえ則っていれば動作してしまうため発生していました。

入力要素にname属性がない場合、a11y的には以下のような問題が発生します。

- ブラウザの自動補完が正常に動作しない場合がある
- `input[type="radio"]` はグループ化されず、キーボード操作が正しく設定されない

どちらも開発中は意識する機会が少ないため、これらの問題は **問題として認識されることなく放置** されてしまうことが多々あります。

現在、ほぼすべてのプロダクトで [a11y-input-has-name-attribute](https://github.com/kufu/eslint-plugin-smarthr/tree/main/rules/a11y-input-has-name-attribute) は有効化されており、name属性を設定しない状態でCIを回すとエラーになるよう設定されています。

紹介した以外にも様々なルールが作成されていますが、ルール数の増加に伴い、 「このルールなんだっけ？」「Eslintの検知する仕組みどうなっているの？」 などの疑問なども聞こえるようになってきました。

そのため、現在有志で独自ルールの勉強会なども行っています。

- ESLint独自ルールの作成方法
- 現在存在しているルールの確認

などを行い、今後も運用を続けていく予定です。

## 最後に

究極的にはa11yを意識しなくともふつーに開発してればいい感じに作れる! を目指してSmartHRでは独自ルールとsmarthr-uiの開発を行っています。

この記事を読んで独自ルールを作りたくなってみた方、ぜひ作成してみてください。

またSmartHRでは我々と一緒にa11yを高めてくれる方、一緒にEslint独自ルールを作り込んでくれる方を募集しています！

ご興味ある方はぜひ！