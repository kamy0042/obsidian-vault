---
タグ: []
作成日時: 2022-09-08T01:07:00
URL: https://speakerdeck.com/seanchas116/figmakaratailwind-htmlwo-sheng-cheng-surupuraguinnokai-fa
Tags: [topic/ツール/Figma]
---
イベント: Figmaお楽しみトーク Vol.2 [https://friends.figma.com/events/details/figma-tokyo-presents-figmaole-shimitoku-vol2/](https://friends.figma.com/events/details/figma-tokyo-presents-figmaole-shimitoku-vol2/)

![[preview_slide_0 81.jpg]]

![[preview_slide_0 82.jpg]]

![[preview_slide_0 83.jpg]]

![[preview_slide_0 84.jpg]]

![[preview_slide_0 85.jpg]]

[こわくないasyncio基礎と非同期IO - 動くコードを添えて](https://speakerdeck.com/jrfk/kowakunaiasyncioji-chu-tofei-tong-qi-io-dong-kukodowotian-ete)

![[preview_slide_0 86.jpg]]

![[preview_slide_0 87.jpg]]

![[preview_slide_0 88.jpg]]

[FeatureToggle戦略と運用方法](https://speakerdeck.com/kubotak/featuretogglezhan-lue-toyun-yong-fang-fa)

![[preview_slide_0 89.jpg]]

![[preview_slide_0 90.jpg]]

[[Tdc business - zup ] Desvendando a JVM: arquitetura e funcionamento](https://speakerdeck.com/kamilahsantos/tdc-business-zup-desvendando-a-jvm-arquitetura-e-funcionamento)

![[preview_slide_0 91.jpg]]

![[preview_slide_0 92.jpg]]

[Infographics Made Easy](https://speakerdeck.com/chrislema/infographics-made-easy)

![[preview_slide_0 93.jpg]]

[A Philosophy of Restraint](https://speakerdeck.com/colly/a-philosophy-of-restraint)

![[preview_slide_0 94.jpg]]

![[preview_slide_0 95.jpg]]

[Embracing the Ebb and Flow](https://speakerdeck.com/colly/embracing-the-ebb-and-flow)

![[preview_slide_0 96.jpg]]

[Reflections from 52 weeks, 52 projects](https://speakerdeck.com/jeffersonlam/reflections-from-52-weeks-52-projects)

![[preview_slide_0 97.jpg]]

[The Cult of Friendly URLs](https://speakerdeck.com/andyhume/the-cult-of-friendly-urls)

![[preview_slide_0 98.jpg]]

[Faster Mobile Websites](https://speakerdeck.com/deanohume/faster-mobile-websites)

![[preview_slide_0 99.jpg]]

[The Success of Rails: Ensuring Growth for the Next 100 Years](https://speakerdeck.com/eileencodes/the-success-of-rails-ensuring-growth-for-the-next-100-years)

![[preview_slide_0 100.jpg]]

## Transcript

1. 
    ### [github.com/seanchas116/figma-to-tailwind で開発中 FigmaのレイヤーをHTML+Tailwindに変換するプラグイン Figma Communityには未リリース](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_3.jpg)
2.  https://tailwindcss.com/
    ### [Tailwindについて " クラス名だけで自由なデザインが 表せるCSSフレームワー3 " →コード生成と相性がよさそr " ある意味SVGっぽい HTMLだけでデザインが完結す る](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_4.jpg)
3.  >Item2</ > < >Item3</ > </ > ul li li li li li li ul class ”text-black” { : , : { : }, : [ { : , : }, { : , : }, { : , : }, ], }; tag props class children tag children tag children tag children "ul" "text-black" "li" "Item 1" "li" "Item 2" "li" "Item 3" プログラミング言語などの内容を、ツリー構造のデータにしたもの 括弧、セミコロン、引用符などの 意味に直接関係しない内容は含まない (抽象)
    ### [AST (抽象構文木) とは < = > < >Item1</ > <](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_8.jpg)
4.  ) JSXで構築できたりもする ) でHTMLにする github.com/syntax-tree/hast エコシステムが充実してI hastscripx hast-util-to-html
    ### [AST構築 + 文字列化 ) を使B ) ASTのフォーマット定義 + TS型ライブラ# )](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_9.jpg)
5.  absolutu t テキスト → テキストが入った<div& t fillが画像ひとつのRectangle → <img& t Pathなどの図形 → まとめて <svg> にする
    ### [各レイヤーのDOMへの変換 t Auto Layout → flexboV t それ以外のFrame/Group → position:](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_10.jpg)
6.  89 50 4E 47 0D 0A 1A 05 d JPG → FF D8 F1 d Figmaプラグインでは画像データのバイナリは取れるが 種類が取れないので、これを使って種類判定 File signature
    ### [File siguatureでファイル種類判定 d 画像ファイルでは、最初の数byteがフォーマットごとの 固有の値になっていることが多い ( d PNG →](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_12.jpg)
7.  figma.getImageByHash(fill.imageHash); bytes = image.getBytesAsync() (bytes=== && bytes=== && bytes=== ) { + Buffer.from(bytes).toString( ); } (bytes=== && bytes=== && bytes=== ) { + Buffer.from(bytes).toString( ); } ... 0 0x89 1 0x50 2 0x4e 0 0xff 1 0xd8 2 0xff "data:image/png;base64," "base64" "data:image/jpeg;base64," "base64"
    ### [const const await if return else if return image =](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_13.jpg)
8.  Frame → childrenが全てSVGっぽいレイヤーだったらSV node.exportAsync({ format: "SVG" }) でSVG化 メモ化再帰を使って高速h
    ### [図形をまとめて <svg> にする SVGっぽいレイヤーを判定して、まとめてSVGb 図形レイヤー (Triangle/Rectangle/Pathなど) はSV ](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_14.jpg)
9.  → w-[13px] 12px → w-3
    ### [Arbitrary Values/キーワードを組み合わせた クラス名生成 Tailwindのconfigをパース https://tailwindcss.com/docs/configuration 直に対応するキーワードがあればそれを使う なければArbitrary Valueを出力 例: 幅13px](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_15.jpg)
10.  というプラグインに影響された ちゃんとしたコードが生成されているかの 不安に対処
    ### [リアルタイムプレビュー iframe + でプレビュー Tailwind Play CDN JITのクラス名も ちゃんとプレビューしてくれる Inspect](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_18.jpg)
11.  コピーデータを書き込 U に感謝 seyaさんの記事
    ### [クリップボードにコピー U コピーボタンでクリップボードにコピa U navigator.clipboardが使えなので一工" U document.execCommandを使 U document.addEventListener('copy') で ](https://files.speakerdeck.com/presentations/019b1d83b57942019bae33a506258d24/slide_20.jpg)