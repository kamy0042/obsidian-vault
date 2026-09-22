---
notion-id: 955e6798-05f4-4b97-8f89-e4a1271b7690
Tags: [topic/技術/React]
---
![[Attachments/無題のフォルダ/slide_0 3.jpg]]

## Transcript

1.  3. Local State: ページをまたいで保持する必要のないstate https://zenn.dev/yoshiko/articles/607ec0c9b0408d
    ### [はじめに 昨今よく言われるReactのstateの分類 1. Server Data Cache 2. Global State: 1を除くページをまたいで保持し続ける必要のあるstate](https://files.speakerdeck.com/presentations/9c7f689fc9294deead252f8e8c92332d/slide_3.jpg)
2.  etc. 2. Global State: 1を除くページをまたいで保持し続ける必要のあるstate ◦ useContext, Recoil, Jotai, Redux, Zustand, etc. 3. Local State: ページをまたいで保持する必要のないstate ◦ useState, etc.
    ### [はじめに 昨今よく言われるReactのstateの分類 1. Server Data Cache ◦ TanStack Query, swr,](https://files.speakerdeck.com/presentations/9c7f689fc9294deead252f8e8c92332d/slide_4.jpg)
3.  etc. 2. Global State: 1を除くページをまたいで保持し続ける必要のあるstate ◦ useContext, Recoil, Jotai, Redux, Zustand, etc. 3. Local State: ページをまたいで保持する必要のないstate ◦ useState, etc. 💡Local Stateを実装的都合でGlobal Stateの管理手法を使う時の話
    ### [はじめに 昨今よく言われるReactのstateの分類 1. Server Data Cache ◦ TanStack Query, swr,](https://files.speakerdeck.com/presentations/9c7f689fc9294deead252f8e8c92332d/slide_5.jpg)
4.  • ライフタイムが伸びる ◦ これの考慮が結構忘れがち ◦ クリーンアップ忘れて変更前のstateがチラっと見えちゃう🫣 →影響範囲の把握コストが増える →僕はLocal Stateでがんばる派でその方法を紹介していく
    ### [Global Stateで管理する時のむずかしさ • スコープが広がる ◦ まぁGlobalだからね（Atoms系だと違うかも） • データフローが見えづらくなる ◦ 子Componentのpropから消えるため](https://files.speakerdeck.com/presentations/9c7f689fc9294deead252f8e8c92332d/slide_12.jpg)
5.  機能のComponentはそれらを組み合わせ機能内でのネストは最小限にする ◦ Viewの全体像がわかりやすい ◦ 不要なインターフェースが生まれず、柔軟性が保たれる
    ### [Local Stateでうまくやる方法 ③そもそもそんなにComponentをネストさせる必要があるのか？ ※変更頻度が多く複数人で触るようなComponentが前提 • ロジックやstateはCustom Hookで責任ごとに分ける • 機能に依存しない小さな汎用Componentを作る •](https://files.speakerdeck.com/presentations/9c7f689fc9294deead252f8e8c92332d/slide_21.jpg)
6.  render propsを使う ⑥Component自体を初期化する ⑦propとstateの値からsetStateする ⑧前レンダリング時のstateやpropの値を保持するstateを使う
    ### [Local Stateでうまくやる方法 ①まずは基本のLifting State Up ②propを渡すこと自体はそんなに悪いことではない ③そもそもそんなにComponentをネストさせる必要があるのか考える ④Composition: childrenを使う ⑤Composition:](https://files.speakerdeck.com/presentations/9c7f689fc9294deead252f8e8c92332d/slide_32.jpg)