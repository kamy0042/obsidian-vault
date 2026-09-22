---
URL: https://speakerdeck.com/tomof/webpackgahe-gu-bi-yao-de-he-gu-fen-kariduraifalseka
Updated: 2021-01-15T17:58:00
Created: 2021-01-15T17:58:00
Tags: [topic/技術/ビルドツール]
---
![](https://d1eu30co0ohy4w.cloudfront.net/assets/mark-white-8d908558fe78e8efc8118c6fe9b9b1a9846b182c503bdc6902f97df4ddc9f3af.svg)

### webpackが何故必要で、 何故分かりづらいのか

[tomof](https://speakerdeck.com/tomof)

![](https://secure.gravatar.com/avatar/96b4013c20d6ff6c2371605870167b3c?s=47)

November 20, 2016

[Programming
](https://speakerdeck.com/c/programming)

[5](https://speakerdeck.com/signin?return_to=%2Ftomof%2Fwebpackgahe-gu-bi-yao-de-he-gu-fen-kariduraifalseka)

2.7k

# webpackが何故必要で、 何故分かりづらいのか

![](https://secure.gravatar.com/avatar/96b4013c20d6ff6c2371605870167b3c?s=128)

### [tomof](https://speakerdeck.com/tomof)

November 20, 2016

**Transcript**
1. [**webpack͕ԿނඞཁͰɺ Կނ෼͔ΓͮΒ͍ͷ͔ @tomof 1**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_0.jpg)
            
        
2. [**໨࣍ 1. Կނwebpackͳͷ͔ʁ 2. webpackೖ໳ 3. webpack͸Կނ͜Μͳʹ΋෼͔ΓͮΒ͍ͷ͔? 4. ·ͱΊ 2**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_1.jpg)
            
        
3. [**1. Կނwebpackͳͷ͔ʁ 3**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_2.jpg)
            
        
4. [**طଘͷπʔϧ͸Կ͕ବ໨ͩͬͨͷ͔ʁ 4**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_3.jpg)
            
        
5. [**5 େن໛ͳϓϩδΣΫτʹ͸ ద͍ͯ͠ͳ͍**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_4.jpg)
            
        
6. [**զʑ͸ɺ1ͭͷڊେͳϑΝΠϧʹ࿈݁͢ΔΑ͏ɺ ڭҭ͞Εͯ͠·ͬͨʂʂ 6**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_5.jpg)
            
        
7. [**طଘͷπʔϧΛ࢖ͬͯ ղܾͰ͖ͳ͔ͬͨͷ͔ʁ 7**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_6.jpg)
            
        
8. [**8 ֦ுΛࢼΈ͕ͨ ্ख͘ߦ͔ͳ͔ͬͨ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_7.jpg)
            
        
        
        
9. [**खಈͰղܾͰ͖ͳ͍͔ʁ • ґଘੑͷղܾɺඇಉظಡΈࠐΈ • ؾ͕ڰ͍ͦ͏…ɻ 10**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_9.jpg)
            
        
10. [**webpackʹҕͶΔࣗಈԽͷઃఆ • ෼ׂͨ͠ϑΝΠϧαΠζ͕খ͗͢͞Δ৔߹͸ɺ ෼ׂ͠ͳ͍ͱ͍͏ઃఆ • ը૾αΠζ͕খ͚͞Ε͹ΠϯϥΠϯԽɺ େ͖͚Ε͹URLͰಡΈࠐΈɻ 11 background-image: url('../img/puppy.jpg');**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_10.jpg)
            background-image: url(‘data:image/png;base64, iVB0Rw0…’); size େ size গ
        
11. [**• webpack your bags ͷ Maxime Fabre ࢯ – طଘͷπʔϧͰຬ଍͍ͯͨ͠͠ɺ࠷ॳʹwebpackͷ֓ཁʹ໨Λ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_11.jpg)
            ௨ͨ࣌͠ʹΠϥοͱͯ͠λϒΛดͨ͡ɻ – ࠓ͸શͯΛwebpackʹҕͶͯ͠·͑ͱͳ͍ͬͯΔɻ 12 webpackΛ࢖ͬͨਓͷײ૝
        
12. [**2. webpackೖ໳ 13**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_12.jpg)
            
        
        
        
13. [**webpack.conﬁg.js • ࠷ऴతʹ module.exports ʹΦϒδΣΫΛࢦఆ͢Δ 15 module.exports = { entry:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_14.jpg)
            …, output: {…}, module: { loaders: [ … ], }, plugins: […], ɹ… };
        
14. [**webpack.conﬁg.js • ΤϯτϦϙΠϯτ = JavaScript࣮ߦͷೖΓޱͱͳΔϑΝΠϧΛࢦఆ 16 module.exports = { entry:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_15.jpg)
            …, output: {…}, module: { loaders: [ … ], }, plugins: […], ɹ… };
        
15. [**webpack.conﬁg.js 17 module.exports = { entry: …, output: {…}, module:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_16.jpg)
            { loaders: [ … ], }, plugins: […], ɹ… }; • ग़ྗϑΝΠϧͷઃఆ
        
16. [**webpack.conﬁg.js • ϩʔμʔͷઃఆ 18 module.exports = { entry: …, output:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_17.jpg)
            {…}, module: { loaders: [ … ], }, plugins: […], ɹ… };
        
17. [**webpack.conﬁg.js • ϓϥάΠϯͷઃఆ 19 module.exports = { entry: …, output:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_18.jpg)
            {…}, module: { loaders: [ … ], }, plugins: […], ɹ… };
        
18. [**ϏϧυίϚϯυΛ࣮ߦ 20**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_19.jpg)
            
        
19. [**webpack༻ޠ • νϟϯΫ • ϩʔμʔ • ϓϥάΠϯ • HMR (Hot**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_20.jpg)
            Module Replacement) 21
        
20. [**νϟϯΫ 22 1νϟϯΫ=࠷ऴతʹ1ϑΝΠϧʹग़ྗ͞ΕΔͱ͸ݶΒͳ͍? (͜͜Ͱ͸ɺϓϥάΠϯ͕ɺCSSΛൈ͖ग़ͯ͠ผϑΝΠϧʹ෼཭) • ίʔυͷݻ·Γ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_21.jpg)
            
        
21. [**ϩʔμʔ 23 • Ϟδϡʔϧͱͯ͠ಡΈࠐΊΔΑ͏ʹ͢ΔͨΊͷ࢓૊Έ • loaderͷଞʹpreLoader(લ)ɺpostLoader(ޙ)͕͋Δ – preLoader : ओʹlintܥͷॲཧͰ࢖༻͞ΕΔ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_22.jpg)
            – postLoader : ओʹίʔυΧόϨοδͷॲཧͰ࢖༻͞ΕΔ
        
22. [**ϩʔμʔͷઃఆྫ 24 module: { loaders: [ { test: /\.js/, loader:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_23.jpg)
            'babel', include: __dirname + '/src', }, { test: /\.scss/, loader: 'style!css!sass' }, … ]
        
23. [**ϩʔμʔͷνΣʔϯ 25 • νΣʔϯͰܨ͛Δ͜ͱ͕Մೳɻ ྫ)ɹ'style!css!sass' 1. SassΛCSSʹม׵ 2. CSSΛJavaScriptʹจࣈྻͱͯ͠ಡΈࠐΉ 3.**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_24.jpg)
            ಡΈࠐΜͩจࣈྻΛ<style>λάͱͯ͠<head>಺ʹ௥Ճ .sass .css HTML <style> body: {…} header: {…} 1 2 3
        
24. [**ϩʔμʔΛconﬁgʹઃఆ͢Δ͜ͱͰ… 26 require("!style!css!./style.css"); require("./style.css");**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_25.jpg)
            
        
25. [**ϓϥάΠϯ͕ߦ͏͜ͱʢ̍ʣ 27 • ϩʔμʔʹΑͬͯग़ྗ͞ΕͨϑΝΠϧʹରͯ͠Կ͔Λ ߦ͏ –ɹѹॖԽ ɾ೉ಡԽ –ɹڞ௨͢ΔίʔυΛҰవΊʹͯ͠ผϑΝΠϧʹൈ͖ग़͢ –ɹಛఆͷαΠζʹຬͨͳ͍ϑΝΠϧͷ෼ׂΛऔΓ΍ΊΔ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_26.jpg)
            
        
26. [**28 • ϩʔμʔͷ໾ׂ͔Β֎ΕΔ͜ͱΛ୲͏ –ɹग़ྗϑΥϧμ಺ΛΫϦʔϯΞοϓ͢Δ –ɹwebpackͷग़ྗ಺༰ʹ߹ΘͤͯಈతʹHTMLΛੜ੒͢Δ ϓϥάΠϯ͕ߦ͏͜ͱʢ̎ʣ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_27.jpg)
            
        
27. [**HMR 29 • Hot Module Replacement • ΦʔτϦϩʔυ͸ϖʔδશମΛ࠶ಡࠐΈ͢Δ͕ɺHMR͸࠶ಡ ࠐ͢Δ͜ͱແ͘ɺมߋ͞ΕͨՕॴ͚ͩΛಈతʹஔ׵͢Δɻ •**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_28.jpg)
            ྫ͑͹ɺ͋ΔखॱΛز͔ͭ౿ΜͰදࣔͨ͠μΠΞϩά಺ͷॲ ཧΛมߋͨ͠৔߹ʹɺͦͷखॱΛ܁Γฦ͢ඞཁ͕ແ͘ͳΔɻ
        
28. [**web-dev-serverͬͯʁ 30 • Expressϕʔεͷ։ൃ༻αʔόʔ • ΦʔτϦϩʔυ΍HMRΛαϙʔτ • /webpack-dev-server/ʹiframeΛ࢖༻ͨ͠ ಛผͳ؀ڥΛఏڙ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_29.jpg)
            
        
        
        
29. [**3. webpack͸Կނ͜Μͳʹ΋ ɹ෼͔ΓͮΒ͍ͷ͔? 32**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_31.jpg)
            
        
        
        
30. [**34 entry: ‘./src’, entry: ‘./src/*’, ʁ gulp.src(“./path/to/**/*.js”) ʹ ͍ۙײ͡ʁ webpack.conﬁg.jsͷentryύεࢦఆʹቕͬͨ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_33.jpg)
            
        
31. [**entry: ‘./src/*’, entry: ‘./src’, 35 ʁ webpack.conﬁg.jsͷentryύεࢦఆʹቕͬͨ ҧͬͨ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_34.jpg)
            
        
32. [**entry: ‘./src’, entry: ‘./src/index.js’, 36 webpack.conﬁg.jsͷentryύεࢦఆʹቕͬͨ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_35.jpg)
            
        
33. [**37 webpack.conﬁg.jsͷentryύεࢦఆʹቕͬͨ ͦͷҰํͰ… output: { … path: ‘./builds’ … },**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_36.jpg)
            outputͷpathͳͲɺϑΥϧμΛࣔ͢ઃఆ΋͋Δɻ
        
34. [**38 entry: ‘./src’, ࣮͸”main”ͱ͍͏νϟϯΫ໊͕ࣗಈతʹ෇͚ΒΕ͍ͯΔɻ output: { filename: '[name]-bundle.js', … },**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_37.jpg)
            νϟϯΫ໊ͷ໊෇͚ͱ࢖༻ํ๏͕આ໌ෆ଍ main-bundle.js
        
35. [**39 entry: { main: './src', vendor: ["jquery", "mustache"], admin: './admin'**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_38.jpg)
            }, νϟϯΫ໊ͷ໊෇͚ͱ࢖༻ํ๏͕આ໌ෆ଍ entry: ‘./src’, νϡʔτϦΞϧ౳ͰΑ͘༻͍ΒΕΔྫ͕ͩ… ࣮ફͰ͸͜ͷΑ͏ʹͳΔͷͰ͸
        
36. [**40 entry: { main: './src', vendor: ["jquery", "mustache"], admin: './admin'**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_39.jpg)
            }, νϟϯΫ໊ͷ໊෇͚ͱ࢖༻ํ๏͕આ໌ෆ଍ entry: ‘./src’, νϡʔτϦΞϧ౳ͰΑ͘༻͍ΒΕΔྫ͕ͩ… ࣮ફͰ͸͜ͷΑ͏ʹͳΔͷͰ͸ ೚ҙʹࢦఆՄೳͳνϟϯΫ໊
        
37. [**41 • ϩʔμʔͷνΣʔϯ͸ɺԿނӈ͔Βࠨͳͷ͔ʁ ϩʔμʔઃఆͷॻ͖ํ ɹ ’style!css!sass’**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_40.jpg)
            
        
38. [**42 • ͜͏͍͏͜ͱͳͷ͔ʁ ϩʔμʔઃఆͷॻ͖ํ style( css( sass( ) ) )**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_41.jpg)
            ΋ͦ͠͏ͳΒɺҰݴॻ͍ͯ͘ΕΕ͹͍͍ͷʹ…ɻ
        
39. [**ઃఆͷΩʔɾ஋͕෼͔ΓͮΒ͍ 43 module: { loaders: [ { test: /\.js/, loader:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_42.jpg)
            'babel', include: __dirname + '/src', }, { test: /\.scss/, loader: 'style!css!sass' }, … ]
        
40. [**ઃఆͷΩʔɾ஋͕෼͔ΓͮΒ͍ 44 module: { loaders: [ { test: /\.js/, loader:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_43.jpg)
            'babel', include: __dirname + '/src', }, { test: /\.scss/, loader: 'style!css!sass' }, … ] ͳͥɺtest ͳͷ͔ʁ
        
41. [**ઃఆͷΩʔɾ஋͕෼͔ΓͮΒ͍ 45 JavaScriptͷਖ਼نදݱͷtest()ϝιουʹ༝དྷʁ © 2005-2016 Mozilla Developer Network & ߩݙऀ֤ਓ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_44.jpg)
            
        
42. [**ϓϥάΠϯ͕೉͍͠… 46 • ࣮ફͰආ͚ͯ͸௨Εͳ͍͚Ͳཧղ͕೉͍͠ϓϥάΠϯ –ɹCommonsChunkPluginɹ(webpackެࣜ) –ɹextract-text-webpack-plugin**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_45.jpg)
            
        
43. [**CommonsChunkPlugin 47 • ֤νϟϯΫͰڞ௨(ॏෳ)͢ΔϞδϡʔϧΛൈ͖ग़ͯ͠ผ ϑΝΠϧʹ·ͱΊͯ͘ΕΔϓϥάΠϯ • αʔυύʔςΟ੡ͷϞδϡʔϧ͚ͩΛ·ͱΊͨ vendor.jsΛ࡞Δͷʹ΋࢖༻͞ΕΔ͕ɺ͜Ε͕ ඇৗʹ෼͔ΓͮΒ͔ͬͨɻ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_46.jpg)
            
        
44. [**CommonsChunkPlugin 48 • ͪͳΈʹɺ͜ͷϓϥάΠϯΛ࢖༻͠ͳ͍ͱ… webpack͸࠷௿ݶͷ࠷దԽ͔͠ߦΘͳ͍ͨΊɺ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_47.jpg)
            
        
45. [**CommonsChunkPlugin 49 • ڞ௨ͯ͠࢖༻͞ΕΔϥΠϒϥϦ΍Ϟδϡʔϧ͕ ෳ਺ͷνϟϯΫͰಡΈࠐ·Εͯ͠·͏ɻ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_48.jpg)
            
        
46. [**CommonsChunkPlugin 50 Ծʹɺ͜ΜͳΤϯτϦʔϙΠϯτ͕͋ͬͨͱͯ͠ɺ entry: { pageA: "./pageA", pageB: "./pageB", pageC:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_49.jpg)
            "./pageC", adminPageA: "./adminPageA", adminPageB: "./adminPageB", adminPageC: "./adminPageC", }, ࣍ͷΑ͏ͳCommonsChunkPluginࢦఆ͕ ͋ͬͨͱ͢Δͱɺ
        
47. [**CommonsChunkPlugin 51 var webpack = require('webpack'); … plugins: [ …**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_50.jpg)
            new webpack.optimize.CommonsChunkPlugin({ name: "admin-commons", chunks: ["adminPageA", "adminPageB"] }), new webpack.optimize.CommonsChunkPlugin({ name: "commons", chunks: ["pageA", "pageB", "admin-commons"], minChunks: 2 }), new webpack.optimize.CommonsChunkPlugin({ name: "c-commons", chunks: ["pageC", "adminPageC"] }), ],
        
48. [**CommonsChunkPlugin 52 var webpack = require('webpack'); … plugins: [ …**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_51.jpg)
            new webpack.optimize.CommonsChunkPlugin({ name: "admin-commons", chunks: ["adminPageA", "adminPageB"] }), new webpack.optimize.CommonsChunkPlugin({ name: "commons", chunks: ["pageA", "pageB", "admin-commons"], minChunks: 2 }), new webpack.optimize.CommonsChunkPlugin({ name: "c-commons", chunks: ["pageC", "adminPageC"] }), ],
        
49. [**CommonsChunkPlugin 53 adminPageA adminUkl adminAcontroller projectUkl adminPageB adminUkl adminBcontroller projectUkl**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_52.jpg)
            
        
50. [**CommonsChunkPlugin 54 admin-commons adminUkl projectUkl adminPageA adminAcontroller adminPageB adminBcontroller**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_53.jpg)
            
        
51. [**CommonsChunkPlugin 55 var webpack = require('webpack'); … plugins: [ …**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_54.jpg)
            new webpack.optimize.CommonsChunkPlugin({ name: "admin-commons", chunks: ["adminPageA", "adminPageB"] }), new webpack.optimize.CommonsChunkPlugin({ name: "commons", chunks: ["pageA", "pageB", "admin-commons"], minChunks: 2 }), new webpack.optimize.CommonsChunkPlugin({ name: "c-commons", chunks: ["pageC", "adminPageC"] }), ],
        
        
        
52. [**CommonsChunkPlugin 57 admin-commons adminUkl pageA pageAcontroller pageB pageBcontroller commons projectUkl**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_56.jpg)
            
        
        
        
53. [**αʔυύʔςΟϥΠϒϥϦ͚ͩΛ෼཭͍ͨ͠ 59 vendor**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_58.jpg)
            
        
54. [**60 <script src="builds/vendor.js"></script> <script src=“builds/app.js"></script> vendor.jsʹ͸ɺ७ਮʹ3rdύʔςΟͷίʔυ͕ ࿈݁͞Εͨ΋ͷ͚ͩΛؚΊ͍ͨɻ αʔυύʔςΟϥΠϒϥϦ͚ͩΛ෼཭͍ͨ͠**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_59.jpg)
            
        
        
        
        
55. [**63 αʔυύʔςΟϥΠϒϥϦ͚ͩΛ෼཭͍ͨ͠ plugins: [ … new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_62.jpg)
            'vendor.js', minChunks: Infinity, }), … ]
        
56. [**64 αʔυύʔςΟϥΠϒϥϦ͚ͩΛ෼཭͍ͨ͠ plugins: [ … new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_63.jpg)
            'vendor.js', minChunks: Infinity, }), … ] Inﬁnity !?
        
57. [**65 vendor CommonsChunkPlugin Inﬁnity vendorҎ֎ͷϞδϡʔϧ vendorҎ֎ͷϞδϡʔϧ vendorҎ֎ͷϞδϡʔϧ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_64.jpg)
            
        
58. [**66 αʔυύʔςΟϥΠϒϥϦ͚ͩΛ෼཭͍ͨ͠ plugins: [ … new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename:**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_65.jpg)
            'vendor.js', minChunks: Infinity, }), … ] chunks͕লུ͞Ε͍ͯΔͷͰɺ શͯͷνϟϯΫ͕ର৅Ͱ͋Δ͜ͱʹ΋஫ҙʂ chunks: …,
        
        
        
59. [**CommonsChunkPlugin 68 app app appController pageA pageAcontroller admin adminController admin**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_67.jpg)
            vendor νϟϯΫͷ ϞδϡʔϧΛ(࣮࣭)ൈ͖ग़͚ͩ͢(?)
        
        
        
60. [**70 extract-text-webpack-plugin var ExtractPlugin = require('extract-text-webpack-plugin'); var plugins = [**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_69.jpg)
            … new ExtractPlugin(‘bundle.css'), … ];
        
61. [**71 extract-text-webpack-plugin module: { loaders: [ … { test: /\.scss/,**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_70.jpg)
            loader: ExtractPlugin.extract('style', 'css!sass'), }, … ], },
        
62. [**72 extract-text-webpack-plugin module: { loaders: [ … { test: /\.scss/,**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_71.jpg)
            loader: ExtractPlugin.extract('style', 'css!sass'), }, … ], }, ൈ͖ग़͢͜ͱ͕Մೳͳ৔߹ʹ ߦ͏͜ͱ ൈ͖ग़͢͜ͱ͕ ग़དྷͳ͔ͬͨ৔߹ʹ ௥ՃͰߦ͏͜ͱ
        
63. [**4. ·ͱΊ 73**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_72.jpg)
            
        
64. [**νϡʔτϦΞϧ΍ϒϩάهࣄʹ஫ҙ • ͜ΕΒʹԊͬͯࢼ͚ͩ͢Ͱ͸ɺటপʹ͸·Δɻ • େࣄͳઆ໌΍ิ଍͕ল͔Ε͍ͯΔ͜ͱ͕ଟ͍ɻ 74**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_73.jpg)
            
        
65. [**ެࣜυΩϡϝϯτΛಡΈղ͘ 75**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_74.jpg)
            
        
66. [**ެࣜυΩϡϝϯτΛಡΈղ͘ 76 ίϝϯτΛؚΊ…ʢٽʣ**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_75.jpg)
            
        
67. [**webpack2 / ৽υΩϡϝϯταΠτ 77**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_76.jpg)
            
        
68. [**͝ਗ਼ௌɺ͋Γ͕ͱ͏͍͟͝·ͨ͠ɻ 78**](https://files.speakerdeck.com/presentations/1b765a12187048d7bc3a2984c3fc55b4/slide_77.jpg)