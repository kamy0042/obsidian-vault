---
タグ: []
作成日時: 2024-10-04T21:21:00
URL: https://speakerdeck.com/sakito/component-driven-design-and-development
Tags: [topic/組織/DesignOps]
---
![](https://secure.gravatar.com/avatar/2917a3c430817eb71086f8973c06ebba?s=128)

## Transcript

1.  自己紹介
    ### [Sakito(@__sakito__) V サイボウズ株式会B V プロダクトデザイナー、デザインテクノロジスト、 デザインプログラムマネージャー、フロントエンドのマネージャ9 V デザイン室のリーダ9 V 犬とハロプロが好き](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_1.jpg)
2.  ÅG Storybookの進化と活' HG まとめ アジェンダ
    ### [PG Component-Driven Design & Developmentと 3G DesignとDevelopmentを繋ぐDesign TokeQ \#G フロントエンド開発に繋がるFigmaの活'](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_2.jpg)
3. Testable (FIRST)」 より引用 Keep it (F)ocused.(焦点を絞るs Keep it (I)ndependent.(独立させるs Keep it (R)eusable.(再利用可能s Keep it (S)mall.(小さいs Keep it (T)estable.(テスト可能s or in short, FIRST Componentとは？
4.  Guidelines,Design Syste Component-Driven Desigw Componet-Drivenを進めやすくするデザインツールや手法も増え" Design Token,FigmV ツールや手法もDesignとDevelopmentの垣根は曖昧になってきてい る n Design側の潮流や知識があることで、より良いComponentが作れるはÀ n 本日の主題はComponent-Driven Developmentのためにもフロントエンド が知っておきたいDesign周りも絡めた話 Component-Driven Design と Development
    ### [n Component-Driven Design DesignもComponentベースで構築していく世界になりつつあ` UI Kit,Material Design,Human Interface](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_6.jpg)
5.  Tokenに別れ g Global Toke} g 直接的にComponentに使用しな g Semantic Toke} g Global Tokenを参照し、意味、目的を持って命名し、Componentで使用す g Design Tokenを使う、学ぶことで下記のメリットがあ g 一貫性の確保：すべての要素が同じ規則に従うため、デザインの一貫性が保たれ g Designの基盤：トークンを基に、より複雑なコンポーネントを構築でき g デザインと開発の橋渡し：両者が同じ「言語」でコミュニケーションできる Design Tokenとは？
    ### [g Designをプラットフォームに依存しない形で共有できるもk g ツール、技術、共通語彙でもあ g 色、タイポグラフィ、余白、影な g Design TokenはGlobal TokenとSemantic](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_8.jpg)
6. Learn - Help Center https://help.figma.com/hc/en-us/articles/18490793776023-Update-1-Tokens-variables-and-styles
7. Learn - Help Center https://help.figma.com/hc/en-us/articles/18490793776023-Update-1-Tokens-variables-and-styles
8. TokenはJSONで表現し、プラットフォームに使えるように変換すh 変換するツールはAmazonのOSSであるStyle Dictionaryが定番 色 タイポグラフィ 余白 影 Web(CSS Variables) Android iOS Design Tokens Format Module
9.  Catalyst, radix-uE 2 振る舞いのみをHooksで提供するReact-Aria Hook" 2 これらの要素でComponentを作ることができる Design TokenとHeadless Component Component化 Design Token ( Design要素) CSS Variables Headless Component (Styleを持たない) Hooks (振る舞い)
    ### [2 Design TokenはDesign要素をComponentに付与できf 2 Headless ComponentはDesign要素を持たないComponen5 2 マークアップの 2 shadcn/ui,](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_12.jpg)
10. 
    ### [Design Tokenについてはこちらのnoteもどうぞ デザイントークンを『デザインの決定を開発チーム全体に伝えるための「方法論」』と定義した https://note.com/amishiratori/n/n261a796d87a6](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_13.jpg)
11.  Figma Variable a さまざまな Designのプロパティを格納でき a Design Tokenのようなデータも持たせれる
    ### [Developmentに役立つFigmaの基本機能 a DesignのComponentF a Figma上でComponentを使いまわせ a PropsのようなI/FをVariants機能で持たせることができ a LayerのComponent名やComponentの単位はそのまま実装に活かせ a](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_15.jpg)
12.  Designデータの数値などを表示してくれ5 G Component Playgroun G DesignからHTMLやCSSの生 G VS Code連携(Figma for VS Code4 G GitHubやStorybookなどの連 G etc...
    ### [DevMode G Figmaの開発用モーq G $25 ~ $35の課金が必要(Editorには同梱されている4 G 開発用にさまざまな機能があ5 G](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_17.jpg)
13. 
    ### [DevMode 参照：Dev Mode: Design-to-Development | Figma https://www.figma.com/dev-mode/ Component Playgroundの例](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_18.jpg)
14.  一致したものになる
    ### [Code Connect ) Figmaのデータとソースコードを紐づける機h ) <component-name>.figma.tsxファイルを作成し、CLIを叩いて連% ) Storybook連携もでき2 ) DevModeでコードを生成するときにComponent名やPropsがソースコードと](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_19.jpg)
15.  GitHubに変更したJSONを元にPRが出せP FigmaのVariablesにもExportすP デザイナーはVariablesにあるTokenから色やフォントを選@ Semantic Tokenのためにデザインテクノロジストとデザイナーで、 用途や名前を考えP 「Style Dictionary」でDesign TokenのJSONをCSS Variablesなどに変換すP Componentの実装には生成したCSS Variablesを使用する (DevModeとCode Connectはまだフル活用できていない)
    ### [実際に行っているFigmaの活用例 Design Tokenを管理する「Tokens Studio」プラグインで 下記を行w Design TokenのJSONを生 ](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_20.jpg)
16.  CSS Variavles Componentに適用 Developmentルート Designルート
    ### [実際に行っているFigmaの活用例 JSON Designで使えるように Figma VariablesへExport Semantic Tokenを作る デザイナーがデザイン時に使用 JSONをStyle Dictionaryで変換](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_21.jpg)
17.  Storybookのメンテナ達が立ち上げたChroma Software Inc.が運 E 一部無料だが、重量課金型のサービt E Storybookの機能を補完し、さらに便利にしてくれる
    ### [StorybookとChromatic E Storyboo3 E コンポーネントを開発、テスト、管理するためのOSSツーU E 実環境と分離したコンポーネントの動作確認ができる E Chromatil E](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_23.jpg)
18.  @storybook/test @storybook/addon-interaction ` Playwright上でStoryを動かすパッケージの提 ` @playwright/experimental-ct-reacQ ` @storybook/react/experimental-playwrighQ ` Test用の関数の追4 ` fn, expect.. ` Chromatic上ではPlaywright,Cypressを動かし、E2Eを参照もできる
    ### [Storybookの進化 ` ここ数年はテストツールとしてのアップデートが増えてきd ` Chromaticを使用したVisial TesQ ` Storybook上でTestを動かすPlay functio' `](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_24.jpg)
19. 基本的な実装パターンの2 a 使用すべき箇所、使用すべきでない箇所の明記
20.  基本的な実装パターンのd k 使用すべき箇所、 使用すべきでない箇所の明X k 上記のComponentは専門の Design System Teamが管B k 利用するのはデザイナーや機能開発チーu k Componentの品質を上げることで、機能開発チームは Component単位のQAをskipすることができるように
    ### [実際に行っているStorybookの活用：品質と効率へ寄与 k Componentにまつわる管理Storybookに集m k テス k 操作、見た目の仕 k I/9 k](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_27.jpg)
21.  Component Developmentの効率、品質を上げていくことができ Y Figmaはフロントエンドに必要不可欠なツールにもな Y StorybookはComponent Design & Developmentに必要なオールインワンツール となってきÆ Y Componentを起点に品質・効率をあげていこう！ Component Component Compon
    ### [まとめ Y Component-Driven Design & Developmentはデザイナーとフロントエンドのコラ ボが不可P Y Design TokenやFigmaを活用していくことで ](https://files.speakerdeck.com/presentations/8b2ccaf6aae94ae2986f7ef7d4a30e70/slide_29.jpg)