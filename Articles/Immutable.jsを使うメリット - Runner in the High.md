---
URL: https://www.instapaper.com/read/1335978036
Updated: 2021-01-01T14:53:00
Created: 2021-01-01T14:53:00
Tags: [topic/技術/React]
---
**Immutable.jsを使うメリット - Runner in the High**[izumisy.work](https://www.izumisy.work/entry/2019/04/20/231905)

·

by IzumiSy (id:IzumiSy)



·


April 20, 2019

先日、新卒で入ったエンジニアが 「Immutable.jsの研修課題をやってるんですけど、正直なんで必要なのか分かんないっす」 と言っていた。

たしかに React, Redux と Immutable.js をセットでつかおうみたいなノリの記事はネットでよく見るが、じゃあなんでそのセットなの？という点に関してはあまり詳しく書かれていないことのが多い気がしたので、個人的にその理由っぽいのを雑に書き残しておこうと思う。

## **イミュータビリティのいいとこ**

- コーディング・バグを減らす
    - 言語仕様上ミュータブルな [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript) は、大勢で開発してるとこっそりどこかで参照を持ったオブジェクトを書き換えてた、なんてことになりやすい。なのでデータを更新する際にはイミュータブルであることが保証できるとバグが起こりにくいコードを書ける
- メモリ効率がいい
    - イミュータブルなオブジェクトは中身が同じなのでコピーが参照のみになり、実行時のメモリ効率がよくなる
    - 参照がコピーされるだけなので、例えばコレクションの比較も実質 O(1) になるので速い
- 地味に[Wikipedia](http://d.hatena.ne.jp/keyword/Wikipedia)の[イミュータブル](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%BF%E3%83%96%E3%83%AB)のページが充実した内容で参考になる

## **ReactとRedux**

- 仕様的に React+Redux 自体がイミュータビリティを期待したものになっている
- React が Unidirectional なデータの流れ方をする
    - [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)の中で明示的に `setState` が呼ばれて初めてビューの更新が予約される。
    - この更新はミュータブルなステートの部分更新などではなく、新しいステートを丸ごと与える。
- Redux が関数型アプローチ
    - React 界のFlux実装の[デファクトスタンダード](http://d.hatena.ne.jp/keyword/%A5%C7%A5%D5%A5%A1%A5%AF%A5%C8%A5%B9%A5%BF%A5%F3%A5%C0%A1%BC%A5%C9)こと Redux はステートの変更を純粋関数で行う
    - 変更を行う Reducer が React のステート更新と同様に既存のステートから新しいステートを返す（イミュータブル）
- この辺の前提に加えて、ES6だけで更新処理周りのコードを書いていると、スプレッド[演算子](http://d.hatena.ne.jp/keyword/%B1%E9%BB%BB%BB%D2)＆ `Object.assign` まみれになるところが、Immutable.jsでスマートに書けたりする。
    - 最近のバージョンでは TypeScript と組み合わせたトランスパイル時のチェックもそこそこいい感じになってきている

## **他の一部**[**フレームワーク**](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)**との相性**

- Vue.js で Vuex に載せるデータを Immutable.js のコレクションにしたら微妙だった
    - そもそも Vuex 自体がステートをミュータブルで持つので、どこがミュータブルでどこがイミュータブルなのかを気をつけないと意図しない挙動が起きることがあった
    - そもそも Vue.js では `Object.defineProperty` と呼ばれる更新検知の機構を使って効率的にオブジェクトの更新を検知しているので、逆に Immutable.js を使わないほうがパフォーマンス的にもよくなる気がするし、むしろ使うべきじゃなかったと思っている。
- [Boost the Performance of an AngularJS Application Using Immutable Data · Minko Gechev's blog](https://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/)
    - ちょっと古いが Immutable.js を AngularJS と使った人の記事
    - AngularJS は Digest Loop の中で scope オブジェクト間の差分チェックをして、もし差分があればそれをビューに適用していく仕組みになっている。これがコレクションになると O(n) になるが、 Immutable.js を使うとコレクション比較が実質 O(1) なのでパフォーマンスが向上する。
    - この作者は `immutable` というディレクティブを自作したらしいが、 AngularJS 組み込みの filter ディレクティブなどとの相性が悪いらしく率直に言って使いづらそうだ。
- Immutable.js は JS のプレーン・オブジェクトへ変換する処理のオーバーヘッドがそこそこデカいので、[ユースケース](http://d.hatena.ne.jp/keyword/%A5%E6%A1%BC%A5%B9%A5%B1%A1%BC%A5%B9)上ここが[ボトルネック](http://d.hatena.ne.jp/keyword/%A5%DC%A5%C8%A5%EB%A5%CD%A5%C3%A5%AF)になってくるとどの[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)と組み合わせていてもイミュータビリティが破綻し始める感がある。
    - [Wantedly](http://d.hatena.ne.jp/keyword/Wantedly) People のフロントエンドを作ってる人がこのつらみをどこかで書いていた気がする
- [JavaScript](http://d.hatena.ne.jp/keyword/JavaScript)におけるコレクション（というか配列）操作についての計算量はここに書いた
[izumisy-tech.hatenablog.com](http://izumisy-tech.hatenablog.com/entry/2018/06/13/220127)

## **まとめ**

- React と Redux 自体がそもそもイミュータビリティとの相性がいい[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)になっているという印象。他の[フレームワーク](http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF)だと場合によっては微妙。 React+Redux でやるなら Immutable.js は入れておいて損がないよ、と言われる理由はだいたいこんなもんかな。
- 余談だが Redux に影響を与えたと言われる Elm は全ての関数が最初からイミュータブル。もはや言語レベルでこうなっているのは結構嬉しかったりする（チームでコンセンサスを得る必要がなかったりするから）
- 最近では [Immer](https://hackernoon.com/introducing-immer-immutability-the-easy-way-9d73d8f71cb3) という Immutable.js [オルタナティブ](http://d.hatena.ne.jp/keyword/%A5%AA%A5%EB%A5%BF%A5%CA%A5%C6%A5%A3%A5%D6)が出たらしい。パット見ではコレクション系のクラスっぽいものがなく[API](http://d.hatena.ne.jp/keyword/API)が非常にシンプルという印象。こっちも要チェックっぽい。
- おそらくイミュータブルの概念を理解するにあたっては[ガベージコレクション](http://d.hatena.ne.jp/keyword/%A5%AC%A5%D9%A1%BC%A5%B8%A5%B3%A5%EC%A5%AF%A5%B7%A5%E7%A5%F3)などのメモリに関する知識と、データに対する計算量などの[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)的な知識のふたつが必要になるのではないかと思う。[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)について学ぶにあたっては、やはり「[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)とデータ構造」が一番おすすめであると言える。

[プログラミングの宝箱 アルゴリズムとデータ構造 第2版](https://www.amazon.co.jp/exec/obidos/ASIN/4797363282/izumisy-22/)

- 作者:[紀平 拓男](http://d.hatena.ne.jp/keyword/%B5%AA%CA%BF%20%C2%F3%C3%CB),[春日 伸弥](http://d.hatena.ne.jp/keyword/%BD%D5%C6%FC%20%BF%AD%CC%EF)
- 発売日: 2011/03/26
- メディア: 単行本

[ガベージコレクション 自動的メモリ管理を構成する理論と実装](https://www.amazon.co.jp/exec/obidos/ASIN/4798134201/izumisy-22/)

- 発売日: 2016/03/15
- メディア: 大型本

[izumisy.work](https://www.izumisy.work/entry/2019/04/20/231905)

·

by IzumiSy (id:IzumiSy)



·


April 20, 2019