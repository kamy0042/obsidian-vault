---
Updated: 2021-01-08T02:50:00
Created: 2021-01-08T02:50:00
URL: https://developers.google.com/web/tools/workbox/modules/workbox-strategies
Tags: [topic/技術/PWA]
---
**
  
  
    ****それはのためのラップだ****クロームのDevサミット2020****！**[**goo.gle/cds20-sessionsで**](https://goo.gle/cds20-sessions)**すべてのセッションを****今すぐ**[**ご覧ください**](https://goo.gle/cds20-sessions)**！

        ****
  
  

  
    
    
    ****
  
  ****
• ****
    
    
    
      
  **[**
    
        ホーム
      
  **](https://developers.google.com/)**
  
    
  ****
  
  ****
• ****
    
      
      ****chevron_right****
    
    
    
      
  **[**
    
        製品
      
  **](https://developers.google.com/products)**
  
    
  ****
  
  ****
• ****
    
      
      ****chevron_right****
    
    
    
      
  **[**
    
        ワークボックス
      
  **](https://developers.google.com/web/tools/workbox)**
  
    
  ****
  
  ****
• ****
    
      
      ****chevron_right****
    
    
    
      
  **[**
    
        ツール
      
  **](https://developers.google.com/web/tools)**
  
    
  ****
  
  ****
• ****
    
      
      ****chevron_right****
    
    
    
      
  **[**
    
        モジュール
      
  **](https://developers.google.com/web/tools/workbox/modules)**
  
    
  ****
  
****
    
      
    ****評価と批評****
  
    
  
  
  
    ****
****ワークボックス戦略****
  

  

  

    
      


****
****ワークボックス戦略とは何ですか？****
****When service workers were first introduced, a set of common caching strategies
emerged. A caching strategy is a pattern that determines how a service worker
generates a response after receiving a fetch event.****
**`**workbox-strategies**`** provides the most common caching strategies so it’s easy to
apply them in your service worker.****
****We won’t go into much detail outside of the strategies supported by Workbox,
but you can **[**learn more in the Offline Cookbook**](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook)**.****
****Using Strategies****
****In the following examples, we’ll show you how to use the Workbox caching
strategies with **`**workbox-routing**`**. There are some options you can define with
each strategy that are covered in the
**[**Configuring Strategies section of this doc**](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#configuring_strategies)**.****
****[**[**高度な使用法]セクション**](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#advanced_usage)**では、を使用せずにキャッシュ戦略を直接使用する方法について説明します**`**workbox-routing**`**。****
****Stale-While-Revalidate****
****
**[**古い-しばらく-再検証**](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#stale-while-revalidate)**
可能な場合のパターンは、あなたはそれがキャッシュされていない場合は、ネットワーク要求にフォールバック、キャッシュされたレスポンスを速く、できるだけ要求に応答することができます。****次に、ネットワーク要求を使用してキャッシュを更新します。****これはかなり一般的な戦略であり、最新のリソースを持つことがアプリケーションにとって不可欠ではありません。****

**`**import {registerRoute} from 'workbox-routing';**``**import {StaleWhileRevalidate} from 'workbox-strategies';**``**registerRoute(**``**  ({url}) => url.pathname.startsWith('/images/avatars/'),**``**  new StaleWhileRevalidate()**``**);**`**
****キャッシュファースト（キャッシュはネットワークにフォールバック）****
****
****オフラインのWebアプリはキャッシュに大きく依存しますが、重要ではなく、徐々にキャッシュできるアセットの
**[**場合**](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network)**
は、**[**最初にキャッシュを使用**](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network)**するのが最適なオプションです。****
****キャッシュに応答がある場合、要求はキャッシュされた応答を使用して実行され、ネットワークはまったく使用されません。****キャッシュされた応答がない場合、要求はネットワーク要求によって実行され、次の要求がキャッシュから直接提供されるように応答がキャッシュされます。****

**`**import {registerRoute} from 'workbox-routing';**``**import {CacheFirst} from 'workbox-strategies';**``**registerRoute(**``**  ({request}) => request.destination === 'style',**``**  new CacheFirst()**``**);**`**
****ネットワークファースト（ネットワークがキャッシュにフォールバック）****
****
****頻繁に更新されるリクエストの場合、
**[**ネットワークファースト**](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#network-falling-back-to-cache)**
戦略が理想的なソリューションです。****デフォルトでは、ネットワークから最新の応答をフェッチしようとします。****リクエストが成功すると、レスポンスがキャッシュに入れられます。****ネットワークが応答を返さない場合は、キャッシュされた応答が使用されます。****

**`**import {registerRoute} from 'workbox-routing';**``**import {NetworkFirst} from 'workbox-strategies';**``**registerRoute(**``**  ({url}) => url.pathname.startsWith('/social-timeline/'),**``**  new NetworkFirst()**``**);**`**
****ネットワークのみ****
****
****ネットワークから特定の要求を実行する必要がある場合は、
**[**ネットワークのみ**](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#network-only)**
を使用する戦略です。****

**`**import {registerRoute} from 'workbox-routing';**``**import {NetworkOnly} from 'workbox-strategies';**``**registerRoute(**``**  ({url}) => url.pathname.startsWith('/admin/'),**``**  new NetworkOnly()**``**);**`**
****キャッシュのみ****
****
**[**キャッシュのみ**](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-only)**
応答がキャッシュから取得されている戦略が保証されます。****これはワークボックスではあまり一般的ではありませんが、独自の事前キャッシュ手順がある場合に役立ちます。****

**`**import {registerRoute} from 'workbox-routing';**``**import {CacheOnly} from 'workbox-strategies';**``**registerRoute(**``**  ({url}) => url.pathname.startsWith('/app/v2/'),**``**  new CacheOnly()**``**);**`**
****戦略の構成****
****すべての戦略により、以下を構成できます。****
• ****戦略で使用するキャッシュの名前。****
• ****戦略で使用するキャッシュの有効期限の制限。****
• ****リクエストをフェッチしてキャッシュするときに呼び出されるライフサイクルメソッドを持つプラグインの配列。****
****戦略で使用されるキャッシュの変更****
****キャッシュ名を指定することで、使用する戦略をキャッシュに変更できます。****これは、デバッグを支援するためにアセットを分離する場合に役立ちます。****

**`**import {registerRoute} from 'workbox-routing';**``**import {CacheFirst} from 'workbox-strategies';**``**registerRoute(**``**  ({request}) => request.destination === 'image',**``**  new CacheFirst({**``**    cacheName: 'image-cache',**``**  })**``**);**`**
****プラグインの使用****
****Workboxには、これらの戦略で使用できるプラグインのセットが付属しています。****
• **[**ワークボックス-背景-同期**](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-background-sync)**
• **[**ワークボックス-ブロードキャスト-更新**](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-broadcast-update)**
• **[**ワークボックス-キャッシュ可能-応答**](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-cacheable-response)**
• **[**ワークボックス-有効期限**](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-expiration)**
• **[**ワークボックス-範囲-リクエスト**](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-range-requests)**
****これらのプラグイン（またはカスタムプラグイン）のいずれかを使用するには、インスタンスを**`**plugins**`**オプション****に渡す必要があり****ます。****

**`**import {registerRoute} from 'workbox-routing';**``**import {CacheFirst} from 'workbox-strategies';**``**import {ExpirationPlugin} from 'workbox-expiration';**``**registerRoute(**``**  ({request}) => request.destination === 'image',**``**  new CacheFirst({**``**    cacheName: 'image-cache',**``**    plugins: [**``**      new ExpirationPlugin({**``**        // Only cache requests for a week**``**        maxAgeSeconds: 7 * 24 * 60 * 60,**``**        // Only cache 10 requests.**``**        maxEntries: 10,**``**      }),**``**    ]**``**  })**``**);**`**
****カスタム戦略****
****Workboxでは、戦略の構成に加えて、独自のカスタム戦略を作成できます。****これは、**`**Strategy**`**基本クラスを次の場所から****インポートして拡張することで実行できます**`**workbox-strategies**`**。****

**`**import {Strategy} from 'workbox-strategies';**``**class NewStrategy extends Strategy {**``**  _handle(request, handler) {**``**    // Define handling logic here**``**  }**``**}**`**
****この例で**`**handle()**`**は****、****特定の処理ロジックを定義するための要求戦略として使用されます。****使用できるリクエスト戦略は2つあります。****
• **`**handle()**`**：リクエスト戦略を実行し、**[**関連する**](https://developers.google.com/web/tools/workbox/guides/using-plugins#lifecycle_callbacks)**すべての**[**プラグインコールバック**](https://developers.google.com/web/tools/workbox/guides/using-plugins#lifecycle_callbacks)**を呼び出して**`**Promise**`**解決するを****返し**[**ます**](https://developers.google.com/web/tools/workbox/guides/using-plugins#lifecycle_callbacks)**。**`**Response**``**handleAll()**`**: Similar to **`**handle()**`**, but returns two **`**Promise**`** objects. The first is
equivalent to what **`**handle()**`** returns and the second will resolve when promises that were
added to **`**event.waitUntil()**`** within the strategy have completed.****Both request strategies are invoked with two parameters:****
• **`**request**`**: The **`**Request**`** the strategy will return a response for.****
• **`**handler**`**: A **`**StrategyHandler**`** instance automatically created for the current strategy.****
****Creating A New Strategy****
****The following is an example of a new strategy that re-implements the behavior of **`**NetworkOnly**`**:****

**`**class NewNetworkOnlyStrategy extends Strategy {**``**  _handle(request, handler) {**``**    return handler.fetch(request);**``**  }**``**}**`**
****Notice how **`**handler.fetch()**`** is called instead of the native **`**fetch**`** method. The **`**StrategyHandler**`**
class provides a number of fetch and cache actions that can be used whenever **`**handle()**`** or
**`**handleAll()**`** is used:****
• **`**fetch**`**: Fetches a given request, and invokes the **`**requestWillFetch()**`**, **`**fetchDidSucceed()**`**, and
**`**fetchDidFail()**`** plugin lifecycle methods****
• **`**cacheMatch**`**: Matches a request from the cache, and invokes the **`**cacheKeyWillByUsed()**`** and
**`**cachedResponseWillByUsed()**`** plugin lifecycle methods****
• **`**cachePut**`**: Puts a request/response pair in the cache, and invokes the **`**cacheKeyWillByUsed()**`**,
**`**cacheWillUpdate()**`**, and **`**cacheDidUpdate()**`** plugin lifecycle methods ****
• **`**fetchAndCachePut**`**: Calls **`**fetch()**`** and runs **`**cachePut()**`** in the background on the response
generated by **`**fetch()**`**.****
• **`**hasCallback**`**: Takes a callback as input and returns true if the strategy has at least one plugin
with the given callback.****
• **`**runCallbacks**`**: Runs all plugin callbacks matching a given name, in order, passing a given param
object (merged with the current plugin state) as the only argument.****
• **`**iterateCallbacks**`**: Accepts a callback and returns an iterable of matching plugin callbacks, where
each callback is wrapped with the current handler state (i.e. when you call each callback,
whatever object parameter you pass it will be merged with the plugin's current state).****
• **`**waitUntil**`**: Adds a promise to the extend lifetime promises of the event event associated with the
request being handled (usually a **`**FetchEvent**`**).****
• **`**doneWaiting**`**: Returns a promise that resolves once all promises passed to **`**waitUntil()**`** have
settled.****
• **`**destroy**`**: Stops running the strategy and immediately resolves any pending **`**waitUntil()**`** promises.****star****Note:**** Refer to the **[**source
implementation**](https://github.com/GoogleChrome/workbox/blob/6d38919ebbc9664327e19ff00302d805c8166170/packages/workbox-strategies/src/StrategyHandler.ts)**
of **`**StrategyHandler**`** to see all the parameters accepted by each action****
****Custom Cache Network Race Strategy****
****The following example is based on
**[**cache-network-race**](https://jakearchibald.com/2014/offline-cookbook/#cache--network-race)** from the
Offline Cookbook (which Workbox does not provide), but goes a step further and always updates the
cache after a successful network request. This in an example of a more complex strategy that uses
multiple actions.****

**`**import {Strategy} from 'workbox-strategies';**``**class CacheNetworkRace extends Strategy {**``**  _handle(request, handler) {**``**    const fetchAndCachePutDone = handler.fetchAndCachePut(request);**``**    const cacheMatchDone = handler.cacheMatch(request); **``**    return new Promise((resolve, reject) => {**``**      fetchAndCachePutDone.then(resolve);**``**      cacheMatchDone.then((response) => response && resolve(response));**``**      // Reject if both network and cache error or find no response.**``**      Promise.allSettled([fetchAndCachePutDone, cacheMatchDone]).then((results) => {**``**        const [fetchAndCachePutResult, cacheMatchResult] = results;**``**        if (fetchAndCachePutResult.status === 'rejected' && !cacheMatchResult.value) {**``**          reject(fetchAndCachePutResult.reason);**``**        }  **``**      });**``**    });**``**  }**``**}**`**
****Advanced Usage****
****If you want to use the strategies in your own fetch event logic, you can
use the strategy classes to run a request through a specific strategy.****
****For example, to use the stale-while-revalidate strategy, you can do the
following:****

**`**self.addEventListener('fetch', (event) => {**``**  const {request} = event;**``**  const url = new URL(request.url);**``**  if (url.origin === location.origin && url.pathname === '/') {**``**    event.respondWith(new StaleWhileRevalidate().handle({event, request}));**``**  }**``**});**`**
****You can find the list of available classes in the
**[**workbox-strategies reference docs**](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-strategies)**.****

    

    
  ****

  

  
    
      
    ****Rate and review**