---
URL: https://mizchi.hatenablog.com/entry/2019/02/08/154010
Created: 2020-12-31T16:59:00
Updated: 2020-12-31T16:59:00
Tags: [topic/技術/React]
---
[**mizchi's blog**](https://mizchi.hatenablog.com/)

[**2019-02-08**](https://mizchi.hatenablog.com/archive/2019/02/08)

# [実践: React Hooks](https://mizchi.hatenablog.com/entry/2019/02/08/154010)

hooks が発表されてから趣味でも現場でもずっと hooks を使っています。おかげでだいぶこなれてきて、だいたいなんのライフサイクルでも表現できるようになってきました。

最初は単に useState が state を、 useEffect が componentDidMount/componentDidUpdate を置き換えるもの、と説明を済ますつもりでしたが、 useEffect についてはライフサイクルのモデルがぜんぜん違うので、別の説明をする必要があるように感じていました。

で、その結果 React Hooks を理解するには、関数のメモ化を理解するのが最も簡単だと思ったので、その説明をしつつ、イディオムを解説していこうと思います。

## 最初に: React Hooks は何であり、何ではないか

関数[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)が状態を持てるようにするもので、関数のメモ化のテクニックを多用します。

redux を置き換えるものではない。が… Redux の機能を一部吸収しています(`useReducer`)。後述する Context と組み合わせることで、middleware なし Redux が簡単に実現できます。

直接的には recompose や HOC といったテクニックを置き換えるものです。

## メモ化されたライフサイクル

(メモ化関数についての基本的な説明をするので、わかってる人は読み飛ばしてください)

```plain text
const fib = n => n < 2 ? n : fib(n - 1) + fib (n - 2);
fib(10) // 55

```

この fib(10) は、計算の定義自体は簡単ですが、実際には何度も同じ値への計算をすることになります。
これを効率よく計算するため、計算済みの値は保存してしまうこととしましょう。

この fib 関数をメモ化するとこんな風になります。

```plain text
const memo = [0, 1]; // js の配列のインデックス外へのアクセスの雑な挙動を利用
const fib = n => {
  if (memo[n] != null) return memo[n];
  const r = fib(n - 1) + fib (n - 2);
  return memo[n] = r;
}

```

これで、 `fib(n)` が計算済みだったら、計算済みの値を返す、という挙動になります。

ちなみに、 lodash の `_.memoize` を使って `const fib = _.memoize(n => n < 2 ? n : fib(n - 1) + fib (n - 2));` でもメモ化できます。

## React Hooks でのメモ化

React Hooks を活用するには、このメモ化の仕組みを理解しておく必要があります。

React Hooks の、特に `useEffect` と `useCallback` の第二引数は、このメモ化の理解を必要とします。

```plain text
function Foo({x}) {
  useEffect(() => console.log('x changed'), [x]);
  return <div>{x}</div>
}

```

これは Foo への props `x` が書き換わるごとに、useEffect が実行されます。 `useEffect(fn, memoizedKeys)` の `fn` は、 `memoizedKeys` ごとにメモ化されている、と言えます。ただし、全ての状態をメモ化しているのではなく、直前の状態だけをメモしています。

ここではメモ化のヒントは 配列になっています。一致判定のロジック自体は配列の各要素の shallow equal、雑に言ってしまうと `newKeys.every((k, i) => k === oldKeys[i])` です。

## 差分検知に失敗するケース

useCallback は `memoizedKeys` でメモ化された関数を返却します。もし、 `memoizedKeys` が一致する場合、新しい関数は生成されません。前のステップで生成された関数をそのまま返却します。

`x+y` が表示され、クリックすると、`x+y` を console.log する、という[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)で考えてみましょう。

```plain text
function Sum({x, y}) {
  const onClick = useCallback(() => console.log('x,y changed', x + y), [x]);
  return <div onClick={onClick}>{x + y}</div>
}

```

このとき、新しい関数が生成されるのは、 `x` が変更されるときだけなので、`y` の更新には反応しません。なので、y だけ更新した際は、表示は更新されても、新しい x と 古い y を足した値を console.log することでしょう。

正しく両方の値に反応したい場合、次のように `[x, y]` と `memoizedKeys` を与える必要があるわけですね。

```plain text
function Sum({x, y}) {
  const onClick = useCallback(() => console.log('x,y changed', x + y), [x, y]);
  return <div onClick={onClick}>{x + y}</div>
}

```

より一般化すると、「関数[クロージャ](http://d.hatena.ne.jp/keyword/%A5%AF%A5%ED%A1%BC%A5%B8%A5%E3)の中で参照する要素はすべて memoizedKeys に列挙する」というベストプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスになると思います。

ちょっとむずかしいですが、総じて、差分[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)に由来する React らしい、一貫した副作用の抽象化と言えるでしょう。

## 実行コンテキストの仕組み

見た目上は魔法のように見える Hooks の記法ですが、単に副作用が外出しされているだけです。最初は algeblaic effects が云々みたいな話がありましたが、その話は忘れてください。

中で何が起こっているかは、すごく雑な疑似コードを書くと、たぶんこんな感じだと思います。

```plain text
// 実行コンテキスト
const hooksMap = {}

  // ReactDOM.render の中の差分更新のどこか
  const hooks = hooksMap[oldElement.id] || []
  const newElement = updateElement(oldElement, virtualElement, hooks);
  hooksMap[newElement.id] = newElement.hooks;

```

hooks に実行[インスタンス](http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9)を引っ掛けてコンテキストを生成しているだけです。

より詳しい実装を知りたければ、こちらの翻訳記事を参照してください

[(翻訳) React Hooks は魔法ではなく、ただの配列だ](https://gist.github.com/mizchi/fa00890df2c8d1f27b9ca94b5cb8dd1d)

## イディオム

componentDidMount/componentWillUnmount 相当

```plain text
import React, { useEffect } from 'react'
function Foo() {
  useEffect(() => {
    console.log('mounted')
    return () => {
      console.log('unmount')
    }
  }, [])
  return <></>
}

```

state を持つ

```plain text
import React, { useState } from 'react'
function Foo() {
  const [state, setState] = useState([])
  return (
    <>
      {state.map(i => <div key={i}>i</div>)}
      <button onClick={
        ()=> setState([...state, Math.random().toString()])
      }>
        add
      </button>
    </>
  )
}

```

ref を使って DOM を触る。(textarea にフォーカスする例)
DOMへ起きた副作用を検知する場合は useEffect ではなく useLayoutEffect になります。

```plain text
import React, { useState } from 'react'
function Foo() {
  const textareaRef = useRef(null);
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])
  return <textarea ref={textareaRef}/>
}

```

外部の副作用を監視して、[プログレスバー](http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%EC%A5%B9%A5%D0%A1%BC)を進める、みたいな例

```plain text
import React, { useState, useEffect } from 'react'
function Foo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
     // 何か外部の副作用
     const unsubscribe = resouce.subscribe(() => {
        setStep(step + 1);
     });
     return () => unsubscribe() 
  }, [step])
  return <></>
}

```

## useReducer + context = redux like

useReducer は react で公式に reducer の仕組みが取り込まれたものです。これは単に、state の reducer 版イディオムでしかありません。

これに、親子の間で暗黙に値を受け渡す Context [API](http://d.hatena.ne.jp/keyword/API) と、useContext の hooks を使うと、次のように redux 風の flux が再現できます。

```plain text
import React, { useReducer, useContext, Dispatch, ReactElement } from "react";
import ReactDOM from "react-dom";

type CounterState = {
  count: number;
};

const initialState: CounterState = { count: 0 };

function reducer(state: CounterState, action: any) {
  switch (action.type) {
    case "reset": {
      return initialState;
    }
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      return state;
    }
  }
}

// Container
const CounterContext = React.createContext<CounterState>(null as any);
const DispatchContext = React.createContext<Dispatch<any>>(null as any);

function App({ initialCount }: { initialCount: number }) {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });
  return (
    <CounterContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Counter />
      </DispatchContext.Provider>
    </CounterContext.Provider>
  );
}

// Connected component
function Counter() {
  const state = useContext(CounterContext);
  const dispatch = useContext(DispatchContext);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

ReactDOM.render(<App initialCount={2} />, document.querySelector(".root"));

```

ただし、useReducer はだいぶ redux のそれと比べて、store 層が簡略化されています。middleware の仕組みは一切ありません。

reducer 定義自体は、単に `(state, action) => state` を守っていればいいです。 `redux.combineReducers` をヘルパとして使ってもいいですし、redux で使っていた reudcer をそのまま置き換えることも可能です。

とりあえず useReducer + Context で作ってみて、複雑な Middleware が必要だったら Redux を使う、という感じでいいんじゃないでしょうか。

## どう適応するか

現状、表現力という点で、関数[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)とクラス[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)はほぼ同等です。

`class MyComponent extends React.Component` といったクラス記法は、おそらく推奨されなくなるのではないでしょうか。消えることはないでしょうが、推奨されない、といった雰囲気です。

React は[関数型プログラミング](http://d.hatena.ne.jp/keyword/%B4%D8%BF%F4%B7%BF%A5%D7%A5%ED%A5%B0%A5%E9%A5%DF%A5%F3%A5%B0)の雰囲気が強いコアチーム、出自([facebook](http://d.hatena.ne.jp/keyword/facebook))、コミュニティなので、おそらく今後見かけるコードは hooks がメインになる気がします。

これは勝手な憶測ですが、React は、頭がいいであろう [Facebook](http://d.hatena.ne.jp/keyword/Facebook) のエンジニアがメインターゲットなので、頭が良い人しかターゲットにしていない、というのがたぶんあって、僕はそれが好きではあるんですが、 Vue に初心者層をかっさらわれたのはそういう姿勢に問題があったんじゃないか、という気持ちもあります。

何にせよ、シンプルな一貫した[アルゴリズム](http://d.hatena.ne.jp/keyword/%A5%A2%A5%EB%A5%B4%A5%EA%A5%BA%A5%E0)を理解していれば、すべてがうまくいく、という世界観で、自分はそこが気に入っています。

みずち (id:mizchi)[1年前](https://mizchi.hatenablog.com/entry/2019/02/08/154010)

**38**

[328](https://b.hatena.ne.jp/entry/s/mizchi.hatenablog.com/entry/2019/02/08/154010)

[6](https://b.hatena.ne.jp/entry/s/mizchi.hatenablog.com/entry/2019/02/08/154010)

[**ツイート**](https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fmizchi.hatenablog.com%2F&ref_src=twsrc%5Etfw&text=%E5%AE%9F%E8%B7%B5%3A%20React%20Hooks%20-%20mizchi's%20blog&tw_p=tweetbutton&url=https%3A%2F%2Fmizchi.hatenablog.com%2Fentry%2F2019%2F02%2F08%2F154010)

[広告を非表示にする](http://blog.hatena.ne.jp/guide/pro)
      
    
  
  


    
      
   [**はてなブックマークでのコメント **](https://b.hatena.ne.jp/entry/s/mizchi.hatenablog.com/entry/2019/02/08/154010)(255 + 73) 
• [**はてなブックマークでコメントする**](https://b.hatena.ne.jp/my/add.confirm?url=https%3A%2F%2Fmizchi.hatenablog.com%2Fentry%2F2019%2F02%2F08%2F154010)
• [katsukiniwa](https://b.hatena.ne.jp/katsukiniwa/20200225#bookmark-4664300306482742977)圧倒的コンテンツ・・・2020/02/25
• [natsukicrab](https://b.hatena.ne.jp/natsukicrab/20200121#bookmark-4664300306482742977)読む2020/01/21
• [okumuraa1](https://b.hatena.ne.jp/okumuraa1/20190623#bookmark-4664300306482742977)ありがとうございますm(_ _)m2019/06/23すべてのコメントを表示する[はてなブックマークで確認](https://b.hatena.ne.jp/entry/s/mizchi.hatenablog.com/entry/2019/02/08/154010)
      
    
    
  

 


        

          
      
  
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
      2018-11-09
    
  ](https://mizchi.hatenablog.com/archive/2018/11/09)[React Hooks をどう使っていくか](https://mizchi.hatenablog.com/entry/2018/11/09/125252)


          
          

                      大きく、末端コンポーネントと全体アーキテクチャの視点がある….
  
    
    
• 
        
                      [
      2018-10-28
    
  ](https://mizchi.hatenablog.com/archive/2018/10/28)[JavaScript エンジニア向け: 知識ゼロから tensorflow.js で機械学習入門](https://mizchi.hatenablog.com/entry/2018/10/28/211852)


          
          

                      この週末で機械学習を勉強した結果として、JavaScript エンジニ….
  
    
    
• 
        
                      [
      2017-09-19
    
  ](https://mizchi.hatenablog.com/archive/2017/09/19)[redux の repatch middleware を実装しようとしたメモ](https://mizchi.hatenablog.com/entry/2017/09/19/061214)


          
          

                      色々コンテキスト略。自分用の作業メモ。 jaystack/repatch を ….
  

        

      
    
    
  
    
    
      
    
    
      コメントを書く
    
  

      
      
    
  

  
  
  
  
  
  
  
    
      
      
        [« 
          Kaggle Titanic やってみた感想
        ](https://mizchi.hatenablog.com/entry/2019/02/08/183056)
      
    
    
      
      
        [
          GIGAZINE が音声認識アプリのマニュアルを…
           »
        ](https://mizchi.hatenablog.com/entry/2019/01/24/133903)
      
    
  

**
    プロフィール
  **
    
    
    

    
    [**みずち (id:mizchi)**](https://mizchi.hatenablog.com/about)**
      
  
    
    
  


    **
    

    

    

    
      [**
    
    
      読者になる
      
    
  **](https://mizchi.hatenablog.com/entry/2019/02/08/154010#)<u>1851
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
• </u><u>▼
              
            
            </u>[<u>
              2019 (22)
            </u>](https://mizchi.hatenablog.com/archive/2019)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 11 (1)
                  </u>](https://mizchi.hatenablog.com/archive/2019/11)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 10 (2)
                  </u>](https://mizchi.hatenablog.com/archive/2019/10)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 9 (2)
                  </u>](https://mizchi.hatenablog.com/archive/2019/9)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 8 (1)
                  </u>](https://mizchi.hatenablog.com/archive/2019/8)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 6 (2)
                  </u>](https://mizchi.hatenablog.com/archive/2019/6)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 5 (2)
                  </u>](https://mizchi.hatenablog.com/archive/2019/5)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 4 (2)
                  </u>](https://mizchi.hatenablog.com/archive/2019/4)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 3 (3)
                  </u>](https://mizchi.hatenablog.com/archive/2019/3)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 2 (3)
                  </u>](https://mizchi.hatenablog.com/archive/2019/2)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2019 / 1 (4)
                  </u>](https://mizchi.hatenablog.com/archive/2019/1)<u>
              
            </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2018 (58)
            </u>](https://mizchi.hatenablog.com/archive/2018)<u>
            
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