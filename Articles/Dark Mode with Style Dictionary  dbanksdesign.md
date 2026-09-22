---
タグ: []
作成日時: 2023-11-28T22:53:00
URL: https://dbanks.design/blog/dark-mode-with-style-dictionary/#Single-token-method
Tags: [topic/デザインシステム/デザイントークン]
---
![](https://dbanks.design/902d604ad13a30fb7326498de14fe160/preview.mp4)

What we are going to build

[ ](https://dbanks.design/static/43fad6bf8cd5d254b2d96bc07d8df5a4/3fca6/as-project-light.png)[ ](https://dbanks.design/static/43fad6bf8cd5d254b2d96bc07d8df5a4/3fca6/as-project-light.png)[ ](https://dbanks.design/static/43fad6bf8cd5d254b2d96bc07d8df5a4/3fca6/as-project-light.png)[Project view shows actual folder structure](https://dbanks.design/static/43fad6bf8cd5d254b2d96bc07d8df5a4/3fca6/as-project-light.png)

![[as-project-light.png]]

[ ](https://dbanks.design/static/32b83c29c8e7e6c8d343f9da540f620e/3fca6/as-android-light.png)[ ](https://dbanks.design/static/32b83c29c8e7e6c8d343f9da540f620e/3fca6/as-android-light.png)[ ](https://dbanks.design/static/32b83c29c8e7e6c8d343f9da540f620e/3fca6/as-android-light.png)[Android view organizes files to reduce clutter](https://dbanks.design/static/32b83c29c8e7e6c8d343f9da540f620e/3fca6/as-android-light.png)

![[as-android-light.png]]

[ ](https://dbanks.design/static/20703603a95cc7b94ad7289d609401e3/55681/ios-asset-light.png)[ ](https://dbanks.design/static/20703603a95cc7b94ad7289d609401e3/55681/ios-asset-light.png)[ ](https://dbanks.design/static/20703603a95cc7b94ad7289d609401e3/55681/ios-asset-light.png)[Xcode showing asset catalog](https://dbanks.design/static/20703603a95cc7b94ad7289d609401e3/55681/ios-asset-light.png)

![[ios-asset-light.png]]

[ ](https://dbanks.design/static/ff07780bc5d65cf37eb58d834321d0d5/2eb79/colorset-light.png)[ ](https://dbanks.design/static/ff07780bc5d65cf37eb58d834321d0d5/2eb79/colorset-light.png)[ ](https://dbanks.design/static/ff07780bc5d65cf37eb58d834321d0d5/2eb79/colorset-light.png)[Xcode showing colorset](https://dbanks.design/static/ff07780bc5d65cf37eb58d834321d0d5/2eb79/colorset-light.png)

![[colorset-light.png]]

Here we are co-locating the default value and a value for dark mode. The name `darkValue` is arbitrary, but we will need to reference it in custom formats and actions later. If you choose to use a different name like nightValue (based on what Android calls it), make sure to update the code later.

One downside to this approach is that `darkValue` **needs to be a reference** because of how Style Dictionary works. Style Dictionary only transforms the `value` property of a token. Style Dictionary also changes values *before* references are resolved, and references can occur anywhere in Style Dictionary. In the above example, `color.core.neutral.1000.value` will be transformed, and then `color.background.primary.darkValue` will be resolved to the already transformed value. In practice, dark mode tokens having to be a reference to another token is probably ok if you use a multi-tiered structure outlined in the [token structure section](https://dbanks.design/blog/dark-mode-with-style-dictionary/#Token-structure).

In this approach, we only need to run Style Dictionary once because we have all the color modes in the tokens themselves. The custom formats and actions will then handle using the proper value (`.value` or `.darkValue`). This approach needs much heavier customization in custom formats and actions to get the correct references and values because it uses non-standard data (`.darkValue`).

But what about component-level tokens that reference this semantic layer of tokens? We don’t want to have to duplicate component tokens just to reference `.darkValue` instead of `.value`. To solve this problem, we will use the `outputReference` feature.

### Web integration

For the, web we can’t use the built-in [`css/variables`](https://amzn.github.io/style-dictionary/#/formats?id=cssvariables) format because we need to access `.darkValue` for some tokens. Instead, we create a function that wraps the built-in `css/variables` format and change’s any token’s `.value` with `.darkValue` if it has one. This feels a bit hacky, but it works.

```plain text
// build.js
//...
function darkFormatWrapper(format) {
  return function(args) {
    const dictionary = Object.assign({}, args.dictionary);
    // Override each token's `value` with `darkValue`
    dictionary.allProperties = dictionary.allProperties.map(token => {
      const {darkValue} = token;
      if (darkValue) {
        return Object.assign({}, token, {
          value: token.darkValue
        });
      } else {
        return token;
      }
    });

    // Use the built-in format but with our customized dictionary object
    // so it will output the darkValue instead of the value
    return StyleDictionary.format[format]({ ...args, dictionary })
  }
}

StyleDictionary.extend({
  // add custom formats
  format: {
    cssDark: darkFormatWrapper(`css/variables`),
  },
  //...
  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: webPath,
      files: [{
        destination: `variables.css`,
        format: `css/variables`,
        options: {
          outputReferences: true
        }
      },{
        destination: `variables-dark.css`,
        format: `cssDark`,
        filter: (token) => token.darkValue && token.attributes.category === `color`
      }]
    },
  }
})
```

### Graphics

To get the correct references in our SVG code, we will need to create separate dark SVG files because inside the SVG code, we are referencing other design tokens using `.value`, but we would need to use `.darkValue` instead. Now our image tokens become:

```plain text
{
  "image": {
    "logo": {
      "value": "assets/svg/logo.svg",
      "darkValue": "assets/svg/logo.dark.svg"    },
    "empty": {
      "value": "assets/svg/empty.svg",
      "darkValue": "assets/svg/empty.dark.svg"    },
    "files": {
      "value": "assets/svg/files.svg",
      "darkValue": "assets/svg/files.dark.svg"    },
  }
}
```

Inside the dark SVG files we reference `.darkValue` instead of `.value`. This is pretty annoying. There is probably a way around this, but then we are getting into heavy customizations.

```plain text
<svg width="100" height="100" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.03278 19C5.54736 11.182 12.0517 5 20 5C27.9482 5 34.4526 11.182 34.9672 19H5.03278Z"
    fill="<%= color.brand.primary['0'].darkValue %>"/></svg>
```

In our `generateGraphics` custom action, we will see if a token has a `.darkValue` and, if it does, generate the dark versions of that graphic.

```plain text
// actions/generateGraphics.js
const { name, value, darkValue } = token;
//...
if (darkValue) {
  const src = template( fs.readFileSync(darkValue) );
  svgDark = src(dictionary.properties);

  const outputPath = `${buildPath||''}${name}-dark.svg`;
  fs.ensureFileSync(outputPath);
  fs.writeFileSync(outputPath, svgDark);
  console.log(`✔︎  ${outputPath}`);
}

androidVector({ androidPath, name, svg, svgDark });
iosImageset({ iosPath, name, svg, svgDark });
//...
```

### Android integration

We will use the same method to generate the Android resources as we did for generating CSS files. We will wrap the `android/resources` built-in format with the dark mode format wrapper function.

```plain text
StyleDictionary.extend({
  //...
  format: {
    androidDark: darkFormatWrapper(`android/resources`),    //...
  },
  platforms: {
    android: {
      transformGroup: `android`,
      buildPath: androidPath,
      files: [{
        destination: `values/colors.xml`,
        format: `android/resources`,
        filter: (token) => token.attributes.category === `color`,
        options: {
          outputReferences: true
        },
      },{
        destination: `values-night/colors.xml`,        format: `androidDarkResources`,        filter: (token) => token.darkValue && token.attributes.category === `color`      }]
    },
    //...
  }
}).buildAllPlatforms();
```

The [`generateResources`](https://github.com/dbanksdesign/style-dictionary-dark-mode/blob/single-token/actions/generateGraphics.js) action will take care of creating light and dark mode Android vector drawables.

### iOS integration

Generating the colorsets and imagesets in the single-token method is a bit easier than the multi-file method because we don’t need to check to see if the asset already exists. We have all the information we need to build each asset once. [Here are the changes we need to make to the colorset action](https://github.com/dbanksdesign/style-dictionary-dark-mode/pull/4/files#diff-1c38e4e8c27eabf66ba825cc5e0693c2647eb27e8a45d46ae49efee23333ff93R34)

The single-token method will create only the necessary colorsets and then leverage references in a custom Swift format. This custom format has a little more logic to sees if the token has a `darkValue` or if it is a reference and then write the Swift code accordingly. The result is something like this:

```plain text
extension Color {
  // backgroundPrimary has a darkValue 👉 use its colorset
  public static var backgroundPrimary: Color {
    return Color.init("backgroundPrimary", bundle: bundle)
  }

  // fontInteractive has a reference 👉 use static variable it references
  public static var fontInteractive: Color {
    return Color.brandPrimary600
  }

  // coreYellow1000 doesn't have a darkValue and it's not a reference 👉 use its colorset
  public static var coreYellow1000: Color {
    return Color.init("coreYellow1000", bundle: bundle)
  }
}
```

[Here are the changes to the Swift color custom format](https://github.com/dbanksdesign/style-dictionary-dark-mode/pull/4/files#diff-c81454bd2fbbfc2d6018cf3a0203fa8255e6ceb8f9dff41055a75ab6661ef577R22).

## Bonus: high contrast mode

[ ](https://dbanks.design/static/12a39a3fc4021d81ec6a3d52e4b19d0e/1d69c/ios-hc-light.png)[ ](https://dbanks.design/static/12a39a3fc4021d81ec6a3d52e4b19d0e/1d69c/ios-hc-light.png)[ ](https://dbanks.design/static/12a39a3fc4021d81ec6a3d52e4b19d0e/1d69c/ios-hc-light.png)[iOS accessibility settings showing high contrast](https://dbanks.design/static/12a39a3fc4021d81ec6a3d52e4b19d0e/1d69c/ios-hc-light.png)

![[ios-hc-light.png]]

iOS has a setting called “increase contrast” in its accessibility menu. This is separate from light and dark mode. With this setting combined with light and dark mode there are 4 color modes: light, light high contrast, dark, and dark high contrast.

A newer media query on the web called `prefers-contrast` can be set to `no-preference`, `more`, and `less`. This media query is in the [media queries 5 draft spec](https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-contrast). Here is an [MDN article on prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) as well.

The [browser compatibility table](https://caniuse.com/mdn-css_at-rules_media_prefers-contrast) is no support except Firefox with a special flag at the time of this writing. The macOS ‘increase contrast’ accessibility setting does not yet work with any browser to set `prefers-contrast` media query.

**UPDATE: The latest Safari supports the **`**prefers-contrast**`** media query!** Thank you [Kilian Valkhof](https://twitter.com/kilianvalkhof) for the info!

Android has an accessibility setting called ‘high contrast text’, which is an experimental setting at the time of this writing. As far as I’m aware, this setting makes all text pure black or pure white based on its background color. I don’t think an app developer has access to changing colors based on this setting, though.

Overall support for high contrast mode is not significant across platforms, but we can still build it into our design tokens. Platforms that support it can get it, and others won’t. It is a good idea to plan for the future in a progressive enhancement way, especially when related to accessibility.

Both methods outlined in this article would work for adding more color modes. The single-token method would look like this:

```plain text
{
  "color": {
    "background": {
      "primary": {
        "value": "{color.core.neutral.0.value}",
        "darkValue": "{color.core.neutral.900.value}",
        "hcValue": "{color.core.neutral.0.value}",
        "hcDarkValue": "{color.core.neutral.1000.value}"
      },
      //...
```

The multi-file method would either add `hc-tokens/` and `hc-dark-tokens/` directories or add `.hc.json` and `.hcDark.json` file extensions.

**The demo repository has high-contrast light and dark modes implemented for both methods! You can see the effect of high-contrast modes in the iOS and web demo apps.**

## Conclusion

If you made it this far, congratulations! Hopefully, I didn’t scare you off. You can take this and apply it to your design token setup. Even though this is a long article, there is a lot more information in the [repository](https://github.com/dbanksdesign/style-dictionary-dark-mode) including heavily commented code and instructions.

After spending countless hours working on both methods and this article, I am leaning heavily towards the [**multi-file method**](https://github.com/dbanksdesign/style-dictionary-dark-mode/tree/multi-file). The main reason is it works with less overall customization, and requires fewer custom formats than the single-token method. Also, to get dark mode graphics in the single-token method, you need to create separate source SVG files, which is a bit annoying. The cost of having separate files for each color mode outweighs the benefit of defining all color mode values in a single token. The authoring experience for the multi-file approach with the file extensions (background.json and background.dark.json) is comparable and resembles a similar pattern in Android development. Based on the pull requests for [multi-file](https://github.com/dbanksdesign/style-dictionary-dark-mode/pull/3/files) and [single-token](https://github.com/dbanksdesign/style-dictionary-dark-mode/pull/4/files), the multi-file pull request comes in with fewer changes: **+441****-48** compared to **+790****-59**. The difference is mostly due to creating different SVG assets for each color mode, but the multi-file method requires less customization too.

Remember, in both approaches every color token does not need light and dark values. Use references so you only have to change a small set instead. This is why the multi-tiered structure works so well. If you structure your token references well, you might only need to have dark values for a handful of color tokens.

What do you think? Feel free to ask questions or file issues on the [sample repository](https://github.com/dbanksdesign/style-dictionary-dark-mode/issues).

Special thanks to [Christophe Coutzoukis](https://twitter.com/ventrebleu) for editing this article.