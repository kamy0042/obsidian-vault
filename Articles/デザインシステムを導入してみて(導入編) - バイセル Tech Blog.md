---
タグ: []
作成日時: 2022-09-01T14:53:00
URL: https://tech.buysell-technologies.com/entry/2022/08/31/180000
Tags: [topic/デザインシステム/導入事例]
---
### はじめに

テクノロジー戦略本部の酒井です。 私が現在携わっているプロダクトに「デザインシステム」を導入したため、今回はそのことについて話していきたいと思います。ですが、全て触れると長くなってしまうため、今回は導入について話していきます。

本題に入る前にデザインシステムについてですが、記事がたくさんあるため、ここでは深くは触れません。簡単に言うとUIコンポーネントやスタイルガイドなど「デザインを定義する」ための仕組みのことを指してます。

[デザインシステムとは何か ｜ ひらくデザイン ｜ 株式会社コンセント](https://www.concentinc.jp/design_research/2021/04/designsystem/) [デザインシステムとは？内容や作り方、運用方法を解説します | in-Pocket インポケット](https://www.i3design.jp/in-pocket/10230)

### 背景

私が現在携わっているプロダクトが大きくなるにつれ、開発メンバーも増えていき、現在ではエンジニア約8人, デザイナー1人の体制で開発しています。しかし、人数が増えて来たにも関わらず、デザインに関する明確なルールが決まっていませんでした。そのため、一貫したデザインになっておらず、開発効率も悪い状態になっていました。

私たちのチームではデザインツールに関しては[Figma](https://www.figma.com/ja/)を使っていますが、スタイルガイドやコンポーネントのルールが決まっていませんでした。以下の画像はボタンの例です。ボタンの場所によって横のpaddingが違っていたりと、実装する時に1箇所ずつ見ていかなければなりませんでした。

![[20220830204725.png]]

![[20220830204802.png]]

また、コンポーネントだけでなく、カラーコードも同じような問題が起きていました。似たようなカラーコードが複数存在していたため、実装した後でUIデザインについて相談することもありました。本来であれば、デザインは実装する前に決めることですが、小さい改修は特にデザインを決めずに実装することもありました。

例)

![[20220830205320.png]]

### 導入について

デザインシステムを導入する上で行なったことは主に以下の2つです。

- スタイルガイドの作成
- UIコンポーネントの整理

### スタイルガイドの作成

### 使用するカラーコードの選定

まずはじめに、実装で使用されているカラーコードを全て洗い出しました。その結果、31ものカラーバリエーションが存在していたことがわかりました。実装していると気が付きませんでしたが、こんなにもカラーコードが存在していたなんて驚きでした。

結果として31あったカラーバリエーションを11にまで減らすことができました。特にモノクロは21だったものが5つにまで減らすことができました。

![[20220830205438.png]]

### Typographyのコンポーネント化

Typographyを導入する前はテキストごとにstyleを当てていましたが、Typographyを決め、コンポーネント化することでカラーコード同様テキストサイズなどもページやUI単位で統一化することができました。

![[20220830205623.png]]

index.tsx

```plain text
<div className={styles.title}>
  タイトル
</div>

```

style.module.scss

```plain text
.title {
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
}

```

↓

index.tsx

```plain text
<Typography typography="bold20">
  タイトル
</Typography>

```

### 使用するアイコンをFigmaで管理

今まではフリーサイトからアイコンを直接ダウンロードしていました。

しかし、フリーサイトにあるアイコンだとアイコンごとにサイズや位置が違うため、アイコンを使う箇所によって1つずつ調整する必要がありました。

**変更前**

![[20220830205724.gif]]

```plain text
import ChangeCurrencyIcon from "../../../../public/static/images/icon_change_currency.svg";
import CloseIcon from "../../../../public/static/images/icon_close.svg";
import FireIcon from "../../../../public/static/images/icon_fire.svg";
import I18nIcon from "../../../../public/static/images/icon_i18n.svg";
...

export {
  ChangeCurrencyIcon,
  CloseIcon,
  FireIcon,
  I18nIcon,
  ...
};

type SvgIconProps = {
  width: string | number;
  height: string | number;
  viewBox: string;
};

export interface Props {
  iconName: IconNameType;
  size: number;
  color?: string;
  role?: string;
  ariaLabelString?: string;
}

```

```plain text
<MenuIcon
  {...getSvgIconProps(22, 14)}　← widthとheightを両方渡さないといけない
  className={classNames(styles.menuIcon, {
    [styles.forRealAuctions]: isRealAuction,
  })}
/>

```

そこで、Googleが提供する[Material Design Icons](https://www.figma.com/community/file/878585965681562011)を使うことにしました。

さらに、アイコンをFigmaで管理し、アイコンサイズを統一しておくことで、実装しやすくなりました。

**変更後**

![[20220830205827.gif]]

```plain text
import ArrowDown from "../../../../public/static/svgs/arrowDown.svg";
import ArrowLeft from "../../../../public/static/svgs/arrowLeft.svg";
import ArrowRight from "../../../../public/static/svgs/arrowRight.svg";
import ArrowUp from "../../../../public/static/svgs/arrowUp.svg";
import Bell from "../../../../public/static/svgs/bell.svg";
import Calendar from "../../../../public/static/svgs/calendar.svg";
...


const VIEW_BOX = "0 0 24 24";

const iconNameMapping: { [iconName in IconNameType]: React.FC<SvgIconProps> } =
  {
    ArrowLeft,
    ArrowRight,
    ArrowDown,
    ArrowUp,
    Bell,
    Calendar,
    ...
  };

export const NewIcon: React.FC<Props> = (props) => {
  const { iconName, color, size, role, ariaLabelString } = props;
  const IconComponent = iconNameMapping[iconName];
  return (
    <IconComponent
      role={role}
      aria-label={ariaLabelString}
      viewBox={VIEW_BOX}
      width={size}
      height={size}
      fill={color || "black"}
    />
  );
};

```

```plain text
<NewIcon
  iconName="ArrowDown"
  size={16}　← サイズを指定するだけでいい
  color={colors.black[70]}
/>

```

### UIコンポーネントの整理

### Figmaのマスタコンポーネントの作成・管理

背景でも触れましたが、今まではデザインを作らずに実装したり、デザインを起こしてもFigma上のコンポーネント管理ができていませんでした。そのため実装しているときに、新しいコンポーネントとして切り分けるべきかそうでないかの判断で迷うことがありました。さらに、その判断も実装者の裁量になっていたため、既にあるコンポーネントを再利用せず1から実装していたりもしていました。

そこで、Figma上でマスタコンポーネントとしてコンポーネントを管理し、実装する時はFigma上マスタコンポーネントを見て実装するようにしました。そうすることで、FigmaでもどのページのどのUIが何のコンポーネントを使っているか客観的に見ることができ、既にあるコンポーネントを再利用せずに同じものを実装するということも無くなりました。

![[20220830185136.png]]

![[20220830185211.png]]

Figma

Storybook

**マスタコンポーネント化を行なった後**

![[20220830184945.png]]

![[20220830185034.png]]

### コンポーネントに切り出す基準を定義

次に、コンポーネントに切り出す基準を決めました。コンポーネントを切り出していった当初、人によってコンポーネントするべきところとそうではないところで意見が違っていました。例えば、同じデザインで使われているところをコンポーネント化していったときに、使っているところがページ内なのかページを跨いでなのかや使っている頻度は2つ以上なのか3つ以上なのかなどです。

再利用するというコンポーネントの目的を活かすために、私たちのチームでは「ページを跨いで同じデザインのものはコンポーネントとして切り出す」という方針になりました。しかし、この方針でもコンポーネントするべきところとそうではないところで意見が出てくることがありますが、その場合は話し合いの中で決めています。

### まとめ

デザインシステムに導入したことで、エンジニアがよしなに実装することがなくなり、Figma上でマスタコンポーネントを管理することで、実装においてもコンポーネントの再利用がしやすくなったと思います。しかし、デザインシステムを導入して一番良かったことはデザイナーとのコミュニケーションが密になり、チーム全体でデザインに対する意識が高まったことだと思いました。

最後に、Buysell Technologiesではエンジニアを募集しています。興味がある方はぜひご応募ください！