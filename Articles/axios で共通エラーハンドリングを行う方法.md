---
Created: 2021-08-28T03:24:00
URL: https://zenn.dev/aya_ryo/articles/d89d7be695d063
Tags: [topic/技術/React]
---
![[Attachments/無題のフォルダ/og-base_z4sxah.png]]

## interceptors

Nuxt.jsを利用していてaxiosの共通エラーハンドリングを行いたい。
 axios.interceptorsを使用することで共通処理が書ける。

axiosを複数箇所で利用し、共通でエラーハンドリングを行うのには最適。

## axiosで内部エラーハンドリングをキャンセルする

`axios.interceptors.error`の中で`return false`で記載することで以降のエラーハンドリング処理をキャンセルすることができる。
 下記のissueを参考にした。

ステータスコードが404の時は以降のエラー処理を行わない、等に使用できる。