---
Created: 2022-06-21T17:35:00
URL: https://dev.to/puku0x/angular-react-2h4j
URL 1: ""
Tags: [topic/技術/ソフトウェア設計]
---
![[b5ntnl7p4j5xm8fn95hf.jpg]]

Photo by [All Bong](https://unsplash.com/@all_bong?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/architecture?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## 概要

アプリケーション開発において設計は非常に重要です。

本記事では Todo アプリを例に、これまで取り組んできた React アプリケーションのアーキテクチャや実装パターンを紹介します。

このアーキテクチャは筆者の Angular を用いたアプリケーション開発の経験が元になっており、Angular のオピニオンや Angular コミュニティで紹介された設計手法が含まれています。

## コンセプト

コンポーネントとロジックの分離を基本とし、依存関係を単方向にします。

![[s89ue8x23tuzrotq8vsi.png]]

下記に実装例を示します。

- Angular アプリケーションに適用した場合 [https://github.com/puku0x/todo-angular](https://github.com/puku0x/todo-angular)
- React アプリケーションに適用した場合 [https://github.com/puku0x/todo-react](https://github.com/puku0x/todo-react)
- Vue.js アプリケーションに適用した場合 [https://github.com/puku0x/todo-vue](https://github.com/puku0x/todo-vue)

### Data

アプリケーション内で扱うデータは用途に応じて区別しましょう。

> 
> 🤔なぜ？  GET リクエストと POST リクエストで型が違うことはよくあります。また、API の仕様変更に柔軟に対応するためです。

### Model

アプリケーションへの「入力」を表現するデータ型です。定数やAPI のレスポンス等が該当します。

```plain text
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

```

### DTO（Data Transfer Object）

アプリケーションからの「出力」を表現するデータ型です。API リクエスト等が該当します。

```plain text
interface TodoCreateDto {
  title: string;
}

interface TodoUpdateDto {
  id: number;
  title: string;
  completed: boolean;
}

```

### Service

ドメインに関するビジネスロジックは Service に記述します。

![[85iy8zog6er34f08rl9l.png]]

実装は関数やオブジェクトでも構いませんが、`class` を用いた DI パターンは強力なのでお勧めです。

```plain text
export class TodoService {
  constructor(private readonly http: HttpClient) {}

  fetchAll(offset?: number, limit?: number): Promise<Todo[]> {
    return this.http.get(url, params).then(/* 一覧データ */);
  }

  fetch(id: number): Promise<Todo> {
    return this.http.get(url, params).then(/* 詳細データ */);
  }

  create(todo: TodoCreateDto): Promise<Todo> {
    return this.http.post(url, body).then(/* 登録データ */);
  }

  update(id: number, todo: TodoUpdateDto): Promise<Todo> {
    return this.http.put(url, body).then(/* 更新データ */);
  }

  remove(id: number): Promise<number> {
    return this.http.delete(url).then(/* 削除されたデータのID */);
  }
}

```

Service を実装する際は単一責任の原則を心がけましょう。[CQRS](https://docs.microsoft.com/ja-jp/azure/architecture/patterns/cqrs) に倣って入力と出力で分けても良いです。

この他、汎用的なロジックはユーティリティとして分離する場合があります。

```plain text
export function debounce<T>(fn: (args: T) => void, delay: number) {
  let id: number | undefined;
  return (args: T) => {
    clearTimeout(id);
    id = window.setTimeout(() => fn(args), delay);
  };
}

```

### Store

アプリケーション全体で使用する状態は Store に保存します。Store の実装は Angular では [NgRx](https://ngrx.io/)、React では [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) を使うと良いでしょう。

状態はイミュータブルかつ、Reducer が副作用を持たないように実装しましょう。フォームの状態は後述する Presenter 内で保持するのをお勧めします。

アプリケーションによっては Store が必要ない場合もあります。将来的に実装方法が変わる場合に備え、後述する Facade 等の中間層を作っておくと良いでしょう。

### Facade

Facade は Store の実装をコンポーネントから隠すための中間層です。

Angular では Service、React では Hooks として実装すると良いでしょう。

```plain text
export const useTodoListFacade = (arg: { offset?: number; limit?: number }) => {
  const { offset, limit } = arg;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector(todosSelector);
  const isFetching = useSelector(isFetchingSelector);

  const fetchAll = useCallback((arg: { offset?: number; limit?: number; } = {}) => {
    return dispatch(fetchAllTodos(arg)).then(unwrapResult);
  }, [dispatch]);

  const changeOffset = useCallback(
    (offset: number) => {
      const params = new URLSearchParams(location.search);
      params.set('offset', `${offset}`);
      history.push(`/todos?${params}`);
    },
    [history, location.search]
  );

  const changeLimit = useCallback(
    (limit: number) => {
      const params = new URLSearchParams(location.search);
      params.set('limit', `${limit}`);
      history.push(`/todos?${params}`);
    },
    [history, location.search]
  );

  useEffect(() => {
    fetchAll({ offset, limit });
  }, [offset, limit, fetchAll]);

  return {
    isFetching,
    todos,
    changeOffset,
    changeLimit,
    fetchAll,
  } as const;
};

```

Facade から Service を呼び出すこともあります。

### Presenter

Presentational Component 内のロジックを抽出したものが Presenter です。

Presenter にはフォームの値やローカルな状態を持たせましょう。

```plain text
interface FormValues {
  title: string;
  completed: boolean;
}

```

Angular では Service、React では Hooks として実装すると良いでしょう。

```plain text
export const useTodoUpdatePresenter = (arg: { todo: Todo; onUpdate?: (todo: TodoUpdateDto) => void; }) => {
  const { todo, onUpdate } = arg;
  // const [counter, setCounter] = useState(0);

  // フォーム初期値
  const initialValues = useMemo(() => {
    return {
      title: todo.title,
      completed: todo.completed;
    } as FormValues;
  }, [todo]);

  // バリデーション用
  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      title: Yup.string().required('Title is required.')
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const value = {...} as TodoUpdateDto;
      onUpdate && onUpdate(value);
    },
  });

  // const increment = useCallback(() => {
  //   setCounter(counter + 1);
  // }, [counter]);

  // const decrement = useCallback(() => {
  //   setCounter(counter - 1);
  // }, [counter]);

  return {
    ...formik,
    // counter,
    // increment,
    // decrement,
  } as const;
};

```

### Params

Params は Router から URL パラメータを取得し、Page Component に渡します。

Angular では Service、React では Hooks として実装すると良いでしょう。

```plain text
import { useLocation } from 'react-router-dom';

export const useTodoListParams = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const limitParam = params.get('limit') || '10';
  const offsetParam = params.get('offset') || '0';

  return {
    limit: +limitParam,
    offset: +offsetParam,
  } as const;
};

```

ページネーションの状態や検索条件は URL パラメータに保存しましょう。

```plain text
/users?offset=0&limit=10

```

### Page Component

Page Component は Params から取得したデータを Container Component に渡します。

冗長に見えますが「Container Component 以下では既に URL パラメータが解決されている」という状況を作り出すことでデバッグやテストを容易にする狙いがあります。

```plain text
import { TodoListContainer } from './containers';
import { useTodoListParams } from './todo-list.params';

export const TodoListPage = memo(() => {
  const { offset, limit } = useTodoListParams();

  return <TodoListContainer offset={offset} limit={limit} />;
});

```

Page Component は使い回さず URL 毎に作成しましょう。

```plain text
/users/1

```

```plain text
interface RouterParams {
  id: number;
}

export const useTodoDetailParams = () => {
  const { id } = useParams<RouterParams>();

  return { id } as const;
};

```

```plain text
import { TodoDetailContainer } from './containers';
import { useTodoDetailParams } from './todo-detail.params';

export const TodoDetailPage = memo(() => {
  const { id } = useTodoDetailParams();

  return <TodoDetailContainer id={id} />;
});

```

### Container Component

Page Component がパースした値を入力として受け取ります。

Facade 経由で Store の状態を Presentational Component に渡したり、Action を Dispatch したりします。

```plain text
import { TodoUpdate } from '../components';

type Props = {
  id: number;
};

export const TodoUpdateContainer = (props: Props) => {
  const { id } = props;
  const { update } = useTodoUpdateFacade({ id });

  return todo ? <TodoUpdate todo={todo} onUpdate={update} /> : null;
};

```

URL パラメータの変更は Facade で行いましょう。

### Presentational Component

Model を描画するコンポーネントです。

前述した Presenter やユーティリティ、Service 内の静的メソッドを呼ぶ場合がありますが、基本的にPresentational Component にはロジックを書かず描画に専念させましょう。

```plain text
import { useTodoUpdatePresenter } from './todo-update.presenter';

type Props = {
  todo: Todo;
  onUpdate?: (todo: TodoUpdateDto) => void;
};

export const TodoUpdate: React.FC<Props> = (props) => {
  const { todo, onUpdate } = props;

  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    ...
  } = useTodoUpdatePresenter({ todo, onUpdate });

  return <>...</>
}

```

## スタイルガイド

ほぼ [Angular coding style guide](https://angular.io/guide/styleguide) と同じです。これは、React に足りないオピニオンを Angular から取り入れることで意思決定コストを下げるという狙いがあります。

### 命名規則

[Angular coding style guide](https://angular.io/guide/styleguide) に倣い、ファイル名は kabab-case に統一しましょう。この命名規則は検索性に優れるため Angular 以外のプロジェクトでも有用です。

- Model: `xxx.model.ts`
- Service: `xxx.service.ts`
- Hooks: `xxx.hook.ts`
- Presenter: `xxx.presenter.ts`
- Facade: `xxx.facade.ts`
- Params: `xxx.params.ts`
- Store 
    - State: `xxx.state.ts`
    - Selector: `xxx.selector.ts`
    - Reducer: `xxx.reducer.ts`
    - Action: `xxx.action.ts`
- Routing Component: `xxx.route.tsx`
- Page Component: `xxx.page.tsx`
- Container Component: `xxx.container.tsx`
- Presentational Component: `xxx.component.tsx`
- Tests: `xxx.service.spec.ts`, `xxx.component.spec.tsx`

このほか、`class` 名やコンポーネント名は PascalCase、関数は camelCase に統一しましょう。

コンポーネント名のサフィックスは React の場合だと冗長なので消してしまって良いかもしれません。

```plain text
// Angular
@Component({...})
export class TodoListContainerComponent {}
@Component({...})
export class TodoListComponent {}

// React
export const TodoListContainer: React.FC = () => {...}
export const TodoList: React.FC = () => {...}

```

### ディレクトリ構成

Model、Service、Store、Page を起点にドメイン別にディレクトリを分けましょう。ユニットテストはテスト対象となるファイルと同じディレクトリに配置します（コロケーション）。アプリケーション全体で共有するコンポーネントやユーティリティは `shared` 等に入れると良いでしょう。

```plain text
- src/
  - models/
    - todo/
      - todo.model.ts
      - index.ts
    - index.ts
  - services/
    - todo/
      - todo.service.ts
      - todo.service.spec.ts
      - index.ts
    - index.ts
  - store/
    - todo/
      - actions/
        - todo.action.ts
        - todo.action.spec.ts
        - index.ts
      - reducers/
        - todo.reducer.ts
        - todo.reducer.spec.ts
        - index.ts
      - selectors/
        - todo.selector.ts
        - todo.selector.spec.ts
        - index.ts
      - states/
        - todo.state.ts
        - index.ts
      - index.ts
    - index.ts
  - pages/
    - todo/
      - todo-create/
        - components/
          - todo-create/
            - todo-create.component.tsx
            - todo-create.component.spec.tsx
            - todo-create.presenter.ts
            - todo-create.presenter.spec.tsx
            - index.ts
          - index.ts
        - containers/
          - todo-create/
            - todo-create.container.tsx
            - todo-create.container.spec.tsx
            - todo-create.facade.ts
            - todo-create.facade.spec.tsx
            - index.ts
          - index.ts
        - todo-create.page.tsx
        - todo-create.page.spec.tsx
        - todo-create.params.ts
        - todo-create.params.spec.tsx
        - index.ts
      - todo-detail/
      - todo-list/
      - todo-update/
      - todo.route.tsx
      - index.ts
    - index.ts
  - shared/
    - components/
    - hooks/
    - utils/
    - index.ts

```

### その他推奨する規約

TypeScript 自体の書き方に関しては [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/styleguide) 等を参考にします。基本は ESLint/TSLint と Prettier によって自動的に決定されるため混乱は少ないと思われます。

- Default export ではなく、Named export を使いましょう。
- `enum` ではなく、union 型を使いましょう。
- `any` ではなく、`unknown` を使いましょう。

## その他

### Routing Component

`react-router-dom` を利用する場合、ルーティング用のコンポーネントを作成する場合があります。Angular の `xxx-routing.module.ts` に相当します。

```plain text
import { TodoCreatePage } from './todo-create';
import { TodoDetailPage } from './todo-detail';
import { TodoListPage } from './todo-list';
import { TodoUpdatePage } from './todo-update';

export const TodoRoute: React.FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route exact path="/todos" component={TodoListPage} />
        <Route exact path="/todos/new" component={TodoCreatePage} />
        <Route exact path="/todos/:id" component={TodoDetailPage} />
        <Route exact path="/todos/:id/edit" component={TodoUpdatePage} />
      </Switch>
    </Suspense>
  );
};

```

バンドルの肥大化を防ぐため、Routing Component は必ず動的インポートしましょう。Page Component も同様にすると良いでしょう。

```plain text
export const TodoPage = React.lazy(() =>
  import('./todo.route').then((m) => ({ default: m.TodoRoute }))
);

```

アプリケーション全体のルーティングを管理するコンポーネントに渡します。

```plain text
export const App: React.FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/todos" component={TodoPage} />
        <Route path="/users" component={...} />
        <Route path="/settings" component={...} />
      </Switch>
    </Suspence>
  );
};

```

### tsconfig.json

`any` を許可しないようにしましょう。

### Atomic Design

非推奨です。アプリケーションの実装に持ち込まないようにしましょう。

Atomic Design はコンポーネント指向を理解するのに有用ですが、コロケーションが崩れたり、粒度に関する不要な議論が増えるなどのデメリットがあります。

Atomic Design のような設計手法が必要になるのは UI ライブラリを構築する時と考えられますが、その場合のディレクトリ構成は以下のようにすると良いでしょう。

```plain text
- libs/
  - ui-components/
    - button/
      - button.component.tsx
      - button.component.spec.tsx
      - index.ts
    - icon/
    - input/
    - search-input/
    - select/
        - option/
          - option.component.tsx
          - option.component.spec.tsx
          - index.ts
      - select.component.tsx
      - select.component.spec.tsx
      - index.ts
    - index.ts

```

`components/molecules` のように **粒度だけでディレクトリを分ける** のは絶対にやめましょう。

### ビルドツール

create-react-app を使ってビルドした場合、MIT ライセンスに違反するため、eject して `webpack.config.js` を修正するか、[Nx](https://nx.dev/react) 等の他ツールに[移行](https://nx.dev/react/migration/migration-cra)するのを強くお勧めします。

## 終わりに

React を始めた当初、アプリケーションをどのように設計すれば良いか分からず苦労しましたが、過去に携わった Angular アプリケーションでの設計手法や Angular コミュニティを通して得た知識が役に立ちました。

本記事で紹介したアーキテクチャは React アプリケーション用に作成しましたが、もちろん Angular アプリケーションにも適用可能です。これから Angular や React で開発を始める際の参考になれば幸いです。

- Angular アプリケーションに適用した場合 [https://github.com/puku0x/todo-angular](https://github.com/puku0x/todo-angular)
- React アプリケーションに適用した場合 [https://github.com/puku0x/todo-react](https://github.com/puku0x/todo-react)
- Vue.js アプリケーションに適用した場合 [https://github.com/puku0x/todo-vue](https://github.com/puku0x/todo-vue)

## Read next