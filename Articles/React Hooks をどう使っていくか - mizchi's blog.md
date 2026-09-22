---
URL: https://mizchi.hatenablog.com/entry/2018/11/09/125252
Created: 2020-12-31T16:59:00
Updated: 2020-12-31T16:59:00
Tags: [topic/技術/React]
---
[**mizchi's blog**](https://mizchi.hatenablog.com/)

[**2018-11-09**](https://mizchi.hatenablog.com/archive/2018/11/09)

# [React Hooks をどう使っていくか](https://mizchi.hatenablog.com/entry/2018/11/09/125252)

大きく、末端[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)と全体[アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)の視点がある。

## 末端[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)での Hooks

ここはあまり議論の余地なく、setState で local state を持っているものや、 componentDidMount していたものを置き換えることが出来ると思う。

FC を class にせずにちょっとリッチにするのが簡単になる。

## class の setState 相当

```plain text
function Counter() {
  const [count, setCount] = useState(0);
  const onClick = useCallback(() => setCount(s => s + 1), []);
  return <button onClick={onClick}>{count}</button>
}
```

## componentDidMount / componentWillUnmount 相当

```plain text
function KeyListenerer {
  useEffect(() => {
    const onClick = event => console.log(event.keyCode);
    window.addEventListener('keydown', onClick);
    return () => window.removeEventListener('keydown', onClick);
  }, []);
  return <span>...</span>
}
```

`[]` は返り値を memoize するためのキーで [] を与えると常に同じ参照を返す。

これは慣れてないとちょっと難しい。useEffect で `[]` を与えないと effect の実行は componentDidUpdate 相当になる。

一旦は memoize keys なしで書いて、再描画を抑制する必要があったら、ちょっと頭を捻ってkeysを与える感じになりそう。

[(翻訳) React Hooks は魔法ではなく、ただの配列だ](https://gist.github.com/mizchi/fa00890df2c8d1f27b9ca94b5cb8dd1d)

## React.memo と useCallback

useCallback の便利なところは、今まで class で `this.onClickBound = this.onClick.bind(this)` のような書き方をしていた箇所が、pure(or memo) の shallow equal 比較で memoize された関数参照なので true になる。React.memo と組み合わせることで、子に関数を参照を渡す時に render を抑制することが簡単になる。

こういうケースで有効。

```plain text
const Button = React.memo(props => {
  return <button onClick={props.onClick}>{props.value}</button>
});

function App() {
  const onClick = useCallback(() => console.log('xxx'), []);
  return <Button onClick={onClick} value={"foo"}/>
}

function Root() {
  const [data, setData] = useState({})
  useEffect(() => {
    const id = setInterval(() => { setData(v => v + 1) });
    return () => clearInterval(id);
  });
  return <App {...data}/>
}
```

App の親から App の render が掛かっても、Button の shallow equal は true なので、 Button は [value](http://d.hatena.ne.jp/keyword/value) が変わらない限り更新されない。

## [アーキテクチャ](http://d.hatena.ne.jp/keyword/%A5%A2%A1%BC%A5%AD%A5%C6%A5%AF%A5%C1%A5%E3)上の React Hooks and Suspense

ここは無限に議論の余地がある。誰もベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスを持ってない。

一応、トレンドとしてはマイクロフロントエンドがある。 [[翻訳記事]マイクロフロントエンド - マイクロサービスのフロントエンドへの応用](https://micro-frontends-japanese.org/)

React コアチームはマイクロフロントエンド的なものを志向しているように見える。Component がそれ自体でどんどん賢くなる方向性。Component に処理を書かず、一箇所に集約する Redux の Single Source 的な方向性は、素朴に使うとマイクロフロントエンドと対立する。

すごく大雑把に言うと、 organisms の接続先が redux store になるか、何らかの [API](http://d.hatena.ne.jp/keyword/API) を経由した先になるか。という違いになるのではないか。あるいは Component 自体が自身の接続ロジックを密に知ることになる。

Organisms 相当は、こんな風になるだろうか。

```plain text
const Child = React.lazy(() => import('./Child'))

function MyOrg() {
  const [state, setState] = useState(null)
  useEffect(() => {
    const data = readFooData();
    setState(data)
  });
  return <Suspense fallback="loading..."><Child /></Suspense>
}
```

Suspense のことを考えると、一緒に非同期を解決してしまうのは確かに便利ではある。しかし、アプリケーション全体を協調させるための State が一つ欲しい。rcombineReducers は不要かもしれない。そうなると、 redux は使わず、 `useReducer` だけで済ませられる、かも。

[[Fizz] New Server Rendering Infra by sebmarkbage · Pull Request #14144 · facebook/react](https://github.com/facebook/react/pull/14144)

## 実験

手を動かして考えるためにこんなものを実装した。(npm に publish はしてない)

[https://github.com/mizchi/redux-worker-context](https://github.com/mizchi/redux-worker-context)

react-redux の connect を `useSelector(state => state.foo)` と書きたかっただけだが、それだけでは面白くないので、MainTheard との関係を希薄にするために WebWorker に store の実体を移してみた。MainThread は worker の store から 自分に関係ある snapshot を受け取り、その利用者は更に snapshot を select して自分自身に[マッピング](http://d.hatena.ne.jp/keyword/%A5%DE%A5%C3%A5%D4%A5%F3%A5%B0)する。

シングルトンだとしても、connect の mapStateToState で参照を絞るのはいいア[イデア](http://d.hatena.ne.jp/keyword/%A5%A4%A5%C7%A5%A2)だと思うので、とりあえずそのまま redux を使った。

`RootState => ComponentSnapshot => LocalSnapshot` みたいなイメージ。これは Worker をサーバーに見立てて、クライアントだけでクライアント/サーバーモデルを擬似的に表現している。

これは、 middleware も redux のものになるので、既存資産はそのまま使える。WebWorker に処理が移ってるので CPU ヘヴィな操作がある程度許容される。

WorkerDOM みたいなものが実現可能になったら面白いことができるかもしれない、という期待もある。

## Redux and Hooks

Redux は、まず消極的に、まず内部 [API](http://d.hatena.ne.jp/keyword/API) を変えるのに用いる、とのこと。`useStore` みたいな [API](http://d.hatena.ne.jp/keyword/API) が生えるとしても、だいぶ後。

[https://github.com/reduxjs/react-redux/issues/1063#issuecomment-436479804](https://github.com/reduxjs/react-redux/issues/1063#issuecomment-436479804)

自分でhooksで遊びたかったら、現状自分で書くしかない。

みずち (id:mizchi)[2年前](https://mizchi.hatenablog.com/entry/2018/11/09/125252)

[73](https://b.hatena.ne.jp/entry/s/mizchi.hatenablog.com/entry/2018/11/09/125252)

[6](https://b.hatena.ne.jp/entry/s/mizchi.hatenablog.com/entry/2018/11/09/125252)

[**ツイート**](https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fmizchi.hatenablog.com%2F&ref_src=twsrc%5Etfw&text=React%20Hooks%20%E3%82%92%E3%81%A9%E3%81%86%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%84%E3%81%8F%E3%81%8B%20-%20mizchi's%20blog&tw_p=tweetbutton&url=https%3A%2F%2Fmizchi.hatenablog.com%2Fentry%2F2018%2F11%2F09%2F125252)

[広告を非表示にする](http://blog.hatena.ne.jp/guide/pro)
      
    
  
  


    
      
   [**はてなブックマークでのコメント **](https://b.hatena.ne.jp/entry/s/mizchi.hatenablog.com/entry/2018/11/09/125252)(60 + 13) 
• [**はてなブックマークでコメントする**](https://b.hatena.ne.jp/my/add.confirm?url=https%3A%2F%2Fmizchi.hatenablog.com%2Fentry%2F2018%2F11%2F09%2F125252)
• [uehaj](https://b.hatena.ne.jp/uehaj/20181110#bookmark-373862716)hooksもReduxもマイクロフロンエンドトは直交すると思うけど/reduxをhooksで連携させる実装は今のところ https://github.com/ctrlplusb/easy-peasy があります2018/11/10
• [massa142](https://b.hatena.ne.jp/massa142/20181110#bookmark-373862716)“React コアチームはマイクロフロントエンド的なものを志向しているように見える。Component がそれ自体でどんどん賢くなる方向性”2018/11/10
• [yosuke_furukawa](https://b.hatena.ne.jp/yosuke_furukawa/20181109#bookmark-373862716)useCallback便利！2018/11/09すべてのコメントを表示する[はてなブックマークで確認](https://b.hatena.ne.jp/entry/s/mizchi.hatenablog.com/entry/2018/11/09/125252)
      
    
    
  

 


        

          
      
  
  **
    関連記事
  **
  
  
    
    
• 
        
                      [
      2019-09-08
    
  ](https://mizchi.hatenablog.com/archive/2019/09/08)[Chrome(Canary) の Native File System API で ローカルファイル…](https://mizchi.hatenablog.com/entry/2019/09/08/090057)


          
          

                      ブラウザ上でローカルファイルの読み書きができる Native File ….
  
    
    
• 
        
                      [
      2019-03-10
    
  ](https://mizchi.hatenablog.com/archive/2019/03/10)[HTMLでコピペできそうでできない要素を作る](https://mizchi.hatenablog.com/entry/2019/03/10/015208)


          
          

                      歌詞サイト内で湘南乃風の睡蓮花の歌詞がだんだん大きくなって….
  
    
    
• 
        
                      [
      2019-02-08
    
  ](https://mizchi.hatenablog.com/archive/2019/02/08)[実践: React Hooks](https://mizchi.hatenablog.com/entry/2019/02/08/154010)


          
          

                      hooks が発表されてから趣味でも現場でもずっと hooks を使って….
  
    
    
• 
        
                      [
      2018-05-15
    
  ](https://mizchi.hatenablog.com/archive/2018/05/15)[クライアントサイドのモデルとは何か 前編 ~ クライアントサイド MVC の死](https://mizchi.hatenablog.com/entry/2018/05/15/181819)


          
          

                      前置き この記事、本来は Flux には Model がないのではないか….
  
    
    
• 
        
                      [
      2017-10-02
    
  ](https://mizchi.hatenablog.com/archive/2017/10/02)[やはりHTML/DOMは再発明されるべきじゃないか](https://mizchi.hatenablog.com/entry/2017/10/02/074916)


          
          

                      と思う次第である。以下理由。 JavaScript, GUI設計の今 JSはそ….
  

        

      
    
    
  
    
    
      
    
    
      コメントを書く


    
      
      
        [« 
          redux-workerized で Redux と Vue を接続…
        ](https://mizchi.hatenablog.com/entry/2018/11/12/151538)
      
    
    
      
      
        [
          「この〜を導入すると、なんとこうなりま…
           »
        ](https://mizchi.hatenablog.com/entry/2018/11/08/080445)
      
    
  

**
    プロフィール
  **
    
    
    

    
    [**みずち (id:mizchi)**](https://mizchi.hatenablog.com/about)**
      
  
    
    
  


    **
    

    

    

    
      [**
    
    
      読者になる
      
    
  **](https://mizchi.hatenablog.com/entry/2018/11/09/125252#)<u>1851
  </u><u>.</u><u>

    

    
  </u><u>

    
      </u><u>**
    検索
  **</u><u>
  
  
</u><u>

    
      </u><u>**
    リンク
  **</u><u>
      
        </u><u>
• </u>[<u>はてなブログ</u>](https://hatenablog.com/)<u>
      
        </u><u>
• </u>[<u>ブログをはじめる</u>](https://hatenablog.com/guide?via=200109)<u>
      
        </u><u>
• </u>[<u>週刊はてなブログ</u>](http://blog.hatenablog.com/)<u>
      
        </u><u>
• </u>[<u>はてなブログPro</u>](https://hatenablog.com/guide/pro)<u>
      
    </u><u>

    
      </u>[<u>**
      最新記事
    **</u>](https://mizchi.hatenablog.com/archive)<u>
  
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>2020年やったこと、考えたこと、触った技術のまとめ</u>](https://mizchi.hatenablog.com/entry/2020/12/28/140530)<u>


          
          

                </u><u>
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>リングフィットアドベンチャーをクリアして 8kg 痩せて筋肉質になった (71kg => 63kg)</u>](https://mizchi.hatenablog.com/entry/2020/08/23/163221)<u>


          
          

                </u><u>
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>俺の webpack.config.js-20200503</u>](https://mizchi.hatenablog.com/entry/2020/05/03/151022)<u>


          
          

                </u><u>
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>Qiitaのランキングの最初の設計者としての「いいね」の設計と、「LGTM」は下においてほしいという話</u>](https://mizchi.hatenablog.com/entry/2020/03/13/015359)<u>


          
          

                </u><u>
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>報告: 結婚しました</u>](https://mizchi.hatenablog.com/entry/2020/02/22/171621)<u>


          
          

                </u><u>
  
</u><u>

    
      

</u>[<u>**月別アーカイブ**</u>](https://mizchi.hatenablog.com/archive)<u>
  

  
    
    
      </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2020 (10)
            </u>](https://mizchi.hatenablog.com/archive/2020)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2019 (22)
            </u>](https://mizchi.hatenablog.com/archive/2019)<u>
            
          </u><u>
        
          </u><u>
• </u><u>▼
              
            
            </u>[<u>
              2018 (58)
            </u>](https://mizchi.hatenablog.com/archive/2018)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 12 (6)
                  </u>](https://mizchi.hatenablog.com/archive/2018/12)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 11 (6)
                  </u>](https://mizchi.hatenablog.com/archive/2018/11)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 10 (13)
                  </u>](https://mizchi.hatenablog.com/archive/2018/10)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 9 (1)
                  </u>](https://mizchi.hatenablog.com/archive/2018/9)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 8 (5)
                  </u>](https://mizchi.hatenablog.com/archive/2018/8)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 7 (7)
                  </u>](https://mizchi.hatenablog.com/archive/2018/7)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 6 (4)
                  </u>](https://mizchi.hatenablog.com/archive/2018/6)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 5 (7)
                  </u>](https://mizchi.hatenablog.com/archive/2018/5)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 4 (4)
                  </u>](https://mizchi.hatenablog.com/archive/2018/4)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 3 (3)
                  </u>](https://mizchi.hatenablog.com/archive/2018/3)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2018 / 1 (2)
                  </u>](https://mizchi.hatenablog.com/archive/2018/1)<u>
              
            </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2017 (38)
            </u>](https://mizchi.hatenablog.com/archive/2017)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2016 (18)
            </u>](https://mizchi.hatenablog.com/archive/2016)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2015 (41)
            </u>](https://mizchi.hatenablog.com/archive/2015)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2014 (123)
            </u>](https://mizchi.hatenablog.com/archive/2014)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2013 (45)
            </u>](https://mizchi.hatenablog.com/archive/2013)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2012 (3)
            </u>](https://mizchi.hatenablog.com/archive/2012)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2011 (10)
            </u>](https://mizchi.hatenablog.com/archive/2011)<u>
            
          </u><u>
        
      </u><u>
    
  




    
    
  .</u>

<u>.</u>