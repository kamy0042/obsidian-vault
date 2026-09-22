---
タグ: []
作成日時: 2021-01-15T18:12:00
URL: http://pastelinc.hatenablog.com/entry/2018/09/23/155755
Tags: [topic/デザイン/情報設計]
---
## Modelは大切

皆さんは何を考えながら[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)してますか？まずはElm Architectureを見てみましょう。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/p/pastelInc/20180923/20180923134104.jpg)

Elm Architecture

ViewはModelに依存しUpdateもModelに依存しています。したがってModelの影響の大きさは言わずもがなです。

ちょっとしたModelの修正も影響範囲が多くて溜息をつくことは少なくありません。影響は少ないほうがいいですよね。

今回は[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)について考えてみましょう。

## UIから考える

今回はこの動画にある方法を使って[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)をやってみようと思います。

[youtu.be](https://youtu.be/x1FU3e0sT1I)

リチャードさんはまずはUIから考えようと言っています。インライン編集可能なブログ記事のページを考えてみましょう。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/p/pastelInc/20180923/20180923134111.jpg)

ブログ記事のページ

TitleとStoryという本文で構成されたブログ記事のページです。記事の作成者はインライン編集ができます。

ペンのアイコンをクリックすると右のページようなインライン編集状態になります。Saveボタンをクリックすると左のページのTitleが編集したものに置換されます。

みなさんもこのようなページを[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)してみてください。それでは次に私が[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)してみます。

```plain text
type Article
    = Article { title : Title, story : Story } Property


type Property
    = ReadOnly
    | WriteTitle Title


type alias Title =
    String


type alias Story =
    String


-- MODEL

type alias Model =
    { article : Article
    }
```

Titleのインライン編集に着目して[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)してみました。皆さんの[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)と見比べてどうでしたか？

それでは次の[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)と見比べてみましょう。

```plain text
type Property
    = ReadOnly
    | WriteTitle Title


type alias Title = String


type alias Story = String

-- MODEL

type alias Model =
    { title : Title -- READ/WRITE
    , story : Story -- READ/WRITE
    , property : Property -- READ/WRITE
    }
```

前者と後者は何が違うのでしょうか？後者はレコードの要素をいつでも操作することができます。

そのためPropertyがReadOnlyであってもtitleとstoryは変更できます。もちろんそのようにしないロジックを構築すれば防ぐことができます。

```plain text
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleEditTitle ->
            ( { model | property = WriteTitle model.title }, Cmd.none )

        SetTitle title ->
            case model.property of
                WriteTitle _ ->
                    ( { model | property = WriteTitle title }, Cmd.none )

                ReadOnly ->
                    ( model, Cmd.none )

        SaveTitle ->
            case model.property of
                WriteTitle title ->
                    ( { model | title = title, property = ReadOnly }, Cmd.none )

                ReadOnly ->
                    ( model, Cmd.none )
```

それでは前者の場合はどうでしょう。

```plain text
module Article exposing (Article, empty, mapTitle, toggleTitle)


type Article
    = Article { title : Title, story : Story } Property


type Property
    = ReadOnly
    | WriteTitle Title


type alias Title =
    String


type alias Story =
    String


empty : Article
empty =
    Article { title = "", story = "" } ReadOnly


toggleTitle : Article -> Article
toggleTitle (Article edits property) =
    case property of
        ReadOnly ->
            WriteTitle edits.title
                |> Article edits

        WriteTitle title ->
            ReadOnly
                |> Article { edits | title = title }


mapTitle : (Title -> Title) -> Article -> Article
mapTitle modifier ((Article edits property) as article) =
    case property of
        ReadOnly ->
            article

        WriteTitle title ->
            WriteTitle (modifier title)
                |> Article edits
```

```plain text
module Page.Article exposing (..)

import Article exposing (Article)


-- MODEL

type alias Model =
    { article : Article
    }

-- UPDATE

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleEditTitle ->
            ( { model | article = Article.toggleTitle model.article }, Cmd.none )

        SetTitle title ->
            ( { model | article = Article.mapTitle (always title) model.article }, Cmd.none )

        SaveTitle ->
            ( { model | article = Article.toggleTitle model.article }, Cmd.none )
```

いかがでしょうか。モジュールを２つに分けてみました。

これならArticleはReadOnlyのときにtitleを変更できません。なぜならそのような関数がArticleモジュールから公開されてないからです。

また前述のパターンと異なり、WriteTitleコンスト[ラク](http://d.hatena.ne.jp/keyword/%A5%E9%A5%AF)タも公開していません。このためArticleモジュール内部にArticleの実態は隠蔽されています。

この方法をOpaque Typeと呼びます。テクニックの一つですが動画では必須とまで言われています。

これで、Articleモジュールを編集してもUpdateやViewに影響が出ないように作ることができました。ネストが浅くなり多少見やすくなってないでしょうか。

また、title編集時の状態を `WriteTitle Title` と定義しているのもポイントです。

```plain text
type alias Model =
    { title : Title
    , story : Story
    , editableTitle : Maybe Title
    , editableStory : Maybe Story
    }
```

少し定義を変えてみました。それではこの状態はとり得るのでしょうか。

```plain text
type alias Model =
    { title : Title
    , story : Story
    , editableTitle : Just Title
    , editableStory : Just Story
    }
```

インラインで編集可能なのは一箇所だけとします。するとeditableTitleとeditableStoryの両方がこのような状態を取ることはありえません。

このようなアプリケーションにありえない状態を作り出すことが可能な[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)を避けることでバグの少ないアプリケーションを構築できます。不可能な状態は[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)で防ぐことができます。

[youtu.be](https://youtu.be/IcgmSRJHu_8)

## サマリ

- UIから考えることで[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)ができる
- Oppaque Typeで変更に強いモデルを作ることができる
- 不可能な状態 (Impossible state) を排除することができる

## 所感

またもや動画から[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)の方法の一部を紹介しました。Elmでアプリケーション開発をしているとモデルを変更する機会は多々訪れます。

そのたびにModel, Update, Viewのすべてを変更するのはとても大変です。今回の方法を用いてなるだけ変更の影響がもれないように気をつけてみてください。

しかし、[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)のポイントはこれだけではありません。UI StateとDomainをどのように[モデリング](http://d.hatena.ne.jp/keyword/%A5%E2%A5%C7%A5%EA%A5%F3%A5%B0)するのかという話題もあります。

フロントエンドでDDDをしようものならもっと複雑になることでしょう。一概にこれが正解というわけではないので皆さんの課題に沿った最善の方法を模索していきましょう。

そしてどんどん私に教えてください。 (違