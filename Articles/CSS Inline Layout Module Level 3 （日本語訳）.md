---
Created: 2025-02-14T00:57:00
URL: https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-alphabetic
Tags: [topic/技術/CSS]
---
| 名前 | `line-fit-edge` |
| --- | --- |
| [値](https://triple-underscore.github.io/css-values-ja.html#value-defs) | [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading)| [<text-edge>](https://triple-underscore.github.io/css-inline-ja.html#typedef-text-edge) |
| [初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-values) | [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) |
| [適用対象](https://triple-underscore.github.io/css-cascade-ja.html#applies-to) | [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box) |
| [継承](https://triple-underscore.github.io/css-cascade-ja.html#inherited-property) | される |
| [百分率](https://triple-underscore.github.io/css-values-ja.html#percentages) | 受容しない |
| [算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed) | 指定されたキーワード |
| [正準的順序](https://triple-underscore.github.io/cssom-ja.html#serializing-css-values) | 文法に従う |
| [アニメーション型](https://triple-underscore.github.io/web-animations-ja.html#animation-type) | 離散的 |

 ［ ／ ］にが正ならばそれを足した結果を利用する。 ［ マージン／パディング／ボーダー ］は、 をサイズする目的にいては無視される。    ［ ／ ］辺として［  ／  ］基底線を利用する。    辺として  基底線を利用する。    辺として  基底線を利用する。    ［ [上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over)／[下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) ］辺として［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline) ／ [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline) ］基底線を利用する。  `ideographic-ink`  ［ [上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over)／[下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) ］辺として［ [ideographic-ink-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-ink-over-baseline) ／ [ideographic-ink-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-ink-under-baseline) ］基底線を利用する。  `alphabetic`  [下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under)辺として [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線を利用する。 

[`text`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-text) は［ アセント／ディセント ］計量用の適理な名前なのか — もっと良い名前は？ 同じく， [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) はキーワードとしてはどうなのか？ [課題 #8067](https://github.com/w3c/csswg-drafts/issues/8067)

[`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) が [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) の場合を除き、 ボックスの［ マージン, パディング, ボーダー ］も[レイアウト限界域](https://triple-underscore.github.io/css-inline-ja.html#layout-bounds)に供与される。 （ `leading` の事例では、 ボックスの自前の [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) がアキ組を追加するために利用される。）

注記： 値［ [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) ／ [`text`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-text) ］は、 フォントの［ [アセント計量](https://triple-underscore.github.io/css-inline-ja.html#ascent-metric), [ディセント計量](https://triple-underscore.github.io/css-inline-ja.html#descent-metric) ］に依拠することで，テキストが必ず収まるようにする。 他の値は、 指定された計量を超えるアセント【またはディセント】（発音区別符用のそれなど）により［ 重なり合う／過フローする ］結果になる見込みが高い。 なので，これらの値を利用している作者は、 その分に足るアキ組をテキスト用に供するよう — 特に，複言語な文脈においては — 気を付ける必要がある。

![](https://triple-underscore.github.io/css-inline/text-edge.png)

Three different values of the line-fit-edge property.

注記： [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) が [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) のときは、 【計量が異なる複数のフォントが利用されている】段落の中で［ フォント計量／縦方向の整列 ］が変化するたびに縦方向の rhythm は崩れ得る。 【行ボックスの論理縦幅がまちまちになり得る。】

他の値は、 もっと一貫した行アキ組を与える見込みが高い — [根行内ボックス](https://triple-underscore.github.io/css-inline-ja.html#root-inline-box)に対する[半行アキ](https://triple-underscore.github.io/css-inline-ja.html#half-leading)として、［ そのすべての子孫に指定された計量を収容する大きさ ］に十分な量が追加されている限り。 それでも，行ボックスを過フローすることになる場合には、 行どうしが重なり合うのを避けるため，内容を収容するよう拡幅されることになる。

注記： 正な[半行アキ](https://triple-underscore.github.io/css-inline-ja.html#half-leading)に適用される値は， [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) に限られるが、 負な[半行アキ](https://triple-underscore.github.io/css-inline-ja.html#half-leading)には， テキストを詰めて組むことを許容するため，すべての値が適用される — [§ 行内ボックスが供与する論理縦幅の計算法](https://triple-underscore.github.io/css-inline-ja.html#inline-height)を見よ。 半行アキは、 テキストの両側に等しく適用される — 作者は、 重なり合いをより精確に制御したいなら， 影響されるテキストに対し [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) 用の値 [`text`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-text) を負な[マージン](https://triple-underscore.github.io/css-box-ja.html#margin)と一緒に利用できる。

### 5.3. 行内ボックスが供与する論理縦幅（ “レイアウト限界域” ）の計算法

[行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box) ボックス の レイアウト限界域 とは、 ボックス が それを成す【各】[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)に供与する[論理縦幅](https://triple-underscore.github.io/css-writing-modes-ja.html#logical-height)である。 以下に述べるとおり，それは、 常に ボックス の自前のテキスト計量を基準に計算され， 【 ボックス の】［ [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge), [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) ］により制御される。 ボックス の子ボックスの［ サイズ, 位置 ］は、 この[レイアウト限界域](https://triple-underscore.github.io/css-inline-ja.html#layout-bounds)には波及しない （ ボックス の自前の[論理縦幅](https://triple-underscore.github.io/css-writing-modes-ja.html#logical-height)にも — それに関しては [`inline-sizing`](https://triple-underscore.github.io/css-inline-ja.html#propdef-inline-sizing) を見よ）。

注記： [レイアウト限界域](https://triple-underscore.github.io/css-inline-ja.html#layout-bounds)は、 ボックスの各[辺](https://triple-underscore.github.io/css-box-ja.html#box-box-edge)に対応する必要はない。

[行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box) ボックス の[レイアウト限界域](https://triple-underscore.github.io/css-inline-ja.html#layout-bounds)を見出すため、 UA は，最初に［ ボックス 内に*直に包含されている* すべてのグリフを，それらの[支配的な基底線](https://triple-underscore.github.io/css-inline-ja.html#dominant-baseline)により互いに整列する ］ものとする （ [§ グリフとボックスの各種基底線](https://triple-underscore.github.io/css-inline-ja.html#baseline-tables)を見よ）。 ボックス がフォールバックフォントに属するグリフしか包含しない場合、 ボックス は［ ボックス に[可用な最初のフォント](https://triple-underscore.github.io/css-fonts4-ja.html#first-available-font)の計量を伴う， 支柱 （送り幅 0 の不可視なグリフ） ］を包含するものと見なされる。

各グリフ（ [支柱](https://triple-underscore.github.io/css-inline-ja.html#_strut)も含む）に対し，［ A ／ D ］は、 グリフの[基底線](https://triple-underscore.github.io/css-inline-ja.html#baseline)より［ 上を成すアセント／下を成すディセント ］を表現する。 [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) が異なる計量を利用するものと指定しない限り、［ A ／ D ］は，（所与のフォントサイズにおける所与のフォント用の）［ [アセント計量](https://triple-underscore.github.io/css-inline-ja.html#ascent-metric)／[ディセント計量](https://triple-underscore.github.io/css-inline-ja.html#descent-metric) ］を参照する — どちらも，[支配的な基底線](https://triple-underscore.github.io/css-inline-ja.html#dominant-baseline)の 0 からの【 [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線からの？】オフセットを織り込むよう調整される。

行内ボックス ボックス の[レイアウト限界域](https://triple-underscore.github.io/css-inline-ja.html#layout-bounds)は、 ボックス の [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) の算出値に応じて：

-  
[`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-height-normal) の場合：
    - ボックス 内のすべてのグリフを封入する — それらの最も高い A から 最も深い D までまたがるよう （同じボックス内には異なるフォントのグリフが混在し得るので、 すべてのグリフが同じ A, D にならないかもしれないことに注意）。
    - 加えて， ボックス が次を満たす場合、 当のフォントの[行隙間計量](https://triple-underscore.github.io/css-inline-ja.html#line-gap-metric)も — その各半分を各側に[半行アキ](https://triple-underscore.github.io/css-inline-ja.html#half-leading)として加算することにより — A, D の中に組み入れられてもよい ：［ [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) は [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) ］**∨**［ [根行内ボックス](https://triple-underscore.github.io/css-inline-ja.html#root-inline-box)である ］
-    
他の場合、 ボックス に[可用な最初のフォント](https://triple-underscore.github.io/css-fonts4-ja.html#first-available-font)のみの計量から（他のフォントに属するグリフは無視して）導出され，次を正確に封入する：
    - （基底線より上における）実質的なアセント ＝ A + HL
    - （基底線より下における）実質的なディセント ＝ D + HL
ここで：
    - A, D は、 ボックス に[可用な最初のフォント](https://triple-underscore.github.io/css-fonts4-ja.html#first-available-font)のそれら
    -     
半行アキ （ half-leading ）と呼ばれる HL は、 次の結果として計算される ：( [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) の使用値 − ( A + D ) ) ÷ 2
（これは、［ アセント, ディセント ］を その合計が [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) の使用値になるまで加算するよう調整する。）
しかしながら， ボックス が次を満たす場合、 0 以上の HL は 0 として扱う ：［ [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) は [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) でない ］**∧**［ [根行内ボックス](https://triple-underscore.github.io/css-inline-ja.html#root-inline-box)でない ］
注記： HL は負にもなり得る。
[半行アキ](https://triple-underscore.github.io/css-inline-ja.html#half-leading) HL の 2 倍は 行アキ （ leading ）と称される。 【この訳では、この用語は利用せず，もっぱら半行アキを利用して述べているが。】

加えて， [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) は [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) でない場合、 [レイアウト限界域](https://triple-underscore.github.io/css-inline-ja.html#layout-bounds)は，各側に対し［ [マージン](https://triple-underscore.github.io/css-box-ja.html#margin), [ボーダー](https://triple-underscore.github.io/css-box-ja.html#border), [パディング](https://triple-underscore.github.io/css-box-ja.html#padding) ］の総和だけ膨張される。 負な[マージン](https://triple-underscore.github.io/css-box-ja.html#margin)も実際に効果があることを許容するため、 [レイアウト限界域](https://triple-underscore.github.io/css-inline-ja.html#layout-bounds)には，同じ[行内整形文脈](https://triple-underscore.github.io/css-inline-ja.html#inline-formatting-context)に関与している各子孫[行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)の負な[マージン](https://triple-underscore.github.io/css-box-ja.html#margin)も累積される。

Quirks Mode [[QUIRKS]](https://triple-underscore.github.io/css-inline-ja.html#biblio-quirks) においては、 [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)を成す[断片](https://triple-underscore.github.io/css-break-ja.html#fragment)のうち次を満たすものは，[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)のサイズ法においては無視される ：［ ボーダーは 0 ］**∧**［ パディングは 0 ］**∧**［ テキストも[保全空白](https://triple-underscore.github.io/css-text-ja.html#preserved-white-space) [[CSS-TEXT-3]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css-text-3) も直に包含しない ］

## 6. テキスト［上面／下面］における行アキの削り

[テキスト連列](https://triple-underscore.github.io/css-display-ja.html#css-text-sequence)の基本的な事例において，一貫したアキ組を確保するため、 CSS による行レイアウトは，各行を成すテキスト内容の［ 上, 下 ］両者に行アキを導入する — 行において [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) を確保する必要に応じて。 加えて， フォント計量の［ アセント ／ ディセント ］自身も、［ 代表的な限界域を［ 上／下 ］へ超える，ある種の文字や発音区別符 ］を収容するために，最も代表的なグリフ図形の［ 上／下 ］に余分な空間を含めることが多い。 これは、 隣接するテキスト行が互いに重なり合うのを防止する。 しかしながら，この余分なアキ組は、 あらゆる［ 視覚的な整列, 実質的な（目に見える）アキ組に対する制御 ］に干渉する。

[`text-box`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box) プロパティは、［ ブロックを成す［ 最初の行／最後の行 ］の［ 上／下 ］に対する，この追加のアキ ］を削ることを — それにより，グリフ周りのアキ組を より精確に制御することを — 許容する。 この特能は、［ コードに直書きされた長さではなく，フォント計量に依拠する ］ことにより，［ 各種フォントにおいて内容を［ サイズし直して／折り返し直して ］描画することになっても，精確なアキ組を保守する ］ことを許容する。

よくある問題は縦方向の中央寄せである。 テキストコンテナを あるアイコンに対し縦方向に中央寄せにすることは容易であるが、 ラテンテキストの視覚的な境界は［ アセント, ディセント ］ではなく［ [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline), [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) ］基底線なので，意図される視覚効果が得られないことが多い。

![](https://triple-underscore.github.io/css-inline/leading-trim-centering-fail.png)

テキストの［ 上端／下端 ］を測定した結果は等しくなっても、 視覚的な限界域を測定した結果は視覚的に中央寄せにされない。

画像の右端に配置され，画像の上端と下端の間で中央寄せにされたラテンテキストを考える。 画像の上端からテキストボックスの上端まで測定した結果は 13px になり， 画像の下端からテキストボックスの下端まで測定した結果も同様に 13px になるので、 理論的には，テキストは正確に中央寄せにされる。 しかしながら， 画像の上端から cap-height まで測定した結果は 21px, 画像の下端から alphabetic 基底線まで測定した結果は 19px になり、 テキストは実際には視覚的に中央寄せにされないことになる。 Consider some Latin text placed to the right of an image, to be centered between its top and bottom. Measuring from the top of the image to the top of the text box yields 13px; likewise measuring from the bottom of the image to the bottom of the text box yields 13px, theoretically perfectly centering the text. However, measuring from the top of the image to the cap-height yields 21px; and measuring from the bottom to the alphabetic baseline yields 19px, showing that visually the text is not actually centered.

テキストを視覚的に中央寄せにするためには、［ [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) ／ [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) ］基底線がテキストの［ 上端／下端 ］辺を成すと見做すことが必要とされる。

![](https://triple-underscore.github.io/css-inline/leading-trim-centering-goal.png)

［ アセント／ディセント ］の代わりに［ [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) ／ [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) ］基底線を測定して，それらの距離を等しくすることで、 テキストを視覚的に中央寄せにする。 Measuring to the cap height / alphabetic baseline instead of the ascent / descent and equalizing those distances visually centers the text.

テキストが視覚的に中央寄せにされたなら、［ 画像の上端から cap-height までの距離 ］と［ 画像の下端から alphabetic 基底線までの距離 ］は，等しく 20px になる。 If the text were visually centered, the distance between the top of the image and the cap height would be 20px, and the distance between the bottom of the image and the alphabetic baseline would be equally 20px.

[`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) を利用して［ [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) 基底線より上, [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線より下 ］にあるアキを剥ぎ取ることにより、 ボックスを中央寄せにしたとき — どのフォントを利用して描画されるかに関わらず，依拠可能に — テキストを実際に中央寄せにする。

[cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) はフォントごと異なっていても、 場当たり的な数ではなくフォントの計量を利用することにより，フォントが変更されてもレイアウトの意図は満たされる。

### 6.1. テキストボックス削り用の略式： `text-box` プロパティ

| 名前 | `text-box` |
| --- | --- |
| [値](https://triple-underscore.github.io/css-values-ja.html#value-defs) | [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-normal) | [<'](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim)[`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim)['>](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) || [<'](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge)[`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge)['>](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) |
| [初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-values) | [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-normal) |
| [適用対象](https://triple-underscore.github.io/css-cascade-ja.html#applies-to) | [ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)／[行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box) |
| [継承](https://triple-underscore.github.io/css-cascade-ja.html#inherited-property) | されない |
| [百分率](https://triple-underscore.github.io/css-values-ja.html#percentages) | 受容しない |
| [算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed) | 指定されたキーワード |
| [正準的順序](https://triple-underscore.github.io/cssom-ja.html#serializing-css-values) | 文法に従う |
| [アニメーション型](https://triple-underscore.github.io/web-animations-ja.html#animation-type) | 離散的 |

このプロパティは、［ [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim), [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) ］プロパティを単独の宣言で設定するための[略式プロパティ](https://triple-underscore.github.io/css-cascade-ja.html#shorthand-property)である。

キーワード `normal` のみが指定された場合、［ [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) を [`none`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-none), [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) を [`auto`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-edge-auto) ］に設定する。 他の場合 ：[`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) 用の値が省略された場合，それを [`trim-both`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-trim-both) （初期値でない）に設定する。 `text-box-edge` 用の値が省略された場合，それを [`auto`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-edge-auto) （初期値）に設定する。

例を追加する。

### 6.2. テキスト［上面／下面］における削り： `text-box-trim` プロパティ

| 名前 | `text-box-trim` |
| --- | --- |
| [値](https://triple-underscore.github.io/css-values-ja.html#value-defs) | [`none`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-none) | [`trim-start`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-trim-start) | [`trim-end`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-trim-end) | [`trim-both`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-trim-both) |
| [初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-values) | [`none`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-none) |
| [適用対象](https://triple-underscore.github.io/css-cascade-ja.html#applies-to) | [ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)／[行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box) |
| [継承](https://triple-underscore.github.io/css-cascade-ja.html#inherited-property) | されない |
| [百分率](https://triple-underscore.github.io/css-values-ja.html#percentages) | 受容しない |
| [算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed) | 指定されたキーワード |
| [正準的順序](https://triple-underscore.github.io/cssom-ja.html#serializing-css-values) | 文法に従う |
| [アニメーション型](https://triple-underscore.github.io/web-animations-ja.html#animation-type) | 離散的 |

- [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)に対しては ：[内容ボックス](https://triple-underscore.github.io/css-box-ja.html#content-box)を［ [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) により指定された計量に合致する ］よう削るかどうかを指定する。 詳細は [§ 行内ボックスが供与する論理縦幅の計算法](https://triple-underscore.github.io/css-inline-ja.html#inline-height)を見よ。
- [ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)に対しては ：当のボックス — それが[複 column コンテナ](https://triple-underscore.github.io/css-multicol-ja.html#multi-column-container)である場合は、 それを成す各 [column ボックス](https://triple-underscore.github.io/css-multicol-ja.html#column-box) — の内容の［ 始端／終端 ］にて[半行アキ](https://triple-underscore.github.io/css-inline-ja.html#half-leading)を削るかどうかを指定する — ボックスの[内容辺](https://triple-underscore.github.io/css-box-ja.html#content-edge)とテキスト内容とがより良く合致するよう。 この事例で［ 始端, 終端 ］辺のうち どこで削られるかは、 影響される[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)の[包含ブロック](https://triple-underscore.github.io/css-display-ja.html#containing-block)の [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) の値により指定される。

各種 値の意味は：

`none`  [ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)に適用される場合 ：［ 最初／最後 ］の[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)に対する特別な取り扱いは無い。   [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)に適用される場合 ：［ 上面／下面 ］[内容辺](https://triple-underscore.github.io/css-box-ja.html#content-edge)が［ [text-over](https://triple-underscore.github.io/css-inline-ja.html#text-over-baseline) ／ [text-under](https://triple-underscore.github.io/css-inline-ja.html#text-under-baseline) ］基底線に一致するよう指定する — [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) に関わらず。  `trim-start`  [ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)に対しては ：当のボックス — それが[複 column コンテナ](https://triple-underscore.github.io/css-multicol-ja.html#multi-column-container)である場合は、 それを成す各 [column ボックス](https://triple-underscore.github.io/css-multicol-ja.html#column-box) — の[整形される最初の行](https://triple-underscore.github.io/css-pseudo-ja.html#first-formatted-line)の［ ボックスの[ブロック始端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-start) ］側を［ ボックスの[根行内ボックス](https://triple-underscore.github.io/css-inline-ja.html#root-inline-box)に指定された [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) 計量 ］まで削る — ただし，次の場合には、 効果は無い ：そのような行は無い／ 0 でない［ パディング／ボーダー ］が間に挟まれている   [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)に対しては ：ボックスの[ブロック始端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-start)側を［ ボックスの[内容辺](https://triple-underscore.github.io/css-box-ja.html#content-edge)が [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) により指定された計量に合致する ］まで削る。  `trim-end`  [ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)に対しては ：当のボックス — それが[複 column コンテナ](https://triple-underscore.github.io/css-multicol-ja.html#multi-column-container)である場合は、 それを成す各 [column ボックス](https://triple-underscore.github.io/css-multicol-ja.html#column-box) — の整形される最後の行の［ ボックスの[ブロック終端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-end) ］側を［ ボックスの[根行内ボックス](https://triple-underscore.github.io/css-inline-ja.html#root-inline-box)に指定された [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) 計量 ］まで削る — ただし，次の場合には、 効果は無い ：そのような行は無い／ 0 でない［ パディング／ボーダー ］が間に挟まれている   [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)に対しては ：ボックスの[ブロック終端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-end)側を［ ボックスの[内容辺](https://triple-underscore.github.io/css-box-ja.html#content-edge)が [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) により指定された計量に合致する ］まで削る。  `trim-both`  ［ [`trim-start`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-trim-start), [`trim-end`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-trim-trim-end) ］のふるまいを同時的に指定する。 

注記： このプロパティは、 [`::first-line`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-line) と同様に，［ flex ／格子／テーブル ］[整形文脈](https://triple-underscore.github.io/css-display-ja.html#formatting-context)に適用されることも，それらを通して伝播することもない。

注記： [`writing-mode`](https://triple-underscore.github.io/css-writing-modes-ja.html#propdef-writing-mode) が [`vertical-lr`](https://triple-underscore.github.io/css-writing-modes-ja.html#valdef-writing-mode-vertical-lr) の下では、 [ブロック終端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-end)側と[行下面](https://triple-underscore.github.io/css-writing-modes-ja.html#line-under)側は一致しない。

複数の先祖[ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)から同じ[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)の同じ【上面, 下面いずれかの】側を削るよう要請された場合、 利用される計量は， それらのうち最も内縁なもの【の [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) ？】になる。

注記： [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) が初期値以外をとることに因り，ある［ ボックス／行ボックス ］を過フローしている［ 内容, インク ］は、 他の場合に過フローする内容と同じに取り扱われる。

[`::first-line`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-line) と違って、 このプロパティが[複 column コンテナ](https://triple-underscore.github.io/css-multicol-ja.html#multi-column-container)を成す［ 整形される最初（最後）の行 ］に適用されるときは、 当のコンテナを成す*各* [column ボックス](https://triple-underscore.github.io/css-multicol-ja.html#column-box)を成す［ 整形される最初（最後）の行 ］に適用される。

当の column が [spanner](https://triple-underscore.github.io/css-multicol-ja.html#multi-column-spanner) により分割された場合、 何が起こるか？ [課題 #11363](https://github.com/w3c/csswg-drafts/issues/11363)

[`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) が適用されたボックスが[断片化](https://triple-underscore.github.io/css-break-ja.html#fragmentation) [[CSS-BREAK-3]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css-break-3) により分割されたとき， 削りが適用される対象が断片ごとなのか［ 最初の断片の始端辺／最後の断片の終端辺 ］に限られるのかは、 [`box-decoration-break`](https://triple-underscore.github.io/css-break-ja.html#propdef-box-decoration-break) により決定される。

印刷しているときに[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)を削った場合， その内容が切り取られる原因になるので、 UA は，[`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) を［ 当の[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)の削られる辺 ］に対しては無視してもよい。

### 6.3. テキスト削り計量： `text-box-edge` プロパティ

| 名前 | `text-box-edge` |
| --- | --- |
| [値](https://triple-underscore.github.io/css-values-ja.html#value-defs) | [`auto`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-edge-auto) | [<text-edge>](https://triple-underscore.github.io/css-inline-ja.html#typedef-text-edge) |
| [初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-values) | [`auto`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-edge-auto) |
| [適用対象](https://triple-underscore.github.io/css-cascade-ja.html#applies-to) | [ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)／[行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box) |
| [継承](https://triple-underscore.github.io/css-cascade-ja.html#inherited-property) | される |
| [百分率](https://triple-underscore.github.io/css-values-ja.html#percentages) | 受容しない |
| [算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed) | 指定されたキーワード |
| [正準的順序](https://triple-underscore.github.io/cssom-ja.html#serializing-css-values) | 文法に従う |
| [アニメーション型](https://triple-underscore.github.io/web-animations-ja.html#animation-type) | 離散的 |

このプロパティは、 [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) の効果用に利用する計量を指定する。 【 <text-edge> を成す】各値の意味は、 [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) 用の値と同じである。 キーワード `auto` は、 [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) の値を — その[初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-value) [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-leading) を [`text`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-fit-edge-text) として解釈した上で — 利用する。

注記： このプロパティは、 [`text-box`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box) [略式プロパティ](https://triple-underscore.github.io/css-cascade-ja.html#shorthand-property)において， [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) と一緒に設定され得る。 [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) と違って，このプロパティは継承されないが、 その[初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-value)は， [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) から複製されることにより継承される。

### 6.4. 行内ボックスを描くときの縦幅： `inline-sizing` プロパティ

| 名前 | `inline-sizing` |
| --- | --- |
| [値](https://triple-underscore.github.io/css-values-ja.html#value-defs) | [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-inline-sizing-normal) | [`stretch`](https://triple-underscore.github.io/css-inline-ja.html#valdef-inline-sizing-stretch) |
| [初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-values) | [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-inline-sizing-normal) |
| [適用対象](https://triple-underscore.github.io/css-cascade-ja.html#applies-to) | [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box) — ただし、 [ルビコンテナボックス](https://triple-underscore.github.io/css-ruby-ja.html#ruby-container), [内部ルビボックス](https://triple-underscore.github.io/css-ruby-ja.html#internal-ruby-boxes)を除く |
| [継承](https://triple-underscore.github.io/css-cascade-ja.html#inherited-property) | される |
| [百分率](https://triple-underscore.github.io/css-values-ja.html#percentages) | 受容しない |
| [算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed) | 指定されたキーワード |
| [正準的順序](https://triple-underscore.github.io/cssom-ja.html#serializing-css-values) | 文法に従う |
| [アニメーション型](https://triple-underscore.github.io/web-animations-ja.html#animation-type) | 離散的 |

このプロパティは、［ [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)の[内容区画](https://triple-underscore.github.io/css-box-ja.html#content-area)の[論理縦幅](https://triple-underscore.github.io/css-writing-modes-ja.html#logical-height)は、 その内容との関係において，どう測定されるか ］を指定する。 これには、［ ボックスの内容／[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)／その他の内容 ］のサイズや位置に対する効果は無い。

この名前は【 [`inline-size`](https://triple-underscore.github.io/css-logical-ja.html#propdef-inline-size) と】混同されやすい。 新たな名前が必要である。 あるいは、 これを [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) の中へ組み入れるか？ [課題 #5189](https://github.com/w3c/csswg-drafts/issues/5189)

各種値の意味は：

`normal`  [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)の[内容区画](https://triple-underscore.github.io/css-box-ja.html#content-area)は、 内容を成すテキストに[可用な最初のフォント](https://triple-underscore.github.io/css-fonts4-ja.html#first-available-font) （場合によっては、 仮のそれ【[支柱](https://triple-underscore.github.io/css-inline-ja.html#_strut)】） が収まるようにサイズされ, 位置される。 [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) が削りを指示する場合、 それに指定された計量を利用するものとする — 他の場合、 この仕様では，その方法は指定されない。 UA は、 例えば，フォントの最大［ アセンダ／ディセンダ ］を利用してもよい （これは、 em ボックスの［ 上／下 ］に はみ出るグリフも内容区画の中に入りきることを確保するが、 ボックスのサイズはフォントごとにまちまちになり得る）。  注記： 複数のフォントが利用される場合でも （利用するグリフが異なるフォント内に見出されたときに起こる）、 [内容区画](https://triple-underscore.github.io/css-box-ja.html#content-area)の[論理縦幅](https://triple-underscore.github.io/css-writing-modes-ja.html#logical-height)は，フォールバックフォントに属するグリフからは影響されず，[可用な最初のフォント](https://triple-underscore.github.io/css-fonts4-ja.html#first-available-font)のみに依存する。 しかしながら，これらのフォールバックグリフは、 [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) が [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-line-height-normal) のときには，依然として，[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)のサイズに影響し得る — [§ 行内ボックスが供与する論理縦幅の計算法](https://triple-underscore.github.io/css-inline-ja.html#inline-height)を見よ。  `stretch`  [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)が属する[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)が［ [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-inline-sizing-normal) のときと同じにサイズされ, その内容が位置された後 ］に、 行内ボックスの各[辺](https://triple-underscore.github.io/css-box-ja.html#box-box-edge)は，その［ [上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over)／[下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) ］[マージン辺](https://triple-underscore.github.io/css-box-ja.html#margin-edge)が行ボックスの対応する各辺に一致するようずらされる — [ブロック軸](https://triple-underscore.github.io/css-writing-modes-ja.html#block-axis)おいて、 行内ボックスの[内縁サイズ](https://triple-underscore.github.io/css-sizing-ja.html#inner-size)は，その[外縁サイズ](https://triple-underscore.github.io/css-sizing-ja.html#outer-size)が[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)を埋めるように伸張される （行内ボックスの[フロー内](https://triple-underscore.github.io/css-display-ja.html#in-flow)にある内容の［ サイズ, 位置 ］は影響されない。） 

注記： [`height`](https://triple-underscore.github.io/css-sizing-ja.html#propdef-height) プロパティは、 [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)には適用されない。

注記： [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) による[行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)のサイズに対する影響は無い。 それが影響するのは、 [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)が[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)の[論理縦幅](https://triple-underscore.github.io/css-writing-modes-ja.html#logical-height)に[供与するサイズに限られる](https://triple-underscore.github.io/css-inline-ja.html#inline-height)。

## 7. 先頭字

【 この節に現れる［ [始端](https://triple-underscore.github.io/css-writing-modes-ja.html#css-start)／[終端](https://triple-underscore.github.io/css-writing-modes-ja.html#css-end) ］は、 他が指定されない限り，[行内軸](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-axis)のそれを指す。 】

非西欧用字系における埋没頭字の例を寄せていただけるとありがたい — とりわけ，インド語群用字系における。

### 7.1. 先頭字 序論

*この節は規範的ではない。*

テキストの新たな節を開始する，大きい装飾的な字°は、 印刷法が発明される前から利用されてきた。 事実、 それらは，小文字による字°の登場以前から利用されている。 【字°（ letter ）とは、[タイポグラフィック字°単位](https://triple-underscore.github.io/css-text-ja.html#typographic-letter-unit)の略称。】

### 7.1.1. 埋没先頭字

埋没頭字 （ dropped initial — “drop initial”, “drop cap” とも呼ばれる）とは、［ その基底線が，段落の最初の基底線より何行分か低い ］ような，［ 段落の開始における，通例より大きい字° ］【であって，後述するように、その基準点が後続する文字たちの基準点に整列されるもの】である。 埋没頭字のサイズは、 通例的にはそれが占める行数により指示される。 2 行分／ 3 行分 を占める埋没頭字はごく共通にある。

![](https://triple-underscore.github.io/css-inline/Dropcap-E-acute-3line.png)

図 1. E acute による 3 行分の埋没頭字。 埋没頭字の [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) と，後続するテキストの [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) とが整列するので、 アクセント記号は段落の上へ拡幅される。 Three-line drop initial with E acute. Since the cap-height of the drop initial aligns with the cap-height of the main text, the accent extends above the paragraph.

[埋没頭字](https://triple-underscore.github.io/css-inline-ja.html#dropped-initial)の正確なサイズ／位置は，そのグリフの整列に依存する。 埋没 cap 上の基準点は、 テキスト内の基準点と精確に整列されるものとする。 埋没頭字用の整列の拘束は、 書記体系に依存する。

西欧用字系においては、 上端基準点は［ 先頭字／ テキストの最初の行 ］の [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) になる。 下端基準点は［ 先頭字の [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線／ テキストの N 本目の行の基底線 ］になる。 次の図に，単純な 2 行分の埋没 cap を示す。

![](https://triple-underscore.github.io/css-inline/Dropcap-lines.png)

図 2. 2 行分の埋没 cap 。 緑色線は 基底線／ 赤色線は [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) ／ 水色線は アセンダ。 Two-line drop cap showing baselines (green lines), cap-height (red line), and ascender (cyan line).

埋没 cap が整列される様子 drop cap showing alignment

漢字から派生した用字系においては、 先頭字は最初の行上のグリフの[ブロック始端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-start)辺から N 本目の行上のグリフの[ブロック終端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-end)辺まで拡幅される。

![](https://triple-underscore.github.io/css-inline/Initial-2line-JapaneseVertical.png)

図 3. 縦組みにおける 2 行分の埋没頭字

縦書き日本語における先頭字 Japanese Vertical Initial

ある種のインド語群用字系においては、 上端整列点は [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) 基底線になり, 下端整列点は text-after-edge になる。

![](https://triple-underscore.github.io/css-inline/Devangari-Initial.png)

図 4. [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) 基底線に整列されたデヴァーナーガリー[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)。 整列点は赤色で示されている。 Devanagari initial letter aligned with hanging baseline. Alignment points shown in red.

### 7.1.2. 沈み込み先頭字

テキストの最初の行に整列しないスタイルによる埋没頭字もある。 沈み込み頭字 （ sunken initial — “sunken cap” とも呼ばれる） は、 最初の基底線の下へ沈み込みつつ, テキストの最初の行から上へ拡幅する。

![](https://triple-underscore.github.io/css-inline/SunkenCapA.png)

sunken drop initial

### 7.1.3. 持ち上げ先頭字

持ち上げ頭字 （ raised initial — “raised cap”, “stick-up cap” とも呼ばれる）は、 最初のテキスト基底線まで “沈み込む” 。

注記： 適正に持ち上げられた頭字には、 単に最初の字°のフォントサイズを増やす以上にいくつか利点がある。 まず、 段落の残りの部分における行アキ組は 改められないまま，テキストは大きなディセンダの周りに排他されることになる。 また、 持ち上げ頭字のサイズが行の整数倍として定義された場合，暗黙的な基底線格子も保守される。

![](https://triple-underscore.github.io/css-inline/RaisedCap.png)

持ち上げ cap 。 先頭字は、 3 行分の頭字のサイズであるが、 沈み込まない。

### 7.2. 先頭字の選択法

*この節は規範的ではない。*

先頭字は、 概して単独の字°である — 利用者からは単独のタイポグラフィック単位に見える［ 約物／複数個の文字からなる並び ］を［ 【追加で】含む／含む ］こともあるが。 [[SELECT]](https://triple-underscore.github.io/css-inline-ja.html#biblio-select), [[CSS-PSEUDO-4]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css-pseudo-4) にて定義される [`::first-letter`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-letter) 疑似要素を利用すれば、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)として整形される文字（たち）を選択できる。

作者は、 先頭字に含ませる文字について更なる制御が必要なとき, あるいは 先頭字の整形を［ [置換され](https://triple-underscore.github.io/css-display-ja.html#replaced-element)る要素／複数の単語 ］にも適用したいと求めるならば、 [ブロックコンテナ](https://triple-underscore.github.io/css-display-ja.html#block-container)の最初の[行内レベル](https://triple-underscore.github.io/css-display-ja.html#inline-level)の子に [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) プロパティを適用することもできる。

```plain text
<p>当段落には 埋没される “当” がある。
<p><img alt="ここ" src="illuminated-h.svg">には 飾り付けられる “ここ” がある。
<p><span>段落始めの単語たち</span>にも先頭字スタイルをあてがうことができる。

```

```plain text
::first-letter, /*
最初の段落の先頭の “当” にスタイルをあてがう
 */
img, /*
飾り付けられた “ここ” にスタイルをあてがう
 */
span /*
span の内容にスタイルをあてがう
 */
{ initial-letter: 2; }

```

[`::first-letter`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-letter) 疑似要素が利用されたときは、 最初の字°の前後の約物も選択し，それらの文字も[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)に含まれることに注意。

[`::first-letter`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-letter) 疑似要素は、 "M" に加えて引用符も選択する。

このふるまいを任意で外す仕方もあるべきか？ [課題 #310](https://github.com/w3c/csswg-drafts/issues/310) を見よ。

### 7.3. 先頭字の作成法： `initial-letter` プロパティ

| 名前 | `initial-letter` |
| --- | --- |
| [値](https://triple-underscore.github.io/css-values-ja.html#value-defs) | [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-normal) | [<number [1,∞]>](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-number) [<integer [1,∞]>](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-integer) | [<number [1,∞]>](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-number) && [ [`drop`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-drop) | [`raise`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-raise) ]? |
| [初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-values) | [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-normal) |
| [適用対象](https://triple-underscore.github.io/css-cascade-ja.html#applies-to) | ある種の行内レベルのボックス ／ [`::first-letter`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-letter) ボックス ／ [内側に位置された](https://triple-underscore.github.io/css-lists-ja.html#valdef-list-style-position-inside) [`::marker`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-marker) ボックス （[注釈文を見よ](https://triple-underscore.github.io/css-inline-ja.html#first-most-inline-level)） |
| [継承](https://triple-underscore.github.io/css-cascade-ja.html#inherited-property) | されない |
| [百分率](https://triple-underscore.github.io/css-values-ja.html#percentages) | 受容しない |
| [算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed) | キーワード [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-normal) ／ 実数と整数が成すペア |
| [正準的順序](https://triple-underscore.github.io/cssom-ja.html#serializing-css-values) | 文法に従う |
| [アニメーション型](https://triple-underscore.github.io/web-animations-ja.html#animation-type) | 算出された値型による |

このプロパティは、［ 埋没／持ち上げ／沈み込み ］[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)が［ [占める行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-size), [沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink) ］を指定する。

例えば次のコードは、 `h2` の直後にある段落に， 2 行分の埋没先頭字を作成することになる：

```plain text
h2 + p::first-letter { initial-letter: 2; }

```

このプロパティは、 次に挙げる値をとる：

`normal`  特別な先頭字効果はなし。 テキストは通常どおりふるまう。  [<number [1,∞]>](https://triple-underscore.github.io/css-values-ja.html#number-value)  先頭字のサイズを，それが 占める行数 により定義する。 1 未満の値は 無効とする。  [<integer [1,∞]>](https://triple-underscore.github.io/css-values-ja.html#integer-value)  省略可能なこの引数は、 先頭字が 沈み込む行数 を定義する。 値 1 は [持ち上げ頭字](https://triple-underscore.github.io/css-inline-ja.html#raised-initial)を指示する。 1 を超える値は [沈み込み頭字](https://triple-underscore.github.io/css-inline-ja.html#sunken-initial)を指示する。 1 未満の値は 無効とする。  `raise`  先頭字が[沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink)は、 1 に算出される。  `drop`  先頭字が[沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink)は、 先頭字が[占める行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-size)を超えない最大な正な整数に算出される。 

[沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink)用の値が省略された場合、 [`drop`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-drop) があるものと見做される。

[`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-normal) 以外の値は、 影響されるボックスを 先頭字ボックス にする — それは、 [フロー内](https://triple-underscore.github.io/css-display-ja.html#in-flow)にある[行内レベルのボックス](https://triple-underscore.github.io/css-display-ja.html#inline-level-box)であり，特別なレイアウトのふるまいも伴う。

[`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) の用例をいくつか示す：

[`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `3` [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `3 3` [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `3 drop` [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `drop 3`   高さ 3 行分, 深さ 3 行分を表現する[埋没頭字](https://triple-underscore.github.io/css-inline-ja.html#dropped-initial)：    [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `3 2`   高さ 3 行分, 深さ 2 行分を表現する[沈み込み頭字](https://triple-underscore.github.io/css-inline-ja.html#sunken-initial)：    [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `3 1` [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `3 raise` [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `raise 3`   高さ 3 行分, 深さ 1 行分を表現する[持ち上げ頭字](https://triple-underscore.github.io/css-inline-ja.html#raised-initial)：    [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter): `2.51 3`   先頭字のサイズは、 1 行分の整数倍でない。 この事例では、 上端のみに整列される。   

`initial-letter` と他の CSS プロパティを併用すれば、 テキストに “隣接する先頭字” を作成できる：

```plain text
p::first-letter {
  initial-letter: 3;
  color: red;
  width: 5em;
  text-align: right;
  margin-left: -5em;
}

p {
  margin-left: 5em;
}

```

### 7.3.1. 適用能

どの文字を[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)としてスタイルできるかについての制御を 作者にもっと与えるため, および 複数文字からなる先頭字（最初の単語や句をスタイルするためなど）の可能性も許容するため、 [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) プロパティは — CSS 定義な [`::first-letter`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-letter) 疑似要素のみならず — 最初の行の始端に配置される［ [内側に位置された](https://triple-underscore.github.io/css-lists-ja.html#valdef-list-style-position-inside) [`::marker`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-marker) 疑似要素／[行内レベルのボックス](https://triple-underscore.github.io/css-display-ja.html#inline-level-box) ］にも適用される。 具体的には、 `initial-letter` は， **∧**↓ を満たすボックスに適用される：

- [行内レベルのボックス](https://triple-underscore.github.io/css-display-ja.html#inline-level-box)である — ［ [`::first-letter`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-letter) ／ [`::marker`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-marker) ］によるそれも含めて。
- 親ボックスの最初の子である。
- 先祖のうち, ボックスの[包含ブロック](https://triple-underscore.github.io/css-display-ja.html#containing-block)の子孫であるものは、 どれも，次を満たす ：［ 前に挙げた両条件とも満たす ］**∧**［ [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) の[算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed-value)は [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-normal) ］

次の例においては、［ `span`, `em`, `b` ］要素が 上述した “始端に配置される行内レベルのボックス” に該当し， `strong` 要素はそうでない：

```plain text
<p><span><em><b>この</b>句</em>は、
<strong>特別にスタイルされている</strong>。</span>残りのテキストは定例のスタイルである…


```

次の規則を適用した場合：

```plain text
em { initial-letter: 2; }
b, strong { initial-letter: 3; }

```

[`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) プロパティの効果は `em` に限られる。 `b` 用のスタイルは無視される — その先祖がすでに[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)としてスタイルされているので。 `strong` 用のスタイルは無視される — それは 2 個目の同胞なので。

描画される結果は、 次のようになるであろう：

は、 **特別にスタイルされている**。残りのテキストは定例のスタイルである… 2 行分の先頭字を伴うテキスト

行内レベルのボックスが［ 双向性並び替え／行内レベルの他の内容が先行している ］ことに因り，行の[始端](https://triple-underscore.github.io/css-writing-modes-ja.html#css-start)に位置しない場合、 それに適用される [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) の[使用値](https://triple-underscore.github.io/css-cascade-ja.html#used-value)は [`normal`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-normal) になり，ボックスは[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)として整形されなくなるとする。

[`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) プロパティの効果は、［ [ルビ基底コンテナボックス](https://triple-underscore.github.io/css-ruby-ja.html#ruby-base-container-box)の子／[ルビコンテナボックス](https://triple-underscore.github.io/css-ruby-ja.html#ruby-container) ］に対しては，定義されない。

注記： [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) プロパティは、［ [`float`](https://triple-underscore.github.io/css2-ja.html#propdef-float) が `none` でない ／ [`position`](https://triple-underscore.github.io/css-position-ja.html#propdef-position) が `static` でない ］要素には適用できない。 これらの値は、 [`display`](https://triple-underscore.github.io/css-display-ja.html#propdef-display) を `block` に算出させるので。

### 7.4. 先頭字の整列： `initial-letter-align` プロパティ

先に言及したように、 先頭字の整列は，利用される用字系に依存する。 [`initial-letter-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-align) プロパティは、 適正な整列を指定するときに利用できる。

| 名前 | `initial-letter-align` |
| --- | --- |
| [値](https://triple-underscore.github.io/css-values-ja.html#value-defs) | [ [`border-box`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-border-box)? [ [`alphabetic`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-alphabetic) | [`ideographic`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-ideographic) | [`hanging`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-hanging) | [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-leading) ]? ]! |
| [初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-values) | [`alphabetic`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-alphabetic) |
| [適用対象](https://triple-underscore.github.io/css-cascade-ja.html#applies-to) | ある種の行内レベルのボックス ／ [`::first-letter`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-letter) ボックス ／ [内側に位置された](https://triple-underscore.github.io/css-lists-ja.html#valdef-list-style-position-inside) [`::marker`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-marker) ボックス （[注釈文を見よ](https://triple-underscore.github.io/css-inline-ja.html#first-most-inline-level)） |
| [継承](https://triple-underscore.github.io/css-cascade-ja.html#inherited-property) | される |
| [百分率](https://triple-underscore.github.io/css-values-ja.html#percentages) | 受容しない |
| [算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed) | 指定されたキーワード（たち） |
| [正準的順序](https://triple-underscore.github.io/cssom-ja.html#serializing-css-values) | 文法に従う |
| [アニメーション型](https://triple-underscore.github.io/web-animations-ja.html#animation-type) | 離散的 |

このプロパティは、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)を サイズする／位置する ために利用される整列点を指定する。 整列点の集合が 2 つ必要とされる： [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の ( [上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over), [下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) ) 整列点は、 [根行内ボックス](https://triple-underscore.github.io/css-inline-ja.html#root-inline-box)の対応する ( [上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over), [下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) ) 整列点に合致される。

各種値の意味は：

`alphabetic`  周囲のテキストの ( [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline), [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) ) 基底線を利用して，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)を整列する。  `ideographic`  周囲のテキストの ( [ideographic-ink-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-ink-over-baseline), [ideographic-ink-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-ink-under-baseline) ) 基底線を利用して，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)を整列する。  `hanging`  周囲のテキストの ( [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline), [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) ) 基底線を利用して，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)を整列する。  `leading`  周囲のテキストの［ 上面／下面 ］[半行アキ](https://triple-underscore.github.io/css-inline-ja.html#half-leading)辺 （すなわち，［ [アセント計量](https://triple-underscore.github.io/css-inline-ja.html#ascent-metric)／[ディセント計量](https://triple-underscore.github.io/css-inline-ja.html#descent-metric) ］ + [半行アキ](https://triple-underscore.github.io/css-inline-ja.html#half-leading)） を利用して，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)を整列する。   注記： これは，本質的には、 [先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の［ 上面／下面 ］辺を，次に合致させることになる ：影響が及ぶ［ 最初／最後 ］の行とその［ 前／次 ］の行の隙間の真中  
 この効果は、 [インド語群の植字](https://www.w3.org/TR/ilreq/#h_scripts_without_hanging_baseline)における ある種の活字に，ときどき利用される。 [[ILREQ]](https://triple-underscore.github.io/css-inline-ja.html#biblio-ilreq)   `border-box`  [先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の ( [行上面](https://triple-underscore.github.io/css-writing-modes-ja.html#line-over), [行下面](https://triple-underscore.github.io/css-writing-modes-ja.html#line-under) ) [ボーダー辺](https://triple-underscore.github.io/css-box-ja.html#border-edge)を， ( [上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over), [下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) ) 整列点として利用する。 

縦組みにおける 2 行分の埋没頭字 （ § 7.1.1. [図 3](https://triple-underscore.github.io/css-inline-ja.html#f3) の縦組みの例）は、 次のコードでも可能になる：

```plain text
span.initial {
  initial-letter: 2;
  initial-letter-align: ideographic;
}

```

[`border-box`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-border-box) が指定された場合を除いて、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の各 整列点は、 その内容から自動的に決定される：

1. [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は[不可分な行内](https://triple-underscore.github.io/css-display-ja.html#atomic-inline)であるならば ：内容ボックスの ( [上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over), [下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) ) 辺を利用する。
2. 他の場合，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は [Unicode 用字系](https://triple-underscore.github.io/css-text-ja.html#unicode-script)［ 漢字／ハングル／仮名／イ文字 ］に属する文字を包含するならば ：( [ideographic-ink-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-ink-over-baseline), [ideographic-ink-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-ink-under-baseline) ) 基底線を利用する。
3.  
他の場合，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は [Unicode 用字系](https://triple-underscore.github.io/css-text-ja.html#unicode-script)［ デヴァーナーガリー／ベンガル語／グルムキー文字 ］†に属する文字を包含するならば ：( [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline), [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) ) 基底線を利用する。
【† 原文には前段と同じ［ 漢字／ハングル／仮名／イ文字 ］と記されているが、 更新時の誤りと見受けられるので，元の記述を残してある。 】
4. 他の場合 ：( [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline), [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) ) 基底線を利用する。

ヘブライ語やタイ語などの用字系における先頭字の正しい整列は、 OpenType が対応する計量を欠いているので，現時点では可能でない。 （ [課題 #5244](https://github.com/w3c/csswg-drafts/issues/5244) ）

注記： このプロパティにおける各キーワードの順序付けは、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の整列点を明示的に指定できるようにするため， [`border-box`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-border-box) が [ border-box | alphabetic | ideographic | hanging ] に展開される事例【？】においては，固定される。

### 7.4.1. `initial-letter-align` 用の UA の既定のスタイルシート

より良い既定のふるまいを供するため、 UA は，自身の既定の UA スタイルシートに 次の規則を含めるものとする：

```plain text
[lang]:lang(zh, ja, ko, ii) {
  initial-letter-align: ideographic;
}
[lang]:lang(hi, mr, ne, pi, kok, brx, mai, sd, sa) {
  initial-letter-align: hanging;
}
/*
用字系タグは、
言語タグを上書きする：
 */
[lang]:lang('*-Latn', '*-Cyrl') {
  initial-letter-align: alphabetic;
}
[lang]:lang('*-Hani', '*-Hant', '*-Hans') {
  initial-letter-align: ideographic;
}

```

これは、 最もよくある言語間転写システム（ cross-linguistic transcription system ）しか受け持っていない。 他の, あるいは すべての用字系タグを UA スタイルシートに含めるべきか？

### 7.5. 先頭字のレイアウト

[先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は、 次の 2 種に大別される：

 行内先頭字   [可分な行内](https://triple-underscore.github.io/css-display-ja.html#inline-box)から発生するもの。 ボックスとその内容は，それが生じた行と同じ[行内整形文脈](https://triple-underscore.github.io/css-inline-ja.html#inline-formatting-context)に関与し、 期待されるサイズ法と整列を与えるため，いくつもの特別な規則が適用される。   不可分な先頭字  [不可分な行内](https://triple-underscore.github.io/css-display-ja.html#atomic-inline)から発生するもの。 不可分な行内は［ [置換され](https://triple-underscore.github.io/css-display-ja.html#replaced-element)るか，自身の内容用に[独立な整形文脈](https://triple-underscore.github.io/css-display-ja.html#independent-formatting-context)を確立する ］ので、 ボックスの［ サイズ法, ボックスの中での内容のレイアウト ］は，（[ブロック軸](https://triple-underscore.github.io/css-writing-modes-ja.html#block-axis)における，[自動的サイズ](https://triple-underscore.github.io/css-sizing-ja.html#automatic-size)は別として）通例の規則に従う。 それは主に、 ボックスの位置決めを特別にするためにある。 

### 7.5.1. 先頭字に適用されるプロパティ

[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)には、 次に挙げるプロパティが適用される：

- 各種[サイズ法プロパティ](https://triple-underscore.github.io/css-sizing-ja.html#sizing-property), [`box-sizing`](https://triple-underscore.github.io/css-sizing-ja.html#propdef-box-sizing) [[css-sizing-3]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css-sizing-3)
- 加えて，[行内先頭字](https://triple-underscore.github.io/css-inline-ja.html#inline-initial-letter)に対しては、 [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)に適用されるすべてのプロパティ — ただし、 次に挙げるものは除く ：[`vertical-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-vertical-align) とその[下位プロパティ](https://triple-underscore.github.io/css-cascade-ja.html#longhand), [`font-size`](https://triple-underscore.github.io/css-fonts4-ja.html#propdef-font-size), [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height), [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge), [`inline-sizing`](https://triple-underscore.github.io/css-inline-ja.html#propdef-inline-sizing)
- また，[不可分な先頭字](https://triple-underscore.github.io/css-inline-ja.html#atomic-initial-letter)に対しては、 [不可分な行内](https://triple-underscore.github.io/css-display-ja.html#atomic-inline)に適用されるすべてのプロパティ — ただし、 次に挙げるものは除く ：[`vertical-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-vertical-align) とその[下位プロパティ](https://triple-underscore.github.io/css-cascade-ja.html#longhand)

### 7.5.2. マージン, ボーダー, パディング

他のボックスと同じく、 先頭字も［ [マージン](https://triple-underscore.github.io/css-box-ja.html#margin), [パディング](https://triple-underscore.github.io/css-box-ja.html#padding), [ボーダー](https://triple-underscore.github.io/css-box-ja.html#border) ］でスタイルできる。 [`initial-letter-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-align) が [`border-box`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-border-box) でない限り，その［ 縦方向の整列／ [フォントサイズ法](https://triple-underscore.github.io/css-inline-ja.html#sizing-initial-letter) ］には影響されない。 しかしながら、 実質的な排他区画 — 概して，[先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の[マージンボックス](https://triple-underscore.github.io/css-box-ja.html#margin-box)（ [`initial-letter-wrap`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-wrap) を見よ） — は影響される。

ボーダーもパディングも 0 の場合、 先頭字は字詰めされ得る（後述）。

### 7.5.3. 先頭字のフォントサイズ法

[行内先頭字](https://triple-underscore.github.io/css-inline-ja.html#inline-initial-letter)に対しては、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)を成す内容のサイズ法に利用されるフォントサイズ（使用値）は，［ 先頭字の [`initial-letter-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-align) に指定された整列点を起点にする下で， [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) に指定された［ 先頭字が[占める行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-size) ］を充足する ］ように計算される。 この[使用値](https://triple-underscore.github.io/css-cascade-ja.html#used-value)の計算は、 算出値, フォント計量のみに基づき，レイアウトは要求されないことに注意。 この計算は、 [`font-size`](https://triple-underscore.github.io/css-fonts4-ja.html#propdef-font-size) の[算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed-value)には*影響しない*ので， [`em`](https://triple-underscore.github.io/css-values-ja.html#em) 単位の長さ値, 等々の算出にも効果は無い。

子孫への継承についてはどうなる？ （ [課題 #4988](https://github.com/w3c/csswg-drafts/issues/4988) ）

これらの計算に利用される行高さは、 包含ブロックの [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) である （または、 [基底線格子](https://drafts.csswg.org/css-line-grid/#line-grid) [[CSS-LINE-GRID-1]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css-line-grid-1) が利用中にある所では，基底線格子により要求される［ 基底線から次の【行の】基底線まで ］のアキ組による）。 行の内容による span — それらの高さや位置における変動 — は、 織り込まれない。

西欧用字系における N 行分の埋没頭字用の，字°の [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) は［ ( N − 1 ) × 行高さ + 周囲のテキストの [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) ］だけ必要になる。 この高さは、 埋没頭字のフォントサイズではないことに注意。

このフォントサイズの計算法は実際に込み入っている。 N 行分の埋没頭字用の埋没頭字フォントサイズは、 次の式で見出される：

> 埋没 cap のフォントサイズ = ( ( N − 1 ) × 行高さ + ( 段落の
> [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline)
> 
> [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline)

【† 何に対する比率か不明。 ［ [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) から [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) までの距離 ］ ÷ em ボックス （あるいは フォントサイズ ／ 行高さ ）？ 】

この計算を更新する： (1) 各種［ 書記体系や整列点 ］にわたって汎用になるよう ／ (2) 整数でないサイズを取り扱うよう。

Adobe Minion Pro における 3 行分の埋没頭字は、［ フォントサイズ 12pt, 行高さ 16pt , [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) 651/1000 ］のテキストが与えられた下では，約 61.2pt になる（フォントの OS/2 テーブルによる）。 【 61.2pt = ( ( 3 − 1 ) × 16pt + 0.651 × 12pt ) ÷ 0.651 = 32pt ÷ 0.651 + 12pt 】

[不可分な先頭字](https://triple-underscore.github.io/css-inline-ja.html#atomic-initial-letter)用の使用フォントサイズは、 通例どおり，算出フォントサイズになる。

### 7.5.4. グリフの選定と形状付け

[`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) が `normal` でないときでも、 [行内先頭字](https://triple-underscore.github.io/css-inline-ja.html#inline-initial-letter)はグリフ形状付け用に隔離される。 しかしながら，後続するテキストは、 [行内先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#inline-initial-letter)の境界をまたがるように — 当の先頭字は、 最初の行のテキスト内容の一部を成すと見做して — 形状付けられるべきである （ [[CSS-TEXT-3]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css-text-3) [§ 要素境界をまたがる形状付け](https://triple-underscore.github.io/css-text-ja.html#boundary-shaping)を見よ）。 例えば，【ペルシャ語の】単語 “يحق” の最初の字°が [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter)`: 2 1` でスタイルされている場合：

- 最初の字°は、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)として隔離形（ isolated form ） “ي” でスタイルされる。
- それでも，後続するテキストは、 先頭字の内容が通常のテキストとして先行していると見做され，［ 尾字形（ final-form ）／ 中字形（ medial-form ） “ﺤﻖ” ］になる【頭字形（ initial-form ）にはならない】。

アラビア語による， 2 行分の埋没 cap

### 7.5.5. 先頭字ボックスのサイズ法

[行内先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#inline-initial-letter) 先頭字 に対しては、 先頭字 の［ [選好横幅](https://triple-underscore.github.io/css-sizing-ja.html#width)／[選好縦幅](https://triple-underscore.github.io/css-sizing-ja.html#height) ］は[確定的](https://triple-underscore.github.io/css-sizing-ja.html#definite)である場合、 先頭字 の その次元には，その値を利用する （必要なら、 先頭字 の［ [最小サイズプロパティ](https://triple-underscore.github.io/css-sizing-ja.html#min-size-properties), [最大サイズプロパティ](https://triple-underscore.github.io/css-sizing-ja.html#max-size-properties) ］により切り詰めて， 先頭字 の [`box-sizing`](https://triple-underscore.github.io/css-sizing-ja.html#propdef-box-sizing) も取り扱った上で）。

他の場合， 先頭字 の[内容ボックス](https://triple-underscore.github.io/css-box-ja.html#content-box)は、 その次元においては[自動的サイズ](https://triple-underscore.github.io/css-sizing-ja.html#automatic-size)と見なされ，次のすべてが収まるようサイズされる：

- 先頭字 に指定された[沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink) （すなわち、［ 上面整列点, 下面整列点 ］の合間を成す空間）
- 先頭字 が[不可分な行内](https://triple-underscore.github.io/css-display-ja.html#atomic-inline)を包含するならば、 それらの[マージンボックス](https://triple-underscore.github.io/css-box-ja.html#margin-box)
-     
先頭字 が包含する各グリフのうち［ [ぶら下がる](https://triple-underscore.github.io/css-text-ja.html#hang)もの（ [`hanging-punctuation`](https://triple-underscore.github.io/css-text-ja.html#propdef-hanging-punctuation) を見よ）以外 ］のグリフ外形線
先頭字のグリフ（たち）は、 常に，指定された沈み込み量の中に収まるとは限らない。 例えば、 先頭字のディセンダは，テキストの N + 1 行目にもぶつかることがある。 これは，望ましくない。
 不正な例：ディセンダを伴う 3 行分の先頭字 （ [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter)`: drop 3` ）。 このフォントでは、 大文字 “J” が基底線（図の赤線）から下へ はっきり拡幅している。
したがって、 [沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink)の範囲のみならず，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)のグリフ外形線による影響が及ぶすべての[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)を【先頭字ボックスから】排他する必要がある。
 正しい例： テキストは、 グリフ限界ボックスの周囲に排他される

しかしながら， 先頭字 の[ブロック始端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-start)における［ [パディング](https://triple-underscore.github.io/css-box-ja.html#padding), [ボーダー](https://triple-underscore.github.io/css-box-ja.html#border) ］がどちらも 0 の場合、 先頭字 の[ブロック始端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-start)[内容辺](https://triple-underscore.github.io/css-box-ja.html#content-edge)は， 代わりに 先頭字 の[上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over)整列点に正確に一致する — その整列点より上へ過フローしている内容は、 レイアウトの目的においては無視される。

注記： [行内先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#inline-initial-letter) 先頭字 【を成すいずれかのグリフ】に[上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over)整列点をはみ出るアセンダがあって，作者が その分に足る[マージン](https://triple-underscore.github.io/css-box-ja.html#margin)を［ 先頭字 または 先頭字 の[包含ブロック](https://triple-underscore.github.io/css-display-ja.html#containing-block) ］に供さなかった場合、 それらのアセンダは，先行している内容に衝突するかもしれない。

注記： 必要とされるアキ組が自動的に供されれば，いいかもかもしれない — そのようなアセンダを［ 包含ブロックのマージンと相殺し得るようなマージン ］として扱うことにより。 そうなれば、 要求されたアキ組は — 実際に必要とされない限り，追加の空間を課すことなく — 保証される。 実装の複雑さに依存して，このオプションは将来に探究されるであろうが、 当面の間は，作者は［ 要求されたアキ組を明示的に供する ］よう気を付ける必要がある。

代わりに，ぶら下がる約物は、 ボックスに含めつつ，ボックスを位置するときに限り含めないべきか？ （すなわち、 ボーダーや背景を通して可視になるとき，ボックスが約物の周りに描かれるようにしつつ、 【行の終端に】接合する先頭字はそうあり続け，ぶら下がる約物は適正にぶら下がるようにする） — [課題 #310](https://github.com/w3c/csswg-drafts/issues/310) における論点を見よ。

[不可分な先頭字](https://triple-underscore.github.io/css-inline-ja.html#atomic-initial-letter)用のサイズ法は、 各型の[不可分な行内](https://triple-underscore.github.io/css-display-ja.html#atomic-inline)用の通例の規則に従う。 ただし，そのようなボックスの[ブロックサイズ](https://triple-underscore.github.io/css-writing-modes-ja.html#block-size)は、 [自動的サイズ](https://triple-underscore.github.io/css-sizing-ja.html#automatic-size)（ [`auto`](https://triple-underscore.github.io/css-sizing-ja.html#valdef-width-auto) ）である場合には， [`border-box`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-align-border-box) 整列を伴う[行内先頭字](https://triple-underscore.github.io/css-inline-ja.html#inline-initial-letter)と同じように決定され，[確定的](https://triple-underscore.github.io/css-sizing-ja.html#definite)になる。

### 7.5.6. 先頭字ボックスの中の整列

既定では（すなわち，[自動的サイズ](https://triple-underscore.github.io/css-sizing-ja.html#automatic-size)の下では）、 [行内先頭字](https://triple-underscore.github.io/css-inline-ja.html#inline-initial-letter)の内容ボックスは，その内容が正確に収まるようにサイズされ、 [`text-align`](https://triple-underscore.github.io/css-text-ja.html#propdef-text-align) や [`align-content`](https://triple-underscore.github.io/css-align-ja.html#propdef-align-content) の様な整列プロパティは適用されない。 しかしながら，ボックスが自動的に*サイズされない*場合：

- [行内サイズ](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-size)が[確定的](https://triple-underscore.github.io/css-sizing-ja.html#definite)である場合、［ [行内軸](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-axis)において，ボックスの中で[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の内容を整列する ］ときには， [`text-align`](https://triple-underscore.github.io/css-text-ja.html#propdef-text-align) は尊守される （それを成すグリフ外形線の限界ボックスではなく，通例どおり行内軸の bearing 【位置関係？】を利用して）。
- [ブロックサイズ](https://triple-underscore.github.io/css-writing-modes-ja.html#block-size)が[確定的](https://triple-underscore.github.io/css-sizing-ja.html#definite)である場合、［ [ブロック軸](https://triple-underscore.github.io/css-writing-modes-ja.html#block-axis)において，ボックスの中で[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の内容を整列する ］ときには， [`align-content`](https://triple-underscore.github.io/css-align-ja.html#propdef-align-content) は尊守される （必要なら，ブロック軸の bearing を合成した上で利用する）。

### 7.6. 先頭字の位置決めとアキ組

### 7.6.1. ブロック軸における位置決め

[ブロック軸](https://triple-underscore.github.io/css-writing-modes-ja.html#block-axis)においては、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter) 先頭字 は — それが[出自にしている行ボックス](https://triple-underscore.github.io/css-inline-ja.html#originating-line)を基準に — 先頭字 に指定された［ 整列（ [`initial-letter-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-align) ）, [沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink)（ [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) ） ］を満たすよう位置される。

- ［ 先頭字 が[占める行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-size) ≥ 先頭字 が[沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink) ］の場合 ：先頭字 は、 その[下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) 整列を満たすよう位置されてから， 先頭字 の[包含ブロック](https://triple-underscore.github.io/css-display-ja.html#containing-block)の[ブロック終端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-end)へ向けて 次に与える量だけずらされる ：( [沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink) − 1 ) × [包含ブロック](https://triple-underscore.github.io/css-display-ja.html#containing-block)に[選好される行高さ](https://triple-underscore.github.io/css-inline-ja.html#preferred-line-height)
- 他の場合 ：先頭字 は、 その[上面](https://triple-underscore.github.io/css-writing-modes-ja.html#over)整列を満たすよう位置される。

注記： [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は，本質的には、［ その包含ブロックが，[根行内ボックス](https://triple-underscore.github.io/css-inline-ja.html#root-inline-box)の直な内容として［ 当の先頭字と後続する長さ無限な素なテキスト ］のみを保持している ］と見做すとき，［ [沈み込む行数](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-initial-letter-sink)だけ沈み込む, かつ要求された[下面](https://triple-underscore.github.io/css-writing-modes-ja.html#under) 整列点に整列する ］ように位置される。 その位置は、 影響が及ぶ各 行ボックスの行高さが それらの内容により不揃いになっても，影響されない。

[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)により、 それが関与する[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)の[論理縦幅](https://triple-underscore.github.io/css-writing-modes-ja.html#logical-height)が増えることはない — 先頭字は、 行ボックスの上／下へ突き出し得る【縦書きならば左／右へ】。 先頭字を位置するときは、［ 先頭字の[ブロック始端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-start)[マージン辺](https://triple-underscore.github.io/css-box-ja.html#margin-edge)が，先頭字の[包含ブロック](https://triple-underscore.github.io/css-display-ja.html#containing-block)の[ブロック始端](https://triple-underscore.github.io/css-writing-modes-ja.html#block-start)[内容辺](https://triple-underscore.github.io/css-box-ja.html#content-edge)より下になる ］ようにするものとする — したがって，先頭字が[出自にしている行ボックス](https://triple-underscore.github.io/css-inline-ja.html#originating-line)（および後続の内容）は、 内容辺から更に中へずらすよう強制され得る。

### 7.6.2. 行内の字詰め法

[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)が[可分な行内](https://triple-underscore.github.io/css-display-ja.html#inline-box)で，その［ [行内サイズ](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-size)は[自動的サイズ](https://triple-underscore.github.io/css-sizing-ja.html#automatic-size), かつ パディング, ボーダーはどちらも 0 ］である場合、 先頭字の[マージンボックス](https://triple-underscore.github.io/css-box-ja.html#margin-box)は，先頭字の[内容ボックス](https://triple-underscore.github.io/css-box-ja.html#content-box)の始端辺から［ 先頭字でなかったとするとき，[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)の始端辺に配置されることになる地点 ］までの距離 （すなわち、 先頭字のグリフ限界ボックスから始端側 bearing までの距離） だけ字詰めされる（負にインセットされる）。 このインセットは、 実質的に，ボックスの[行内始端](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-start)に対する追加の[マージン](https://triple-underscore.github.io/css-box-ja.html#margin)になる。

### 7.7. 先頭字の回り込み： `initial-letter-wrap` プロパティ

注記： [`initial-letter-wrap`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-wrap) はリスク下にある。

| 名前 | `initial-letter-wrap` |
| --- | --- |
| [値](https://triple-underscore.github.io/css-values-ja.html#value-defs) | [`none`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-none) | [`first`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-first) | [`all`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-all) | [`grid`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-grid) | [<length-percentage>](https://triple-underscore.github.io/css-values-ja.html#typedef-length-percentage) |
| [初期値](https://triple-underscore.github.io/css-cascade-ja.html#initial-values) | [`none`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-none) |
| [適用対象](https://triple-underscore.github.io/css-cascade-ja.html#applies-to) | ある種の行内レベルのボックス ／ [`::first-letter`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-first-letter) ボックス ／ [内側に位置された](https://triple-underscore.github.io/css-lists-ja.html#valdef-list-style-position-inside) [`::marker`](https://triple-underscore.github.io/css-pseudo-ja.html#selectordef-marker) ボックス （[注釈文を見よ](https://triple-underscore.github.io/css-inline-ja.html#first-most-inline-level)） |
| [継承](https://triple-underscore.github.io/css-cascade-ja.html#inherited-property) | される |
| [百分率](https://triple-underscore.github.io/css-values-ja.html#percentages) | [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)（を成す最後の断片）の[論理横幅](https://triple-underscore.github.io/css-writing-modes-ja.html#logical-width)に相対的 |
| [算出値](https://triple-underscore.github.io/css-cascade-ja.html#computed) | 指定されたキーワード ／ [<length-percentage>](https://triple-underscore.github.io/css-values-ja.html#typedef-length-percentage) の算出値 |
| [正準的順序](https://triple-underscore.github.io/cssom-ja.html#serializing-css-values) | 文法に従う |
| [アニメーション型](https://triple-underscore.github.io/web-animations-ja.html#animation-type) | 算出された値型による |

このプロパティは、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)による影響が及ぶ行たちは，先頭字の［ 矩形なボックス, グリフ外形線による輪郭 ］のどちらを沿うように回り込むかを指定する。

`none`  影響が及ぶ各行は、 輪郭に沿うようには回り込まない。 各行は、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の[行内終端](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-end)[マージン辺](https://triple-underscore.github.io/css-box-ja.html#margin-edge)に接合するように整列される。  `first`  [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の直後の[タイポグラフィック文字単位](https://triple-underscore.github.io/css-text-ja.html#typographic-character-unit)が [Unicode 一般字種](https://triple-underscore.github.io/css-text-ja.html#unicode-general-category) Zs 【スペースに類する文字】 に属するならば， [`none`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-none) としてふるまう。 他の場合、 先頭字を包含しているブロックの［ 最初の行に対しては [`all`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-all) ／ 他の行に対しては [`none`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-none) ］としてふるまう。     最初の行に対し輪郭に沿う回り込みが必要とされるわけ, および [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の直後にスペースがあるときには そうすべきでないわけを，次の例に示す：     上段の段落では，先頭字 "A" の直後にスペースがあり、 "A" の上端と次の字°との合間にある隙間は，必要とされる単語分離を供する。 中段の段落では，先頭字 "A" は最初の単語の一部を成すので、 "A" の上端と次の字°との合間に隙間が残ると，単語の中に目障りな分断が生じる。 この事例では、 テキストの最初の行は，下段の段落に示されるとおり，先頭字の区画まで字詰めされるべきである。     “無条件の `first` ” も必要か？ （すなわち、 この値を `auto` に改称して，スペースの有無を検査しない `first` 値を追加するべきか？） GitHub [課題 #410](https://github.com/w3c/csswg-drafts/issues/410) を見よ。  `all`  [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)による影響が及ぶテキストの各行に対し、 先頭字に隣接する[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)の始端は，［ 先頭字を成すグリフの外形線に重なり合わない，最も[始端](https://triple-underscore.github.io/css-writing-modes-ja.html#css-start) ］から開始する。   [`shape-outside`](https://triple-underscore.github.io/css-shapes-ja.html#propdef-shape-outside) の値が `none` でない場合、 グリフ外形線に代えて，それによる図形が利用される。   いずれにせよ [`shape-margin`](https://triple-underscore.github.io/css-shapes-ja.html#propdef-shape-margin) は適用され，外形線を拡げるが、 結果の外形線は[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の[マージン辺](https://triple-underscore.github.io/css-box-ja.html#margin-edge)までに切り取られる。  注記： この値はリスク下にある。  `grid`  この値は、 次を除いて [`none`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-none) と同じになる： 影響が及ぶ行たちに対する排他区画の終端辺が，文字 grid に揃えるために必要とされるだけ増やされる — すなわち，［ 包含ブロック上で算出される ( 1 [`ic`](https://triple-underscore.github.io/css-values-ja.html#ic) + [`letter-spacing`](https://triple-underscore.github.io/css-text-ja.html#propdef-letter-spacing) ) ］の倍数になる。 このときには、 [`justify-self`](https://triple-underscore.github.io/css-align-ja.html#propdef-justify-self) プロパティを利用して，先頭字ボックスを排他区画の中で整列できる。     縦組みにおける日本語先頭字の図式  
注記： この例では、 行内軸整列を保全するため、 埋没頭字に対する排他区画が，そのグリフより大きくされている。   注記： この値もリスク下にある。  [<length>](https://triple-underscore.github.io/css-values-ja.html#length-value) [<percentage>](https://triple-underscore.github.io/css-values-ja.html#percentage-value)  この値のふるまいは、 最初の行に対する調整を，グリフ形状から推定するのでなく 明示的に与えることを除いて， [`first`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-first) と同じである。   これは、 本当は，フォントに相対的な長さが 使用サイズに相対的になる必要がある。 【フォントサイズの使用サイズ？】  注記： この値が存在するのは、 これの方が実装が容易なことによる。 作者には、 [`first`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-first) 値を利用することが奨励される — アキ組の制御にはマージンを設定し、 必要とされるなら，グリフ形状を検出できない場合のフォールバックに これを利用して。    次の例では、 [`first`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-first) をサポートする UA は，グリフ外形線と指定されたマージンを利用して 最初の行を配置することになる一方で、 [<length>](https://triple-underscore.github.io/css-values-ja.html#length-value) ／ [<percentage>](https://triple-underscore.github.io/css-values-ja.html#percentage-value) 値のみをサポートする UA は，最初の行を先頭字の横幅の 40% だけ引き寄せる （その上で，その地点にマージンを追加する）ことになる。  

 

```plain text
h1 + p:first-letter {
  initial-letter: 3; /*
3 行分の埋没 cap
 */
  initial-letter-wrap: first;
  margin-right: 0.1em;
}
@supports (not (initial-letter-wrap: first)) {
  /*
先頭字に合致するように，段落にて自動的に生成される疑似クラス
 */
  p.A:first-letter {
    initial-letter-wrap: -40%; /*
グリフ外形線の始端
— フォントは正しいと見做して。
 */
  }
}

```

これらの値に関係する煩わしいものは、 誰かが Blink に [`first`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-first) をサポートするパッチを提出してくれたなら，不必要になろう。

様々な文脈にて `auto` がどうふるまうかを示すように図を編集する必要がある。 【 `auto` 値は削除されたので、この段落も意味を成していない】

```plain text
p::first-letter {
  initial-letter: 3;
  initial-letter-wrap: none;
}

```

テキストは、 先頭字の輪郭ではなく，矩形なボックスに沿って回り込む。

```plain text
p::first-letter {
  initial-letter: 3;
  initial-letter-wrap: all;
}

```

先頭字の形状に沿うテキスト。 各行ボックスは、 ちょうど，字°の輪郭から 少しだけ間を空けた所（灰色ボックスで表現される）に触れるべきである。

```plain text
p::first-letter {
  initial-letter: 3;
  initial-letter-wrap: first;
}

```

最初の行のみが，先頭字の輪郭の方へ寄せられる。

```plain text
p::first-letter {
  initial-letter: 3;
  initial-letter-wrap: all;
}

```

埋没 cap "V" を回り込んでいるテキスト。

埋没 cap "P" を回り込んでいるテキスト。

埋没 cap "W" を回り込んでいるテキスト。

### 7.8. 行のレイアウト

[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は、 それが 出自にしている行ボックス — 先頭字が出自にしている[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box) — の内容の一部を成し，その行ボックスが関与する[ブロック整形文脈](https://triple-underscore.github.io/css-display-ja.html#block-formatting-context)の[フロー内](https://triple-underscore.github.io/css-display-ja.html#in-flow)にあるものと見なされる。 ブロック軸は別として （ [§ ブロック軸における位置決め](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-block-position) を見よ）、 先頭字は，同じ行にある他の[行内レベル](https://triple-underscore.github.io/css-display-ja.html#inline-level)の内容に対しては，通常どおり相互作用する — 少数の特有な詳細を除けば…

### 7.8.1. 行内フローレイアウト： 整列, 両端揃え, 空白

[先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は、［ それが[出自にしている行ボックス](https://triple-underscore.github.io/css-inline-ja.html#originating-line)に関与している他の[行内レベル](https://triple-underscore.github.io/css-display-ja.html#inline-level)の内容 ］と同様に取り扱われる — それには、 次が含まれる ：整列における関与, 両端揃え, 空白処理

しかしながら，影響が及ぶすべての行にわたって一貫した整列を確保するため：

- ［ [沈み込み頭字](https://triple-underscore.github.io/css-inline-ja.html#sunken-initial), それが[出自にしている行ボックス](https://triple-underscore.github.io/css-inline-ja.html#originating-line)上の後続の内容 ］の合間にある[縮約可能](https://triple-underscore.github.io/css-text-ja.html#collapsible-white-space)な[空白](https://triple-underscore.github.io/css-text-ja.html#white-space)は、 縮約され消される。
- ［ [`letter-spacing`](https://triple-underscore.github.io/css-text-ja.html#propdef-letter-spacing) や[両端揃え機会](https://triple-underscore.github.io/css-text-ja.html#justification-opportunity) ］のうち，［ [沈み込み頭字](https://triple-underscore.github.io/css-inline-ja.html#sunken-initial)を成す内容と行の後続の内容 ］の並置により通常どおり導入されるものは、 抑止される。 （これは、 [`word-spacing`](https://triple-underscore.github.io/css-text-ja.html#propdef-word-spacing) や[単語分離子](https://triple-underscore.github.io/css-text-ja.html#word-separator)により導入される[両端揃え機会](https://triple-underscore.github.io/css-text-ja.html#justification-opportunity)には影響しないことに注意。 そのアキを供するのは、 隣接する文字との並置ではなく，[タイポグラフィック文字単位](https://triple-underscore.github.io/css-text-ja.html#typographic-character-unit)に限られるので。）

### 7.8.2. 辺における効果：字下げとぶら下がり約物

［ [`text-indent`](https://triple-underscore.github.io/css-text-ja.html#propdef-text-indent), [`hanging-punctuation`](https://triple-underscore.github.io/css-text-ja.html#propdef-hanging-punctuation) ］は、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)が[出自にしている行ボックス](https://triple-underscore.github.io/css-inline-ja.html#originating-line)に通例どおり適用され，［ [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)も含む，当の行の内容 ］の始端をずらすことになる。 この排他により影響される後続の行は、 通例どおり短くされる — 場合によっては、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の結果の位置に依存して，他の場合【どの場合？】より増減する。

`text-indent` （字下げ）を伴う先頭字。

[`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) と [`hanging-punctuation`](https://triple-underscore.github.io/css-text-ja.html#propdef-hanging-punctuation) との相互作用は、 [論の最中にある](https://github.com/w3c/csswg-drafts/issues/310#issuecomment-396765893)。

### 7.8.3. 先祖の行内

[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)を包含している先祖に[行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)がある場合、 それらの行内ボックスの境界は，[先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)を排他するように描かれる — 先頭字が先祖たちの最も始端にあるマージン辺の外側にあったかのように。 これは純粋に幾何的な演算であり、 例えば［ プロパティ継承／ [先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)と後続の内容との合間の実質的な [`letter-spacing`](https://triple-underscore.github.io/css-text-ja.html#propdef-letter-spacing) ］には影響しない。

### 7.8.4. 複数行にわたる先頭字

先頭字が 1 行に収まるには長過ぎる場合、 （通例のテキスト折り返し規則に則って）折り返される — その結果を成す各行は、 ちょうど［ 自身が最初の行であり，先頭字は後続の通常のテキストに収まるには長過ぎた ］かのように埋められ，整形される。 先頭字を成す最後の行上で，その後に開始される通常のテキストは、 ちょうど［ その行は最初の行であった ］かのように影響される。

埋没 cap は 2 本の行に拡幅される。

### 7.9. 先頭字の clear 法

【 所与のボックス A, B に対する “A は B を clear する” という句は、 A は — B のための場所を “空けて”, B をよけるように — B を過ぎた所までずらすことを意味する。 原文は、［ [行内基底方向](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-base-direction), [ブロックフロー方向](https://triple-underscore.github.io/css-writing-modes-ja.html#block-flow-direction) ］どっちへずらすか言及していないが，片方だけ指している箇所もある。 これは判り難いので、 この訳では必要に応じて注釈を加えている。 】

### 7.9.1. 持ち上げ／沈み込み cap

先頭字は、 それを包含している要素のサイズに，[マージンボックス](https://triple-underscore.github.io/css-box-ja.html#margin-box)を供与する。 テキストの最初の行を超えて拡幅する先頭字は、 “持ち上げ cap ”／ “沈み込み cap ” とも呼ばれ，直上にある要素の中まで拡幅することはない。 先頭字の内容ボックスは，すべてのグリフインクを含むので、 先頭字の [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) を上回るアクセント記号その他のインクが，直上にある要素に突き当ることはないことになる。

右図は持ち上げ cap （ `initial-letter: 3 1` ）。 いずれも “C” の位置は同じになるが、 右図では，後続のテキストが，先頭字から相対的に下へ移動されることに注意。

フォントの [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) より上側のグリフの輪郭を取り扱う。 提案： それを行ボックスとボーダーボックスに対する排他区画にする。 先頭字に指定されたマージンを，アキ組を制御するための排他区画の一部に含める。

ここにボックスモデル図式を描く。 先頭字のマージンは そのコンテナと相殺されるか？

### 7.9.2. 先頭字を伴う短い段落

先頭字を伴う段落のテキスト行数が，先頭字が占めるそれより少ないこともある。 この場合でも、 先頭字の上端整列は，依然として尊守され、 その排他区画は、 後続のブロックの中へ継続する。 これは、 後続の[行内レベル](https://triple-underscore.github.io/css-display-ja.html#inline-level)の内容も先頭字を回り込むことを強制する — ちょうど［ そのブロックのテキストが，先頭字の包含ブロックの一部であった ］かのように （これは、 浮動体が 後続のブロックボックスの内容を回り込ませるのと類似する）。

赤色テキストは、 先頭字を伴う短い段落。 後続の段落は、 先頭字を伴う段落内のテキストと同様に，先頭字を回り込むことに注意。

後続のブロックが **∨**↓ を満たす場合、 以前のブロックの先頭字を【ブロックフロー方向に】clear するものとする：

- 先頭字で開始されていて, [独立な整形文脈](https://triple-underscore.github.io/css-display-ja.html#independent-formatting-context)を確立している
- [`clear`](https://triple-underscore.github.io/css2-ja.html#propdef-clear) を先頭字の包含ブロックの[始端](https://triple-underscore.github.io/css-writing-modes-ja.html#css-start)方向に指定している

赤色テキストは、 先頭字を伴う短い段落。 後続の段落も先頭字を持つので clear する。

### 7.9.3. 浮動体との相互作用

[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は、 【後続する行内レベルの内容が回り込む点で，浮動体に似るが】 [浮動体](https://triple-underscore.github.io/css2-ja.html#float)ではない。 それは、 [フロー内](https://triple-underscore.github.io/css-display-ja.html#in-flow)にある[行内レベル](https://triple-underscore.github.io/css-display-ja.html#inline-level)の内容であり，[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)に属する。 特に：

- [`clear`](https://triple-underscore.github.io/css2-ja.html#propdef-clear) プロパティは、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)に関わらない。 それは先頭字には適用されないので、 どの浮動体も先頭字の [clear 対象](https://triple-underscore.github.io/css2-ja.html#_to-be-cleared)にはならない。 先頭字は浮動体ではないので、 どの先頭字も他の clear 対象にはならない。
- [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は、 行ボックスや浮動体と同様に，同じ[ブロック整形文脈](https://triple-underscore.github.io/css-display-ja.html#block-formatting-context)に関与している浮動体の[マージンボックス](https://triple-underscore.github.io/css-box-ja.html#margin-box)と重なり合わないものとする — 先頭字を成すボックスは、 重なり合わない所に収まるまで，内方または下方へずらされることになる。
- 浮動体を【方向は問わず】clear するために，行ボックスの始端辺が［ 内方／下方 ］へ移動される場合、 当の行ボックスを[出自にして](https://triple-underscore.github.io/css-inline-ja.html#originating-line)いる[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)も伴に移動する。 同様に、 浮動体を clear するために先頭字が移動される場合も、 それに則って［ それが[出自にしている行ボックス](https://triple-underscore.github.io/css-inline-ja.html#originating-line), 後続の各行ボックス ］も短くなるか移動する。
-  
[行内始端](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-start)へ浮動する浮動体は、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)の【行内基底方向に】隣接する内容を成すいずれかの行を出自にしている場合 — その行が：
    - 最初の行ならば、 浮動体は，先頭字を過ぎて包含ブロック辺に寄せられる — ちょうど，先頭字が他の行内レベルの内容であったかのように。
    - 他の行ならば（先頭字は沈み込んでいる）、 先頭字は浮動体を【行内基底方向に】clear するものとする。 【原文の “浮動体” と “先頭字” はおそらく逆なので修正している。】

テキストの最初の行は，先頭字が無いときは青色の浮動体に寄りかかれるが、 在るときは，橙色の浮動体を過ぎる所まで移動することが要求される。

浮動体と隣接する内容のレイアウトについての情報は、 [[CSS2]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css2) [§ 浮動体](https://triple-underscore.github.io/css2-ja.html#floats)を見よ。

後続の行を出自にしている行内終端にある浮動体が，（行内始端にあるそれと同じく）先頭字を clear するものとするかどうかは、 [依然として論の最中にある](https://lists.w3.org/Archives/Public/www-style/2018Jul/0019.html)。 それを要求する審美的な理由は無い — が、 下層のレイアウトモデルが 2 つの事例をどう判別することになるかは，まだ不明瞭である。

### 7.9.4. 断片化（ページ割り）との相互作用

単独のグリフは，いくつかの[断片化コンテナ](https://triple-underscore.github.io/css-break-ja.html#fragmentation-container)（ページ／column ／[領域](https://drafts.csswg.org/css-regions-1/#regions), 等々） ］に[断片](https://triple-underscore.github.io/css-break-ja.html#fragment)化できないので、 ブロック軸における[断片化](https://triple-underscore.github.io/css-break-ja.html#fragmentation)（いくつかの断片化コンテナに分断すること）の目的においては，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は[単体的](https://triple-underscore.github.io/css-break-ja.html#monolithic)と見なされる [[css-break-3]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css-break-3) 。 加えて、 先頭字ボックスに並んでいる[フロー内](https://triple-underscore.github.io/css-display-ja.html#in-flow)にある行たちの合間における分断は、 避けられる — [`widows`](https://triple-underscore.github.io/css-break-ja.html#propdef-widows) や [`orphans`](https://triple-underscore.github.io/css-break-ja.html#propdef-orphans) により影響されるそれも含めて。 しかしながら，それら行たちが成す内容のどこかに[強制分断](https://triple-underscore.github.io/css-break-ja.html#forced-break)がある場合、 それが優先される — そうであっても、 先頭字ボックス自身に対する効果は無い。

他の[単体的](https://triple-underscore.github.io/css-break-ja.html#monolithic)なオブジェクトと同じく，[先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は、［ それを包含するには短か過ぎる[断片化コンテナ](https://triple-underscore.github.io/css-break-ja.html#fragmentation-container) ］の上端に生じている場合には，切り落とすか, 切り分けるかしてもよい。 しかしながら，隣接する内容は、 [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)とともに［ 切り落とす／切り分ける ］ことなく，自前の規則に則って[断片](https://triple-underscore.github.io/css-break-ja.html#fragment)化されるものとする。

## 付録 A. 整列計量の合成法

### A.1. em-over と em-under の計算法

注記： CSS においては、［ [em-over](https://triple-underscore.github.io/css-inline-ja.html#em-over-baseline) ／ [em-under](https://triple-underscore.github.io/css-inline-ja.html#em-under-baseline) ］基底線は利用されない。 このモジュールが，それらの定義を含めているのは、［ Canvas [`TextMetrics`](https://triple-underscore.github.io/HTML-canvas-ja.html#textmetrics) API に利用される他の計量 ］との整合性を得るためである。

［ [em-over](https://triple-underscore.github.io/css-inline-ja.html#em-over-baseline) ／ [em-under](https://triple-underscore.github.io/css-inline-ja.html#em-under-baseline) ］計量は、 次に従って計算される：

5. [central](https://triple-underscore.github.io/css-inline-ja.html#central-baseline) 基底線が［ 当のフォントに定義されている場合 ］および［ [§ テキスト用の基底線の合成法](https://triple-underscore.github.io/css-inline-ja.html#baseline-synthesis-fonts)により他の基底線 （ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline), [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline) ） から導出できる場合 ］ ：［ [em-over](https://triple-underscore.github.io/css-inline-ja.html#em-over-baseline) ／ [em-under](https://triple-underscore.github.io/css-inline-ja.html#em-under-baseline) ］は、 [central](https://triple-underscore.github.io/css-inline-ja.html#central-baseline) 基底線より `0.5em` だけ［ 上に／下に ］ある
6. 他の場合 ：［ [em-over](https://triple-underscore.github.io/css-inline-ja.html#em-over-baseline) ／ [em-under](https://triple-underscore.github.io/css-inline-ja.html#em-under-baseline) ］は、［ [アセント計量](https://triple-underscore.github.io/css-inline-ja.html#ascent-metric) ／ [ディセント計量](https://triple-underscore.github.io/css-inline-ja.html#descent-metric) ］を次のように正規化した計量になる ：合計が正確に `1em` になるよう，同じ比で増減した結果

注記： この計算は、［ [em-over](https://triple-underscore.github.io/css-inline-ja.html#em-over-baseline), [em-under](https://triple-underscore.github.io/css-inline-ja.html#em-under-baseline) ］が — グリフ外形線の “重心” を それらの合間で中央寄せにしようと試行する下で — 常に正確に `1em` 離れることを確保する。

### A.2. テキスト用の基底線（および 他のフォント計量）の合成法

フォントには、 このモジュールに述べた，テキストを適正に整列するために必要とされる計量情報がないこともある。 UA は、 要求される計量がない場合は，次の策を利用してよい：

 関係しあう計量を利用する    ある種の計量どうしは，概して互いに関係するので、 欠落している計量を少なくとも経験的に導出するときには，この関係性を利用できる。 フォント形式自身が特定の計算を定義しない場合、 次に挙げる規則が利用されてもよい：   
1.  [central](https://triple-underscore.github.io/css-inline-ja.html#central-baseline) 基底線は、［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline), [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline) ］基底線の中間になるものと定義されるので、 これらのうち 2 つがあれば残る 1 つを決定する。  
2.  ［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline), [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline) ］基底線は，概して *1em* 離れているので、［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline), [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline), [central](https://triple-underscore.github.io/css-inline-ja.html#central-baseline) ］基底線のうち どれか 1 つだけ供された場合でも，この関係を利用して他 2 つを計算できる。  
3.  CJK フォントにおいては、［ [アセント計量](https://triple-underscore.github.io/css-inline-ja.html#ascent-metric)／[ディセント計量](https://triple-underscore.github.io/css-inline-ja.html#descent-metric) ］は，概して［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline) 基底線／[ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline) 基底線 ］に合致するので、 両方とも欠落しているときは，フォールバックとして利用できる。     フォントを測定する    計量は グリフの形状から導出してもよい。 例えば：   
1.  [math](https://triple-underscore.github.io/css-inline-ja.html#math-baseline) 基底線として、 マイナス符号（ U+2212 ）の中央を採用できる。  
2.   小文字 “o” の最高点から [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線を下回る量を減算すれば、 [x-height](https://triple-underscore.github.io/css-inline-ja.html#x-height-baseline)（ [`ex`](https://triple-underscore.github.io/css-values-ja.html#ex) 単位）を測定できる。    [x-height](https://triple-underscore.github.io/css-inline-ja.html#x-height-baseline) の測定法 — 図の［ A ／ B ］は、 [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線から字°の［ 上端／下端 ］までの距離を表す。   
3.  大文字 “O” の最高点から [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線を下回る量を減算すれば、 [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) を測定できる。  
4.  ideographic 文字 face の周を成す各 辺として U+6C38 “永” の限界ボックスを利用できる。  
5.  ヘブライ語 hanging† 基底線として、 ヘブライ語 U+05D4 “ה” （ He ）の中央の上端辺を採用できる。 【† Hebrew hanging — [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) とは別に定義される未定義な基底線かもしれない。】  
6.   [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) 基底線として、 字° “Ka” の中央の上端辺を採用できる。 どの “Ka” が利用されるべきかは、 [内容言語](https://triple-underscore.github.io/css-text-ja.html#content-language)に依存するべきである：   言語 用字系 字°  デヴァーナーガリー “क” U+0915 KA  ベンガル語 “ক” U+0995  グルムキー文字 “ਕ” U+0A15  チベット語 “ཀ” U+0F40   
 既定を選ぶ。     [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) 基底線は、 文字インクの上端辺に位置する。   
7.  もっと注記を追加するか？   
 これらの経験則の健全さを誰か検査してくれないかな。    フォールバック値を利用する    次に挙げる値がフォールバック値に示唆される：   
•  [x-height](https://triple-underscore.github.io/css-inline-ja.html#x-height-baseline) には `.5em`  
•  [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) には `.66em`  
•  [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) 基底線には `.6em`   

7. 1.  [central](https://triple-underscore.github.io/css-inline-ja.html#central-baseline) 基底線は、［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline), [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline) ］基底線の中間になるものと定義されるので、 これらのうち 2 つがあれば残る 1 つを決定する。
8. 2.  ［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline), [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline) ］基底線は，概して *1em* 離れているので、［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline), [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline), [central](https://triple-underscore.github.io/css-inline-ja.html#central-baseline) ］基底線のうち どれか 1 つだけ供された場合でも，この関係を利用して他 2 つを計算できる。
9. 3.  CJK フォントにおいては、［ [アセント計量](https://triple-underscore.github.io/css-inline-ja.html#ascent-metric)／[ディセント計量](https://triple-underscore.github.io/css-inline-ja.html#descent-metric) ］は，概して［ [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline) 基底線／[ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline) 基底線 ］に合致するので、 両方とも欠落しているときは，フォールバックとして利用できる。
10. 1.  [math](https://triple-underscore.github.io/css-inline-ja.html#math-baseline) 基底線として、 マイナス符号（ U+2212 ）の中央を採用できる。
11. 2.   
小文字 “o” の最高点から [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線を下回る量を減算すれば、 [x-height](https://triple-underscore.github.io/css-inline-ja.html#x-height-baseline)（ [`ex`](https://triple-underscore.github.io/css-values-ja.html#ex) 単位）を測定できる。
 [x-height](https://triple-underscore.github.io/css-inline-ja.html#x-height-baseline) の測定法 — 図の［ A ／ B ］は、 [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線から字°の［ 上端／下端 ］までの距離を表す。
12. 3.  大文字 “O” の最高点から [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline) 基底線を下回る量を減算すれば、 [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) を測定できる。
13. 4.  ideographic 文字 face の周を成す各 辺として U+6C38 “永” の限界ボックスを利用できる。
14. 5.  ヘブライ語 hanging† 基底線として、 ヘブライ語 U+05D4 “ה” （ He ）の中央の上端辺を採用できる。 【† Hebrew hanging — [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) とは別に定義される未定義な基底線かもしれない。】
15. 6.     
[hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) 基底線として、 字° “Ka” の中央の上端辺を採用できる。 どの “Ka” が利用されるべきかは、 [内容言語](https://triple-underscore.github.io/css-text-ja.html#content-language)に依存するべきである：

| 言語 | 用字系 | 字° |
| --- | --- | --- |
|   | デヴァーナーガリー | “क” U+0915 KA |
|   | ベンガル語 | “ক” U+0995 |
|   | グルムキー文字 | “ਕ” U+0A15 |
|   | チベット語 | “ཀ” U+0F40 |

 既定を選ぶ。
 [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) 基底線は、 文字インクの上端辺に位置する。
16. 7.  もっと注記を追加するか？
- •  [x-height](https://triple-underscore.github.io/css-inline-ja.html#x-height-baseline) には `.5em`
- •  [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline) には `.66em`
- •  [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline) 基底線には `.6em`

### A.3. 不可分な行内用の基底線の合成法

[不可分な行内](https://triple-underscore.github.io/css-display-ja.html#atomic-inline)（[行内ブロック](https://triple-underscore.github.io/css-display-ja.html#inline-block), 行内テーブル, [置換され](https://triple-underscore.github.io/css-display-ja.html#replaced-element)る要素など） ボックス に対しては、［ ボックス が関与する[行内整形文脈](https://triple-underscore.github.io/css-inline-ja.html#inline-formatting-context)の[行内軸](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-axis) ］において［ ボックス の内容から導出される[基底線集合](https://triple-underscore.github.io/css-inline-ja.html#baseline-set) ］は無い場合には、 UA は，［ ボックス を整列する ］ための［ ボックス の[基底線](https://triple-underscore.github.io/css-inline-ja.html#baseline) ］を次に従って合成するものとする：

- 次に挙げる[基底線](https://triple-underscore.github.io/css-inline-ja.html#baseline)は、 ** ボックス の**[**行下面**](https://triple-underscore.github.io/css-writing-modes-ja.html#line-under)[**マージン辺**](https://triple-underscore.github.io/css-box-ja.html#margin-edge)**にある **と見做される ：[text-under](https://triple-underscore.github.io/css-inline-ja.html#text-under-baseline), [ideographic-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-under-baseline), [ideographic-ink-under](https://triple-underscore.github.io/css-inline-ja.html#ideographic-ink-under-baseline), [alphabetic](https://triple-underscore.github.io/css-inline-ja.html#alphabetic-baseline),
- 次に挙げる[基底線](https://triple-underscore.github.io/css-inline-ja.html#baseline)は、 ** ボックス の［ **[**行下面**](https://triple-underscore.github.io/css-writing-modes-ja.html#line-under)**, **[**行上面**](https://triple-underscore.github.io/css-writing-modes-ja.html#line-over)** ］**[**マージン辺**](https://triple-underscore.github.io/css-box-ja.html#margin-edge)**の中間にある **と見做される ：[central](https://triple-underscore.github.io/css-inline-ja.html#central-baseline), [math](https://triple-underscore.github.io/css-inline-ja.html#math-baseline), [x-middle](https://triple-underscore.github.io/css-inline-ja.html#x-middle-baseline)
- 次に挙げる[基底線](https://triple-underscore.github.io/css-inline-ja.html#baseline)は、 ** ボックス の**[**行上面**](https://triple-underscore.github.io/css-writing-modes-ja.html#line-over)[**マージン辺**](https://triple-underscore.github.io/css-box-ja.html#margin-edge)**にある **と見做される ：[text-over](https://triple-underscore.github.io/css-inline-ja.html#text-over-baseline), [ideographic-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-over-baseline), [ideographic-ink-over](https://triple-underscore.github.io/css-inline-ja.html#ideographic-ink-over-baseline), [cap-height](https://triple-underscore.github.io/css-inline-ja.html#cap-height-baseline), [hanging](https://triple-underscore.github.io/css-inline-ja.html#hanging-baseline)

注記： （正な／負な）マージンを利用すれば、 作者は，[置換され](https://triple-underscore.github.io/css-display-ja.html#replaced-element)る内容に対し 行の中での整列を調整できる。

一連の画像を利用して，存在しない文字を表示する例：

```plain text
img[src^="/text/"] {
  height: 1em; /*
隣のテキストと合致するようにサイズする
 */
  margin-bottom: -0.2em; /*
基底線を下端から 20% 上にする
 */
}

```

...

```plain text
<p>
未だ符号化されていない用字系で書かれた単語によるテキスト

  <img src="/text/ch3439.png" alt="...">
  <img src="/text/ch3440.png" alt="...">
  <img src="/text/ch3442.png" alt="...">

```

注記： CSS の将来レベルでは、 [置換され](https://triple-underscore.github.io/css-display-ja.html#replaced-element)る要素用に全部的な[基底線テーブル](https://triple-underscore.github.io/css-inline-ja.html#baseline-table)を指定する仕方が含められるであろう （おそらく， [<baseline-keyword> [<percentage>](https://triple-underscore.github.io/css-values-ja.html#percentage-value)]+ を値に受容する `baseline-table` プロパティの様なものにより）。

## 変更点

 [2024年 8月 12日 作業草案](https://www.w3.org/TR/2024/WD-css-inline-3-20240812)からの 変更点   [<text-edge>](https://triple-underscore.github.io/css-inline-ja.html#typedef-text-edge) には、［ 上面用の値, 下面用の値 ］どちらも要求されるようにした。 （ [課題 #10703](https://github.com/w3c/csswg-drafts/issues/10703) ）   [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) を継承されるようにした。 それに伴い、 [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) は，影響される行ボックス（たち）に適用される関連する【 `text-box-edge` の】値を参照するようにした。 （ [課題 #10904](https://github.com/w3c/csswg-drafts/issues/10904) ）   [断片化](https://triple-underscore.github.io/css-break-ja.html#fragmentation)による各分断に対する [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) のふるまいを定義した。 （ [課題 #5335](https://github.com/w3c/csswg-drafts/issues/5335) ）   [複 column コンテナ](https://triple-underscore.github.io/css-multicol-ja.html#multi-column-container)に対する [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) のふるまいを定義した。 他の整形文脈に対する [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) の適用（および伝播）を明確化した。 （ [課題 #5335](https://github.com/w3c/csswg-drafts/issues/5335), [課題 #11038](https://github.com/w3c/csswg-drafts/issues/11038) ）   [2024年 8月 8日作業草案](https://www.w3.org/TR/2024/WD-css-inline-3-20240808/) からの変更点   一部の［ 以前は [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) も表現していた [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) への参照 ］を【 `line-fit-edge` を指すよう】直した。   [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) 用の値 [`auto`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-edge-auto) は、［ それを指定した要素の [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) の値に算出される ］のではなく［ 影響される[行ボックス](https://triple-underscore.github.io/css-inline-ja.html#line-box)【の[根行内ボックス](https://triple-underscore.github.io/css-inline-ja.html#root-inline-box)】の `line-fit-edge` を参照する ］よう調整した。   [2023年 4 月 1日 作業草案](https://www.w3.org/TR/2023/WD-css-inline-3-20230401/) からの変更点   [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) を 2 つのプロパティ — [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) 辺を制御するための [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge), 行ボックスのサイズ法を制御するための [`line-fit-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-fit-edge) — に分割して， [`text-box`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box) [略式プロパティ](https://triple-underscore.github.io/css-cascade-ja.html#shorthand-property)を追加した。 （ [課題 #8829](https://github.com/w3c/csswg-drafts/issues/8829), [課題 #8696](https://github.com/w3c/csswg-drafts/issues/8696) ）   [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) 用の【 `none` 以外の】キーワードに接頭辞 `trim-*` を追加した — それらが [`text-box`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box) 略式プロパティの文脈においても意味を成すよう。 （ [課題 #10675](https://github.com/w3c/csswg-drafts/issues/10675) ）   [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) 用には、 複数の先祖から削るよう要請されたときは，最も内縁な削り辺を利用するようにした。 （ [課題 #5426](https://github.com/w3c/csswg-drafts/issues/5426) ）   負な[ブロック軸](https://triple-underscore.github.io/css-writing-modes-ja.html#block-axis)マージンも， [行内ボックス](https://triple-underscore.github.io/css-display-ja.html#inline-box)の子孫たちの[レイアウト限界域](https://triple-underscore.github.io/css-inline-ja.html#layout-bounds)を計算するときには — 実際に指定された効果があるよう — 適用するようにした。 （ [課題 #8182](https://github.com/w3c/csswg-drafts/issues/8182) ）   [幻な行ボックス](https://triple-underscore.github.io/css-inline-ja.html#phantom-line-box)の定義を正した — それに織り込まれる［ マージン／パディング／ボーダー ］は，[行内軸](https://triple-underscore.github.io/css-writing-modes-ja.html#inline-axis)におけるそれらに限るよう。 （ [課題 #9344](https://github.com/w3c/csswg-drafts/issues/9344) ）   [2022年 11月 14日 作業草案](https://www.w3.org/TR/2022/WD-css-inline-3-20221114/) からの変更点   `text-edge` を [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) に改称した。 `leading-trim` を [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) に改称した。 それらの初期値も改称した 【実際に改称されたのは、後者の初期値のみ】。 （ [課題 #8067](https://github.com/w3c/csswg-drafts/issues/8067) ）   [行隙間計量](https://triple-underscore.github.io/css-inline-ja.html#line-gap-metric)を 0 以上に切り上げるようにした。 （ [課題 #5064](https://github.com/w3c/csswg-drafts/issues/5064) ）   [2020年 8 月 28日 作業草案](https://www.w3.org/TR/2020/WD-css-inline-3-20200827/) からの変更点：   [`inline-sizing`](https://triple-underscore.github.io/css-inline-ja.html#propdef-inline-sizing) は、 元々意図されていたとおり，[継承](https://triple-underscore.github.io/css-cascade-ja.html#css-inheritance)されるものと修正した。 （ [課題 #1974](https://github.com/w3c/csswg-drafts/issues/1974) ）   [`inline-sizing`](https://triple-underscore.github.io/css-inline-ja.html#propdef-inline-sizing) の “適用対象” からルビボックスを除外するよう更新した。   編集上の修正点 — 欠落していた画像など。   [2020年 6月 18日 作業草案](https://www.w3.org/TR/2020/WD-vss-inline-3-20200618/) からの変更点は：   ある種のインド語群用字系によくある実施を取り扱うため、 [`initial-letter-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-align) に値 [`leading`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-wrap-leading) を追加した。 [インド語群レイアウトの要件](https://www.w3.org/TR/ilreq/#h_scripts_without_hanging_baseline) を見よ。 （ [課題 #864](https://github.com/w3c/csswg-drafts/issues/864) ）   0 でないパディングやボーダーは、 先祖の [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) による効果を阻止するようにした。 （ [課題 #5237](https://github.com/w3c/csswg-drafts/issues/5237) ）   [`initial-letter-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-align) から値 `hebrew` を除去した。 （ [課題 #5208](https://github.com/w3c/csswg-drafts/issues/5208) ）   先頭字のサイズが沈み込み量に満たない場合には、 下面整列点を利用するようにした。 （ [課題 #5329](https://github.com/w3c/csswg-drafts/issues/5329) ）   [埋没頭字](https://triple-underscore.github.io/css-inline-ja.html#dropped-initial)に隣接する空白は縮約するようにした。 （ [課題 #5120](https://github.com/w3c/csswg-drafts/issues/5120) ）   [埋没頭字](https://triple-underscore.github.io/css-inline-ja.html#dropped-initial)は、 [`text-align`](https://triple-underscore.github.io/css-text-ja.html#propdef-text-align) の目的においては [持ち上げ頭字](https://triple-underscore.github.io/css-inline-ja.html#raised-initial)と同じにふるまうようにした。 （ [課題 #5207](https://github.com/w3c/csswg-drafts/issues/5207) ）   ［ [`shape-margin`](https://triple-underscore.github.io/css-shapes-ja.html#propdef-shape-margin), [`margin`](https://triple-underscore.github.io/css-box-ja.html#propdef-margin), [`shape-outside`](https://triple-underscore.github.io/css-shapes-ja.html#propdef-shape-outside) ］の相互作用を浮動体に合致するよう改めた （ [`initial-letter-wrap`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter-wrap) を見よ）。 （ [課題 #5119](https://github.com/w3c/csswg-drafts/issues/5119) ）   Canvas 2D からの参照用に，［ [em-over](https://triple-underscore.github.io/css-inline-ja.html#em-over-baseline), [em-under](https://triple-underscore.github.io/css-inline-ja.html#em-under-baseline) ］基底線用の定義を追加した。 （ [課題 #5312](https://github.com/w3c/csswg-drafts/issues/5312) ）   [`vertical-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-vertical-align) の（新たな）構文を少しばかり精緻化した。 （ [課題 #5235](https://github.com/w3c/csswg-drafts/issues/5235) ）   [`baseline-shift`](https://triple-underscore.github.io/css-inline-ja.html#propdef-baseline-shift) 用の値［ `sub` ／ `super` ］用に，フォールバック時のオフセットを定義した。 （ [課題 #5225](https://github.com/w3c/csswg-drafts/issues/5225) ）   [2020年 6月 4日 作業草案](https://www.w3.org/TR/2020/WD-css-inline-3-20200604/) からの変更点は：   以前の［ `line-sizing`, `text-box-trim` ］提案の関係性を作業し直して、 [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) を作成し， [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) の構造を組み換えた。 （ [課題 #5168](https://github.com/w3c/csswg-drafts/issues/5168) ）   [`vertical-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-vertical-align) の[行に相対的なずらし値](https://triple-underscore.github.io/css-inline-ja.html#line-relative-shift-values)を [`alignment-baseline`](https://triple-underscore.github.io/css-inline-ja.html#propdef-alignment-baseline) 下位プロパティから [`baseline-shift`](https://triple-underscore.github.io/css-inline-ja.html#propdef-baseline-shift) 下位プロパティへ移した。 （ [課題 #5180](https://github.com/w3c/csswg-drafts/issues/5180) ）   [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) を [§ 行内ボックスが供与する論理縦幅の計算法](https://triple-underscore.github.io/css-inline-ja.html#inline-height)の中に統合した。   様々な基底線の定義を[自前の節](https://triple-underscore.github.io/css-inline-ja.html#css-metrics)の中にリファクターして、 [[CSS-WRITING-MODES-3]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css-writing-modes-3) から序論, 中核を成す各種用語を取り込んだ。   残りの［ 基底線整列, 行ボックスサイズ法 ］の注釈文を [[CSS2]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css2) から取り込んで，更新した／統合した。   [不可分な行内](https://triple-underscore.github.io/css-display-ja.html#atomic-inline)用の基底線の合成規則を，すべての基底線用に定義した。   [central](https://triple-underscore.github.io/css-inline-ja.html#central-baseline) 基底線は、 明確に *ideographic* central 基底線であるものと定義した。   [先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)と後続のテキストの合間にある空白の縮約法を定義した。 （ [課題 #5120](https://github.com/w3c/csswg-drafts/issues/5120) ）   [先頭字ボックス](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)用のボックスモデルの定義を整備した — その[包含ブロック](https://triple-underscore.github.io/css-display-ja.html#containing-block)との相互作用も含め。 （ [課題 #719](https://github.com/w3c/csswg-drafts/issues/719) ）   諸々の細かい修正点, 明確化, 編集上の改善。   [2018年 8月 8日 作業草案](https://www.w3.org/TR/2018/WD-css-inline-3-20180808/) からの変更点は：   行間のアキ組を計算する方法を制御する `line-sizing` プロパティを追加した 【が除去された】。 （ [課題 #3199](https://github.com/w3c/csswg-drafts/issues/3199) ）   最初／最後のどちらの基底線による整列を利用するか制御するため、 [`baseline-source`](https://triple-underscore.github.io/css-inline-ja.html#propdef-baseline-source) プロパティを追加した。 （ [課題 #861](https://github.com/w3c/csswg-drafts/issues/861) ）   行ボックスレイアウトにおける［ 行上面／行下面 ］辺用に利用される計量を制御するため、 [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim) 提案を追加した。 （ [課題 #3240](https://github.com/w3c/csswg-drafts/issues/3240), [課題 #3955](https://github.com/w3c/csswg-drafts/issues/3955) ）   [[CSS2]](https://triple-underscore.github.io/css-inline-ja.html#biblio-css2) から [`line-height`](https://triple-underscore.github.io/css-inline-ja.html#propdef-line-height) の定義と関係する規範的な注釈文を取り込んだ。   [§ 行内レイアウトモデル](https://triple-underscore.github.io/css-inline-ja.html#model)における， 行内レイアウトの高レベルな記述を改善した。   `initial-letters-*` を `initial-letter-*` に改称し戻した。 （ [課題 #862](https://github.com/w3c/csswg-drafts/issues/862) ）   構文上の便利用に [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) 用のキーワード [`raise`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-raise), [`drop`](https://triple-underscore.github.io/css-inline-ja.html#valdef-initial-letter-drop) を追加した。 （ [課題 #2955](https://github.com/w3c/csswg-drafts/issues/2955) ）   基底線が設定されていない[不可分な行内](https://triple-underscore.github.io/css-display-ja.html#atomic-inline)用に，基底線の合成を指定した。   [`alignment-baseline`](https://triple-underscore.github.io/css-inline-ja.html#propdef-alignment-baseline) 用の値［ [`middle`](https://triple-underscore.github.io/css-inline-ja.html#valdef-alignment-baseline-middle), [`text-top`](https://triple-underscore.github.io/css-inline-ja.html#valdef-alignment-baseline-text-top), [`text-bottom`](https://triple-underscore.github.io/css-inline-ja.html#valdef-alignment-baseline-text-bottom) ］の[縦組み](https://triple-underscore.github.io/css-writing-modes-ja.html#vertical-writing-mode)における解釈を明確化した。 （ [課題 #4495](https://github.com/w3c/csswg-drafts/issues/4495) ）   [`alignment-baseline`](https://triple-underscore.github.io/css-inline-ja.html#propdef-alignment-baseline) 用の値［ [`text-top`](https://triple-underscore.github.io/css-inline-ja.html#valdef-alignment-baseline-text-top), [`text-bottom`](https://triple-underscore.github.io/css-inline-ja.html#valdef-alignment-baseline-text-bottom) ］, および [`text-box-edge`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-edge) 用の値 [`text`](https://triple-underscore.github.io/css-inline-ja.html#valdef-text-box-edge-text) は、［ [`vertical-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-vertical-align), [`dominant-baseline`](https://triple-underscore.github.io/css-inline-ja.html#propdef-dominant-baseline), [`text-box-trim`](https://triple-underscore.github.io/css-inline-ja.html#propdef-text-box-trim), 行内ボックスの内容ボックスを描くとき ］にわたって，一貫するよう解釈されるべきであることを明確化した。 （ [課題 #3978](https://github.com/w3c/csswg-drafts/issues/3978) ）   [`dominant-baseline`](https://triple-underscore.github.io/css-inline-ja.html#propdef-dominant-baseline) の初期値を `auto` に正した。 （ [課題 #4115](https://github.com/w3c/csswg-drafts/issues/4115) ）   [`vertical-align`](https://triple-underscore.github.io/css-inline-ja.html#propdef-vertical-align) 略式プロパティ, その下位プロパティどちらを選ぶかに関する著作助言の意味合いを改善した。   [`initial-letter`](https://triple-underscore.github.io/css-inline-ja.html#propdef-initial-letter) と［ [`float`](https://triple-underscore.github.io/css2-ja.html#propdef-float) ／ [`position`](https://triple-underscore.github.io/css-position-ja.html#propdef-position) ］との相互作用を明確化した。   可読性を良くするめ， [§ 先頭字のレイアウト](https://triple-underscore.github.io/css-inline-ja.html#initial-letter-layout) を編成し直して、 明確さを得るため，一部の言い回しを調節した。   [`shape-margin`](https://triple-underscore.github.io/css-shapes-ja.html#propdef-shape-margin) は、 グリフ外形線に適用するものと定義した。   ideographic 文字 face 辺用の基底線合成規則を U+6C38 “永” を利用するよう切り替えた。   [先頭字](https://triple-underscore.github.io/css-inline-ja.html#initial-letter)は、 【アラビア語などの途切れない用字系においても】形状付けに関して隔離されることを指定した — それでも、 後続するテキストは連結形（ connecting form ）であり続けるが。 （ [課題 #2399](https://github.com/w3c/csswg-drafts/issues/2399#issuecomment-635630662) ） 

これら以前の変更点は、 [2016年 5月 24 日 作業草案からの変更点](https://www.w3.org/TR/2018/WD-css-inline-3-20180808/#changes) を見よ。

## 謝辞

初期の策定者 Eric A. Meyer, Michel Suignard 両氏に特別な謝意を。

加えて、 この仕様は、 次の方々からの助力も欠かせなかった：

David Baron, Mike Bremford, David M Brown, Oriol Brufau, John Daggett, Stephen Deach, Sylvain Galineau, David Hyatt, Myles Maxfield, Shinyu Murakami, Jan Nicklas, Tess O’Connor, Sujal Parikh, Florian Rivoal, Alan Stearns, Weston Thayer, Bobby Tung, Chris Wilson, Grzegorz Zygmunt.

## プライバシーの考慮点

この仕様に対し報告された，新たなプライバシーの考慮点は、無い。

## セキュリティの考慮点

この仕様に対し報告された，新たなプライバシーの考慮点は、無い。