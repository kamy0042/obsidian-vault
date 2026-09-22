---
Created: 2022-07-11T13:57:00
URL: https://www.mitsue.co.jp/knowledge/blog/frontend/202207/06_1002.html
Tags: [topic/技術/パフォーマンス]
---
ユーザーの直帰率や離脱率とパフォーマンスの関係から、コンテンツを表示する速度や応答性（ページがユーザー入力に応答する速度）がいかに重要であるかは、既によく知られるようになってきています。
ではコンテンツを表示する速度や応答性を上げるにはどうしたらいいでしょう。
結論から述べるとパフォーマンスを客観的な指標に基づいて正確かつ定量的に測定し、そこから課題を見つけて解決することが必要になります。

Googleは[Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report)に新しく応答性指標INPを導入しました。

## INPとは

INP（Interaction to Next Paint）は、ページの読み込みを開始してからユーザーがページを離れるまでの間に発生するユーザー入力の応答性（インタラクション）を評価する測定基準で、遅延時間を計測します。

計測対象のインタラクションは、以下となります。

- ユーザー入力の合計が50未満の場合：遅延時間が最も大きいインタラクション
- ユーザー入力の合計が50以上の場合：98パーセンタイル（98パーセント番目）のインタラクション

INPで測定される時間は入力遅延時間、処理時間、表示遅延時間の3つのフェーズで構成されています。

- 入力遅延時間：ユーザーがページを操作してからイベントハンドラーが実行される前までの時間
※
- 処理時間：関連するイベントハンドラーでコードを実行するのにかかる時間
- 表示遅延時間：イベントハンドラーの実行が終了してから、ブラウザが次のフレームを表示するまでの時間

※ ユーザー入力のイベントハンドラーにはタッチスクリーンデバイスのタップに反応する`pointerup`、`pointerdown`やマウスクリックに反応する`click`、キーボード押下に反応する`keydown`、`keyup`などがあります。

ページはユーザー入力に応答すると、この3種類の時間が経過した後に、ユーザーインターフェースの変更が視覚として見える形で反映されます。

## INPの目標値

GoogleではINPの目標値を暫定的に以下のように設定しています。

- 200ミリ秒以下：ページの応答性が良好
- 200ミリ秒を超えて500ミリ秒以下：ページの応答性を改善する必要がある
- 500ミリ秒を超える：ページの応答性が不良

INPは遅延時間の指標ですので、値が小さいほどパフォーマンスが優れているサイトといえます。

![[20220613_01.png]]

## First Input Delay（FID）との違い

Core Web VitalsにはFIDというWebサイト応答性を測定する指標がもう1つあります。

ではFIDとINPの違いはというと、以下の表のような違いがあります。

このことからINPはFIDを包括しており、負荷と応答性をより正確に評価できる信頼性の高い指標といえます。

## INPの計測

INPはフィールドデータとラボデータの両方で計測することができます。

インタラクションがない場合は、INP値はありません。

### フィールドデータ

フィールドデータはページにアクセスするユーザーを監視し、ユーザーのデバイスやネットワークなどのさまざまな環境でパフォーマンスを計測します。

監視対象ユーザーはChromeの設定「Chromeの機能と動作の改善に協力する」をオンにしているユーザーです。

フィールドデータの計測ツールには以下のようなものがあります。

1. 
![[20220613_02.png]]

[Chrome User Experience Report (CrUX)](https://developers.google.com/web/tools/chrome-user-experience-report)による計測方法は、計測した値を月ごとのレポートとして確認する時に有効です。

[g.co/chromeuxdash](https://g.co/chromeuxdash)にアクセスし、メールの設定を行います。

2. 
![[20220613_03.png]]
3. 
![[20220613_04.png]]
4. 
![[20220613_05.png]]
5. 
![[20220613_06.png]]

[web-vitals JavaScript library](https://github.com/GoogleChrome/web-vitals/tree/next)による計測方法は、指標ごとの分布図やページごとの指標の計測値一覧を確認する時に有効です。

6. 
![[20220613_09.png]]

### ラボデータ

ラボデータは事前に定義されたデバイスやネットワークを使用し、制御された環境下でのパフォーマンスを計測します。

ラボデータの計測ツールには以下のようなものがあります。

### DevToolsのLighthouseパネル「Timespanモード」

7. 
![[20220613_07.png]]
8. 
![[20220613_08.png]]

### Lighthouse npm module

[Lighthouse npm module](https://www.npmjs.com/package/lighthouse)による計測方法は、計測した値をレポートとして残しておくような時に有効です。

以下npmや各パッケージがインストールされていることを前提に基本的な使用方法を説明します。
オプションやカスタマイズなどの詳細については[Lighthouse npm module](https://www.npmjs.com/package/lighthouse)をご確認ください。INPを計測する場合は[Puppeteer](https://developer.chrome.com/docs/puppeteer/)でインタラクションを実行する必要があります。

9. 
lighthouse.jsの作成（ファイル名は任意です）`https://example.com/`は計測ページのURLに変更してください。
```plain text
import fs from 'fs-extra';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

(async () => {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {
        logLevel: 'info',
        output: 'html',
        onlyCategories: ['performance'],
        port: chrome.port
    };
    const runnerResult = await lighthouse('https://example.com/', options);

    const reportHtml = runnerResult.report;
    fs.writeFileSync('lhreport.html', reportHtml);

    await chrome.kill();
})();
```
10. 
package.jsonのscriptに`"lighthouse": "node lighthouse.js"`を追記し、コマンドラインから`npm run lighthouse`を実行
11. 
生成されたlhreport.htmlをブラウザで表示すると、Lighthouseで計測した値が表示されます
12. 
lighthouse.jsの作成（ファイル名は任意です）`https://example.com/`は計測ページのURLに変更してください。
```plain text
import fs from 'fs-extra';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

(async () => {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance'],
        port: chrome.port
    };
    const runnerResult = await lighthouse('https://example.com/', options);

    const reportJson = runnerResult.report;
    fs.writeFileSync('lhreport.json', reportJson);

    await chrome.kill();
})();
```
13. 
package.jsonのscriptに`"lighthouse": "node lighthouse.js"`を追記し、コマンドラインから`npm run lighthouse`を実行
14. 
Lighthouseで計測した値が表示されます

Chrome ウェブストアの[Web Vitals](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)より、使用方法をご確認ください。

## INPの改善

ページが「適切な」しきい値を超えるINP値を報告している場合は改善策を考えましょう。

### ページ読み込み時のINPの改善

- ChromeのDevToolsのカバレッジツールを使用して、未使用のコードを削除
- ページ読み込み中に不要なJavaScriptを遅延読み込みできるように、コードを分割
- 同時にロードしている可能性のある低速のサードパーティJavaScriptを特定
- パフォーマンスプロファイラーを使用して、処理に時間がかかっているタスクを見つけて最適化
- JavaScriptの実行後、ブラウザのレンダリングにあまり多くのこと（大きなコンポーネントツリーの再レンダリング、大きな画像のデコード、重いCSS効果など）を求めない

### ページ読み込み後のINPの改善

- [postTask API](https://github.com/WICG/scheduling-apis/blob/main/explainers/prioritized-post-task.md)を使用して、タスクに適切な優先順位を付ける
- [requestIdleCallback](https://developer.mozilla.org/ja/docs/Web/API/Window/requestIdleCallback)を使用して、即時実行が必須ではない処理をブラウザがアイドル状態の時に実行するようにスケジュールする
- パフォーマンスプロファイラーを使用して、処理に時間がかかっているタスクを見つけて最適化
- サードパーティのJavaScriptをチェックして、ページの応答性に影響しているかどうかを確認

## まとめ

INPを計測してページのパフォーマンスを上げ、ユーザーエクスペリエンスを向上させていきましょう。