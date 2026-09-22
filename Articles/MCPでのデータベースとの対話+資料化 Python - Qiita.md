---
Created: 2025-05-03T02:40:00
URL: https://qiita.com/jw-automation/items/ee08849048f1517d40b2
Tags: [topic/AI]
---
## はじめに

以前から話題になっていたMCP（Model Context Protocol）ですが、Anthropicの独自規格の範囲に留まらず、OpenAIが公式に採用を発表した事で一気に火がつき、最近は至るところでMCPという単語が躍るようになりました。

今回はMCPを利用したデータベースとの対話+資料化までのデモを1つのユースケースとして残しておきたいと思います。

■構成

クライアント：Claude Desktop

データベース：BigQuery

## データベースとの対話+資料化デモ

BigQueryのMCPサーバーについては以下2つが公開されています。

機能的にはほぼ一緒なのですが、後者はデータセット名までパラメータで渡せるので、こちらを使っていきます。

Claude Desktopの構成で以下の設定をするだけで、すぐに使えます。

```plain text
  "mcpServers": {
    "bigquery": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/LucasHild/mcp-server-bigquery.git@main",
        "mcp-server-bigquery",
        "--project",
        "{{GCP_PROJECT_ID}}",
        "--location",
        "{{GCP_LOCATION}}",
        "--dataset",
        "{{DATASET}}",
        "--key-file",
        "{{KEY_FILE_PATH}}"
      ],
    }

```

今回、BigQueryのサンプルデータとして以下のダミーの売上データを使います。

1000件のデータで、店舗別、商品別の売上情報を持っています。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F431306%2Fbfffc68b-a509-433b-88b3-2dcf7846fdde.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1ab95626b8b31d90dc3cda2e70c890ab)

このデータについては何も教えずに(MCPを繋いだだけの状態で)、Claudeからリクエストを投げてみます。

「店舗別、月別売上を時系列で表示して」とリクエストすると、データセット内のテーブルとデータ構造を確認し、必要なSQLクエリを自分で組み立てて実行します。更に、その結果を元にリアルタイムでグラフ生成まで行ってくれています。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F431306%2F33fd1ac8-2580-4c03-8eef-d447a877c90e.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=43a04ac3be70e54e2db5f07c0ca284d2)

要するに、データベースさえ繋いでしまえば、ユーザーの要望とデータ構造を元に必要なSQLを自分で作成・実行する能力を持ち、Reactのコードがはけるのでグラフ生成まで自在にできるという事です。

当然、以下のような円グラフ、棒グラフなどもお手のものです。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F431306%2Fd3cf6e7e-65ea-463a-b886-6c1dfca959ee.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=c17703fb4f4cc319051c0f2a83be1647)

当然、裏側でコードを持っているので、「この色を変えて」「プルダウン選択を追加して」「グラフの縦軸を伸ばして」と言った指示も即座に対応してくれます。

TextToSQLの時は、テーブル構造やCSVのみ、Code Interpreterの時は画像のみといった感じであと一歩感がありましたが、MCP+アーティファクトにより、ノーコードでここまで来れるとなると、少し潮目が変わってきた感覚があります。

BIも業務で構築する立場としては、標準的なBIレポートとこのように非定型な分析がリアルタイムでできるアプリとのバランスを考えていく必要があるなと感じました。

ここまで来るとレポートも出して欲しいなと思ってたので、「HTMLで資料化して」と指示してみると、HTML形式での資料化までその場でやってくれます。

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F431306%2Fcf1ce422-724b-4ded-a45e-7e400e073d59.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=0f3bd1acf05e7449835dd6f7e136b946)

↓ 生成された資料

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F431306%2F6e0ba4bd-c746-45dc-b17c-7a10bdfc2851.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=88ba6fbcffba669820e7b63030652594)

実際のHTMLも貼っておきますので、興味ある方は自分で触ってみて下さい(メモ帳に張り付けて、拡張子htmlで保存してブラウザで開けばグラフが触れます)。

```plain text
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>店舗別・商品別売上分析レポート</title>
  <!-- 最新バージョンのライブラリを使用 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/recharts/2.10.3/Recharts.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #1a56db;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .section {
      background-color: white;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .chart-container {
      height: 400px;
      margin: 20px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px 15px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f2f7ff;
      font-weight: bold;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    .insights {
      background-color: #f0f9ff;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      color: #666;
      font-size: 14px;
    }
    @media (max-width: 768px) {
      .grid-cols-2 {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1 class="text-3xl font-bold">店舗別・商品別売上分析レポート</h1>
      <p class="mt-2">2024年2月 および 2024年1月〜2025年4月の売上データ分析</p>
    </header>

    <section class="section">
      <h2 class="text-2xl font-bold mb-4">概要</h2>
      <p>
        このレポートでは、全店舗の売上データを分析し、店舗別および商品別の売上傾向を可視化しています。
        2024年2月の詳細分析と2024年1月から2025年4月までの時系列での売上推移を確認できます。
      </p>

      <div class="insights">
        <h3 class="font-bold">主な分析結果:</h3>
        <ul class="list-disc ml-5 mt-2">
          <li>2024年2月の総売上額は389,500円</li>
          <li>店舗別売上では、店舗Bが最も高く92,700円（約24%）</li>
          <li>商品別売上では、商品Jが最も高く104,000円</li>
          <li>上位3商品（J, I, H）で全体の約60%の売上を占める</li>
          <li>店舗間の売上差は比較的小さいが、商品間の売上差は大きい</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h2 class="text-2xl font-bold mb-4">2024年2月: 店舗別・商品別売上分析</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 class="text-xl font-semibold mb-3">店舗別売上（円グラフ）</h3>
          <div id="shop-pie-chart" class="chart-container"></div>

          <table>
            <thead>
              <tr>
                <th>店舗</th>
                <th>売上額</th>
                <th>構成比</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>店舗B</td>
                <td>92,700円</td>
                <td>23.8%</td>
              </tr>
              <tr>
                <td>店舗A</td>
                <td>87,700円</td>
                <td>22.5%</td>
              </tr>
              <tr>
                <td>店舗D</td>
                <td>70,500円</td>
                <td>18.1%</td>
              </tr>
              <tr>
                <td>店舗C</td>
                <td>70,000円</td>
                <td>18.0%</td>
              </tr>
              <tr>
                <td>店舗E</td>
                <td>68,600円</td>
                <td>17.6%</td>
              </tr>
              <tr class="font-bold">
                <td>合計</td>
                <td>389,500円</td>
                <td>100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-3">商品別売上（棒グラフ）</h3>
          <div id="item-bar-chart" class="chart-container"></div>

          <table>
            <thead>
              <tr>
                <th>商品</th>
                <th>売上額</th>
                <th>構成比</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>商品J</td>
                <td>104,000円</td>
                <td>26.7%</td>
              </tr>
              <tr>
                <td>商品I</td>
                <td>67,500円</td>
                <td>17.3%</td>
              </tr>
              <tr>
                <td>商品H</td>
                <td>61,600円</td>
                <td>15.8%</td>
              </tr>
              <tr>
                <td>商品G</td>
                <td>49,000円</td>
                <td>12.6%</td>
              </tr>
              <tr>
                <td>商品F</td>
                <td>35,400円</td>
                <td>9.1%</td>
              </tr>
              <tr>
                <td>商品E</td>
                <td>32,000円</td>
                <td>8.2%</td>
              </tr>
              <tr>
                <td>商品D</td>
                <td>23,600円</td>
                <td>6.1%</td>
              </tr>
              <tr>
                <td>商品C</td>
                <td>6,300円</td>
                <td>1.6%</td>
              </tr>
              <tr>
                <td>商品B</td>
                <td>5,400円</td>
                <td>1.4%</td>
              </tr>
              <tr>
                <td>商品A</td>
                <td>4,700円</td>
                <td>1.2%</td>
              </tr>
              <tr class="font-bold">
                <td>合計</td>
                <td>389,500円</td>
                <td>100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="insights mt-6">
        <h3 class="font-bold">分析と考察:</h3>
        <p class="mt-2">
          2024年2月の売上分析では、店舗別の売上はほぼ均等に分布していますが、商品別では大きな偏りが見られます。
          特に商品Jは全体の4分の1以上の売上を占めており、売上への貢献度が高い主力商品となっています。
          一方で商品A、B、Cの売上は非常に低く、これらの商品の販売戦略の見直しや、
          あるいは商品ラインナップからの削除を検討する必要があるかもしれません。
        </p>
      </div>
    </section>

    <section class="section">
      <h2 class="text-2xl font-bold mb-4">店舗別月別売上推移 (2024年1月〜2025年4月)</h2>
      <div id="monthly-sales-chart" class="chart-container" style="height: 500px"></div>

      <div class="insights">
        <h3 class="font-bold">トレンド分析:</h3>
        <p class="mt-2">
          時系列データからは、各店舗の売上に季節変動が見られます。特に注目すべき点として、
          2025年3月に店舗BとAで大幅な売上増加が見られます。これは季節要因や特別なプロモーション、
          あるいは特定商品の需要増加などが影響している可能性があります。
          一方で、店舗Cは2025年3月と4月に売上が大きく落ち込んでおり、原因調査が必要かもしれません。
        </p>
      </div>
    </section>

    <section class="section">
      <h2 class="text-2xl font-bold mb-4">結論と推奨事項</h2>
      <ol class="list-decimal ml-5">
        <li class="mb-2">
          <strong>商品ポートフォリオの最適化:</strong>
          売上貢献度が低い商品A、B、Cの販売戦略を見直し、主力商品へのリソース集中を検討する。
        </li>
        <li class="mb-2">
          <strong>店舗間の知見共有:</strong>
          売上が好調な店舗の販売手法や顧客対応を他店舗と共有し、グループ全体の売上向上を図る。
        </li>
        <li class="mb-2">
          <strong>季節変動への対応:</strong>
          売上が落ち込む時期に向けた販促キャンペーンの計画や、繁忙期に向けた在庫・人員配置の最適化を行う。
        </li>
        <li class="mb-2">
          <strong>データ分析の継続:</strong>
          月次での売上分析を継続し、トレンドの変化に素早く対応できる体制を整える。
        </li>
      </ol>
    </section>

    <footer class="footer">
      <p>© 2025 店舗売上分析レポート | 作成日: 2025年4月27日</p>
    </footer>
  </div>

  <!-- 純粋なD3とJSを使用したグラフ描画 -->
  <!-- データ定義 -->
  <script>
    // 店舗別売上データ
    const shopSalesData = [
      {shop: '店舗B', value: 92700},
      {shop: '店舗A', value: 87700},
      {shop: '店舗D', value: 70500},
      {shop: '店舗C', value: 70000},
      {shop: '店舗E', value: 68600}
    ];

    // 商品別売上データ
    const itemSalesData = [
      {item: '商品J', value: 104000},
      {item: '商品I', value: 67500},
      {item: '商品H', value: 61600},
      {item: '商品G', value: 49000},
      {item: '商品F', value: 35400},
      {item: '商品E', value: 32000},
      {item: '商品D', value: 23600},
      {item: '商品C', value: 6300},
      {item: '商品B', value: 5400},
      {item: '商品A', value: 4700}
    ];

    // 月次売上データ
    const monthlySalesData = [
      {'month': '2024-01', '店舗A': 39600, '店舗B': 100000, '店舗C': 94100, '店舗D': 129700, '店舗E': 52900},
      {'month': '2024-02', '店舗A': 87700, '店舗B': 92700, '店舗C': 70000, '店舗D': 70500, '店舗E': 68600},
      {'month': '2024-03', '店舗A': 76800, '店舗B': 78900, '店舗C': 50000, '店舗D': 35500, '店舗E': 77100},
      {'month': '2024-04', '店舗A': 95300, '店舗B': 46500, '店舗C': 59400, '店舗D': 77700, '店舗E': 52000},
      {'month': '2024-05', '店舗A': 63100, '店舗B': 33400, '店舗C': 80300, '店舗D': 59900, '店舗E': 97600},
      {'month': '2024-06', '店舗A': 89000, '店舗B': 70800, '店舗C': 54100, '店舗D': 96300, '店舗E': 48600},
      {'month': '2024-07', '店舗A': 58900, '店舗B': 108500, '店舗C': 40100, '店舗D': 32800, '店舗E': 72400},
      {'month': '2024-08', '店舗A': 73100, '店舗B': 47900, '店舗C': 78500, '店舗D': 87100, '店舗E': 104900},
      {'month': '2024-09', '店舗A': 47700, '店舗B': 82300, '店舗C': 92000, '店舗D': 63000, '店舗E': 41100},
      {'month': '2024-10', '店舗A': 68500, '店舗B': 134800, '店舗C': 65200, '店舗D': 83300, '店舗E': 97500},
      {'month': '2024-11', '店舗A': 73000, '店舗B': 68800, '店舗C': 106500, '店舗D': 46800, '店舗E': 64800},
      {'month': '2024-12', '店舗A': 83000, '店舗B': 64300, '店舗C': 42900, '店舗D': 48100, '店舗E': 71700},
      {'month': '2025-01', '店舗A': 67600, '店舗B': 70500, '店舗C': 54300, '店舗D': 78600, '店舗E': 59000},
      {'month': '2025-02', '店舗A': 80300, '店舗B': 59400, '店舗C': 87400, '店舗D': 44900, '店舗E': 38200},
      {'month': '2025-03', '店舗A': 132200, '店舗B': 170800, '店舗C': 31400, '店舗D': 64900, '店舗E': 109200},
      {'month': '2025-04', '店舗A': 64700, '店舗B': 47700, '店舗C': 19800, '店舗D': 42000, '店舗E': 64400}
    ];
  </script>

  <!-- Chart.jsを使用したグラフ描画 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.2.0/chartjs-plugin-datalabels.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Chart.jsにDataLabelsプラグインを登録
      Chart.register(ChartDataLabels);
      // 円グラフ
      const shopPieCtx = document.createElement('canvas');
      document.getElementById('shop-pie-chart').appendChild(shopPieCtx);

      // 棒グラフ
      const itemBarCtx = document.createElement('canvas');
      document.getElementById('item-bar-chart').appendChild(itemBarCtx);

      // 折れ線グラフ
      const monthlyLineCtx = document.createElement('canvas');
      document.getElementById('monthly-sales-chart').appendChild(monthlyLineCtx);

      // 円グラフ作成
      new Chart(shopPieCtx, {
        type: 'pie',
        data: {
          labels: shopSalesData.map(d => d.shop),
          datasets: [{
            data: shopSalesData.map(d => d.value),
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed !== null) {
                    label += new Intl.NumberFormat('ja-JP').format(context.parsed) + '円';
                  }
                  return label;
                }
              }
            },
            datalabels: {
              color: '#fff',
              font: {
                weight: 'bold',
                size: 14
              },
              formatter: function(value, context) {
                return context.chart.data.labels[context.dataIndex] + '\n' +
                       new Intl.NumberFormat('ja-JP').format(value) + '円';
              }
            }
          }
        }
      });

      // 棒グラフ作成
      new Chart(itemBarCtx, {
        type: 'bar',
        data: {
          labels: itemSalesData.map(d => d.item),
          datasets: [{
            label: '売上額',
            data: itemSalesData.map(d => d.value),
            backgroundColor: '#8884d8',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('ja-JP').format(context.parsed.y) + '円';
                  }
                  return label;
                }
              }
            },
            datalabels: {
              align: 'end',
              anchor: 'end',
              color: '#333',
              font: {
                weight: 'bold'
              },
              formatter: function(value) {
                return new Intl.NumberFormat('ja-JP').format(value) + '円';
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return (value / 1000) + 'k';
                }
              }
            }
          }
        }
      });

      // 月別売上グラフ作成
      const shopColors = {
        '店舗A': '#0088FE',
        '店舗B': '#00C49F',
        '店舗C': '#FFBB28',
        '店舗D': '#FF8042',
        '店舗E': '#8884D8'
      };

      const monthlyDatasets = Object.keys(shopColors).map(shop => {
        return {
          label: shop,
          data: monthlySalesData.map(d => d[shop]),
          borderColor: shopColors[shop],
          backgroundColor: shopColors[shop],
          tension: 0.1
        };
      });

      new Chart(monthlyLineCtx, {
        type: 'line',
        data: {
          labels: monthlySalesData.map(d => {
            // YYYY-MMから月だけ表示
            return d.month.substring(5);
          }),
          datasets: monthlyDatasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                title: function(context) {
                  // 月表示をYYYY年MM月に変換
                  const month = monthlySalesData[context[0].dataIndex].month;
                  return `${month.substring(0, 4)}年${month.substring(5)}月`;
                },
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('ja-JP').format(context.parsed.y) + '円';
                  }
                  return label;
                }
              }
            },
            // データラベルを無効化
            datalabels: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return (value / 1000) + 'k';
                }
              }
            }
          },
          // マウスホバー時の動作を設定
          interaction: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'index',
            intersect: false
          }
        }
      });
    });
  </script>
</body>
</html>

```

## 個人的な感想

### 業務的なインパクト

こちらについてはもはやMCPとは関係ないのですが、DX・BPRをずっとやってきた立場としては、AIによって以下3つが高精度かつシームレスに繋がるようになった事の破壊力がとてつもないなと思っています。

① TextToSQL

② 動的グラフ生成

③ HTML出力

TextToSQLによって、ユーザー側のSQLの知識が実質不要になり、データベースと自然言語で会話できるようになりました。

もはや誰もがSQLに長けたデータサイエンスのスペシャリストとペアで仕事ができる状態になるので、データ利活用の民主化によるデータドリブンが一気に進む可能性を秘めています。

そもそもデータサイエンティストでさえ、複雑なクエリを自分で作りたいと思う人はいないはずなので(ソフトウェアエンジニアとコーディングの関係)、データサイエンティストの仕事も捗るでしょう。

一方、TextToSQL単体だと、あくまでCSVやテーブルを返すだけなので片手落ち感があったのですが、分析用のグラフをその場で生成してインタラクティブな操作もできるとなると、更に裾野も広くなるのではないかと思います。

Code Interpreterが最初出てきた時も衝撃でしたが、Claude DesktopのArtifactのレベルだと「実務で使いたい！」とおそらくほとんどの人が思うのではないでしょうか。

私自身、Code Interpreterの時のデモと今回のデモを実施した際のユーザーのリアクションが明らかに異なる事を感じており、業務ユーザーでの利用普及におけるUXの壁を越えてきたという感覚があります。

このレベルであれば、今後は管理職や役員のようなクラスでも「このデータ出しておいて」と部下に指示するより、自分でやったほうが早いとなるケースも増えてくるのではないでしょうか。

そして、以前コンサルファームに所属していた事もあり「資料＝パワポ」という意識に引っ張られていたのですが、そもそもAIはパワポよりHTMLのほうが作成も編集も圧倒的に得意なので、HTMLを資料としてそのまま使っても良いかもしれません。

MS Copilotの非常に簡素なパワポ資料に比べ、GensparkがHTMLでかなり良い資料を生成している事からもこれは明らかで、今後は社内資料がパワポベースからHTMLベースになるという企業もどんどん増えてくるのではないでしょうか。

綺麗なパワポが作れるツールもまたおそらく出てくるようになるとは思いますが、そもそもパワポにこだわる必要もないので、HTML+PDF出力が主体になっていくような気もします。

そしてこれらの機能が今まで個別だったものの、「データ取得」→「グラフ化+分析」→「資料化」がインタラクティブかつシームレスに繋がるUXになってきた上に、これを推論モデルでやる事で更に拡張できるようになります。

いわゆる自動化というより、自動化拡張のような形で、おそらく個人レベルでは出しえない様々な角度でのクエリや分析、レポーティングなどを考えてくれるので、単なる自動化・効率化に留まらない威力を持ちます。

むしろ中途半端に細かい指示を出すとAIの分析スコープが狭くなるおそれがあるので、抽象度高めに依頼するほうが推論モデルの実力が発揮されやすいかもしれません (優秀な部下をマイクロマネジするとむしろ生産性が下がるイメージ)。

また今回はBigQueryだけですが、MCPで様々なツールと容易に連携できるようになると、各種公開情報やトレンドデータなどの社外情報も組み合わせた包括的な分析・レポーティングができるようになるでしょう。

もはや自動化タスクとして、日次/週次/月次分析レポートの資料化までAIに任せてしまって、それをベースに社内でディスカッションとなる未来がそう遠くない気がします。

ここで1つ注意が必要なのは、今後はおそらく「**AIを使いこなせるか**」というより「**データがAIの手が届く範囲にあるか(データ基盤が整っているか)**」というイシューのほうが大きくなってくるという点です。

AIがコモディティ化し、推論モデルがあれこれやってくれる世界線においては、「非常に優秀なAIエンジニア×データが散在している組織」と「そこそこのAIエンジニア×データが整備された組織」であれば、圧倒的に後者が強くなります。

AIで最近は話題がもちきりですが、実際のところ、本当に投資すべきはAI以上にデータ基盤の整備・構築になるでしょう。

生成AIの登場によってDXのフェーズが明らかに変わった感があるものの、実際のところ、これまでDXを真面目にやってきた企業が更に加速できるという状態になっています。

少なくとも、優秀なAIエンジニアだけ採用すれば何とかなるという話ではないので注意が必要です。

### 技術的な話

おそらく非エンジニアの人達のほとんどがまだ勘違いしていると思いますが、MCPで機能的にできる事が特に増えたわけではなく、FunctionCallingを含めこれまでもそもそもできていた事が標準化された、つまり、やりやすくなっただけといえばそれだけという形になります。

元々AIエージェントの構築周りをやっていた人は、「これ何が嬉しいの？(何でこんなに騒がれてるの？？)」と感じた人も少なくなかったのではないかと思います。

私も元々BigQueryとTextToSQLで会話するAIエージェントをFunctionCallingで作っていたので、BigQueryのMCPを最初見た時「え、これだけ？」と驚きました。

最初「MCPはUSB-C」というアナロジーが今一つ腑に落ちなかったのですが、USB-Cに標準化される前もそれぞれの規格で充電はできていたものの、USB-Cで充電が楽になったのは確かなので、ある種上手い表現なのかもしれません。

個別アプリの作り込みという観点で言えば、標準的なMCPを使った場合のレスポンスの処理はアプリ側で書く必要があるので、それならばMCPサーバーを自分で立てようという話に結局なりそうな上に、そもそも自分しか使わないならMCP化する意味もあまりないので、そのまま書く方が良いのでは？という形になる気がします。

利用できるものはなるべく活用していきたく、今後のエコシステム化の恩恵と進化は楽しみですが、特化型のケースで言えば、何が何でもMCPかというと、ラッパー処理を書くコストがむしろ高くつく上にレスポンスが遅くなるというケースが少なくない気もするので、今の所はあくまで標準化+公開観点の用途という意識は持っておく必要がありそうです。

既に社内で構築・リリース済みのAIアプリケーションに対して「これもMCP化しよう！」と言うのは明らかに間違いで、とりあえずMCP化すると何かパワーアップするという訳ではありません。

一つありそうだなと思ったのは、社内DWH構築の際にMCPサーバーも構築側がセットで用意してあげるという形です。

毎回AIエージェントがデータベースの一覧取得やスキーマ検索をやるのも遅い上に、データの意味的な情報や社内用語などの情報はどうしても落ちるので、その辺りの情報やナレッジをMCPサーバー側に上手く組み込んで公開すれば(抽象化してツールとして公開すれば)、DWHを利用したAIエージェントの構築と利用効率がかなり上がるような気がします。

こうなるとBIレポートもコードベースのものから、AIへの指示プロンプトとして管理・修正される形になっていくかもしれません(業務ユーザー側で即時修正できるようになる)。

## まとめ

いかがだったでしょうか。

MCPに関しては使える所では利便性が非常に高いものの、魔法のツールというわけではないので、適材適所で使いどころを見極めていくべきだと思います。

また、今回はアプリケーションとしての可能性の視点でしたが、まだまだ未成熟な領域であり、原理上のセキュリティリスクについても様々な指摘があるため、サンドボックス環境でまずは試すのが良いでしょう。

ただMCPを使うとモデルやライブラリのスイッチは非常に楽になる上、各AIエージェントからの利用が多い社内システムやデータベースについては、ナレッジも含めMCP化しておくと、各所でのAI利活用促進に大きく寄与するかもしれません。

これまでの個別タスクの自動化が、MCPの登場も含め、どんどんE2E(End-to-End)の方向に向かっていくのが楽しみです。

[5](https://qiita.com/jw-automation/items/ee08849048f1517d40b2/likers)

1

[comment0](https://qiita.com/jw-automation/items/ee08849048f1517d40b2#comments)

Register as a new user and use Qiita more conveniently

1. You get articles that match your needs
2. You can efficiently read back useful information
3. You can use dark theme

[What you can do with signing up](https://help.qiita.com/ja/articles/qiita-login-user)