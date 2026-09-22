---
タグ: []
作成日時: 2024-04-14T17:23:00
URL: https://creatorzine.jp/article/detail/4867
Tags: [topic/アクセシビリティ, topic/技術/テスト]
---
![](https://crz-cdn.shoeisha.jp/static/images/article/4867/fb.png)

株式会社SmartHRで、SmartHRのプロダクトを誰もが使えるようにすることをミッションとしたデザイン組織「プログレッシブデザイングループ」、通称「プログレ」が、今まで培ってきた知見をもとに、デザインを活用したアクセシビリティ向上の取り組みを解説します。第2回は「デザインシステムで担保するアクセシビリティ品質」についてです。

前回の記事「[SmartHRはなぜアクセシビリティ向上に力を入れるのか](https://creatorzine.jp/article/detail/4723)」では、SmartHRがアクセシビリティの向上に取り組む背景や理由、取り組みの始まりについて紹介しました。

おもな取り組みとしてお伝えした共通UIライブラリの「SmartHR UI」は、SmartHRのデザインシステムのなかでも中心的な存在でした。今回はそんなSmartHR UI以外のデザインシステムにおけるアクセシビリティの取り組みを紹介します。

## SmartHR Design Systemとは

[SmartHR Design System](https://smarthr.design/)はサービスに関わるすべての人がSmartHRらしい表現をするための基準や素材をまとめたものです。プロダクトに限らず、営業資料やマーケティング用のウェブサイトなども対象です。素材にはSmartHR UIやデザイントークンがあり、基準にはデザイン原則、デザインパターンなどが用意されています。

SmartHRのプロダクト開発では、多くのUIや機能にデザインシステムを利用して開発を行っています。そのためデザインシステムが提供する素材や基準がアクセシビリティを高めるものであれば、自然とプロダクトもアクセシブルになっていきます。

[前回の記事](http://creatorzine.jp/article/detail/4723)では、素材となるSmartHR UIでアクセシビリティを向上させるための事例を紹介しましたが、本記事ではアクセシビリティを高めるための基準をお伝えします。

## 品質の基準となるウェブアクセシビリティ方針

アクセシビリティをプロダクトの「品質」と捉えたときに、開発者の意思決定を助けるためにはどこまでの品質が求められるのか、という基準を示す必要があります。

求められるアクセシビリティの品質が明確であれば、いくつかUIのアイデアがあったときに、求められる基準を満たしていないものは選択しない、という意思決定ができます。しかし明確な基準がないと、アクセシビリティ向上を目指したときに優先順位がつけられず、何から手を付ければ良いかを判断することもできません。

そのため、SmartHRではプロダクトにおけるアクセシビリティ品質の基準としてウェブアクセシビリティ方針を定めています。（現在のアクセシビリティ方針は、SmartHRのアクセシビリティサイトに掲載しています）

[SmartHR ACCESSIBILITYサイトに掲載されたアクセシビリティ方針のページの画面キャプチャ。アクセシビリティ方針は次のとおり。SmartHRのプロダクトはアクセシビリティ方針のもと、「JIS X 8341-3:2016 高齢者・障害者等配慮設計指針－情報通信における機器、ソフトウェア及びサービス－第3部：ウェブコンテンツ」、に加えて「Web Content Accessibility Guidelines 2.1」に対応すること、またさまざまな特性を持つユーザーが実際に利用できることを目標としています。対象範囲は、SmartHR UI (非推奨コンポーネントを除く)とSmartHR 製品 (***.smarthr.jp で提供するすべてのサービス)。](https://accessibility.smarthr.co.jp/development/)

![](https://crz-cdn.shoeisha.jp/static/images/article/4867/1.png)

SmartHRのアクセシビリティ方針は、日本産業規格のJIS X 8341-3:2016とW3Cが公開している[Web Content Accessibility Guidelines（WCAG）2.1](https://waic.jp/translations/WCAG21/)が設けている基準のひとつであるシングルAに、いくつか追加の項目を付与したものを目標としました。

独自の品質基準を作るのではなく外部の品質基準を採用したのは、WCAGがアクセシビリティの品質基準としてスタンダードなものだからです。さまざまな障害特性や、支援技術、利用シーンについて考慮されていることに加え、WCAG 2.0とJIS X 8341-3:2016が一致規格となっています。日本産業規格に準拠していることを示せれば、体外的にプロダクトの品質が伝わりやすく、製品の価値向上に貢献しやすいと考えました。また、いちから独自の品質基準をつくるのはコストがかかりすぎるという理由もありました。

ただしWCAGは、アクセシビリティの専門的な知識がない開発者にとって「製品開発時の意思決定を支援するツール」としては扱いづらい点もあります。実際にWCAGを読んだことがある方であればお分かりいただけると思いますが、WCAGは特定の技術に依存しないように書かれているため、抽象的で理解しづらく、また達成基準に適合しているか否かの判断も非常に難しいです。

そこで、よりわかりやすく簡単にWCAGのシングルAが求めている品質について理解し品質をチェックできるよう、[ウェブアクセシビリティ簡易チェックリスト](https://smarthr.design/accessibility/check-list/)を作成しました。

- [SmartHRが実践！ デザインからアプローチするアクセシビリティ](https://creatorzine.jp/article/corner/111)

# 簡易チェックリスト付きで解説 デザインシステムで担保するアクセシビリティ品質とは

- [ プロダクト ](https://creatorzine.jp/tag/70/)
- [ アクセシビリティ ](https://creatorzine.jp/tag/129/)
- [ デザインシステム ](https://creatorzine.jp/tag/136/)
- [ツイート](https://twitter.com/share)
- 

[著]

※この続きは、会員の方のみお読みいただけます（登録無料）。

- [会員登録（無料）](https://creatorzine.jp/user/regist/?ref=%2Farticle%2Fdetail%2F4867%3Fp%3D2&utm_source=creatorzine.jp&utm_medium=self&utm_campaign=regist&utm_term=%2Farticle%2Fdetail%2F4867)
- [ログインはこちら](https://creatorzine.jp/article/detail/4867?p=2#modal_login)
- [前へ](https://creatorzine.jp/article/detail/4867)
- [1](https://creatorzine.jp/article/detail/4867)
- [2](https://creatorzine.jp/article/detail/4867?p=2#!)
- [ バックナンバー](https://creatorzine.jp/article/corner/111)
- [ 印刷用を表示 ](https://creatorzine.jp/article/detail/4867?mode=print)
- [ツイート](https://twitter.com/share)
- 

 
•  [会員登録（無料）](https://creatorzine.jp/user/regist/?ref=%2Farticle%2Fdetail%2F4867%3Fp%3D2&utm_source=creatorzine.jp&utm_medium=self&utm_campaign=regist&utm_term=%2Farticle%2Fdetail%2F4867)  
•  [ログインはこちら](https://creatorzine.jp/article/detail/4867?p=2#modal_login)           Follow Us!       **
Special Contents AD **            **
人気ランキング**  
•  [Daily](https://creatorzine.jp/article/detail/4867?p=2#daily)  
•  [Monthly](https://creatorzine.jp/article/detail/4867?p=2#monthly)      
1.  [   ソニー、レンズ一体型4K旋回型カメラのフラッグシップモデル「BRC-AM7」を発売 
2024/04/13 New   ](https://creatorzine.jp/article/detail/5414)  
2.  [   ライカ、第3弾となるスマートフォン「Leitz Phone 3」発表 LEITZ LOOKSに「可変絞り」機能を搭載 
2024/04/13 New   ](https://creatorzine.jp/article/detail/5413)  
3.  [   再評価されるのは「人間の創造性」 これからの時代に必要な「AIクリエイティブディレクター」とは 
2024/04/12   ](https://creatorzine.jp/article/detail/5381)  
4.  [   UIUXデザインに役立つ心理学の法則8選とその活用法［前編］ 
2024/04/10   ](https://creatorzine.jp/article/detail/5319)  
5.  [   デザイナーがCanvaを使って本気でデザインを作ってみたらこうなった 
2023/07/07   ](https://creatorzine.jp/article/detail/4436)  
6.  [   ソニーのデザイン部門が「Sony Design Gallery」を開催 第1弾はテクノロジーロゴを使った体験型展示 
2024/04/07   ](https://creatorzine.jp/article/detail/5391)  
7.  [   誰よりも「美」を疑い、考える 資生堂クリエイティブがティール組織に辿り着いたワケ 
2023/09/29   ](https://creatorzine.jp/article/detail/4733)  
8.  [   生成AIと3Dの接点をさぐる――ツール「Tripo AI」「Domo AI」を使ってみて 
2024/04/03   ](https://creatorzine.jp/article/detail/5313)  
9.  [   GMOインターネットグループ、生成AI活用により10万6,000時間/月の業務時間を創出 
2024/04/11   ](https://creatorzine.jp/article/detail/5401)  
10.  [   「広告をつくる」とはなにか その本質をクリエイティブディレクター東畑幸多さんと問い直す【前編】 
2023/06/07   ](https://creatorzine.jp/article/detail/4327)            **
新着**  
•  [記事](https://creatorzine.jp/article/detail/4867?p=2#article)  
•  [ニュース](https://creatorzine.jp/article/detail/4867?p=2#news)      
•  [   再評価されるのは「人間の創造性」 これからの時代に必要な「AIクリエイティブディレクター」とは 
2024/04/12   ](https://creatorzine.jp/article/detail/5381)  
•  [   UIUXデザインに役立つ心理学の法則8選とその活用法［前編］ 
2024/04/10   ](https://creatorzine.jp/article/detail/5319)  
•  [   一貫した体験を効率的に提供する仕組み「デザインシステム」の構築にFigmaを使うメリット 
2024/04/09   ](https://creatorzine.jp/article/detail/5351)  
•  [   【2024年度上半期に向けて】CreatorZineで今期とくに注力していく3つのトピックをお伝えします 
2024/04/08   ](https://creatorzine.jp/article/detail/5367)  
•  [   ショート動画を撮影する際のポイントは？ 現場でクリエイティブディレクションを担うメンバーが解説 
2024/04/08   ](https://creatorzine.jp/article/detail/5346)   
 [新着記事一覧を見る](https://creatorzine.jp/article) 