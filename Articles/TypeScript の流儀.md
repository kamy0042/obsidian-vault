---
Created: 2021-01-15T20:31:00
Tags: [topic/技術/TypeScript]
---
![](https://d1eu30co0ohy4w.cloudfront.net/assets/mark-white-8d908558fe78e8efc8118c6fe9b9b1a9846b182c503bdc6902f97df4ddc9f3af.svg)

### TypeScript の流儀

[Takepepe](https://speakerdeck.com/takefumiyoshii)

![](https://secure.gravatar.com/avatar/5d9cd19df0e91caac118b793b4f803d5?s=47)

September 03, 2019

[Technology
](https://speakerdeck.com/c/technology)

[67](https://speakerdeck.com/signin?return_to=%2Ftakefumiyoshii%2Ftypescript-falseliu-yi)

16k

# TypeScript の流儀

Bonfire Frontend #4 [http://yj-meetup.connpass.com/event/136480/](http://yj-meetup.connpass.com/event/136480/)

![](https://secure.gravatar.com/avatar/5d9cd19df0e91caac118b793b4f803d5?s=128)

### [Takepepe](https://speakerdeck.com/takefumiyoshii)

September 03, 2019

**Transcript**
1. 
            
            
        
2. [**About Me ▪ Takefumi Yoshii / @Takepepe ▪ DeNA /**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_1.jpg)
            DeSC Healthcare ▪ Frontend Engineer ▪ 実践TypeScript 著者
        
        
        
        
3. [**Agenda ▪ 1. 型推論いろは ▪ 2. 攻防一体・型の策略 ▪ 3. コンパイラの合意**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_4.jpg)
            ▪ 4. 型の主従関係 ▪ 5. 源流を辿る型定義
        
4. [**1. 型推論いろは**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_5.jpg)
            
        
5. [**実装推論 TypeScript は実装内容に則り、型推論（実装推論）が得られます。 ここに、意図的に付与した型情報はありません。 function greet() { return 'hello' }**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_6.jpg)
            const msg = greet() // const msg: string 1. 型推論いろは
        
6. [**宣言（Assertion） 意図的に Assertion が付与されている場合、 値は宣言された型であると解釈します。 function greet() { return 'hello'**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_7.jpg)
            as any // any型とする Assertion } const msg = greet() // const msg: any 1. 型推論いろは
        
7. [**注釈（Annotation） function greet(): void { // 戻り値がないことを表す void型 return 'hello'**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_8.jpg)
            // Error! 値を返してはいけない } const msg = greet() // const msg: void 意図的に Annotation が付与されている場合、 実装はその型に従わなければいけません。 1. 型推論いろは
        
8. [**const / let の推論 変数宣言の const / let 。 初期代入値から、適切な型が推論されます。**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_9.jpg)
            let msg1 = 'msg' const msg2 = 'msg' 1. 型推論いろは
        
9. [**const / let の推論 let は再代入可能なため「string 型」に、 const は再代入不可なため「"msg"型（String Literal**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_10.jpg)
            型）」に。 let msg1 = 'msg' // let msg1: string const msg2 = 'msg' // const mag2: "msg" 1. 型推論いろは
        
10. [**Null 許容型 複数の型を表す Union Types。TypeScript では、 Nullable型（Null許容型）も、Union Types で表現します。 function**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_11.jpg)
            greet(name: string | null) { let user = 'USER' if (name !== null) { user = name.toUpperCase() // (parameter) name: string } console.log(`HELLO ${user}!`) } 1. 型推論いろは
        
11. [**Null 許容型 複数の型を パイプ | で連結し、 引数は「string型 または null型」どちらかの型であることを表します。 function**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_12.jpg)
            greet(name: string | null) { let user = 'USER' if (name !== null) { user = name.toUpperCase() // (parameter) name: string } console.log(`HELLO ${user}!`) } 1. 型推論いろは
        
12. [**ガード節 null や undeﬁned を安全に扱う手法「ガード節」。 ガード節を通過したブロックでは、型が絞り込まれます。 function greet(name: string |**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_13.jpg)
            null) { let user = 'USER' if (name !== null) { // ガード節 user = name.toUpperCase() } console.log(`HELLO ${user}!`) } 1. 型推論いろは
        
13. [**ガード節 型が絞り込まれると、そのインスタンスに備わった プロパティ・メソッド へのアクセスが安全なものであると解釈されます。 function greet(name: string | null) {**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_14.jpg)
            let user = 'USER' if (name !== null) { // ガード節 user = name.toUpperCase() // (parameter) name: string } console.log(`HELLO ${user}!`) } 1. 型推論いろは
        
14. [**1. 型推論いろは 三項演算子を用いたガード節でも、型が絞り込まれます。 このように「実装内容で型を絞り込み」安全に値を扱います。 function greet(name: string | null) {**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_15.jpg)
            const user = name !== null ? name.toUpperCase() : 'USER' console.log(`HELLO ${user}!`) } ガード節
        
15. [**タグ付き Union Types 次の User型 は「UserA型・UserB型・UserC型」からなる Union Typesであり、共通のプロパティを保持しています。 type UserA**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_16.jpg)
            = { gender: 'male'; name: string } type UserB = { gender: 'female'; age: number } type UserC = { gender: 'other'; graduate: string } type User = UserA | UserB | UserC 1. 型推論いろは
        
16. [**タグ付き Union Types 共通プロパティ「gender」の型は「'male'・'female'・'other'」型 それぞれ異なる「String Literal 型」です。 type UserA =**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_17.jpg)
            { gender: 'male'; name: string } type UserB = { gender: 'female'; age: number } type UserC = { gender: 'other'; graduate: string } type User = UserA | UserB | UserC 1. 型推論いろは
        
17. [**タグ付き Union Types User 型のように、Literal 型で区別できる Union Types は、 「タグ付き**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_18.jpg)
            Union Types」と呼びます。（別名：Discriminated Unions） type UserA = { gender: 'male'; name: string } type UserB = { gender: 'female'; age: number } type UserC = { gender: 'other'; graduate: string } type User = UserA | UserB | UserC 1. 型推論いろは
        
18. [**タグ付き Union Types function judgeUserType(user: User) { switch (user.gender) {**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_19.jpg)
            case 'male': const u0 = user // (parameter) user: UserA break case 'female': const u1 = user // (parameter) user: UserB break case 'other': const u2 = user // (parameter) user: UserC break default: const u3 = user // (parameter) user: never } } タグ付き Union Types が付 与された値を分岐にかける と、分岐ブロック内で、型が 絞り込まれます。 1. 型推論いろは
        
19. [**タグ付き Union Types これにより、各型にしか保持 していないプロパティであっ ても、安全なアクセスである と解釈されます。 function judgeUserType(user: User)**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_20.jpg)
            { switch (user.gender) { case 'male': const u0 = user.name // const u0: string break case 'female': const u1 = user.age // const u1: number break case 'other': const u2 = user.graduate // const u2: string break default: const u3 = user // const u3: never } } 1. 型推論いろは
        
20. [**1. 型推論いろは ▪ 型情報がなくても、実装に型はついて回る ▪ 型推論は JavaScript の構文をなぞらえる 1. 型推論いろは**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_21.jpg)
            
        
21. [**2. 攻防一体・型の策略**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_22.jpg)
            
        
22. [**コンパイラへ策略を通達する 実装推論だけでは、現実のアプリケーションコードで不十分です。 その値がどの様にプログラムで利用されるのか？ という「策略」は、プログラマしか知り得ません。 型の付与は「コンパイラへ策略を通達すること」と言えます。 2. 攻防一体・型の策略**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_23.jpg)
            
        
23. [**守りの策略・Annotation Annotation 付与は「守りの策略」と言い換えることができます。 型をあらかじめ付与し、要件を先に取り決めてしまいます。 const str1: any = 'str' const**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_24.jpg)
            str2: string = 'str' const str3: 'str' = 'str' const str4: 'str' = 'literal' // !Error 2. 攻防一体・型の策略
        
24. [**守りの策略・Annotation コンパイラもプログラマも、これに従います。 策略に基づき、引数・変数・戻り型に付与します。 function greet1(message: string) {} function greet2(message: 'hello')**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_25.jpg)
            {} greet1('HELLO') greet2('HELLO') // !Error 2. 攻防一体・型の策略
        
25. [**守りの策略・Annotation インデックスシグネチャとよばれる型を付与すると、 オブジェクトプロパティの型を一律で制約することができます。 type Functions = { [k: string]: Function**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_26.jpg)
            }　// インデックスシグネチャ const funcs: Functions = { f1: () => true, f2: async () => false, s1: 'str' // Error! 関数として評価できない } 2. 攻防一体・型の策略
        
26. [**攻めの策略・Assertion 次の配列プロパティは「never」配列と推論されてしまい、 このままでは何も追加することができません。 const state = { count: 0, flag:**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_27.jpg)
            false, arr: [] } const state: { count: number; flag: boolean; arr: never[]; // 望まない推論結果 } 2. 攻防一体・型の策略 推論 結果
        
27. [**攻めの策略・Assertion const state = { count: 0, flag: false, arr:**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_28.jpg)
            [] as string[] } 実装推論では測れない部分的補足として「型解釈のヒント」を付与します。 Assertion 付与は「攻めの策略」と言い換えることができます。 const state: { count: number; flag: boolean; arr: string[]; // 望みどおりの推論結果 } 2. 攻防一体・型の策略 推論 結果
        
28. [**アップキャスト・ダウンキャスト 2. 攻防一体・型の策略 互換性が成立する場合「広義な型・詳細な型」として、双方解釈することが 可能です。これを「アップキャスト・ダウンキャスト」と呼びます。 let myName = 'taro' const**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_29.jpg)
            name1 = myName // const name1: string const name2 = myName as 'taro' // const name2: "taro" ダウンキャスト const name3 = myName as any // const name3: any　 アップキャスト
        
29. [**アップキャスト・ダウンキャスト 2. 攻防一体・型の策略 互換性チェックは構造的部分型に基づくため、次のような 誤ったダウンキャストを行っても、コンパイラに責任はありません。 let myName = 'taro' const**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_30.jpg)
            name1 = myName // const name1: string const name2 = myName as 'jiro' // const name2: "jiro" 型が誤っている
        
        
        
30. [**2. 攻防一体・型の策略 ▪ 型は束縛されるものではなく、策略を練るもの ▪ 策略の通達は、必要に応じて随時行う 2. 攻防一体・型の策略**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_32.jpg)
            
        
31. [**3. コンパイラの合意**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_33.jpg)
            
        
32. [**コンパイラの合意とは？ 攻めの通達には、様々な方法が用意されています。 「この型であって欲しい」という通達を行うためには、 必要最低限の条件を満たす必要があります。 当資料ではこれを「コンパイラの合意」と称します。 3. コンパイラの合意**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_34.jpg)
            
        
33. [**User Deﬁned Type Guard 3. コンパイラの合意 ランタイム挙動をなぞらえた型推論は、完璧ではありません。 例えば次の変数「users」から、男性のみをフィルタリングしてみます。 type Male**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_35.jpg)
            = { id: string; gender: 'male' } type Female = { id: string; gender: 'female' } type User = Male | Female const users: User[] = [ { id: '1', gender: 'male' }, { id: '2', gender: 'female' }, { id: '3', gender: 'male' } ]
        
34. [**User Deﬁned Type Guard 3. コンパイラの合意 現在の Array.ﬁlter の推論では、型を絞り込む事はできません。 ランタイムの挙動と同じように「**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_36.jpg)
            const males: Male[] 」 が望まれます。 const males = users.filter(user => { return user.gender === 'male' }) // const males: User[]; 望まない推論結果
        
35. [**User Deﬁned Type Guard 3. コンパイラの合意 ここに「: user is Male」という戻り型**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_37.jpg)
            Annotation を付与することで、 後続の型解釈を操作することができます。 const males = users.filter((user): user is Male => { return user.gender === 'male' }) // const males: Male[]; 望み通りの推論結果
        
36. [**User Deﬁned Type Guard 3. コンパイラの合意 注意しなければならないのは「コンパイラに責任はない」ということです。 boolean型さえ返していればよく、実装内容の正しさに関与しません。 const males**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_38.jpg)
            = users.filter((user): user is Male => { return user.gender === 'female' // oops! }) // const males: Male[]; 誤った推論結果
        
37. [**User Deﬁned Type Guard 3. コンパイラの合意 User Deﬁned Type Guard**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_39.jpg)
            を利用する場合、 プログラマが「型安全」を肩代わりしなければいけません。 const males = users.filter((user): user is Male => { return user.gender === 'female' // oops! }) // const males: Male[]; 誤った推論結果 booelan型さえ返却してれば、コンパイラは合意します。
        
38. [**Non-null assertion インラインで型を絞りこむ「Non-null assertion」。 「 ! 」 を利用することで「null | undeﬁned」が振るい落とされます。**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_40.jpg)
            const msg = 'hello' as string | null const nullAble = msg // const nullAble: string | null const nonNullAble = msg! // const nonNullAble: string 3. コンパイラの合意
        
39. [**Non-null assertion Non-null assertion は「コンパイラを欺く悪い慣習」という印象があります。 次のコードをみれば、この危険性もうなずけます。 const msg1 = 'str'**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_41.jpg)
            as string | null const msg2 = 'str' as string | null const msg3 = null as string | null msg1.toUpperCase() // コンパイルエラーになるが、ランタイムエラーにならない msg2!.toUpperCase() // コンパイルエラーにならず、ランタイムエラーにならない msg3!.toUpperCase() // コンパイルエラーにならず、ランタイムエラーになる 3. コンパイラの合意
        
40. [**Non-null assertion しかしながら、Non-null assertion は悪い慣習とは限りません。 特定のケースにおいて、有効なことがあります。 const msg1 = 'str'**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_42.jpg)
            as string | null const msg2 = 'str' as string | null const msg3 = null as string | null msg1.toUpperCase() // コンパイルエラーになるが、ランタイムエラーにならない msg2!.toUpperCase() // コンパイルエラーにならず、ランタイムエラーにならない msg3!.toUpperCase() // コンパイルエラーにならず、ランタイムエラーになる 3. コンパイラの合意
        
41. [**Non-null assertion それは、コンパイラよりプログラマのほうが型について詳しいケースです。 例えば、HTML に記述された要素にイベントをバインドするコードです。 <html lang="en"> <head></head> <body> <button**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_43.jpg)
            id="btn"><%= count %></button> </body> </html> 3. コンパイラの合意
        
42. [**Non-null assertion 「document.getElementById」の戻り型は Nullable 型です。 そのため、次の記述ではコンパイルエラーとなります。 3. コンパイラの合意 // getElementById(elementId:**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_44.jpg)
            string): HTMLElement | null; document.getElementById('btn').addEventListener('click', () => {}) // Error
        
43. [**Non-null assertion 「その要素が存在するか否か」コンパイラは担保できないが、 プログラマが担保している様なケースに限り、Non-null assertion は有効です。 // getElementById(elementId: string): HTMLElement**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_45.jpg)
            | null; document.getElementById('btn')!.addEventListener('click', () => {}) 3. コンパイラの合意
        
44. [**Non-null assertion // getElementById(elementId: string): HTMLElement | null; document.getElementById('btn')!.addEventListener('click', ()**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_46.jpg)
            => {}) 3. コンパイラの合意 「プログラマが品質担保します」という署名を信じ、コンパイラは合意します。 「Non-null assertion」はコンパイラを欺くためのものではなく、 「品質担保します」という意思表示に他なりません。
        
45. [**const assertion const assertion は、初期値を厳格な型として保持する「署名」です。 変数初期値が「より厳格であってほしい」という意図の通達に利用できます。 const user1 = 'taro'**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_47.jpg)
            // const user1: "taro" let user2 = 'taro' // let user2: string let user3 = 'taro' as const // let user3: "taro" 3. コンパイラの合意
        
46. [**const assertion この署名を行った場合、JavaScript 本来の挙動と異なる「厳格さ」が 与えられてしまうことに注意しなければいけません。 let user2 = 'taro' //**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_48.jpg)
            let user2: string let user3 = 'taro' as const // let user3: "taro" user2 = 'TARO' user3 = 'TARO' // Error; JavaScript とは異なる挙動 3. コンパイラの合意
        
47. [**const assertion この署名を行った場合、JavaScript 本来の挙動と異なる「厳格さ」が 与えられてしまうことに注意しなければいけません。 let user2 = 'taro' //**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_49.jpg)
            let user2: string let user3 = 'taro' as const // let user3: "taro" user2 = 'TARO' user3 = 'TARO' // Error; JavaScript とは異なる挙動 3. コンパイラの合意 「JSの挙動と異なってもよい」という署名を信じ、コンパイラは合意します。
        
48. [**3. コンパイラの合意 ▪ 攻めの策略には、隙が生まれることを心得る ▪ 合意に基づき、プログラマが品質を担保する 3. コンパイラの合意**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_50.jpg)
            
        
49. [**4. 型の主従関係**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_51.jpg)
            
        
50. [**上流・下流の意識 実装しているコードが「上流工程なのか・下流工程なのか」の意識は 型推論に関係する重要事項です。 なぜなら、合意を得られた型が、上流から流れてくるからです。 手短で・厳格な型推論を得るコツを紹介します。 4. 型の主従関係**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_52.jpg)
            
        
51. [**「頑張る = 厳格」とは限らない 4. 型の主従関係 次の関数定義において与えらた型情報は、 引数の Annotation「: number」のみです。 import**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_53.jpg)
            { SET_COUNT } from './actionTypes' export function setCount(amount: number) { return { type: SET_COUNT, payoad: { amount } } }
        
52. [**「頑張る = 厳格」とは限らない 4. 型の主従関係 それでいて、戻り型まで厳格な型（String Literal 型）が得られています。 "LONG_PREFIX_SET_COUNT"型 は、この定義内のどこにもありません。**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_54.jpg)
            import { SET_COUNT } from './actionTypes' export function setCount(amount: number) { return { type: SET_COUNT, payoad: { amount } } } // function setCount(amount: number): { // type: "LONG_PREFIX_SET_COUNT"; payoad: { amount: number; }; // }
        
53. [**「頑張る = 厳格」とは限らない 4. 型の主従関係 この String Literal 型は、上流工程で既に定められていたものです。 次の様に**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_55.jpg)
            const assertion が付与されていました。 export = { INCREMENT: 'LONG_PREFIX_INCREMENT', DECREMENT: 'LONG_PREFIX_DECREMENT', SET_COUNT: 'LONG_PREFIX_SET_COUNT' } as const
        
54. [**「頑張る = 厳格」とは限らない 4. 型の主従関係 下流工程では、そのまま受け流すことで正しく伝搬することができます。 「下流ではむしろ型を付与しない方が良い」ことがわかります。 export = {**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_56.jpg)
            INCREMENT: 'LONG_PREFIX_INCREMENT', DECREMENT: 'LONG_PREFIX_DECREMENT', SET_COUNT: 'LONG_PREFIX_SET_COUNT' } as const
        
55. [**「上流下流 = 依存関係 = 型の主/従」 4. 型の主従関係 依存関係は、型の主従関係そのものです。 次の様なヘルパー関数として定義された純関数は、依存がありません。 export**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_57.jpg)
            function isNumberLikeString(value: string) { return !value.match(/[^-^0-9^.]/g) } // function isNumberLikeString(value: string): boolean
        
56. [**「上流下流 = 依存関係 = 型の主/従」 4. 型の主従関係 「上流工程なのか・下流工程なのか」は一目瞭然で、 ファイル上部の import**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_58.jpg)
            を見ればすぐにわかります。 export function isNumberLikeString(value: string) { return !value.match(/[^-^0-9^.]/g) } // function isNumberLikeString(value: string): boolean
        
57. [**「上流下流 = 依存関係 = 型の主/従」 4. 型の主従関係 何も import していなければ、そこは最上流ということができます。**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_59.jpg)
            型定義だけでなく「実装そのもの」が最上流になり得ます。 export function isNumberLikeString(value: string) { return !value.match(/[^-^0-9^.]/g) } // function isNumberLikeString(value: string): boolean 「型定義 > 実装」ではなく「上流 > 下流」である
        
58. [**4. 型の主従関係 ▪ 型定義が上流工程とは限らない ▪ 依存関係が型の主従関係そのものである 4. 型の主従関係**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_60.jpg)
            
        
59. [**5. 源流を辿る型定義**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_61.jpg)
            
        
60. [**その定義は、伝言ゲームになっていないか？ 中流工程において「攻めの策略」が誤っていた場合、 本来の正しい型が覆されるリスクがあることは先に述べたとおりです。 全工程において「策略のルーツ」を伝搬することが望ましいです。 複雑な型定義の需要は、ここに帰結します。 5. 源流を辿る型定義**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_62.jpg)
            
        
61. [**伝家の宝刀、typeof 型クエリー 5. 源流を辿る型定義 typeof キーワードを用いることで、 定義済みの実装から「型を読み取る」ことができる型クエリー。 Assertion による型の補足もそのまま引き継がれます。 type**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_63.jpg)
            UserState = typeof userState const userState = { user_id: '', name: '', tasks: [] as Task[] }
        
62. [**伝家の宝刀、typeof 型クエリー 5. 源流を辿る型定義 「実装推論と同じ」ということができます。 同等の型定義を付与してまわるよりも、 正確な型情報を導出することができます。 type UserState =**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_64.jpg)
            { user_id: string; name: string; tasks: Task[]; } type UserState = typeof userState const userState = { user_id: '', name: '', tasks: [] as Task[] }
        
63. [**中流構築が捗る Utility Types 5. 源流を辿る型定義 この typeof キーワードで導出した型を加工してみます。 「Partial」は全てのプロパティを「Optional」に変換する Unility**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_65.jpg)
            Types です。 type Injects = { user_id?: string | undefined; name?: string | undefined; tasks?: Task[] | undefined; } type UserState = typeof userState type Injects = Partial<UserState>
        
64. [**中流構築が捗る Utility Types 5. 源流を辿る型定義 TypeScript にあらかじめビルトインされた「Utility Types」を利用すると、 既出の型から新しい型定義を創出することができます。 type**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_66.jpg)
            Injects = { user_id?: string | undefined; name?: string | undefined; tasks?: Task[] | undefined; } type UserState = typeof userState type Injects = Partial<UserState>
        
65. [**中流構築が捗る Utility Types 5. 源流を辿る型定義 この型の使い所は、例えば次の様なファクトリ関数です。 デフォルト値と、オプションで注入する値をマージしたうえで、 「UserState」型と齟齬のない値を返却します。 function userStateFactory(injects?:**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_67.jpg)
            Injects): UserState { return { ...userState, ...injects } }
        
66. [**中流構築が捗る Utility Types 5. 源流を辿る型定義 typeof キーワードは宣言済み変数のみならず、関数にも適用できます。 「ReturnType」も、ビルトイン Utility Types**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_68.jpg)
            のひとつです。 type StoreState = { user: ReturnType<typeof userStateFactory> app: ReturnType<typeof appStateFactory> }
        
67. [**中流構築が捗る Utility Types 5. 源流を辿る型定義 次の例は、先に定義済みの「userStateFactory」関数を参照し、 その関数戻り型を摘出する「ReturnType」を併せて構築した型です。 type StoreState =**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_69.jpg)
            { user: ReturnType<typeof userStateFactory> app: ReturnType<typeof appStateFactory> }
        
68. [**中流構築が捗る Utility Types 5. 源流を辿る型定義 推論で得られる型は次のとおりです。 type StoreState = {**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_70.jpg)
            user: { user_id: string; name: string; tasks: Task[]; }; app: { initalized: boolean; isConnecting: boolean; }; }
        
69. [**中流構築が捗る Utility Types 5. 源流を辿る型定義 ここまでで型定義は3つ。「UserState・Injects・StoreState」です。全ての 型に含まれる「user_id: string」のルーツは「const userState」でした。 ルーツを参照しているので、次のリファクタは全てに伝搬します。**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_71.jpg)
            const userState = { member_id: null as string | null, name: '', tasks: [] as Task[] } const userState = { user_id: '', name: '', tasks: [] as Task[] }
        
70. [**Conditional Types が強力なわけ 5. 源流を辿る型定義 「Conditional Types」は 型の三項演算子です。 Generics に与えた型「T」が、比較対象型「number」と**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_72.jpg)
            互換性がある場合、任意型を導きます。 type IsNumber<T> = T extends number ? true : false type T1 = IsNumber<1> // type T1 = true type T2 = IsNumber<'2'> // type T2 = false
        
71. [**Conditional Types が強力なわけ 5. 源流を辿る型定義 Conditional Types では、比較対象型の「部分導出」が可能です。 組み込み Utility**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_73.jpg)
            Types の「ReturnType」も、これを利用しています。 type ReturnType<T> = T extends (...args: any) => infer I ? I : any
        
72. [**Conditional Types が強力なわけ 5. 源流を辿る型定義 比較対象型内で「infer I」が指定されている場所が、 導出対象です。戻り型を指していることが分かります。 type ReturnType<T>**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_74.jpg)
            = T extends (...args: any) => infer I ? I : any 比較対象型
        
73. [**Conditional Types が強力なわけ 5. 源流を辿る型定義 Generics に与えられた型「T」が、関数として評価できる場合、 「infer I」に相当する型を導出するということです。 type**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_75.jpg)
            ReturnType<T> = T extends (...args: any) => infer I ? I : any
        
74. [**Conditional Types が強力なわけ 5. 源流を辿る型定義 先の例では「戻り型」を導出していましたが、 例えば「関数第二引数型」の導出などが可能になります。 type Arguent2<T> =**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_76.jpg)
            T extends (a1: any, a2: infer I) => any ? I : never
        
75. [**Conditional Types が強力なわけ 5. 源流を辿る型定義 「Conditional Types」を組み合わせれば、 複雑に入り組んだ源流であっても、辿ることができます。 type Arguent2<T>**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_77.jpg)
            = T extends (a1: any, a2: infer I) => any ? I : never
        
76. [**5. 源流を辿る型定義 ▪ 下流工程はそのまま受け流すことが最も厳格 ▪ 複雑な型定義は、源流を辿るためにある 5. 源流を辿る型定義**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_78.jpg)
            
        
77. 
            
            ▪ 策略の通達は、必要に応じて随時行う ▪ 攻めの策略には、隙が生まれることを心得る ▪ 合意に基づき、プログラマが品質を担保する ▪ 型定義が上流工程とは限らない ▪ 依存関係が型の主従関係そのものである ▪ 下流工程はそのまま受け流すことが最も厳格 ▪ 複雑な型定義は、源流を辿るためにある
        
78. [**ご静聴ありがとうございました**](https://files.speakerdeck.com/presentations/1219ea39ce634ad8be5e954e37364d8e/slide_80.jpg)