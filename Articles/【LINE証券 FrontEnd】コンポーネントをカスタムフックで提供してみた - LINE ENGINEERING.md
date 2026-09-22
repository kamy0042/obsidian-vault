---
Created: 2021-01-15T18:11:00
URL: https://engineering.linecorp.com/ja/blog/line-securities-frontend-3/
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
こんにちは。フィナンシャル開発センターの鈴木です。LINE証券のフロントエンドを担当しています。

[以前の記事](https://engineering.linecorp.com/ja/blog/line-securities-frontend-1/)でご紹介した通り、LINE証券ではReactを使用しています。React 16.8で導入された**フック**の機能は非常に革新的で、特に**カスタムフック**の概念によってReactにおけるコンポーネント設計は大きく様変わりしました。我々もフック時代のコンポーネント設計を試行錯誤しており、その結果はLINE証券にも反映されています。

この記事では、その中でも我々が最近ハマっている「**カスタムフックを通じてコンポーネントを提供する**」という、いわば**“render hooks”**とも言うべき設計パターンを紹介します。

## 今回のお題

今回は、「いくつかのチェックボックスがあり、全部チェックを入れると次に進める」という典型的なパターンを題材にしましょう。次の画像では3つのチェックボックスと「次へ」ボタンが並んでおり、チェックボックスは2つしかチェックされていないため「次へ」ボタンは非活性化されています。このボタンは、チェックを全て入れると押せるようになります。

![](https://engineering.linecorp.com/wp-content/uploads/2020/07/checkbox.png)

これを最も素直にReactで実装すれば、次のようになります。ここではuseStateを用いてcheckListというステートを宣言しており、これは真偽値（boolean）の配列です。この配列の一つの要素が一つのチェックボックスに対応しています。

```plain text
 const labels = ['check 1', 'check 2', 'check 3']
 
const App: React.FunctionComponent = () => {
  const [checkList, setCheckList] = useState([false, false, false])
 
  // index番目のチェック状態を反転させる
  const handleCheckClick = (index: number) => {
    setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)))
  }
 
  const isAllChecked = checkList.every((x) => x)
 
  return (
    <div>
      <ul>
        {labels.map((label, idx) => (
          <li key={idx}>
            <label>
              <input
                type='checkbox'
                checked={checkList[idx]}
                onClick={() => handleCheckClick(idx)}
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
      <p>
        <button disabled={!isAllChecked}>次へ</button>
      </p>
    </div>
  )
} 
```

ここで、例えばスタイルを再利用するなどの目的で、チェックボックスが並んでいる部分をコンポーネントに切り出して再利用可能にしたくなった場合を考えてみてください。これが今回取り組む問題です。

## 普通にコンポーネントを分割する

普通にコンポーネントを分割すると、以下のような<Checks />コンポーネントを作ることになるでしょう。このコンポーネントはラベルの一覧であるlabelsと、現在のチェック状態の一覧であるcheckList、そしてチェック状態が変更された場合のハンドラであるonCheckを持ちます。

```plain text
 type Props = {
  checkList: readonly boolean[]
  labels: readonly string[]
  onCheck: (index: number) => void
}
 
export const Checks: React.FunctionComponent<Props> = ({
  checkList,
  labels,
  onCheck
}) => {
  return (
    <ul>
      {labels.map((label, idx) => (
        <li key={idx}>
          <label>
            <input
              type='checkbox'
              checked={checkList[idx]}
              onClick={() => onCheck(idx)}
            />
            {label}
          </label>
        </li>
      ))}
    </ul>
  )
} 
```

このChecksコンポーネントを使う側はこのようになります。

```plain text
 const labels = ['check 1', 'check 2', 'check 3']
 
const App: React.FunctionComponent = () => {
  const [checkList, setCheckList] = useState([false, false, false])
 
  // index番目のチェック状態を反転させる
  const handleCheckClick = (index: number) => {
    setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)))
  }
 
  const isAllChecked = checkList.every((x) => x)
 
  return (
    <div>
      <Checks
        checkList={checkList}
        labels={labels}
        onCheck={handleCheckClick}
      />
      <p>
        <button disabled={!isAllChecked}>次へ</button>
      </p>
    </div>
  )
} 
```

こうすると、確かにコンポーネントが分割できましたが、まだ理想的ではありません。今の状況を図で表してみるとこのようになります。

![](https://engineering.linecorp.com/wp-content/uploads/2020/07/usechecks-fig-1-1024x385.png)

もともと、Appコンポーネントは5つの構成要素を持っていました。すなわち、checkListというステート、handleCheckClickというイベントハンドラ、isAllCheckedを計算する部分、チェックボックスたちを描画する部分、そしてそれ以外を描画する部分です。Checksコンポーネントを分離することでAppから消えたのは、このうちチェックボックスを描画するという機能だけです。残りの4つは依然としてAppに残ったままであり、再利用できません。

特に、checkListという状態が依然としてChecksではなくAppに保持されているということは注目に値します。その理由は、Appが「次へ」ボタンのdisabled属性を計算しなければいけないからです。これが図でいうisAllCheckedの部分であり、これはcheckListから計算されます。そのため、必然的にcheckListもAppが持つ必要があるのです。Checksの中にcheckListというステートを入れてしまうと、全てチェックされたときにAppがそれを検知することができません。もちろん、Checksが“onAllChecked”のようなイベントハンドラを提供することは可能ですが、それは望ましい解決策ではありません。なぜなら、そうするとAppがisAllCheckedを別途ステートとして持つことになり、同じ情報に対する二重管理が発生してしまうからです。

しかし、Appの関心は本来「全てチェックされたかどうか」だけにあり、どれがチェックされているのかという情報の管理はChecksに任せたいはずです。本来あるべき姿よりもAppが肥大化してしまうこと、これが普通のコンポーネント分割において発生する問題です。

## カスタムフックによる解決

ここで登場するのが**カスタムフック**です。カスタムフックは、コンポーネント分割とは異なり、**コンポーネントのロジック自体の分割・再利用**を行うことができます。今回の例の場合、checkListというステートはAppから動かすことができませんでしたが、カスタムフックを用いてAppに属するロジックを切り出すことはできるのです。

そして、この記事の肝は「Checksを使う」ということ自体をカスタムフックの中に動かしてしまうということです。これを実現したカスタムフックuseChecksの実装を見てみましょう。

```plain text
 type UseChecksResult = [boolean, () => JSX.Element]
 
export const useChecks = (labels: readonly string[]): UseChecksResult => {
  const [checkList, setCheckList] = useState(() => labels.map(() => false))
 
  const handleCheckClick = (index: number) => {
    setCheckList((checks) => checks.map((c, i) => (i === index ? !c : c)))
  }
 
  const isAllChecked = checkList.every((x) => x)
 
  const renderChecks = () => (
    <Checks checkList={checkList} labels={labels} onCheck={handleCheckClick} />
  )
 
  return [isAllChecked, renderChecks]
} 
```

このuseChecksというカスタムフックは、チェックボックスの定義（string[]）を受け取り、「それらをラベルとするチェックボックスたちを管理する」というロジックを内包します。返り値としては、「全てチェックされているか」と「チェックボックスたちをレンダリングする関数」を返します。これを用いるとAppコンポーネントはこのようになります。

```plain text
 const App: React.FunctionComponent = () => {
  const [isAllChecked, renderChecks] = useChecks(labels)
 
  return (
    <div>
      {renderChecks()}
      <p>
        <button disabled={!isAllChecked}>次へ</button>
      </p>
    </div>
  )
} 
```

これ以上なくシンプルですね。この状態を図で表すと、次のようになります。

![](https://engineering.linecorp.com/wp-content/uploads/2020/07/usechecks-fig-2-1024x462.png)

図のように、checkListというステートとhandleCheckClick関数がuseChecksの中に閉じ込められて、Appからは全く見えなくなりました。これはrenderChecks関数をuseChecksの内部で作ることにより可能になっています。また、isAllCheckedの計算もuseChecksの内部に移っています。

一方、AppはuseChecksの返り値としてisAllCheckedとrenderChecksを受け取るようになりました。これにより、Appの責務がとても明確になります。すなわち、「チェックボックス一覧を適切な場所に描画すること」、「チェックボックス以外の部分を描画すること」、そして「チェックボックスが全てチェックされているかどうかに応じて表示を変えること」です。今回作ったuseChecksは呼び出し元にちょうどその情報だけを与えるように設計されています。そして、チェックボックスを描画するに当たって共通化できる部分はきれいにuseChecksの中に移っています。

フックがrender関数を返すというのが見慣れないかもしれませんが、「チェックボックスを適当な位置に配置する」ということだけはAppの役目として残っていますから、このインターフェースが理に適っていますね。また、ChecksコンポーネントがAppから直接見えないという点も魅力的です。

ひとつ注意いただきたい点は、ここでサンプルとして提示したuseChecksは少し実装が雑だという点です。具体的には、入力のlabelsが後から変化した場合に対応できません。useChecksをより再利用可能なものにするためには、さらにこの点の対応を加える必要があります。この記事ではポイントを絞って伝えるため省きました。

## まとめ

この記事では、コンポーネント（をレンダリングする関数）を提供するカスタムフックを用いてロジックを分割する方法を紹介しました。カスタムフックは、コンポーネントを分割することなくロジックのみを再利用な形で切り出しカプセル化することができるのが面白い点です。この記事の例ではcheckListというステートは結局Appに属したままですが、そのことがuseChecksの中に隠蔽され、Appの実装は本当に興味のあるロジックにのみ集中することができています。これを活用して最大限簡潔なインターフェースを提供するためには、コンポーネントをレンダリングする関数をフックの返り値として提供するというテクニックが有効です。

この記事は[**【LINE証券 FrontEnd】**](https://engineering.linecorp.com/ja/blog/tag/%e8%a8%bc%e5%88%b8%e3%83%95%e3%83%ad%e3%83%b3%e3%83%88%e3%82%a8%e3%83%b3%e3%83%89/)シリーズの3番目の記事です。今後もLINE証券メンバーがフロントエンドにまつわるトピックをお届けします。お楽しみに。

【採用情報】

- フロントエンドエンジニア / LINE Financial / 証券 [https://linecorp.com/ja/career/position/1102](https://linecorp.com/ja/career/position/1102)
- フロントエンドエンジニア / フロントエンド開発センター　[https://linecorp.com/ja/career/position/475](https://linecorp.com/ja/career/position/475)

[\#Fintech](https://engineering.linecorp.com/ja/blog/tag/fintech-ja/) [\#frontend](https://engineering.linecorp.com/ja/blog/tag/frontend-ja/) [\#LINE証券](https://engineering.linecorp.com/ja/blog/tag/line%e8%a8%bc%e5%88%b8/) [\#証券フロントエンド](https://engineering.linecorp.com/ja/blog/tag/%e8%a8%bc%e5%88%b8%e3%83%95%e3%83%ad%e3%83%b3%e3%83%88%e3%82%a8%e3%83%b3%e3%83%89/)