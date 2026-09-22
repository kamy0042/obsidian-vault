---
Created: 2021-01-25T13:45:00
URL: https://qiita.com/putan/items/19a9b5f71f469fae473e
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
前回：[ぼくのかんがえたさいきょうのReact+Redux+CleanArchitecture](https://qiita.com/putan/items/55c2f6ae7dc656eaf6db)

## 前回のさいきょうパターンの検証結果

まずは前回のさいきょうパターンですが、会社内の勉強会で実装を進めて行ったところ、少し整理されてこのようになりました。

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F55142F5b80e831-5705-e472-3f54-1dba8dcaabc3.png]]

- Entity（図中model）はExternal層で使えるようにImmutable.jsのRecordを使って実装 
    - ReadOnly、副作用NGという意図
    - ○ React+Redux的には使いやすかった
    - × mutateメソッドで複製が作れてしまうため、"見るだけ"の意図を突破できちゃった
- UseCaseはredux-thunkを用いたThunkActionで実装 
    - ○ CleanArchitectureを意識しないで作っていた頃に似た形で実装できた
    - × Storeの構造に依存してしまった
- re-ducks構造が合わなかったので廃止した 
    - re-ducks構造ではaction/operationはreducerと一対だがここではそうならなかった
- selectorは無くならなかった 
    - Reducerだけでは更新タイミングの違う複数の値を束ねた制御が管理しきれなかった
    - Reactコンポーネントからプレゼンテーションロジックを排除するのに大いに役立った
- Repository検証しきれず
- Good 
    - 小さめのアプリケーションでは「ビジネスロジックを分離する」という点においては十分な成果を出した
- Bad 
    - そもそもCleanArchitectureは小さめのアプリケーションには冗長
    - ビジネスロジック（UseCase）にビュー側で採用したいライブラリ（Redux）が入り込んでいるため、UI刷新などには対応しきれない

## 新・さいきょう

さらにさいきょうを目指し、下記を踏まえて改訂版を作りました。[試験実装はこちら](https://github.com/putan/react_redux_clean_sample)

- ビジネスロジックをビュー側のツールから切り離したい
- よーしパパTypeScript入れちゃうぞー

![[https3A2F2Fqiita-image-store.s3.amazonaws.com2F02F55142Fa5b6624b-b15a-da83-2d0e-dc9c32dd3fba.png]]

- UseCasePortとしてInterfaceを利用する（あるべき姿！） 
    - これによって依存関係を逆転し、Usecaseを保護
- ControllerとしてActionCreatorを使う 
    - UseCaseを呼ぶ前後で複数のActionCreatorを呼びそうなのでthunkで実装
- Good 
    - Reduxの立場が明確に 
        - ビジネスロジックから抜き出せた！
        - InterfaceAdapter層に収まり、つなぎ役として明確になった（今の所）
        - **将来Reduxをやめたい**、という場合にも動きやすそう
    - みんな大好きre-ducks構成がはめやすい
- Bad 
    - 今の所見当たらない！？
- Think 
    - UseCaseInteractorはRepositoryを綺麗に分離する場合はクラス＋DI、そうでなければ関数という分けでやれそうか
    - この捉え方でInterfaceAdapter層にロジックが入らないようにできるのか

というところで、ご意見、ご感想、マサカリなどなど、コメントお待ちしております！

- React + Redux + TypeScript で[前回](https://qiita.com/putan/items/55c2f6ae7dc656eaf6db)よりもCleanになった構成を紹介
- Reduxの立場が明確になり扱いやすそうな構成ができた
- またもや仮実装を始めたばかりなので検証を続ける