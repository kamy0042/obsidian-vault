---
Created: 2021-02-19T13:28:00
URL: https://qiita.com/inatatsu_csg/items/15f63be00096ec21535e
Tags: [topic/技術/JavaScript]
---
![[https3A2F2Fcdn.qiita.com2Fassets2Fpublic2Farticle-ogp-background-1150d8b18a7c15795b701a55ae908f94 5.png]]

[いなたつアドカレ](https://qiita.com/advent-calendar/2019/allinatatsu)の八日目の記事です

自分で建てたAPIとの通信でのCORSの回避方法についてですね。

## CORS いず なに

Cross Origin Resource Sharing の略称です。
 これは、どういつおりじんぽりしーでうんぬんかんぬん、とりあえず別のとこからリソースを取ってくるためのものですね。

axiosの設定をするためのファイルを作りましょう。

setting.js

```plain text
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

```

ここで、

Access-Control-Allow-Originを設定する、ここでは「*」で全てにしているが好ましくはないハズ

Access-Control-Allow-Originはクロスオリジンからの読み出しを許可するためのものです。

これを設定し、axiosを使うときにsetting.jsをimportしてやることで、corsを回避することができます。
 baseURLにlocalhost:3000を今回は設定しています。

urlとdataを用意しましょう

```plain text
axios.post(url,data)
      .then(res => {
          console.log('成功')
      })
      .catch((err) => {
        console.log(err) // 失敗
      })


```

こんなかんじでAPIを叩きましょう。

railsを使った時のcorsも書きます。。。