---
Created: 2021-09-14T13:32:00
URL: https://zenn.dev/berlysia/articles/5dfa58f282aa14
Tags: [topic/技術/React]
---
この記事は 2021 年 9 月、React v17 相当時点での情報に依存しています。

React の Suspense による非同期処理は未だ Experimental な機能ですが、いくつかのデータフェッチ系ライブラリや状態管理ライブラリのインターフェースでサポートされています。

# 公式ドキュメントに例示された実装

Suspense を利用するときのエラー処理には、公式ドキュメントで [`ErrorBoundary`](https://ja.reactjs.org/docs/concurrent-mode-suspense.html#handling-errors)[ を使う事例](https://ja.reactjs.org/docs/concurrent-mode-suspense.html#handling-errors) が紹介されています。「データ取得のエラーの処理はレンダーのエラーと同様に動作」することに由来しています。

# エラーレポートと一緒に使うと困る

Sentry 等のエラーレポートサービスを利用していて、データ取得の準正常系にあたるエラーは検知したくないが、実行時エラーのような異常系は検知したいときに、この例示を素朴に採用するのでは困ることに気づきました。

ところで、ErrorBoundary は開発モードの React では catch したエラーを rethrow します。開発ビルドでエラーレポートを動作させているときはこの挙動に注意しましょう。 `@sentry/react` の `ErrorBoundary` を使うのであれば、 `onError` などで注意喚起のメッセージを含めておくと便利です。

## throw されたオブジェクト・失敗を区別したくなっている

もともとデータ取得の処理は、昨今の実装であれば Promise や類似の能力を持つ道具（Observable や、懐かしいコールバックスタイルなど）が用いられます。このときエラー処理は、それぞれの道具に用意された表現（Promise の reject、コールバックスタイルは引数にエラーが渡されるなど）の上で行うことになります。レンダー時の実行時エラーとは別の方法でエラー処理が行われているのです。

さて Suspense で非同期処理を実装すると、非同期処理におけるエラーが Promise としてではなく、レンダリング時に同期的に throw するようになります。この変化により、暗黙に区別されていたデータ取得のエラーが実行時エラーと混ざるようになって、上述のような困りごとが生じていると言えます。この見方に立つと、エラーを区別する方法を成立させればよいことになります。

# ErrorBoundary で応答するエラーを区別するパターン

## 道具の用意

今後いくつかの ErrorBoundary を定義していくにあたり、後に示す `BaseErrorBoundary` を使って、次のように定義できるようにします。

このような実装には、自前でなく [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) あたりを利用しても良いでしょう。

```plain text
const SpecializedErrorBoundary = ({ children }) => (
  <BaseErrorBoundary
    onError={(error) => console.error(error)}
    fallbackRender={(error) => {
      if (isTargetObject(error)) return <>fallback</>;
      throw error;
    }}
  >
    {children}
  </BaseErrorBoundary>
);

```

```plain text
import React from "react";

interface Props {
  onError?: (err: unknown) => void;
  fallbackRender: (err: unknown) => React.eactNode;
}
type State = { caught: unknown | null };

export class BaseErrorBoundary extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      caught: null,
    };
  }

  static getDerivedStateFromError(caught: unknown) {
    return { caught };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    this.props.onError?.(error);
  }

  render() {
    const { caught } = this.state;
    if (caught) {
      return this.props.fallbackRender(caught);
    }
    return this.props.children;
  }
}

```

### ReportingErrorBoundary

エラーレポート用兼どうしようもないエラーの伝播を防ぐ、全ての throw された値に応答する ErrorBoundary を、 `ReportingErrorBoundary` として次のように定義します。

Sentry をご利用の方は [`@sentry/react`](https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/)[ の ](https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/)[`ErrorBoundary`](https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/) をイメージいただいて構いません。

```plain text
import React from "react";
import type { ReactNode } from "react";
import { BaseErrorBoundary } from "./BaseErrorBoundary";

export const ReportingErrorBoundary = ({
  children,
}: {
  children: ReactNode;
}) => (
  <BaseErrorBoundary
    onError={(error) => console.error("report", error)}
    fallbackRender={(error) => {
      // only for visualize
      if (error instanceof Error) {
        return (
          <>
            reported!!: {error.name}: {error.message}
          </>
        );
      }
      return <>reported!!: {JSON.stringify(error)}</>;
    }}
  >
    {children}
  </BaseErrorBoundary>
);

```

### Resource オブジェクト

Suspense での非同期処理で利用する素朴なデータ取得の表現として、次のような `Resource` オブジェクトを用意します。

面倒であれば（そして実用上多くの方はここから触れると思いますから）、 [react-query](https://react-query.tanstack.com/) や [SWR](https://swr.vercel.app/ja) のサスペンスモードを利用すると簡便です。

```plain text
type ResourceState<T, E> =
  | {
      status: "idle";
      value: null;
      promise: null;
      error: null;
    }
  | {
      status: "loading";
      value: null;
      promise: Promise<void>;
      error: null;
    }
  | {
      status: "success";
      value: T;
      promise: unknown;
      error: null;
    }
  | {
      status: "failure";
      value: null;
      promise: unknown;
      error: E;
    };

export class Resource<T, E> {
  #state: ResourceState<T, E>;

  #fetcher: () => Promise<T>;

  constructor(fetcher: () => Promise<T>) {
    this.#state = {
      status: "idle",
      value: null,
      promise: null,
      error: null,
    };
    this.#fetcher = fetcher;
  }

  #run(): Promise<void> {
    this.#state = {
      status: "loading",
      promise: this.#fetcher().then(
        (x) => {
          this.#state = {
            status: "success",
            promise: this.#state.promise,
            value: x,
            error: null,
          };
        },
        (x) => {
          this.#state = {
            status: "failure",
            promise: this.#state.promise,
            value: null,
            error: x,
          };
          throw x;
        }
      ),
      error: null,
      value: null,
    };
    return this.#state.promise;
  }

  read(): T {
    switch (this.#state.status) {
      case "idle": {
        throw this.#run();
      }
      case "loading": {
        throw this.#state.promise;
      }
      case "failure": {
        throw this.#state.error;
      }
      case "success": {
        return this.#state.value;
      }
    }
  }
}

```

## 応答するエラーを区別してみる

try-catch 文における rethrow と同様に、ErrorBoundary の `componentDidCatch` や `render` の中で throw すると、ErrorBoundary のレンダーを失敗させられます。ErrorBoundary でも rethrow ができるわけです。この方法で ErrorBoundary が応答するエラーを区別してみましょう。 `BaseErrorBoundary` の `fallbackRender` で与えた関数を throw させると、 `render` で throw したことになります。

fetch API を例にして、ステータスコードが 2xx ではないときにそのまま Response オブジェクトを throw するような、次の取得関数を考えます：

```plain text
async function myFetch(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) {
    throw res;
  }
  return res;
}

```

throw される値は、2xx 以外のステータスコードの場合は Response オブジェクトとなるので、次のような実装で、コンポーネント側のエラーをスルーして fetch の周りのエラーだけに応答する ErrorBoundary を作れます：

※このとき CORS エラーやネットワークエラーは TypeError として throw されるので、考慮できていないことに注意してください。

```plain text
import type { ReactNode } from "react";
import React from "react";
import { BaseErrorBoundary } from "./BaseErrorBoundary";

export const FetchErrorBoundary = ({
  children,
  fallbackRender,
}: {
  children: ReactNode;
  fallbackRender?: (res: Response) => ReactNode;
}) => (
  <BaseErrorBoundary
    fallbackRender={(error) => {
      if (error instanceof Response) {
        if (fallbackRender) return fallbackRender(error);
        return error.status;
      }
      throw error;
    }}
  >
    {children}
  </BaseErrorBoundary>
);

```

これを使って次のような実装をしてみると：

```plain text
import React, { Suspense } from "react";
import { Resource } from "./Resource";
import { ReportingErrorBoundary } from "./ReportingErrorBoundary";
import { FetchErrorBoundary } from "./FetchErrorBoundary";
import { myFetch } from "./myFetch";

const successResource = new Resource(() =>
  myFetch("https://httpbin.org/status/200")
);
function SuccessResource() {
  const res = successResource.read();

  return <>success: {res.status}</>;
}

const failureResource = new Resource(() =>
  myFetch("https://httpbin.org/status/404")
);
function FailureResource() {
  const res = failureResource.read();

  return <>success: {res.status}</>;
}

const failureResource2 = new Resource(() => myFetch("https://example.com/"));
function FailureResource2() {
  const res = failureResource2.read();

  return <>success: {res.status}</>;
}

function WoopsResource() {
  const res = successResource.read();

  return <>success: {res.invalid.access}</>;
}

export function App() {
  return (
    <div>
      <div>
        200 -&gt;
        <ReportingErrorBoundary>
          <FetchErrorBoundary>
            <Suspense fallback="loading...">
              <SuccessResource />
            </Suspense>
          </FetchErrorBoundary>
        </ReportingErrorBoundary>
      </div>
      <div>
        404 -&gt;
        <ReportingErrorBoundary>
          <FetchErrorBoundary>
            <Suspense fallback="loading...">
              <FailureResource />
            </Suspense>
          </FetchErrorBoundary>
        </ReportingErrorBoundary>
      </div>
      <div>
        CORS(TypeError) -&gt;
        <ReportingErrorBoundary>
          <FetchErrorBoundary>
            <Suspense fallback="loading...">
              <FailureResource2 />
            </Suspense>
          </FetchErrorBoundary>
        </ReportingErrorBoundary>
      </div>
      <div>
        実行時エラー -&gt;
        <ReportingErrorBoundary>
          <FetchErrorBoundary>
            <Suspense fallback="loading...">
              <WoopsResource />
            </Suspense>
          </FetchErrorBoundary>
        </ReportingErrorBoundary>
      </div>
    </div>
  );
}

```

次のような結果が得られます(in Chrome):

```plain text
200 ->success: 200
404 ->404
CORS(TypeError) ->reported!!: TypeError: Failed to fetch
実行時エラー ->reported!!: TypeError: Cannot read properties of undefined (reading 'access')

```

実行時エラーのような異常系だけを `ReportingErrorBoundary` に到達させた上で、準正常系と呼べるようなレスポンスに応じた表示の出し分けを `FetchErrorBoundary` に任せられたことがわかります。

念押しをしておくと、実際には `TypeError` は、お馴染みの `undefined` に対するプロパティアクセス時にも発生するので、この区別は実用に耐えませんが、コンセプトとしては十分示せていると思います。

補足として、たとえば[axios](https://github.com/axios/axios) では、reject されるときのエラーはネットワークエラーも含めて `AxiosError` と呼ばれるオブジェクトにまとめられています。このことから、ネットワークエラー由来ではない `TypeError` に応答しない `FetchErrorBoundary` 相当物を [`isAxiosError`](https://github.com/axios/axios#typescript) によって容易に得られます。

```plain text
import type { ReactNode } from "react";
import React from "react";
import axios from "axios";
import { BaseErrorBoundary } from "./BaseErrorBoundary";

export const AxiosErrorBoundary = ({ children }: { children: ReactNode }) => (
  <BaseErrorBoundary
    fallbackRender={(error) => {
      if (axios.isAxiosError(error)) {
        return (
          <>
            {error.name}: {error.message}
          </>
        );
      }
      throw error;
    }}
  >
    {children}
  </BaseErrorBoundary>
);

```

つまり axios と似たようなパターン、つまり fetch の失敗については独自のエラーオブジェクトにまとめ、そのエラーオブジェクトであることを判定できれば、同じことができます。

少し脱線をすると、複数の処理があって途中で失敗するようなシチュエーションにもこのパターンは適用でき、さらに [Error Cause](https://github.com/tc39/proposal-error-cause) が役立ちそうです。README から実装を引用して少し手を加えてみると、元のエラーの文脈を保持しながら処理全体の失敗をまとめて扱えることが見て取れます：

```plain text
class MyJobError extends Error {}

async function doJob() {
  const rawResource = await fetch("//domain/resource-a").catch((err) => {
    throw new MyJobError("Download raw resource failed", { cause: err });
  });
  const jobResult = doComputationalHeavyJob(rawResource);
  await fetch("//domain/upload", { method: "POST", body: jobResult }).catch(
    (err) => {
      throw new MyJobError("Upload job result failed", { cause: err });
    }
  );
}

const MyJobErrorBoundary = ({ children }: { children: ReactNode }) => (
  <BaseErrorBoundary
    fallbackRender={(error) => {
      if (error instanceof MyJobError) {
        return (
          <>
            {error.name}: {error.message}, cause(
            {error.cause.message})
          </>
        );
      }
      throw error;
    }}
  >
    {children}
  </BaseErrorBoundary>
);

```

## このパターンによる実装例

素朴なデータ取得とエラーレポートくらいの使い分けしかしないのであれば、応答するエラーオブジェクト専用の ErrorBoundary を作るパターンが無難ではないでしょうか。 上述した `ReportingErrorBoundary` `FetchErrorBoundary` を使って、次のような感じにすると雑に呼び出せます：

```plain text
import { Resource } from "./Resource";
import { ReportingErrorComponent } from "./ReportingErrorComponent";
import { FetchErrorComponent } from "./FetchErrorComponent";

const resource = new Resource(async () => 42);

function MyComponentContent() {
  const data = resource.read();

  return <div>{data}</div>;
}

function MyComponentError({ res }: { res: Response }) {
  return (
    <div>
      Error: {res.status} - {res.statusText}
    </div>
  );
}

export function MyComponent() {
  return (
    <ReportingErrorComponent>
      <FetchErrorComponent
        fallbackRender={(error) => <MyComponentError res={error} />}
      >
        <MyComponentContent />
      </FetchErrorComponent>
    </ReportingErrorComponent>
  );
}

```

もう少し粗く制御したい場合は `ReportingErrorComponent` はここには書かないというのも、選択肢かもしれません。

エラー時外観での CLS を徹底的に抑制したければ、 `ReportingErrorComponent` にも独自のフォールバックを与える必要が出てくるかもしれませんし、寸法を確保するのを更に親の要素に任せても良いと思いますが、どちらにしてもコンテンツ次第なので各自頑張ってください。

亜種を考えてみると、コンポーネントごとに個別にErrorBoundaryを書くようなこともできそうで、準正常系に対する要求が各所個別に細かいときには役立ちそうです。

# 非同期処理の失敗をそもそも throw させないパターン

ErrorBoundaryを準正常系の実装に使わないアプローチです。

JavaScript においては任意のオブジェクトを throw できてしまいます。
 TypeScript でも 4.4 以降では catch したオブジェクトが unknown として扱われるようになりましたが、その場合にはエラーを拡張するなどして `instanceof` で絞り込めるようにしておくと都合が良いです。しかしそもそも throw しなければ返り値の型として表現でき、また区別できるはずです。

単純には discriminated union であったり、Either や Result のような、処理の返り値に失敗の表現を持たせる方法により、このパターンが実現できます。

いま、次のような素朴な型 `Result<T, E>` を用意します：

```plain text
export type Ok<T, E> = {
  ok: true;
  value: T;
};

export type Err<T, E> = {
  ok: false;
  value: E;
};

export type Result<T, E> = Ok<T, E> | Err<T, E>;

```

次のような記述ができます：

```plain text
import type { Ok, Err, Result } from "./Result";
import { Resource } from "./Resource";

const resource = new Resource<Result<number, unknown>>(async () => ({
  ok: true,
  value: 42,
}));

function MyComponentContent() {
  const data = resource.read();

  if (!data.ok) {
    return <div>failed: {JSON.stringify(data)}</div>;
  }

  return <div>ok: {data.value}</div>;
}

export function MyComponent() {
  return (
    <ReportingErrorBoundary>
      <MyComponentContent />
    </ReportingErrorBoundary>
  );
}

```

ErrorBoundary で準正常系を書くのと比較して、より正常系実装の近くに準正常系を書けるようになりそうですが、そう単純でもありません。エラーの種類が多く出てくるような場合だと、この手法ではコンポーネント実装が肥大化しやすいです。結果的に別コンポーネントに書くことになって、Result のようなオブジェクトを導入する手間だけを取られることになりそうです。見た目の書き味に釣られず、よく考えたほうが良いでしょう。

# おわりに

ErrorBoundary を使う際には容易にエラーを区別したい需要が生じることを挙げ、その場合の実装パターンを 2 種類例示しました。ひとつは ErrorBoundary がエラーを区別できるようにする方法。もうひとつはそもそも throw することをやめてみる方法です。

どちらがよさそうかという話は実に状況によりそうです。結局のところエラー、というより処理の失敗というものが区別できれば目的は達成できます。既存実装の状況やチームの関心にあわせて、十分な道具を自分たちで整えるのが良いと思います。

他に有力そうなパターンが見いだせている方がいたら教えてください。

![[coinbox-dark 3.png]]

### Discussion

![[discussion 3.png]]