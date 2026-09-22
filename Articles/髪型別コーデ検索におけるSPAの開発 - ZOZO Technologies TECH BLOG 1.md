---
Created: 2021-01-01T15:32:00
URL: https://techblog.zozo.com/entry/hairstyle-spa
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
こんにちは、WEAR部の繁谷です。
普段はバックエンドのエンジニアとしてWEARの開発を行っています。
ZOZOテクノロジーズは4月7日に「[髪型別コーデ検索](https://lab.wear.jp/hairstyle_search)」をリリースしました。
プレスリリースは是非[こちら](https://press-tech.zozo.com/entry/20200407_hairsearch)を御覧ください。
髪型別コーデ検索のフロントエンドはSPA(Single Page Application)でつくられており、こちらの開発を行った際に意識した設計について紹介します。

# はじめに

髪型別コーデ検索は、[ZOZO研究所](https://research.zozo.com/)の福岡チームが研究・開発したAIを活用し髪型からコーディネートを検索するAPIを利用して、SPAのWebサービスとして提供しています。

こちらは髪型別コーデ検索のアーキテクチャを簡単に示したものです。
今回私は研究所が提供するAPI以外のエンジニアリングに関する部分である、バックエンドのAPI開発、フロントエンドの開発、それらのインフラ構築を担当しました。
その中でもフロントエンドの開発は、SPAでの開発経験者がチーム内に私を含めて誰もいない状態から、一人で基礎の設計を行いその後開発メンバーを追加して素早くリリースすることを目指しました。
この過程で、どのように技術選定や設計、実装を行ったかを紹介します。

# 技術選定

髪型別コーデ検索のフロントエンド開発において、どのように技術選定を行ったかを説明します。

## 注力すべきことは何か

技術選定を行う前に、まず開発において注力すべきことを3つ定めました。

- 素早いリリース
- 技術的な挑戦
- 低い学習コスト

### 素早いリリース

今回の開発はWEARのユーザの皆様により良い検索体験を提供するために、研究所が開発した髪型別コーデ検索のAPIを効果検証することを目的としています。
そのため、適切に選択と集中をした上で素早くリリースし、PDCAを回すことを重視しています。
よって、3か月程度の開発期間で素早くリリースすることを目標においた上で、実装する内容を取捨選択していくことにしました。

### 技術的な挑戦

素早くリリースする必要がある一方、同時にエンジニアとして挑戦をする姿勢も我々にとって重要であるため、何らかの新しい技術の習得への挑戦を行うことにしました。
挑戦する内容を決めるにあたっては、当時のチーム内ではSPAでのフロントエンド開発の知見は全く無かったため、これらの技術の習得からリリースまでを開発期間内で行うこととしました。

### 低い学習コスト

技術的な挑戦は行いつつも、きちんとチームメンバーを巻き込み、素早く開発をスケールさせ、全体の開発スピードを上げる必要がありました。
SPA未経験のメンバーでも素早く開発に入れるよう、学習コストが低い技術選定を行い、適切な設計で開発環境を整備することを意識しました。

## 実際の検討内容

以上の注力する点を踏まえてフロントエンドの技術選定を行っていきました。

### JavaScript vs. TypeScript

TypeScriptは、昨今のフロントエンド開発ではデファクトスタンダードのようなものである認識であり、JavaScriptが書けるメンバーであれば学習コストは高くないため素直に採用しています。

### React vs. Vue.js

当時の個人的な印象であり、コントリビュータの方々の認識と異なる可能性はありますが、
「簡単に使える」ことを意識しているVue.jsよりも設計を意識した「堅い」イメージのReactを選択しました。
今回は技術的な挑戦による技術力の向上を目的としており、設計力の向上につながると感じたためです。

### React Hooks vs. Redux

Reduxに関して優位性があった機能は、現在はほとんどがReactでも実現可能な認識です。
非同期処理は、[独自フック](https://ja.reactjs.org/docs/hooks-custom.html)を使うことで同様のことができます。
バケツリレーと呼ばれる、親コンポーネントから子へのpropsの受け渡しは、 `useContext` によって解決できます。
Reducerによる状態管理は、 `useReducer` を使うことができます。
このように、以前はReduxでしか提供されていなかった機能も、今はReactで提供されています。
ただその中でも、[Redux DevTools](https://github.com/reduxjs/redux-devtools)によって状態の履歴を確認できることが、開発効率を向上させる上で効果的であったためReduxを選定することにしました。
また、学習コストが高いRedux middlewareは一切使用しないという方針をとっています。

### SPA or SSR(Server Side Rendering)

チームとしてReactによるSPAの経験もないため、いきなりSSRで開発するのは、学習コストが高いと判断しSPAを選んでいます。
また、WEARから直接アクセスを流すため、SEOを重視しないということもあります。
同様の理由でPWAも意識しない判断をしています。

# SPAの設計

React、Reduxを用いたSPAにおいて、今回の開発でどのように設計したか説明します。
全体を通してSPA開発において特に悩みやすいポイントを、SPA未経験のメンバーが悩まず素早くコンポーネントを量産できるような設計を意識しています。

## ディレクトリ構成

React、Reduxを用いたSPAではディレクトリ構成パターンが多くありますが、今回の開発は[Ducksパターン](https://github.com/erikras/ducks-modular-redux)を用いています。
これは、ReduxにおけるactionTypes, actions, reducerを、下記のツリーのように1つのファイルに書く非常にシンプルなパターンです。

```plain text
├── src
│   ├── modules
│   │   ├── coordinate.ts
│   │   └── hairstyle.ts

```

ファイルの中身は以下のように、actionTypes, actions, reducerをまとめて書きます。

```plain text
// State
const initialState = {
  hairstyles: null,
}

// Action
const SHOW_HAIRSTYLES = 'SHOW_HAIRSTYLES'

// ActionCreators
export const showHairstyles = (hairstyles: Hairstyles) => {
  return {
    type: SHOW_HAIRSTYLES,
    payload: {
      hairstyles: hairstyles,
    }
  }
}

// Reducer
const hairstyle = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_HAIRSTYLES:
      return { ...state, hairstyles: action.payload.hairstyles }
    default:
      return state
  }
}

```

Ducksパターンは、actionTypes, actions, reducerを1つのファイルに記述するため、そのファイルが肥大化し得ます。
それを解決するためにDucksパターンから派生した、[Re-Ducksパターン](https://github.com/alexnm/re-ducks)があります。
ただ、今回は比較的に小規模なプロジェクトで素早く実装したいため、よりシンプルなDucksパターンを選定しました。
結果的には、特に不都合はなく素早く実装ができたため、今回の開発においては有効なパターンでした。

## コンポーネント設計

Reactにおいて、各コンポーネントをどの粒度で切り分け、どのようにコンポーネントツリーを組み上げるかということは大きな関心ごとでした。
このコンポーネント設計においてよく使われるのが、UI設計におけるメンタルモデルの[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)です。
UIを `Atoms` `Molecules` `Organisms` `Templates` `Pages` という単位で分割して設計する考え方で、今回の開発でも部分的に取り入れています。

まず、今回の開発では、Atomic Designを取り入れるにあたって以下のルールを設定しました。

**再利用するコンポーネントに対してのみAtomic Designを適用する。**

Atomic Designはコンポーネントを設計するにあたって良い指標を示してくれます。
ただ、全てのコンポーネントに対して適用しようとした場合、設計コストが高く開発スピードは下がってしまいます。
よって、今回の開発では最初はAtomic Designを強く意識せず実装し、コンポーネントを再利用したくなった時にAtomic Designを適用するルールとしました。
そうすることで、開発スピードを落とさずに本当に再利用が必要なコンポーネントに対して、Atomic Designによる再利用性の向上のメリットを得られました。
具体的にどうやってコンポーネントを実装していくかを、髪型別コーデ検索の髪型の一覧を表示する部分を例として説明します。

まず、初期実装では、ページ毎にコンポーネントを切り出します。
このコンポーネントは[react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)などのルーターで読み込まれます。

```plain text
// pages/Home.tsx
const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Hairstyles />
      <Footer />
    </>
  )
}

```

ページコンポーネントの配下のコンポーネントは、設計を意識しつつも自由に実装します。

```plain text
// Hairstyles.tsx
const Hairstyles: React.FC = () => {
  const hairstyleEntities = useSelector((state: any) => state.hairstyle.hairstyles)

  const hairstyles = hairstyleEntities.map((hairstyleEntity: HairstyleEntity) =>
    <div class="hairstyle">
      <img src={hairstyleEntity.imgUrl} />
      <p>{hairstyleEntity.name}</p>
    </div>
  )

  return (
    <>
      {hairstyles}
    </>
  )
}

```

次に、上記のコードの `<div class="hairstyle">` のところを再利用したくなった場合、これをコンポーネントに切り出しAtomic Designを適用していきます。
この際にAtomic Designの各要素を以下のように定義し、コンポーネントに分けていくようにします。
※ 独自の定義で実際のAtomic Designの解釈とずれるところがあります。

- Atoms : HTMLタグ1つと、それにスタイルを当てるタグでのみ構成され、状態を持たない
- Molecules : 高々数個のAtomsから構成され、1ページ内で複数回あらわれる可能性があり、他のコンポーネントとグループとしてまとまった状態で使用される
- Organisms : Molecules、Organismsから構成され、同じコンポーネントは1ページ内では高々1回しかあらわれない
- Templates : 再利用性が低いため使用しない
- Pages : ルータから参照され、基本的には再利用されない

このように定義を決めることで、どのようにコンポーネントに落としていくかがイメージしやすくなります。
では、実際にAtomic Designを適用してみます。

まず、Atomic Designの適用対象の `Hairstyles.tsx` をOrganismsに分類します。

```plain text
// organisms/Hairstyles.tsx
const Hairstyles: React.FC = () => {
  const hairstyleEntities = useSelector((state: any) => state.hairstyle.hairstyles)

  const hairstyles = hairstyleEntities.map((hairstyleEntity: HairstyleEntity) =>
    <Hairstyle key={hairstyleEntity.id} hairstyle={hairstyleEntity} />
  )

  return (
    <>
      {hairstyles}
    </>
  )
}

```

再利用したい部分をMoleculesとしてコンポーネントに切り出します。

```plain text
// molecules/Hairstyle.tsx
const Hairstyle: React.FC<Props> = (props) => {
  return (
    <div class="hairstyle">
      <Img imgUrl={props.hairstyleEntity.imgUrl} />
      <Text>{props.hairstyleEntity.name}</Text>
    </div>
  )
}

```

imgタグやpタグはAtomsとしてコンポーネントに切り出します。

```plain text
// atoms/Img.tsx
const Img: React.FC<Props> = (props) => {
  return (
    <img src={props.imgUrl} />
  )
}

```

```plain text
// atoms/Text.tsx
const Text: React.FC<Props> = (props) => {
  return (
    <p>{props.children}</p>
  )
}

```

いかがでしょうか。非常に簡単な例ではありますが素直にAtomic Designに落とし込むことができ、コンポーネントは再利用できそうなイメージができたと思います。

## 非同期処理

次に非同期処理です。
React、Reduxでは、非同期処理の実装の仕方も様々な方法があります。
前述の通り、今回の開発はRedux middlewareを使用しません。[redux-thunk](https://github.com/reduxjs/redux-thunk)や[redux-saga](https://github.com/redux-saga/redux-saga)といった、メジャーなRedux middlewareは使用せずReactの独自フックを用いて非同期処理を実装しています。
髪型の一覧を表示する例で独自フックを用いて非同期処理を行う実装をすると以下のようになります。

```plain text
// organism/Hairstyles.tsx
const Hairstyles: React.FC<Props> = (props) => {
  // 独自フック
  const [loading, error] = useGetHairstyles()

  const hairstyleEntities = useSelector((state: any) => state.hairstyle.hairstyles)

  if (error) {
    return <Error />
  }

  if (loading) {
    return <Loading />
  }

  const hairstyles = hairstyleEntities.map((hairstyleEntity: HairstyleEntity) =>
    <Hairstyle key={hairstyleEntity.id} hairstyle={hairstyleEntity} />
  )

  return (
    <div class="hairstyles">
      {hairstyles}
    </div>
  )
}

```

```plain text
// hooks/useGetHairstyles.ts
export const useGetHairstyles = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getHairstyles = async () => {
      setLoading(true)

      // 非同期処理
      const [hairstyles, err] = await HairstyleRepository.getHairstyles()

      if (err) {
        setError(err.message)
      } else {
        setError(null)
        dispatch(showHairstyles(hairstyles))
      }

      setLoading(false)
    }

    getHairstyles()
  }, [dispatch])

  return [loading, error]
}

```

`useGetHairstyles` が独自フックとなります。
Reactの `useEffect` を用いてコンポーネントのマウント時に非同期処理を実行します。
独自フックから非同期処理の状態を呼び出し元のコンポーネントに返すことで、非同期処理の状態に応じたコンポーネントの出し分けを実装しています。
非同期処理のためのAPIクライアントはRepositoryパターンを用いて設計しているのと、エラーハンドリングにも工夫をしているため、ここについて詳しく説明します。

### Repositoryパターン

Reactにおいて、APIリクエストをする場合は[axios](https://github.com/axios/axios)などのライブラリを使用することが多いと思います。
この時、コンポーネントからデータソースへのアクセスロジックを切り離し隠蔽した上で、コンポーネントからこれらの実装を意識しなくても良い設計とすべきです。
このような設計において有効なデザインパターンがRepositoryパターンです。
実際に、Repositoryパターンを使用して、APIクライアントを実装してみます。

まずは、axiosを用いてAPIリクエストのコネクションを張る処理を共通化するクラスを作成します。
APIリクエストの設定値に関する処理はこのクラスに集約します。

```plain text
// models/repository.ts
export class Repository {
  private static connection(): AxiosInstance {
    return axios.create({
      baseURL: 'https://example.com',
      timeout: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public static async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const connection = this.connection()
    const response: AxiosResponse = await connection.get<T>(path, config)
    return response.data
  }
}

```

次に、上記のクラスを用いて得たAPIのレスポンスデータを、それぞれのエンティティに落とし込むクラスを用意します。
以下は、髪型のリストデータをAPIで得てエンティティに落とし込む例です。

```plain text
// models/hairstyle/repository.ts
export const HairstyleRepository: IRepository = {
  async getHairstyles(): Promise<HairstyleEntities> {
    const hairstyles = await Repository.get<HairstylesSchema>('/v1/hairstyles')

    const hairstyleEntities = hairstyles.map((hairstyle: HairstyleSchema) =>
      new HairstyleEntity(hairstyle)
    )

    return hairstyleEntities
  }
}

```

`Repository.get` する際にGenericsでレスポンスデータの型を指定することで、レスポンスデータがJSONであってもきちんと型チェックを行います。

```plain text
// models/hairstyle/schema.ts
export type HairstylesSchema = {
  hairstyles: HairstyleSchema[]
}

export type HairstyleSchema = {
  id: string
  name: string
  image_url: string
}

```

そして、エンティティは以下のようになります。

```plain text
// models/hairstyle/entity.ts
export class HairstyleEntity {
  id: string
  name: string
  imageUrl: string

  constructor(
    args: HairstyleSchema
  ) {
    this.id = args.id
    this.name = args.name
    this.imageUrl = args.image_url
  }
}

```

これで `HairstyleRepository.getHairstyles()` によって、コンポーネントからデータソースへのアクセスロジックを意識せずに、APIによるデータの取得ができるようになりました。
ただ、この実装はレスポンスのエラーハンドリングができていません。
次は、このエラーハンドリングについて見ていきます。

### エラーハンドリング

エラーハンドリングにおいても、APIリクエストの実装者からはシンプルになるように設計を行います。
エラーを扱う時に実装者からはHTTPであることや、サーバエラーなのか、クライアントエラーなのか、といったことは意識しなくても良いことを目指しました。

実際の実装を見ていきます。`axios.get` はレスポンスエラーの場合は例外を投げるため、`axios.get` の例外をcatchしエラー用のオブジェクトでくるんで `Repository.get` の2つ目の返り値で返すようにします。

```plain text
// models/repository.ts
export class Repository {
  public static async get<T>(path: string, config?: AxiosRequestConfig): Promise<[T, null] | [null, RpcError]> {
    const connection = this.connection()

    try {
      const response: AxiosResponse = await connection.get<T>(path, config)
      return [response.data, null]
    } catch(error) {
      if (error.response) {
        return [null, RpcError.buildFromHttpResponse(error.code, error.response.data.display_message)]
      } else {
        return [null, RpcError.buildCancelled()]
      }
    }
  }
}

```

この時気をつけるべきことは `error.response` の中身です。
axiosはHTTPで表現できるサーバエラーの場合は、catchした `error.response` でステータスコードなどを取得できます。
ただし、タイムアウトなどのクライアントエラーは `error.response` がnullとなります。
この `error.response` がnullの場合も、きちんとオブジェクトで表現して実装者は意識しないようにしたいです。
よって、このサーバエラーとクライアントエラーを1つのオブジェクトで表現するために、RPCのようにエラーを表現してみました。
gRPCのエラーコードを参考に、HTTPのステータスコードをgRPCのエラーコードに置き換え、クライアントエラーはgRPCでいうところのCANCELLEDとして扱うようにしました。

参考 : [https://github.com/googleapis/googleapis/blob/2433bd50656264a2ef9f684bf646fb4d250d39ff/google/rpc/code.proto](https://github.com/googleapis/googleapis/blob/2433bd50656264a2ef9f684bf646fb4d250d39ff/google/rpc/code.proto)

以下が実際のコードです。HTTPとgRPCの対応は今回のサーバが返すステータスコードのみ表現しています。

```plain text
// models/rpcError.ts
enum RpcCode {
  OK,
  CANCELLED,
  UNKNOWN,
  INVALID_ARGUMENT,
  DEADLINE_EXCEEDED,
  NOT_FOUND,
  ALREADY_EXISTS,
  PERMISSION_DENIED,
  RESOURCE_EXHAUSTED,
  FAILED_PRECONDITION,
  ABORTED,
  OUT_OF_RANGE,
  UNIMPLEMENTED,
  INTERNAL,
  UNAVAILABLE,
  DATA_LOSS,
  UNAUTHENTICATED,
}

export class RpcError {
  constructor(public code: RpcCode, public message: string) {
  }

  static buildCancelled(message?: string) {
    return new RpcError(RpcCode.CANCELLED, message || '予期せぬエラーが発生しました。時間を置いてもう一度お試しください。')
  }

  static buildFromHttpResponse(status: number, message: string) {
    let code: RpcCode

    switch (status) {
      case 500:
        code = RpcCode.UNKNOWN
        break
      case 400:
        code = RpcCode.INVALID_ARGUMENT
        break
      case 504:
        code = RpcCode.DEADLINE_EXCEEDED
        break
      case 404:
        code = RpcCode.NOT_FOUND
        break
      case 409:
        code = RpcCode.ALREADY_EXISTS
        break
      case 403:
        code = RpcCode.PERMISSION_DENIED
        break
      case 401:
        code = RpcCode.UNAUTHENTICATED
        break
      case 429:
        code = RpcCode.RESOURCE_EXHAUSTED
        break
      case 503:
        code = RpcCode.UNAVAILABLE
        break
      default:
        code = RpcCode.UNKNOWN
    }

    return new RpcError(code, message)
  }
}

```

これによって、エラーを扱う実装者からはエラーコードとエラーメッセージだけを意識すれば良いようになりました。

以上がSPAの設計で注力した点です。
これらによって、どこにコードを書けばいいのか、どのようにコンポーネントを組み上げればいいのか、非同期処理はどう実装すべきか、といった悩みが減りSPA未経験者もスムーズに開発に迎え入れることができたと思います。

# おわりに

髪型別コーデ検索におけるSPA開発の技術選定や設計について紹介しました。
SPAに興味がある皆さんの参考になれば幸いです。

ZOZOテクノロジーズでは、一緒にサービスを作り上げてくれる方を募集中です。
ご興味のある方は、以下のリンクからぜひご応募ください。

## [採用情報 - 株式会社ZOZOテクノロジーズ](https://tech.zozo.com/recruit/)

ZOZOテクノロジーズでは一流を目指すエンジニア・デザイナーを募集しています。ZOZOTOWNやWEARの開発・デザイン・分析など制作業務全般を担います。

[ tech.zozo.com](https://tech.zozo.com/recruit/)

[tech.zozo.com](https://tech.zozo.com/recruit/)