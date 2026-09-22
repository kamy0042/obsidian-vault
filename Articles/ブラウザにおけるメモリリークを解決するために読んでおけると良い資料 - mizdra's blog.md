---
Created: 2021-02-09T00:19:00
URL: https://www.mizdra.net/entry/2021/02/09/001157
Tags: [topic/技術/パフォーマンス]
---
![[Attachments/無題のフォルダ/og-image-1500 3.png]]

最近趣味や仕事の Web アプリケーションでメモリリークに遭遇して、頑張ってメモリリークの原因を突き止めて修正する、ということがあった。その過程でメモリリークについて色々調べて知見が溜まったので、学習資料の紹介という形でアウトプットしてみる [*1](https://www.mizdra.net/entry/2021/02/09/001157)。

## 前提

## 基本的な知識を抑える

- まずメモリリークとメモリ撹拌の違いを学ぼう 
    - どちらも同じメモリに起因する問題だけど、アプリケーションの性質によって深刻度が異なったり、対処方法も変わるのでちゃんと区別しておけると良い
    - こういうのは世の中の事例を見ると分かりやすい
    - [https://www.html5rocks.com/ja/tutorials/memory/effectivemanagement/](https://www.html5rocks.com/ja/tutorials/memory/effectivemanagement/) 
        - Gmail におけるメモリリークの事例
        - 内容は結構古いけど、書いてあることのほとんどは現代でも通用する
    - [https://www.html5rocks.com/ja/tutorials/speed/static-mem-pools/](https://www.html5rocks.com/ja/tutorials/speed/static-mem-pools/) 
        - メモリ撹拌 (**メモリリークとは違う!**) の事例
        - メモリ撹拌自体は GC が実行されればメモリ使用量は元に戻る
        - 頻繁に GC が発生することで GC によるメインスレッドの停止が発生するので、常に 60fps 維持したいアプリケーション(FPS ゲームとか)などでは問題になる
        - 「メモリ撹拌にはオブジェクトプールが有効だよ」みたいな話題も書かれている 
            - 逆にここからメモリリークに対してはオブジェクトプールはそれほど有効ではないことも分かるはず
- Chrome devtools を使ったメモリ問題の特定方法を学ぼう 
    - 記事の内容だいぶ古くて、紹介されているツールの UI 変わっていたりするけど、書いてあることのほとんどは現代でも通用する
    - [https://developers.google.com/web/tools/chrome-devtools/memory-problems?hl=ja](https://developers.google.com/web/tools/chrome-devtools/memory-problems?hl=ja) 
        - 「メモリ中のゴミが測定結果に影響しないよう、メモリのスナップショット取る前にガベージ コレクションを実行しましょう」などが書かれている
    - [https://developers.google.com/web/tools/chrome-devtools/memory-problems/memory-101?hl=ja](https://developers.google.com/web/tools/chrome-devtools/memory-problems/memory-101?hl=ja) 
        - `ドミネーター`という用語は現代の devtools では使われていないので知っておく必要はない
        - `Shallow Size`と`Retained Size`の解説だけ読めていれば良さそう

ここまで読めば、一通りメモリの問題に対処できる力がつくはず。

## その他メモリにまつわる技術資料

- [https://v8.dev/features/weak-references](https://v8.dev/features/weak-references) 
    - `WeakRef` / `FinalizationRegistry` を使うと特定のメモリリークを解決できるケースがあるよ、という話
- [https://web.dev/monitor-total-page-memory-usage/](https://web.dev/monitor-total-page-memory-usage/) 
    - メモリ使用量を測定する API に`performance.memory`というものがあるけど、API 実行直前に GC が発生していたか、そうでないかによって測定結果が大きく変わって使い物にならない 
        - GC 発生直後ならメモリ使用量が少なくなり、発生から十分時間が経過している場合はゴミが残っているのでメモリ使用量が大きくなってしまうはず
    - それを受け、この記事では`performance.memory`の代わりに事前に GC を実行してからメモリ使用量を測定してくれる`performance.measureMemory`を使いましょう、という話が紹介されている
- GC の挙動をもっと知りたい場合
- GC の停止時間がアプリケーションの価値に直結する場合 (FPS ゲームなど) は GC の挙動も知っておけると良い
- V8 チームが出している記事を読むのがオススメ 
    - まず GC の基礎を説明して、それから Chrome 固有の実装の詳細について説明するというスタイルになっていて、比較的読みやすい
    - Chrome が現在のモダンブラウザの中では一番イケているはずなので、とりあえず Chrome だけ抑えておければ良い
    - いわゆる「リファレンス実装」として利用する
- [https://v8.dev/blog/trash-talk](https://v8.dev/blog/trash-talk)
- [https://v8.dev/blog/concurrent-marking](https://v8.dev/blog/concurrent-marking) 
    - Concurrent Marking に関する詳細
- [https://v8.dev/blog/high-performance-cpp-gc](https://v8.dev/blog/high-performance-cpp-gc) 
    - Blink(Chrome のレンダリングエンジン)で利用されている GC「Oilpan」の仕組みの話
    - DOM などは Orinoco ではなく Oilpan によって管理されるので、こっちも読んでおけると良いはず