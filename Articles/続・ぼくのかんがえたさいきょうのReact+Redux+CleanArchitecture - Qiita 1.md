---
Created: 2021-01-02T16:12:00
URL: https://qiita.com/putan/items/19a9b5f71f469fae473e
Tags: [topic/技術/React, topic/技術/ソフトウェア設計]
---
[@putan](https://qiita.com/putan)

2018年11月19日に更新



# **続・ぼくのかんがえたさいきょうのReact+Redux+CleanArchitecture**

[TypeScript](https://qiita.com/tags/typescript)[DDD](https://qiita.com/tags/ddd)[React](https://qiita.com/tags/react)[redux](https://qiita.com/tags/redux)[CleanArchitecture](https://qiita.com/tags/cleanarchitecture)

この記事は最終更新日から1年以上が経過しています。

前回：[ぼくのかんがえたさいきょうのReact+Redux+CleanArchitecture](https://qiita.com/putan/items/55c2f6ae7dc656eaf6db)

## [**前回のさいきょうパターンの検証結果**](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E5%89%8D%E5%9B%9E%E3%81%AE%E3%81%95%E3%81%84%E3%81%8D%E3%82%87%E3%81%86%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E3%81%AE%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)

[まずは前回のさいきょうパターンですが、会社内の勉強会で実装を進めて行ったところ、少し整理されてこのようになりました。](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E5%89%8D%E5%9B%9E%E3%81%AE%E3%81%95%E3%81%84%E3%81%8D%E3%82%87%E3%81%86%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E3%81%AE%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)

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

### [**検証結果**](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)

[• ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[Good

](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[小さめのアプリケーションでは「ビジネスロジックを分離する」という点においては十分な成果を出した](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[
• ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[Bad

](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[そもそもCleanArchitectureは小さめのアプリケーションには冗長](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)[ビジネスロジック（UseCase）にビュー側で採用したいライブラリ（Redux）が入り込んでいるため、UI刷新などには対応しきれない](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%A4%9C%E8%A8%BC%E7%B5%90%E6%9E%9C)

## [**新・さいきょう**](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%96%B0%E3%81%95%E3%81%84%E3%81%8D%E3%82%87%E3%81%86)

[さらにさいきょうを目指し、下記を踏まえて改訂版を作りました。](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E6%96%B0%E3%81%95%E3%81%84%E3%81%8D%E3%82%87%E3%81%86)[試験実装はこちら](https://github.com/putan/react_redux_clean_sample)

- ビジネスロジックをビュー側のツールから切り離したい
- よーしパパTypeScript入れちゃうぞー

### [**主な変更点**](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)

[• ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)[UseCasePortとしてInterfaceを利用する（あるべき姿！）

](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)[これによって依存関係を逆転し、Usecaseを保護](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)[
• ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)[ControllerとしてActionCreatorを使う

](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)[UseCaseを呼ぶ前後で複数のActionCreatorを呼びそうなのでthunkで実装](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E4%B8%BB%E3%81%AA%E5%A4%89%E6%9B%B4%E7%82%B9)

### [**現在の自己評価**](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)

[• ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[Good

](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[Reduxの立場が明確に

](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
        ▪ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[ビジネスロジックから抜き出せた！](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
        ▪ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[InterfaceAdapter層に収まり、つなぎ役として明確になった（今の所）](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
        ▪ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[**将来Reduxをやめたい**](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[、という場合にも動きやすそう](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[みんな大好きre-ducks構成がはめやすい](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
• ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[Bad

](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[今の所見当たらない！？](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
• ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[Think

](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[UseCaseInteractorはRepositoryを綺麗に分離する場合はクラス＋DI、そうでなければ関数という分けでやれそうか](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
    ◦ ](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[この捉え方でInterfaceAdapter層にロジックが入らないようにできるのか](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[
](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)[というところで、ご意見、ご感想、マサカリなどなど、コメントお待ちしております！](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E7%8F%BE%E5%9C%A8%E3%81%AE%E8%87%AA%E5%B7%B1%E8%A9%95%E4%BE%A1)

## [**まとめ**](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E3%81%BE%E3%81%A8%E3%82%81)

- [React + Redux + TypeScript で](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E3%81%BE%E3%81%A8%E3%82%81)[前回](https://qiita.com/putan/items/55c2f6ae7dc656eaf6db)よりもCleanになった構成を紹介
- Reduxの立場が明確になり扱いやすそうな構成ができた
- またもや仮実装を始めたばかりなので検証を続ける

## [**参考文献**](https://qiita.com/putan/items/19a9b5f71f469fae473e#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE)

- [Clean Architecture　達人に学ぶソフトウェアの構造と設計](https://www.amazon.co.jp/dp/B07FSBHS2V)
- [クリーンアーキテクチャ(The Clean Architecture翻訳)](https://blog.tai2.net/the_clean_architecture.html)
- [リファクタリングして学ぶTypeScriptでクリーンアーキテクチャ](https://qiita.com/kotauchisunsun/items/ec6b4086abe670c478fe)

[**編集リクエスト**](https://qiita.com/drafts/19a9b5f71f469fae473e/edit)

[**45**](https://qiita.com/putan/items/19a9b5f71f469fae473e/likers)





[**@putan**](https://qiita.com/putan)

[**ヤフー株式会社**](https://qiita.com/organizations/yahoo-japan-corp)

Yahoo! JAPAN を運営しています。

[https://www.yahoo.co.jp](https://www.yahoo.co.jp/)

**ユーザー登録して、Qiitaをもっと便利に使ってみませんか。****
1. ****あなたにマッチした記事をお届けします****ユーザーやタグをフォローすることで、あなたが興味を持つ技術分野の情報をまとめてキャッチアップできます****便利な情報をあとで効率的に読み返せます****気に入った記事を「ストック」することで、あとからすぐに検索できます**[****](https://help.qiita.com/ja/articles/qiita-login-user)[**より詳しく**](https://help.qiita.com/ja/articles/qiita-login-user)[登録する](https://qiita.com/signup?callback_action=login_or_signup&redirect_to=%2Fputan%2Fitems%2F19a9b5f71f469fae473e&realm=qiita)[ログインする](https://qiita.com/login?callback_action=login_or_signup&redirect_to=%2Fputan%2Fitems%2F19a9b5f71f469fae473e&realm=qiita)