---
Created: 2021-06-20T22:36:00
URL: https://thinkit.co.jp/article/13274
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[object_oriented_cover_3.jpg]]

今回のテーマは「オブジェクト指向設計の原則」です。これはソフトウェア開発の知見から生まれた設計や開発における原則集で、クラス設計で5つ、パッケージ設計で6つの計11の原則があります（この他にもクラスやオブジェクトに責務を割り当てる方針を導くGRASP（General Responsibility Assignment Software Patterns）という原則もあります）。

このように数多くの原則がありますが、今回は最も重要な原則と言える「オープン・クローズドの原則」と「単一責任の原則」について解説します。

## オープン・クローズドの原則

まず、オープン・クローズドの原則について解説します。オープン・クローズドの原則とは、「拡張に対して開いていて、修正に対して閉じていなければならない」という原則です。つまり、「拡張がしやすく、拡張しても修正箇所はできるだけ少なくなるような設計にするべき」という指針です。

言葉だけの説明では分かりにくいと思うので、サンプルソースで説明しましょう。

```plain text
public class Sample {

    public void write() {
        new TextFile().write("test");
    }
}
```

このサンプルはSampleクラスがTextFileクラスのwriteメソッドを呼び出してテキストファイルに文字を書き込むプログラムですが、このプログラムには欠点があります。SampleクラスがTextFileクラスに依存した作りになっていることです。

例えば、仕様変更や何かでテキストファイルではなくCSVファイルに書き込みたいと思っても、プログラムの中にTextFileという具体的なクラスが登場しているため、プログラムを修正せざるをえません。テキストファイルだけでなく、CSVファイルにも書き込めるプログラムに拡張したくても出来ない作りになっているのです。

そこで、このサンプルプログラムをオープン・クローズドの原則に当てはめて拡張しやすい作りに変更してみます。

まず、Fileというインターフェースを用意します。

```plain text
public interface File {

    void write(String str);

}
```

次に、Fileインターフェースを実装したTextFileクラスとCsvFileクラスを用意します。

```plain text
public class TextFile implements File {

    public void write(String str) {
        // テキストファイルに書き込み
    }
}

public class CsvFile implements File {

    public void write(String str) {
        // CSVファイルに書き込み
    }
}
```

SampleクラスはTextFileという具体的なクラスを呼ぶのではなく、Fileインターフェースを受け取り、そのインターフェースのwriteメソッドを呼ぶように変更します。

```plain text
public class Sample {

    public void write(File file) {
        file.write("test");
    }
}
```

これにより、テキストファイルでもCSVファイルでも、Fileインターフェースを実装したTextFileクラスとCsvFileクラスのインスタンスにより、異なる動きが出来るようになりました。

このように、モジュールの振る舞いを拡張でき（Open）、モジュールの振る舞いを変更しても既存のプログラムには影響を与えないこと（Closed）をオープン・クローズドの原則と言います。

## 単一責任の原則

次に「単一責任の原則」について解説します。単一責任の原則とは、「クラスを変更する理由は1つ以上存在してはならない」、言い換えると「クラスに変更が起こる理由は1つであるべき」という原則です。

ちなみに、変更する理由は「役割」や「責任」という言葉に置き換えることができます（「責務」とも言えます）。

こちらも文章だけではピンとこないと思うので、サンプルプログラムで説明します。

車（Car）クラスを用意します。車クラスは車の属性とそのアクセサメソッド、属性情報を保存する機能を持っています。

```plain text
/**
 * 車クラス.
 */
public class Car {

 private String name;

 private String enjine;

 private String tyre;

 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }

 public String getEnjine() {
  return enjine;
 }

 public void setEnjine(String enjine) {
  this.enjine = enjine;
 }

 public String getTyre() {
  return tyre;
 }

 public void setTyre(String tyre) {
  this.tyre = tyre;
 }

 public void store() throws IOException {

  try (final OutputStreamWriter outputStreamWriter = new FileWriter(new File("c:\\car.txt"))) {
   outputStreamWriter.write("name:" + name + ",enjine:" + enjine + ",tyre:" + tyre);
  }
 }
}
```

この車クラスは一見何の問題ないように見えますが、変更する理由（役割）が2つあります。1つは車の名前やエンジンなど、属性の値を表現するという役割、もう1つは属性の値を保存するというビジネスロジックの役割です。

そもそも、なぜ変更する理由（役割）が単一でなく複数あるといけないのかというと、役割が複数あると、その役割の数分だけ変更する理由が増えてしまうためです。すなわち、複数の役割が異なった理由で変更される可能性があるということです。このサンプルでは属性が変更される場合にクラスを修正する必要が出てきます。

この他にも、属性の値の保存方法がタブ区切りのTSV形式のファイルに仕様変更された場合や、そもそも保存場所がファイルではなくデータベースに変更された場合などもクラスを修正する必要が発生します。

このように、複数の役割を持つ車クラスはとても脆い設計と言えます。複数の役割のうち1つでも変更があればクラスに修正が発生してしまうからです。

車クラスが修正されると、関連する他のクラスにも漏れなく影響が出ます（場合によっては関連するクラスにも修正が発生する）。テストまで完了したクラスに手を入れることは、プログラム修正の他に再テストも必要になります。関連するクラスというよりも、関連する機能全てに再テストが発生します。すなわち、工数が増える元凶となります。

より良い設計とは、疎結合で依存性の少ない設計です。単一責任の原則で言えばクラスの変更理由（役割）が1つであれば良い設計といえます。

それでは、この役割が2つある車クラスを単一の役割に分離し、リファクタリングしてみましょう。

```plain text
/**
 * 車クラス.
 */
public class Car {

 private String name;

 private String enjine;

 private String tyre;

 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }

 public String getEnjine() {
  return enjine;
 }

 public void setEnjine(String enjine) {
  this.enjine = enjine;
 }

 public String getTyre() {
  return tyre;
 }

 public void setTyre(String tyre) {
  this.tyre = tyre;
 }

 @Override
 public String toString() {
  return "name:" + name + ",enjine:" + enjine + ",tyre:" + tyre;
 }
}

/**
 * データ倉庫クラス.
 */
public class DataStorage {

 public void store(Car car) throws IOException {

  try (final OutputStreamWriter outputStreamWriter = new FileWriter(new File("c:\\car.txt"))) {
   outputStreamWriter.write(car.toString());
  }
 }
}
```

データ倉庫（DataStorage）クラスを用意し、車クラスからビジネスロジックである保存機能を分離して移動させます。これにより、車クラスは属性の値を表現するValueObjectの役割だけとなりました。つまり、データの保存方法が変更になっても影響を受けなくなりました。ビジネスロジックだけの役割となったデータ倉庫クラスも影響範囲は然りです。

余談ですが、属性の値を保存するビジネスロジックの機能を分離したことにより、例えば下記のようにインターフェースを設けて保存方法を動的に変えることができるようになります。つまり、Javaのポリモーフィズムを使って異なる振る舞いが実現できます。

```plain text
public interface DataStorage {

  void store(Car car) throws Exception;
}

public class TextFile implements DataStorage {

  @Override
  public void store(Car car) throws Exception {
    // テキストファイルで保存
  }
}

public class TsvFile implements DataStorage {

  @Override
  public void store(Car car) throws Exception {
    // TSVファイル形式で保存
  }
}

public class Database implements DataStorage {

  @Override
  public void store(Car car) throws Exception {
    // データベースに保存
  }
}
```

これをクラス図で書いてみます。クラス図に登場するMainクラスがCarクラスに値を設定し、保存機能を呼び出しているクラスです。

![[object_oriented05_01.png]]

単一責任の原則の話に戻すと、単一責任の原則を適用することにより疎結合で依存性が少なくなり、拡張性が上がったと言えます。

もう2つほど、サンプルプログラムで説明します。まず、下記のコントローラ（Controller）クラスを見てみましょう。

```plain text
/**
 * コントローラクラス.
 */
public class Controller {

 public void start(Customer customer, Status status, Dao dao, Rmi rmi) throws IOException {

  CustomerVO customerVO = customer.get();

  status.check(customerVO);

  dao.insert(customerVO);

  rmi.send(customerVO);

  try (final OutputStreamWriter outputStreamWriter = new FileWriter(new File("c:\\customer.txt"))) {
   outputStreamWriter.write(customerVO.getName());
   outputStreamWriter.write(customerVO.getAge());
   outputStreamWriter.write(customerVO.getAddress());
  }
 }
}
```

こちらも一見すると何も問題がないように見えますが、やはり、単一責任の原則に照らし合わせるとNGです（役割が単一ではなく2つある）。

1つは、次々と決められた順番で機能を呼び出し、処理を委譲する司令塔のような役割です（MVCモデルのControllerのような役割）。もう1つは、ファイル保存というビジネスロジックの役割です。

このコントローラクラスでは、呼び出す機能の順番や機能自体が変更になった場合にはクラスを修正する必要が出てきます。その他にも、保存方法が変更になった場合も修正する必要があります。コントローラクラスの役割を単一に分離し、リファクタリングしてみましょう。

```plain text
/**
 * コントローラクラス.
 */
public class Controller {

 public void start(Customer customer, Status status, Dao dao, Rmi rmi, DataStorage dataStorage) throws IOException {

  CustomerVO customerVO = customer.get();

  status.check(customerVO);

  dao.insert(customerVO);

  rmi.send(customerVO);

  dataStorage.store(customerVO);
 }
}

/**
 * データ倉庫クラス.
 */
public class DataStorage {

 public void store(CustomerVO customerVO) throws IOException {

  try (final OutputStreamWriter outputStreamWriter = new FileWriter(new File("c:\\customer.txt"))) {
   outputStreamWriter.write(customerVO.getName());
   outputStreamWriter.write(customerVO.getAge());
   outputStreamWriter.write(customerVO.getAddress());
  }
 }
}
```

先ほどと同様にデータ倉庫（DataStorage）クラスを用意し、コントローラクラスからビジネスロジックである保存機能を分離して移動させます。これにより、コントローラクラスはMVCモデルのControllerのような司令塔の役割だけとなりました。これでデータの保存方法が変更されても影響を受けません。また、ビジネスロジックだけの役割となったデータ倉庫クラスもコントローラクラスが呼び出す機能の順番や呼び出す機能が変わっても影響を受けなくなりました。

最後に、以下のサンプル（Sample）クラスで見てみましょう。

```plain text
/**
 * サンプルクラス.
 */
public class Sample {

 public Data getData() {
  // データベースよりデータを取得
 }

 public void store(Data data) {
  // データベースにデータを保存
 }

 public void print() {
  // 印刷する
 }

 public void notify() {
  // 通知する
 }
}
```

こちらは、全ての機能がビジネスロジックなのでこのままで良さそうに見えますが、ビジネスロジックだけの機能とはいえ3つの役割がありそうです。

1つは、データベースへのデータ取得と保存、つまりデータベース関連の役割です。あとの2つは、印刷関連と通知関連の役割です。多機能なクラス、つまり複雑な役割を持つクラスは、いずれかの役割に変更があればたちまち全体が影響を受けてしまいます。

こちらも、複数あるサンプルクラスの役割を単一に分離し、リファクタリングしてみましょう。

```plain text
/**
 * データベースクラス.
 */
public class Database {

 public Data getData() {
  // データを取得
 }

 public void store(Data data) {
  // データを保存
 }
}

/**
 * プリンタークラス.
 */
public class Printer {

 public void print() {
  // 印刷する
 }
}

/**
 * 通知クラス.
 */
public class Notice {

 public void notify() {
  // 通知する
 }
}
```

データベース関連のクラス、印刷関連のクラス、通知関連のクラスに分け、サンプルクラスから役割毎に機能を分離し、移動させます。これにより、それぞれの機能で変更があっても、お互いのクラスは影響を受けなくなりました。

クラスの役割を単一にするのは、複数の役割があると異なる理由で変更される可能性があり、これを最小限に止めるメリットがあるためですが、それだけではありません。

役割が単一なクラスは、仕様変更や機能追加、障害対応で修正した場合、変更理由や箇所が特定し易いというメリットもあります。役割が複数ある場合は変更理由も複数ある分、変更理由や箇所を特定し辛く、工数がかさむというデメリットを抱えることになります。

もちろん、単一責任の原則を適用していないクラスでも問題なく動作するので、必ず適用しなければいけないものではありません。しかし、洗練されたクラス、良いデザインにするためには単一責任の原則を蔑ろにすると難しいと言えます。

## おわりに

いかがでしたか。今回はオブジェクト指向設計原則の中で最も重要な原則といえるオープン・クローズドの原則と単一責任の原則について解説しました。

次回はロバストネス図について解説します。