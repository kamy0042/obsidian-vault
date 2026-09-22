---
URL: https://yigarashi.hatenablog.com/entry/react-custom-hook
Created: 2020-12-31T16:12:00
Updated: 2020-12-31T16:12:00
Tags: [topic/技術/React]
---
[**yigarashi のブログ**](https://yigarashi.hatenablog.com/)

[2020-02-25](https://yigarashi.hatenablog.com/archive/2020/02/25)

# [【React】カスタムフックでstatefulなコンポーネントを整理する](https://yigarashi.hatenablog.com/entry/react-custom-hook)

こんにちは。最近は仕事で React を書き始めました。数年前に React を触った時は class component をせっせと書いた覚えがあるのですが、最近は functional component と react hooks を組み合わせて書くこともできるようです。react hooks の概要は[公式ドキュメント](https://ja.reactjs.org/docs/hooks-intro.html)等を読んでもらうことにして、本記事では、自作のカスタムフックで stateful な[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を整理する一例を紹介し、それによって享受できるメリットを少し深掘りしたいと思います。

## 整理する前のコード

まずは僕が最初にお試しで書いた TypeScript のコードをお見せします。インターネットに転がっている例をつぎはぎして、見よう見まねで書いた投稿フォームです。コード中の `useQuery` は、[apollo](http://d.hatena.ne.jp/keyword/apollo) client のフックで、与えられた GraphQL クエリを POST して結果を取得してくれるものです。より現実的な課題を共有するために追加しています。

```plain text
const MyForm: React.FC = () => {
  // ログイン中の自分のアカウントを取得する
  const { data, loading, error }: GetMeQueryResult = useQuery(getMeQuery);
  const [body, setBody] = React.useState('');
  const [message, setMessage] = React.useState<string | undefined>(undefined);

  const handleChange = 
    React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
      e => {
        if (e.target.name === 'body') setBody(e.target.value);
      },
      [setBody]
    );

  const handleSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(
    async e => {
      e.preventDefault();
      if (window.confirm('本当に投稿しますか？')) {
        setMessage('投稿中です。');
        // body を REST API 経由で投稿する
        await post(body);
        setMessage('投稿が完了しました。');
      }
    },
    [body, setMessage]
  );

  if (loading) return <p>ロード中…</p>;
  if (error) return <p>投稿できません。</p>;

  return (
    <form onSubmit={handleSubmit}>
      {message === undefined ? <div>{message}</div> : null}
      <span>{`ユーザー名「${data!.me.name}」として投稿します。`}</span>
      <input name={'body'} value={body} onChange={handleChange} />
      <button>投稿</button>
    </form>
  );
};

```

動かすので精一杯といった様子ですが、初めてにしては頑張った方ではないでしょうか。早速、このコードの何が問題かを考えましょう。ひとことで言えば「**ロジックとビューが分離していない**」というバッドプ[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)ティスのお手本を踏んでいるわけですが、そこをもう少し丁寧に言葉にします。

### ロジックの再利用性が低い

handleSubmit の内部を見てください。`post` の前後で `setMessage` をして、ユーザーが処理の様子を把握できるようにしています。例えば、この投稿機能を別の場所でも使いたい、しかも、ボタンで投稿するのではなく Enter を押して投稿するインラインのフォームにしたい、と言われたらどうでしょうか。今のままでは handleSubmit をコピペして[お茶を濁す](http://d.hatena.ne.jp/keyword/%A4%AA%C3%E3%A4%F2%C2%F9%A4%B9)しかないように見えます。状態に対する操作が[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)と密結合しているため、コードの再利用性が下がっています。

### テストがしづらい

この[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)をテストすることを考えてみましょう。プロダクトの品質を高めるべく意気揚々と取りかかりますが、次々と面倒ごとが襲ってきます。

まず、`MyForm` を[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)しないことにはテストのしようがないので、`useQuery` のモックは必須でしょう。フロントエンドのテストで実際の GraphQL [API](http://d.hatena.ne.jp/keyword/API) へ依存はしたくありません。幸い [apollo](http://d.hatena.ne.jp/keyword/apollo) client は `useQuery` 等を mock するための仕組みを用意してくれているのですが、こいつが意外と面倒です。テストのたびに react context に入っている client をモックしたり、リク[エス](http://d.hatena.ne.jp/keyword/%A5%A8%A5%B9)トとレスポンスを表すデータをせっせと組み上げたり、テストしたい事柄とは関係ない準備がたくさん必要になり、テストのコストが増加します。これと同じ理由で、スナップショットテストや storybook といった[レンダリング](http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0)の結果だけが必要なツールも利用しづらくなっています。

また、`handleChange` や `handleSubmit` の動作を確認するためには、実際に DOM を操作してイベントを発火させる必要があります。幸い React [コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)のテストでよく使われる enzyme では `simulate` などのメソッドを使って実現可能ですが、DOM の構造に依存している以上、デザイナーが構造を変更するとテストが壊れるといった問題がたびたび発生します。テストが壊れづらい [CSS](http://d.hatena.ne.jp/keyword/CSS) [セレクタ](http://d.hatena.ne.jp/keyword/%A5%BB%A5%EC%A5%AF%A5%BF)の書き方に頭を悩ませるのは、どうにも本質的ではない感じがしてきます。

## カスタムフックを使った[リファクタリング](http://d.hatena.ne.jp/keyword/%A5%EA%A5%D5%A5%A1%A5%AF%A5%BF%A5%EA%A5%F3%A5%B0)

では、上で書いたコードをカスタムフックで整理していきます。

まずは「ロジックの再利用性が低い」という問題を抱えていた `handleSubmit` の内部を整理してみましょう。以下の `usePost` は「`post` 前後で適切に `message` を設定する」というロジックを抜き出したフックです。

```plain text
const usePost = () => {
  const [message, setMessage] = React.useState<string | undefined>(undefined);
  return {
    message,
    wrappedPost: React.useCallback(
      async (body: string) => {
        setMessage('投稿中です。');
        // body を REST API 経由で投稿する
        await post(body);
        setMessage('投稿が完了しました。');
      },
      [setMessage, post]
    ),
  };
};

```

`message` を使いたい[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)では `post` ではなく `wrappedPost` を使うことになります。このようにすることで、`post` にまつわる状態操作のロジックを再利用することができます。また、[React Hooks Testing Library](https://react-hooks-testing-library.com/) 等を使うことにより、実際のフォームや他のロジックと独立にテストをすることができます。

次に、テストがしづらかった `handleChange` や `handleSubmit` を抜き出してフックにします。以下の `useMyFormHook` が対応するフックになります。

```plain text
type MyFormHook = {
  body: string;
  message: string | undefined;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const useMyFormHook = (): MyFormHook => {
  const [body, setBody] = React.useState('');
  const { message, wrappedPost } = usePost();
  return {
    body,
    message,
    handleChange: React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
      e => {
        if (e.target.name === 'body') setBody(e.target.value);
      },
      [setBody]
    ),
    handleSubmit: React.useCallback<React.FormEventHandler<HTMLFormElement>>(
      async e => {
        e.preventDefault();
        if (window.confirm('本当に投稿しますか？')) {
          await wrappedPost(body);
        }
      },
      [body, wrappedPost]
    ),
  };
};

```

この整理の仕方は、MVPパターンにおけるP（Presenter）に相当すると考えることができそうです。このように整理することで、`usePost` と同じように実際のフォームと独立にテストをすることができます。特に面白いのは、こうした境界で `handleChange` 等を分割することで、ユーザーのアクションを単なる JS のオブジェクトで表現してテストできるようになっていることです。例えば、フォームの `body` が変化したイベントは `{ target: { name: 'body', value: 'new body' } }` を `handleChange` の引数として与えることで表現できます（このあたりは、実際のイベントを発火させるべき、もっとリッチなイベント生成ライブラリを使うべきといった話題もあるようで、さらに議論を深めることはできそうです）。

最後にフォームの[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を実装します。

```plain text
const MyFormView: React.FC<GetMeQueryResult & MyFormHook> = ({
  data,
  loading,
  error,
  body,
  message,
  handleChange,
  handleSubmit,
}) => {
  if (loading) return <p>ロード中…</p>;
  if (error) return <p>エラーです。</p>;
  return (
    <form onSubmit={handleSubmit}>
      {message === undefined ? <div>{message}</div> : null}
      <span>{`ユーザー名「${data!.me.name}」として投稿します。`}</span>
      <input name={'body'} value={body} onChange={handleChange} />
      <button>投稿</button>
    </form>
  );
}

const MyForm: React.FC = () => {
  // ログイン中の自分のアカウントを取得する
  const queryResult: GetMeQueryResult = useQuery(getMeQuery);
  const myFormHook = useMyFormHook();
  return <MyFormView {...queryResult} {...myFormHook} />
};

```

フックから得られた値を使って ReactElement を構築する部分を、さらに `MyFormView` として分離しているのがポイントです。このようにすることでビューが pure な関数になるので、スナップショットテストや storybook といったツールでの取り回しが非常に良くなります。フックの返り値の型を mixin するような感覚でビューの props の型を定義すれば良いので、ビュー[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)を分割するコストはほとんど感じません。

## 結局何が良くなったか

ロジック、つまり「イベントを受けて状態を変化させる処理」をカスタムフックとして切り出し、さらに ReactElement を構築する処理を別[コンポーネント](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)に分割することで、**ロジックとビューを**[**疎結合**](http://d.hatena.ne.jp/keyword/%C1%C2%B7%EB%B9%E7)**にした**のが本質的にやったことです。一般的な設計論に従えば、**カスタムフックで Presenter を実装して、MVP パターンで**[**コンポーネント**](http://d.hatena.ne.jp/keyword/%A5%B3%A5%F3%A5%DD%A1%BC%A5%CD%A5%F3%A5%C8)**を整理した**ということもできそうです。このようにすることで、再利用性が高くテストしやすいコードになりました。また、MVP パターンに当てはめて考えられるようになったことで、カスタムフックの肥大化が設計の黄色信号である、ということも容易に理解できるようになりました。カスタムフックはあくまで「イベントを受けて状態を変化させる処理」に集中し、それ以外の[ドメイン](http://d.hatena.ne.jp/keyword/%A5%C9%A5%E1%A5%A4%A5%F3)ロジックを Model に蓄積していくと良いコードが書けそうです。

yigarashi[310日前](https://yigarashi.hatenablog.com/entry/react-custom-hook)

[20](https://b.hatena.ne.jp/entry/s/yigarashi.hatenablog.com/entry/react-custom-hook)

[1](https://b.hatena.ne.jp/entry/s/yigarashi.hatenablog.com/entry/react-custom-hook)

[**ツイート**](https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fyigarashi.hatenablog.com%2F&ref_src=twsrc%5Etfw&text=%E3%80%90React%E3%80%91%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%83%95%E3%83%83%E3%82%AF%E3%81%A7stateful%E3%81%AA%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%82%92%E6%95%B4%E7%90%86%E3%81%99%E3%82%8B%20-%20yigarashi%20%E3%81%AE%E3%83%96%E3%83%AD%E3%82%B0&tw_p=tweetbutton&url=https%3A%2F%2Fyigarashi.hatenablog.com%2Fentry%2Freact-custom-hook)

                  [**WiMAX 2+**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=qw5CcP4o-6J8_x2AzFoqT_Sik4vOJ60RLEJNKx98_qbVSiVUZStDxP0g6cJsq02vNoME5FoErToCw_Jt9_c6BbVtEUKc-a64zzn4a9AfJcL3qVCQyVr1KhBrdCWE9E4MUJYWveg7jyk9huIthVpv-pnfd0pNSodBgUq9tWrJAtc3df1-M9VHrOZgBSdrcEZoqOhBFqg0pgZ4EtMW2-4gQqzKirAoUuHJhBdJyN4f_79XsZfI0_OUD5oP-rhzXSsCvqmTQtNKq6dRuScXKiObW4D2OLaeMUdL5ZoI8lwqY6Ap26SqGDV7eSfLC9XNw7sO5bU2w6-ah3XbM4NBsFSNhixmWJgqnLbG5YmP4UOM7nsKyYnE05y-2Girz7KIxGgU6U6mRtxRcwhBOkPlKiK7CtiCd8RBmfsdr6zIMMlD3d7irbH21citJhgOvch68iCLzHlqsEe1UwgWc_-Dg-n2BvkrfyHRa309cxdasXBqprKvtS8q&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[ギガ放題プランも月3,380円！1年間…](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=qw5CcP4o-6J8_x2AzFoqT_Sik4vOJ60RLEJNKx98_qbVSiVUZStDxP0g6cJsq02vNoME5FoErToCw_Jt9_c6BbVtEUKc-a64zzn4a9AfJcL3qVCQyVr1KhBrdCWE9E4MUJYWveg7jyk9huIthVpv-pnfd0pNSodBgUq9tWrJAtc3df1-M9VHrOZgBSdrcEZoqOhBFqg0pgZ4EtMW2-4gQqzKirAoUuHJhBdJyN4f_79XsZfI0_OUD5oP-rhzXSsCvqmTQtNKq6dRuScXKiObW4D2OLaeMUdL5ZoI8lwqY6Ap26SqGDV7eSfLC9XNw7sO5bU2w6-ah3XbM4NBsFSNhixmWJgqnLbG5YmP4UOM7nsKyYnE05y-2Girz7KIxGgU6U6mRtxRcwhBOkPlKiK7CtiCd8RBmfsdr6zIMMlD3d7irbH21citJhgOvch68iCLzHlqsEe1UwgWc_-Dg-n2BvkrfyHRa309cxdasXBqprKvtS8q&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)[**3,380円(税抜価格)**](https://cat.jp.as.criteo.com/delivery/ck.php?cppv=3&cpp=qw5CcP4o-6J8_x2AzFoqT_Sik4vOJ60RLEJNKx98_qbVSiVUZStDxP0g6cJsq02vNoME5FoErToCw_Jt9_c6BbVtEUKc-a64zzn4a9AfJcL3qVCQyVr1KhBrdCWE9E4MUJYWveg7jyk9huIthVpv-pnfd0pNSodBgUq9tWrJAtc3df1-M9VHrOZgBSdrcEZoqOhBFqg0pgZ4EtMW2-4gQqzKirAoUuHJhBdJyN4f_79XsZfI0_OUD5oP-rhzXSsCvqmTQtNKq6dRuScXKiObW4D2OLaeMUdL5ZoI8lwqY6Ap26SqGDV7eSfLC9XNw7sO5bU2w6-ah3XbM4NBsFSNhixmWJgqnLbG5YmP4UOM7nsKyYnE05y-2Girz7KIxGgU6U6mRtxRcwhBOkPlKiK7CtiCd8RBmfsdr6zIMMlD3d7irbH21citJhgOvch68iCLzHlqsEe1UwgWc_-Dg-n2BvkrfyHRa309cxdasXBqprKvtS8q&maxdest=https%3A%2F%2Fwww.so-net.ne.jp%2Faccess%2Fmobile%2Fwimax2%2Faf%2F%3FSmRcid%3Ddpl_dsp_crto_rt_all_WX2P%26argument%3DRQq2zPub%26dmai%3D03WX2_crto_rt_b)  
  
  
  


      
        [広告を非表示にする](http://blog.hatena.ne.jp/guide/pro)
      
    
  
  


    
      

        

                  
        

      
    
    
  
    
    
      
    
    
      コメントを書く
    
  

      
      
    
  

  
  
  
  
  
  
  
    
      
      
        [« 
          見積もりの基礎知識と「ストーリーポイン…
        ](https://yigarashi.hatenablog.com/entry/planninng-basic)
      
    
    
      
      
        [
          Apollo ClientのInMemoryCacheとMutation…
           »
        ](https://yigarashi.hatenablog.com/entry/apollo-client-cache-mutation)
      
    
  


  



        

    

  
  
    
      


    プロフィール
  
    
    
    

    
    [**yigarashi**](https://yigarashi.hatenablog.com/about)**
      
  
    
    
  


    **
    

    

    

    
      [**
    
    
      読者になる
      
    
  **](https://yigarashi.hatenablog.com/entry/react-custom-hook#)<u>24
  </u><u>.</u><u>

    

    
  </u><u>

    
      </u><u>
    検索
  </u><u>
  
  
</u><u>

    
      </u><u>
    リンク
  </u><u>
      
        </u><u>
• </u>[<u>はてなブログ</u>](https://hatenablog.com/)<u>
      
        </u><u>
• </u>[<u>ブログをはじめる</u>](https://hatenablog.com/guide?via=200109)<u>
      
        </u><u>
• </u>[<u>週刊はてなブログ</u>](http://blog.hatenablog.com/)<u>
      
        </u><u>
• </u>[<u>はてなブログPro</u>](https://hatenablog.com/guide/pro)<u>
      
    </u><u>

    
      </u>[<u>
      最新記事
    </u>](https://yigarashi.hatenablog.com/archive)<u>
  
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>『正しいものを正しくつくる』を読んだ</u>](https://yigarashi.hatenablog.com/entry/2020/08/09/132450)<u>


          
          

                </u><u>
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>GraphQL API を悪意あるクエリから守る手法</u>](https://yigarashi.hatenablog.com/entry/graphql-query-analysis)<u>


          
          

                </u><u>
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>エンジニア8人チームで"効果的に"タスクをアサインするために検討した8つの軸</u>](https://yigarashi.hatenablog.com/entry/eight-points-to-assgin-tasks)<u>


          
          

                </u><u>
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>見積もりの基礎知識と「ストーリーポイント vs 理想日」の考察</u>](https://yigarashi.hatenablog.com/entry/planninng-basic)<u>


          
          

                </u><u>
  
    
    </u><u>
• </u><u>
        
          
          </u>[<u>【React】カスタムフックでstatefulなコンポーネントを整理する</u>](https://yigarashi.hatenablog.com/entry/react-custom-hook)<u>


          
          

                </u><u>
  
</u><u>

    
      

</u>[<u>月別アーカイブ</u>](https://yigarashi.hatenablog.com/archive)<u>
  

  
    
    
      </u><u>
        
          </u><u>
• </u><u>▼
              
            
            </u>[<u>
              2020 (5)
            </u>](https://yigarashi.hatenablog.com/archive/2020)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2020 / 8 (1)
                  </u>](https://yigarashi.hatenablog.com/archive/2020/8)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2020 / 5 (1)
                  </u>](https://yigarashi.hatenablog.com/archive/2020/5)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2020 / 4 (2)
                  </u>](https://yigarashi.hatenablog.com/archive/2020/4)<u>
              
                </u><u>
    ◦ </u>[<u>
                    2020 / 2 (1)
                  </u>](https://yigarashi.hatenablog.com/archive/2020/2)<u>
              
            </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2019 (1)
            </u>](https://yigarashi.hatenablog.com/archive/2019)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2018 (1)
            </u>](https://yigarashi.hatenablog.com/archive/2018)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2017 (1)
            </u>](https://yigarashi.hatenablog.com/archive/2017)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2015 (2)
            </u>](https://yigarashi.hatenablog.com/archive/2015)<u>
            
          </u><u>
        
          </u><u>
• </u><u>
              
              ▶
            
            </u>[<u>
              2014 (1)
            </u>](https://yigarashi.hatenablog.com/archive/2014)<u>
            
          </u><u>
        
      </u>