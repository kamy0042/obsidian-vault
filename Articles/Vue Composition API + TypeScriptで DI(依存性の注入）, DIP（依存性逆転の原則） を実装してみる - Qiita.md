---

Tags: [topic/技術/Vue, topic/技術/ソフトウェア設計]
---
SOLID原則に出てくるDI（依存性の注入）とDIP（依存関係の逆転の原則)を勉強したので、自分なりにVue Composition API + TypeScriptでのコンポーネント設計に応用してみました。

# 🛠 DI, DIPとは？

最初にサンプルコードを元にDI（依存性の注入）とDIP（依存関係の逆転の原則)を復習します。
既にDI, DIPを知っている方はスキップして[こちら](https://qiita.com/ryo2132/items/03380df2df5b4b2933d7#-vue-composition-api--typescript%E3%81%A7%E3%81%AE%E5%AE%9F%E8%B7%B5)へ。

以下Engineクラスに依存するCarクラスをDI, DIPを用いてリファクタリングしていきます。

`class Car {
  private engine: Engine;
  constructor(private type: string) {
    this.engine = new Engine(type);
  }

  move() {
    this.engine.start();
    // ..処理
  }
}

class Engine {
  constructor(public type: string) {}

  start() {
    // ..処理
  }
}

const car = new Car("Honda");
car.move();`

CarクラスはEngineクラスをconstructor内でnewしています。そして、moveメソッドでCarクラスのstartメソッドを実行しています。
つまり、Carクラスのconstructor、moveメソッドはEngineクラスに深く依存しています。

この状態でCarクラスをユニットテストしようと思っても、内部でnewするEngineクラスの実装に影響されてしまいます。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114396%2F5cbbb002-ef1a-59bc-b675-679fb4680094.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=cd4a6e0a4e4677276ca3cc3077434b15)

## DI（依存性の注入）

DIは`Dependency injection` の略で日本語では`依存性の注入`といいます。

内部で使用するクラス（依存するクラス）を内部でnewするのではなく、クラスの初期化時に引数で渡す（注入する）。これがDIです。

DIをすることで
・ソフトウェアの階層をきれいに分離した設計が容易になる
・コードが簡素になり、開発期間が短くなる
・テストが容易になり、「テスト・ファースト」による開発スタイルを取りやすくなる
などのメリットがあります。

サンプルコードを、Carクラスのコンストラクタ内でEngineをnewするのではなく、EngineクラスのインスタンスをCarクラスの初期化時に渡すように修正します。

`class Car {
　// 初期化時に引数としてEngineのインスタンスを受け取る
  constructor(private engine: Engine) {}

  move() {
    this.engine.start();
    // ..処理
  }
}

class Engine {
  constructor(public type: string) {}

  start() {
    // ..処理
  }
}

const engine = new Engine("Honda");
// CarクラスにEngineのインスタンスを注入している
const car = new Car(engine);
car.move();`

こうすることで、依存するEngineを初期化時に動的に差し替えられるようになります。
Carクラスのユニットテストの際に、Engineをモックに差し替えるなども容易です。

ただ、まだCarクラスはEngineに依存している状態に変わりはありません。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114396%2F5cbbb002-ef1a-59bc-b675-679fb4680094.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=cd4a6e0a4e4677276ca3cc3077434b15)

## DIP(依存関係の逆転の原則）

DIPは`Dependency inversion principle` の略で日本語では`依存関係逆転の原則`といいます。
DIPの定義は以下の通りです。

> 1 上位レベルのモジュールは下位レベルのモジュールに依存すべきではない。両方とも抽象（abstractions)に依存すべきである。
2. 抽象は詳細に依存してはならない。詳細が抽象に依存すべきである。

CarクラスはDIでEngineクラスへの依存を注入しているものの、まだCarが引数として定義している型はEngineクラスで具象に依存しています。
これではDIPを守れていないので、IStartableというインタフェース（抽象）を定義し、Carのコンストラクタの引数をIStartableに変更します。

`interface IStartable {
  start: () => void;
}

class Car {
  constructor(private engine: IStartable) {}

  move() {
    this.engine.start();
    // ..処理
  }
}

class Engine implements IStartable {
  constructor(public type: string) {}

  start() {
    // ..処理
  }
}

const engine = new Engine("Honda");
const car = new Car(engine);
car.move();`

Carクラスは具象クラスのEngineに依存せず、抽象クラスのIStartableへ依存するようになりました。
また、Engine自体もIstartableをimplementsすることで、IStartableへ依存するようになりました。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114396%2F332b3521-a433-8917-e9bf-9f7cc54c792f.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=e67c19e5e1f2e5b2d371fbce0dfe2ee0)

これでCarクラスをDIPに実装できました

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f389.png)

# 🛠 Vue Composition API + TypeScriptでの実践

さてここからが本題。
DI, DIPをVue Composition API + TypeScriptで実践していきます。

まず、リファクタリング対象となるサンプルコードです。
TasksコンポーネントはsetupのタイミングでApiClientクラスをnewして、onMountedのタイミングでタスク一覧を取得しています。

apiClient.ts

`import { Task } from "@/types/type";
import axios, { AxiosInstance } from "axios";

export class ApiClient {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://example.com/api/v1',
      headers: {'X-Custom-Header': 'foobar'}
    })
  }

  async fetchTasks() {
    const { data } = await this.client.get<Task[]>('/tasks');
    return data;
  }
}`

tasks.vue

`<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="task">
      <h2>{{ task.title }}</h2>
      <p>{{ task.note }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@vue/composition-api";
import { Task } from "@/types/type";
import { ApiClient } from "@/apis/apiClient";

export default defineComponent({
  setup() {
    const client = new ApiClient();

    const tasks = ref<Task[]>([]);

    onMounted(async () => {
      try {
        tasks.value = await client.fetchTasks();
      } catch (e) {
        console.log(e);
      }
    });
    return {
      tasks
    };
  }
});
</script>`

この状態では先ほど説明したCarクラスの最初の状態と同じく、このTasksコンポーネントはApiClientクラスに密に結合しています。
そのため、急にAPiクライアントを差し替えることになった場合など、Tasks.vueに変更が必要です。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114396%2F736571f2-1bca-861b-032c-fb8c93488ccf.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=6030d1bb05579fc8e3e75655dc4f207f)

## provide/injectでDI(依存性の注入)

Tasks.vueのApiClientへの依存を弱くするため、DIを使います。
Vue-Composition-APIでのDIはprovide/injectを使います。
APIの詳細は公式APIリファレンスの[Dependency Injection](https://vue-composition-api-rfc.netlify.app/api.html#dependency-injection) を参照してください。

役割的にはVue2系のprovide/injectと変わりません。

まず、Vueインスタンスをマウントするエントリーファイルのmain.tsで、ApiClientをprovideします。
また、provideにはキーが必要なので、ApiClientで新たに作成しexportするようにします。

apiClient.ts

`import { Task } from "@/types/type";
import axios, { AxiosInstance } from "axios";

export const DefaultApiClient = Symbol("api")

export class ApiClient {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://example.com/api/v1',
      headers: {'X-Custom-Header': 'foobar'}
    })
  }

  async fetchTasks() {
    const { data } = await this.client.get<Task[]>('/tasks');
    return data;
  }
}`

main.ts

`import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi, { provide } from "@vue/composition-api";
import { ApiClient, DefaultApiClient } from "./apis/apiClient";

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

const apiClient = new ApiClient();

new Vue({
  render: h => h(App),
  setup() {
    provide<ApiClient>(DefaultApiClient, apiClient);
    return {};
  }
}).$mount("\#app");`

これでApiClientの注入ができたので、Task.vueでapiClientをinjectで参照するように修正します。

Page.vue

`<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="task">
      <h2>{{ task.title }}</h2>
      <p>{{ task.note }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted } from "@vue/composition-api";
import { DefaultApiClient, ApiClient } from "@/apis/apiClient";
import { Task } from "@/types/type";

export default defineComponent({
  setup() {
    const client = inject<ApiClient>(DefaultApiClient);

    // injectの戻り値が T | void のUnion型のため
    if (!client) {
      throw "provie missing.";
    }
    const tasks = ref<Task[]>([]);

    onMounted(async () => {
      try {
        tasks.value = await client.fetchTasks();
      } catch (e) {
        console.log(e);
      }
    });
    return {
      tasks
    };
  }
});
</script>`

これでTasks.vueは直接ApiClientをnewすることはなくなり、ApiClientへの依存性を弱められました。
ただ、まだTasks.vueでApiClientの型を参照しているので依存性は残ります。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114396%2F736571f2-1bca-861b-032c-fb8c93488ccf.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=6030d1bb05579fc8e3e75655dc4f207f)

## InterfaceでDIP(依存関係の逆転の原則)

最後にDIPを実践し、Tasks.vueとApiClientの依存関係を改善します。
基本で説明した通り、DIPでは抽象であるインタフェースを定義して、具象クラス同士の結合を避けるのですね。
なので、最初にIApiインタフェースを定義します。
そして、provideのキーもIApiに移動します。

IApi.ts

`import { Task } from "@/types/type";

export const DefaultApiClient = Symbol("api");

export interface IApi {
  fetchTasks: () => Promise<Task[]>;
}`

そして、ApiClientはIApiをimplementsするように修正します。

apiClient.ts

`import { IApi } from "@/interfaces/IApi";
import { Task } from "@/types/type";
import axios, { AxiosInstance } from "axios";

export class ApiClient implements IApi {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://example.com/api/v1',
      headers: {'X-Custom-Header': 'foobar'}
    })
  }

  async fetchTasks() {
    const { data } = await this.client.get<Task[]>('/tasks');
    return data;
  }
}`

最後にmain.tsと、Tasks.vueをIApiへの依存になるように修正します。

main.ts

`import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi, { provide } from "@vue/composition-api";
import { DefaultApiClient, IApi } from "./interfaces/IApi";
import { ApiClient } from "./apis/apiClient";

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

const apiClient = new ApiClient();

new Vue({
  render: h => h(App),
  setup() {
    provide<IApi>(DefaultApiClient, apiClient);
    return {};
  }
}).$mount("\#app");`

Tasks.vue

`<template>
  <div>
    <div v-for="task in tasks" :key="task.id" class="task">
      <h2>{{ task.title }}</h2>
      <p>{{ task.note }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted } from "@vue/composition-api";
import { DefaultApiClient, IApi } from "@/interfaces/IApi";
import { Task } from "@/types/type";

export default defineComponent({
  setup() {
    const client = inject<IApi>(DefaultApiClient);

    // injectの戻り値が T | void のUnion型のため
    if (!client) {
      throw "provie missing.";
    }
    const tasks = ref<Task[]>([]);

    onMounted(async () => {
      try {
        tasks.value = await client.fetchTasks();
      } catch (e) {
        console.log(e);
      }
    });
    return {
      tasks
    };
  }
});
</script>`

これでTasks.vueは直接具象クラスのApiClientに依存することはなく、抽象クラス（インタフェース）のIApiへ依存することになりました。

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f389.png)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114396%2F201bc6be-44b5-3dff-2826-e2be69d88d24.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=bd81e3f20b079bba2f165b1bcf5c079e)

# 🛠活用例

DI、DIPを実践することで疎結合なコンポーネントができたので、この設計がどのように活用できるのか考えてみます。

## API差し替えでの活用

この状態であれば突然「Axiosをfetch APIに変更する」となっても、Tasks.vueに変更は不要です。
新しくIApiをimplementsしたfetchApiClient.tsを作成し、main.tsでapiClientと差し替えてprovideすれば完了します。

fetchApiClient.ts

`import {IApi} from "@/interfaces/IApi";
import {Task} from "@/types/type";

export class FetchApiClient implements IApi {
  BASE_URL = "https://example.com/api/v1";

  async fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${this.BASE_URL}/tasks`);
    return await response.json();
  }
}`

main.ts

`import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi, { provide } from "@vue/composition-api";
import { DefaultApiClient, IApi } from "./interfaces/IApi";
import { FetchApiClient } from "@/apis/fetchApiClient";

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

const apiClient = new FetchApiClient(); // ここでnew ApiClient()と差し替えるだけ

new Vue({
  render: h => h(App),
  setup() {
    provide<IApi>(DefaultApiClient, apiClient);
    return {};
  }
}).$mount("\#app");`

## コンポーネントのユニットテストでの活用

また、ApiClientとTasksコンポーネントが疎結合となるのでユニットテストも容易になります。
IApiをimplementsしたモッククライアントを作ればAPIクライアントを容易に置き換えられます。

Tasks.spec.ts

`import { createLocalVue, shallowMount } from "@vue/test-utils";
import Tasks from "../../src/components/Tasks.vue";
import VueCompositionApi from "@vue/composition-api";
import { DefaultApiClient, IApi } from "../../src/interfaces/IApi";

const localVue = createLocalVue();
localVue.use(VueCompositionApi);

// IApiを実装したモックのクライアント
class MockClient implements IApi {
  async fetchTasks() {
    return [
      {
        id: 1,
        title: "買い物",
        note: "人参、牛乳",
        completed: false
      },
      {
        id: 2,
        title: "掃除",
        note: "リビング",
        completed: false
      }
    ];
  }
}

describe("Tasks.vue", () => {
  it("タスク一覧を表示する", async () => {
    const mockClient = new MockClient();
    const wrapper = shallowMount(Tasks, {
      localVue,
      provide: {
        [DefaultApiClient]: mockClient
      }
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const tasks = wrapper.findAll(".task");
    expect(tasks.length).toBe(2);
    expect(tasks.at(1).text()).toContain("掃除");
    expect(tasks.at(1).text()).toContain("リビング");
  });
});`

# 終わりに

以上、「Vue-Composition-API + TypeScriptで実践するDI（依存性の注入）, DIP（依存性逆転の原則）」でした。

正直なところ、設計周りは大の苦手でSOLID原則もまだまだ勉強中です。これで理解が正しいのか自信はないです..。ただ、「記事を書いてマサカリ受けることで、より理解を深められるのでは？」という気持ちで思い切って書いてみました。
指摘、コメント大歓迎です。よろしくお願いします。

# 参考

以下記事とても参考にさせて頂きました

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f64f.png)

- [「依存性逆転の原則」の自分なりの解釈 - 圧倒亭グランパのブログ](http://at-grandpa.hatenablog.jp/entry/dip)
- [How to avoid SOLID principles violations in Vue. JS application](https://itnext.io/https-medium-com-manuustenko-how-to-avoid-solid-principles-violations-in-vue-js-application-1121a0df6197)
- [猿でも分かる! Dependency Injection: 依存性の注入 - Qiita](https://qiita.com/hshimo/items/1136087e1c6e5c5b0d9f)
- [API Reference | Vue Composition API](https://composition-api.vuejs.org/api.html#dependency-injection)
- [Java開発を変える最新の設計思想「Dependency Injection（DI）」とは](https://xtech.nikkei.com/it/free/ITPro/OPINION/20050216/156274/?ST=develop&P=2)