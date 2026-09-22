---
Created: 2024-01-20T16:55:00
URL: https://zenn.dev/yhase_rqp/articles/afa768d564a78c
Tags: [topic/デザインシステム/コンポーネント設計]
---
UIコンポーネントにUI以外の知識、すなわちデータロジック等のドメイン知識を入れないで欲しいという話をします。

# UIコンポーネントの定義

ここで「UIコンポーネント」は、UIデザインのみを表した汎用的に使い回せるコンポーネントであると定義します。

例えばMUIやChakra UIにあるものはUIコンポーネントであり、それらを使って「ユーザリスト」「特別CTA用ボタン」という特定の機能を作った場合はUIコンポーネントではないという前提です。(言葉の使い方として合っているだろうか微妙ですが、ニュアンスで何となく掴んでください...)

! 以後、サンプルコードはスタイリングにTailwind CSSを使っていますが、短く書けるからという理由で採用しており特別な意味はないです。

# 抽象化を間違う例

ここから(実話ベースですが)仮のお話で例えます。学生のデータを何でも管理する万能ダッシュボードの実装にアサインされたフロントエンドエンジニアA君が居ました。デザインを確認しにFigmaを開くと、このように単一の数値を見せるUIが共通しているようです。

![[cf335c47e9a3-20221115.png]]

A君は初めにカロリー表示機能に取り掛かります。APIのデータモデルは既にあるので、

- データを受け入れる
- それらをデザインに合わせてスタイリングする

と考えて進めれば無事に完了しました。

```plain text
type Calorie = {
  category: string
  number: string
}

type CalorieStatProps = {
  calorie: Calorie
}

function CalorieStat(props: CalorieStatProps) {
  return (
    <dl className="inline-block w-36 rounded-md border border-solid border-gray-200 p-4">
      <dt className="text-xs text-gray-400">{props.calorie.category}</dt>
      <dl className="mt-2 text-2xl font-bold">
        {props.calorie.number}
        <span className="ml-1 text-sm">kcal</span>
      </dl>
    </dl>
  )
}

```

```plain text
<CalorieStat calorie={{ category: '消費カロリー', number: '1,234' }} />

```

次に成績表示も同様の流れで実装しました。やや直感的じゃないなと感じつつクリア。

```plain text
type Grade = {
  subject: string
  term: number
  score: number
  full_score: number
}

type GradeStatProps = {
  grade: Grade
}

function GradeStat(props: GradeStatProps) {
  return (
    <dl className="inline-block w-36 rounded-md border border-solid border-gray-200 p-4">
      <dt className="text-xs text-gray-400">
        {props.grade.subject} ({props.grade.term}学期)
      </dt>
      <dl className="mt-2 text-2xl font-bold">
        {props.grade.score}
        <span className="ml-1 text-sm">点 / {props.grade.full_score}</span>
      </dl>
    </dl>
  )
}

```

```plain text
<GradeStat
  grade={{ subject: '国語', term: 1, score: 85, full_score: 100 }}
/>

```

A君は、今度は生徒の身長・年齢・体重をまた同じデザインで実装するように伝えられます。もう何度同じコードを書かなければいけないのかと思うとうんざりします...。また、新規に入ったB君も同じ愚痴を言っていました。

一体何が問題だったのかというと、地獄の門は最初の方針で既に開いてしまっていました。

! 今回の例はあまりにシンプルなため弊害が想像しづらいかもしれません。現実的にはリスト、テーブル、グリッド、タブといったものが近い題材です。

# 抽象化が正しい例

前章における問題はデータの確認から一直線に突っ走って表示さえ良ければOKという姿勢です。

システムの根幹となるUIがあるとき、それを抽象化しないと設計を怠ったも同然であり、バックエンドでDB接続からAPI出力までを一纏めに書く行為と同じくらい重大です。(たまにそれをやりたくなる場合もありますが...)

つまり、次のようなコンポーネントになるでしょう。

```plain text
type StatProps = {
  label: React.ReactNode
  value: React.ReactNode
  unit: React.ReactNode
}

function Stat(props: StatProps) {
  return (
    <dl className="inline-block w-36 rounded-md border border-solid border-gray-200 p-4">
      <dt className="text-xs text-gray-400">{props.label}</dt>
      <dl className="mt-2 text-2xl font-bold">
        {props.value}
        <span className="ml-1 text-sm">{props.unit}</span>
      </dl>
    </dl>
  )
}

```

```plain text
<Stat label="消費カロリー" value="1,234" unit="kcal" />
<Stat label="国語 (1学期)" value={85} unit="点 / 100" />

```

その上で更にデータモデルのマッピングを抽象化したい場合は上で実装したものを呼び出します。こうすることでコードが何に依存しているかが正しく目に見えるようになり改善されます。

```plain text
type CalorieStatProps = {
  calorie: Calorie
}

function CalorieStat(props: CalorieStatProps) {
  return (
    <StatRoot>
      <StatLabel>{props.calorie.category}</StatLabel>
      <StatValue>
        {props.calorie.number}
        <StatUnit>kcal</StatUnit>
      </StatValue>
    </StatRoot>
  )
}

```

```plain text
<CalorieStat calorie={{ category: '消費カロリー', number: '1,234' }} />

```

# 実装タイプ別: モノリシックvs合成

先ほど実装したStatコンポーネントは拡張性に乏しいデメリットがあります。もし数字だけの色を変えたい、アクセントカラーのバリエーションを作って欲しい、数字をリンクにしたい、ラベル無しVerが欲しいetc...という変化に対応するときは内部実装に手を加えるのが億劫です。

ここでUIコンポーネントの実装は2タイプに分けられると思っています。簡単だが拡張性に乏しい「モノリシックタイプ」と、やや手間だが拡張性に優れた「合成タイプ」です。

! 英語圏で「Compound components」は既に使われるキーワードですが、定義が違っているかもしれないので一応日本語で...

モノリシックは既に実装したので合成のパターンを次に示します。(長いのでアコーディオンで)

コンポーネント

```plain text
// ----------------------------------

type StatRootProps = React.ComponentPropsWithRef<'dl'>

type StatRootRef = HTMLDListElement

const StatRoot = React.forwardRef<StatRootRef, StatRootProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <dl
      className={clsx(
        'inline-block w-36 rounded-md border border-solid border-gray-200 p-4',
        className
      )}
      {...rest}
      ref={ref}
    />
  )
})

StatRoot.displayName = 'StatRoot'

// ----------------------------------

type StatLabelProps = React.ComponentPropsWithRef<'dt'>

type StatLabelRef = HTMLElement

const StatLabel = React.forwardRef<StatLabelRef, StatLabelProps>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <dt
        className={clsx('text-xs text-gray-400', className)}
        {...rest}
        ref={ref}
      />
    )
  }
)

StatLabel.displayName = 'StatLabel'

// ----------------------------------

type StatValueProps = React.ComponentPropsWithRef<'dd'>

type StatValueRef = HTMLElement

const StatValue = React.forwardRef<StatValueRef, StatValueProps>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <dd
        className={clsx('mt-2 text-2xl font-bold', className)}
        {...rest}
        ref={ref}
      />
    )
  }
)

StatValue.displayName = 'StatValue'

// ----------------------------------

type StatUnitProps = React.ComponentPropsWithRef<'span'>

type StatUnitRef = HTMLSpanElement

const StatUnit = React.forwardRef<StatUnitRef, StatUnitProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <span className={clsx('ml-1 text-sm', className)} {...rest} ref={ref} />
  )
})

StatUnit.displayName = 'StatUnit'

```

利用側

```plain text
<StatRoot>
  <StatLabel>消費カロリー</StatLabel>
  <StatValue>
    1,234
    <StatUnit>kcal</StatUnit>
  </StatValue></StatRoot>

```

合成タイプのポイントは以下です。この方針を守ることで、やや実装は長くなりますが堅牢性にも柔軟性にも優れたコンポーネントが出来上がります。

- マークアップ構造を可視化し、より単一責務にする
- スタイルだけ受け継いだHTMLを組み立てて作る

## 補足

### Context

実はこのままでは「StatLabelがStatRootの外側に置けてしまう」という問題があり、これにはuseContextAPIで対応できます。今回は説明を省きますが、ライブラリレベルの堅牢性を持たせるなら有用です。

### 名前空間

以下のように特定の名前空間を持たせる方法も大変有名で、かつ個人的に好きです。実装方法にもいくつかパターンがあり話題が膨れ上がるので、ここでは説明は省きます。

```plain text
<Stat>
  <Stat.Label>消費カロリー</Stat.Label>
  <Stat.Value>
    1,234
    <Stat.Unit>kcal</Stat.Unit>
  </Stat.Value></Stat>

```

### Styled API

前に出てきた「スタイルだけ受け継いだHTML」をすごく簡単に作れる方法...が実はあります。Styled components, Emotionの一部, Stitchesに見られるStyled APIです。

このAPIはUIコンポーネントライブラリ開発には特化レベルに向いていますが、当然ながらWeb開発の全てがUIコンポーネントの量産である訳ではありません。Styled系には独特の癖があるので、功罪をよく吟味してからプロジェクトに採用してください。

参考記事はこちら:

# 常にこうするべき？

程度によります。

## ドメイン知識を含たほうが良い例

充分に特定の業務ロジックでしか使われない、ある程度のサイズや具体度を持ったコンポーネント。

- UserGradeDashboard
- UserDetailScreen
- UserProfile

## ドメイン知識をなるべく含めないほうが良い例

業務ロジックを抜きに独立しても存在できる可能性が高いコンポーネント、一定の業務ロジックと関連しているが、複数の画面で横断的に使われるコンポーネント。

- Timeline
- MediaCard
- PostCard
- UserInfoWithAvatar

## ドメイン知識を絶対に含めるべきではない例

アプリケーション全体で使われる、特定の業務ロジックを全く持たない汎用的なコンポーネント。

- Button
- Table
- Avatar
- Heading
- ...

つまり、UIライブラリにある系統のものです。

## 備考

多分Atomic Designで説明は付きますが、あまり頼り切るのも好きではないのでそれらの用語は使わないで述べました。