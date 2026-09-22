---
プロパティ: ""
Created: 2021-01-15T20:46:00
Tags: [topic/技術/関数型プログラミング]
---
JavaScriptで味わう! 関数型プログラミングのメリット!!

![](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-1-638.jpg?cb=1500710459)

Upcoming SlideShare

Loading in …5

×

1

1 of 42

Embed

Size (px)

Start on

Show related SlideShares at end

WordPress Shortcode

Link

767 views

Published on

We Are JavaScripters! @9th 資料

Published in:
                [Technology](https://www.slideshare.net/featured/category/technology)

[Katsuhiko Nitoube
                            
                              
                                
                                
                              
                              
                                
                                
                              
                            

                            

                            
                              3 years ago
                            
                          ](https://www.slideshare.net/KatsuhikoNitoube?utm_campaign=profiletracking&utm_medium=sssite&utm_source=ssslideshow)[Tetsuo Yutani
                            
                              
                                , 
                                Senior Software Developer at Sony
                              
                              
                                 at 
                                Sony
                              
                            

                            

                            
                              3 years ago
                            
                          ](https://www.slideshare.net/tetsuoyutani?utm_campaign=profiletracking&utm_medium=sssite&utm_source=ssslideshow)

![](https://public.slidesharecdn.com/v2/images/user-48x48.png)

![](https://cdn.slidesharecdn.com/profile-photo-tetsuoyutani-48x48.jpg)

No Downloads

**Views**

Total views

767

On SlideShare

0

From Embeds

0

Number of Embeds

108

**Actions**

Shares

0

Downloads

5

Comments

2

Likes

2

No notes for slide


1. 
      1.
    JavaScript で味わう!
関数型プログラミングのメリット!!
 
  
2. [
        2.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-2-638.jpg?cb=1500710459)
    for {
Type <- Person
Name <- Keigo Magami
Github <- k5jp1015
Job <- Server Side Engineer
Scala Experience <- 5 Month
Hobby <- Training(筋トレのことです♪)
} yeild Self Introduction(自己紹介)
※上はScalaにおける糖衣構文をパクりましたｗ
 
  
3. [
        3.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-3-638.jpg?cb=1500710459)
    話す内容
→JavaScript(ライブラリ使わないVer)で
関数型プログラミングのメリットを話します！
ReactもAngularも出てこない世界(ﾟдﾟ)！
 
  
4. [
        4.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-4-638.jpg?cb=1500710459)
    対象にならない人
→ScalaとかHaskellとかelmとかpurescriptとか詳しい人
→名言的な先人のありがたいお言葉がとか嫌いな人
 
  
5. [
        5.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-5-638.jpg?cb=1500710459)
    なぜ、関数型プログラミングなのか
→ブームだからｗｗｗ
→私がScalaが好きだからｗｗｗ
→もちろん、メリットが有るから
→どんな？
→これから説明します〜
 
  
6. [
        6.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-6-638.jpg?cb=1500710459)
    • 関数型プログラミングで担保できるメリットは？
１．コードのモジュール性が高まる
２．コードのテストが容易になる
３．コードの正しさを証明できる
 
  
7. [
        7.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-7-638.jpg?cb=1500710459)
    • １．コードのモジュール性が高まる
→抽象度が高く、単一責任性が担保できるソースを書く
ことができる
 
  
8. [
        8.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-8-638.jpg?cb=1500710459)
    単一責任の原則とは、
「変更する理由が同じものは集める、
変更する理由が違うものは分ける。」
→1つのサブシステムやモジュール、クラス、関数などに、
変更する理由が2つ以上あるようではいけない
 
  
9. [
        9.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-9-638.jpg?cb=1500710459)
    let cityInfo ="; // 1.
if(existKey){ // 2.
cityInfo =
countryData[key]; // 3.
}else{
cityInfo = “NoData" ; // 4.
}
左のソースがやっていること
1.変数「cityInfo」を定義する
2.引数の条件判定をする
3.条件が正ならcountryDataからkeyに対応する
valueをcityInfoに設定
4.条件が負なら”NoData”なる文字列をcityInfoに設定
役割が４つもある(単一責任の原則に反している)
これ役割多くないですか？
変更する理由が１つ以上有る！
→なので、個別にモジュール化！！
１．コードのモジュール性が高まる
→具体的には
 
  
10. [
        10.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-10-638.jpg?cb=1500710459)
    • それぞれの役割をモジュール化
1. 変数「cityInfo」を定義する
←省略可能
2. 引数の条件判定をする
←モジュール化
3. 条件が正ならcountryDataからkeyに対応するvalueをcityInfoに
設定
←モジュール化
4. 条件が負なら”NoData”なる文字列をcityInfoに設定
←モジュール化
 
  
11. [
        11.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-11-638.jpg?cb=1500710459)
    引数の条件判定をするを関数としてモジュール化
let abstractFuncIfElse = (funcOnTrue,funcOnFalse) => {
return(flg) => {
if(flg){
return funcOnTrue;
}else{
return funcOnFalse;
}
}
};
 
  
12. [
        12.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-12-638.jpg?cb=1500710459)
    countryDataからkeyに対応するvalueを取得を関数としてモ
ジュール化
let getValue = (key) => {
return(obj) =>{
return obj[key];
};
};
 
  
13. [
        13.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-13-638.jpg?cb=1500710459)
    条件が負なら”NoData”なる文字列をcityInfoに設定を関数と
してモジュール化
const setNonData = “NoData";
 
  
14. [
        14.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-14-638.jpg?cb=1500710459)
    作成したモジュールを組み合わせる
let getCityInfo = (flg) => {
return(key,obj) => {
return abstractFuncIfElse(getValue(key)(obj),setNonData)(flg);
}
};
変数「existKey」の条件判定をする
条件が正ならcountryDataからkeyに対応するvalueを取得
条件が負なら”NoData”なる文字列を取得
単一責任の原則を担保している３つのモジュールを組み合わせることで、
要件を新たな関数を作ることが出来た！
 
  
15. [
        15.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-15-638.jpg?cb=1500710459)
    abstractFuncIfElse setNoData
getCityInfo
getValue
 
  
16. [
        16.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-16-638.jpg?cb=1500710459)
    できたモジュールを使ってみよう！
let countryData = {
japan: "tokyo,37843",
china: "beijing,23416",
usa: "new york,20630”
};
getCityInfo(true)("japan",countryData);
→”tokyo,37843"が出力されるよ！
 
  
17. [
        17.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-17-638.jpg?cb=1500710459)
    一度作成したモジュールはもちろん再利用可能！
// 引数が２の倍数かどうかを判定
let isEven = (number) =>
{ return number % 2 === 0};
let checkEven = (num) => {
return abstractFuncIfElse('◯','✕')(isEven(num));
};
 
  
18. [
        18.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-18-638.jpg?cb=1500710459)
    少々の処理でもモジュール化することができる！
モジュール化することで再利用がしやすくなる!!
複雑な処理のメリットはいうに及ばす!!!
 
  
19. [
        19.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-19-638.jpg?cb=1500710459)
    １．コードのモジュール性が高まる
→終わり
２．コードのテストが容易になる
→次
 
  
20. [
        20.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-20-638.jpg?cb=1500710459)
    ２．コードのテストが容易になる
→大きなもの(条件分岐)が多いものをテストしようとすると
大変。
しかし、単一責任の原則が守られているモジュールをテスト
するのは簡単。
 
  
21. [
        21.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-21-638.jpg?cb=1500710459)
    let abstractFuncIfElse = (funcOnTrue,funcOnFalse) => {
return(flg) => {
if(flg){
return funcOnTrue;
}else{
return funcOnFalse;
}
}
};
let isEven = (number) => { return number % 2 === 0};
let checkEven = (num) => {
return abstractFuncIfElse('◯','✕')(isEven(num));
};
 
  
22. [
        22.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-22-638.jpg?cb=1500710459)
    expect(
abstractFuncIfElse('OK','NG')(true)
).to.eql(
'OK'
);
expect(
abstractFuncIfElse('OK','NG')(false)
).to.eql(
‘NG'
);
 
  
23. [
        23.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-23-638.jpg?cb=1500710459)
    expect(
// 2の倍数かどうかを判定
isEven(4)
).to.eql(
true
);
expect(
isEven(5)
).to.eql(
false
);
 
  
24. [
        24.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-24-638.jpg?cb=1500710459)
    expect(
checkEven(4)
).to.eql(
'◯'
);
expect(
checkEven(5)
).to.eql(
'×'
);
 
  
25. [
        25.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-25-638.jpg?cb=1500710459)
    abstractFuncIfElse isEven
checkEven
 
  
26. [
        26.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-26-638.jpg?cb=1500710459)
    funcA funcZ
hugeFunction
・・・・・・・・
個々のモジュールをテストすることで、巨大なモジュールも
複雑な条件分岐が少なくテストができる！
 
  
27. [
        27.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-27-638.jpg?cb=1500710459)
    ２．コードのテストが容易になる
→終わり
３．コードの正しさを証明できる
→次
 
  
28. [
        28.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-28-638.jpg?cb=1500710459)
    ３．コードの正しさを証明できる
→副作用が存在せず、参照透過性を担保されている関数型の
ソースは、その動作の正しさを証明される
→上記を守っていれば、安心して使える。
保守らくちん♪
 
  
29. [
        29.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-29-638.jpg?cb=1500710459)
    副作用とは、「目的」以外の操作・影響のことをいいます。
※「副作用」は意味の捉え方が広いので、今回は上記の意味で用います。
 
  
30. [
        30.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-30-638.jpg?cb=1500710459)
    副作用が存在するケース
let data = {1:’js’,2:’scala’,3:’java’};
// どこに副作用があるでしょうか？
let getValue = (key) => {
let returnValue = data[key];
delete data[key];
return returnValue;
};
 
  
31. [
        31.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-31-638.jpg?cb=1500710459)
    副作用が存在するケース
let data = {1:’js’,2:’scala’,3:’java’};
// 答え合わせ
let getValue = (key) => {
let returnValue = data[key];
delete data[key]; // ←値の取得以外の処理をしている
return returnValue;
};
 
  
32. [
        32.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-32-638.jpg?cb=1500710459)
    参照透過性とは
計算機言語の概念の一種である。 ある式が参照透過である
とは、その式をその式の値に置き換えてもプログラムの振る
舞いが変わらない(言い換えれば、同じ入力に対して同じ作
用と同じ出力とを持つプログラムになる)ことを言う。
※Wikipediaより
 
  
33. [
        33.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-33-638.jpg?cb=1500710459)
    参照透過性が担保されていないケース
// 引数に渡した年が西暦何年であるかを取得
let getYearAfter = (yearSpecified) => {
return new Date().getFullYear() + yearSpecified;
};
一見問題ないように見えるが、「同じ入力に対して同じ作用
と同じ出力とを持つプログラム」とは言えない。
 
  
34. [
        34.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-34-638.jpg?cb=1500710459)
    参照透過性が担保されていないケース
// 引数に渡した年が西暦何年であるかを取得
let getYearAfter = (yearSpecified) => {
return new Date().getFullYear() + yearSpecified;
};
なぜなら、プログラムを動作させる年によって、
取得できる値が違う😨
 
  
35. [
        35.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-35-638.jpg?cb=1500710459)
    理想的なソース
let addOneValue = (number) => {
return number + 1;
};
// f(x) = x + 1
副作用が存在せず、参照透過性を担保されている
関数型のソース
 
  
36. [
        36.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-36-638.jpg?cb=1500710459)
    注意点
プログラムの外に対して行う処理、例えばファイル入出力やDB操作
は厳密に言うと、副作用も有る上に、参照透過性も担保されない処理
となる。
なので、実際に実装する際には、
「副作用が存在せず、参照透過性が担保されているモジュール」と
「それ以外のモジュール」をしっかり分けるように設計し、
実装することが大切
 
  
37. [
        37.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-37-638.jpg?cb=1500710459)
    副作用が存在せず、参照透過性を担保されている
→「『目的』以外の操作・影響」がなく、
「同じ入力に対して同じ作用と同じ出力とを持つ」
プログラムである！
→作成者以外にも処理の正しさが伝わるので、安心！
保守らくちん♪(2回目)
 
  
38. [
        38.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-38-638.jpg?cb=1500710459)
    ３．コードの正しさを証明できる
→終わり
まとめ
→次
 
  
39. [
        39.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-39-638.jpg?cb=1500710459)
    まとめ
・JavaScriptでも関数型プログラミングができたよ!
・JavaScriptでも、というよりJavaScriptだからこそ、
関数型プログラミング言語のメリットを活かすことができる!!
・小さなことから関数型でモジュールを作ってみませんか!!!
 
  
40. [
        40.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-40-638.jpg?cb=1500710459)
    Small is beautiful
From The UNIX philosophy
 
  
41. [
        41.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-41-638.jpg?cb=1500710459)
    • 参考書籍
立川察理 著
「JavaScriptを使って学ぶ関数型プログラミングの基礎」
 
  
42. [
        42.
      ](https://image.slidesharecdn.com/wejs-170722075824/95/javascript-42-638.jpg?cb=1500710459)
    ご清聴、ありがとうございました！

[
        Scala 初心者向けlt
      ](https://www.slideshare.net/k5jp1015/scala-lt-76797100)[Keigo Magami](https://www.slideshare.net/k5jp1015/scala-lt-76797100)[
        Recommend git
      ](https://www.slideshare.net/k5jp1015/recommend-git-50431563)[Keigo Magami](https://www.slideshare.net/k5jp1015/recommend-git-50431563)[
        Recommend git
      ](https://www.slideshare.net/k5jp1015/recommend-git-50431550)[Keigo Magami](https://www.slideshare.net/k5jp1015/recommend-git-50431550)[
        What to Upload to SlideShare
      ](https://www.slideshare.net/Slideshare/what-to-upload)[SlideShare](https://www.slideshare.net/Slideshare/what-to-upload)[
        Customer Code: Creating a Company Customers Love
      ](https://www.slideshare.net/HubSpot/customer-code-creating-a-company-customers-love-113085298)[HubSpot](https://www.slideshare.net/HubSpot/customer-code-creating-a-company-customers-love-113085298)[
        Be A Great Product Leader (Amplify, Oct 2019)
      ](https://www.slideshare.net/adamnash/be-a-great-product-leader-amplify-oct-2019)[Adam Nash](https://www.slideshare.net/adamnash/be-a-great-product-leader-amplify-oct-2019)[
        Trillion Dollar Coach Book (Bill Campbell)
      ](https://www.slideshare.net/ericschmidt/trillion-dollar-coach-book-bill-campbell)[Eric Schmidt](https://www.slideshare.net/ericschmidt/trillion-dollar-coach-book-bill-campbell)[
        APIdays Paris 2019 - Innovation @ scale, APIs as Digital Factories' New Machi...
      ](https://www.slideshare.net/APIdays_official/apidays-paris-2019-innovation-scale-apis-as-digital-factories-new-machines-by-cyril-vart-fabernovel)[apidays](https://www.slideshare.net/APIdays_official/apidays-paris-2019-innovation-scale-apis-as-digital-factories-new-machines-by-cyril-vart-fabernovel)[
        A few thoughts on work life-balance
      ](https://www.slideshare.net/WimVanderbauwhede/a-few-thoughts-on-work-lifebalance)[Wim Vanderbauwhede](https://www.slideshare.net/WimVanderbauwhede/a-few-thoughts-on-work-lifebalance)[
        Is vc still a thing   final
      ](https://www.slideshare.net/msuster/is-vc-still-a-thing-final)[Mark Suster](https://www.slideshare.net/msuster/is-vc-still-a-thing-final)

![](https://cdn.slidesharecdn.com/ss_thumbnails/scalalt-170609114618-thumbnail-2.jpg?cb=1497008863)

![](https://cdn.slidesharecdn.com/ss_thumbnails/recommendgit-150712070741-lva1-app6892-thumbnail-2.jpg?cb=1436685248)

![](https://cdn.slidesharecdn.com/ss_thumbnails/recommendgit-150712070547-lva1-app6891-thumbnail-2.jpg?cb=1436917310)

![](https://cdn.slidesharecdn.com/ss_thumbnails/whattoupload-150527194759-lva1-app6891-thumbnail-2.jpg?cb=1596487126)

![](https://cdn.slidesharecdn.com/ss_thumbnails/customer-code-v4-beta1-180905164748-thumbnail-2.jpg?cb=1596667033)

![](https://cdn.slidesharecdn.com/ss_thumbnails/beagreatproductleader-amplifyoct2019v5-191007205738-thumbnail-2.jpg?cb=1580173593)

![](https://cdn.slidesharecdn.com/ss_thumbnails/trilliondollarcoachslideshare-190415231411-thumbnail-2.jpg?cb=1580173579)

![](https://cdn.slidesharecdn.com/ss_thumbnails/apidays19-200125062048-thumbnail-2.jpg?cb=1580173469)

![](https://cdn.slidesharecdn.com/ss_thumbnails/work-life-balance-200124094004-thumbnail-2.jpg?cb=1580173370)

![](https://cdn.slidesharecdn.com/ss_thumbnails/isvcstillathing-final-190204194013-thumbnail-2.jpg?cb=1580173326)