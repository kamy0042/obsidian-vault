---
タグ: []
作成日時: 2023-11-20T02:18:00
URL: https://speakerdeck.com/kinocoboy2/jsconfjp2023-storybookqu-dong-kai-fa-nozai-xian-xing-toxiao-lu-hua
Tags: [topic/ツール/Storybook]
---
![[slide_0 27.jpg]]

## Transcript

1.  
© kaonavi, inc. 1
Storybook駆動開発
UI開発の再現性と効率化
Hiroki Kinoshita
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_0.jpg)
2.  
INDEX
© kaonavi, inc. 2
● 前提知識
● Storybook駆動開発とは
● 効率性の向上について
● 再現性の向上について
● 具体的な恩恵について
● まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_1.jpg)
3.  
自己紹介
© kaonavi, inc. 3
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_2.jpg)
4.  
木下 博貴 Hiroki Kinoshita
X: @kinocoboy2
所属：株式会社カオナビ 2022年中途入社
職種：フロントエンドエンジニア / スクラムマスター
趣味：キャンプ・エレキギター・バイクプラモデル
特徴：新潟県長岡市に地方移住したエンジニア
自己紹介
© kaonavi, inc. 4
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_3.jpg)
5.  
INDEX
© kaonavi, inc. 5
● 前提知識
● Storybook駆動開発とは
● 効率性の向上について
● 再現性の向上について
● 具体的な恩恵について
● まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_4.jpg)
6.  
© kaonavi, inc. 6
● UI/コンポーネントカタログ
○ UIを構築する部品単位に分かりやすく
整理可能
● オープンソース
○ なんとタダで無料
前提知識
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_5.jpg)
7.  
INDEX
© kaonavi, inc. 7
● 前提知識
● Storybook駆動開発とは
● 効率性の向上について
● 再現性の向上について
● メリット・デメリット
● まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_6.jpg)
8.  
© kaonavi, inc.
● ものづくりは不確実なことが多い。
○ でも我々は素早く価値あるソリューションを提供する必要がある。
8
Storybook駆動開発とは
企画
実装
設計
テスト
思い切りよく改善し、
よりよく！
でも顧客が体感できる価値
を保証しながら。
効率的に
とにかく今よりも早く
イテレーション
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_7.jpg)
9.  
© kaonavi, inc.
顧客が体感できる価値を変えず、効率を追い求めるために
9
Storybook駆動開発とは
顧客から見える景色を
システム的に再現性をもって
保証する
スコープを限定し
集中的に触れる環境を
構成する
StorybookをUIカタログの
側面ではなく、
インテグレーション
テストツール
として利用する
Storybook駆動設計
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_8.jpg)
10.  
INDEX
© kaonavi, inc. 10
● 前提知識
● Storybook駆動開発とは
● 効率性の向上について
● 再現性の向上について
● 具体的な恩恵について
● まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_9.jpg)
11.  
© kaonavi, inc. 11
効率をあげるって簡単に言うけど難しい。効率が出ないワケがある
効率性の向上について
めっちゃ複雑 めっちゃ重い
価値
創出
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_10.jpg)
12.  
© kaonavi, inc. 12
めっちゃ複雑
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_11.jpg)
13.  
© kaonavi, inc.
● 基本的に複雑な業務を改善する為にソリューションは生まれる。
○ 例えば、Saasとしての難しさや人事業務の複雑さ。
■ 例
● 職能やロールによる権限の違い
● 業務の進行に伴う使用感の変化
● 利用プランによる提供する機能の違い
13
めっちゃ複雑
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_12.jpg)
14.  
© kaonavi, inc. 14
めっちゃ複雑
業務を改善する手段として、ソリューションが顧客が持っている複雑さを肩代
わりすることが多い
Frontend Backend
DB
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_13.jpg)
15.  
© kaonavi, inc. 15
業務を改善する手段として、ソリューションが顧客が持っている複雑さを肩代
わりすることが多い
めっちゃ複雑
Frontend Backend
DB
ドメインモデルは可能な限り
抽象化して綺麗に保ちたい
ソリューションとしての
腐敗防止的な役割も必要になる
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_14.jpg)
16.  
© kaonavi, inc.
フロントエンドの領域でも複雑性を極力排除し、綺麗に保ちたい
そこで例としてAtomicDesignなどの手法が取り入れられる。
16
めっちゃ複雑
Frontend
Atom Molecules Organisms Template Pages
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_15.jpg)
17.  
© kaonavi, inc.
フロントエンドの領域でも複雑性を極力排除し、綺麗に保ちたい
そこで例としてAtomicDesignなどの手法が取り入れられる。
17
めっちゃ複雑
Frontend
Atom Molecules Organisms Template Pages
権限や有効無効を含めた変化は
ここで顕在化する
Design System
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_16.jpg)
18.  
© kaonavi, inc. 18
めっちゃ複雑
Huge Component
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_17.jpg)
19.  
© kaonavi, inc.
「Story」単位でレンダリング可能
「Story」でできること
○ 引数
■ args を用いた引数渡し
○ API の MOCK化
■ Mock Service Worker
● msw
19
状態単位で管理・把握をする
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_18.jpg)
20.  
© kaonavi, inc.
ユーザーが観測できる「状態」単位で
分解する。
20
状態単位で管理・把握をする
Story
Story
Story
Story Story
Story
Story
Story
Huge Component
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_19.jpg)
21.  
© kaonavi, inc.
● 特に有効な局面
○ Good First Issue
■ ユーザーが観測できる状態単位でのキャッチアップが可能になる。
○ Story単位で構造的に解析
■ Storyのスコープ範囲の中で価値の追加に向き合えるようになる。
21
状態単位で管理・把握をする
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_20.jpg)
22.  
© kaonavi, inc. 22
めっちゃ重い
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_21.jpg)
23.  
© kaonavi, inc.
● 開発環境がめっちゃ重たい...。
○ 長く運用ができているサービスほどありがち。
○ モノリシックな環境だと、初回起動やHotReloadの反映速度など開
発体験がジリジリと辛くなることがある。
23
めっちゃ重い
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_22.jpg)
24.  
© kaonavi, inc.
● Storybookを使うと
○ フロントエンドのみでスコープを限定的に自走できる。
○ プロトタイピングもできる
■ 画面の動きや期待する働きを先行して見せられる
24
めっちゃ重い
ドヤッ
ドヤッ
ドヤッ
ドヤッ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_23.jpg)
25.  
© kaonavi, inc. 25
めっちゃ重い
● Storybookを使うと
○ 作業をしたいStoryに対して、フォーカスできる。
■ 「状態」を限定した動作確認を取れる。
● バックエンドとのインターフェースの取り決めをしておくだけで、フロントエンド
は自走できる。
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_24.jpg)
26.  
© kaonavi, inc. 26
効率性の向上: まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_25.jpg)
27.  
© kaonavi, inc.
● Storybook駆動開発を行うと、
○ 複雑なドメインに対して向き合いやすくなる
○ オンボーディングコストの削減
■ Good First Issue として機能する
■ 引き継ぎや意思疎通を構造的に会話ができるようになる
○ 開発環境の軽量化
○ 価値追加に対するアジリティ向上
■ 価値提供方向の見定め
■ 開発体験の向上
27
効率性の向上：まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_26.jpg)
28.  
© kaonavi, inc. 28
ちょっと一息☕
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_27.jpg)
29.  
INDEX
© kaonavi, inc. 29
● 前提知識
● Storybook駆動開発とは
● 効率性の向上について
● 再現性の向上について
● 具体的な恩恵について
● まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_28.jpg)
30.  
© kaonavi, inc.
● 新しい価値を追加したい！という気持ちはある。
● 状況は様々
○ シンプルに追加提供できるケース
○ プロダクトに影響を与えずに破壊的変更をおこないたいケース
30
再現性の向上について
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_29.jpg)
31.  
© kaonavi, inc.
● シンプルなケース
○ とことんシンプル。
● 破壊的変更をおこないたいケース
○ ユーザーの知らない部分には破壊的な活動を行いたい。
○ でも既にユーザーが触れて価値を得ている部分を破壊してはいけな
い。
31
再現性の向上について
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_30.jpg)
32.  
© kaonavi, inc.
● 日常的に明日のための破壊活動をするメリットは大きい。
○ 次の価値追加に備え、いつでも動けるようにしておける。
● でも、前提がある。
○ 顧客が体感できる価値を保証できること。
32
破壊的変更をおこないたいケース
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_31.jpg)
33.  
© kaonavi, inc.
● 常にソリューションが大破する危機を感じながら進めるのは怖すぎ
○ ユーザーから見える価値に変化がないことの保証。
■ E2Eテスト
■ インテグレーションテスト
● 万全な準備は、なかなかにハード
○ そこでStorybook駆動開発に取り組む。
33
破壊的変更をおこないたいケース
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_32.jpg)
34.  
© kaonavi, inc. 34
● Storybookでは、play() 関数が使える。
○ Component Story Format 3.0 で追加された。
○ このplay()関数を用いることで、対象のStoryで保証したいユーザー
インタラクションの再現を取ることができる。
■ クリック
■ フォーム入力
● jest との連動性を持つことができる
○ jest+Testing Library
再現性の向上におけるStorybook駆動開発
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_33.jpg)
35.  
© kaonavi, inc. 35
● jest+Testing Library との連動
○ ユーザーインタラクションが正常かどうかを判別できる。
■ ツールと連動することで、CIで止まってくれる。
● この仕組みを開発時の防波堤としてあると、安心感が違う。
再現性の向上におけるStorybook駆動開発
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_34.jpg)
36.  
© kaonavi, inc. 36
● ならばガッチリ play() と jest + Testing Library を理解するぞ。
○ これはすごく難しい。
● でも大丈夫だ。問題ない
○ どんな簡単なテストでもしっかりコケてくれる
■ しっかりStorybook駆動設計の恩恵は得られる
再現性の向上におけるStorybook駆動開発
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_35.jpg)
37.  
© kaonavi, inc. 37
● 例えば、以下の場合でもしっかり機能して働いてくれる
○ 対象
■ Label要素として固定文字列が設定されている
Component
○ 施策
■ Labelの文字列が存在するかを確認する。
再現性の向上におけるStorybook駆動開発
await expect(getByLabelText(‘固定文字列’).toBeInTheDocument());
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_36.jpg)
38.  
© kaonavi, inc. 38
再現性の向上におけるStorybook駆動開発
Huge Component
Story
.toBeInTheDocument()
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_37.jpg)
39.  
© kaonavi, inc. 39
再現性の向上におけるStorybook駆動開発
Jest is Failed.
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_38.jpg)
40.  
© kaonavi, inc. 40
再現性の向上: まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_39.jpg)
41.  
© kaonavi, inc. 41
● Storybook駆動開発を行うと、
○ 日常的なリファクタリングを安全に行えるようになる。
○ jest+Testing Library と連動できる
■ ガッチリ書かなくても、軽微なケースだけだとしても適切に機能する。
■ 初心者でも十分に恩恵を感じられる。
再現性の向上におけるStorybook駆動開発
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_40.jpg)
42.  
INDEX
© kaonavi, inc. 42
● 前提知識
● Storybook駆動開発とは
● 効率性の向上について
● 再現性の向上について
● 具体的な恩恵について
● まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_41.jpg)
43.  
© kaonavi, inc. 43
● 設定値に応じたUI
○ 料金プランと数多くのサブシステムへの動線の整合性
○ 権限による操作の整合性
○ 顧客自由度の高いUIの動作保証
● ローカル環境のDB設定を入れ替えながらの確認は辛い
○ Storybookを使うことで複雑さから解放
具体的な恩恵について
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_42.jpg)
44.  
© kaonavi, inc. 44
● Storybookをどう使ったのか
具体的な恩恵について
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_43.jpg)
45.  
© kaonavi, inc. 45
まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_44.jpg)
46.  
© kaonavi, inc. 46
● Storybook駆動開発は
○ 効率性・再現性がアップ
○ オンボーディングコストが下がる
○ 日々の改善活動の安心感が向上する
○ 柔軟な設定が必要になるポイントでより効力は発揮される
■ プランや権限などマトリクスが必要になるポイントで
恩恵をたくさん得られた。
● 今後の展望について
○ storybook-addon-a11yというアドオンの登場により、
a11y文脈でもしっかり活躍できる。
まとめ
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_45.jpg)
47.  
© kaonavi, inc. 47
Storybook駆動開発はいいぞ!
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_46.jpg)
48.  
We are hiring!!
https://corp.kaonavi.jp/recruit/list/
© kaonavi, inc. 48
[View Slide](https://files.speakerdeck.com/presentations/5a63092f1e4a41f2ae61921dc9512e3f/slide_47.jpg)