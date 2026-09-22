---
タグ: []
作成日時: 2024-01-30T18:41:00
URL: https://ken-c-lo.hatenadiary.org/entry/20130706/1373092204
Tags: [topic/ツール/Git]
---
![[Attachments/無題のフォルダ/og-image-1500 3.png]]

数個前のcommitを遡って、それを分解して2つのcommitに分けたいとか、たまにある。

### 例えば、`git log`で上から遡って5つ目のcommitを2つに分けたい場合

```plain text


$ git rebase -i HEAD~5
```

git-rebase -i で5個目のcommitを`edit`に変える

```plain text


pick xxxxxx Add JS files

pick xxxxxx Move VendorsCSS files

pick xxxxxx Addjquery.powertip

pick xxxxxx Add font

edit xxxxxx Design for tasks#index  ← 分割したいcommitの 'pick' を 'edit'に変える
```

で、git-rebase -i した状態で、HEADの位置をさらに一つ手前のcommitに移動する

```plain text


$ git reset HEAD~
```

すると、分割したいcommitの中のファイルがUnstageされる

```plain text


Unstaged changes after reset:

M	app/assets/stylesheets/screen.css.sass

M	app/views/tasks/index.html.haml
```

分けたい部分を別々にaddしてcommitし直す

```plain text


$ git add app/assets/stylesheets/screen.css.sass

$ git commit -m 'Sass for tasks#index'

$ git add app/views/tasks/index.html.haml

$ git commit -m 'Markup for tasks#index'
```

とかやって、2つのcommitができたら、普通に

```plain text


$ git rebase --continue
```

すると、普通にrebaseが成功して、commitが遡って分割できる。めでたいヾ(*'ω'*)ﾉﾞ