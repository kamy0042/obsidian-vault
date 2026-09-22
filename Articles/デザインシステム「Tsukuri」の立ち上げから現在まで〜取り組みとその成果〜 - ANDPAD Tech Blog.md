---
タグ: []
作成日時: 2023-12-13T02:30:00
URL: https://tech.andpad.co.jp/entry/2023/12/06/100000
Tags: [topic/デザインシステム/導入事例]
---
アンドパッドでプロダクトデザイナーをしている [@sizucca](https://twitter.com/sizucca_) です。

以前、デザインシステムの専任エンジニアが、[ANDPAD のデザインシステム「Tsukuri」に関する技術的な記事を連載形式で執筆しました](https://tech.andpad.co.jp/entry/2023/03/02/100000)が、今回はデザイナーの視点から、デザインシステムの立ち上げから現在に至るまでの取り組みと、その成果を振り返りたいと思います。

※現時点（2023年12月）において、デザインシステム「Tsukuri」は、自社で開発・運営しているSaaSプロダクトである「ANDPAD」を主な対象範囲としています。

- [デザインシステム立ち上げの背景](https://tech.andpad.co.jp/entry/2023/12/06/100000#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E7%AB%8B%E3%81%A1%E4%B8%8A%E3%81%92%E3%81%AE%E8%83%8C%E6%99%AF)
    - [1. 言語化されたルールやガイドラインの不足](https://tech.andpad.co.jp/entry/2023/12/06/100000#1-%E8%A8%80%E8%AA%9E%E5%8C%96%E3%81%95%E3%82%8C%E3%81%9F%E3%83%AB%E3%83%BC%E3%83%AB%E3%82%84%E3%82%AC%E3%82%A4%E3%83%89%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%AE%E4%B8%8D%E8%B6%B3)
    - [2. 独自ルールやコンポーネントが複数存在](https://tech.andpad.co.jp/entry/2023/12/06/100000#2-%E7%8B%AC%E8%87%AA%E3%83%AB%E3%83%BC%E3%83%AB%E3%82%84%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%8C%E8%A4%87%E6%95%B0%E5%AD%98%E5%9C%A8)
    - [3. プロダクトの増加スピードの速さ](https://tech.andpad.co.jp/entry/2023/12/06/100000#3-%E3%83%97%E3%83%AD%E3%83%80%E3%82%AF%E3%83%88%E3%81%AE%E5%A2%97%E5%8A%A0%E3%82%B9%E3%83%94%E3%83%BC%E3%83%89%E3%81%AE%E9%80%9F%E3%81%95)
- [取り組みのプロセスとその内容](https://tech.andpad.co.jp/entry/2023/12/06/100000#%E5%8F%96%E3%82%8A%E7%B5%84%E3%81%BF%E3%81%AE%E3%83%97%E3%83%AD%E3%82%BB%E3%82%B9%E3%81%A8%E3%81%9D%E3%81%AE%E5%86%85%E5%AE%B9)
    - [1. 基盤づくり](https://tech.andpad.co.jp/entry/2023/12/06/100000#1-%E5%9F%BA%E7%9B%A4%E3%81%A5%E3%81%8F%E3%82%8A)
    - [2. 具体的なアウトプットづくり](https://tech.andpad.co.jp/entry/2023/12/06/100000#2-%E5%85%B7%E4%BD%93%E7%9A%84%E3%81%AA%E3%82%A2%E3%82%A6%E3%83%88%E3%83%97%E3%83%83%E3%83%88%E3%81%A5%E3%81%8F%E3%82%8A)
    - [3. デザインデータのシステム化](https://tech.andpad.co.jp/entry/2023/12/06/100000#3-%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E5%8C%96)
    - [4. デザイナーによるデザインシステムの民主化](https://tech.andpad.co.jp/entry/2023/12/06/100000#4-%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E3%81%AB%E3%82%88%E3%82%8B%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E6%B0%91%E4%B8%BB%E5%8C%96)
    - [5. 全社総会で共有](https://tech.andpad.co.jp/entry/2023/12/06/100000#5-%E5%85%A8%E7%A4%BE%E7%B7%8F%E4%BC%9A%E3%81%A7%E5%85%B1%E6%9C%89)
- [取り組みの成果](https://tech.andpad.co.jp/entry/2023/12/06/100000#%E5%8F%96%E3%82%8A%E7%B5%84%E3%81%BF%E3%81%AE%E6%88%90%E6%9E%9C)
    - [1. プロダクトの生産性と品質向上に貢献](https://tech.andpad.co.jp/entry/2023/12/06/100000#1-%E3%83%97%E3%83%AD%E3%83%80%E3%82%AF%E3%83%88%E3%81%AE%E7%94%9F%E7%94%A3%E6%80%A7%E3%81%A8%E5%93%81%E8%B3%AA%E5%90%91%E4%B8%8A%E3%81%AB%E8%B2%A2%E7%8C%AE)
    - [2. デザイナーのスキル向上に寄与](https://tech.andpad.co.jp/entry/2023/12/06/100000#2-%E3%83%87%E3%82%B6%E3%82%A4%E3%83%8A%E3%83%BC%E3%81%AE%E3%82%B9%E3%82%AD%E3%83%AB%E5%90%91%E4%B8%8A%E3%81%AB%E5%AF%84%E4%B8%8E)
    - [3. デザインシステム自体が評価対象に](https://tech.andpad.co.jp/entry/2023/12/06/100000#3-%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E8%87%AA%E4%BD%93%E3%81%8C%E8%A9%95%E4%BE%A1%E5%AF%BE%E8%B1%A1%E3%81%AB)
- [さいごに](https://tech.andpad.co.jp/entry/2023/12/06/100000#%E3%81%95%E3%81%84%E3%81%94%E3%81%AB)

### デザインシステム立ち上げの背景

私がアンドパッドに入社したのは2年半ほど前になりますが、その時点ですでにエンジニアとデザイナーの双方で「デザインシステムを構築しよう！」という動きがありました。しかし、当時はまだ実際の成果物を生み出すには至っていない状況でした。

私自身はデザインシステムの構築経験はなかったものの、大規模サービスでFLOCSSに基づくCSS設計やコンポーネントライブラリ、スタイルガイドの構築経験があり、デザインシステムの有用性を感じてはいました。入社当初はドメイン理解や担当プロダクトの業務に手いっぱいで、デザインシステムにまで手が回りませんでしたが、会社やプロダクトへの理解が深まるにつれ、以下のような問題を実感するようになりました。

### 1. 言語化されたルールやガイドラインの不足

最初に担当したプロダクトでは、具体的なルールや言語化されたガイドラインが非常に少なかったため、既存のUIやデザインパターンからルールを読み解く必要があり、些細なUIの改修にも時間がかかっていました。

### 2. 独自ルールやコンポーネントが複数存在

アンドパッドは、建築・建設業界全体の課題解決を目指し、さまざまなプロダクトを展開しています。どのプロダクトも、ブランドとしては同じ「ANDPAD」であり、いくつかのプロダクトを併用されているユーザー様もいらっしゃるため、プロダクト間で一貫性のある体験や統一感が求められる場面もあります。

しかし、多くのプロダクトで「言語化されたルールやガイドラインの不足」が生じていたため、一貫性を保とうとしても、基準とすべきプロダクトやその根拠が曖昧でした。そのため、似たような機能や要素であっても、プロダクトごとに新しいルールやコンポーネントが追加されていました。

### 3. プロダクトの増加スピードの速さ

また、新規プロダクトが生まれるスピードも速いため、上記の問題を抱えたままでは、新しいプロダクトが増えるたびに開発コストやメンテナンスコストが雪だるま式に増加し、結果として、ユーザーや業界の本質的な課題解決に充てる時間がどんどん圧迫されてしまうと感じました。

これらの問題を解消し、本質的なデザインにもっと時間をかけられるようになりたい、という思いから、本格的にデザインシステムの構築に取り組み始めました。

### 取り組みのプロセスとその内容

### 1. 基盤づくり

まずは、デザインシステムのゴールイメージを明確にし、その実現に向けた基盤づくりを行いました。

すでに数名の有志メンバーがデザインシステムの構築に取り組み始めており、いくつかFigmaによるコンポーネントが存在している状態でしたが、配色などのルールが個々の感覚に基づくものが多く、拡張が難しい状況でした。また、「デザインシステム」に対するイメージや理解度にもバラつきがあるように感じました。

この問題を解消するため、デザインシステムに関わるメンバー同士の認識のすり合わせや、必要要件の言語化を行いました。

![[20231205084725.png]]

デザインシステム「Tsukuri」の最小必須要件

また、拡張しやすいデザインシステム基盤を構築するために、「ANDPADらしい」認知パターンを、ロジカルな設計に基づいたデザイントークンとして再定義しました。

![[20231205084832.png]]

再定義したデザイントークン（イメージ図）

基盤づくりのフェーズは、分かりやすいアウトプットが見えにくいフェーズでもあったため、チームが停滞しているように映ることもあったかもしれませんが、重要なプロセスであると認識していたので、着実に取り組みました。

### 2. 具体的なアウトプットづくり

デザイントークンがある程度形になってきたところで、その検証も兼ねながら、具体的なコンポーネントやドキュメントの作成に着手しました。

初期段階では、「ANDPADとして使いやすい汎用的なコンポーネント」の抽象度や相対的なバランスがなかなか掴めず、何度か作り直しを行いました。最初は、リリース後の修正コストを懸念し、なかなか「完成」に辿り着けませんでしたが、途中から「最初から完璧なものを作るのは難しく、ある程度はリリース後の修正を前提に進めるべき」と考え方を切り替えました。

特に、デザインシステムの設計に不慣れな段階では、まずは作成の経験を積むことが重要であり、初期段階での手戻りは仕方のないこととして割り切るようになりました。

![[20231205085241.png]]

コンポーネント作成のフロー（イメージ図）

![[20231205085406.png]]

作成したコンポーネント（一部のイメージ）

### 3. デザインデータのシステム化

デザイントークンの整備やFigmaによるコンポーネント作成が進むにつれ、プロトタイプ作成などのデザイン作業の効率化を実感するようになりました。しかし、システムとの連携が不十分だったので、エンジニアの作業効率はあまり改善されないままでした。

この悩みを見越してか、開発部からデザインシステム専任のエンジニアがアサインされたことで、システム化が一気に進展しました。

デザインデータとシステムの連携はもちろん、Figmaで作成していたデザインガイドラインやドキュメントなども、Storybookに移行することで参照しやすくなりました。

![[20231205085448.png]]

デザインガイドライン（Storybook）

システム化が進むと、プロダクトでの試用やエンジニアからのフィードバックも増え、Tsukuriを導入するプロダクトも増えていきました。

※エンジニアの取り組みについて詳しく知りたい方は、以下を参照してください。

[tech.andpad.co.jp](https://tech.andpad.co.jp/entry/2023/03/02/100000)

### 4. デザイナーによるデザインシステムの民主化

デザインシステムの基盤づくりからシステム化の初期フェーズまでは、一部のデザイナーが主導する形でガイドラインの策定やコンポーネントの作成を進めてきました。システム化が少し軌道に乗り始めた頃、デザイナー全員がデザインシステムの作成に参加できる体制への移行を考え始めました。

とはいえ、得意領域の違いや担当プロダクトの仕事もある中、デザイナー全員が汎用性を考慮したコンポーネントを作成したり、ガイドラインを書くのは難しいのでは？という懸念もありました。

特に、デザイナーがGitHubを利用してStorybookを更新することは心理的にもハードルが高く、定着しないのではないかと思っていました。しかし、勉強会を開催したり、ハンズオンのサポート体制を整えたことで、すべてのデザイナーがドキュメントを更新できるようになりました。

最近では、他のデザイナーが作成したガイドラインやコンポーネントも増え、民主的で透明性のある運用体制が構築されつつあるのではないかと考えています。

![[20231205085527.png]]

デザイナー全員のデザインシステムに関するタスクは、GitHub上で管理

### 5. 全社総会で共有

プロダクトへの導入やデザイナーによるデザインシステムの民主化が進む一方で、デザインシステムが「守るべき法律」や「絶対的なルール」のように誤解されることも増えてきたように感じました。

そこで、改めてデザインシステムの目的や役割を明確にし、プロダクト向けの全社総会で共有しました。

![[20231205085619.png]]

総会の様子

![[20231205153142.png]]

Tsukuriの目的

![[20231205085707.png]]

Tsukuriの役割

![[20231205085722.png]]

Tsukuriによるメリット

![[20231205085735.png]]

Tsukuriに関する注意点

### 取り組みの成果

### 1. プロダクトの生産性と品質向上に貢献

最近、新規プロダクトに携わることが増えたこともあり、プロトタイプの作成から実装まで、積極的にデザインシステムを活用しています。これにより、デザインシステムが時間とリソースを節約し、プロダクトの基本的な品質向上に貢献していることを実感しています。「本当に作ってよかった！！」と思うほど、単純な作業に時間と労力を費やす必要がなくなりました。

少し余談ですが、開発メンバーではないビジネスメンバーから、「新しいこの機能（ページ）が使いやすくて好きなんです」「改修後の画面がカッコよくなった」と言われたときは、いちデザイナーとして単純に嬉しかったです。

### 2. デザイナーのスキル向上に寄与

デザインシステムは、デザイナーのスキル向上にも役立っていると感じています。デザインシステムを通して、横断的な情報設計や体験設計を考えることで、単なる制作スキルだけでなく、プロダクトや情報構造に対する幅広い理解が得ることができました。

プロダクトの情報構造を理解し、パターンとしてどう抽象化すべきかを考える過程で、事業やドメインに対する理解も深まりました。

### 3. デザインシステム自体が評価対象に

デザインシステムのプロジェクトが評価され、開発チームで半年に一度行われるアワードでチーム賞をいただきました。

通常のプロダクト開発とは異なり、「デザインシステム」自体はその効果が直接的でないことがあります。しかし、このプロジェクトがもたらす「横断的な開発」や「効果の複利」が会社によって認められ、スポットを当てていただけたことは非常に嬉しい出来事でした。

### さいごに

約2年間に渡る取り組みとその成果を振り返りました。

ANDPADのデザインシステムは、多くの方々の協力と、アンドパッドという会社がデザイナーやデザインに対してのリスペクトが大きいことに支えられて進んできました。

成果の出ない時期や停滞時においても、環境がサポートしてくれたことが、現在デザインシステムが活用にまで至る要因であると感じています。

とはいえ、ANDPADのデザインシステム「Tsukuri」にはまだまだ不足している点もあり、日々アップデートを行っている最中です。

さいごに、アンドパッドではデザインシステムはもちろん、一緒に建築・建設業界の課題をデザインで解決していく仲間を募集しています。

- デザインシステムのフレームワークが整った環境で、自身のグラフィック力を発揮したい方
- 運用フェーズのデザインシステムに関与し、実践的な経験を積んでみたい方
- デザインシステムの基盤が整ったチームで、積極的にプロダクト開発に携わりたい方

などなど。カジュアル面談も行っておりますので、興味を持っていただいた方のご応募をお待ちしています！

![[20231208142239.jpg]]

この記事は [ANDPAD Advent Calendar 2023](https://qiita.com/advent-calendar/2023/andpad) の 10日目の記事です。

どうもこんにちは。フロントエンドエンジニアの[蓮子](https://twitter.com/_rocket_pencil)です。今回は、Next.js におけるドラッグ & ドロップできるファイルアップローダーの作り方の紹介です。 使用するライブラリは [react-dropzone](https://react-dropzone.js.org/) です。「Next.js ファイルアップロード ドラッグアンドドロップ」とググると数多く紹介されていることから、利用者が多くメジャーなものな気がします。

とはいえ、いい感じのデモが見つかりづらかったので、自分で作って記事にしてみようと思いました。

### 今回作りたいもの

![[20231207130912.gif]]

ファイルアップローダー

今回のゴールのビジュアルはこちらです。よく見るUIですね。 それでは具体的な作り方を紹介していきます。

### 開発環境

- node 20.9.0
- Next.js 13.1.6
- react-dropzone 14.2.3

### 仕様

- 複数ファイル同時アップロード可
- 1ファイルのサイズ上限は50MB
- 拡張子は JPEG、PNG、PDF のみ許可
- 合計アップロード数の上限は10ファイル
- アップロードしたものが下にリストで表示されていく
- アップロード中のリストはスピナーを表示

### 実装の順序

順序立てて実装するとだいたい下記のようになると思います。

1. UIの静的実装
2. ファイルのドロップとバリデーション処理
3. ファイルのアップロードと進行状態の管理

### 1. UIの静的実装

```plain text
<div className={styles.wrapper}>
  <div>
    <div className={`${styles.file_upload} ${setDropZoneStyle()}`}>
      <p className={styles.file_name}>
        {isDragAccept
          ? "ファイルをアップロードします。"
          : isDragReject
            ? "エラー"
            : "ファイルを登録してください。"}
      </p>
      <p>
        {isDragReject
          ? "このファイル形式のアップロードは許可されていません。"
          : "ファイルを選択するか、ドラッグアンドドロップしてください。"}
      </p>
      <button disabled={isDragReject}>ファイルを選択</button>
    </div>
    <p className={styles.note}>
      複数のファイルを選択できます。pdf, png, jpg, jpeg
      ファイルを選択できます。
    </p>
    <p className={styles.caution}>※1ファイルの最大サイズは50MBです</p>
  </div>
  {currentShowFiles && (
    <aside>
      <ul className={styles.file}>
        {currentShowFiles.map((item, index) => (
          <li key={index} className={styles.file_list}>
            {item.isUploaded ? (
              <div className={styles.file_item}>
                <div className={styles.file_item_type}>
                  <span className={styles.icon_file}>
                    <File />
                  </span>
                </div>
                <div className={styles.file_item_body}>
                  <p className={styles.file_item_name}>{item.file.name}</p>
                </div>
                <button
                  type="button"
                  className={styles.file_item_trash}
                  onClick={() => {
                    removeFile(index);
                  }}
                >
                  <span className={styles.icon_trash}>
                    <Trash />
                  </span>
                </button>
              </div>
            ) : (
              <div className={styles.file_item}>
                <div className={styles.file_item_type}>
                  <Image
                    src="/../public/spinner.gif"
                    width={20}
                    height={20}
                    alt="loading"
                  />
                </div>
                <div className={styles.file_item_body}>
                  <p className={styles.file_item_name}>
                    {item.file.name}をアップロードしています…
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )}
</div>

```

大まかに、ファイルをドロップできるボックスと、アップロードしたファイルをリスト表示する領域に分けます。 ドロップボックスの方は、禁止されている拡張子をアップしようとした時のエラー表示を条件分岐で記載しておきます。 また、ドラッグ & ドロップ以外でもアップロードできるようにボタンも用意しておきます。 リストの方は、アップロード中の条件分岐を記載しておきます。

CSSは後述するCodeSandboxの方をご参照ください。

### 2. ファイルのドロップとバリデーション処理

```plain text
const onDrop = useCallback(
  async (acceptedFiles: File[]) => {
    // ドロップしたファイルの中で、現在表示されているファイルと重複しているもの( filename と size が同じファイル)を除外する。
    const filteringFiles = acceptedFiles.filter(
      (file) =>
        !currentShowFiles?.find(
          (showFile) =>
            file.name === showFile.file.name &&
            file.size === showFile.file.size,
        ),
    );

    // ドロップしたファイルと現在表示されているファイルの合計が 10 を超える場合、追加を許可しない。
    if (filteringFiles.length + currentShowFiles.length > 10) {
      alert("最大10ファイルまでアップロードできます。");
      return;
    }
  },
  [currentShowFiles],
);

const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
  rejectedFiles.forEach(({ file, errors }) => {
    errors.forEach(({ code }) => {
      let message = "エラーが発生しました。";
      switch (code) {
        case "file-too-large":
          message = `${file.name} のファイルサイズが大きすぎます。50MB以下のファイルをアップロードしてください。`;
          break;
        case "file-invalid-type":
          message = `${file.name} のファイル形式が許可されていません。許可されているファイル形式は jpg, png, pdf, doc, docx, xls, xlsx, ppt, pptx です。`;
          break;
        default:
          break;
      }
      alert(message);
    });
  });
}, []);

const { getRootProps, getInputProps, isDragAccept, isDragReject } =
  useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

```

まずは dropzone の設定をおこないます。

### getRootProps と getInputProps

getRootProps と getInputProps は、ドロップゾーンの HTML 要素に必要なプロパティを提供します。 getRootProps は、ドロップエリアのコンテナに適用されるプロパティを提供し、ドラッグアンドドロップのイベントハンドリングを担います。 戻り値は以下です。

```plain text
onBlur: ƒ (event)
onClick: ƒ (event)
onDragEnter: ƒ (event)
onDragLeave: ƒ (event)
onDragOver: ƒ (event)
onDrop: ƒ (event)
onFocus: ƒ (event)
onKeyDown: ƒ (event)
ref: {current: null}
tabIndex: 0

```

getInputProps は、ファイルを添付するための input 要素に適用されるプロパティを提供します。 戻り値は以下です。

```plain text
accept: undefined
autoComplete: "off"
multiple: true
onChange: ƒ (event)
onClick: ƒ (event)
ref: {current: null}
style: {display: "none"}
tabIndex: -1
type: "file"

```

それぞれHTMLに追記しておきましょう。

```plain text
<div className={styles.wrapper}>
  <div>
    <div
      {...getRootProps()}
      className={`${styles.file_upload} ${setDropZoneStyle()}`}
    >
      <input {...getInputProps()} />

```

### isDragAccept と isDragReject

これらは、ドロップエリア上にあるファイルが受け入れられるか、拒否されるかを示すブール値です。 isDragAccept は、ドラッグされているファイルが受け入れ可能な場合に true になります。 isDragReject は、ドラッグされているファイルが拒否されるべき場合（例えば、サポートされていないファイル形式やサイズの場合）に true になります。

### その他の設定オプション

onDrop は、ファイルがドロップされた時に実行される関数を指定します。 onDropRejected は、受け入れられなかったファイルに対する処理を定義します。 accept では、どのファイル形式を受け入れるかを指定します。ここでは JPEG、PNG、PDF ファイルを受け入れます。 maxSize では、受け入れるファイルの最大サイズを指定します。この例では、最大50MBのファイルまでを受け入れるように設定しています。

![[20231207175219.png]]

次に onDrop 内の処理を書きます。

### onDrop

**useCallback フックの使用**

useCallback はReactのフックの一つで、特定の依存関係（第二引数）が変更された場合にのみ関数を再生成することを保証します。 今回のケースでは、表示されているファイル（currentShowFiles）が変更された時のみ再生成するようにします。

**重複ファイルの除外**

ドロップされたファイル（acceptedFiles）から、既に表示されているファイルで名前およびサイズが一致するものを除外します。 これにより、ユーザーが誤って同じファイルを複数回ドロップすることを防ぎます。

**ファイル数の制限**

フィルタリングされたファイル（filteringFiles）と現在表示されているファイルの合計が10を超える場合、新たなファイルの追加を許可しないようにします。

次は onDropRejected 内の処理を書きます。

### onDropRejected

**エラー内容に応じて、ユーザーへフィードバックする**

onDropRejected は rejectedFiles という引数を受け取ります。これは、受け入れられなかったファイルのリストです。 各ファイルには、なぜ受け入れられなかったのかを示すエラー情報が関連付けられています。 それらを解析して、エラー内容を alert で表示し、ユーザーが理解できるようにします。

次はファイルをサーバーにアップロードする部分の説明です。

### 3. ファイルのアップロードと進行状態の管理

```plain text
const onUploadFile = async (file: File) => {
  try {
    setCurrentShowFiles((prevFiles) => [
      ...prevFiles,
      { file, isUploaded: false },
    ]);

    const uploadTime = Math.random() * 9000 + 1000; // 1秒から10秒
    await new Promise((resolve) => setTimeout(resolve, uploadTime));

    setCurrentShowFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.file.name === file.name ? { ...f, isUploaded: true } : f,
      ),
    );
  } catch (error) {
    // ↓ここでエラーに関するユーザーへの通知や処理を行う
    alert(`アップロード中にエラーが発生しました: ${error}`);
  }
};

```

### アップロードの開始

このコードはまず、filteringFiles に含まれるファイル（アップロード可能なファイル）が存在するかを確認します。ファイルが存在する場合、アップロードプロセスを開始します。 Promise.all を使用して、filteringFiles 配列内の各ファイルに対して onUploadFile 関数を並行して実行します。これにより、複数のファイルが同時に効率的にアップロードします。

onDrop 関数の最後に onUploadFile 関数の並行実行の処理を try catch で書きます。 アップロード中にエラーが発生した場合（例えば、ネットワークの問題やサーバー側のエラー）、catch ブロックが実行され、ユーザーに対してエラー通知をします。

```plain text
    // アップロード可能なファイルが存在する場合、アップロード中のスイッチを true にし、アップロードを開始する
    if (filteringFiles.length) {
      try {
        await Promise.all(filteringFiles.map((file) => onUploadFile(file)));
        // ↓すべてのファイルのアップロードが成功した後の処理を書く
      } catch (error) {
        // ↓ここでエラーに関するユーザーへの通知や処理を行う
        alert(`アップロード中にエラーが発生しました: ${error}`);
      }
    }
  },
  [currentShowFiles],
);

```

### アップロード状態の管理

onUploadFile 関数は、個々のファイルのアップロードを管理します。 関数はまず、アップロードするファイルを setCurrentShowFiles を使用して現在のファイルリストに追加します。この時点で、ファイルは「アップロードされていない（isUploaded: false）」とマークします。

### アップロードのシミュレーション

実際のAPIは使えないので、ファイルアップロードのシミュレーションとして、ランダムな時間（1秒から10秒）の遅延を設定しています。この遅延は、実際のネットワーク経由でのアップロードを模倣します。

### アップロード完了後の状態更新

アップロードが完了すると、再び setCurrentShowFiles を呼び出し、アップロードされたファイルの状態を「アップロード済み（isUploaded: true）」に更新します。

### エラーハンドリング

onUploadFile 関数内でも、アップロード中にエラーが発生した場合にユーザーに通知を行います。

### まとめ

完成したコードはこちらです。

```plain text
import type { NextPage } from "next";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import styles from "../styles/FileUploader.module.css";
import File from "public/file.svg";
import Trash from "public/trash.svg";
import Image from "next/image";

const FileUploader: NextPage = () => {
  const [currentShowFiles, setCurrentShowFiles] = useState<
    { file: File; isUploaded: boolean }[]
  >([]);

  const onUploadFile = async (file: File) => {
    try {
      setCurrentShowFiles((prevFiles) => [
        ...prevFiles,
        { file, isUploaded: false },
      ]);

      const uploadTime = Math.random() * 9000 + 1000; // 1秒から10秒
      await new Promise((resolve) => setTimeout(resolve, uploadTime));

      setCurrentShowFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file.name === file.name ? { ...f, isUploaded: true } : f,
        ),
      );
    } catch (error) {
      // ↓ここでエラーに関するユーザーへの通知や処理を行う
      alert(`アップロード中にエラーが発生しました: ${error}`);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // ドロップしたファイルの中で、現在表示されているファイルと重複しているもの( filename と size が同じファイル)を除外する。
      const filteringFiles = acceptedFiles.filter(
        (file) =>
          !currentShowFiles?.find(
            (showFile) =>
              file.name === showFile.file.name &&
              file.size === showFile.file.size,
          ),
      );

      // ドロップしたファイルと現在表示されているファイルの合計が 10 を超える場合、追加を許可しない。
      if (filteringFiles.length + currentShowFiles.length > 10) {
        alert("最大10ファイルまでアップロードできます。");
        return;
      }

      // アップロード可能なファイルが存在する場合、アップロード中のスイッチを true にし、アップロードを開始する
      if (filteringFiles.length) {
        try {
          await Promise.all(filteringFiles.map((file) => onUploadFile(file)));
          // ↓すべてのファイルのアップロードが成功した後の処理を書く
        } catch (error) {
          // ↓ここでエラーに関するユーザーへの通知や処理を行う
          alert(`アップロード中にエラーが発生しました: ${error}`);
        }
      }
    },
    [currentShowFiles],
  );

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach(({ code }) => {
        let message = "エラーが発生しました。";
        switch (code) {
          case "file-too-large":
            message = `${file.name} のファイルサイズが大きすぎます。50MB以下のファイルをアップロードしてください。`;
            break;
          case "file-invalid-type":
            message = `${file.name} のファイル形式が許可されていません。許可されているファイル形式は jpg, png, pdf, doc, docx, xls, xlsx, ppt, pptx です。`;
            break;
          default:
            break;
        }
        alert(message);
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      onDropRejected,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "application/pdf": [],
      },
      maxSize: 50 * 1024 * 1024, // 50MB
    });

  // ドラッグ中のスタイルを設定
  const setDropZoneStyle = () => {
    if (isDragAccept) {
      return styles.is_drag_accept;
    } else if (isDragReject) {
      return styles.is_drag_reject;
    } else {
      return "";
    }
  };

  const removeFile = (index: number) => {
    const filteringFiles = currentShowFiles.filter(
      (_, i) => i !== index,
    );
    setCurrentShowFiles(filteringFiles);
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <div
          {...getRootProps()}
          className={`${styles.file_upload} ${setDropZoneStyle()}`}
        >
          <input {...getInputProps()} />
          <p className={styles.file_name}>
            {isDragAccept
              ? "ファイルをアップロードします。"
              : isDragReject
                ? "エラー"
                : "ファイルを登録してください。"}
          </p>
          <p>
            {isDragReject
              ? "このファイル形式のアップロードは許可されていません。"
              : "ファイルを選択するか、ドラッグアンドドロップしてください。"}
          </p>
          <button disabled={isDragReject}>ファイルを選択</button>
        </div>
        <p className={styles.note}>
          複数のファイルを選択できます。pdf, png, jpg, jpeg
          ファイルを選択できます。
        </p>
        <p className={styles.caution}>※1ファイルの最大サイズは50MBです</p>
      </div>
      {currentShowFiles && (
        <aside>
          <ul className={styles.file}>
            {currentShowFiles.map((item, index) => (
              <li key={index} className={styles.file_list}>
                {item.isUploaded ? (
                  <div className={styles.file_item}>
                    <div className={styles.file_item_type}>
                      <span className={styles.icon_file}>
                        <File />
                      </span>
                    </div>
                    <div className={styles.file_item_body}>
                      <p className={styles.file_item_name}>{item.file.name}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.file_item_trash}
                      onClick={() => {
                        removeFile(index);
                      }}
                    >
                      <span className={styles.icon_trash}>
                        <Trash />
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className={styles.file_item}>
                    <div className={styles.file_item_type}>
                      <Image
                        src="/../public/spinner.gif"
                        width={20}
                        height={20}
                        alt="loading"
                      />
                    </div>
                    <div className={styles.file_item_body}>
                      <p className={styles.file_item_name}>
                        {item.file.name}をアップロードしています…
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
};

export default FileUploader;

```

添付したファイルの状態やエラーハンドリングなど欲しい物がだいたい提供されていて直感的に利用できるのでとても使いやすいライブラリですね！

CodeSandbox にデモを置いておきましたので、よかったら見てみてください！

Loading

Preparing MicroVM...

Tip: after initialization, we'll create a snapshot so subsequent starts will take less than a second!

### おわりに

アンドパッドではエンジニアの積極採用中です！建築・建設業界の課題解決という、やりがいのあるプロジェクトで働いてみたい方、ぜひお気軽にカジュアル面談などご参加ください！ 最後までお読みいただきありがとうございました！

[hrmos.co](https://hrmos.co/pages/andpad/jobs?category=1400453786062708736)