---
Updated: 2021-01-08T02:50:00
Created: 2021-01-08T02:50:00
URL: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=ja#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB
Tags: [topic/技術/PWA]
---
**
  
  
    ****
           It's a wrap for ****Chrome Dev Summit 2020****! Watch all the sessions at **[**goo.gle/cds20-sessions**](https://goo.gle/cds20-sessions)** now!

        ****
  
  

  
    
    
    ****
  
  ****
• ****
    
    
    
      
  **[**
    
        Home
      
  **](https://developers.google.com/?hl=ja)**
  
    
  ****
  
  ****
• ****
    
      
      ****chevron_right****
    
    
    
      
  **[**
    
        Products
      
  **](https://developers.google.com/products?hl=ja)**
  
    
  ****
  
  ****
• ****
    
      
      ****chevron_right****
    
    
    
      
  **[**
    
        Web
      
  **](https://developers.google.com/web?hl=ja)**
  
    
  ****
  
  ****
• ****
    
      
      ****chevron_right****
    
    
    
      
  **[**
    
        Web Fundamentals
      
  **](https://developers.google.com/web/fundamentals?hl=ja)**
  
    
  ****
  
****
    
      
    ****評価とクチコミ****
  
    
  
  
  
    ****
****Service Worker のライフサイクル****
  

  

  

    
      






****By**[**Jake
          Archibald
        **](https://developers.google.com/web/resources/contributors/jakearchibald?hl=ja)**
      
    ****
        Human boy working on web standards at Google
    ****
****Service Worker のライフサイクルは、最も複雑な部分です。その目的やメリットがわからない場合は、戦いを挑まれているかのようでしょう。しかしいったんその仕組みがわかれば、ウェブとネイティブ パターンのよいところを組み合わせて、ユーザーにシームレスかつ目立たないようにアップデートを提供できます。****
****ここでは詳細を説明しますが、各セクションの先頭に必要な知識を箇条書きで示します。****
****目的****
****ライフサイクルの目的は次のとおりです。****
• ****オフライン ファーストを可能にする。****
• ****現行の Service Worker を妨げることなく新しい Service Worker を使用可能にする。****
• ****スコープ内のページが同じ Service Worker で制御されるようにする（または Service Worker なし）。****
• ****一度に 1 つのバージョンのサイトのみが実行されるようにする。****
****最後の 1 つは非常に重要です。Service Worker がない場合、ユーザーは 1 つのタブをサイトに読み込み、後で別のタブを開くことができます。これにより、同時に 2 つのバージョンのサイトが動作することになります。これでも正常に動作することがありますが、ストレージを処理する場合は、最終的に共有ストレージの管理方法が大きく異なる 2 つのタブが存在することになります。これにより、エラーが発生するか、もっと悪い場合はデータが失われる可能性があります。****star****Note:**** ユーザーはデータが失われるのを非常に嫌います。悲痛な気持ちになります。****
****最初の Service Worker****
****概要:****
• ****Service Worker が最初に取得するのは **`**install**`** イベントであり、これは一度だけ発生します。****
• **`**installEvent.waitUntil()**`** に渡された Promise によって、インストールにかかった時間と成功または失敗が通知されます。****
• ****Service Worker は、インストールが正常に終了して「アクティブ」になるまで **`**fetch**`** や **`**push**`** などのイベントを受信しません。****
• ****デフォルトでは、ページ リクエスト自体が Service Worker を通過する場合を除き、ページのフェッチが Service Worker を通過することはありません。そのため、Service Worker の効果を確認するには、ページを更新する必要があります。****
• **`**clients.claim()**`** はこのデフォルトをオーバーライドし、制御対象外のページを制御下に置くことができます。**** ****
    





****
****次の HTML をご覧ください。****

**`**<!DOCTYPE html>**``**An image will appear here in 3 seconds:**``**<script>**``**  navigator.serviceWorker.register('/sw.js')**``**    .then(reg => console.log('SW registered!', reg))**``**    .catch(err => console.log('Boo!', err));**``**  setTimeout(() => {**``**    const img = new Image();**``**    img.src = '/dog.svg';**``**    document.body.appendChild(img);**``**  }, 3000);**``**</script>**`**
****これは Service Worker を登録し、3 秒後に犬の画像を追加します。****
****その Service Worker は次のとおりです。**`**sw.js**`**:****

**`**self.addEventListener('install', event => {**``**  console.log('V1 installing…');**``**  // cache a cat SVG**``**  event.waitUntil(**``**    caches.open('static-v1').then(cache => cache.add('/cat.svg'))**``**  );**``**});**``**self.addEventListener('activate', event => {**``**  console.log('V1 now ready to handle fetches!');**``**});**``**self.addEventListener('fetch', event => {**``**  const url = new URL(event.request.url);**``**  // serve the cat SVG from the cache if the request is**``**  // same-origin and the path is '/dog.svg'**``**  if (url.origin == location.origin && url.pathname == '/dog.svg') {**``**    event.respondWith(caches.match('/cat.svg'));**``**  }**``**});**`**
****これは、猫の画像をキャッシュし、**`**/dog.svg**`** のリクエストがあるたびに表示します。ただし、**[**上記の例を実行open_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/)**した場合、ページを最初に読み込んだときは犬が表示されます。更新を押すと、猫が表示されます。****
****注: 猫の方が犬よりいいですよね。まあ、*****猫が好き*****というだけのことですが。****
****スコープと制御****
****Service Worker 登録のデフォルトのスコープは、スクリプトの URL をルートにした相対的な **`**./**`** です。つまり、**`**//example.com/foo/bar.js**`** に Service Worker を登録すると、デフォルトのスコープは **`**//example.com/foo/**`** になります。****
****ページ、ワーカー、共有ワーカーは、**`**clients**`** と呼ばれます。Service Worker で制御できるのは、スコープ内のクライアントのみです。クライアントが「制御」されるようになると、そのフェッチはスコープ内の Service Worker を通過するようになります。クライアントを制御している **`**navigator.serviceWorker.controller**`** が null と Service Worker インスタンスのどちらであるかを判別できます。****
****ダウンロード、解析、および実行****
****最初の Service Worker は、**`**.register()**`** を呼び出すとダウンロードされます。スクリプトがダウンロードや解析に失敗したか、初期実行時にエラーをスローした場合、登録 Promise は棄却され、Service Worker は破棄されます。****
****Chrome の DevTools によって、エラーがコンソールと [Application] タブの Service Worker セクションに表示されます。****
****インストール****
****Service Worker が最初に取得するイベントは **`**install**`** です。このイベントは Service Worker が実行されるとすぐにトリガーされ、Service Worker ごとに一度だけ呼び出されます。Service Worker スクリプトを変更すると、ブラウザでは別の Service Worker と見なされ、その **`**install**`** イベントが取得されます。**[**アップデートの詳細については、後述します**](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=ja#updates)**。****
**`**install**`** イベントが発生すると、クライアントを制御する前に必要なものをすべてキャッシュできます。**`**event.waitUntil()**`** に Promise が渡されると、ブラウザはインストールの完了のタイミングと成功したかどうかを把握できます。****
****Promise が棄却されると、インストールは失敗したことになり、ブラウザは Service Worker を破棄します。クライアントは制御されません。つまり、**`**fetch**`** イベントでは、キャッシュに存在する「cat.svg」のみに依存することはできくなります。これは依存関係です。****
****アクティベート****
****Service Worker がクライアントを制御したり、**`**push**`** や **`**sync**`** などの機能イベントを処理したりできるようになると、**`**activate**`** イベントを取得します。ただし、**`**.register()**`** を呼び出したページが制御されるようになるという意味ではありません。****
**[**デモopen_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/)**を最初に読み込んだ場合、Service Worker のアクティベート後しばらくしてから **`**dog.svg**`** をリクエストしても、Service Worker はリクエストの処理を行わず、犬の画像が表示されます。Service Worker なしでページが読み込まれ、サブリソースも読み込まれない場合、デフォルトは*****一貫性*****になります。**[**デモopen_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/)**を 2 回目に読み込んだ場合（つまり、ページを更新した場合）は、Service Worker が制御するようになります。ページも画像も **`**fetch**`** イベントを通過し、猫が表示されます。****
**`**clients.claim**`**
****アクティベート後に Service Worker 内で **`**clients.claim()**`** を呼び出すことによって、制御されていないクライアントを制御できます。****
**[**前述のデモのバリエーションopen_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/df4cae41fa658c4ec1fa7b0d2de05f8ba6d43c94/)**（**`**activate**`** イベントで **`**clients.claim()**`** を呼び出す）を次に示します。最初に猫が表示される*****はずです*****。「はずです」というのは、タイミングによって異なるからです。猫が表示されるのは、画像が読み込まれる前に Service Worker がアクティベートされ、**`**clients.claim()**`** が有効になった場合のみです。****
****ページをネットワーク経由で読み込む場合とは異なる Service Worker を使用した方法で読み込んだ場合、**`**clients.claim()**`** は問題になることがあります。それは、Service Worker は最終的にはそれがない状態で読み込まれた一部のクライアントを制御するためです。****
****注: 多くのユーザーはボイラープレートとして **`**clients.claim()**`** を使用しているようですが、私自身はめったに使用しません。本当に重要になるのは最初の読み込み時のみであり、段階的な機能拡張により、ページは通常は Service Worker がなくても問題なく動作します。****
****Service Worker のアップデート****
****概要:****
• ****アップデートは、次の場合にトリガーされます:
****
    ◦ ****スコープ内ページへのナビゲーション時****
    ◦ **`**push**`** や **`**sync**`** などの機能イベントの発生時（24 時間以内にアップデート チェックが実行された場合を除く）****
    ◦ **`**.register()**`** の呼び出し時（Service Worker URL が変更された場合*****のみ*****）****
• ****ほとんどのブラウザ（**[**Chrome 68 以降**](https://developers.google.com/web/updates/2018/06/fresher-sw?hl=ja)**を含む）は、登録済みの Service Worker スクリプトが更新されているかどうかチェックするとき、デフォルトではキャッシュ ヘッダーを無視します。**`**importScripts()**`** で Service Worker 内に読み込まれたリソースを フェッチするときには、引き続きキャッシュ ヘッダーが優先されます。Service Worker 登録時に **[`**updateViaCache**`](https://developers.google.com/web/updates/2018/06/fresher-sw?hl=ja#updateviacache)** オプションを設定することで、このデフォルト動作をオーバーライドすることができます。****
• ****Service Worker がアップデートされていると見なされるのは、そのバイト数がブラウザに既にあるものと異なる場合です。（これは、インポートされたスクリプトやモジュールも含むように拡張されています）。****
• ****アップデートされた Service Worker は、既存のものとともに起動され、独自の **`**install**`** イベントを取得します。****
• ****新しい Worker は、ステータス コードが正常でないか（たとえば 404）、解析に失敗するか、実行中にエラーをスローするか、インストール時に棄却される場合は破棄されますが、現行の Worker はアクティブなままです。****
• ****インストールに成功すると、アップデートされた Worker は、既存の Worker の制御しているクライアントがゼロになるまで **`**wait**`** 状態になります（クライアントは、更新中は重複します）。****
• **`**self.skipWaiting()**`** は待機を回避します。つまり、Service Worker は、インストールが完了するとすぐにアクティベートされます。**** ****
    





****
****猫ではなく馬の画像をレスポンスとして返すように Service Worker スクリプトを変更したとします。****

**`**const expectedCaches = ['static-v2'];**``**self.addEventListener('install', event => {**``**  console.log('V2 installing…');**``**  // cache a horse SVG into a new cache, static-v2**``**  event.waitUntil(**``**    caches.open('static-v2').then(cache => cache.add('/horse.svg'))**``**  );**``**});**``**self.addEventListener('activate', event => {**``**  // delete any caches that aren't in expectedCaches**``**  // which will get rid of static-v1**``**  event.waitUntil(**``**    caches.keys().then(keys => Promise.all(**``**      keys.map(key => {**``**        if (!expectedCaches.includes(key)) {**``**          return caches.delete(key);**``**        }**``**      })**``**    )).then(() => {**``**      console.log('V2 now ready to handle fetches!');**``**    })**``**  );**``**});**``**self.addEventListener('fetch', event => {**``**  const url = new URL(event.request.url);**``**  // serve the horse SVG from the cache if the request is**``**  // same-origin and the path is '/dog.svg'**``**  if (url.origin == location.origin && url.pathname == '/dog.svg') {**``**    event.respondWith(caches.match('/horse.svg'));**``**  }**``**});**`**
****注: 馬については特に好き嫌いはありません。****
**[**前述のデモを参照してくださいopen_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html)**。まだ猫の画像が表示されるはずです。その理由を次に説明します。****
****インストール****
****キャッシュ名を **`**static-v1**`** から **`**static-v2**`** に変更したことに注意してください。つまり、古い Service Worker でまだ使用されている現行のキャッシュ内のものを上書きせずに、新しいキャッシュをセットアップできるということです。****
****このパターンでは、バージョン固有のキャッシュが作成されます。これは、ネイティブ アプリがその実行可能ファイルにバンドルするアセットに似ています。**`**avatars**`** などのバージョン固有でないキャッシュを使用することもできます。****
****待機****
****インストールに成功すると、アップデートされた Service Worker は、既存の Service Worker がクライアントを制御しなくなるまでアクティベートを遅らせます。この状態を「待機」といい、これによってブラウザでは同時に 1 つのバージョンの Service Worker のみが実行されることになります。****
**[**アップデートされたデモopen_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html)**を実行してみると、V2 Worker がまだアクティベートされていないため、まだ猫の画像が表示されるはずです。DevTools の [Application] タブで、新しい Service Worker が待機中であることを確認できます。****
****デモで 1 つのタブのみを開いている場合でも、ページを更新しただけでは新しいバージョンに引き継がれません。これは、ブラウザ ナビゲーションの動作によるものです。ナビゲートすると、現在のページはレスポンス ヘッダーを受信するまで消えません。さらに、レスポンスに **`**Content-Disposition**`** ヘッダーが含まれている場合、現在のページは消えないことがあります。このような重複があると、更新中は現行の Service Worker が常にクライアントを制御することになります。****
****アップデートを取得するには、現行の Service Worker を使用しているすべてのタブを閉じるか、それらのタブから移動します。次に、**[**再びデモに移動open_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html)**すると、馬が表示されるはずです。****
****このパターンは、Chrome のアップデート方法に似ています。Chrome のアップデートはバックグラウンドでダウンロードされますが、Chrome が再起動するまで適用されません。再起動までの間、中断することなく引き続き現行バージョンを使用できます。とはいっても、このことは開発時には問題となります。そこで、DevTools にはこれを軽減する方法があります。これについては**[**後で**](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=ja#devtools)**説明します。****
****アクティベート****
****アクティベートにより、古い Service Worker はなくなり、新しい Service Worker がクライアントを制御できるようになります。これは、データベースの移行やキャッシュの消去など、古い Worker を使用中に実行できなかったことを実行するのに最適なタイミングです。****
****前述のデモでは、必要なキャッシュのリストを保持し、**`**activate**`** イベントでそれ以外のすべてのキャッシュを消去して、古い **`**static-v1**`** キャッシュを削除しています。****star****Note:**** 前のバージョンからアップデートしていない場合があります。その場合は、Service Worker が数世代前のバージョンである可能性があります。****
****Promise を **`**event.waitUntil()**`** に渡すと、Promise が解決されるまで機能イベント（**`**fetch**`**、**`**push**`**、**`**sync**`** など）がバッファされます。そして、**`**fetch**`** イベントが発生すると、アクティベーションは完了します。****star****Note:**** Cache Storage API は、（localStorage や IndexedDB のように）「オリジン ストレージ」です。同じオリジンで多くのサイト（**`**yourname.github.io/myapp**`** など）を実行する場合は、他のサイトのキャッシュを削除しないように注意してください。これを回避するため、**`**myapp-static-v1**`** のようにキャッシュ名に現在のサイトに固有の接頭辞を付け、**`**myapp-**`** で始まらないキャッシュには触れないようにします。****
****待機段階のスキップ****
****待機段階とは、一度に 1 つのバージョンのサイトのみを実行していることを意味しますが、その機能が不要になった場合には、**`**self.skipWaiting()**`** を呼び出して新しい Service Worker をすぐにアクティベートできます。****
****これにより、Service Worker は現在アクティブな Worker を追い出し、待機段階に入るとすぐに（または、既に待機段階に入っている場合は即座に）自身をアクティベートします。この場合、Worker はインストールをスキップ*****するのではなく*****、待機だけをスキップします。****
****待機中または待機前であれば、**`**skipWaiting()**`** をいつ呼び出しても実際には問題にはなりません。通常は **`**install**`** イベントで呼び出します。****

**`**self.addEventListener('install', event => {**``**  self.skipWaiting();**``**  event.waitUntil(**``**    // caching etc**``**  );**``**});**`**
****ただし、Service Worker への **`**postMessage()**`** の結果として呼び出すこともできます。たとえば、ユーザー インタラクションの後で **`**skipWaiting()**`** が必要になる場合などです。**[`**skipWaiting()**`](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html)[** を使用するデモをご覧くださいopen_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html)**。****
****移動しなくても牛の画像が表示されるはずです。**`**clients.claim()**`** の場合と同じように、ここでも競争となるため、新しい Service Woker がフェッチ、インストール、アクティベートを行ってからページが画像を読み込むと、牛が表示されるということです。****star****Note:**** **`**skipWaiting()**`** は、古いバージョンで読み込まれたページを新しい Service Worker で制御することを意味します。つまり、ページのフェッチの一部は古い Service Worker で処理され、その後のフェッチは新しい Service Worker で処理されます。これが問題になる可能性がある場合は、**`**skipWaiting()**`** を使用しないでください。****
****手動アップデート****
****前述したとおり、ブラウザはナビゲーションや機能イベントの後、自動的にアップデートを確認しますが、手動でトリガーすることもできます。****

**`**navigator.serviceWorker.register('/sw.js').then(reg => {**``**  // sometime later…**``**  reg.update();**``**});**`**
****ユーザーがサイトを再読み込みすることなく長時間使用できるようにするには、**`**update()**`** を定期的に呼び出す必要があります（1 時間ごとなど）。****
****Service Worker スクリプトの URL の変更の回避****
**[**キャッシュのベスト プラクティスに関する私の投稿open_in_new**](https://jakearchibald.com/2016/caching-best-practices/)**をご覧になったことがある場合は、Service Worker の各バージョンに一意の URL を指定することを検討するかもしれません。****その必要はありません。**** 通常、これは Service Worker に対してはまったくおすすめできないので、現在の場所にあるスクリプトをアップデートするだけにしてください。****
****次のような問題が発生する可能性があるからです。****
1. **`**index.html**`** は **`**sw-v1.js**`** を Service Worker として登録します。****
2. **`**sw-v1.js**`** は、オフライン ファーストで動作するように **`**index.html**`** をキャッシュし提供します。****
3. **`**index.html**`** をアップデートすると、新しい **`**sw-v2.js**`** が登録されます。****
****このようにすると、ユーザーは **`**sw-v2.js**`** を取得しません。**`**sw-v1.js**`** はキャッシュから古いバージョンの **`**index.html**`** を提供するからです。Service Worker をアップデートするために、Service Worker をアップデートすることが必要になるという状況になってしまいました。これはいけません。****
****ただし、**[**上記のデモopen_in_new**](https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v2.html)**では、Service Worker の URL を*****変更しています*****。デモ目的で、バージョンを切り替えることができるようにしています。本番環境でこのようにすることはありません。****
****開発の簡素化****
****Service Worker のライフサイクルは、ユーザーを考慮して構築されていますが、開発時は少し問題があります。幸いなことに、この問題に役立つツールがあります。****
****再読み込み時のアップデート****
****これは私のお気に入りです。****
****これにより、ライフサイクルはデベロッパーにとって使いやすくなります。各ナビゲーションにより次のことが行われます。****
1. ****Service Worker を再取得します。****
2. ****バイトレベルで同じでも、それを新しいバージョンとしてインストールします。つまり、**`**install**`** イベントが実行され、キャッシュがアップデートされます。****
3. ****新しい Service Worker がアクティベートされるように、待機段階をスキップします。****
4. ****ページをナビゲートします。つまり、2 回再読み込みしたりタブを閉じたりすることなく、ナビゲーション（更新など）ごとにアップデートを取得します。****
****待機のスキップ****
****待機中の Worker がある場合は、DevTools で [skipWaiting] を選択すると、すぐに「アクティブ」になります。****
****シフト再読み込み****
****ページを強制的に再読み込み（シフト再読み込み）すると、Service Worker 全体がスキップされます。これは制御されません。この機能は仕様どおりであり、他の Service Worker 対応ブラウザで動作します。****
****アップデートの処理****
****Service Worker は、**[**拡張可能ウェブopen_in_new**](https://extensiblewebmanifesto.org/)**の一部としてデザインされました。我々ブラウザ デベロッパーは、ウェブ デベロッパーよりもウェブ開発が得意ではないと認識しています。したがって、ブラウザ デベロッパーの好きなパターンを使用して特定の問題を解決する、限られた高レベルの API を提供すべきではありません。代わりに、ブラウザの中心部へのアクセス権を付与し、ユーザーに最適な方法で好きなように実行してもらいます。****
****できるだけ多くのパターンを有効にするために、アップデート サイクル全体は監視可能になっています。****

**`**navigator.serviceWorker.register('/sw.js').then(reg => {**``**  reg.installing; // the installing worker, or undefined**``**  reg.waiting; // the waiting worker, or undefined**``**  reg.active; // the active worker, or undefined**``**  reg.addEventListener('updatefound', () => {**``**    // A wild service worker has appeared in reg.installing!**``**    const newWorker = reg.installing;**``**    newWorker.state;**``**    // "installing" - the install event has fired, but not yet complete**``**    // "installed"  - install complete**``**    // "activating" - the activate event has fired, but not yet complete**``**    // "activated"  - fully active**``**    // "redundant"  - discarded. Either failed install, or it's been**``**    //                replaced by a newer version**``**    newWorker.addEventListener('statechange', () => {**``**      // newWorker.state has changed**``**    });**``**  });**``**});**``**navigator.serviceWorker.addEventListener('controllerchange', () => {**``**  // This fires when the service worker controlling this page**``**  // changes, eg a new worker has skipped waiting and become**``**  // the new active worker.**``**});**`**
****乗り切りました！すばらしいですね！****
****技術的な理論をたくさん説明しました。今後の数週間で上記の内容を実地に適用していきますので、どうぞご期待ください。****
****フィードバック****Was this page helpful?****Yes****
    
  ****No****
    
  
    

    
  

  

  
    
      
    ****評価とクチコミ**

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' class='lifecycle-diagram register js-evernote-checked' viewBox='0 0 96.9 73' data-evernote-id='41'%3e%3crect ry='15.8' y='10' x='65.4' height='63' width='31.6' class='controlled js-evernote-checked' data-evernote-id='42'%3e%3c/rect%3e%3ctext y='6.7' x='14.5' class='label js-evernote-checked' data-evernote-id='26'%3e%e3%82%a4%e3%83%b3%e3%82%b9%e3%83%88%e3%83%bc%e3%83%ab%3c/text%3e%3ctext y='6.7' x='81.1' class='label js-evernote-checked' data-evernote-id='27'%3e%e3%82%a2%e3%82%af%e3%83%86%e3%82%a3%e3%83%96%3c/text%3e%3ccircle r='14' cy='25.8' cx='14.5' class='state-placeholder js-evernote-checked' data-evernote-id='28'%3e%3c/circle%3e%3ccircle r='14' cy='25.8' cx='47.8' class='state-placeholder js-evernote-checked' data-evernote-id='29'%3e%3c/circle%3e%3ccircle r='14' cy='25.8' cx='81.2' class='state-placeholder js-evernote-checked' data-evernote-id='30'%3e%3c/circle%3e%3cg transform='matrix(1.1187 0 0 1.1187 1.078 12.408)' class='cog cog-new js-evernote-checked' data-evernote-id='44'%3e%3c/g%3e%3cpath d='M 191.3%2c0 12.8%2c0 C 5.8%2c0 0%2c5.7 0%2c12.8 L 0%2c167 c 0%2c7.2 5.7%2c13 12.8%2c13 l 178.5%2c0 c 7%2c0 12.8%2c-5.8 12.8%2c-13 l 0%2c-154 C 204%2c6 198.7%2c0.2 191.6%2c0.2 Z M 11%2c11 c 0.5%2c-0.5 1%2c-0.7 1.8%2c-0.8 l 178.5%2c0 c 0.7%2c0 1.3%2c0.3 1.8%2c0.8 0.8%2c0.5 1%2c1 1%2c1.8 l 0%2c13.5 -184.1%2c0 0%2c-13.5 c 0%2c-0.7 0.3%2c-1.3 0.8%2c-1.8 z m 182%2c158 c -0.4%2c0.4 -1%2c0.7 -1.7%2c0.7 l -178.5%2c0 c -0.7%2c0 -1.3%2c-0.3 -1.8%2c-0.8 -0.5%2c-0.8 -0.8%2c-1.4 -0.8%2c-2 l 0%2c-130.4 183.6%2c0 0%2c130.5 c 0%2c0.8 -0.2%2c1.4 -0.7%2c2 z' data-evernote-id='32' class='js-evernote-checked'%3e%3c/path%3e%3cpath d='m 26.5%2c18.6 c 0%2c2.8 -2.3%2c5 -5%2c5 -3%2c0 -5.2%2c-2.2 -5.2%2c-5 0%2c-3 2.2%2c-5.2 5%2c-5.2 3%2c0 5.2%2c2.3 5.2%2c5.2 z m 15.2%2c0 c 0%2c2.8 -2.3%2c5 -5%2c5 -3%2c0 -5.2%2c-2.2 -5.2%2c-5 0%2c-3 2.3%2c-5.2 5%2c-5.2 3%2c0 5.2%2c2.3 5.2%2c5.2 z m 15.3%2c0 c 0%2c2.8 -2.3%2c5 -5.2%2c5 -2.8%2c0 -5%2c-2.2 -5%2c-5 0%2c-3 2.2%2c-5.2 5%2c-5.2 3%2c0 5.2%2c2.3 5.2%2c5.2 z m -5.2%2c111 102.7%2c0 0%2c10.4 -102.7%2c0 0%2c-10.3 z m 0%2c-16.8 102.7%2c0 0%2c10.2 -102.7%2c0 0%2c-10 z M 52%2c96 l 45.4%2c0 0%2c10.2 -45.4%2c0 0%2c-10.2 z m 0%2c-17 45.4%2c0 0%2c10.3 -45.4%2c0 0%2c-10.3 z m 0%2c-16.8 45.6%2c0 0%2c10.3 -45.6%2c0 0%2c-10.3 z m 100.2%2c1.3 -45.4%2c0 0%2c42 45.4%2c0 0%2c-42 z m -10.2%2c31.8 -25%2c0 0%2c-21.5 25%2c0 0%2c21.5 z' data-evernote-id='33' class='js-evernote-checked'%3e%3c/path%3e%3cpath d='M78.6 47.7c-1-6-2-11.6-1.6-17' class='fetch js-evernote-checked' data-evernote-id='47'%3e%3c/path%3e%3cpath d='M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2' class='fetch js-evernote-checked' data-evernote-id='48'%3e%3c/path%3e%3cpath d='M75.7 47c-2.3-6.3-3.2-12.5-2-18.2' class='fetch js-evernote-checked' data-evernote-id='49'%3e%3c/path%3e%3cpath d='M89.5 29.5c.3 6-.4 12-4 18' class='fetch js-evernote-checked' data-evernote-id='50'%3e%3c/path%3e%3cpath d='M75.4 30.3c0 4-1 6 2 17.2' class='fetch js-evernote-checked' data-evernote-id='51'%3e%3c/path%3e%3cpath d='M86.6 31C88 37 86 42 84 47.4' class='fetch js-evernote-checked' data-evernote-id='52'%3e%3c/path%3e%3cg class='refresh-rotator js-evernote-checked' data-evernote-id='53'%3e%3ccircle id='page-action-circle' cx='81.2' cy='58.1' r='3.5' fill='%23fff' stroke='%23000' stroke-width='.5' data-evernote-id='36' class='js-evernote-checked'%3e%3c/circle%3e%3cpath d='M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z' data-evernote-id='37' class='js-evernote-checked'%3e%3c/path%3e%3c/g%3e%3c/svg%3e)

![](data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' class='lifecycle-diagram update js-evernote-checked' viewBox='0 0 96.9 73' data-evernote-id='41'%3e%3crect ry='15.8' y='10' x='65.4' height='63' width='31.6' class='controlled js-evernote-checked' data-evernote-id='42'%3e%3c/rect%3e%3ctext y='6.7' x='14.5' class='label js-evernote-checked' data-evernote-id='26'%3e%e3%82%a4%e3%83%b3%e3%82%b9%e3%83%88%e3%83%bc%e3%83%ab%3c/text%3e%3ctext y='6.7' x='81.1' class='label js-evernote-checked' data-evernote-id='27'%3e%e3%82%a2%e3%82%af%e3%83%86%e3%82%a3%e3%83%96%3c/text%3e%3ccircle r='14' cy='25.8' cx='14.5' class='state-placeholder js-evernote-checked' data-evernote-id='28'%3e%3c/circle%3e%3ccircle r='14' cy='25.8' cx='47.8' class='state-placeholder js-evernote-checked' data-evernote-id='29'%3e%3c/circle%3e%3ccircle r='14' cy='25.8' cx='81.2' class='state-placeholder js-evernote-checked' data-evernote-id='30'%3e%3c/circle%3e%3ctext x='47.7' y='6.7' class='label js-evernote-checked' data-evernote-id='44'%3e%e5%be%85%e6%a9%9f%3c/text%3e%3cg transform='matrix(1.1187 0 0 1.1187 1.078 12.408)' class='cog cog-new js-evernote-checked' data-evernote-id='45'%3e%3c/g%3e%3cg transform='matrix(1.1187 0 0 1.1187 67.745 12.408)' class='cog cog-old js-evernote-checked' data-evernote-id='47'%3e%3c/g%3e%3cpath d='M 191.3%2c0 12.8%2c0 C 5.8%2c0 0%2c5.7 0%2c12.8 L 0%2c167 c 0%2c7.2 5.7%2c13 12.8%2c13 l 178.5%2c0 c 7%2c0 12.8%2c-5.8 12.8%2c-13 l 0%2c-154 C 204%2c6 198.7%2c0.2 191.6%2c0.2 Z M 11%2c11 c 0.5%2c-0.5 1%2c-0.7 1.8%2c-0.8 l 178.5%2c0 c 0.7%2c0 1.3%2c0.3 1.8%2c0.8 0.8%2c0.5 1%2c1 1%2c1.8 l 0%2c13.5 -184.1%2c0 0%2c-13.5 c 0%2c-0.7 0.3%2c-1.3 0.8%2c-1.8 z m 182%2c158 c -0.4%2c0.4 -1%2c0.7 -1.7%2c0.7 l -178.5%2c0 c -0.7%2c0 -1.3%2c-0.3 -1.8%2c-0.8 -0.5%2c-0.8 -0.8%2c-1.4 -0.8%2c-2 l 0%2c-130.4 183.6%2c0 0%2c130.5 c 0%2c0.8 -0.2%2c1.4 -0.7%2c2 z' data-evernote-id='32' class='js-evernote-checked'%3e%3c/path%3e%3cpath d='m 26.5%2c18.6 c 0%2c2.8 -2.3%2c5 -5%2c5 -3%2c0 -5.2%2c-2.2 -5.2%2c-5 0%2c-3 2.2%2c-5.2 5%2c-5.2 3%2c0 5.2%2c2.3 5.2%2c5.2 z m 15.2%2c0 c 0%2c2.8 -2.3%2c5 -5%2c5 -3%2c0 -5.2%2c-2.2 -5.2%2c-5 0%2c-3 2.3%2c-5.2 5%2c-5.2 3%2c0 5.2%2c2.3 5.2%2c5.2 z m 15.3%2c0 c 0%2c2.8 -2.3%2c5 -5.2%2c5 -2.8%2c0 -5%2c-2.2 -5%2c-5 0%2c-3 2.2%2c-5.2 5%2c-5.2 3%2c0 5.2%2c2.3 5.2%2c5.2 z m -5.2%2c111 102.7%2c0 0%2c10.4 -102.7%2c0 0%2c-10.3 z m 0%2c-16.8 102.7%2c0 0%2c10.2 -102.7%2c0 0%2c-10 z M 52%2c96 l 45.4%2c0 0%2c10.2 -45.4%2c0 0%2c-10.2 z m 0%2c-17 45.4%2c0 0%2c10.3 -45.4%2c0 0%2c-10.3 z m 0%2c-16.8 45.6%2c0 0%2c10.3 -45.6%2c0 0%2c-10.3 z m 100.2%2c1.3 -45.4%2c0 0%2c42 45.4%2c0 0%2c-42 z m -10.2%2c31.8 -25%2c0 0%2c-21.5 25%2c0 0%2c21.5 z' data-evernote-id='33' class='js-evernote-checked'%3e%3c/path%3e%3cpath d='M78.6 47.7c-1-6-2-11.6-1.6-17' class='fetch js-evernote-checked' style='stroke-dashoffset: 8px%3b' data-evernote-id='50'%3e%3c/path%3e%3cpath d='M83 47.5c1.4-5.4 3.3-10.8 2.4-16.2' class='fetch js-evernote-checked' style='stroke-dashoffset: 8px%3b' data-evernote-id='51'%3e%3c/path%3e%3cpath d='M75.7 47c-2.3-6.3-3.2-12.5-2-18.2' class='fetch js-evernote-checked' style='stroke-dashoffset: 8px%3b' data-evernote-id='52'%3e%3c/path%3e%3cpath d='M89.5 29.5c.3 6-.4 12-4 18' class='fetch js-evernote-checked' style='stroke-dashoffset: 8px%3b' data-evernote-id='53'%3e%3c/path%3e%3cpath d='M75.4 30.3c0 4-1 6 2 17.2' class='fetch js-evernote-checked' style='stroke-dashoffset: 8px%3b' data-evernote-id='54'%3e%3c/path%3e%3cpath d='M86.6 31C88 37 86 42 84 47.4' class='fetch js-evernote-checked' style='stroke-dashoffset: 8px%3b' data-evernote-id='55'%3e%3c/path%3e%3cg class='refresh-rotator js-evernote-checked' data-evernote-id='56'%3e%3ccircle id='page-action-circle' cx='81.2' cy='58.1' r='3.5' fill='%23fff' stroke='%23000' stroke-width='.5' data-evernote-id='36' class='js-evernote-checked'%3e%3c/circle%3e%3cpath d='M82.76 56.48c-.4-.4-.97-.66-1.6-.66-1.23 0-2.23 1-2.23 2.24 0 1.24 1 2.25 2.24 2.25 1.05 0 1.92-.7 2.17-1.68h-.58c-.23.66-.86 1.13-1.6 1.13-.92 0-1.67-.76-1.67-1.7 0-.92.74-1.67 1.67-1.67.47 0 .88.2 1.2.5l-.92.9h1.97v-1.96l-.66.66z' data-evernote-id='37' class='js-evernote-checked'%3e%3c/path%3e%3c/g%3e%3cuse xlink:href='%23page-action-circle' data-evernote-id='39' class='js-evernote-checked'%3e%3c/use%3e%3cpath id='path5062' d='M83 56.58l-.37-.37-1.46 1.47-1.45-1.46-.37.38 1.46 1.46-1.45 1.46.37.36 1.45-1.45 1.46 1.46.37-.36-1.46-1.46z' data-evernote-id='40' class='js-evernote-checked'%3e%3c/path%3e%3c/svg%3e)