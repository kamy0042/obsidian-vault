---
タグ: []
作成日時: 2021-01-15T18:08:00
Tags: [topic/デザイン/情報設計]
---
DDD連載記事

- [なぜDDD初心者はググリ出してすぐに心がくじけてしまうのか](http://little-hands.hatenablog.com/entry/2017/09/24/005903)
- [ドメイン駆動設計の定義についてEric Evansはなんと言っているのか](http://little-hands.hatenablog.com/entry/2017/09/27/014403)
- [モデルでドメイン知識を表現するとは何か](http://little-hands.hatenablog.com/entry/2017/10/04/201201)
- [ドメイン駆動設計で実装を始めるのに一番とっつきやすいアーキテクチャは何か](http://little-hands.hatenablog.com/entry/2017/10/04/231743)
- [ドメイン駆動 + オニオンアーキテクチャ概略](http://little-hands.hatenablog.com/entry/2017/10/11/075634)

## 概要

[DDDの定義についてEric Evansはなんと言っているのか](http://little-hands.hatenablog.com/entry/2017/09/27/014403)
この記事でドメイン駆動開発の定義は以下のようなものであると書きました。

> ドメインの中核となる複雑さと機会に焦点を当てるドメイン専門家とソフトウェア専門家のコラボレーションでモデルを探求する明示的にそれらのモデルを表現するソフトウェアを書く境界付けられたコンテキストの中のユビキタス言語で話す

では、ドメインの知識を言語化したモデルは、最終的にコードでどのように表現されるのでしょうか？

## 不変条件

まず、業務の制約について考える時に ***不変条件*** というものについて考えます。

```plain text
不変条件： モデルが有効である期間中、常に一貫している必要のある状態のこと
```

仕様、制約条件といった様々な呼び方がありますが、DDDの用語としては不変条件、という言葉を使うのでそれで統一します。

## ドメインの知識を表現していないモデル

例えば、とある業務アプリケーションでタスクというものをモデリングするとします。要件定義したところ、以下の不変条件を満たす必要があるということがわかりました。

> タスクは必ずタスク名、期日を持つタスクは未完了状態で作成し、完了したら戻すことはできないタスクは3回だけ、1日ずつ延期することができる。タスク名は変更することができない

これを実装してみます。

※ Spring Data JPA(Hibernate)を使用した実装イメージです。Spring Data JPAについてあまり詳しくなくてもイメージはわくと思いますが、不明な点は別途調べてみてください。

```plain text
@Entity
public class Task {
    @Id
    @GeneratedValue
    private Long id;
    private TaskStatus taskStatus;
    private String name;
    private LocalDate dueDate;
    private int postponeCount;
    public static final int POSTPONE_MAX_COUNT = 3;

    public Task() {
    }

    /*
     * すべての項目にsetter
     */
    public void setId(Long id) { this.id = id; }
    public void setTaskStatus(TaskStatus taskStatus) { this.taskStatus = taskStatus; }
    public void setName(String name) { this.name = name; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public void setPostponeCount(int postponeCount) { this.postponeCount = postponeCount; }

    /*
     * すべての項目にgetter
     */
    public Long getId() { return this.id; }
    public String getName() { return this.name; }
    public TaskStatus getTaskStatus() { return this.taskStatus; }
    public LocalDate getDueDate() { return this.dueDate; }
    public int getPostponeCount() { return this.postponeCount; }
    
    /*
     * かろうじて振る舞いを持たせたメソッド
     */
    public boolean canPostpone() { return this.postponeCount < POSTPONE_MAX_COUNT; }
}

```

```plain text
public enum TaskStatus {
    UNDONE, DONE
}

```

```plain text
public class TaskApplication {
    @Autowired
    private TaskRepository taskRepository;
    
    public void createTask(String name, LocalDate dueDate) {
        if (name == null || dueDate == null) {
            throw new IllegalArgumentException("必須項目が設定されていません");
        }
        Task task = new Task();
        task.setTaskStatus(TaskStatus.UNDONE);
        task.setName(name);
        task.setDueDate(dueDate);
        task.setPostponeCount(0);
        taskRepository.save(task);
    }
    
    public void postponeTask(Long taskId) {
        Task task = taskRepository.findById(taskId);
        if (!taks.canPostpone()) {    
            throw new IllegalArgumentException("最大延期回数を超過しています");
        }
        task.setDueDate(task.getDueDate().plusDays(1L));
        task.setPostponeCount(task.getPostponeCount() + 1);
        taskRepository.save(task);
    }
    // 完了処理は略
}

```

できました！要件を満たしていそうですね。TaskApplicationクラスを見る限り、Taskの作成、更新処理は問題なさそうです。これでリリースをしましょう。

・・・ところが、リリースしてから数週間たち、業務をよくわかっていないエンジニアが以下のようなコードを実装してしまいました。

```plain text
public class AnotherTaskApplication {
    @Autowired
    private TaskRepository taskRepository;
    
    public void createDoneTask(String name, LocalDate dueDate) {
        Task task = new Task();
        task.setTaskStatus(TaskStatus.DONE);  // × 完了状態でタスク生成
        task.setPostponeCount(-1); // × カウントがまさかのマイナス
        taskRepository.save(task);
    }

    public void changeTask(Long taskId, String name, LocalDate dueDate, TaskStatus taskStatus) {
        Task task = taskRepository.findById(taskId);
        task.setName(name); // × 変更してはいけないタスク名を変更
        task.setDueDate(dueDate); // × 勝手に期日を入力値で設定、延期回数も無視
        task.setTaskStatu(taskStatus); // × タスクを未完了に戻せてしまう
        taskRepository.save(task);     }
}

```

すごいですね、不変条件をしこたま破壊することができました。

やっかいなのは、AnotherTaskAPplicationクラスを作って実装しているので、元のTaskApplicationクラスを実装した人はこんな処理が別クラスで書かれていることを気づけませんでした。(レビュー体制どうなってんだとかは一旦置いておきましょう)

この事例では、Applicationで仕様を表現していますが、すべての項目にSetter/GetterがあるTaskモデル自体は何も表現できていません。

このような状態を ***ドメインモデル貧血症*** といいます。

不変条件を表現できていないこのオブジェクトは、もはやモデルではなく、リレーショナルモデルをオブジェクトに投影した ***単なるデータモデル*** にすぎません。そしてこのようなアプリケーションは、 ***トランザクションスクリプト*** と言えます。

さて、それではどうすればモデルに不変条件を表現させることができるのでしょうか？

## ドメインの知識を表現しているモデル

```plain text
@Entity
class Task {
    @Id
    @GeneratedValue
    private Long id;
    private TaskStatus taskStatus;
    private String name;
    private LocalDate dueDate;
    private int postponeCount;
    private static final int POSTPONE_MAX_COUNT = 3;

    /*
     * コンストラクタ： エンティティ作成時の不変条件を表現する
     */
    public Task(String name, LocalDate dueDate) {
        if (name == null || dueDate == null) {
            throw new IllegalArgumentException("必須項目が設定されていません");
        }
        this.name = name;
        this.dueDate = dueDate;
        this.taskStatus = TaskStatus.UNDONE;
        this.postponeCount = 0;
    }

    /*
     * 状態遷移メソッド：作成済みエンティティの状態遷移に関する不変条件を表現する
     */
    public void postpone() {
        if (postponeCount >= POSTPONE_MAX_COUNT) {
            throw new IllegalArgumentException("最大延期回数を超過しています");
        }
        dueDate.plusDays(1L);
        postponeCount++;
    }
    public void done() {
        this.taskStatus = TaskStatus.DONE;
    }
    
    // nameのsetterは存在しないので、nameを変更することはできない

    /*
     * getter、状態取得メソッド
     */
    public Long getId() { return id; }
    public String getName() { return name; }
    public LocalDate getDueDate() { return dueDate; }
    public boolean isUndone() { return this.taskStatus == TaskStatus.UNDONE; }
    public boolean canPostpone() { return this.postponeCount < POSTPONE_MAX_COUNT; }
}

// 同じパッケージに、enumはパッケージプライベートで定義する
enum TaskStatus {
    UNDONE, DONE
}

```

```plain text
public class TaskApplication {
    @Autowired
    private TaskRepository taskRepository;

    public void createTask(String name, LocalDate dueDate) {
        Task task = new Task(name, dueDate); // taskインスタンスは、常に不変条件を満たした形で生成される
        taskRepository.save(task);
    }

    public void postpone(Long taskId) {
        Task task = taskRepository.findById(taskId);
        task.postpone();　// 取得したオブジェクトに対して、不変条件を破壊するような処理はapplicationから書くことができない
        taskRepository.save(task);
    }
    // 完了処理は略
    // バリデーションは略
}

```

不変条件を課す処理をモデルに移譲したところ・・・非常に表現力が豊かなモデルができあがりました！！

Taskモデルのコンストラクタと状態遷移メソッドで不変条件を見事に表現しています。

この設計のメリットとして以下のようなものが挙げられます。

- Taskクラスを読むだけで、Taskモデルの不変条件が理解できる
- アプリケーションでどのようなコードを書こうが、不変条件を破った状態遷移をさせることができない
- レビュー時にもこのクラスだけ見れば安心
- 1クラス単体テストで不変条件保持の担保ができる

いいことづくめですね。

こう書けば ***モデルがドメインの知識を表現している*** ということができるでしょう。

## 定義の振り返り

ドメイン駆動の定義を再度振り返ってみましょう。

> ドメインの中核となる複雑さと機会に焦点を当てるドメイン専門家とソフトウェア専門家のコラボレーションでモデルを探求する明示的にそれらのモデルを表現するソフトウェアを書く境界付けられたコンテキストの中のユビキタス言語で話す

上記の例で、モデルを表現したソフトウェアを書くことができました。

このような設計にしただけでも、大きなメリットを得ることができましたが、ドメイン駆動はそれだけでは終わりません。このようなモデルが、どのような振る舞いをするのか、仕様変更時にどう変わるのか。それを業務(ドメイン)のエキスパートと言葉の定義を合わせ、常に最新の、より表現力の高いモデルを追求し、コードを追従させていく。

これこそが読んで字のごとく ***ドメインモデル駆動開発*** なのです。

この記事を読んで、「あれ、DDDいいかも？」と思っていただければ幸いです。今後も引き続きDDDを布教する記事を書いていきますので、よろしければお付き合いください。

### もっと詳しく知りたい方は

[little-hands.booth.pm](https://little-hands.booth.pm/items/1835632)

初めてDDDを学ぶ方、もしくは実際に着手して難しさにぶつかっている方向けの書籍を出しました。
迷子になりがちな「DDDの目的」や「モデル」の解説からはじめ、
具体的なモデリングを行い実装まで落とす事例を元に、DDDの魅力や効果を体感することを目指します。

この本の「2章 モデリングから実装まで」では、本ブログ記事からさらに踏みこんで、ドメインモデリングを行い、その結果をコードに落とすまでの一連の流れを解説しています。
よろしければお求めください。

Twitterでも、DDDに関して発信したり、「質問箱」というサービスを通じて質問を受け付けています。こちらもよろしければフォローしてください。

[松岡@技術書典8Day2え28 / DDDブログ書いてます (@little_hand_s) | Twitter](https://twitter.com/little_hand_s)