---
Created: 2025-04-12T04:24:00
URL: https://zenn.dev/bm_sms/articles/design_system_mcp_impl
Tags: [topic/デザインシステム/AI活用]
---
🛠️

[AI](https://zenn.dev/topics/ai)[Model Context Protocol](https://zenn.dev/topics/mcp)[デザインシステム](https://zenn.dev/topics/%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0)[vibecoding](https://zenn.dev/topics/vibecoding)[tech](https://zenn.dev/tech-or-idea)

こんにちは！株式会社エス・エム・エスでエンジニアをしている [@_kimuson](https://x.com/_kimuson) です。

今回は、社内のプロダクト開発で利用しているデザインシステムを MCP 化して提供し、社内のデザインシステムを活用した自然言語によるコーディング環境を整備したので、事例を紹介します！

## デザインシステムの MCP 化とは

先日 Ubie さんが、社内のデザインシステムを MCP 化することで、UI 実装を効率化した事例を紹介していました。

簡単に自分なりの解釈をまとめると

- Figma の情報を取れる MCP を利用することで Figma の再現はかなりしやすくなった
- しかし、デザインシステムとの統合が難しい。`<button style="font-size: 20px"></button>` ではなくデザインシステムのコンポーネントとトークンを使って `<Button textStyle="regular"></Button>` を使うべきことを LLM が理解できない
- MCP によってデザイントークンや、コンポーネントの情報を提供することで LLM はデザイントークンに則ったコーディングができるようになった

という内容でした。

とてもおもしろい記事なので元記事もぜひご参照ください！

これをみてめっちゃ良いやん！と思ったのと、元々社内のデザインシステムを活用した LLM によるコーディングに取り組んでいて資産があったことから弊社のデザインシステムでも MCP を構築を行いました。

このエントリではより実装詳細に焦点をあてて MCP でコンポーネントの情報の提供を実現している方法を紹介します。

今後、どうやってコンポーネントの情報を出すか等のプラクティスが溜まっていくと思うので 1 つの参考例になれば幸いです。

## 取りたい情報

まず、デザインシステムのMCP化において、LLMに提供すべき主な情報は以下の2つと考えています:

- デザイントークン: カラー、スペーシング、フォントサイズなどの基本的なデザイン要素の定義
- コンポーネント定義: 各UIコンポーネントの詳細 
    - 受け付ける Props の型定義
    - コンポーネントごとの theme (デザイントークン)

大きくこの2つの情報があれば、LLM は Figma の情報とあわせて、効果的に UI 実装ができると考え、この2つの情報を提供する方針を進めていきました。

## MCP を構築する

### デザイントークンを配る

まずは1つ目のデザイントークンの配布についてです。

前提として、社内のデザインシステムは Chakra UI をベースとしており、Chakra UI のテーマ機能活用してデザイントークンを定義・利用しています。

```plain text
// 例
<Button textStyle="token">押してね！</Button>

```

詳しくは以下の記事を御覧ください:

Chakra UI では theme 情報をオブジェクトとして用意して Provider で渡す仕組みになっています。

```plain text
import { ChakraProvider } from '@chakra-ui/react';

<ChakraProvider theme={theme}>
  {children}
</ChakraProvider>

```

この theme オブジェクトにデザイントークンの情報がまとまっているので、これを単に JSON に吐き出して利用する形にしています。

theme はトップレベルにグループが以下のような非常にわかりやすい構造になっています。

theme.json

```plain text
{
  "breakpoints": {},
  "zIndices": {},
  "radii": {},
  "blur": {},
  "colors": {},
  "letterSpacings": {},
  "lineHeights": {},
  "fontWeights": {},
  "fonts": {},
  "fontSizes": {},
  "sizes": {},
  "shadows": {},
  "space": {},
  "borders": {},
  "transition": {},
  "components": {},
  "styles": {},
  "config": {},
  "textStyles": {}
}


```

なので、実装としては非常にシンプルで、以下のように json の key をスキーマにしてあげて提供するだけです。

```plain text
import themeJson from "/path/to/theme.json"

export const getTokens = <K extends keyof typeof themeJson>(key: K) => {
  return themeJson[key]
}

// デザイントークンの取得
server.tool(
  "get_design_tokens",
  "デザイントークン（色、フォント、スペース等のデザインシステム定義）を取得します。",
  {
    targets: z.array(
      z.union([
        z.literal("colors"),
        z.literal("breakpoints"),
        z.literal("zIndices"),
        z.literal("radii"),
        z.literal("blur"),
        z.literal("letterSpacings"),
        z.literal("lineHeights"),
        z.literal("fontWeights"),
        z.literal("fonts"),
        z.literal("fontSizes"),
        z.literal("sizes"),
        z.literal("shadows"),
        z.literal("space"),
        z.literal("borders"),
        z.literal("transition"),
        z.literal("textStyles"),
      ])
    ),
  },
  (input) => {
    return {
      isError: false,
      content: [
        {
          type: "text",
          text: JSON.stringify(
            input.targets.reduce(
              (s, target) => ({
                ...s,
                [target]: getTokens(target),
              }),
              {}
            )
          ),
        },
      ],
    }
  }
)

```

LLM から利用される際は textStyles, sizes 等デザイントークンは複数種類取得したいことが基本になるので、まとめて取得できるようにツールを設計しています。

往復が増えるとトークンコスパ的にも良くないですし、やりとりが増えて LLM の能力が落ちるという意味でも避けるべきと考えているので、こういう設計にしています。

### コンポーネント定義を配る

次にデザインシステムで提供しているコンポーネント定義を配る方法についてです。

正確なコンポーネントの定義は実装にあり、かつ受けられる Props の情報はランタイムではなく型情報にしかないので [ts-morph](https://ts-morph.com/) を使って型から拾い出す手法を採用しています。

! TypeScript v7 移行で Compilet API とその wrapper である ts-morph は使えなくなっていく方向であることに注意が必要です。
 しばらく互換して動かせると推測していて、Go 移植後の Compiler API の代替手段や、デザイントークンの女方法を渡す手段がコミュニティで確立してくるのを様子見つつ、別の手法に乗り換えていくことになります。

[ts-morph](https://ts-morph.com/) で LLM が解釈可能な型情報を取り出す方法については

- 実装箇所のソースコードをとりあえず提供する
- 型情報を解釈してわかりやすい情報に変換して提供する

のいずれかになると思います。

後者は実装の難易度がやや高い代わりに LLM が迷いづらい情報を提供できることが利点です。

筆者は過去に VSCode ですべての型を展開して表示できる VSCode 拡張機能を作っていて知見があったので、当時の実装を参考にしつつ、解釈可能なオブジェクトを作る方針を実装することにしました。

実装としては、型情報を展開して解釈しやすい構造に変換するプログラムを書きます。

```plain text
import { randomUUID } from "node:crypto"
import { type ts, type Type } from "ts-morph"

type BaseStructuredType = {
  symbolName?: string | undefined // 宣言に名前がついている場合のみ. type X = { 'key': 'value' } なら X だが、型の一部とかは undefined
  typeText: string
}

type UnknownType = {
  kind: "unknown"
  code?: string
} & Partial<BaseStructuredType>

type PrimitiveType = {
  kind: "primitive"
  value:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "null"
    | "undefined"
    | "void"
    | "any"
    | "never"
    | "unknown"
}

type LiteralType = {
  kind: "literal"
  value: string
}

type SpecialType = {
  kind: "special"
  value:
    | "Date"
    | "Symbol"
    | "React.ReactElement"
    | "React.ReactNode"
    | (string & {})
}

type UnresolvedObject = BaseStructuredType & {
  id: string
  kind: "unresolved_object"
  reason: "pending" | "too_many"
}

type ResolvedObject = BaseStructuredType & {
  kind: "resolved_object"
  properties: {
    name: string
    type: StructuredType
  }[]
}

type StructuredType =
  | UnknownType
  | PrimitiveType
  | LiteralType
  | SpecialType
  | UnresolvedObject
  | ResolvedObject
  | (BaseStructuredType &
      (
        | {
            kind: "enum"
            values: StructuredType[]
          }
        | {
            kind: "union"
            values: StructuredType[]
          }
        | {
            kind: "tuple"
            values: StructuredType[]
          }
        | {
            kind: "function"
            argTypes: {
              name: string
              type: StructuredType
            }[]
            returnType: StructuredType
          }
        | {
            kind: "promise"
            value: StructuredType
          }
        | {
            kind: "intersection_object"
            resolved: ResolvedObject[]
            unresolved: UnresolvedObject[]
          }
      ))

const typedIncludes = <T>(arr: readonly T[], value: unknown): value is T => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return arr.includes(value as T)
}

const specialTypes = [
  "Date",
  "Symbol",
  "React.ReactElement",
  "React.ReactNode",
] as const

const serializable = withContext(
  (ctx) =>
    (type: StructuredType, objectDepth = 3): StructuredType => {
      const resolved = resolveObject(ctx)(type, objectDepth)

      switch (resolved.kind) {
        case "enum":
        case "special":
        case "literal":
        case "primitive":
        case "unknown":
        case "intersection_object":
        case "resolved_object":
        case "unresolved_object":
          return resolved

        case "union":
          return {
            ...resolved,
            values: resolved.values.map(
              (value) => serializable(ctx)(value),
              objectDepth
            ),
          }

        case "promise":
          return {
            ...resolved,
            value: serializable(ctx)(resolved.value),
          }

        case "tuple":
          return {
            ...resolved,
            values: resolved.values.map(
              (value) => serializable(ctx)(value),
              objectDepth
            ),
          }

        case "function":
          return {
            ...resolved,
            argTypes: resolved.argTypes.map((arg) => ({
              ...arg,
              type: serializable(ctx)(arg.type, objectDepth),
            })),
            returnType: serializable(ctx)(resolved.returnType, objectDepth),
          }

        default: {
          resolved satisfies never
          throw new Error("Unreachable code")
        }
      }
    }
)

const resolveObject = withContext(
  (ctx) =>
    (objectType: StructuredType, depth = 3): StructuredType => {
      if (objectType.kind !== "unresolved_object") {
        return objectType
      }

      // pending 以外はすでに解決しようとして制約で失敗しているのでそのまま
      if (objectType.reason !== "pending") {
        return objectType
      }

      const type = ctx.objectTypeMap.get(objectType.id)
      if (type === undefined) {
        return objectType
      }

      if (depth === 0) return objectType

      const intersectionTypes = type
        .getIntersectionTypes()
        .map((type) => resolveObject(ctx)(extractType(ctx)(type), depth - 1))

      // intersection のケース
      if (
        intersectionTypes.length !== 0 &&
        intersectionTypes.every(
          (type) =>
            type.kind === "resolved_object" || type.kind === "unresolved_object"
        )
      ) {
        if (
          intersectionTypes.every((type) => type.kind === "resolved_object")
        ) {
          return {
            kind: "resolved_object",
            symbolName: objectType.symbolName,
            typeText: objectType.typeText,
            properties: intersectionTypes.flatMap(
              (intersectionItem) => intersectionItem.properties
            ),
          }
        }

        return {
          kind: "intersection_object",
          symbolName: objectType.symbolName,
          typeText: objectType.typeText,
          unresolved: intersectionTypes.filter(
            (type) => type.kind === "unresolved_object"
          ),
          resolved: intersectionTypes.filter(
            (type) => type.kind === "resolved_object"
          ),
        }
      }

      // object のケース
      const properties = ctx.typeChecker.getPropertiesOfType(type)

      // call stack 上限対策
      // props が多すぎると再帰上限にかかってしまうので unresolved のままにする
      if (properties.length > 30) {
        return {
          id: objectType.id,
          kind: "unresolved_object",
          symbolName: objectType.symbolName,
          typeText: objectType.typeText,
          reason: "too_many",
        }
      }

      return {
        kind: "resolved_object",
        symbolName: objectType.symbolName,
        typeText: objectType.typeText,
        properties: properties.flatMap((propertySymbol) => {
          const mappedType: ts.MappedTypeNode | undefined =
            propertySymbol.links?.mappedType

          if (mappedType) {
            const templateType: Type | undefined = mappedType.templateType

            if (templateType !== undefined) {
              return [
                {
                  name: propertySymbol.getEscapedName(),
                  type: extractType(ctx)(templateType),
                },
              ]
            }
          }

          const declare = propertySymbol.getDeclarations()?.at(0)
          const type = declare
            ? ctx.typeChecker.getTypeOfSymbolAtLocation(propertySymbol, declare)
            : undefined

          if (type === undefined) {
            return []
          }

          return {
            name: propertySymbol.getEscapedName(),
            type: extractType(ctx)(type),
          }
        }),
      }
    }
)

const extractType = withContext((ctx) => (type: Type): StructuredType => {
  const typeText = type.getText()
  const symbolName = type.getSymbol()?.getDeclarations().at(0)?.getText()
  const escapedTypeText =
    /^import\((.*?)\)\.(?<name>.*?)$/.exec(typeText)?.groups?.["name"] ??
    typeText

  const properties = ctx.typeChecker.getPropertiesOfType(type)

  switch (true) {
    // type parameter
    case type.isTypeParameter(): {
      return {
        symbolName: symbolName,
        typeText: escapedTypeText,
        kind: "unknown",
      }
    }

    // special
    case typeText === "symbol" || typeText === "unique symbol": {
      return {
        kind: "special",
        value: "Symbol",
      }
    }
    case typedIncludes(specialTypes, typeText): {
      return {
        kind: "special",
        value: typeText,
      }
    }

    // enum
    case type.isUnion() &&
      type.getUnionTypes().length > 1 &&
      typeof type.getSymbol() !== "undefined": {
      const values =
        type
          .getSymbol()
          ?.getExports()
          .flatMap((symbol) => {
            const valueDeclare = symbol.getValueDeclaration()
            if (valueDeclare === undefined) return []
            return extractType(ctx)(
              ctx.typeChecker.getTypeAtLocation(valueDeclare)
            )
          }) ?? []
      return {
        symbolName: symbolName,
        typeText: escapedTypeText,
        kind: "enum",
        values,
      }
    }

    // union
    case type.isUnion() && type.getUnionTypes().length > 1: {
      return {
        kind: "union",
        symbolName: symbolName,
        typeText: escapedTypeText,
        values: type.getUnionTypes().map((t) => extractType(ctx)(t)),
      }
    }

    // literal
    case type.isLiteral(): {
      return {
        kind: "literal",
        value: typeText,
      }
    }

    case ["true", "false"].includes(typeText): {
      return {
        kind: "literal",
        value: typeText,
      }
    }

    // tuple
    case type.isTuple(): {
      return {
        kind: "tuple",
        symbolName: symbolName,
        typeText: escapedTypeText,
        values: type.getTupleElements().map((t) => extractType(ctx)(t)),
      }
    }

    // primitive
    case type.isString():
      return {
        kind: "primitive",
        value: "string",
      }
    case type.isNumber():
      return {
        kind: "primitive",
        value: "number",
      }
    case type.isBigInt():
      return {
        kind: "primitive",
        value: "bigint",
      }
    case type.isBoolean(): {
      return {
        kind: "primitive",
        value: "boolean",
      }
    }
    case type.isNull(): {
      return {
        kind: "primitive",
        value: "null",
      }
    }
    case type.isUndefined(): {
      return {
        kind: "primitive",
        value: "undefined",
      }
    }
    case type.isVoid(): {
      return {
        kind: "primitive",
        value: "void",
      }
    }
    case type.isAny(): {
      return {
        kind: "primitive",
        value: "any",
      }
    }
    case type.isNever(): {
      return {
        kind: "primitive",
        value: "never",
      }
    }
    case type.isUnknown(): {
      return {
        kind: "primitive",
        value: "unknown",
      }
    }

    // array
    case type.isArray(): {
      const arrayType = type.getArrayElementType()
      if (arrayType) {
        return extractType(ctx)(arrayType)
      } else {
        return {
          kind: "unknown",
          symbolName: symbolName,
          typeText: escapedTypeText,
          code: "array",
        }
      }
    }

    // callable
    case type.getCallSignatures().length > 0: {
      const signature = type.getCallSignatures().at(0)
      if (signature === undefined) {
        throw new Error("illegal state")
      }

      const args =
        signature?.getParameters().flatMap((argSymbol) => {
          const declare = argSymbol.getDeclarations()?.at(0)

          if (declare === undefined) return []
          return [
            {
              name: argSymbol.getEscapedName(),
              type: extractType(ctx)(
                ctx.typeChecker.getTypeOfSymbolAtLocation(argSymbol, declare)
              ),
            },
          ] as const
        }) ?? []
      const returnType = extractType(ctx)(
        ctx.typeChecker.getReturnTypeOfSignature(signature)
      )

      return {
        kind: "function",
        symbolName: symbolName,
        typeText: escapedTypeText,
        argTypes: args,
        returnType,
      }
    }

    // promise
    case typeText === "Promise": {
      const [argument, ...others] = type.getTypeArguments()
      if (argument === undefined || others.length !== 0) {
        return {
          kind: "unknown",
          symbolName: symbolName,
          typeText: escapedTypeText,
          code: "promise",
        }
      }

      return {
        kind: "promise",
        symbolName: symbolName,
        typeText: escapedTypeText,
        value: extractType(ctx)(argument),
      }
    }

    // object
    case properties?.length !== 0: {
      const id = randomUUID()
      ctx.objectTypeMap.set(id, type)
      return {
        id,
        symbolName: symbolName,
        typeText: escapedTypeText,
        kind: "unresolved_object",
        reason: "pending",
      }
    }

    // other
    default: {
      return {
        kind: "unknown",
        symbolName: symbolName,
        typeText: escapedTypeText,
        code: "other",
      }
    }
  }
})

```

上記の実装では

- extractType: 独自定義した `StructuredType` 型に解決する
- resolveObject: 型定義は `type User = { id: string, friend: User }` のように循環参照がありうるので、参照を持つようにしておき、depth だけあとから展開する関数
- serializable: `Promise<T>` などでも T を展開するための関数

この3つを定義しています。

あとは対象の Props を `extractType` に渡せば構造化して取得でき、`serializable` に渡せば JSON.stringify や YAML.stringify 可能なオブジェクトに変換できるということになります。

### ツールとしてコンポーネント定義を配る

あとは Props の型情報を取り出し、ツールからアクセスできるようにしていきます。

- コンポーネントをまとめて export しているファイルから関数宣言をまとめて取得
- それぞれの宣言から第1引数(props は第1引数に定義される)を取り出し、上記で用意した extractType で構造化する

の方針で実装します:

```plain text
// ts-morph のセットアップ
const project = new Project({
  tsConfigFilePath: "/path/to/tsconfig",
  skipAddingFilesFromTsConfig: false,
})
const typeChecker = project.getTypeChecker()
const objectTypeMap = new Map<string, Type>()

// 関数コンポーネントを拾い出す
const componentsFilePath = "/path/to/component-index-file.ts"

const componentsFile = ctx.project.getSourceFile(componentsFilePath)
if (!componentsFile) {
  logger.error("ファイルが見つかりません:", componentsFilePath)
  throw new Error("Invalid")
}

const exportedDeclarations = componentsFile.getExportedDeclarations()

const declarations = Array.from(exportedDeclarations.entries()).map(
  ([declarationName, declarations]) => {
    const [declaration, ...others] = declarations
    if (declaration === undefined || others.length !== 0) {
      logger.warn("想定していない declaration なのでスキップします", {
        declarationName,
        length: declarations.length,
      })
      return {
        declarationName,
        propType: undefined,
      }
    }

    if (
      !(
        Node.isFunctionDeclaration(declaration) ||
        Node.isVariableDeclaration(declaration)
      )
    ) {
      // 関数コンポーネント以外はスキップ
      return {
        declarationName,
        propType: undefined,
      }
    }

    const type = ctx.typeChecker.getTypeAtLocation(declaration)

    // 関数コンポーネント
    const propsArg = type.getCallSignatures()?.at(0)?.getParameters()?.at(0)

    const declare = propsArg?.getDeclarations()?.at(0)
    if (propsArg === undefined || declare === undefined) {
      // 関数なだけでコンポーネントじゃないのでスキップ
      return {
        declarationName,
        propType: undefined,
      }
    }

    const argType = ctx.typeChecker.getTypeOfSymbolAtLocation(propsArg, declare)

    logger.info("start extracting (Function Component)", {
      declarationName,
      argTypeText: argType.getText(),
      type: type.getText(),
    })

    return {
      declarationName,
      propType: extractType(ctx)(argType),
    }
  }
)

// コンポーネントの一覧: { declarationName: string(コンポーネント名), propType: StructuredType }[] の形
const componentsInfo = declarations.filter(
  (declare) => declare.propType !== undefined
)
const componentMap = new Map(
  componentsInfo.map((info) => [info.declarationName, info.propType] as const)
)

const context = {
  project,
  typeChecker,
  objectTypeMap,
} as const

server.tool(
  "get_component_info",
  "コンポーネントの詳細情報（Props とテーマ設定）を取得します。",
  {
    name: z.string().describe("取得対象のコンポーネント名"),
    objectDepth: z
      .number()
      .default(3)
      .describe(
        "プロパティの型情報を展開する深さ。ネストが深い型の場合に制限をかけることができます。"
      ),
  },
  (input) => {
    const componentInfo = componentMap.get(input.name)

    if (componentInfo === undefined) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Not Found: ${input.name}`,
          },
        ],
      }
    }

    const resolved = serializable(context)(componentInfo, input.objectDepth)
    const componentThemes = getTokens("components")

    return {
      isError: false,
      content: [
        {
          type: "text",
          text: JSON.stringify({
            name: input.name,
            theme:
              input.name in componentThemes
                ? componentThemes[input.name]
                : null,
            props: resolved,
          }),
        },
      ],
    }
  }
)

```

これで MCP を介してコンポーネント定義を取得できるようになりました。

今回紹介している構造化する手法はやや複雑なので、単にコンポーネントの Props の型をそのままテキストを渡すだけでも一定ワークするかなと思います。

## Figma MCP を内製する

デザインシステムの MCP 化に加えて、Figma の MCP も内製することにしました。

よく zenn の記事等では

が利用されていますが、以下の 2 点で採用を避けました。

- MCP という野良実装にはリスクが伴う仕組みである前提で、外部の個人が提供している MCP であり推奨しづらいこと
- GLips/Figma-Context-MCP ではおそらくトークン数削減のために Figma API から返される情報を削っており、情報に不足があった

後者について詳しく話すと、前提として弊社のデザインシステムでは Figma と効果的に連携していて、AST の componentProperties のプロパティ名をある程度そのまま React コンポーネントの Props 指定すれば動くようにデザインシステムが再現できるようになっています

なので、効果的にデザインシステムを活用してコーディングする上で「componentProperties」[[1]](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#fn-3923-1)は重要な情報なんですが、GLips/Figma-Context-MCP ではこの情報が取得できない実装になっていました。

つまり、Figma を単に React コンポーネントに起こすようなユースケースに最適化されており、デザインシステムと組み込む前提では少しミスマッチがあったということです。

もともと Figma の情報を以下に削って LLM にわたすかという内容を試していたのもあり比較的簡単に実装できそうだったので、Figma MCP も内製化を行い社内向けに提供することにしました。

実装例などは GLips/Figma-Context-MCP 等も OSS として公開されいるので割愛します。

## プロンプトとセットで社内向けに宣伝する

MCP、設定しただでは期待取り使ってくれるかは LLM の気分次第になってしまうので、プロンプトもあわせて使うことが重要です。

ちょうど VSCode Agent Mode もリリースされ、マス向けに進めやすくなったので社内向けにプロンプトもあわせて宣伝記事を書いて広めました。

このエントリでは、事例として詳細なところを説明できると良いなと思っているのでプロンプトも一部マスクして公開します。

```plain text
あなたは熟練したソフトウェアエンジニアで、多数のプログラミング言語・フレームワーク・デザインパターン・ベスクプラクティスに関する高度な知識を持ちます。

ユーザーの指示に基づき、効率的かつ正確にタスクを遂行してください。

## タスクのルール

### ツール利用

実装を行うために登録されているツールを自由に利用することができます。
柔軟にツールを選定し、タスクを進行します。

### ドキュメントを確認し、ガイドラインに準拠して実装を行う

タスクを効果的に進めるため、必要なドキュメントを適時参照してください。
以下は開発ガイドラインのドキュメントの一覧です。タスクに関連するドキュメントを確認してください。

<ドキュメントの一覧>

### 明確なコマンド実行

シェルコマンドを実行する際は以下のルールを守ることで効果的に開発を行うことができます。

- コマンドは常に `cd <パス> && git status` のように実行するディレクトリを指定して実行する
- 移動先は用途に応じて柔軟に設定します。

### list_components, get_component_info ツールを活用し、デザインシステムを用いて UI を構築する

このプロダクトでは Chakra UI をラップしたデザインシステムを構築しており、提供されるコンポーネントを利用することで効果的に UI を構築することができます。

UI を実装する際は

- list_components
- get_component_info

のツールを利用して提供されるコンポーネントの情報を正確に把握し、デザインシステムを利用して実装します。

**利用するコンポーネントはすべて get_component_info を用いて使い方・用途を把握して利用してください。**

### Figma が与えられた場合はピクセルパーフェクトな実装を行う

Figma が渡された場合は get_figma_node ツールを利用して Figma のデザイン情報を読み、ピクセルパーフェクトな実装を行います。

正確な実装を行うために以下のルールを守ってください:

- get_figma_node は depth によりすべての情報を取得せず、追加で必要なデザインを繰り返し呼び出す前提のツールであることに十分注意してください。必要な情報をすべて取得できることを保証するため、**get_figma_node ツールの呼び出しの後に必ず探索が十分かを評価し、get_figma_node の追加の呼び出しが必要ないかを確認してください。**
  - まで get_figma_node 呼び出して漏れなくすべてのデザインを実装してください。
- get_design_tokens ツールで取得したデザイントークンを利用してスタイリングを行います。Figma の Node を正確にデザイントークンとして指定してください。
- Figma の Node に定義されている「componentProperties」はデザイントークンと対応関係があるので存在する場合は尊重して実装します。例: `componentProperties: { textStyle: 'token' }` と指定されている場合、textStyles のデザイントークンを取得する。対応関係にある `"token": { "fontFamily": "", "fontSize": "", "fontWeight": "", "lineHeight": "", "letterSpacing": ""},` が見つかるので `textStyle="token"` を指定する。
- デザインシステムは Chakra UI をベースに構築されており、基本的にすべてのコンポーネントでデザイントークンの Props を利用できます。例: sizes => `<Box size={...}>`。

**Figma を正確な再現は最も重要な要件です。上記のルールを絶対に守り、正確な実装を行ってください。**

## 完了条件

実装が完了したら **以下のすべてを必ず実行し** 実装に問題がないか確認します

1.  型チェックを実行
2.  リンターの自動修正を実行し、自動修正不可能な問題が残っていないか確認
    - **重要: エラーを回避することだけを目的として修正は禁止です。**。実装の問題で型が合わない場合に any や as を使って回避してはいけません。リントを通すために ignore コメントを書いてはいけません。テストを pass させるために仕様をを変更してはいけません。

上記の 2 点は完了条件であり、必ずすべて満たしてください。
満たすまで修正を繰り返してください。**満たしていない状態でタスクを完了させてることは厳禁です。**

---

以上の内容を順守し、**常に日本語で** タスクを開始してください。

```

MCP を実装してから多少プロンプトもチューニングを行い、かなり制度高くかつ UI を再現できるようになりました。

## 学びと今後の活用

LLM による UI 実装をより効果的にしていくために今回の学びと今後の展望についてまとめます。

### 型情報を解釈して提供する MCP が普遍的に良いかも

今回試してみて思ったのが、ts-morph (や、Compiler API) を使って型情報などを提供するのはかなり良さげだということです。

問題が発生したときに、エージェントに内蔵されるツールでファイルを検索して実装を把握して解決するのがよくある流れだと思いますが、どうしてもトークン効率が悪くなりがちです。

AST から情報を定期するような手法では、ピンポイントに正確な情報を提供できます。

また、ユーザーから「Button」コンポーネント直して、みたいな雑な指示にも対応しやすくなります。

なんですが、Compiler API 自体は使えなくなることが見えているので残念です。

別のやり方が確立してくると良いんですが...

### 非エンジニアが軽い開発をできるようにしていきたい

元々 UI の自動コーディング周りの領域をトライしていたのは、デザイナーさんや場合によっては他の職種の人も軽い変更なら自然言語で行えるようにしていきたかったからでした。

今回の対応でかなりパーツが揃ってきたと感じています。

残っている課題は

- とはいえ環境構築はしんどいので、Devin のような共有環境(エンジニアがヘルプに行きやすい)の上で動かせて、難しい問題はエンジニアが巻き取りやすい環境がほしい
- 正確な UI の実装を行うだけでなく、機能実装も行い、型チェックを通してリンターエラーを通してテストも通して(場合によっては書いて)というのを非エンジニアが行うには、まだ現状の LLM のスペックとエージェント周りの仕組みではまだ十分とはいえないので仕組み作り

辺りがあります。

このあたりを今後解いていきたいなと思っています。

## まとめ

社内の デザインシステムを MCP 化した事例を、詳細な実装に立ち入って解説してみました！

仕組みとして発展途上な部分もあるなと感じているので、他社の事例なども出揃ってくると嬉しいなと思っています！

脚注

1. 
参考: [https://www.figma.com/plugin-docs/api/ComponentNode/#boundvariables](https://www.figma.com/plugin-docs/api/ComponentNode/#boundvariables) [↩︎](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#fnref-3923-1)

9

[きむそん](https://zenn.dev/kimuson)
そふとうぇあえんじにあ TypeScript が好きなひとです

[株式会社エス・エム・エス](https://zenn.dev/p/bm_sms)[Publication](https://zenn.dev/faq#what-is-publication)

高齢社会に適した情報インフラを構築することで人々の生活の質を向上し、社会に貢献し続ける

### Discussion

![](https://static.zenn.studio/images/drawing/discussion.png)

ログインするとコメントできます

[きむそん](https://zenn.dev/kimuson)
そふとうぇあえんじにあ TypeScript が好きなひとです目次
1. [デザインシステムの MCP 化とは](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE-mcp-%E5%8C%96%E3%81%A8%E3%81%AF)
2. [取りたい情報](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E5%8F%96%E3%82%8A%E3%81%9F%E3%81%84%E6%83%85%E5%A0%B1)
3. [MCP を構築する](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#mcp-%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B)
    1. [デザイントークンを配る](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E9%85%8D%E3%82%8B)
    2. [コンポーネント定義を配る](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E5%AE%9A%E7%BE%A9%E3%82%92%E9%85%8D%E3%82%8B)
    3. [ツールとしてコンポーネント定義を配る](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%83%84%E3%83%BC%E3%83%AB%E3%81%A8%E3%81%97%E3%81%A6%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E5%AE%9A%E7%BE%A9%E3%82%92%E9%85%8D%E3%82%8B)
4. [Figma MCP を内製する](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#figma-mcp-%E3%82%92%E5%86%85%E8%A3%BD%E3%81%99%E3%82%8B)
5. [プロンプトとセットで社内向けに宣伝する](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88%E3%81%A8%E3%82%BB%E3%83%83%E3%83%88%E3%81%A7%E7%A4%BE%E5%86%85%E5%90%91%E3%81%91%E3%81%AB%E5%AE%A3%E4%BC%9D%E3%81%99%E3%82%8B)
6. [学びと今後の活用](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E5%AD%A6%E3%81%B3%E3%81%A8%E4%BB%8A%E5%BE%8C%E3%81%AE%E6%B4%BB%E7%94%A8)
    1. [型情報を解釈して提供する MCP が普遍的に良いかも](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E5%9E%8B%E6%83%85%E5%A0%B1%E3%82%92%E8%A7%A3%E9%87%88%E3%81%97%E3%81%A6%E6%8F%90%E4%BE%9B%E3%81%99%E3%82%8B-mcp-%E3%81%8C%E6%99%AE%E9%81%8D%E7%9A%84%E3%81%AB%E8%89%AF%E3%81%84%E3%81%8B%E3%82%82)
    2. [非エンジニアが軽い開発をできるようにしていきたい](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E9%9D%9E%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%8C%E8%BB%BD%E3%81%84%E9%96%8B%E7%99%BA%E3%82%92%E3%81%A7%E3%81%8D%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%97%E3%81%A6%E3%81%84%E3%81%8D%E3%81%9F%E3%81%84)
7. [まとめ](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%81%BE%E3%81%A8%E3%82%81)
Zennからのお知らせ[第２回 AI Agent Hackathon with Google Cloud 4/14登録受付開始！](https://zenn.dev/hackathons/google-cloud-japan-ai-hackathon-vol2)[Zenncafe日比谷#2 生成AIで変わる仕事](https://zenn.connpass.com/event/351131/)

2. 1. [デザインシステムの MCP 化とは](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE-mcp-%E5%8C%96%E3%81%A8%E3%81%AF)
3. 2. [取りたい情報](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E5%8F%96%E3%82%8A%E3%81%9F%E3%81%84%E6%83%85%E5%A0%B1)
4. 3. [MCP を構築する](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#mcp-%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%99%E3%82%8B)
    1. 1. [デザイントークンを配る](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E9%85%8D%E3%82%8B)
    2. 2. [コンポーネント定義を配る](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E5%AE%9A%E7%BE%A9%E3%82%92%E9%85%8D%E3%82%8B)
    3. 3. [ツールとしてコンポーネント定義を配る](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%83%84%E3%83%BC%E3%83%AB%E3%81%A8%E3%81%97%E3%81%A6%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E5%AE%9A%E7%BE%A9%E3%82%92%E9%85%8D%E3%82%8B)
5. 
6. 
7. 
8. 4. [Figma MCP を内製する](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#figma-mcp-%E3%82%92%E5%86%85%E8%A3%BD%E3%81%99%E3%82%8B)
9. 5. [プロンプトとセットで社内向けに宣伝する](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88%E3%81%A8%E3%82%BB%E3%83%83%E3%83%88%E3%81%A7%E7%A4%BE%E5%86%85%E5%90%91%E3%81%91%E3%81%AB%E5%AE%A3%E4%BC%9D%E3%81%99%E3%82%8B)
10. 6. [学びと今後の活用](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E5%AD%A6%E3%81%B3%E3%81%A8%E4%BB%8A%E5%BE%8C%E3%81%AE%E6%B4%BB%E7%94%A8)
    4. 1. [型情報を解釈して提供する MCP が普遍的に良いかも](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E5%9E%8B%E6%83%85%E5%A0%B1%E3%82%92%E8%A7%A3%E9%87%88%E3%81%97%E3%81%A6%E6%8F%90%E4%BE%9B%E3%81%99%E3%82%8B-mcp-%E3%81%8C%E6%99%AE%E9%81%8D%E7%9A%84%E3%81%AB%E8%89%AF%E3%81%84%E3%81%8B%E3%82%82)
    5. 2. [非エンジニアが軽い開発をできるようにしていきたい](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E9%9D%9E%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%81%8C%E8%BB%BD%E3%81%84%E9%96%8B%E7%99%BA%E3%82%92%E3%81%A7%E3%81%8D%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%97%E3%81%A6%E3%81%84%E3%81%8D%E3%81%9F%E3%81%84)
11. 
12. 
13. 7. [まとめ](https://zenn.dev/bm_sms/articles/design_system_mcp_impl#%E3%81%BE%E3%81%A8%E3%82%81)

エンジニアのための

情報共有コミュニティ

### About

- [Zennについて](https://zenn.dev/about)
- [運営会社](https://classmethod.jp/)
- [お知らせ・リリース](https://info.zenn.dev/)
- [イベント](https://zenn.dev/events)

### Guides

- [使い方](https://zenn.dev/manual)
- [法人向けメニュー](https://zenn.dev/biz-lp)New
- [Publication / Pro](https://zenn.dev/publications)
- [よくある質問](https://zenn.dev/faq)

### Links

- [X(Twitter)](https://twitter.com/zenn_dev)
- [GitHub](https://github.com/zenn-dev)
- [メディアキット](https://zenn.dev/mediakit)