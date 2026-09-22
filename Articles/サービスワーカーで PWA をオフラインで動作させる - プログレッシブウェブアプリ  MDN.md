---
Updated: 2021-01-08T02:49:00
Created: 2021-01-08T02:49:00
URL: https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers
Tags: [topic/技術/PWA]
---
![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 451.74 135' role='img' data-evernote-id='423' class='js-evernote-checked'%3e%3cg id='Layer_2' data-name='Layer 2' data-evernote-id='424' class='js-evernote-checked'%3e%3cpath class='cls-1 js-evernote-checked' d='M7.14%2c8.35V119.41H118.19V8.35Zm103.71%2c56c-.48.92-1%2c1.79-1.46%2c2.71a3.44%2c3.44%2c0%2c0%2c1-3.54%2c2%2c2.4%2c2.4%2c0%2c0%2c0-1.55.5c-1.37.9-2.76%2c1.79-4.18%2c2.63a7.33%2c7.33%2c0%2c0%2c1-6.35.34%2c29.71%2c29.71%2c0%2c0%2c0-10.63-2%2c11.7%2c11.7%2c0%2c0%2c0-9.46%2c4.31%2c14.84%2c14.84%2c0%2c0%2c0-2.13%2c4.29c-1.24%2c3.07-2.3%2c21.38-2.3%2c26.05%2c0%2c0-17.62-3.42-34.15-20.34l4.31-11.32H25.91l9.76-10.35H18.87l9.77-10.34H12.69L30.45%2c34A40.9%2c40.9%2c0%2c0%2c1%2c50.22%2c23.17c7.1-1.22%2c8.93-.53%2c13.31.77l2.43.73.85.25%2c3.1.95a12.56%2c12.56%2c0%2c0%2c0%2c6.21.09%2c11.37%2c11.37%2c0%2c0%2c1%2c8.25%2c1%2c8.24%2c8.24%2c0%2c0%2c1%2c4.1%2c6.22%2c7.29%2c7.29%2c0%2c0%2c0%2c3.61%2c5.49%2c59.45%2c59.45%2c0%2c0%2c0%2c9.32%2c4.11c2.27.86%2c4.54%2c1.84%2c6.79%2c2.72a6.81%2c6.81%2c0%2c0%2c1%2c2.86%2c2.06%2c4.81%2c4.81%2c0%2c0%2c1%2c1.1%2c2.73c.14%2c2%2c.37%2c4%2c.47%2c6h0A15.24%2c15.24%2c0%2c0%2c1%2c110.85%2c64.32Z' data-evernote-id='425'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M320.12%2c39.62a5.42%2c5.42%2c0%2c0%2c0-4.53%2c2.13%2c7.36%2c7.36%2c0%2c0%2c0-1.7%2c4.43v2.36a6.28%2c6.28%2c0%2c0%2c0%2c1.7%2c4.46%2c5.63%2c5.63%2c0%2c0%2c0%2c4.3%2c1.82%2c5.12%2c5.12%2c0%2c0%2c0%2c4.57-2.27A9.7%2c9.7%2c0%2c0%2c0%2c326%2c47a8.11%2c8.11%2c0%2c0%2c0-1.67-5.52A5.36%2c5.36%2c0%2c0%2c0%2c320.12%2c39.62Z' data-evernote-id='426'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M387.38%2c39.53a5.52%2c5.52%2c0%2c0%2c0-4.7%2c2.15%2c8.8%2c8.8%2c0%2c0%2c0-1.63%2c5.49%2c9.23%2c9.23%2c0%2c0%2c0%2c1.58%2c5.45%2c5.38%2c5.38%2c0%2c0%2c0%2c4.7%2c2.25%2c5.61%2c5.61%2c0%2c0%2c0%2c4.74-2.2%2c8.91%2c8.91%2c0%2c0%2c0%2c1.68-5.59A8.24%2c8.24%2c0%2c0%2c0%2c392%2c41.56%2c5.76%2c5.76%2c0%2c0%2c0%2c387.38%2c39.53Z' data-evernote-id='427'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M299.47%2c41.35a4.34%2c4.34%2c0%2c0%2c0-4-1.92%2c4.55%2c4.55%2c0%2c0%2c0-3.89%2c1.73A8.37%2c8.37%2c0%2c0%2c0%2c290%2c45.33h10.48A6.3%2c6.3%2c0%2c0%2c0%2c299.47%2c41.35Z' data-evernote-id='428'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M357.74%2c30.75H352V54.06h5.72q5.47%2c0%2c8.35-3T369%2c42.41q0-5.43-2.88-8.55T357.74%2c30.75Z' data-evernote-id='429'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M121.55%2c8.35v70.8h323V8.35ZM163.76%2c30.8h-4V54h3.68v3.73H152.19V54h3.31V36.79h-.19l-9.63%2c19.12h-2.12l-10-19.4h-.19V54h3.45v3.73H125.67V54h3.68V30.8h-4V27.07H133l11.66%2c22.56h.19l11.18-22.56h7.7Zm29.12%2c22.67q-4.11%2c4.28-11.38%2c4.28H167.44V54.06h3.73V30.75h-3.73V27.07h13.83q7.59%2c0%2c11.66%2c4.29a15.4%2c15.4%2c0%2c0%2c1%2c4%2c11A15.33%2c15.33%2c0%2c0%2c1%2c192.88%2c53.47ZM231.77%2c30.8h-3.68v27h-2.6L208.08%2c35h-.19V54h4.67v3.73H200.34V54h3.49V30.8h-4V27.07h7.08l16.9%2c22.09H224V30.8h-4.58V27.07h12.32Zm43.8%2c27h-3.31l-7.83-23.18h-.19l-7.55%2c23.18h-3.35L244.56%2c30.8h-2.65V27.07H253V30.8h-3.87L255%2c50.71h.23l6.61-19.91H259V27.07h11V30.8h-2.78l6.61%2c20.1h.23l5.43-20.1h-4.15V27.07h11V30.8h-2.54Zm26.71-1.51a9.66%2c9.66%2c0%2c0%2c1-6.42%2c2%2c10.2%2c10.2%2c0%2c0%2c1-7.41-2.74c-1.89-1.82-2.83-4.47-2.83-7.93a12.37%2c12.37%2c0%2c0%2c1%2c2.64-8.12%2c9%2c9%2c0%2c0%2c1%2c7.32-3.21%2c8.62%2c8.62%2c0%2c0%2c1%2c6.75%2c2.69%2c9.65%2c9.65%2c0%2c0%2c1%2c2.45%2c6.52%2c13.67%2c13.67%2c0%2c0%2c1-.28%2c2.69H290q.29%2c6.71%2c6.18%2c6.7a5.2%2c5.2%2c0%2c0%2c0%2c3.71-1.18%2c5.82%2c5.82%2c0%2c0%2c0%2c1.67-2.83l3.45.71A7.21%2c7.21%2c0%2c0%2c1%2c302.28%2c56.24Zm25.77-1.63c-1.51%2c2.4-3.92%2c3.61-7.22%2c3.61s-5.84-1.29-7.22-3.87c0%2c.25-.1.82-.21%2c1.7s-.19%2c1.44-.22%2c1.7H309c.16-1%2c.31-2%2c.47-3.07a21.42%2c21.42%2c0%2c0%2c0%2c.24-3.16v-23h-3.4V25.27h7.55V40.9a9.76%2c9.76%2c0%2c0%2c1%2c2.67-3.28%2c7.33%2c7.33%2c0%2c0%2c1%2c4.74-1.4A8.48%2c8.48%2c0%2c0%2c1%2c327.77%2c39q2.55%2c2.74%2c2.55%2c7.74A14.6%2c14.6%2c0%2c0%2c1%2c328.05%2c54.61Zm41.39-1.14q-4.11%2c4.28-11.37%2c4.28H344V54.06h3.73V30.75H344V27.07h13.83q7.59%2c0%2c11.66%2c4.29a15.41%2c15.41%2c0%2c0%2c1%2c4.06%2c11A15.34%2c15.34%2c0%2c0%2c1%2c369.44%2c53.47Zm25.65%2c1.68a10.53%2c10.53%2c0%2c0%2c1-7.9%2c3.07%2c10%2c10%2c0%2c0%2c1-7.63-3%2c10.93%2c10.93%2c0%2c0%2c1-2.8-7.83%2c12.13%2c12.13%2c0%2c0%2c1%2c2.69-7.93q2.69-3.3%2c8-3.3t8%2c3.28a12%2c12%2c0%2c0%2c1%2c2.64%2c7.76A10.86%2c10.86%2c0%2c0%2c1%2c395.09%2c55.15Zm22.61.57c-1.4%2c1.66-3.63%2c2.5-6.68%2c2.5a9.58%2c9.58%2c0%2c0%2c1-7.15-2.76q-2.72-2.76-2.71-7.91a12.25%2c12.25%2c0%2c0%2c1%2c2.69-8%2c9.17%2c9.17%2c0%2c0%2c1%2c7.5-3.28%2c15%2c15%2c0%2c0%2c1%2c3.82.48%2c10.37%2c10.37%2c0%2c0%2c1%2c3.5%2c1.65l.85%2c5.47-3.35.38-.76-3.54a8.07%2c8.07%2c0%2c0%2c0-4.11-1%2c4.9%2c4.9%2c0%2c0%2c0-4.39%2c2.15%2c9.93%2c9.93%2c0%2c0%2c0-1.41%2c5.55A8.9%2c8.9%2c0%2c0%2c0%2c407%2c52.84a5.23%2c5.23%2c0%2c0%2c0%2c4.44%2c2c2.92%2c0%2c4.67-1.7%2c5.23-5.1l3.5.71A10.34%2c10.34%2c0%2c0%2c1%2c417.7%2c55.72Zm20.48.75a11.68%2c11.68%2c0%2c0%2c1-6.63%2c1.75%2c15.52%2c15.52%2c0%2c0%2c1-8.26-2.08L424%2c51l3.26.33-.1%2c2.74a7%2c7%2c0%2c0%2c0%2c2.06.66%2c12.63%2c12.63%2c0%2c0%2c0%2c2.19.19%2c8.68%2c8.68%2c0%2c0%2c0%2c3.66-.75%2c2.5%2c2.5%2c0%2c0%2c0%2c1.63-2.36%2c2.25%2c2.25%2c0%2c0%2c0-1.32-2.2%2c12.65%2c12.65%2c0%2c0%2c0-3.28-1c-1.31-.22-2.61-.49-3.9-.82a7.5%2c7.5%2c0%2c0%2c1-3.25-1.7%2c4.67%2c4.67%2c0%2c0%2c1-1.33-3.66c0-2.36.88-4%2c2.62-4.91a12%2c12%2c0%2c0%2c1%2c5.6-1.37%2c15%2c15%2c0%2c0%2c1%2c4.08.55%2c16.65%2c16.65%2c0%2c0%2c1%2c3.47%2c1.39l.47%2c5.1-3.3.37-.48-3.3a9.5%2c9.5%2c0%2c0%2c0-4.06-.9%2c5.62%2c5.62%2c0%2c0%2c0-2.87.66A2.33%2c2.33%2c0%2c0%2c0%2c428%2c42.27a2.13%2c2.13%2c0%2c0%2c0%2c1.3%2c2.07%2c11.91%2c11.91%2c0%2c0%2c0%2c3.21.92%2c36.69%2c36.69%2c0%2c0%2c1%2c3.82.83%2c7.46%2c7.46%2c0%2c0%2c1%2c3.21%2c1.74%2c4.9%2c4.9%2c0%2c0%2c1%2c1.3%2c3.73A5.56%2c5.56%2c0%2c0%2c1%2c438.18%2c56.47Z' data-evernote-id='430'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M181.17%2c30.75h-5.71V54.06h5.71q5.47%2c0%2c8.36-3t2.88-8.61q0-5.43-2.88-8.55T181.17%2c30.75Z' data-evernote-id='431'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M121.63%2c119.32V81.74H236.54v37.58ZM153.22%2c109h-2v-6.85a4.8%2c4.8%2c0%2c0%2c0-1.58-4%2c5.57%2c5.57%2c0%2c0%2c0-3.55-1.26%2c5%2c5%2c0%2c0%2c0-4.92%2c3.26%2c4.19%2c4.19%2c0%2c0%2c0-1.88-2.46%2c5.82%2c5.82%2c0%2c0%2c0-3-.8%2c4.89%2c4.89%2c0%2c0%2c0-4.56%2c2.56V97.24h-6.28v3.26h2V109h-2v3.23h9.11V109H131.7v-5.25a4.4%2c4.4%2c0%2c0%2c1%2c.69-2.56%2c2.47%2c2.47%2c0%2c0%2c1%2c2.21-1q2.57%2c0%2c2.56%2c3.63v8.41h6.29V109h-2v-5.25a4.47%2c4.47%2c0%2c0%2c1%2c.67-2.56%2c2.42%2c2.42%2c0%2c0%2c1%2c2.19-1q2.63%2c0%2c2.63%2c3.63v8.41h6.28Zm9.88-12.07q-4%2c0-6%2c2.36a8.41%2c8.41%2c0%2c0%2c0-2%2c5.66%2c7.25%2c7.25%2c0%2c0%2c0%2c2.17%2c5.62%2c8%2c8%2c0%2c0%2c0%2c5.65%2c2%2c8.54%2c8.54%2c0%2c0%2c0%2c5.94-2.11%2c7.27%2c7.27%2c0%2c0%2c0%2c2.34-5.67%2c8.21%2c8.21%2c0%2c0%2c0-2-5.51Q167.13%2c96.94%2c163.1%2c96.94ZM163%2c109.28a3%2c3%2c0%2c0%2c1-2.63-1.33%2c5.68%2c5.68%2c0%2c0%2c1-.9-3.26%2c5%2c5%2c0%2c0%2c1%2c1-3.28%2c3.23%2c3.23%2c0%2c0%2c1%2c2.61-1.18%2c3.5%2c3.5%2c0%2c0%2c1%2c2.59%2c1.08%2c4.56%2c4.56%2c0%2c0%2c1%2c1.07%2c3.31%2c5.21%2c5.21%2c0%2c0%2c1-1%2c3.41A3.33%2c3.33%2c0%2c0%2c1%2c163%2c109.28Zm25-2.3-3.39-.29-.7%2c2.32H179l8.32-9.54L187%2c97.24H173.81l-.53%2c5.25%2c3.16.34.67-2.36h4.65L173.51%2c110l.44%2c2.26h13.13Zm7.62-9.74h-4.46v5.39h4.46Zm0%2c9.61h-4.46v5.39h4.46Zm13.54-17.49h-4.23l-6.48%2c22.88h4.22Zm8.68%2c0h-4.23l-6.45%2c22.88h4.19Zm15%2c22.51-.07-2.26a1.22%2c1.22%2c0%2c0%2c1-.56.1c-.69%2c0-1-.39-1-1.16v-6.49a4.39%2c4.39%2c0%2c0%2c0-1.8-3.84%2c7%2c7%2c0%2c0%2c0-4.16-1.28%2c14.55%2c14.55%2c0%2c0%2c0-3.16.3%2c24.14%2c24.14%2c0%2c0%2c0-3.29%2c1.06l-.56%2c3.46%2c3.39.4.5-1.69a2.78%2c2.78%2c0%2c0%2c1%2c1.08-.37%2c11.3%2c11.3%2c0%2c0%2c1%2c1.25-.07c1.19%2c0%2c1.89.37%2c2.09%2c1.1a8.55%2c8.55%2c0%2c0%2c1%2c.3%2c2.26v.5a8.91%2c8.91%2c0%2c0%2c0-1.18-.11c-.41%2c0-.81%2c0-1.21%2c0a12.64%2c12.64%2c0%2c0%2c0-4.81.88%2c3.53%2c3.53%2c0%2c0%2c0-2.18%2c3.64%2c3.66%2c3.66%2c0%2c0%2c0%2c1.48%2c3.33%2c5.63%2c5.63%2c0%2c0%2c0%2c3.11%2c1%2c4.67%2c4.67%2c0%2c0%2c0%2c3-.91%2c6.78%2c6.78%2c0%2c0%2c0%2c1.8-2%2c3%2c3%2c0%2c0%2c0%2c3.33%2c3A5.54%2c5.54%2c0%2c0%2c0%2c232.85%2c111.87Zm-9.25-2.32a1.69%2c1.69%2c0%2c0%2c1-1.36-.52%2c1.81%2c1.81%2c0%2c0%2c1-.43-1.21%2c1.67%2c1.67%2c0%2c0%2c1%2c.86-1.68%2c4.63%2c4.63%2c0%2c0%2c1%2c2-.42%2c7.69%2c7.69%2c0%2c0%2c1%2c1.07.07l1.06.13a3.58%2c3.58%2c0%2c0%2c1-1.08%2c2.74A3.24%2c3.24%2c0%2c0%2c1%2c223.6%2c109.55Z' data-evernote-id='432'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

Search MDN

[**Sign in**](https://developer.mozilla.org/ja/users/account/signup-landing?next=%2Fja%2Fdocs%2FWeb%2FProgressive_web_apps%2FOffline_Service_workers)

# サービスワーカーで PWA をオフラインで動作させる

1. [開発者向けのウェブ技術](https://developer.mozilla.org/ja/docs/Web)
2. [プログレッシブウェブアプリ](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps)
3. [サービスワーカーで PWA をオフラインで動作させる](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers)

Select your preferred language

# Jump to section

- [サービスワーカーの説明](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#service_workers_explained)
- [オフライン優先](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#offline_first)
- [PWA における「プログレッシブ」](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#progressive_in_pwa)
- [js13kPWA アプリのサービスワーカー](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#service_workers_in_the_js13kpwa_app)
- [更新](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#updates)
- [キャッシュのクリア](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#clearing_the_cache)
- [その他のユースケース](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#other_use_cases)
- [まとめ](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#summary)

[**前のページ **](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/App_structure)[** Overview: Progressive web apps**](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps)[** 次のページ**](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Installable_PWAs)

js13kPWA の構造と、基本シェルが起動し実行させる様子を見てきたので、サービスワーカーを使用したオフライン機能の実装方法を見てみましょう。 この記事では、 [js13kPWA の例](https://mdn.github.io/pwa-examples/js13kpwa/) ([ソースコードはこちら](https://github.com/mdn/pwa-examples/tree/master/js13kpwa)) で使用されている実現方法を見てみましょう。 どのようにオフライン機能を追加するのかを学習します。

# [サービスワーカーの説明](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#service_workers_explained)

サービスワーカー（Service Workers）は、ブラウザーとネットワーク間の仮想プロキシです。 これらはついにフロントエンド開発者が長年にわたって苦労してきた問題を修正します — 最も注目に値するのは、ウェブサイトのアセットを適切にキャッシュし、ユーザーのデバイスがオフラインのときにそれらを利用できるようにする方法です。

これらは、ページのメインの JavaScript コードとは別のスレッドで実行され、DOM 構造にアクセスすることはできません。 これは、従来のウェブプログラミングとは異なるアプローチを取り入れています — API はノンブロッキングで、異なるコンテキスト間で通信を送受信できます。 あなたはサービスワーカーに取り組むべき何かを与え、約束（[Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)）ベースのアプローチを使用して準備ができているときはいつでも結果を受け取ることができます。
通知の処理、別のスレッドでの大量の計算など、オフライン機能を提供するだけではありません。 サービスワーカーは、ネットワーク要求を制御したり、それらを変更したり、キャッシュから取得したカスタム応答を提供したり、応答を完全に合成したりできるので、非常に強力です。

# [セキュリティ](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#security)

サービスワーカーは非常に強力であるため、安全なコンテキスト（HTTPS を意味する）でしか実行できません。 コードを本番環境に移行する前に最初に試してみたい場合は、いつでも localhost でテストするか GitHub Pages を設定することができます。 どちらも HTTPS をサポートしています。

# [オフライン優先](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#offline_first)

「オフライン優先」または「キャッシュ優先」のパターンは、コンテンツをユーザーに提供するための最も一般的な戦略です。 リソースがキャッシュされてオフラインで利用可能な場合は、サーバーからダウンロードする前に最初にそれを返します。 まだキャッシュに入っていない場合は、ダウンロードして将来の使用に備えてキャッシュします。

# [PWA における「プログレッシブ」](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#progressive_in_pwa)

プログレッシブエンハンスメントとして適切に実装されている場合、サービスワーカーは、オフラインサポートを提供することで API をサポートする最新のブラウザーを使用しているユーザーにメリットをもたらすことができますが、従来のブラウザを使用しているユーザーにとっては何もだめになりません。

# [js13kPWA アプリのサービスワーカー](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#service_workers_in_the_js13kpwa_app)

十分な理論 — いくつかのソースコードを見てみましょう！

# [サービスワーカーの登録](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#registering_the_service_worker)

app.js ファイルで、新しいサービスワーカーを登録するコードを見ることから始めます。

**注** : ここでは [es6](http://es6-features.org/) の**アロー関数**の構文をサービスワーカーの実装に使用しています。

`if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./pwa-examples/js13kpwa/sw.js');
};`
[Service Worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API) をブラウザーがサポートしている場合は、[`ServiceWorkerContainer.register()`](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerContainer/register) メソッドを使用してサイトに対して登録します。 その内容は `sw.js` ファイルにあり、登録が成功した後に実行できます。 これが `app.js` ファイルの中にある唯一のサービスワーカーのコードで、それ以外のサービスワーカー固有のものはすべて `sw.js` ファイル自体にあります。

# [サービスワーカーのライフサイクル](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#lifecycle_of_a_service_worker)

登録が完了すると、`sw.js` ファイルが自動的にダウンロードされてからインストールされ、最後にアクティブになります。

**インストール**
API を使用すると、関心のある重要なイベントのイベントリスナーを追加できます — 最初のものは `install` イベントです。

`self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});`
`install` リスナーで、キャッシュを初期化し、オフラインで使用するためにファイルをキャッシュに追加することができます。 js13kPWA アプリはまさにそれを行います。
まず、キャッシュ名を格納するための変数が作成され、アプリシェル（app shell）のファイルが1つの配列にリストされます。

`var cacheName = 'js13kPWA-v1';
var appShellFiles = [
  '/pwa-examples/js13kpwa/',
  '/pwa-examples/js13kpwa/index.html',
  '/pwa-examples/js13kpwa/app.js',
  '/pwa-examples/js13kpwa/style.css',
  '/pwa-examples/js13kpwa/fonts/graduate.eot',
  '/pwa-examples/js13kpwa/fonts/graduate.ttf',
  '/pwa-examples/js13kpwa/fonts/graduate.woff',
  '/pwa-examples/js13kpwa/favicon.ico',
  '/pwa-examples/js13kpwa/img/js13kgames.png',
  '/pwa-examples/js13kpwa/img/bg.png',
  '/pwa-examples/js13kpwa/icons/icon-32.png',
  '/pwa-examples/js13kpwa/icons/icon-64.png',
  '/pwa-examples/js13kpwa/icons/icon-96.png',
  '/pwa-examples/js13kpwa/icons/icon-128.png',
  '/pwa-examples/js13kpwa/icons/icon-168.png',
  '/pwa-examples/js13kpwa/icons/icon-192.png',
  '/pwa-examples/js13kpwa/icons/icon-256.png',
  '/pwa-examples/js13kpwa/icons/icon-512.png'
];`
次に、`data/games.js` ファイルからのコンテンツとともにロードされる画像へのリンクが2番目の配列に生成されます。 その後、両方の配列は [`Array.prototype.concat()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) 関数を使ってマージされます。

`var gamesImages = [];
for(var i=0; i<games.length; i++) {
  gamesImages.push('data/img/'+games[i].slug+'.jpg');
}
var contentToCache = appShellFiles.concat(gamesImages);`
それから、`install` イベント自体を管理できます。

`self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});`
ここで説明が必要なことが2つあります — [`ExtendableEvent.waitUntil`](https://developer.mozilla.org/ja/docs/Web/API/ExtendableEvent/waitUntil) が行うことと、[`caches`](https://developer.mozilla.org/ja/docs/Web/API/Cache) オブジェクトとは何か。
サービスワーカーは、`waitUntil` 内のコードが実行されるまでインストールされません。 それは約束（promise）を返します — インストールにはしばらく時間がかかるかもしれないので完了するまで待つこのアプローチが必要です。
`caches` は特定のサービスワーカーの範囲内でデータの保存を可能にする特別な [`CacheStorage`](https://developer.mozilla.org/ja/docs/Web/API/CacheStorage) オブジェクトです — [ウェブストレージ](https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API)は同期的であるため、ウェブストレージへの保存は機能しません。 サービスワーカーでは、代わりに Cache API を使用します。
ここでは、指定した名前でキャッシュを開き、アプリが使用するすべてのファイルをキャッシュに追加するので、次回のロード時に利用可能になります（要求 URL で識別されます）。**
****アクティベーション**
`activate` イベントもあり、これは `install` と同じ方法で使用されます。 このイベントは通常、不要になったファイルを削除し、一般的にアプリの後にクリーンアップするために使用されます。 私たちのアプリでそれをする必要はないので、それをスキップします。

# [フェッチへの応答](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#responding_to_fetches)

また、自由に使える `fetch` イベントもあり、これは HTTP 要求がアプリから発するたびに発生します。 これは要求を傍受してカスタム応答でそれらに応答することを可能にするので非常に便利です。 これは簡単な使用例です。

`self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Fetched resource '+e.request.url);
});`
応答は望むものなら何でも構いません — 要求されたファイル、そのキャッシュされたコピー、または特定のことを実行する JavaScript コードの一部 — 可能性は無限大です。
このサンプルアプリでは、リソースが実際にキャッシュ内にある限り、ネットワークではなくキャッシュからコンテンツを提供します。 アプリがオンラインかオフラインかに関係なく、これを行います。 ファイルがキャッシュにない場合、アプリはそれを提供する前にまずそこに追加します。

`self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});`
ここでは、キャッシュ内のリソースを見つけ、存在する場合は応答を返そうとする関数を使用して、`fetch` イベントに応答します。 存在しない場合は、別のフェッチ要求を使用してネットワークからそれをフェッチし、次に応答がキャッシュに格納されるので、次に要求されたときに応答が使用可能になります。
[`FetchEvent.respondWith`](https://developer.mozilla.org/ja/docs/Web/API/FetchEvent/respondWith) メソッドが制御を引き継ぎます — これは、アプリとネットワークの間のプロキシサーバーとして機能する部分です。 これにより、すべての要求に対して、必要な応答を返すことができます — サービスワーカーによって準備され、キャッシュから取得され、必要に応じて変更された。
それでおしまい！ 私たちのアプリはインストール時にそのリソースをキャッシュしてキャッシュからのフェッチでそれらを提供しているので、ユーザーがオフラインであっても機能します。 追加されるたびに新しいコンテンツもキャッシュします。

# [更新](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#updates)

まだカバーしておくべき1つのポイントがあります — 新しいアセットを含むアプリの新しいバージョンが利用可能になったときにどのようにサービスワーカーをアップグレードするのでしょうか？ これには、キャッシュ名のバージョン番号が重要です。

`var cacheName = 'js13kPWA-v1';`
これが v2 に更新されるとき、新しいキャッシュに（新しいファイルを含む）すべてのファイルを追加することができます。

`contentToCache.push('/pwa-examples/js13kpwa/icons/icon-32.png');

// ...

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('js13kPWA-v2').then((cache) => {
      return cache.addAll(contentToCache);
    })
  );
});`
新しいサービスワーカーがバックグラウンドでインストールされ、前のバージョン（v1）はそれを使用するページがなくなるまで正しく動作します — 新しいサービスワーカーがアクティブになり、古いページからページの管理を引き継ぎます。

# [キャッシュのクリア](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#clearing_the_cache)

スキップした `activate` イベントを覚えていますか？ これは、不要になった古いキャッシュを消去するために使用できます。

`self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
        if(key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});`
これにより、必要なファイルだけがキャッシュに保存されるので、ゴミが残ることはありません — [ブラウザーで利用可能なキャッシュスペースは限られている](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)ので、後で自分でクリーンアップすることをお勧めします。

# [その他のユースケース](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#other_use_cases)

サービスワーカーが提供する機能は、キャッシュからファイルを提供することだけではありません。 大量の計算が必要な場合は、メインスレッドからそれらをオフロードしてワーカーで実行し、使用可能になったらすぐに結果を受け取ることができます。 パフォーマンス面では、今は必要ではないが近い将来にある可能性があるリソースをプリフェッチすることができるため、実際にそれらのリソースが必要な場合はアプリの速度が速くなります。

# [まとめ](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers#summary)

この記事では、PWA をサービスワーカーとオフラインで連携させる方法について簡単に説明しました。 [Service Worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API) の背後にある概念と、それをより詳細に使用する方法についてもっと知りたい場合は、さらに詳しい資料をチェックしてください。

[プッシュ通知](https://developer.mozilla.org/ja/docs/Web/API/Push_API)を処理するときにもサービスワーカーを使用します — これについては後の記事で説明します。[** 前のページ **](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/App_structure)[** Overview: Progressive web apps**](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps)[** 次のページ**](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Installable_PWAs)

# Related Topics

1. [PWA をインストール可能にするには](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Installable_PWAs)
2. [サービスワーカーで PWA をオフラインで動作させる](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers)
3. [プログレッシブウェブアプリの利点](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Advantages)
4. [プログレッシブウェブアプリの構造](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/App_structure)
5. [プログレッシブウェブアプリの紹介](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Introduction)
6. [プログレッシブ読み込み](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Loading)
7. [ホーム画面に追加](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Add_to_home_screen)
8. [通知とプッシュを利用して PWA を再エンゲージ可能にするには](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Re-engageable_Notifications_Push)

**Last modified:** 2020年8月16日, [by MDN contributors](https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers/contributors.txt)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 451.74 135' role='img' fill='%23fff' data-evernote-id='740' class='js-evernote-checked'%3e%3cg id='Layer_2' data-name='Layer 2' data-evernote-id='741' class='js-evernote-checked'%3e%3cpath class='cls-1 js-evernote-checked' d='M7.14%2c8.35V119.41H118.19V8.35Zm103.71%2c56c-.48.92-1%2c1.79-1.46%2c2.71a3.44%2c3.44%2c0%2c0%2c1-3.54%2c2%2c2.4%2c2.4%2c0%2c0%2c0-1.55.5c-1.37.9-2.76%2c1.79-4.18%2c2.63a7.33%2c7.33%2c0%2c0%2c1-6.35.34%2c29.71%2c29.71%2c0%2c0%2c0-10.63-2%2c11.7%2c11.7%2c0%2c0%2c0-9.46%2c4.31%2c14.84%2c14.84%2c0%2c0%2c0-2.13%2c4.29c-1.24%2c3.07-2.3%2c21.38-2.3%2c26.05%2c0%2c0-17.62-3.42-34.15-20.34l4.31-11.32H25.91l9.76-10.35H18.87l9.77-10.34H12.69L30.45%2c34A40.9%2c40.9%2c0%2c0%2c1%2c50.22%2c23.17c7.1-1.22%2c8.93-.53%2c13.31.77l2.43.73.85.25%2c3.1.95a12.56%2c12.56%2c0%2c0%2c0%2c6.21.09%2c11.37%2c11.37%2c0%2c0%2c1%2c8.25%2c1%2c8.24%2c8.24%2c0%2c0%2c1%2c4.1%2c6.22%2c7.29%2c7.29%2c0%2c0%2c0%2c3.61%2c5.49%2c59.45%2c59.45%2c0%2c0%2c0%2c9.32%2c4.11c2.27.86%2c4.54%2c1.84%2c6.79%2c2.72a6.81%2c6.81%2c0%2c0%2c1%2c2.86%2c2.06%2c4.81%2c4.81%2c0%2c0%2c1%2c1.1%2c2.73c.14%2c2%2c.37%2c4%2c.47%2c6h0A15.24%2c15.24%2c0%2c0%2c1%2c110.85%2c64.32Z' data-evernote-id='742'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M320.12%2c39.62a5.42%2c5.42%2c0%2c0%2c0-4.53%2c2.13%2c7.36%2c7.36%2c0%2c0%2c0-1.7%2c4.43v2.36a6.28%2c6.28%2c0%2c0%2c0%2c1.7%2c4.46%2c5.63%2c5.63%2c0%2c0%2c0%2c4.3%2c1.82%2c5.12%2c5.12%2c0%2c0%2c0%2c4.57-2.27A9.7%2c9.7%2c0%2c0%2c0%2c326%2c47a8.11%2c8.11%2c0%2c0%2c0-1.67-5.52A5.36%2c5.36%2c0%2c0%2c0%2c320.12%2c39.62Z' data-evernote-id='743'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M387.38%2c39.53a5.52%2c5.52%2c0%2c0%2c0-4.7%2c2.15%2c8.8%2c8.8%2c0%2c0%2c0-1.63%2c5.49%2c9.23%2c9.23%2c0%2c0%2c0%2c1.58%2c5.45%2c5.38%2c5.38%2c0%2c0%2c0%2c4.7%2c2.25%2c5.61%2c5.61%2c0%2c0%2c0%2c4.74-2.2%2c8.91%2c8.91%2c0%2c0%2c0%2c1.68-5.59A8.24%2c8.24%2c0%2c0%2c0%2c392%2c41.56%2c5.76%2c5.76%2c0%2c0%2c0%2c387.38%2c39.53Z' data-evernote-id='744'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M299.47%2c41.35a4.34%2c4.34%2c0%2c0%2c0-4-1.92%2c4.55%2c4.55%2c0%2c0%2c0-3.89%2c1.73A8.37%2c8.37%2c0%2c0%2c0%2c290%2c45.33h10.48A6.3%2c6.3%2c0%2c0%2c0%2c299.47%2c41.35Z' data-evernote-id='745'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M357.74%2c30.75H352V54.06h5.72q5.47%2c0%2c8.35-3T369%2c42.41q0-5.43-2.88-8.55T357.74%2c30.75Z' data-evernote-id='746'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M121.55%2c8.35v70.8h323V8.35ZM163.76%2c30.8h-4V54h3.68v3.73H152.19V54h3.31V36.79h-.19l-9.63%2c19.12h-2.12l-10-19.4h-.19V54h3.45v3.73H125.67V54h3.68V30.8h-4V27.07H133l11.66%2c22.56h.19l11.18-22.56h7.7Zm29.12%2c22.67q-4.11%2c4.28-11.38%2c4.28H167.44V54.06h3.73V30.75h-3.73V27.07h13.83q7.59%2c0%2c11.66%2c4.29a15.4%2c15.4%2c0%2c0%2c1%2c4%2c11A15.33%2c15.33%2c0%2c0%2c1%2c192.88%2c53.47ZM231.77%2c30.8h-3.68v27h-2.6L208.08%2c35h-.19V54h4.67v3.73H200.34V54h3.49V30.8h-4V27.07h7.08l16.9%2c22.09H224V30.8h-4.58V27.07h12.32Zm43.8%2c27h-3.31l-7.83-23.18h-.19l-7.55%2c23.18h-3.35L244.56%2c30.8h-2.65V27.07H253V30.8h-3.87L255%2c50.71h.23l6.61-19.91H259V27.07h11V30.8h-2.78l6.61%2c20.1h.23l5.43-20.1h-4.15V27.07h11V30.8h-2.54Zm26.71-1.51a9.66%2c9.66%2c0%2c0%2c1-6.42%2c2%2c10.2%2c10.2%2c0%2c0%2c1-7.41-2.74c-1.89-1.82-2.83-4.47-2.83-7.93a12.37%2c12.37%2c0%2c0%2c1%2c2.64-8.12%2c9%2c9%2c0%2c0%2c1%2c7.32-3.21%2c8.62%2c8.62%2c0%2c0%2c1%2c6.75%2c2.69%2c9.65%2c9.65%2c0%2c0%2c1%2c2.45%2c6.52%2c13.67%2c13.67%2c0%2c0%2c1-.28%2c2.69H290q.29%2c6.71%2c6.18%2c6.7a5.2%2c5.2%2c0%2c0%2c0%2c3.71-1.18%2c5.82%2c5.82%2c0%2c0%2c0%2c1.67-2.83l3.45.71A7.21%2c7.21%2c0%2c0%2c1%2c302.28%2c56.24Zm25.77-1.63c-1.51%2c2.4-3.92%2c3.61-7.22%2c3.61s-5.84-1.29-7.22-3.87c0%2c.25-.1.82-.21%2c1.7s-.19%2c1.44-.22%2c1.7H309c.16-1%2c.31-2%2c.47-3.07a21.42%2c21.42%2c0%2c0%2c0%2c.24-3.16v-23h-3.4V25.27h7.55V40.9a9.76%2c9.76%2c0%2c0%2c1%2c2.67-3.28%2c7.33%2c7.33%2c0%2c0%2c1%2c4.74-1.4A8.48%2c8.48%2c0%2c0%2c1%2c327.77%2c39q2.55%2c2.74%2c2.55%2c7.74A14.6%2c14.6%2c0%2c0%2c1%2c328.05%2c54.61Zm41.39-1.14q-4.11%2c4.28-11.37%2c4.28H344V54.06h3.73V30.75H344V27.07h13.83q7.59%2c0%2c11.66%2c4.29a15.41%2c15.41%2c0%2c0%2c1%2c4.06%2c11A15.34%2c15.34%2c0%2c0%2c1%2c369.44%2c53.47Zm25.65%2c1.68a10.53%2c10.53%2c0%2c0%2c1-7.9%2c3.07%2c10%2c10%2c0%2c0%2c1-7.63-3%2c10.93%2c10.93%2c0%2c0%2c1-2.8-7.83%2c12.13%2c12.13%2c0%2c0%2c1%2c2.69-7.93q2.69-3.3%2c8-3.3t8%2c3.28a12%2c12%2c0%2c0%2c1%2c2.64%2c7.76A10.86%2c10.86%2c0%2c0%2c1%2c395.09%2c55.15Zm22.61.57c-1.4%2c1.66-3.63%2c2.5-6.68%2c2.5a9.58%2c9.58%2c0%2c0%2c1-7.15-2.76q-2.72-2.76-2.71-7.91a12.25%2c12.25%2c0%2c0%2c1%2c2.69-8%2c9.17%2c9.17%2c0%2c0%2c1%2c7.5-3.28%2c15%2c15%2c0%2c0%2c1%2c3.82.48%2c10.37%2c10.37%2c0%2c0%2c1%2c3.5%2c1.65l.85%2c5.47-3.35.38-.76-3.54a8.07%2c8.07%2c0%2c0%2c0-4.11-1%2c4.9%2c4.9%2c0%2c0%2c0-4.39%2c2.15%2c9.93%2c9.93%2c0%2c0%2c0-1.41%2c5.55A8.9%2c8.9%2c0%2c0%2c0%2c407%2c52.84a5.23%2c5.23%2c0%2c0%2c0%2c4.44%2c2c2.92%2c0%2c4.67-1.7%2c5.23-5.1l3.5.71A10.34%2c10.34%2c0%2c0%2c1%2c417.7%2c55.72Zm20.48.75a11.68%2c11.68%2c0%2c0%2c1-6.63%2c1.75%2c15.52%2c15.52%2c0%2c0%2c1-8.26-2.08L424%2c51l3.26.33-.1%2c2.74a7%2c7%2c0%2c0%2c0%2c2.06.66%2c12.63%2c12.63%2c0%2c0%2c0%2c2.19.19%2c8.68%2c8.68%2c0%2c0%2c0%2c3.66-.75%2c2.5%2c2.5%2c0%2c0%2c0%2c1.63-2.36%2c2.25%2c2.25%2c0%2c0%2c0-1.32-2.2%2c12.65%2c12.65%2c0%2c0%2c0-3.28-1c-1.31-.22-2.61-.49-3.9-.82a7.5%2c7.5%2c0%2c0%2c1-3.25-1.7%2c4.67%2c4.67%2c0%2c0%2c1-1.33-3.66c0-2.36.88-4%2c2.62-4.91a12%2c12%2c0%2c0%2c1%2c5.6-1.37%2c15%2c15%2c0%2c0%2c1%2c4.08.55%2c16.65%2c16.65%2c0%2c0%2c1%2c3.47%2c1.39l.47%2c5.1-3.3.37-.48-3.3a9.5%2c9.5%2c0%2c0%2c0-4.06-.9%2c5.62%2c5.62%2c0%2c0%2c0-2.87.66A2.33%2c2.33%2c0%2c0%2c0%2c428%2c42.27a2.13%2c2.13%2c0%2c0%2c0%2c1.3%2c2.07%2c11.91%2c11.91%2c0%2c0%2c0%2c3.21.92%2c36.69%2c36.69%2c0%2c0%2c1%2c3.82.83%2c7.46%2c7.46%2c0%2c0%2c1%2c3.21%2c1.74%2c4.9%2c4.9%2c0%2c0%2c1%2c1.3%2c3.73A5.56%2c5.56%2c0%2c0%2c1%2c438.18%2c56.47Z' data-evernote-id='747'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M181.17%2c30.75h-5.71V54.06h5.71q5.47%2c0%2c8.36-3t2.88-8.61q0-5.43-2.88-8.55T181.17%2c30.75Z' data-evernote-id='748'%3e%3c/path%3e%3cpath class='cls-1 js-evernote-checked' d='M121.63%2c119.32V81.74H236.54v37.58ZM153.22%2c109h-2v-6.85a4.8%2c4.8%2c0%2c0%2c0-1.58-4%2c5.57%2c5.57%2c0%2c0%2c0-3.55-1.26%2c5%2c5%2c0%2c0%2c0-4.92%2c3.26%2c4.19%2c4.19%2c0%2c0%2c0-1.88-2.46%2c5.82%2c5.82%2c0%2c0%2c0-3-.8%2c4.89%2c4.89%2c0%2c0%2c0-4.56%2c2.56V97.24h-6.28v3.26h2V109h-2v3.23h9.11V109H131.7v-5.25a4.4%2c4.4%2c0%2c0%2c1%2c.69-2.56%2c2.47%2c2.47%2c0%2c0%2c1%2c2.21-1q2.57%2c0%2c2.56%2c3.63v8.41h6.29V109h-2v-5.25a4.47%2c4.47%2c0%2c0%2c1%2c.67-2.56%2c2.42%2c2.42%2c0%2c0%2c1%2c2.19-1q2.63%2c0%2c2.63%2c3.63v8.41h6.28Zm9.88-12.07q-4%2c0-6%2c2.36a8.41%2c8.41%2c0%2c0%2c0-2%2c5.66%2c7.25%2c7.25%2c0%2c0%2c0%2c2.17%2c5.62%2c8%2c8%2c0%2c0%2c0%2c5.65%2c2%2c8.54%2c8.54%2c0%2c0%2c0%2c5.94-2.11%2c7.27%2c7.27%2c0%2c0%2c0%2c2.34-5.67%2c8.21%2c8.21%2c0%2c0%2c0-2-5.51Q167.13%2c96.94%2c163.1%2c96.94ZM163%2c109.28a3%2c3%2c0%2c0%2c1-2.63-1.33%2c5.68%2c5.68%2c0%2c0%2c1-.9-3.26%2c5%2c5%2c0%2c0%2c1%2c1-3.28%2c3.23%2c3.23%2c0%2c0%2c1%2c2.61-1.18%2c3.5%2c3.5%2c0%2c0%2c1%2c2.59%2c1.08%2c4.56%2c4.56%2c0%2c0%2c1%2c1.07%2c3.31%2c5.21%2c5.21%2c0%2c0%2c1-1%2c3.41A3.33%2c3.33%2c0%2c0%2c1%2c163%2c109.28Zm25-2.3-3.39-.29-.7%2c2.32H179l8.32-9.54L187%2c97.24H173.81l-.53%2c5.25%2c3.16.34.67-2.36h4.65L173.51%2c110l.44%2c2.26h13.13Zm7.62-9.74h-4.46v5.39h4.46Zm0%2c9.61h-4.46v5.39h4.46Zm13.54-17.49h-4.23l-6.48%2c22.88h4.22Zm8.68%2c0h-4.23l-6.45%2c22.88h4.19Zm15%2c22.51-.07-2.26a1.22%2c1.22%2c0%2c0%2c1-.56.1c-.69%2c0-1-.39-1-1.16v-6.49a4.39%2c4.39%2c0%2c0%2c0-1.8-3.84%2c7%2c7%2c0%2c0%2c0-4.16-1.28%2c14.55%2c14.55%2c0%2c0%2c0-3.16.3%2c24.14%2c24.14%2c0%2c0%2c0-3.29%2c1.06l-.56%2c3.46%2c3.39.4.5-1.69a2.78%2c2.78%2c0%2c0%2c1%2c1.08-.37%2c11.3%2c11.3%2c0%2c0%2c1%2c1.25-.07c1.19%2c0%2c1.89.37%2c2.09%2c1.1a8.55%2c8.55%2c0%2c0%2c1%2c.3%2c2.26v.5a8.91%2c8.91%2c0%2c0%2c0-1.18-.11c-.41%2c0-.81%2c0-1.21%2c0a12.64%2c12.64%2c0%2c0%2c0-4.81.88%2c3.53%2c3.53%2c0%2c0%2c0-2.18%2c3.64%2c3.66%2c3.66%2c0%2c0%2c0%2c1.48%2c3.33%2c5.63%2c5.63%2c0%2c0%2c0%2c3.11%2c1%2c4.67%2c4.67%2c0%2c0%2c0%2c3-.91%2c6.78%2c6.78%2c0%2c0%2c0%2c1.8-2%2c3%2c3%2c0%2c0%2c0%2c3.33%2c3A5.54%2c5.54%2c0%2c0%2c0%2c232.85%2c111.87Zm-9.25-2.32a1.69%2c1.69%2c0%2c0%2c1-1.36-.52%2c1.81%2c1.81%2c0%2c0%2c1-.43-1.21%2c1.67%2c1.67%2c0%2c0%2c1%2c.86-1.68%2c4.63%2c4.63%2c0%2c0%2c1%2c2-.42%2c7.69%2c7.69%2c0%2c0%2c1%2c1.07.07l1.06.13a3.58%2c3.58%2c0%2c0%2c1-1.08%2c2.74A3.24%2c3.24%2c0%2c0%2c1%2c223.6%2c109.55Z' data-evernote-id='749'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

- [Web Technologies](https://developer.mozilla.org/ja/docs/Web)
- [Learn Web Development](https://developer.mozilla.org/ja/docs/Learn)
- [About MDN](https://developer.mozilla.org/ja/docs/MDN/About)
- [Feedback](https://developer.mozilla.org/ja/docs/MDN/Feedback)
- [About](https://www.mozilla.org/about/)
- [MDN Web Docs Store](https://shop.spreadshirt.com/mdn-store/)
- [Contact Us](https://www.mozilla.org/contact/)
- [Firefox](https://www.mozilla.org/firefox/?utm_source=developer.mozilla.org&utm_campaign=footer&utm_medium=referral)

### MDN

- 
![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' class='icon js-evernote-checked' viewBox='0 0 100 100' aria-hidden='true' role='img' data-evernote-id='773'%3e%3cpath d='M97.5 20.59a42 42 0 01-9.76 10.06c.06.85.06 1.69.06 2.53 0 25.74-19.59 55.4-55.4 55.4a55 55 0 01-29.9-8.74 40.41 40.41 0 004.7.24 39 39 0 0024.18-8.32 19.5 19.5 0 01-18.21-13.5 24.69 24.69 0 003.68.3A20.65 20.65 0 0022 57.9 19.48 19.48 0 016.36 38.79v-.24a19.69 19.69 0 008.8 2.45 19.5 19.5 0 01-6-26 55.33 55.33 0 0040.12 20.35 21.6 21.6 0 01-.48-4.46 19.45 19.45 0 0119.45-19.47 19.4 19.4 0 0114.22 6.15 38.42 38.42 0 0012.36-4.7 19.44 19.44 0 01-8.54 10.73 38.89 38.89 0 0011.21-3z' fill='currentColor' data-evernote-id='774' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)
- 
![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' aria-hidden='true' role='img' data-evernote-id='777' class='js-evernote-checked'%3e%3cpath clip-rule='evenodd' d='M50 5.7C24.9 5.7 4.5 26 4.6 51.2c0 19.6 12.5 36.9 31.1 43.1 2.3.4 3.1-1 3.1-2.2s0-3.9-.1-7.7c-12.6 2.7-15.3-6.1-15.3-6.1-2.1-5.3-5-6.7-5-6.7-4.1-2.9.3-2.8.3-2.8 4.6.3 7 4.7 7 4.7 4.1 6.9 10.6 4.9 13.2 3.8.2-2.3 1.2-4.5 2.9-6.1-10.2-1.1-20.8-5-20.8-22.5-.1-4.5 1.6-8.9 4.7-12.2-.5-1.1-2-5.7.4-12 0 0 3.8-1.2 12.5 4.7 7.4-2 15.3-2 22.8 0 8.7-5.9 12.4-4.7 12.4-4.7 2.5 6.3 1 10.9.5 12 3.1 3.3 4.8 7.7 4.7 12.2 0 17.5-10.6 21.4-20.8 22.4 1.6 1.4 3.1 4.2 3.1 8.4 0 6.1-.1 11-.1 12.4 0 1.2.8 2.6 3.1 2.2 23.8-8 36.6-33.8 28.6-57.6C86.8 18.2 69.5 5.7 50 5.7z' fill='currentColor' fill-rule='evenodd' data-evernote-id='778' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)

### Mozilla

- 
![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' class='icon js-evernote-checked' viewBox='0 0 100 100' aria-hidden='true' role='img' data-evernote-id='784'%3e%3cpath d='M97.5 20.59a42 42 0 01-9.76 10.06c.06.85.06 1.69.06 2.53 0 25.74-19.59 55.4-55.4 55.4a55 55 0 01-29.9-8.74 40.41 40.41 0 004.7.24 39 39 0 0024.18-8.32 19.5 19.5 0 01-18.21-13.5 24.69 24.69 0 003.68.3A20.65 20.65 0 0022 57.9 19.48 19.48 0 016.36 38.79v-.24a19.69 19.69 0 008.8 2.45 19.5 19.5 0 01-6-26 55.33 55.33 0 0040.12 20.35 21.6 21.6 0 01-.48-4.46 19.45 19.45 0 0119.45-19.47 19.4 19.4 0 0114.22 6.15 38.42 38.42 0 0012.36-4.7 19.44 19.44 0 01-8.54 10.73 38.89 38.89 0 0011.21-3z' fill='currentColor' data-evernote-id='785' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)
- 
![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' class='icon js-evernote-checked' viewBox='0 0 100 100' aria-hidden='true' role='img' data-evernote-id='788'%3e%3cpath d='M65 50a15 15 0 10-15 15 15 15 0 0015-15zm8.08 0A23.09 23.09 0 1150 26.92 23.05 23.05 0 0173.08 50zm6.33-24A5.39 5.39 0 1174 20.59 5.37 5.37 0 0179.41 26zM50 13.09c-6.57 0-20.63-.53-26.55 1.81a14.38 14.38 0 00-5.15 3.4 14.38 14.38 0 00-3.4 5.15c-2.34 5.92-1.81 20-1.81 26.55s-.53 20.62 1.81 26.54a15.39 15.39 0 008.55 8.55c5.92 2.35 20 1.82 26.55 1.82s20.62.53 26.54-1.82a15.39 15.39 0 008.55-8.55c2.35-5.92 1.82-20 1.82-26.54s.53-20.63-1.82-26.55a15.39 15.39 0 00-8.55-8.55c-5.92-2.34-19.98-1.81-26.54-1.81zM95 50c0 6.21.06 12.36-.3 18.57-.35 7.21-2 13.6-7.26 18.87s-11.66 6.91-18.87 7.26c-6.21.36-12.36.3-18.57.3s-12.36.06-18.57-.3c-7.21-.35-13.6-2-18.87-7.26S5.65 75.78 5.3 68.57C4.94 62.36 5 56.21 5 50s-.06-12.36.3-18.57c.35-7.21 2-13.6 7.26-18.87S24.22 5.65 31.43 5.3C37.64 4.94 43.79 5 50 5s12.36-.06 18.57.3c7.21.35 13.6 2 18.87 7.26s6.91 11.66 7.26 18.87c.36 6.21.3 12.36.3 18.57z' fill='currentColor' data-evernote-id='789' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)

© 2005-2021 Mozilla and individual contributors. Content is available under [these licenses](https://developer.mozilla.org/docs/MDN/About#Copyrights_and_licenses).

- [Terms](https://www.mozilla.org/about/legal/terms/mozilla)
- [Privacy](https://www.mozilla.org/privacy/websites/)
- [Cookies](https://www.mozilla.org/privacy/websites/#cookies)