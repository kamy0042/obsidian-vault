---
Created: 2022-09-13T13:31:00
URL: https://techblog.zozo.com/entry/zozotown-css-in-js
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[20220912191357.png]]

## はじめに

こんにちは。ZOZOTOWN開発本部フロントエンドの菊地（[@hiro0218](https://github.com/hiro0218)）です。

現在、[ZOZOTOWN](https://zozo.jp/)ではWebフロントエンド技術のリプレイスプロジェクトが進行しています[1](https://techblog.zozo.com/entry/zozotown-css-in-js#fn:1)。本記事では、WebフロントエンドのリプレイスでCSS in JSの技術選定をした際の背景や課題についてご紹介します。

## 既存技術スタックの課題

リプレイス以前の環境は、Classic ASPのテンプレートエンジンに依存したUI実装が多く存在しており、新規開発や変更のタイミングで実装をReact + CSS Modulesへ改修しています。そのため、レガシーな実装とモダンな実装が共存した状態です。

こういった背景から、リプレイス以前のUI開発では以下のような課題がありました。

- **グローバルなCSSが多く、CSSの変更がどこへ影響するのか予測しづらい** 
    - Classic ASPのテンプレートエンジンに依存したUI実装が多く存在しているため
- **CSS Modulesの課題** 
    - **近い将来、非推奨になる可能性がある** css-loaderのCSS Modulesはメンテナンスモードになっており、再リプレイスを視野に入れないで済むように活発な技術にしたい
[2](https://techblog.zozo.com/entry/zozotown-css-in-js#fn:2)
    - **コンポーネント側でクラス名が間違っていてもエラーが発生しない** `.d.ts`ファイルを自動生成してクラス名の補完やエラーが分かるようにはしていた
    - **スタイルの優先度に保証がない**
    - **管理コストがかかる** CSSファイルとJSファイルが別なため
    - **ローカルスコープ（CSSクラス名を衝突させない）になる設定を外していた** ページ単位でグローバルなCSSから上書きする必要があった CSS設計を用いてクラス名が競合しないようにしていた
[3](https://techblog.zozo.com/entry/zozotown-css-in-js#fn:3)

CSS Modulesを利用していますが、レガシーな実装とモダンな実装の整合性を取るために、CSSのクラス名をローカルスコープに出来ていませんでした。いずれにしてもReactコンポーネントの再開発が必要になり、リプレイス時に過去の資産を完全に活かし切るのも難しい状況であったため、技術スタックの再考の余地はあると考えました。

リプレイス以前の環境における課題や背景については、「[ITCSS を採用して共同開発しやすい CSS 設計を ZOZOTOWN に導入した話](https://techblog.zozo.com/entry/itcss-to-zozotown)」でも触れております、興味のある方は併せてご確認ください。

## なぜCSS in JSを使うのか

CSS in JSとは、コンポーネントに属するCSSをバンドルさせるためのアプローチです。CSS in JSを利用することで、CSSはコンポーネントに定義され、外部のCSSファイルに依存することなくコンポーネント単体で独立して動作させることができます。

既存技術スタックの課題でも挙げましたが、これまではグローバルなCSSを利用しており、CSSの定義を変更した際にどこへ影響があるか予測しづらいという課題がありました。CSS in JSを利用することで、CSSの変更による影響をコンポーネント内に留めることができます。

宣言的にUIを実装できるReactとの親和性も高いです。

## CSS in JSの選定基準

CSS in JSのライブラリを選定する上で基準としたものは以下になります。

- **タグ付きテンプレートリテラル記法が使えること** 
    - メンバーがキャッチアップしやすいことを前提として、通常のCSSの使用感を変えたくない
    - オブジェクトスタイル記法だと既存実装を移植する際に難がある
- **Sass（SCSS）記法のようなネストセレクタが使えること**
- **TypeScriptとの親和性があること**
- **参考資料が多いこと**
- **メンテナンスが活発であること**

## CSS in JSの選定候補

いくつものCSS in JSライブラリを確認しましたが、使用感など選定基準にマッチしなかったものも多く、最終的に以下のライブラリが選定候補となりました。

## Linaria（Zero-runtime CSS in JS）を検証する

パフォーマンスの観点で考えるとZero-runtime CSS in JSは理想的です。その中でもStyled ComponentsやEmotionなどの先発ライブラリと同様の構文を備えているLinariaは有力な候補のひとつでした。

しかしながら、検証していくうちに以下のような課題が出てきました。

- Linariaは動的なスタイルを使用した場合にCSS Custom Propertiesを出力するため、多用するとCSSが肥大化してしまう
- 動的なスタイルの値が`undefined`な場合に不要なプロパティが残ってしまう 
```plain text
const Heading = styled.h1`
  background-color: ${({ bg }) => bg};
`;

const Example = () => {
  return (
    <>
      <Heading bg="red">Red Heading</Heading>
      <Heading>Heading</Heading>
    </>
  );
};

```
```plain text
<!-- 出力後 -->
<h1 class="tzzg9j5w" style="--tzzg9j5w-0:red;">Red Heading</h1>
<h1 class="tzzg9j5w" style="--tzzg9j5w-0:undefined;">Heading</h1>

<style>
  .tzzg9j5w {
    background-color: var(--tzzg9j5w-0);
  }
</style>

```
- 同じコンポーネントをネストすると再利用されたCSS Custom Propertiesが上書きされていまい意図した動作をしない 
```plain text
const Stack = styled.div`
  & > * + * {
    margin-top: ${({ spacing }) => spacing || "0"};
  }
`;

const Example = () => {
  return (
    <Stack spacing="1rem">
      <Stack></Stack>
      <Stack></Stack> {/* ここの margin-top が 0 になってしまう */}
    </Stack>
  );
};

```
ネストされた2番目の`Stack`の`margin-top`は`1rem`となることを期待するが、CSS Custom Propertiesの上書きによって`0`になってしまう
- 現時点で他社の採用事例やドキュメントがまだ少ない

ZOZOTOWNは複雑なアプリケーションな上に開発メンバーも多く、上記のような課題が発生してしまうと開発の足かせになってしまいかねないため、今回は導入を見送りました。

## Styled ComponentsとEmotionを比較する

選定候補はStyled ComponentsもしくはEmotionの2つになりました。この両ライブラリの比較検討の際に行った比較方法を紹介します。

### 機能面の比較

以前はStyled Componentsに比べ、後発のEmotionの方が利用できる機能は多かったようです。ですが、調べてみると現状はStyled ComponentsもEmotionと同様の機能があるようでした。

|  |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |
|  |

両ライブラリとも必要としていた機能はありました。

### トレンドの比較

ライブラリのスター数（GitHub）は先発ライブラリに分がありますし、いくらスター数が多くても今は積極的に使われていない可能性もあります。今のダウンロード数を見てみれば、そういった可能性を排除できるため、[npm trends](https://npmtrends.com/)からダウンロード数の推移を確認してみたいと思います。

Emotionは機能別にパッケージが分かれているため、Styled Componentsと同機能を持つ `@emotion/styled` と `styled-components` で比較しました。

![[20220831204727.jpg]]

npm trends - @emotion/styledvsstyled-components

比較した結果、後発のEmotionが途中からStyled Componentsのダウンロード数を追い越して安定しているようでした。大きな差があるとは言えませんし、ライブラリの比較条件が異なっているため、npm trendsの比較だけでは、両者の優劣を判断できないと考えました。

次に、[The State of CSS 2021](https://2021.stateofcss.com/ja-JP/)を見てみます。[The State of CSS](https://stateofcss.com/ja-jp/)は、世界中の開発者へアンケートを実施し、その回答の集計結果を公開することで技術選定やトレンドを見つけることを目的としたサイトです。

その中から[CSS-in-JS](https://2021.stateofcss.com/ja-JP/technologies/css-in-js/)の項目を参考にユーザーの声を見てみたいと思います。

Styled ComponentsとEmotionを抜粋すると以下の通りです。

|  |
| --- | --- | --- |
|  |
|  |
|  |
|  |

ユーザー数や満足度のいずれもStyled Componentsの方がEmotionを上回っている結果が見られました。

歴史の長さからStyled Componentsの利用率や認知度は非常に高いようです。後発のEmotionについてもStyled Componentsのすぐ後に登場しているため大きく状況は変わらないでしょう。両ライブラリの満足度や興味は下がっている一方で利用率や認知度は年を経ても大きく変化がないのは、新しいライブラリの台頭に押されているのだと推察できます。実際、既存ライブラリが上回ったわけではなく、新しいライブラリが上位に来ています。両ライブラリは、CSS in JSライブラリとして枯れつつある状況だという印象を受けました。

### パフォーマンスの比較

両ライブラリのパフォーマンスを比較検証した記事を見ると「Emotionのパフォーマンスの方が高い」という結果が散見されました（Emotionは公式でも高パフォーマンスを謳っています[4](https://techblog.zozo.com/entry/zozotown-css-in-js#fn:4)）。しかし、記事の検証時期が古くなっているものも多く、現在のバージョンでどちらのパフォーマンスが高いのかは判断しづらくもありました。

そういう背景から各ライブラリの最新バージョンでベンチマークを測定しました。ベンチマークは、ReactのUIコンポーネントライブラリである[MUI](https://mui.com/)（旧名：Material UI）が公開[5](https://techblog.zozo.com/entry/zozotown-css-in-js#fn:5)しているものを利用して測定しました。

- **ライブラリのバージョン** 
    - `@emotion/styled`: v11.10.0
    - `styled-components`: v5.3.5
- **実行条件** 
    - 5000個のコンポーネントを描画する
```plain text
<>
  {new Array(5000).fill().map(() => (
    <Div>test case</Div>
  ))}
</>

```
    - 20回繰り返して計測
- **実行マシンのスペック** 
    - MacBook Pro (2019)
    - プロセッサ：2.6GHz 6-CORE i7
    - メモリ：32GB 2667 MHz DDR4

|  |
| --- | --- | --- | --- | --- | --- |
|  |
|  |

測定結果をみるとEmotionの方が良いパフォーマンスでした。様々な条件で確認したところ、特に描画するコンポーネント数が多い場合はEmotionの方が高パフォーマンスという結果が見られました。

near-zero runtimeを謳う[Stitches](https://stitches.dev/)というCSS in JSライブラリの[ベンチマーク結果](https://stitches.dev/docs/benchmarks)にEmotionとStyled Componentsも比較対象として載っています。Stitchesに軍配が上がってはいますが、そちらでもStyled ComponentsよりEmotionの方が高パフォーマンスという結果が出ていました。

### バンドルサイズの比較

Styled Componentsのパッケージは1つのパッケージになっていますが、Emotionはパッケージが用途別に分かれています。そのため、例えば `@emotion/styled` を使うか否かで当然バンドルサイズも変わります。そのため、単純なパッケージ同士のバンドルサイズの比較は難しいため、今回は利用するであろうパッケージを揃えて比較しました。

単純なバンドルサイズでの比較では、Emotionの方が僅かにサイズが少ないようでした。

## まとめ

スタイリングを行うためのアプローチとしてはCSS in JS、ライブラリはEmotionを選択しました。

- **CSS in JSを選択した理由：** 
    - ローカルスコープなCSSクラス名が自動生成されるため、コンポーネント同士が影響し合わない
    - JavaScriptの変数・関数と統合できるため、CSSの変数や関数よりも、コンテキストに基づいた動的なスタイリングがしやすい
- **Emotionを選択した理由：** 
    - 機能要件を満たせていた
    - パフォーマンスやバンドルサイズの観点でStyled Componentsよりも優れていた
    - 著名なライブラリのため、利用率も高く情報のキャッチアップがしやすい

初めてCSS in JSに触れるメンバーでもEmotionを利用した開発は参入障壁にはならず、スムーズに開発を進めることができました。必要に応じてメンバー自らキャッチアップしながら進めていくことも出来ています。署名なライブラリのためキャッチアップしやすいことが功を奏していると感じています。

フロントエンドの技術スタック全般に言えることでもありますが、The State of CSSでの推移を見ても分かる通り、CSS in JSライブラリの移り変わりは早いです。技術選定は「どのようなスキルセットの開発メンバーが関与していくのか」「選定したライブラリが参入障壁にならないか」「ライブラリの情報はキャッチアップしやすいか」などを重視しました。開発メンバーにとっても納得感のある技術選定をすることの重要性を再認識できました。

## 最後に

ZOZOでは、一緒にサービスを作り上げてくれる方を募集中です。ご興味のある方は、以下のリンクからぜひご応募ください！