---
Created: 2021-01-03T01:17:00
URL: https://qiita.com/Takepepe/items/41e3e7a2f612d7eb094a
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
「経年劣化に耐えるコード」というのは、だれもが目指すものでしょう。「そもそもフロントエンドのコードは、今ある技術で最良のものを書き捨てるべき」という意見も理解できますが「備えあれば憂いなし」ということもありますので、ここにメモを残します。あくまで、私なりのベストプラクティスですのでご了承ください。

# 5層に別れた SFC

私はレイヤーによる技術の分離で、ReactComponent の経年劣化に備えています。ここでいうSFCとは「Stateless Functional Component」の略称ではありません。Vue.js の文脈にある「Single File Component」を指します。

`// (1) import層
import React from 'react'
import styled from 'styled-components'
// (2) Types層
type ContainerProps = {...}
type Props = {...} & ContainerProps
// (3) DOM層
const Component: React.FC<Props> = props => (...)
// (4) Style層
const StyledComponent = styled(Component)`...`
// (5) Container層
const Container: React.FC<ContainerProps> = props => {
  return <StyledComponent {...props} />
}`

記述順は「依存関係の上流下流」に従います。import や型定義が上流工程であることは言うまでもないので省略、重要なのは(3)〜(5)を構成するレイヤーです。

# 技術の分離

なぜこの区分になっているのか、なぜこの書式になっているのか、ひとつずつ解説していきます。

### (3) DOM層

`const Component: React.FC<Props> = props => (
  <div className={props.className}>
    <button onClick={props.handleClick}>
      {props.flag ? 'click me' : 'CLICK ME'}
    </button>
  </div>
)`

JSX(TSX)は、React のためだけのものではなく、他ライブラリでも利用される技術です。そのため、React に依存する Hooks API などはここから取り除いています。`return` を用いない記法（`props => (...)`）にすることで、Hooks API の介入を阻みます。この純粋な TSX にはビジネスロジックが無く、`Array.map`や真偽値による出し分け程度です。「ボタンを押下された事で何が発生するのか？」という知識も存在しません。**ここは副作用のない、真に Stateless なレイヤーです。**この`const Component`だけを抜き出し（export）した場合、テストのしやすさは想像に易いでしょう。

### (4) Style層

`const StyledComponent = styled(Component)`
> button {...}
``

React CSS in JS のメジャーどころとして、styled-components がまず挙がると思いますが、Style層もあくまで CSS の話です。styled-components が解決している名前空間の解決は、BEM(MindBEMding)が解決したことと同じです。テンプレート文字列に記述されたCSSは、BEM にフォールバックしたり、CSS Modules に移行しても成立する記述となっています。私が styled-components の`styled.div`や`styled.button` を敬遠している理由はここにあります。`>`による、children への指定漏洩防御も忘れない様にします。

BEM へのフォールバックはまれなケースかと思いますが、部分的に React を表示している様な折衷 html では、この切り分けが生きてきます。

### (5) Container層

`const Container: React.FC<ContainerProps> = props => {
  const [flag, setFlag] = React.useState(false)
  const handleClick = React.useCallback(() => {
    setFlag(!flag)
  }, [flag])
  return (
    <StyledComponent
      {...props}
      flag={flag}
      handleClick={handleClick}
    />
  )
}`

Redux の経験がある方なら、PresentationalComponent / ContainerComponent というワードに馴染みがあるでしょう。Redux のコードベースには、Store に connect するコンポーネントとして、ContainerComponent という区分が明確にあります。これは React Hooks 全盛期のいまでも、踏襲すべきベストプラクティスであると私は考えています。**ここは Stateful なレイヤーであり「依存の注入」を行う場所でもあります。**

- useState による状態管理が、Redux Store へ移行することになった
- Storybook の為に、モックを注入する層に差し替えたい
- テストの為に、モックを注入する層に差し替えたい

もしこのレイヤーに、`useEffect`を利用した fetch 処理が介入していたとしても、Storybook やテストにおいては、代替 Container を用意すれば良いわけです。

(1)〜(4)は、ここの都合による影響を受けることがありません。Hooks か？ Redux か？ GraphQL か？ という配慮も当然不要なものとなります。`**(3) DOM層**`**から知識を剥奪することが重要な理由はこれに起因します。**

この様に「賢いレイヤー」を分離することで生まれるメリットは、依存注入技術の差し替えだけではなく、ビジネスロジックの移行（純関数の切り出し・Hooks から Redux への状態移譲）も容易にします。「Hooks API が過去のものになる…」という杞憂は当分先の話かと思いますが、将来の変化への備えとしては十分でしょう。