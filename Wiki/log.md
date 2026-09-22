# Wiki Log

## [2026-07-10] init | Wiki 初期化

スキーマ（AGENTS.md）・橋渡しスキル（.claude/skills/\_obsidian-wiki）・index.md・log.md を作成。

## [2026-07-10] ingest | デザインシステムの批評記事 16本（Tags: topic/デザインシステム × type/批評）

touched: [[デザインシステム批判論]] (新規/ハブ), [[デザインシステムの過剰設計]] (新規), [[デザインシステムと組織構造]] (新規), [[デザインシステムの強制と例外]] (新規), [[AI時代のデザインシステム]] (新規), [[宣言的デザインシステム]] (新規), [[存在論的負債]] (新規), [[Material Design]] (新規), [[Itai Vonshak]] (新規)
要点: 元推進者自身によるDS批判（Vonshak「破られた約束」、Bent「3:1採用比率」）、DS=制度装置論（Plato）、強制と例外の制度化（Trueman/Doctolib）、AIによるボトルネック移動（Johansson）、過剰設計バイアス（Han）、宣言的DS（Keith）、存在論的負債（Arango）
備考: [[不可分の民藝から可分の工業産業へ - Speaker Deck]] はクリップにトランスクリプトが無く取り込み不能。デザインシステムには意見がある。ただ、それが強制されていないだけだ マーフィー・トゥルーマン 2026年1月 Design Systems Collective（旧部分クリップ・削除済み） は有料記事のため冒頭のみで部分ingest。

## [2026-07-10] ingest | Your design system has opinions. They’re just not being enforced（全文クリップによる再取り込み）

touched: [[デザインシステムの強制と例外]] (更新: validationの実装パターン節を追加), [[AI時代のデザインシステム]] (更新: A2UI/Storybook MCP/FigmaLintのシグナル), [[デザインシステム批判論]] (更新: 出典差し替え), [[Murphy Trueman]] (新規)
要点: validationの3検証ポイント（design/build/runtime）、composable contracts、禁止prop組合せ（TS never）、「文書化する価値があるなら強制する価値がある」、ストライクゾーン比喩
備考: wiki内の出典リンクを部分クリップ（デザインシステムには意見がある。ただ、それが強制されていないだけだ マーフィー・トゥルーマン 2026年1月 Design Systems Collective（旧部分クリップ・削除済み））から全文版へ差し替え。旧部分クリップは重複ソースとして残存（削除はユーザー判断）。

## [2026-07-10] schema | Speaker Deck / SlideShare クリップを対象外に

AGENTS.md に除外ルールを追加（ユーザー指示）。ファイル名に Speaker Deck / SlideShare を含むクリップ（約70件）は ingest・query の対象外とする。
備考: ルール制定前に ingest 済みの [[Material 3 やめました - Good-bye M3 design system - Speaker Deck]] 由来の内容（[[Material Design]]・[[デザインシステムの過剰設計]] 内のM3離脱事例）は事実として正確なため存置。除去希望があれば対応。

## [2026-07-10] ingest | デザインシステムのドキュメント記事 4本（Tags: topic/デザインシステム/ドキュメント）

touched: [[デザインシステムのドキュメンテーション]] (新規/ハブ), [[デザインシステムとアクセシビリティ]] (新規), [[kintone Design System]] (新規), [[デザインシステム批判論]] (更新: 批判の軸9「明文化されない理解」), [[デザインシステムと組織構造]] (更新: ガバナンス不在＝スナップショット化の節), [[デザインシステムの過剰設計]] (更新: Do's and Don'ts雛形流用の事例), [[Material Design]] (更新: 雛形流用の失敗事例), [[デザインシステムの強制と例外]] (更新: 整合の幻想・注釈への参照)
要点: ドキュメントは後付けではなく仕事そのもの／文書化できない決定は未完成（Vilariño）、2オーディエンス分離（仕様層/ガイドライン層）・質問軸の構成・「最速の代替手段」との競争（Aali）、アクセシブルなコンポーネント≠アクセシブルなデザイン・Preset annotations（GitHub）、意思決定の記録によるデザインの歴史継承＝kintoneがDSを作る第一の理由（sakito）

## [2026-07-10] schema | Wiki/ を type 別サブフォルダに階層化

Obsidian ファイルエクスプローラーの見通し改善のため（ユーザー指示）、フラット配置から `Wiki/<type>/` へ変更。既存13ページを entity/ 4件・concept/ 9件へ移動（summary/ note/ は最初のページ作成時に作る）。wikilink はフォルダ非依存のため既存リンクへの影響なし。AGENTS.md のツリー図・配置規則・lint 項目（type とフォルダの一致検査）を更新。topic 別フォルダは不採用（横断ページへの単一親の強制とタグとの二重管理を避ける）。

## [2026-07-10] ingest | デザイントークン記事 50本（Tags: topic/デザインシステム/デザイントークン、DTCG含む）

テーマ別6バッチ（基礎→命名・意味論→DTCG→ツールチェーン→カラー→運用）で逐次編纂。
touched（新規9）: [[デザイントークン]] (ハブ), [[デザイントークンの命名]], [[セマンティックトークン]], [[デザイントークンのツールチェーン]], [[カラーシステムの設計]], [[スペーシングシステム]], [[DTCG]], [[Style Dictionary]], [[Adobe Spectrum]], [[Nathan Curtis]], [[Nate Baldwin]]（計11）
touched（更新7）: [[Material Design]] (M3トーナルシステム・トーン差コントラスト保証), [[デザインシステムの強制と例外]] (トークン契約層=Dow Jones、禁止lintの逆効果=Spectrum), [[デザインシステムの過剰設計]] (トークン過剰抽象化・Spectrum 21万トークン), [[デザインシステムと組織構造]] (DS=インフラ道路メタファー・命令は静かな迂回を生む), [[AI時代のデザインシステム]] (SpectrumのAIヘルプボットと慎重評価), [[デザインシステムとアクセシビリティ]]…変更なし, index.md
要点: Jina Anne「方法論であって変数化ではない」／Curtis 4層命名モデルと options vs choices／Baldwin ゴルディロックス・ゾーンとコンポーネントトークン損益（Spectrum 210,180トークン・18MB）／Astorino「トークンはセマンティックではない」／Muldoon トークン契約=interface分離（モードはまだ名付けていないブランド）／DTCG はモード・テーマ未決着（#210）で Figma GUI インポート非対応の遠因／Style Dictionary ダークモード2方式は multi-file 推奨／Git=SSoT の配信パイプライン（Thoughtworks 1日展開）／Tokens Studio→Variables 移行（B-43）／カラービルダーと M3 トーン差保証／Braithwaite FEマニフェスト（インフラ・変化の管理・価値提供）と anonymous tokens
備考: 空クリップで取り込み不能: [[Native modes and theming support · Issue 210 · design-tokens-community-group · GitHub]], [[spectrum token visualization tool]], [[Figmaからさまざまなカラートークンを生成して最高の色世界を保守する noteUIDev1｜-- uto-usui --]], [[The Future of Design Systems is Semantic  Figma Blog]]。部分クリップ: [[自信を持ってトークンを設計しましょう。W3Cデザイントークン標準が優れている理由…  ルーカス・オッパーマン著  2026年1月  UX Collective]]（冒頭のみ）, [[ガバナンスのトラップにはまらないためのデザイントークン活用]]（本文欠落）, [[Dark Mode with Style Dictionary  dbanksdesign]]（中盤以降のみ）, [[Tokens Studio for FigmaとStyle Dictionaryでデザインの共通言語をつくる - 弁護士ドットコム株式会社 Creators’ blog]]（冒頭欠落）。重複クリップ: When “semantic tokens” 系3件（[[Component-level Design Tokens are they worth it]] の中身も実は同記事の誤クリップ。本来の内容は邦訳 [[コンポーネントレベルのデザイントークン：価値はあるか？  Nate Baldwin  Medium]] から回収）, [[How to create a color palette for design systems  Blog]] は [[デザインシステムのためのカラーパレットの作成：改訂版]] が上書き。

## [2026-07-10] ingest | ガバナンス記事 5本（Tags: topic/デザインシステム/ガバナンス）

touched: [[デザインシステムのガバナンス]] (新規/ハブ), [[kintone Design System]] (更新: Mantleチーム体制・PO・学習バックログ), [[デザインシステムのドキュメンテーション]] (更新: 公開意思決定ログ), [[デザインシステムと組織構造]] (更新: ガバナンスページへの参照), [[デザインシステムの強制と例外]] (更新: 関連ページ), index.md
要点: 中央集権承認の死のスパイラルと影のシステム（Celta、87チーム事例で承認6週→3日）、3層コントリビューションモデル（Small=セルフサービス70%/Medium=週次カウンシル/Large=RFC+パイロット）、3つのC判断フレームワーク、Yes-And拒否と公開決定ログ、Design System Ops=決断疲れの軽減（Kaelig「ツールではなく解決した問題で測る」）、オーナー（PO）不可欠論（sakito/Mantle）、ウェブガバナンスの道具としてのDS（コンセント: 組織・仕組み・ルールの集約）
備考: [[勢いを殺さないデザインシステムガバナンス  Roberto Moreno Celta  Medium]] は本文が空のクリップで、英語版 [[Design System Governance That Doesn’t Kill Momentum]] と同一URLの重複。Roberto Moreno Celta はこれで2本目（Spacing Systems）だが entity ページは保留（lint 時に再検討）。

## [2026-07-10] lint | 全体検査（25ページ・ingest 6回時点）

機械チェック: 赤リンク=log内履歴の1件のみ（削除済み旧クリップへの参照。log は追記専用のため存置）、オーファン0、index乖離0、type/フォルダ不一致0。
矛盾: 実質なし。連合型モデルの推奨（Celta）と失敗証言（Cisco/Curtis）は [[デザインシステムのガバナンス]] 内で緊張として明示済み。Baldwin/Astorino のセマンティックトークン論は [[セマンティックトークン]] で統合済み。「成熟度」の3定義（Han のはしご/Vilariño のエスカレーション不要/Capozzi の構造化3段階）は異なる軸であり矛盾ではない。
修正（ユーザー承認済み）: ①相互参照追加 — [[宣言的デザインシステム]]↔[[セマンティックトークン]]（Astorino「UIを記述」と Keith のコレクション批判の同型性を明記）、[[存在論的負債]]←→[[デザイントークンの命名]]（統制語彙・コンテンツストラテジスト＝意味論への実務的投資） ②[[Tokens Studio]] entity 新規作成（4ページに散在した事実を統合。sources: 7）
保留（ユーザー判断）: Jina Anne / Roberto Moreno Celta の entity 化。Storybook / SLDS / Polaris は言及が浅く保留。Speaker Deck 由来の M3 離脱事例（[[Material Design]] / [[デザインシステムの過剰設計]]）は既決事項として存置継続。

## [2026-07-10] maintenance | log 内の赤リンクを解消（ユーザー指示）

過去エントリ2箇所（2026-07-10 の初回 ingest と再取り込みの備考）にあった削除済み旧部分クリップ「デザインシステムには意見がある。…」への wikilink を、リンク記法の解除（プレーンテキスト化＋「旧部分クリップ・削除済み」注記）で修正。「過去の行は編集しない」規約の例外だが、記録のテキスト内容は保持しリンク構文のみ変更。これで wiki 全体の赤リンクは0件。

## [2026-07-10] ingest | デザインシステム事例記事 44本（Tags: topic/デザインシステム × type/事例、ingest済み7本を除く）

テーマ別6バッチ（立ち上げ→浸透→kintone/SmartHR→大規模構築→カラー/ツール→その他・連合型）で逐次編纂。
touched（新規4）: [[デザインシステムの立ち上げ]], [[デザインシステムの浸透]], [[ブランドとデザインシステム]], [[SmartHR Design System]]
touched（大幅更新）: [[kintone Design System]]（現在地ポッドキャスト・ユーザー体験チーム・エベレスト・啓発で sources 6）, [[デザインシステムのガバナンス]]（Spotify連合型2度の失敗証言・kintone成功例・専任vs兼任の3類型・USWDS）, [[Adobe Spectrum]]（Spectrum 2・カラーv6.0）, [[デザイントークンのツールチェーン]]（DMM Turtle一元管理・タイミーDesignDataOps・メルカリWeb Components）, [[カラーシステムの設計]]（Spectrum v6.0の知覚科学）, [[デザインシステムの強制と例外]]（SmartHR補助線論・enechain eslint・タイミーNormalizer）, [[デザインシステムのドキュメンテーション]]（GameWithデザインドック・enechain他社調査・Turtle Storybook集約）, [[デザインシステムとアクセシビリティ]]（メルカリAA保証・enechain・Ubie）, [[デザイントークンの命名]]（B-43命名体系）, [[DTCG]]（B-43の過渡期戦略）, [[AI時代のデザインシステム]]（Cheris「理想のUIは未発明」）, [[デザインシステムの過剰設計]]（Tsukuri後日談）, [[セマンティックトークン]]
要点: 中央集権vs連合型の実証データ（Spotify: 再利用1.2回vs200回・1,500コンポーネント膨張／kintone: 専任コア+Federatedで60名関与）／「理想を押し付けない」「今使えるものの提供」「補助線であって法律ではない」という国内の運用哲学の収斂／デザインシステム疲れと番長制（KARTE）／DesignDataOpsと限界費用ゼロ論（タイミー）／ブランド駆動DS（Spindle・楽天カード・KARTE Graphic Standards）／知覚科学ベースのカラー刷新（Spectrum v6.0）
備考: 空クリップで取り込み不能: [[スモールチームで始める、デザインシステムの第一歩 - Gaudiy Tech Blog]], [[みんなの銀行デザインシステム、始めました。｜みんなの銀行 公式note]], [[Charcoal 2.0 デザインシステムの基盤を再構築  Figma]]。クリップ汚染（後半に無関係記事の混入）: [[入社10ヶ月で行った Turtle デザインシステムの開発と関連する取り組み - DMM Developers Blog]]（Kotlin/Nativeデバッグ記事）, [[デザインシステム「Tsukuri」の立ち上げから現在まで〜取り組みとその成果〜 - ANDPAD Tech Blog]]（react-dropzone記事）。重複: [[SmartHR UI を中心としたエコシステムのすすめ - SmartHR Tech Blog 2]] は同記事の重複クリップ。追補: [[「専任ゼロ」でも育て続ける、Gaudiyのデザインシステム運用｜TORAJIRO]]（→[[デザインシステムの浸透]]・[[AI時代のデザインシステム]]）と [[IPの世界観に寄り添う、マルチブランドなカラーシステム設計論｜TORAJIRO]]（→[[カラーシステムの設計]]: Dark Yellow Problem・HSL批判とHuetone・APCA・ホワイトラベル要件）も同 ingest 内で編纂完了。

## [2026-07-10] ingest | 連合型DS（Tags: topic/デザインシステム/連合型DS、3クリップ=実質2記事）

touched: [[連合型デザインシステム]] (新規), [[デザインシステムのガバナンス]] (更新: Spotify失敗証言の詳細を新ページへ移設・圧縮ポインタ化), [[Nathan Curtis]] (更新: 3チームモデルの出自と2024年撤回、sources 7→9), [[デザインシステム批判論]] (更新: 批判の軸10「チームモデルの神話」), [[デザインシステムと組織構造]] (更新: Cisco節にインラインリンク), [[kintone Design System]] (更新: Federated移行節から参照), index.md
要点: 連合型は選択肢ではなく側面（Curtis 2024撤回、80+コンサルで中央投資なしの成功0%）／6つの神話とアンカリングバイアス／「選ばず、徐々に追加する」／Atlassian Editor はコア外・貢献は修正のみ／訳語「連合型」は🌴本『デザインシステムの育て方』準拠（Sato 個人は「連邦モデル」派）
備考: [[連合型デザインシステムの誤り  ネイサン・カーティス  Medium]]（原文）と [[翻訳記事：連合型デザインシステムの誤り｜Nobuya Sato]]（邦訳）は同一記事の重複クリップ。Shaun Bent 記事は事例44本バッチで ingest 済みだったため、ガバナンスページの巨大段落を新ページへ統合する形で再編纂。Shaun Bent の entity 化（登場ソース2本: 3:1人員配置・連合型失敗）は次回 lint の検討候補。

## [2026-07-10] lint | 全体検査（31ページ・ingest 8回時点）

機械チェック: 赤リンク0、index乖離0、type/フォルダ不一致0、Tags混入0、鮮度問題なし（全ページ当日更新）。オーファン1件: [[ブランドとデザインシステム]]（index以外からの被リンク0）。
矛盾: なし（Celta の連合型推奨 vs Curtis 撤回の緊張は [[デザインシステムのガバナンス]] 内で明示済み）。
修正（ユーザー承認済み）: ①オーファン解消 — [[カラーシステムの設計]]・[[デザインシステムの浸透]] の関連ページ、[[デザインシステムのガバナンス]] のMVV節から [[ブランドとデザインシステム]] へ相互リンク追加 ②[[Shaun Bent]] entity 新規作成（元Spotify DS EM・9年・Encoreパリティ・3:1分析・連合型失敗証言。sources: 2）。[[デザインシステムと組織構造]]・[[連合型デザインシステム]] の言及をリンク化、index 追加
保留（ユーザー判断）: Storybook entity 化（22回/9ページ言及で最頻出）、「登場するソース」節の統一（節なし9ページ、ガバナンスの MIT Tech Review 漏れ、カラーシステムの設計の3ソース漏れ = Braithwaite Knapsack・Spectrum再発明・TORAJIROマルチブランド）。Atlassian（8回/5ページ）・Jina Anne（4回/4ページ）・Celta（2回）の entity 化は引き続き保留。

## [2026-07-10] ingest | コンポーネント設計 記事 18本（Tags: topic/デザインシステム/コンポーネント設計。スライド系4件は規約により除外）

touched（新規2）: [[コンポーネント設計]] (ハブ: ドメイン境界・再利用の幻想・アンチパターン・合成・Heavyweight 6階層・API設計・命名・mizchi 4分類・link delegation), [[コンポーネントカタログ]] (Storybook仕様論・Wantedly「カタログを超えて」・静的HTML CDD・Riff配布論・Code Connect)
touched（更新5）: [[デザイントークンの命名]] (PJ Onori: 抽象性と明確さの相反・smedium・Matchacado), [[デザインシステムとアクセシビリティ]] (Riffコントラスト全組合せ表・Wantedly React Aria), [[デザインシステムの強制と例外]] (Belyaev escape hatches・Component Galleryリンク化), [[宣言的デザインシステム]] (Wantedly=コレクション批判への実装面の回答), [[デザインシステムの浸透]] (Riff利用数計測=component-rate同型), index.md
要点: 再利用・共通化は無条件の善ではない（YAGNI・ユースケース無視の共通化・カスタマイズ時限爆弾）／ドメイン知識の3段階境界／「システムが許す使い方は必ずされる」（Belyaev）／escape hatchesはオーバーライドでなくcomposition／Heavyweight 6階層=Atomic Designのブランド語彙版／カタログは仕様確認の場・「同じ抽象を持つフレームワーク」実装論
備考: 取り込み不能: [[Brad Frost Is Atomic Design Dead – Hatch Conference Berlin 2023 - YouTube]]（動画リンクのみ）, [[Open UI Component Certified Checklist 3]]（画像のみ）。重複: [[Home  The Component Gallery 1 2]] は [[Home  The Component Gallery 2]] と同一URLのクリップ。見送り: [[useTransition をあらゆる場所で盲目的に使用しないでください  Nicolas Charpentier]]（React実装Tipsでデザインシステムとの接続が薄い）。

## [2026-07-10] ingest | デザインシステム × 批評 差分3本（Tags: topic/デザインシステム × type/批評。タグ一致20本中17本は取り込み済みを確認）

touched: [[デザインシステムのドキュメンテーション]] (更新: トーン・オブ・ボイス批判の節＝形容詞でなく決定ルール、意図の伝承バレット、frontmatter直後のゴミ文字「｀｀」を修正), [[デザインシステム批判論]] (更新: 批判の軸11「時間解放の神話」), [[コンポーネント設計]] (更新: プラットフォーム間の一貫性 Parity vs Specific の節), index.md (批判の軸数を8→11に修正)
要点: 抽象形容詞のガイドは5人のライターに5つのプロダクトを作らせる（NN/g、Kind-Envy）／Googleにトーン・オブ・ボイスはなく決定ルールだけ／時間は解放されず投資先が変わるだけ＝ジェボンズのパラドックス（長谷川恭久）／自アプリ間の一貫性より同一OS他アプリとの一貫性（Scott Logic、Monzo/Starling/Revolut比較）
備考: 新規ページなし（3本とも既存ページへ統合が適切と判断）。長谷川恭久（yasuhisa.com）は登場ソース1本のため entity 化は保留。

## [2026-07-10] query | デザインシステムの4つのステレオタイプ（門番/完成する/スマートなルール/成果物整備）への反証

参照: [[デザインシステムの強制と例外]], [[デザインシステムのガバナンス]], [[SmartHR Design System]], [[kintone Design System]], [[デザインシステム批判論]], [[デザインシステムのドキュメンテーション]], [[デザインシステムの浸透]], [[デザインシステムの立ち上げ]], [[デザインシステムの過剰設計]], [[デザインシステムと組織構造]], [[Material Design]], [[ブランドとデザインシステム]]
結果: 4ステレオタイプそれぞれに反証を合成（補助線であって法律ではない/スナップショット化と積立投資/文書化された妥協/ライブラリは何で作るか・システムはどう・なぜ作るか）。記事執筆の素材として提示。note 保存は提案中

## [2026-07-11] note保存 | デザインシステムの4つのステレオタイプへの反証

touched: [[Q. デザインシステムの4つのステレオタイプへの反証]] (新規), index.md (Notes 追加)
要点: 前日の query 回答を note ページ化。①門番→補助線・Yes-And・ストライクゾーン ②完成→スナップショット化・エベレスト・積立投資 ③スマートなルール→文書化された妥協・意思決定の記録・ラクマの形状決着 ④成果物→ライブラリ/システム区別・成熟度の再定義・目的の再定義群

## [2026-07-11] ingest | デザインシステム × 運用 差分20本（Tags: topic/デザインシステム × type/運用。タグ一致37本中16本は取り込み済み、1本は重複クリップ）

テーマ別5バッチ（ROI・ビジネスケース → 優先度 → 成熟・世代・拡張 → ペース・リーン・スケール → 実践）で逐次編纂。
touched（新規5）: [[デザインシステムの投資対効果]] (ハブ: 赤字スタートの算数・スイートスポット・DXCビジネスケース・「最優先にはならない」・成果指標・説得の実務), [[デザインシステムの階層化]] (Tiers・Central/Local・ドメイン特化DS・ペースレイヤーとレシピ), [[デザインシステムの世代交代]] (Strategy→Alpha→Beta→GA・依存ツリー・doneness matrix・完成しない前提), [[Dan Mall]] (entity), [[長谷川恭久]] (entity)
touched（更新10）: [[Nathan Curtis]] (Tiers・Generations 5部作、sources 9→11), [[kintone Design System]] (Central/Local引き上げ、sources 6→7), [[デザインシステムの立ち上げ]] (始めない判断・90 Days・リーン4原則・UIコンポーネントは表層), [[デザインシステムの浸透]] (負のサイクルの根因・警察よりFBサイクル・愛されるプロダクト・浸透の定番手段), [[デザインシステムのガバナンス]] (役割定義の雛形), [[デザインシステムの過剰設計]] (規模感の不一致・Material UIで良かった事故), [[デザインシステムのドキュメンテーション]] (UI Spec・長谷川リンク化), [[デザインシステム批判論]] (長谷川リンク化・関連ページ), [[連合型デザインシステム]] (関連ページ), index.md
要点: DSチームは赤字から始まる（5人チーム=月$41,666、ボタンの損益分岐に434人）／Component Factory（ゴーストタウン）↔ Staff Augmentation の間の狭いスイートスポット=「3チーム以上が同じコンポーネントを同じ時間枠で必要」／価値証明の軸は生産性から顧客成果・収益へ（Freshworks 28%削減・SAP取締役会KPI・Linear NRR）／「DS単体はビジネス価値を産まない」の国内収斂と Loglass「自治権」の5活動／コアの下に階層を作る（Tiers）→ Central/Local（kintone実践）→ ドメイン特化DS（Pennylane 4x・翻訳税）／「成功するDSはプロダクトよりゆっくり動く。バグではなく仕様」（ペースレイヤー・レシピ・curate not innovate）／世代交代の計画論（Curtis）／90 Days=採用ファースト52活動・原則抽出は42番目
備考: [[Design System Metrics. Design systems are essential for…  by Max Stepanov  Sep, 2024  Medium]] は冒頭のROI節のみの部分クリップ。「When "semantic tokens" are no longer semantic..md」（末尾ピリオド付き）は取り込み済み同記事の重複クリップ。基盤先行 vs ラスボス論（Lean/育てていく vs Dan Mall）、水門を開ける vs 絞る（Lean vs Sweet Spot）の2つの緊張は立ち上げ・世代交代ページ内に明示して併記。

## [2026-07-12] ingest | デザインシステム × 概論 差分20本（Tags: topic/デザインシステム × type/概論。タグ一致37本中13本は取り込み済み、空クリップ2・重複2）

テーマ別4バッチ（定義・概論 → Brad Frost → 目的・原則 → 契約・現在地）で逐次編纂。
touched（新規3）: [[デザインシステムとは何か]] (ハブ: 定義群・Mall 6分類・Curtis 3システムと矮小化批判・ブランド×プロダクトのマトリクス・一貫性と認知負荷・歴史・誤解の再設定), [[デザイン原則]] (決める力・ポエム化回避・作りどきの対立), [[Brad Frost]] (entity: Atomic Design・5層エコシステム・Global DS構想)
touched（更新13）: [[デザインシステムの階層化]] (Frost 5層の詳説・Gall の法則・レシピ=圧力弁とIBM Carbon・スマートコンポーネント・Global DS=メタDS問題), [[AI時代のデザインシステム]] (April 2026: 安定8%問題・MCP=デザイン→エージェント編成・GenUI/Zod制約層・機械可読API化・契約の実行可能化), [[宣言的デザインシステム]] (Achiardi契約説: Meadows・導出連鎖・コンポーネントは使い捨て), [[DTCG]] (v2025.10安定版リリース・複合トークン・鮮度注記), [[デザイントークンの命名]] (機械のための命名・ARIA Patterns既定), [[デザインシステムとアクセシビリティ]] (EAA施行・EN 301 549・WCAG×APCA両対応・CIビルド失敗), [[Adobe Spectrum]] (React Spectrum/react-aria/react-statelyのロジックUI分離、sources 4→5), [[長谷川恭久]] (デザインのシステム論・決める力・Q&A・Automagic #361、sources 4→8), [[デザインシステムのドキュメンテーション]] (Wisdom: スネイプ本・Diátaxis・作る/使う分離・AI訓練可能), [[コンポーネント設計]] (Wisdom: 2つのノブ・作るべきでないコンポーネント・ボックスモデル合意・剪定), [[デザインシステムの世代交代]] (バージョニング作法・破壊改変=症状と向き合う・Sparkbox成熟モデル), [[デザインシステムの立ち上げ]] (小山の いまやる事/将来やる事・NIJIBOX Q&A・Design System Checklist), [[デザインシステムの浸透]] (水野「対話とは我慢」・改修4本柱), [[デザインシステムの投資対効果]] (関連ページ), index.md
要点: 「標準定義はない」を前提に、定義は6分類（Mall）・3システム（Curtis）・ブランド×プロダクト4象限＋公共（Nobuo）で使い分ける／レゴセット的理解は「製品群」「組織」を落とした矮小化（usagimaru）／一貫性は目的分割と検証を前提に認知負荷を減らす手段で、逆効果もある（seya）／Frost 5層エコシステム（ほぼ全層オプション・Gall の法則）と Global DS 構想（組織間重複＝メタDS問題）／契約説「ライブラリはスナップショット、契約がシステム」／2026年の現在地: DTCG v2025.10・EAA 施行・MCP・GenUI 制約層——DSは「機械可読な API」へ、ただし「非常に安定」は8%のみ
備考: 取り込み不能（空クリップ）: [[The Design System Guide]]（リンクのみ）, [[The Design System Guide 1]]（画像のみ）。重複クリップ: [[The Design System You Actually Need]] は取り込み済み Han 記事と同一URL、[[The Design System Ecosystem  Big Medium]] は [[The Design System Ecosystem  Brad Frost]] のミラー（bradfrost.com 版を正として ingest）。[[Imperavi]] は製品サイトのクリップで知識ソースにならず対象外。部分クリップ: [[デザインシステムのはじめかた――事前に理解しておきたいポイントや構築のための5つのサイクルとは企業で働くクリエイター向けウェブマガジン「CreatorZine（クリエイタージン）」]]（5サイクル中「調査」までで切れており、価値を届ける観点・形骸化の論点のみ回収）。ingest はこれで12回目、前回 lint から4回経過——次回 lint 推奨（新規ページの被リンク・とは何か/批判論/過剰設計の役割分担の検証）。

## [2026-07-12] ingest | デザインシステム × 実装 差分4本（Tags: topic/デザインシステム × type/実装。タグ一致25本中20本は取り込み済み、空の重複クリップ1）

touched（新規0・更新10）: [[AI時代のデザインシステム]] (供給側のAI活用: Frost 6用途=コード生成40-90%高速・フレームワーク翻訳・ユニットテスト・a11yレビュー・文書執筆・バベルフィッシュ文書、運用6原則), [[Brad Frost]] (AI適用論、sources 6→7), [[コンポーネント設計]] (Banks: cohesion vs consistency・multi vs cross-platform・共有コンポーネント定義・documentation driven development・autonomy／Uber Base: レイアウトモデル・カスタマイズ3手法・「遠くない従兄弟」統合), [[デザインシステムの過剰設計]] (Uber Base 60-70コンポーネント=カタログの広さという誤指標), [[Style Dictionary]] (作者Banksのマルチプラットフォーム論、sources 7→8), [[デザインシステムの世代交代]] (KARTE sour-react の使用状況自動集計=破壊的変更と剪定の基盤、OSS internal-library-reference-stats), [[デザインシステムの浸透]] (計測の系譜に追記), [[デザインシステムのドキュメンテーション]] (バベルフィッシュ文書=属性別入口の動的化), index.md
要点: AIはDSの消費側（エージェント）だけでなく供給側（制作作業）も変える——組織固有の規約で訓練した「ジュニア開発者」として／マルチプラットフォームの目標は consistency と efficiency ではなく cohesion と autonomy（トークンは一部にすぎない・分岐は意図的に・docs先行開発）／コンポーネント数の拡大は成熟ではなく、共通レイアウトモデルへの統合が構造・機能の重複を解く（トークンでは届かない領域）／使用状況の自動集計が「変更すべきものを変更する」勇気を与える
備考: [[ソースコードを解析して社内向けUIライブラリの使用状況を自動で集計する 2]] は同一URLの空クリップ（画像のみ）。Multi-Platform 記事は Clarity 2020 講演が原典（2020年の「公開DSの10%未満」等の数値は当時のもの）。

## [2026-07-12] ingest | 連合型DS 差分1本（タグ一致3本は取り込み済み。本文キーワード検索で原典を発見）

touched: [[連合型デザインシステム]] (新節「原典 — 3チームモデルの定式化（2015）」: オーバーロード原体験・3モデルの原定義・連合型の困難・形成論5点・歴史的読み直し), [[Nathan Curtis]] (原典ソース追加、sources 11→12), index.md
要点: 2015年原典 [[Team Models for Scaling a Design System  by Nathan Curtis  EightShapes  Medium]] は topic/組織/組織文化 タグ側にあり連合型DSタグから漏れていた。Sun.com の「オーバーロードはスケールしない」が出発点／連合型は「本業を辞めずに」「一定期間」「全員参加ではない」委員会（Material の committee-by-design が原型）／形成論5点（プラットフォーム代表・CIVX・doer×director・中央の文書化投資・貢献と自治の互酬=Jon Wiley証言）／**原典の時点で「連合チームには献身的な中央スタッフが必要。なければスタイルガイドは10ヶ月後に死んでいる」と明記**——2024年撤回との対比で「中央不要神話は流通過程の増幅」という読みを追記
備考: 本文キーワード検索の他2件は対象外——[[How to Evangelize a Design System]]（連合型言及1件のみ。topic/組織/組織文化の浸透系記事として将来の別バッチ向き）、Flutter状態管理記事（federated pluginの文脈で無関係）。

## [2026-07-12] lint | 全体検査（46ページ・ingest 14回時点）

機械チェック: 赤リンク0、type/フォルダ不一致0、Tags混入0、index乖離0。検出: オーファン1件（[[Q. デザインシステムの4つのステレオタイプへの反証]]）、updated乖離21ページ、「登場するソース」節なし9ページ、ソース節の漏れ22ページ計62件（前回保留の MIT Tech Review・カラーシステムの設計3件を含む）。
矛盾: 新規なし。対立見解（基盤先行vsラスボス、水門を開けるvs絞る、WC推奨vs注釈が多い、ガイダンスvs強制、原典vs撤回）は各ページ内で緊張として明示併記済みであることを確認。
修正（ユーザー承認済み）: ①ソース節の漏れ62件を一括追記 ②節なし9ページに登場するソース節を新設 ③オーファン解消——[[デザインシステム批判論]] の関連ページから note へリンク ④updated を実編集日に一括修正（32件） ⑤[[Storybook]] entity 新規作成（13ページに散在した事実を統合: 仕様確認の場・ブランチデプロイ・ドキュメント集約と分裂注意・民主化・MCP server・ネイティブの空白・sources 11）。うち「仕様確認の場」の出典を Qiita 原典に訂正 ⑥[[Nobuya Sato]] entity 新規作成（翻訳・論評者、番長&大臣制提唱、企業活動の一環論、Kholmatova本翻訳、Automagic #361。sources 9）。連合型・浸透・投資対効果・長谷川恭久・階層化・AI時代・ドキュメンテーション・コンポーネントカタログの言及をリンク化、index 追加
保留（ユーザー判断・次回再検討）: Atlassian（7ページ）・sakito（6ページ、kintone DS内に集約済み）・seya（6ページ）・Kevin Muldoon（5ページ）・Jina Anne（4ページ）の entity 化。Figma はツールとして31ページ言及の最多だが、catch-all 化の懸念があり entity 化は要検討。

## [2026-07-16] query | 社内の開発者向けプロダクトとしてのデザインシステム

参照: [[デザインシステムとは何か]] (Mall 6分類の「プロダクト」・「別のプロダクト」論・Astro「使うことを強制される」)、[[デザインシステムの投資対効果]] (製品を作るための製品・赤字スタート・スイートスポット)、[[デザインシステムのガバナンス]] (Curtis「プロジェクトではなく製品でありサービス」・Design System Ops)、[[デザインシステムのドキュメンテーション]] (ドキュメントをプロダクトとして扱う・2オーディエンス)、[[デザインシステムの浸透]] (愛されているか・目安箱・成果指標)
結果: DSを「社内の開発者向けプロダクト」と捉える論の系譜（Mall/Curtis/Vilariño/Nobuya/水野/三瓶/河西/こぎそ）を横断合成。note保存は今回は提案せず（記事執筆素材ではなく質問応答レベル）。

## [2026-07-22] query | AIフレンドリーなデザインシステムとは何か

参照: [[AI時代のデザインシステム]] (Trueman 契約論・A2UI/Storybook MCP/データ化3シグナル・Konovalov 2026-04「機械可読API」・GenUI制約層・セマンティック命名・Frost 供給側6用途)、[[宣言的デザインシステム]] (Achiardi 契約説=導出連鎖・コンポーネントは使い捨て)、[[デザインシステムの強制と例外]] (validation 3層・composable contracts・トークンinterface分離)
結果: 7要件に整理 — ①契約の機械的強制 ②カタログ公開＋unknown component ハードエラー ③セマンティック命名（名前が振る舞いの仕様） ④MCPでデータ化 ⑤GenUI制約層 ⑥トークンinterface/implementation分離 ⑦AI訓練可能なドキュメント。カウンターポイント: ボトルネック移動論・「GenUIを使う権利」・SmartHRの補助線路線との対立を併記。note保存は今回は提案せず（既存ページで十分カバー、記事執筆素材ではなく応答レベル）。

## [2026-07-22] query | 仕様をAIに伝える経路

参照: [[AI時代のデザインシステム]] (MCP・Zod制約GenUI・A2UI 3原則・Frost 6用途)、[[Storybook]] (MCP server による構造化コンテキスト供給・自律修正ループ)、[[デザイントークンの命名]] (4部構成・命名が振る舞いの仕様・ARIA Patterns既定)、[[デザインシステムの強制と例外]] (validation 3層・エラーメッセージ=プロダクト・composable contracts・意味的候補提案型linter)、[[デザインシステムのドキュメンテーション]] (AI訓練可能な質・バベルフィッシュ文書)、[[コンポーネントカタログ]] (Figma Code Connect)
結果: 「AIに伝える」を経路の観点で5+1に整理 — ①MCP（Figma Dev Mode / Storybook MCP） ②スキーマ制約UI生成（Zod / A2UI） ③命名そのもの（{cat}-{role}-{var}-{state}） ④validation層のエラーメッセージ ⑤AI訓練可能な自然言語ドキュメント（＋補助: Figma Code Connect）。優先度は上ほど機械可読、下ほど解釈依存。前回の「AIフレンドリーDS」（要件）と補完関係。note保存は今回も提案せず（既存ページの再合成でありnote独立化の価値薄い）。

## [2026-07-25] query | デザインシステム運用の泥臭さ・調整・コミュニケーションの重要性

参照: [[デザインシステムの浸透]] (対話とは我慢・目安箱・エベレスト・DS疲れ・警察よりFBサイクル)、[[デザインシステムのガバナンス]] (影のシステム・Yes-And拒否・公開決定ログ・オフィスアワー)、[[デザインシステムと組織構造]] (制度装置論・Cisco 3年・ビジョンの反復)、[[デザインシステムの強制と例外]] (Doctolib例外4条件・正当性問題・善意の警察)、[[デザインシステムの投資対効果]] (自治権5活動・語彙の翻訳)、[[デザインシステムの立ち上げ]] (Foursquare売り込み過小評価・m3巻き込み3原則)
結果: 「技術ではなく人とプロセスの問題」を軸に、①泥臭さの実相（説得の時間・我慢の対話・治安維持） ②調整の制度化（拒否の作法・例外の文書化・警察にならない設計） ③コミュニケーション自体がDSの本体（共通言語・巻き込み・FBサイクル）の3部で合成。
note保存: [[Q. デザインシステム運用の泥臭さとコミュニケーションはなぜ本体なのか]]

## [2026-07-25] ingest | Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props

touched: [[Astryx]] (新規), [[StyleX]] (新規), [[Model Context Protocol]] (新規), [[AI時代のデザインシステム]] (更新: 「構造化契約の実装第一号」節を追加), [[Storybook]] (更新: MCPリンク), summary: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props 要約]] (新規・summary層の初ページ)
要点: JSONマニフェストCLI（npx astryx manifest --json）がprops幻覚を「構造化仕様の問題」に変換。SO 2025調査で66%が「almost right」を最大の不満に。MCPサーバー同梱で互換環境から追加統合なしに接続可。StyleXでCSS約80%削減。ベータリスク（v0.1.6、bus factor 2、コンポーネント数矛盾90+/150+）

## [2026-07-25] lint

結果: 機械チェック全項目クリア（赤リンク0・オーファン0・index乖離0・type不一致0・Tags混入0・summary整合OK）。鮮度・矛盾も問題なし
未ページ化の頻出概念: Figma(36ページ言及・最有力), Knapsack(10), アトミックデザイン(5), shadcn/ui(3), Supernova(3) — ページ作成はユーザー判断待ち

## [2026-07-25] maintenance | summary層を主トピック別サブフォルダ化

スキーマ変更: summary ページの配置を Wiki/summary/<主トピック>/ に（主トピック = 先頭 topic/ タグの第1階層、タグ無しは 未分類/）。既存1ページを summary/AI/ へ移動（wikilink はフォルダ横断解決のため影響なし）

## [2026-07-25] 要約確認 | topic/デザインシステム の summary 一括生成（第1バッチ 30件中28件作成）

対象: topic/デザインシステム タグ記事289件（スライド系除外）のうち先頭30件。ユーザー指示による一括整備（まず30件で品質確認する二段階方式）
作成: summary/デザインシステム/ 22件・summary/AI/ 6件（サブエージェント5並列で全文読解→4〜5文要約）
スキップ2件: [[Brad Frost Is Atomic Design Dead – Hatch Conference Berlin 2023 - YouTube]]（埋め込みリンクのみ・トランスクリプト無し）、[[Charcoal 2.0 デザインシステムの基盤を再構築  Figma]]（プレビュー画像とCookieポリシーのみ）
クリップ品質の注意: [[AI × Turtle で実現する Vibe Coding：DMM デザインシステムを活用した新たな開発ワークフロー - DMM Developers Blog]]（無関係記事2本が混入）、[[AI時代のデザインリーダーシップ：手遅れになる前に物語を掴む  アンディ・バッド]]（冒頭欠落）→ 再クリップ推奨
修正: [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props 要約]] を summary/デザインシステム/AI/ → summary/デザインシステム/ へ移動（主トピック = 先頭タグ第1階層の規約に準拠、空フォルダ削除）
残り: 259件（ユーザーの品質確認後に続行）

## [2026-07-25] maintenance | summary 目次ページの試作

作成: [[デザインシステム 目次]]（Wiki/summary/ 直下）。summary/デザインシステム/ の21ページを記事の第2階層タグ（デザイントークン/配信基盤/コンポーネント設計/AI/全般）でグルーピングした人間閲覧用MOC。フォルダの第2階層サブフォルダ化の代替案として試作（タグ改変・ファイル移動なし、要約の増減に合わせて機械的に再生成する運用）。ユーザーが有効と判断したら AGENTS.md に目次ページの規約を追記予定

## [2026-07-25] maintenance | 目次を2軸見出し＋フック形式に改訂

[[デザインシステム 目次]] を topic第2階層 × type の2軸グルーピングに変更し、各項目に短い表示名とフック（一行説明）を付与。件数増加（全般だけで最終134件見込み）に備えた形式。ユーザーがフラットなリスト形式では件数増で見辛いと判断したため。今後の summary 生成時は表示名＋フックも同時に作成して目次へ追記する運用

## [2026-07-26] ingest | 運用の泥臭さ・コミュニケーション観点の3記事（SmartHRパネル / Yahoo 3つの心得 / 長谷川恭久サポート論）

touched: [[デザインシステムの浸透]] (更新), [[デザインシステムのガバナンス]] (更新), [[SmartHR Design System]] (更新), [[長谷川恭久]] (更新), index.md
要点: 「構築より浸透」の3つの心得（タックマンモデルのフェーズ診断・PM「何も変わってないじゃないか」事件とコンウェイの法則・繰り返し訴える・対話とは我慢=NIJIBOX登壇録と統合）、長谷川恭久の前提合わせ論（窓口4種の一長一短・「要件定義には関与しない」線引き・「持続がすべて」）、SmartHRブランド文脈の運用実態（「かき集め」運用・WIPの精神・自己評価20点・「血肉として使ってもらいたい」・メタ的なコミュニケーションデザイン）

## [2026-07-26] maintenance | ユーザーのタグ再編に伴う summary 層の追従

タグ再編の内容: (1) DTCG仕様系7記事を新トップレベル topic/デザイントークン へ独立（topic/デザインシステム/デザイントークン には実装系42記事が残存）、(2) デザインシステム/連合型DS 3記事を デザインシステム/ガバナンス へ統合（計8件）、(3) デザインシステム/AI → デザインシステム/AI活用 にリネーム
追従: [[Color Module - First Draft by adekunleoduye · Pull Request 147 · design-tokens-community-group · GitHub 要約]] を summary/デザインシステム/ → summary/デザイントークン/ へ移動（先頭タグ第1階層の変更のため）。[[デザインシステム 目次]] の見出し AI→AI活用、件数を20件/対象236件に更新、Color Module の項目を削除

## [2026-07-26] maintenance | bare topic/デザインシステム 144記事のタグ細分化（ユーザー承認済み）

タグ再編の内容: 下位タグ未設定の144記事を階層タグへ振り分け。新設6タグ = 導入事例38 / 運用・浸透30 / 批評・本質論24 / リファレンス21 / 戦略・スケーリング17 / デザイン原則3。既存タグへの振り分け = ドキュメント4 / 配信基盤1 / コンポーネント設計1 / ガバナンス1 / ROI1 / デザイントークン1。前セッション案の「AI連携・MCP」クラスタは既存の AI活用 タグで整理済みのため新設せず
bare のまま残置(2件): [[デザインシステム  UX TIMES]]（用語集の定義記事）、[[What Is a Design System  Design Systems 101  Figma Blog]]（中立的な101入門）——どのクラスタにも該当しないため

## [2026-07-26] maintenance | タグ細分化に伴う [[デザインシステム 目次]] の再生成

「全般」13件を新しい第2階層（導入事例6 / 運用・浸透1 / 戦略・スケーリング3 / リファレンス3）へ再グルーピング。対象記事数を236→265件に更新（スライド系除外の現時点カウント）

## [2026-07-26] maintenance | タグ統合: デザインシステム/ガバナンス + 戦略・スケーリング → 戦略・ガバナンス（ユーザー承認済み）

「システムの構造と決定権の設計」というリード層の意思決定テーマとして26記事を統合（ガバナンス9 + 戦略・スケーリング17）。連合型DS（旧ガバナンス）と Central/Local（旧戦略）の実質同テーマ分断を解消。[[デザインシステム 目次]] の見出しも追従

## [2026-07-26] maintenance | タグ解体: デザインシステム/デザイン原則（3件、ユーザー承認済み）

カタログサイト2件（Design Principles: A Free Library / Design Principles FTW）→ リファレンス、原則づくり論1件（「決める力」）→ 批評・本質論 へ振り分け。3件と少数で性質も割れていたため。タイトルに「デザイン原則」を含むためキーワード検索で代替可能

## [2026-07-26] maintenance | タグ統合: デザインシステム/ROI → 運用・浸透（5件、ユーザー承認済み）

効果測定・使用状況集計・ビジネスケース・ROI論の4記事+重複クリップ1を統合。効果測定も投資の正当化も「DSを回し続け価値を示す活動」として運用・浸透に包含。タイトルに共通キーワードがないため横断検索性は低下する点は提示済み

## [2026-07-26] maintenance | summary 層をタグ第2階層のサブフォルダ構成へ再編（ユーザー承認済み）

Wiki/summary/デザインシステム/ 直下の20ページを第2階層フォルダ（導入事例6 / 運用・浸透1 / 戦略・ガバナンス3 / リファレンス3 / デザイントークン2 / コンポーネント設計1 / AI活用1 / 配信基盤3）へ移動。AGENTS.md の配置ルールを `Wiki/summary/<主トピック>/<第2階層>/` に更新（第2階層が無い記事は主トピック直下）。タグ再編時はフォルダ移動で追従する規約も明記。[[デザインシステム 目次]] の説明文にフォルダ一致を追記

## [2026-07-26] maintenance | summary 再編の続き: AI/ 直下の誤配置4ページを デザインシステム/AI活用/ へ移動

先頭タグが topic/デザインシステム/AI活用 の4記事（Designer's Guide to Claude Code / Andy Budd リーダーシップ論 / AI and Design Systems / DMM AI-Turtle）の summary が Wiki/summary/AI/ に置かれていたのを規約（先頭タグ第1階層）どおり移動。[[デザインシステム 目次]] に4件を追加（AI活用: 実装1・その他3）、計20→24件に更新

## [2026-07-26] maintenance | 目次を各サブフォルダの 00_index.md に分割・type 見出しを廃止（ユーザー指示）

[[デザインシステム 目次]] を削除し、第2階層フォルダ8つに 00_index.md（フラットな要約一覧、type グルーピングなし）を配置。主トピック直下の 00_index.md は第2階層へのリンク+件数の一覧（aliases: [デザインシステム 目次] で旧リンクを維持）。AGENTS.md に 00_index 規約を追記

## [2026-07-26] 要約確認 | topic/デザインシステム/運用・浸透 の summary 一括生成（33件作成、対象35件中）

既存1件（361 佐藤伸哉）と空クリップ1件（使用状況集計の重複）を除く33記事の summary ページを Wiki/summary/デザインシステム/運用・浸透/ に作成（並列サブエージェント3バッチ）。クリップ欠損の注記: Design System Metrics（ROIセクション以降欠落）、デザインシステムのはじめかた（5サイクル中1つ目まで）。運用・浸透/00_index.md を34件で再生成、デザインシステム/00_index.md の合計を24→57件に更新

## [2026-07-26] maintenance | summary 本文のフォーマット規約追加と一括再フォーマット（ユーザー指示）

AGENTS.md の summary 層規約に「本文は1文ごとに改行（句点改行）、列挙が自然に登場する場合のみリスト化（無理なリスト化はしない）」を追記し、ページ本文テンプレートも更新。既存の summary 全62ページに句点改行を機械適用（perl、閉じ括弧・閉じ引用符の直前では改行しない）。00_index.md は対象外

## [2026-07-26] 要約確認 | topic/デザインシステム/批評・本質論 の summary 一括生成（23件作成、対象25件中）

スライド系1件（不可分の民藝 - Speaker Deck）と重複クリップ1件（The Design System You Actually Need の旧形式クリップ、同一URL）を除く23記事の summary ページを Wiki/summary/デザインシステム/批評・本質論/ に作成（並列サブエージェント2バッチ）。全ページ句点改行の新規約に準拠。批評・本質論/00_index.md を新規作成、デザインシステム/00_index.md の合計を57→80件に更新
補足: NIJIBOX 記事は Yahoo 水野直らの登壇録で既存 [[デザインシステムの浸透]] と内容が重なる（編纂候補）

## [2026-07-26] 要約確認 | topic/デザインシステム/戦略・ガバナンス の summary 一括生成（21件作成、対象25件中）

既存3件（A Global Design System / Multi-Platform DS 入門 / Central と Local モデル）と空クリップ1件（勢いを殺さないデザインシステムガバナンス Roberto Moreno Celta = 英語原文 Design System Governance That Doesn't Kill Momentum と同一URL、本文なし）を除く21記事の summary ページを Wiki/summary/デザインシステム/戦略・ガバナンス/ に作成（並列サブエージェント3バッチ）。全ページ句点改行に準拠。戦略・ガバナンス/00_index.md を24件で再生成、デザインシステム/00_index.md の合計を80→101件に更新
重複クリップの注記: SmartHR UI エコシステム 2（完全重複、差分は画像ファイル名のみ）、The Design System Ecosystem Big Medium（Brad Frost 同一記事の別掲載）、連合型デザインシステムの誤り（ネイサン・カーティス原文と Nobuya Sato 訳は同一原文）——各 summary に相互参照を明記

## [2026-07-26] 要約作成 | topic/デザインシステム/AI活用 + ドキュメント（一括29件）

touched: summary/デザインシステム/AI活用/ に20ページ新規（既存5と合わせ25件）、summary/デザインシステム/ドキュメント/ を新設し9ページ新規、両フォルダの 00_index.md 再生成、デザインシステム/00_index.md 更新（計130件）
要点: AI活用はMCP事例（Spindle/MFUI/エス・エム・エス/LayerX/Storybook公式）と「AIが読めるDS＝言語化された資産が差別化要因」論が主軸。ドキュメントは利用者視点の構造化・仕様とガイドラインの2層分離・命名論など
補足: 「デザイナーMCP入門：Cursor × Figma × Notionでレビュー効率化｜minto🍀｜Designer」はクリップ本文が空のため要約未作成（再クリップ要）

## [2026-07-26] 要約作成 | topic/デザインシステム/デザイントークン（一括31件）

touched: summary/デザインシステム/デザイントークン/ に31ページ新規（既存2と合わせ33件）、00_index.md 再生成、デザインシステム/00_index.md 更新（計161件）
要点: 命名体系（Nathan Curtis の4グループ、Nate Baldwin の Design API 論）、階層設計（Global/Alias/Component 3タイプ、過剰抽象化への警鐘）、Style Dictionary 実装事例（microCMS/弁護士ドットコム/B-43/DMM）、契約としてのトークン批判（Dow Jones）が主軸
補足（本文欠落によりスキップ・再クリップ要）: Color system – Material Design 3 / Design tokens - All tokens - Atlassian / Figmaからさまざまなカラートークンを生成 / spectrum token visualization tool / Nate Baldwin – Medium / StyleDictionary design-token-structure / ガバナンスのトラップにはまらないためのデザイントークン活用 / デザイナーとエンジニアの共通の語彙を持つために 第1回（ペイウォール）/ The Future of Design Systems is Semantic（Figma Blog、配置先は summary/ツール/Figma/ 予定だった）
補足（重複・誤クリップ）: 「When “semantic tokens” are no longer semantic」ピリオド有無2ファイルは同一記事→ピリオド有りにのみ要約作成。「Component-level Design Tokens are they worth it」はタイトルと本文が食い違う誤クリップ（本文は When “semantic tokens”… と同一）のため要約未作成

## [2026-07-26] 要約作成 | topic/デザインシステム/導入事例（一括23件）

touched: summary/デザインシステム/導入事例/ に23ページ新規（既存6と合わせ29件）、00_index.md 再生成、デザインシステム/00_index.md 更新（計184件）
要点: 国内事例（kintone/SmartHR/タイミー/ANDPAD/enechain/MIXI/一休/楽天カード/ラクマ/メルカリ/DMM/バイセル/MICIN/Gaudiy/KARTE/カナリークラウド）と海外・大組織事例（USWDS/Ubie/Serendie/OneSignal）。共通項は「小さく始めて実績で浸透」「押し付けない後付け戦略」「仕組み化・自動化への投資」
補足（本文欠落によりスキップ・再クリップ要）: Charcoal 2.0 デザインシステムの基盤を再構築（Figma Community ページ）/ スモールチームで始める、デザインシステムの第一歩（Gaudiy）/ デザインシステム改善 コンポーネント整理（LINEヤフー）/ みんなの銀行デザインシステム、始めました。
補足（クリップ混入・要約には支障なし）: 「ANDPAD Tsukuri」末尾に react-dropzone 記事、「入社10ヶ月で行った Turtle」後半に DMM TV Kotlin 記事が結合混入

## [2026-07-26] 要約作成 | topic/デザインシステム/リファレンス・コンポーネント設計・配信基盤（一括48件）

touched: summary/デザインシステム/リファレンス/ に14ページ新規（計17）、コンポーネント設計/ に11ページ新規（計12）、配信基盤/ に21ページ新規（計24）、summary/ツール/Figma/ を新設し2ページ新規、各 00_index.md 再生成＋ツール/00_index.md 新設、デザインシステム/00_index.md 更新（計230件）
要点: リファレンスは公開DS・チェックリスト・原則ライブラリの横断集。コンポーネント設計は「再利用の幻想」「ドメイン分離」「抽象度の弊害」などの設計論。配信基盤は npm パッケージング（exports/peerDeps/tree shaking）・Vite/Rollup ビルド・S3/CloudFront 構成の技術 Tips 集
補足（重複判定）: The Component Gallery ×4クリップ→主ファイルのみ要約。Open UI Checklist ×3→本文のある「2」のみ要約（主ファイルは空クリップ）。The Design System Guide ×2→両方空でスキップ
補足（本文欠落によりスキップ・再クリップ要）: vibes - freee design system / UIコンポーネント（Ionic 一覧）/ The Design System Guide ×2 / Brad Frost Is Atomic Design Dead（YouTube、文字起こしなし）/ reactjs - Code splitting and SSR（Stack Overflow、回答欠落）/ プロダクト支援チームでkintoneのStorybookをホスティングした話
補足（部分クリップ・混入、要約は作成済み）: tree shakeable なライブラリ / Rollup 実践教室（いずれも記事後半のみ）、TypeScript で npm パッケージを作る / d.tsをどうつくるか / aws s3 sync（別記事混入）

## [2026-07-26] メンテナンス | 空クリップ23件の削除（ユーザー指示）

touched: Articles/ から空・不完全クリップ23件を macOS ゴミ箱（~/.Trash/LLM Vault 空クリップ 2026-07-26/）へ移動。summary/リファレンス/Open UI Component Certified Checklist 2 要約 の重複クリップリンクを整理
対象: summary 一括作成（AI活用/ドキュメント/デザイントークン/導入事例/リファレンス/コンポーネント設計/配信基盤）でスキップした本文欠落クリップ全件。内訳は各回の log 参照
注意: [[Nate Baldwin – Medium]] [[Color system – Material Design 3]] [[StyleDictionary design-token-structure]] [[デザイナーとエンジニアの共通の語彙を持つために  第1回 デザイントークンとは]] は entity/concept ページの出典として引用されており赤リンク化（同名で再クリップすれば自動復元）。log.md 内の過去言及は追記専用のため未修正

## [2026-07-27] ingest | Clippings 一括処理（43記事）

対象: 2026-07-26 クリップの design systems 記事群43件。全件にタグ設定（topic のみ、type なし＝ユーザー指示）→ summary 42件作成（1件は既存流用）→ Articles へ移動。重複1件（Building Your Design System Workflow の複製）を削除、空ファイル（Why Atlassian Rebuilt Its Design System）は Clippings に残置。
touched: [[デザインエンジニアリング]] (新規), [[Atlassian Design System]] (新規), [[AI時代のデザインシステム]] (大幅更新 sources 12→28), [[デザインシステムのガバナンス]], [[デザインシステムの強制と例外]], [[デザインシステムと組織構造]], [[デザインシステムの世代交代]], [[Model Context Protocol]], [[Murphy Trueman]], [[DTCG]], [[セマンティックトークン]], [[デザイントークン]], [[デザイントークンの命名]], [[デザイントークンのツールチェーン]], [[カラーシステムの設計]], [[コンポーネント設計]], [[コンポーネントカタログ]], [[デザインシステムのドキュメンテーション]], [[ブランドとデザインシステム]], [[デザインシステムとアクセシビリティ]], [[存在論的負債]], [[デザインシステムの階層化]], [[デザインシステムの投資対効果]], [[デザインシステムの浸透]], [[デザインシステムの立ち上げ]], [[デザインシステムとは何か]], [[デザインシステム批判論]], [[デザインシステムの過剰設計]] (以上更新)
要点: AI/エージェント対応が最大の潮流（機械可読契約・$intent・evals・Skill化・「第3のオーディエンス」）。ガバナンス実務の収斂（Council 設計・リスク比例の摩擦・シャドウライブラリ=情報）、2026年の失敗統計（zeroheight 満足度低下・Gartner 幻滅期）、デザインエンジニアリング職能再編（Bridge Tax・ハンドオフ消滅）。summary 層の新フォルダ: 組織/デザインエンジニアリング, 組織/キャリア, デザイン/UIデザイン。

## [2026-07-27] query | ブログ「泥臭く進めるデザインシステム」の参考記事探索

参照: [[Q. デザインシステム運用の泥臭さとコミュニケーションはなぜ本体なのか]], [[Q. デザインシステムの4つのステレオタイプへの反証]], [[デザインシステムとは何か]], [[デザインシステムのガバナンス]], [[デザインシステムの過剰設計]], [[デザイン原則]], [[デザインエンジニアリング]]
結果: ブログ構成6節（キラキラ像vs現実／判断の外部委託／既存プロダクトへの理屈付け／コンポーネント化しない判断／ガバナンス／デザインテクノロジスト）に対応する参考記事マップを提示

## [2026-07-27] note保存 | ブログ「泥臭く進めるデザインシステム」の参考記事マップ

touched: [[Q. ブログ「泥臭く進めるデザインシステム」の参考記事マップ]] (新規), index.md (更新)
要点: 直前の query 結果をブログ執筆素材の note として保存。6節構成と参考記事の対応表

## [2026-07-27] query | ブログ参考記事の追加精査（第2弾）

参照: [[デザインシステムの浸透]], [[デザインシステムの強制と例外]], [[デザインシステムと組織構造]], [[デザインシステムの立ち上げ]], [[デザインシステムのドキュメンテーション]], [[デザインシステムの投資対効果]], [[デザインシステム批判論]], [[AI時代のデザインシステム]], [[kintone Design System]], [[SmartHR Design System]], [[長谷川恭久]], [[Nobuya Sato]]
結果: 新規候補15件＋控え4件を選抜し [[Q. ブログ「泥臭く進めるデザインシステム」の参考記事マップ]] に統合（全記事のファイル実在を検証済み）。Articles 層タグ検索では wiki 未編纂の重要記事なし

## [2026-07-27] query + note保存 | 判断の集積と外部委託としてのデザインシステム

参照: [[デザインシステムとは何か]], [[デザインシステムと組織構造]], [[デザインシステムのガバナンス]], [[デザインシステムのドキュメンテーション]], [[デザイン原則]], [[AI時代のデザインシステム]], [[デザインシステムの強制と例外]], [[Why Engineers Can Say “This Is Wrong” and Designers Can’t 要約]]
結果: テーゼを集積・委託・制度に3分解し、6観点＋コーダで記事を配置した note を保存: [[Q. 判断の集積と外部委託としてのデザインシステム]]。index.md 更新

## [2026-07-27] query + note保存 | ガバナンスと決定権を持つ推進者の重要性

参照: [[デザインシステムのガバナンス]], [[デザインシステムと組織構造]], [[デザインシステムの浸透]], [[デザインシステムの立ち上げ]], [[デザインシステムの強制と例外]], [[デザイン原則]]
結果: 決定権不在の帰結→オーナー論→国内実例（番長&大臣制・エベレスト）→決定機構（コンセント制・リスク比例の摩擦）→正当性→反例（SmartHR）と成立条件の6観点で記事を配置した note を保存: [[Q. ガバナンスと「決める人」——なぜ決定権を持つ推進者が要るのか]]。index.md 更新

## [2026-07-29] query | ブログ最終セクション「デザインテクノロジストの役割」の肉付け

参照: [[Q. 判断の集積と外部委託としてのデザインシステム]], [[Q. ガバナンスと「決める人」——なぜ決定権を持つ推進者が要るのか]], [[Q. デザインシステム運用の泥臭さとコミュニケーションはなぜ本体なのか]], [[Q. デザインシステムの4つのステレオタイプへの反証]], [[Q. ブログ「泥臭く進めるデザインシステム」の参考記事マップ]]
結果: 3小節（掘り起こしの主導／対応方針の検討／透明性のもとでの決断）を note の素材で肉付けしたドラフトを提示。引用元6件の対応表つき

## [2026-08-03] ingest | Clippings 一括処理 4件（AI Era / Component Library Trap / Atlassian Rebuilt / Just Honest）

touched: [[AI時代のデザインシステム]] (更新), [[Atlassian Design System]] (更新), [[デザインシステムの強制と例外]] (更新), [[デザインシステムとは何か]] (更新), [[デザインシステムのガバナンス]] (更新), [[セマンティックトークン]] (更新)
要点: compound design system（DESIGN.md 制約3層、DS=実行可能な制約システム）／Atlassian の AI-native 前基盤再構築（SoT統合・Core/Platform/App 3層・「AIが読める前提は人が信頼できる標準」）／例外=意思決定の化石記録・ドリフト予算化（Just Honest）／部品在庫 vs 組み立てルールの欠落4層・paved road・リテラル値ダークモード3ヶ月（Component Library Trap）
処理: topic タグ付与・summary 4件作成（批評・本質論+2 / AI活用+1 / 導入事例+1）・Articles へ移動・各 00_index と index.md 更新

## [2026-08-03] query | 社内向けデザインシステムのドキュメント構成の参考情報

参照: [[デザインシステムのドキュメンテーション]], [[コンポーネントカタログ]]
結果: 質問軸の構成・2オーディエンス分離・negative space・最速の代替手段との競争・意思決定の記録・置き場所の使い分けを合成して回答

## [2026-08-03] note保存 | Q. 社内向けデザインシステムのドキュメント構成論

touched: [[Q. 社内向けデザインシステムのドキュメント構成論]] (新規), index.md (更新)
要点: 直前の query 回答を note 化。質問軸の構成・2オーディエンス分離・negative space・最速の代替手段・意思決定の記録・置き場所

## [2026-08-12] query | Meta Astryx のAI活用事例

参照: [[Astryx]], [[AI時代のデザインシステム]], [[Model Context Protocol]], [[Meta's Astryx Returns to GitHub Trending JSON Manifest Stops AI Agents From Hallucinating UI Props 要約]]
結果: JSONマニフェストによるAPI幻覚の抑制、MCP経由のAIコーディング環境との接続、LLM向けコンテキスト最適化、構造化されたプロジェクト生成・コンポーネント参照・テーマ生成の事例として整理

## [2026-08-12] 新規クリップ処理 | Open Knowledge Format 関連2件

touched: [[Open Knowledge Format]] (新規), [[Model Context Protocol]] (関連ページ更新), [[OKF（Open Knowledge Format）の仕様を整理してみた 要約]] (新規), [[Open Knowledge Format のご紹介  Google Cloud 公式ブログ 要約]] (新規), [[AI/00_index|AI 目次]] (新規), index.md
要点: OKF v0.1はLLM-wikiを移植可能にするオープンな知識形式。Knowledge Bundle=ディレクトリ、Concept=YAML frontmatter付きMarkdown、必須はtypeのみ。未知のtype・フィールド・壊れたリンクを許容する寛容な消費モデルと、index/log/Citationsの規約を持つ
処理: 2記事に topic/AI を先頭タグとして設定し、summary作成・ingest後に Articles へ移動
