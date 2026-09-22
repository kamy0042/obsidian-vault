---
URL: https://buildersbox.corp-sansan.com/entry/2020/09/03/110000
Updated: 2021-01-01T14:31:00
Created: 2021-01-01T14:31:00
Tags: [topic/技術/React]
---
[**Sansan Builders Blog**](https://buildersbox.corp-sansan.com/)**
      
        ****
****Sansanのものづくりを支えるメンバーの技術やデザイン、プロダクトマネジメントの情報を発信****
      
    ****

        

        
        





          


          
  
  
  
  
  
  

  

  
    
      
        
  
    ******[**2020-09-03
      
    **](https://buildersbox.corp-sansan.com/archive/2020/09/03)**
**[**新規事業開発での技術選定の意思と意図 (フロントエンド編)**](https://buildersbox.corp-sansan.com/entry/2020/09/03/110000)**

  
  

  ****
    
    **[**新規事業**](https://buildersbox.corp-sansan.com/archive/category/%E6%96%B0%E8%A6%8F%E4%BA%8B%E6%A5%AD)**
    
    **[**開発**](https://buildersbox.corp-sansan.com/archive/category/%E9%96%8B%E7%99%BA)**
    
    **[**フロントエンド**](https://buildersbox.corp-sansan.com/archive/category/%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89)**
    
  ****


  

  



    


    
  
    ****
****こんにちは、関西支店で新規事業開発室に所属するソフトウェアエンジニアの加藤です。**[**Bill One**](https://bill-one.com/)**という新規サービスの開発に携わっています。****
**[**バックエンド編**](https://buildersbox.corp-sansan.com/entry/2020/08/21/110000)**の続きとして、フロントエンドで私たちが使用している技術やライブラリを振り返って、どんな意志と意図があるかを確認していきます。****
****Bill Oneは今年の1月ごろにピボットし、それまで開発してきたフロントエンドを全て捨て、1から作り直しました。ピボットの際に改めて技術選定を行い、それまで使っていたライブラリ等を見直したので、本稿ではピボット前後で変化した箇所を中心にフロントエンドの技術選定を紹介します。****
****前提****
****改めて前提です。私たちのチームで開発しているBill Oneは今年の5月にローンチしたばかりのサービスで、チームのエンジニアは5名です。開発しているアプリケーションはSingle Page Application (SPA) で、エンジニア全員がフロントエンドもバックエンドも両方担当します。****
****本稿での技術選定は私たちのチームのものであり、他の部署や隣のチームでは異なる選択が行われています。****
****主要な技術選定****
****まずは、主要な技術選定です。見出しは **`**カテゴリ: ピボット前 → ピボット後**`** という形式です。変化がないものはその旨を記載しています。****
****言語: TypeScript（変化なし）****
****言語はピボット前後で変わることなく**[**TypeScript**](https://www.typescriptlang.org/)**を使っています。静的な型チェックのおかげで、実行時エラーが少なくなり、躊躇することなくリファクタリングできています。現時点では、TypeScriptを使える場面で使わない理由はほとんどないと思っています。****
****ピボット前は途中からの導入だったので型を付けていくのにやや苦労しましたが、ピボット後は **`**"strict": true**`** で問題なく開発できています。****
****JavaScriptフレームワーク: React（変化なし）****
****JavaScriptフレームワークもピボット前後で変わることなく**[**React**](https://ja.reactjs.org/)**を使っています。選択肢としてはVue.jsやAngularもありますが、 次の点でReactはシンプルで良いと考えています。****
• ****独自のテンプレート言語を学ばなくても、（JSXさえ学べば）全てをTypeScriptで書け、テンプレートまで型チェックが効く****
• ****複雑さをもたらす双方向バインディングがなく、Stateの変更→DOMへの反映という1方向の流れに統一されている****
****特にReact Hooksが導入されてからは、ほぼ全てのコンポーネントを関数コンポーネントで書けるようになりました。関数コンポーネントではrenderに集中できることに加え、HooksによってStateを意味のある単位で分割できたり、Propsが変化したときの副作用を一貫性のある形で書けたりと、わかりやすくなりました。****
****Reactのビルド周り: Next.js → Create React App****
****ピボット前はReactのビルドに**[**Next.js**](https://nextjs.org/)**を使っていましたが、ピボットのタイミングで**[**Create React App**](https://create-react-app.dev/)**を使うよう変更しました。私たちが開発しているアプリケーションはログインしていることが前提のSaaSで、Static Site Generation (SSG) やServer Side Rendering (SSR) のメリットをさほど享受できないためです。むしろSSR周りでエラーが発生して対処が必要になったこともあり、 Client Side Renderingに集中してシンプルに保つ方が良いと判断しました。****
****Next.jsをやめたことで、ルーティングやCSS in JSのライブラリなどを個別に選定する必要がありますが、使わない機能を強みとするツールに依存し続けるのはリスクが高いので、やむを得ないと考えています。ピボット後は、ルーティングでは**[**React Router**](https://reactrouter.com/)**を、CSS in JSでは**[**React JSS**](https://cssinjs.org/react-jss/)**を使っています。****
****自分たちでwebpackなどの設定を保守していくのは大変なので、Create React Appはejectせずに使っています。若干制約を感じるところはありますが、ある程度のカスタマイズはできるので、特に困ることなく開発できています。****
****Reactの状態管理: Redux → コンポーネントごとのState + Context****
****ピボット前はアプリケーション全体での状態管理に**[**Redux**](https://redux.js.org/)**を使っていましたが、機能を追加するたびにあまり本質的でないActionやReducerを書き足すのが辛く感じていました。バックエンドのAPI呼び出しの非同期処理もミドルウェアを使って複雑になるわりに、本当に必要な複雑さなのか疑問に感じていました。****
****そこで、ピボットを機会にReduxを一旦やめてみたところ、特に困ることなく開発できています。現在はコンポーネントごとにStateを持ち、必要に応じてPropsでバケツリレーしています。ログインしたユーザーの情報など、一部のコンポーネントをまたいで共通のStateはContextを使って受け渡しています。API呼び出しもコンポーネントからAPIクライアントを使って行い、一部では**[**react-use**](https://github.com/streamich/react-use)**のuseAsyncを使って記述を簡素化しています。****
****結局私たちは、Reduxをクライアントサイドにおけるサーバーサイドのキャッシュとしてのみ使っていたのだと理解しています。クライアントにおけるキャッシュとして**[**React Query**](https://github.com/tannerlinsley/react-query)**は気になっていますが、まだ手を出せていません。****
****さらに、ピボット前はReduxで管理するStateにImmutable.jsを使っていましたが、これもピボット時にやめました。コンポーネントローカルのStateはImmutable.jsではないJavaScriptのオブジェクトを使うことが多く、Immutable.jsとJavaScriptのオブジェクトが混在してわかりづらくなっていたためです。またJavaScriptのオブジェクトとスプレッド演算子を使った方が簡潔に書けるので、それで十分だと判断しました。****
****UIライブラリ: Material UI → Semantic UI React****
****UIライブラリは、**[**Material UI**](https://material-ui.com/)**から**[**Semantic UI React**](https://react.semantic-ui.com/)**に変更しました。ピボットの少し前からデザイナーにデザインしてもらうようになったものの、社内での統一されたデザインとマテリアルデザインとの差異が大きく、マテリアルデザインを採用しないのにMaterial UIを使い続けるのはメリットを享受しづらいと判断したためです。テーマでのカスタマイズも検討しましたが、特に主要コンポーネントであるTextFieldは差異が大きく、これをカスタムコンポーネントとして再実装するのは虚しく感じました。****
****そこで、あまり主張が強くないデザインのUIライブラリを探してSemantic UI Reactを採用しました。Material UIと同様に豊富なコンポーネントが揃っています。****
****Semantic UI ReactはReact向けに書かれているものの、Reactコンポーネントとしての使い勝手はMaterial UIが勝ります。Semantic UI Reactは昔ながらのCSSでスタイルを適用するライブラリなので、スタイルを上書きしたい時に **`**!important**`** を多用する必要があります。グリッドシステムもあまり融通が効かず、結局CSSを書くこともしばしばあります。****
****ベストな選択だとは思っていないので、良さそうなUIライブラリは引き続きウォッチしていきたいです。****
****その他のライブラリ****
****最後に、これまでに紹介できていないその他のライブラリを紹介します。****
• **[**date-fns**](https://date-fns.org/)**: 日付・時刻周りの処理****
• **[**Formik**](https://formik.org/)**: 入力フォームの状態管理****
• **[**Linkify**](https://github.com/Soapbox/linkifyjs)**: URLのリンク化****
• **[**query-string**](https://github.com/sindresorhus/query-string)**: クエリ文字列の組み立て****
• **[**react-beautiful-dnd**](https://github.com/atlassian/react-beautiful-dnd)**: ドラッグ&ドロップによる並び替え操作****
• **[**react-copy-to-clipboard**](https://github.com/nkbt/react-copy-to-clipboard)**: クリップボードへのコピー****
• **[**react-cropper**](https://github.com/react-cropper/react-cropper)**: 画像の切り抜きを行うUI****
• **[**react-dropzone**](https://github.com/react-dropzone/react-dropzone)**: ドラッグ&ドロップによるファイルアップロード****
• **[**React Joyride**](https://github.com/gilbarbara/react-joyride)**: チュートリアルの実装****
• **[**React Toast Notifications**](https://github.com/jossmac/react-toast-notifications)**: トーストによる通知****
• **[**Yup**](https://github.com/jquense/yup)**: 入力フォームのバリデーション****
****ライブラリ選定時は、以下の観点で判断しています。****
• ****アクティブにメンテナンスされているか****
• ****必要十分な機能があってシンプルか****
• ****ある程度人気があるか****
****最後に****
****フロントエンドは変化が早いと言われますが、あまり振り回されすぎずに、意志と意図を持って判断していくことで、自分たちの事業成長に役立つ技術を選択していければと考えています。本稿が読者の皆さんの技術選定の参考になれば幸いです。****
****
**** 
        
        
        ****
**[**Sansan Builders Blog**](https://buildersbox.corp-sansan.com/)[**id:ktx33**](https://buildersbox.corp-sansan.com/)**
        
        
          
          
            ****
          
          ****
**[**B2BマルチテナントSaaSの認証にAuth0を使うときに知っておきたかったこと**](https://buildersbox.corp-sansan.com/entry/2020/04/22/110000)**
              こんにちは、新規事業開発室の加藤です。私たちのチームでは新規事業のプロダクトとしてB2BのマルチテナントSaaSを開発しており、その認証にAuth0を使っています。今回Auth0を初めて使用する中で試行錯誤することが多かったので、最初から知っておきたかったことをまとめておきます。 Auth0とは Auth0はIdentity as a Serv…
            ****
          
          **[**2020-04-22 11:00**](https://buildersbox.corp-sansan.com/entry/2020/04/22/110000)**
          
          ****

  

**[**buildersbox.corp-sansan.com**](https://buildersbox.corp-sansan.com/entry/2020/04/22/110000)** 
        
        
        ****
**[**Sansan Builders Blog**](https://buildersbox.corp-sansan.com/)[**id:kyabatalian**](https://buildersbox.corp-sansan.com/)**
        
        
          
          
            ****
          
          ****
**[**レガシーシステムとつきあう**](https://buildersbox.corp-sansan.com/entry/2019/10/23/110000)**
              Sansanプロダクト開発部・基盤チームの加畑です。 Sansanプロダクト開発部には、現在約120名のメンバーが所属しています。その中で、私が所属する基盤チームは6名のメンバーで構成されており、データアクセスや認証、メッセージング基盤、CI等開発環境やリリースプロセスなど、アプリケーションの基盤に関わるプロジェクト…
            ****
          
          **[**2019-10-23 11:00**](https://buildersbox.corp-sansan.com/entry/2019/10/23/110000)**
          
          ****

  

**[**buildersbox.corp-sansan.com**](https://buildersbox.corp-sansan.com/entry/2019/10/23/110000)**
****

    

  


    
  
    
    ****  ****
****ktx33**[**120日前**](https://buildersbox.corp-sansan.com/entry/2020/09/03/110000)**

    

    

  
  
     **[**203**](https://b.hatena.ne.jp/entry/s/buildersbox.corp-sansan.com/entry/2020/09/03/110000)[**
  
  
    **](https://b.hatena.ne.jp/entry/s/buildersbox.corp-sansan.com/entry/2020/09/03/110000)[** **](https://b.hatena.ne.jp/entry/s/buildersbox.corp-sansan.com/entry/2020/09/03/110000)[**11**](https://b.hatena.ne.jp/entry/s/buildersbox.corp-sansan.com/entry/2020/09/03/110000)[**
  
  
    **](https://b.hatena.ne.jp/entry/s/buildersbox.corp-sansan.com/entry/2020/09/03/110000)[** **](https://b.hatena.ne.jp/entry/s/buildersbox.corp-sansan.com/entry/2020/09/03/110000)[**ツイート**](https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fbuildersbox.corp-sansan.com%2F&ref_src=twsrc%5Etfw&text=%E6%96%B0%E8%A6%8F%E4%BA%8B%E6%A5%AD%E9%96%8B%E7%99%BA%E3%81%A7%E3%81%AE%E6%8A%80%E8%A1%93%E9%81%B8%E5%AE%9A%E3%81%AE%E6%84%8F%E6%80%9D%E3%81%A8%E6%84%8F%E5%9B%B3%20(%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E7%B7%A8)%20-%20Sansan%20Builders%20Blog&tw_p=tweetbutton&url=https%3A%2F%2Fbuildersbox.corp-sansan.com%2Fentry%2F2020%2F09%2F03%2F110000)**
  
  
  
  
****

    

    
      

        

          
      
  
  ****
    関連記事
  ****
  
  
    
    ****
• ****
        
                      **[**
      2020-10-20
    
  **](https://buildersbox.corp-sansan.com/archive/2020/10/20)[**新卒が思う趣味と仕事のプログラミングの違い**](https://buildersbox.corp-sansan.com/entry/2020/10/20/110000)**


          
          

                      ****新規事業開発室 新卒1年目の山邊です。新規事業開発室のエンジ…****.****
  
    
    ****
• ****
        
                      **[**
      2020-08-21
    
  **](https://buildersbox.corp-sansan.com/archive/2020/08/21)[**新規事業開発での技術選定の意思と意図 (バックエンド編)**](https://buildersbox.corp-sansan.com/entry/2020/08/21/110000)**


          
          

                      ****こんにちは、新規事業開発室に所属するソフトウェアエンジニア…****.****
  
    
    ****
• ****
        
                      **[**
      2020-04-22
    
  **](https://buildersbox.corp-sansan.com/archive/2020/04/22)[**B2BマルチテナントSaaSの認証にAuth0を使うときに知っておきたかったこと**](https://buildersbox.corp-sansan.com/entry/2020/04/22/110000)**


          
          

                      ****こんにちは、新規事業開発室の加藤です。私たちのチームでは新…****.****
  
    
    ****
• ****
        
                      **[**
      2020-03-09
    
  **](https://buildersbox.corp-sansan.com/archive/2020/03/09)[**レスポンス速度に向き合う**](https://buildersbox.corp-sansan.com/entry/2020/03/09/110000)**


          
          

                      ****こんにちは、Sansanの杉原です。BtoBサービスのSansanのブラウ…****.****
  
    
    ****
• ****
        
                      **[**
      2019-11-28
    
  **](https://buildersbox.corp-sansan.com/archive/2019/11/28)[**GitHub Universe レポ (Day1)**](https://buildersbox.corp-sansan.com/entry/2019/11/28/110000)**


          
          

                      ****こんにちは、SansanでEightのCEMとして開発組織のマネジメント…****.****
  
****
        

      
    
    
  
    
      ****コメントを書く****
    
    ****
      
    ****
    
  ****

      
      
    
  

  
  
  
  
  
  
  ****
    
      
      
        **[**« 
          勉強会「Econ Fiesta」を実施しました
        **](https://buildersbox.corp-sansan.com/entry/2020/09/04/110000)**
      
    
    
      
      
        **[**
          mablでのテスト自動化 ～実践編～
           »
        **](https://buildersbox.corp-sansan.com/entry/2020/09/02/110000)**
      
    
  .****


  



        ****

    

  
  
    
      
****

    
      
****

    
      
****

    
      

****
    購読
  ****
    

    

    

    

    
      **[**
    
    
      読者になる
      
    
  **](https://buildersbox.corp-sansan.com/entry/2020/09/03/110000#)<u>**188
  **</u><u>**.**</u><u>**

    

    
  **</u><u>**

    
      **</u><u>**
    Search
  **</u><u>**
  
  
**</u><u>**

    
      
**</u><u>**
    
      **</u>[<u>**人気記事**</u>](http://b.hatena.ne.jp/entrylist?url=https%3A%2F%2Fbuildersbox.corp-sansan.com%2F&sort=count)<u>**
    
  **</u><u>**
    
  **</u><u>**
  
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**DBMSをGoで実装してみた**</u>](https://buildersbox.corp-sansan.com/entry/2019/10/24/110000)<u>**


          
          

                **</u><u>**
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**ソースコードで理解するクリーンアーキテクチャ**</u>](https://buildersbox.corp-sansan.com/entry/2019/07/10/110000)<u>**


          
          

                **</u><u>**
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**Webアプリケーションにおける正しいキャッシュ戦略**</u>](https://buildersbox.corp-sansan.com/entry/2019/03/25/150000)<u>**


          
          

                **</u><u>**
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**Goで作るテキストエディタ**</u>](https://buildersbox.corp-sansan.com/entry/2020/07/29/113000)<u>**


          
          

                **</u><u>**
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**新規事業開発での技術選定の意思と意図 (フロントエンド編)**</u>](https://buildersbox.corp-sansan.com/entry/2020/09/03/110000)<u>**


          
          

                **</u><u>**
  
**</u><u>**

    
      **</u>[<u>**
      New
    **</u>](https://buildersbox.corp-sansan.com/archive)<u>**
  
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**Economics Meets Data Science: Finite Mixture Models - A Christmas Story**</u>](https://buildersbox.corp-sansan.com/entry/2020/12/25/110000)<u>**


          
          

                **</u><u>**
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**Sansan iOS アプリに XcodeGen を導入しました**</u>](https://buildersbox.corp-sansan.com/entry/2020/12/24/110000)<u>**


          
          

                **</u><u>**
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**チームのレビュー負荷を見える化するために簡易な Web アプリを作った話**</u>](https://buildersbox.corp-sansan.com/entry/2020/12/23/110000)<u>**


          
          

                **</u><u>**
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**オンボーディングと向き合う秋2020**</u>](https://buildersbox.corp-sansan.com/entry/2020/12/22/110000)<u>**


          
          

                **</u><u>**
  
    
    **</u><u>**
• **</u><u>**
        
          
          **</u>[<u>**Sansan iOSアプリにおけるiOS14対応**</u>](https://buildersbox.corp-sansan.com/entry/2020/12/21/110000)<u>**


          
          

                **</u><u>**
  
**</u><u>**

    
      

**</u><u>**
    カテゴリー
  **</u><u>**
      
        **</u><u>**
• **</u>[<u>**
            R&D (164)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/R%26D)<u>**
      
        **</u><u>**
• **</u>[<u>**
            レポート (138)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/%E3%83%AC%E3%83%9D%E3%83%BC%E3%83%88)<u>**
      
        **</u><u>**
• **</u>[<u>**
            連載 (126)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/%E9%80%A3%E8%BC%89)<u>**
      
        **</u><u>**
• **</u>[<u>**
            開発 (98)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/%E9%96%8B%E7%99%BA)<u>**
      
        **</u><u>**
• **</u>[<u>**
            Sansan (70)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/Sansan)<u>**
      
        **</u><u>**
• **</u>[<u>**
            DSOC (55)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/DSOC)<u>**
      
        **</u><u>**
• **</u>[<u>**
            Eight (48)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/Eight)<u>**
      
        **</u><u>**
• **</u>[<u>**
            社会科学 (42)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/%E7%A4%BE%E4%BC%9A%E7%A7%91%E5%AD%A6)<u>**
      
        **</u><u>**
• **</u>[<u>**
            チーム (30)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/%E3%83%81%E3%83%BC%E3%83%A0)<u>**
      
        **</u><u>**
• **</u>[<u>**
            海外出張 (24)
          **</u>](https://buildersbox.corp-sansan.com/archive/category/%E6%B5%B7%E5%A4%96%E5%87%BA%E5%BC%B5)<u>**
      
    **</u><u>**

    
      

**</u>[<u>**Archive**</u>](https://buildersbox.corp-sansan.com/archive)<u>**
  

  
    
    
      **</u><u>**
        
          **</u><u>**
• **</u><u>**▼
              
            
            **</u>[<u>**
              2020 (197)
            **</u>](https://buildersbox.corp-sansan.com/archive/2020)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 12 (21)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/12)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 11 (11)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/11)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 10 (14)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/10)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 9 (17)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/9)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 8 (16)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/8)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 7 (13)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/7)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 6 (17)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/6)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 5 (11)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/5)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 4 (19)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/4)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 3 (21)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/3)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 2 (18)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/2)<u>**
              
                **</u><u>**
    ◦ **</u>[<u>**
                    2020 / 1 (19)
                  **</u>](https://buildersbox.corp-sansan.com/archive/2020/1)<u>**
              
            **</u><u>**
        
          **</u><u>**
• **</u><u>**
              
              ▶
            
            **</u>[<u>**
              2019 (250)
            **</u>](https://buildersbox.corp-sansan.com/archive/2019)<u>**
            
          **</u><u>**
        
          **</u><u>**
• **</u><u>**
              
              ▶
            
            **</u>[<u>**
              2018 (58)
            **</u>](https://buildersbox.corp-sansan.com/archive/2018)<u>**
            
          **</u><u>**
        
      **</u><u>**
    
  




    
      **</u><u>**
    Link
  **</u><u>**
      
        **</u><u>**
• **</u>[<u>**Sansan株式会社**</u>](https://jp.corp-sansan.com/)<u>**
      
        **</u><u>**
• **</u>[<u>**Sansan**</u>](https://jp.sansan.com/)<u>**
      
        **</u><u>**
• **</u>[<u>**Eight**</u>](https://8card.net/)<u>**
      
        **</u><u>**
• **</u>[<u>**DSOC**</u>](https://sansan-dsoc.com/)<u>**
      
        **</u><u>**
• **</u>[<u>**Juice**</u>](https://jp.corp-sansan.com/juice/)<u>**
      
    **</u><u>**

    
    
  **</u><u>**.**</u><u>**




        

        
  **</u><u>**© Sansan, Inc.**</u>