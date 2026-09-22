---
Created: 2021-01-15T20:25:00
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
**デザインパターン 15章　Facadeパターン**
	
        15.1　[Facadeパターンとは](https://www.techscore.com/tech/DesignPattern/Facade.html/)15.2　[サンプルケース](https://www.techscore.com/tech/DesignPattern/Facade.html/#dp15-2)15.3　[Facadeパターンまとめ](https://www.techscore.com/tech/DesignPattern/Facade.html/#dp15-3)

第15章ではFacadeパターンを学びます。プログラムを作っていくと、最初は小さなものでも、だんだん大きくなっていきます。 たくさんのクラスが出来て、相互に関係しあい、複雑になっていきます。 クラスを使う場合には、それらの関係を正しく理解して、 正しい順番にメソッドを呼び出す必要があります。 大きなプログラムを使って処理を行う場合、 関係しあっているたくさんのクラスを適切に制御しなくてはいけません。 その処理を行うための「窓口」を用意しておくと、 個別にたくさんのクラスを制御しなくても、「窓口」に対して、要求するだけですみます。

Facadeパターンは、既存のクラスを複数組み合わせて使う手順を、「窓口」となるクラスを作ってシンプルに利用できるようにするパターンです。

ちなみに、facadeとはフランス語を語源とする単語で「建物の正面」という意味です。発音するときはファサードの「サ」にアクセントを置きます。

山田くんは昆虫図鑑を借りるため、図書室へ行きました。 ところがどこにおいてあるのかわかりません。所蔵本リストと、貸出帳がおいてあるのですが、使い方がわからないようです。この状態をソースにするとこんな感じです。

```plain text
//所蔵本リスト
public class BookList {
	public String searchBook(String bookName) {
		String location = null;
		//本の名前から探す
		//あればその場所を、なければnullを返す
		return location;
	}
}
```

```plain text
//貸出帳
public class LendingList {
	public boolean check(String bookName) {
		//貸出帳をチェックする
		//貸出中ならtrue、そうでなければfalseを返す
		return true;
	}
}

```

```plain text
//山田くん
public class Visitor {
	public static void main(String[] args) {
		//昆虫図鑑はどこにあるんだ…？
		//いつどこでどのメソッドを使えばいいんだ？？
	}
}
```

山田くんは、BookListとLendingListの使い方がわからないみたいです。そこで、図書委員の中村くんに聞きました。

山田くん：
				　昆虫図鑑を探してるんだけど、どこにあるんだ？
			
			
				中村くん：
				　ちょっと待ってね。

そういうと中村くんは所蔵本リストと貸出帳で調べてくれました。

中村くん：
				　その本は右奥の棚にあって、誰も借りてないよ。
			
			
				山田くん：
				　サンキュ！

こうして探していた本を無事見つけられました。

山田くん：
				　おかげで見つかったぜ。ところで、本の場所ってどうやって探してるんだ？
			
			
				中村くん：
				　簡単だよ。まず、所蔵本リストで、本が図書館にあるかどうか調べるんだ。

探したい本の名前で検索して、所蔵してるかどうか調べるわけ。

で、有ったら貸出中かどうかをチェックするために貸出帳で… 
			
			
				山田さん：
				　なんだかややこしいな。
			
			
				中村くん：
				　そうかな？簡単だと思うけど。
			
			
				山田くん：
				　俺には良くわかんないや。でも、中村に聞いたら教えてくれるもんな。
			
			
				中村くん：
				　まあ、そうだね。
			
			
				山田くん：
				　とにかく、助かったぜ。んじゃまたな〜
			
			
				中村くん：
				　はーい。

さて、これをクラス図にするとこのような感じになります。

![](https://www.techscore.com/page_attachments/0000/0127/facade1.gif)

この場合、図書委員の中村くんが、Facadeパターンの「窓口」の役割を果たしています。そのおかげで、山田くんは所蔵本リストや貸出帳の使い方を知らなくても、中村君に聞けば、ほしい本がどこにあるかわかるわけです。ソースにしてみるとこんな感じです。

```plain text
//図書委員の中村くん
public class Librarian {
	public String searchBook(String bookName) {
		//本を探す
		BookList bookList = new BookList();
		String location = bookList.searchBook(bookName);
		//本の場所がnullではない(所蔵してる)とき
		if (location != null) {
			//貸出中かチェックする
			LendingList lendingList = new LendingList();
			if (lendingList.check(bookName)) {
				//貸出中のとき
				return "貸出中です";
			} else {
				//貸出中ではないとき
				return location;
			}
		//所蔵してないとき
		} else {
			return "その本は所蔵していません";
		}
	}
}
```

```plain text
//山田くん
public class Visitor {
	public static void main(String[] args) {
		//窓口の中村くんを作る
		Librarian nakamura = new Librarian();
		//中村くんに昆虫図鑑の場所を聞く
		String location = nakamura.searchBook("昆虫図鑑");
		if(location.equals("貸出中です")){
			System.out.println("貸出中かよ…");
		}else if(location.equals("その本は所蔵していません")){
			System.out.println("なんだ、ないのか");
		}else{
			System.out.println("サンキュ！");
		}
	}
}
```

山田くんと同じように、本の探し方のわからない人がたくさんいる場合、全員に探し方を教えるのは大変です。でも「中村くんに聞いたら分かるよ」と伝えるだけなら楽ですね。

Facade パターンの一般的なクラス図は以下のようになります。

![](https://www.techscore.com/page_attachments/0000/0129/facade2.gif)

[引用] 『Java言語で学ぶ デザインパターン入門』(結城浩 ソフトバンクパブリッシング株式会社出版 2001年)