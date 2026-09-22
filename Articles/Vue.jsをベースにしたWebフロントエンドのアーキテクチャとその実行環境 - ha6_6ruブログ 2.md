---
Created: 2022-07-25T15:56:00
URL: https://ha6-6ru.hatenablog.com/entry/2020/12/25/050000
Tags: [topic/技術/Vue]
---
# はじめに

この記事は [Vue Advent Calendar 2020](https://qiita.com/advent-calendar/2020/vue) の 25 日目の記事です。
 Vue.jsを使ったアプリケーション開発とは少し趣旨を変えて、Vue.jsをベースにしたWebフロントエンドの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)とその実行環境について整理します。[スクエア free セミナー 第118回 Ｗｅｂサイト構築の新潮流 - YouTube](https://t.co/8umtTdtPpR?amp=1) で話した内容を整理してまとめたものです。

# Webフロントエンドの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)

![[20201225001324 1.png]]

Webフロントエンドの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)としては、Single Page Application、Server Side Rendering、Static Site Generation（Static Site Generator）の3つが主流ですね。ここではそれぞれの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)については解説しません。

# Webフロントエンド[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)のVue.jsベースの実装技術

![[20201225001649 1.png]]

SPAと[SSR](http://d.hatena.ne.jp/keyword/SSR)については改めて解説することもないと思うので、説明は省略します。SSGで人気のツールには、Hugoのように所謂3大[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)に依存しないものもあります。Vue PressやNuxtJSは、Vue.jsの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を活用することができるので、Vue.jsの開発者にはおススメです。

# Webフロントエンドの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)とその用途

![[20201225002946 1.png]]

企業内で使う業務システムを代表とする[エンタープライズ](http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%BF%A1%BC%A5%D7%A5%E9%A5%A4%A5%BA)Webアプリケーションでは、高速な[イントラネット](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%C8%A5%E9%A5%CD%A5%C3%A5%C8)が用意されていることや[SEO](http://d.hatena.ne.jp/keyword/SEO)対策が不要ということもあり、SPAが適しています。 
 コンシューマー向けのWebアプリケーションになると、パフォーマンスや[SEO](http://d.hatena.ne.jp/keyword/SEO)対策の必要性に応じて[SSR](http://d.hatena.ne.jp/keyword/SSR)が優位になることがありますが、 サーバーリソースの効率性やスケールのしやすさ、開発の容易性から、多くの場合はSPAが適しています。[SSR](http://d.hatena.ne.jp/keyword/SSR)を適用すべきなのは、静的サイトではないWebアプリケーションにおいて、First Meaningful Paintを高速化したい場合や動的にOGPを設定したいケースがあげられます。 SSGは、ブログやニュースなどの投稿、外部リソースの更新をトリガーに更新するWebサイト、ランディングページのように従来から静的サイトとして作られていたものが適しています。

# Webフロントエンドの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)とその実行環境

Webフロントエンドの[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)に対して、[クラウド](http://d.hatena.ne.jp/keyword/%A5%AF%A5%E9%A5%A6%A5%C9)サービスをフル活用した実行環境について紹介します。

## SPAコンテンツ配信

![[20201225004326 1.png]]

Azureでは前段に[CDN](http://d.hatena.ne.jp/keyword/CDN)を構え、ビルドで生成した静的コンテンツはAzureのストレージサービスであるBlob Storageを使って[ホスティング](http://d.hatena.ne.jp/keyword/%A5%DB%A5%B9%A5%C6%A5%A3%A5%F3%A5%B0)します。Azureでは、Static Web AppsというサーバーレスのFaaSをセットにした静的コンテンツ配信用のサービスがプレビュー公開中で、今後はStatic Web Appsが主流になっていくと思います。  [AWS](http://d.hatena.ne.jp/keyword/AWS)では前段にCloudFrontを構え、ビルドで生成した静的コンテンツは[AWS](http://d.hatena.ne.jp/keyword/AWS)のストレージサービスであるS3を使って[ホスティング](http://d.hatena.ne.jp/keyword/%A5%DB%A5%B9%A5%C6%A5%A3%A5%F3%A5%B0)します。[CDN](http://d.hatena.ne.jp/keyword/CDN)またはCloudFrontでは、キャッシュやファイル圧縮の機能など、図に記載した機能を利用します。また、SPAの場合は[クライアントサイドルーティング用の設定](https://router.vuejs.org/ja/guide/essentials/history-mode.html)を忘れないようにしましょう。
 ここで紹介したストレージサービスではなく、Webサーバーでコンテンツを配信することもできますが、静的コンテンツの[ホスティング](http://d.hatena.ne.jp/keyword/%A5%DB%A5%B9%A5%C6%A5%A3%A5%F3%A5%B0)環境を使うことで、非常にお手軽でハイパフォーマンスな構成を実現できます。

![[20201225004432 1.png]]

SPAと[SSR](http://d.hatena.ne.jp/keyword/SSR)、SSG(Jamstack)で使う[API](http://d.hatena.ne.jp/keyword/API)はサーバレス（FaaS）で構成することができます。AzureではFunctions、[AWS](http://d.hatena.ne.jp/keyword/AWS)ではLambdaです。
 また、Open ID Connectを使い、別に用意したOpen IDプロバイダー兼認可サーバーに認証認可を移譲する形で認証認可をサポートすることもできます。認証認可はAzureでは[API](http://d.hatena.ne.jp/keyword/API) Managementで、[AWS](http://d.hatena.ne.jp/keyword/AWS)では[API](http://d.hatena.ne.jp/keyword/API) [Gateway](http://d.hatena.ne.jp/keyword/Gateway)で構成します。

## [SSR](http://d.hatena.ne.jp/keyword/SSR)コンテンツ配信

![[20201225004453 1.png]]

[SSR](http://d.hatena.ne.jp/keyword/SSR)の場合は、サーバー側でHTMLを生成するためのWebサーバー機能が必要ですので、Webサーバーとして、Node.jsが動作する環境を用意しましょう。
 Azureでは、Node.jsをランタイムとして利用できるAzure App Serviceが手軽に利用できます。[AWS](http://d.hatena.ne.jp/keyword/AWS)ではFargateを使い、Docker上でNode.jsをセットアップして使うのがおススメです。制約はあるものの、Lambdaで動作させることもできます。

## SSG（Jamstack）

![[20201225004517 1.png]]

SSGのコンテンツの配信方法はSPAと同じ構成で実現できます。SSGはJamstackで使われるケースが増えていますので、Jamstackの構成についても紹介します。
 Azure Pipelineまたは[AWS](http://d.hatena.ne.jp/keyword/AWS) Amplifyを使って[GitHub](http://d.hatena.ne.jp/keyword/GitHub)にプッシュされたことをトリガーに、静的サイトをビルド、デプロイします。ビルドに使うのは、実装技術で出てきたVuePress、NuxtJSですね。

# おわりに

2020年はVue.js 3.0がリリースされましたが、VuetifyなどのUI[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)ライブラリやその他周辺ライブラリのVue.js 3対応は現時点でまだ揃っていません。2021年はVue.js 3を使った本格的な開発に取り組みたいですね。
 Vue.js 3.0に向けた準備には、是非こちらの著書もよろしくお願いします。

![[20201225012239 1.jpg]]

- [作り方](https://ha6-6ru.hatenablog.com/entry/2020/11/15/171616)

# 概要

コード値（区分値）の選択用フィールドを、Vuetifyを使って実装する方法について解説します。 これだけだったらVuetifyの公式ドキュメントで十分な内容なのですが、今回は業務利用を想定したコード値選択用フィールドの実装について解説します。

## 業務用アプリケーションによくあるコード値の選択用フィールド

窓口業務で使うアプリケーションでは、オペレーターさんが直接コード値を入力するケースがあります。 これは、コード値がわかっていればドロップダウン式やスクロール式のリスト選択よりも入力が速くなるからだと思います[*1](https://ha6-6ru.hatenablog.com/entry/2020/11/15/171616)。

# 作り方

Vuetifyの`v-autocomplete` [Autocomplete component — Vuetify](https://vuetifyjs.com/en/components/autocompletes/) を使って、入力を補完できるようにしてみます。 題材は[銀行コード](http://d.hatena.ne.jp/keyword/%B6%E4%B9%D4%A5%B3%A1%BC%A5%C9)にします。[銀行コード](http://d.hatena.ne.jp/keyword/%B6%E4%B9%D4%A5%B3%A1%BC%A5%C9)は馴染みがあると思いますが、こちら [金融機関コード・銀行コード検索](https://zengin.ajtw.net/) のコードです。

## コード値選択フィールドの外観

これから作成するコード値選択フィールドの外観はこちらです。

![[20201115111236 1.png]]

コード値選択フィールド

選択フィールドには、選択肢としてコード値と名称の両方を表示します。

![[20201115113605 1.png]]

コード値選択フィールドの入力補助

オートコンプリート機能は、コード値と名称の両方を扱えるようにします。

## Vuetifyを使った実装指針

コード値と名称の両方を表示し、選択された値にコード値を扱えるようにするには[*2](https://ha6-6ru.hatenablog.com/entry/2020/11/15/171616)、Vue.jsの実装としては表示（`v-bind`）と入力（`v-on`）を分ければよいですね。Vuetifyは最初からこれらを分離することができるように設計されており、専用のプロパティが用意されています。それでは実装方法を見ていきましょう。

## その１ コード値をキャッシュする

選択肢が少ない場合は、クライアント上にキャッシュしてしまいましょう。

### template

```plain text
<v-autocomplete
  v-model="selectedBankCode"
  outlined
  dense
  :items="bankList"
  :item-text="formatBankCode"
  item-value="code"
  label="銀行コード"
/>

```

プロパティの解説です。

- v-model: 選択したコード値を格納するプロパティを指定します。
- outlined: フォームを線で囲まれたスタイルにします。
- dense: フォームの高さを下げます。
- items: 選択候補のリストを格納したプロパティ指定します。
- item-text: コード値の表示をカスタマイズするためのメソッドを指定します。
- item-value: 選択されたコード値のキーとして扱う値を、リストのプロパティから指定します。
- label: フィールドの項目を示すラベルです。

### script

script部は今回は`@vue/composition-api`を使って記述します。

```plain text
<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const state = reactive({
      selectedBankCode: null,
      bankList: [
        { name: 'みずほ銀行', code: '0001' },
        { name: '三菱ＵＦＪ銀行', code: '0005' },
        { name: '三井住友銀行', code: '0009' },
        { name: 'りそな銀行', code: '0010' },
        { name: '埼玉りそな銀行', code: '0017' },
      ],
    });

    const formatBankCode = value => {
      return `${value.code}: ${value.name}`;
    };

    return {
      ...toRefs(state),
      formatBankCode,
    };
  },
});
</script>

```

`bankList`を固定のオブジェクトにしていますが、実際にはMVVMモデルでいうところのModelに格納し、値が空であればWebAPIを経由して取得するといった、キャッシュとして扱う形で実装します。`formatBankCode`でコード値と名称の両方を組み合わせた、リスト表示用の文字列を組み立てています。 コード値選択フィールドでコード値を選択すれば、`selectedBankCode`にコード値（[埼玉りそな銀行](http://d.hatena.ne.jp/keyword/%BA%EB%B6%CC%A4%EA%A4%BD%A4%CA%B6%E4%B9%D4)であれば`0017`）が格納されます。 ほぼほぼ`v-autocomplete`の機能で実現できてしまうので簡単ですね。

## その2 コード値を都度WebAPI経由で取得する

選択肢が多い場合は、クライアント上には大きなデータを保持しないようにするといいでしょう。 WebAPIで絞り込みを行い、該当するコード値のみを選択肢として表示する形を想定して実装し ます。

### template

```plain text
<v-autocomplete
  v-model="selectedBankCode"
  outlined
  dense
  no-filter
  :loading="isLoading"
  :search-input.sync="keyword"
  :items="bankList"
  :item-text="formatBankCode"
  item-value="code"
  label="銀行コード"
/>

```

その1のキャッシュ方式から追加したプロパティの解説です。

- no-filter: [ブラウザー](http://d.hatena.ne.jp/keyword/%A5%D6%A5%E9%A5%A6%A5%B6%A1%BC)上のフィルタリングを無効にします。有効にするとWebAPI経由での取得タイミングのずれによって、少し動作に違和感があったので無効にしています。
- loading: リストの読み込み中であることを表現するプロパティを指定します。このプロパティを使うと、フィールド下部に[プログレスバー](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%EC%A5%B9%A5%D0%A1%BC)が表示できます。
- search-input: フィールドに入力した文字列を格納するプロパティを指定します。

### script

```plain text
<script>
import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import axios from 'axios';

const fetchBankCodes = async value => {
  const response = await axios.get('bank-codes');
  return response.data;
};

export default defineComponent({
  setup() {
    const state = reactive({
      isLoading: false,
      keyword: null,
      selectedBankCode: null,
      bankList: [],
    });

    watch(
      () => state.keyword,
      async () => {
        state.isLoading = true;
        state.bankList = await fetchBankCodes(state.keyword);
        state.isLoading = false;
      },
    );

    const formatBankCode = value => {
      return `${value.code}: ${value.name}`;
    };

    return {
      ...toRefs(state),
      formatBankCode,
    };
  },
});
</script>

```

`search-input`で指定したプロパティ`keyword`をウォッチし、値が変更されたらWebAPIを呼び出して選択候補のコード値リストを取得し、プロパティに設定します。WebAPIの呼び出しはModelに実装することをおすすめしますが、ここでは単[純化](http://d.hatena.ne.jp/keyword/%BD%E3%B2%BD)[するめ](http://d.hatena.ne.jp/keyword/%A4%B9%A4%EB%A4%E1)に[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)内に関数を配置しました。
 WebAPIの呼び出し中に[プログレスバー](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%EC%A5%B9%A5%D0%A1%BC)を表示するために、WebAPIの呼び出し前後で`isLoading`プロパティを設定しています。

# 終わりに

実際にはここからさらにスタイルを変更したり、細かい動作の修正を行うことになると思いますが、Vuetifyを使うことでとても簡単に実装できました。
 コード値と名称の両方でオートコンプリート機能を使うことができること、コード値と名称がセットで表示されるので入力誤りを防止する効果も期待できることがポイントです。コード値を選択するUIの候補として参考にしてもらえると嬉しいです。

# 書籍の紹介

宣伝となり恐縮ですが、こちらの書籍でVue.jsとVuetifyを扱っていますので、参考にしていただければ幸いです。

![[cover 1.jpg]]

[書籍の情報サイト](https://github.com/ha6-6ru/vuejs-handson)

## 紹介

人気の[JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)Vue.jsにフォーカスし、フロントエンド開発の基礎から本格的なSPAの開発まで、ハンズオン形式で一歩ずつ、無理なく着実にステップアップしていきます。 さらに、2020年リリース予定のVue.js 3.0をいち早くキャッチアップ。Vue [CLI](http://d.hatena.ne.jp/keyword/CLI) 4に対応しつつ、Vue.js 2.xとの差分として新しい記述スタイル（Composition [API](http://d.hatena.ne.jp/keyword/API)）を併記するなど、バージョン移行を強力に支援します。

## 基本情報

- 著者: @ha6_6ru
- B5変型判／624ページ
- 2020年10月中旬刊行
- 出版社の紹介ページ [http://web14.ric.co.jp/book/contents/book_1229.html](http://web14.ric.co.jp/book/contents/book_1229.html)