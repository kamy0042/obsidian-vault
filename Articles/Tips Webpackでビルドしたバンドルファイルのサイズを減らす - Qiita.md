---
URL: https://qiita.com/DinhDuyThanh/items/42d4550b4a678496ac27
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
## webpack-bundle-analyzerでモジュールのサイズを可視化する

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114590%2F2490837f-011c-9a69-2b5b-4e096886f117.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=366e972c32b5aabd5520d4313165373f)

## lodash.jsのサイズを減らす

`import _ from 'lodash';
// _.clone(...)`

全てのlodash関数などがbundleされてしまいます。

→使用する関数のみをimportするように変更します

`import {keys, clone} from 'lodash';`

### バンドルファイルのサイズが変わらない

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f61e.png)

### Why?

![](https://cdn.qiita.com/emoji/twemoji/unicode/1f914.png)

`import {keys, clone} from 'lodash';

// ビルドした後

var lodash = require('lodash');
var keys = lodash.keys;
var clone = lodash.clone;`

### 解決：default style imports

`import keys from 'lodash/keys';
import clone from 'lodash/clone';`

メリット：使用する関数のみがimportされる
デメリット：コードが長くなる→`import {keys, clone}`を使いたい

## transform-importsプラグイン導入

`{
  "plugins": [
    ["transform-imports", {
      "my-library\/?(((\\w*)?\/?)*)": {
        "transform": "my-library/${1}/${member}",
        "preventFullImport": true
      }
    }]
  ]
}`

` ["transform-imports", {
  "react-bootstrap": { 
    "transform": "react-bootstrap/lib/${member}", 
    "preventFullImport": true 
  }, 
  "lodash": { 
    "transform": "lodash/${member}", 
    "preventFullImport": true 
  } 
}]`

→`import {keys, clone}`を使えるようになる

## moment.jsのサイズを減らす

`  new webpack.ContextReplacementPlugin(
     /moment[/\\]locale$/, 
     /ja/ 
  )`

`require('./locale/' + name + '.js')`

## Dynamic Import

`import data from '../data'
// ...
if(condition) {
  run(data)
}
// ...`

↓↓↓↓
使う時のみファイルをimportする

`if(condition) {
  import('../data').then(({ default: data}) => {
    run(data)
  })
}`

chunkファイル自動作成

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114590%2F43e8eb2c-3dd4-6310-5b7b-869584ab0818.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=48e0ac899a76253a035c034f27958561)

## ClassComponent → Functional Component(React)

`// Functional Component
const MyComponent = props => <div>{props.name}</div>;`

`// Class Component
class MyComponent extends React.Component {  
  render() {  
    return <div>{this.props.name}</div>;  
  }  
}`

ES5にビルドした後

`// Functional Component - 133byte
var MyComponent = function MyComponent(props) {
  return /*\#__PURE__*/React.createElement("div", null, props.name);
};`

`// Class Component - 3.5kb
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MyComponent = /*\#__PURE__*/function (_React$Component) {
  _inherits(MyComponent, _React$Component);
  var _super = _createSuper(MyComponent);
  function MyComponent() {
    _classCallCheck(this, MyComponent);
    return _super.apply(this, arguments);
  }
  _createClass(MyComponent, [{
    key: "render",
    value: function render() {
      return /*\#__PURE__*/React.createElement("div", null, this.props.name);
    }
  }]);
  return MyComponent;
}(React.Component);`

`Functional Component`を使ったら **3.5kb**から**133byte**になる

## Webpack3 →　Webpack4

ビルド時間： 10%アップ
ファイルのサイズ: あまり変わらない

## 結果

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114590%2F3f7ca89a-6c9d-38ff-4edd-a9729b7094c0.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=54af267224818dd18ce5d95e464a3a65)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114590%2F3b6fcf4e-e646-1a91-b901-582b878785ef.jpeg?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=c9bfb8ae0738bb7856234005a76fca91)

![](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F114590%2Fe4104cd1-0aed-16a8-ea1d-7e142bd1fed7.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ad9b90bc190c9ecc46baa198ca141a71)

## ご清聴ありがとうございました