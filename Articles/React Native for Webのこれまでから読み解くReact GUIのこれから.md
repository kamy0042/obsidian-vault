---
Created: 2021-10-02T22:52:00
Tags: [topic/技術/React]
---
![[Attachments/無題のフォルダ/slide_0 1.jpg]]

## Transcript

1.  2021 2021.10.2 Yukiya Nakagawa a.k.a Nkzn 1
    ### [React Native for Webͷ ͜Ε·Ͱ͔ΒಡΈͱ͘ React GUIͷ͜Ε͔Β React Native Matsuri](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_0.jpg)
2.  ৽ׁࡏॅ • ೋࣇͷ෕Ͱ࠺ͷ෉ʢࠓ೔΋ϫϯΦϖҭࣇ͋Γ͕ͱ͏🙏ʣ • ࢿ࢈ӡ༻͓ख఻͍αʔϏεmoneiroͷITཪํ • ٕज़ॻయͷWebϑϩϯτΤϯυˍܾࡁΞϓϦ୲౰ • React 2015ʙ / React Native 2017ʙ 2 0:38
    ### [Who am I • Yukiya Nakagawa a.k.a Nkzn (ͳ͔͟Μ) •](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_1.jpg)
3. 
    ### [DroidKaigiͰReact Nativeͷ࿩Λͯͨ͠ਓͰ͢ • https://droidkaigi.github.io/2017/timetable.html • https://droidkaigi.jp/2018/timetable/ 4](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_3.jpg)
4.  "react-gui/use-hover"; export default function App() { const [hovered, onHoverChange] = React.useState(false); const ref = useHover({ onHoverChange }); return ( <div ref={ref} style={{ width: 200, height: 200, margin: "50px auto", border: "1px solid black", backgroundColor: hovered ? "orange" : null }} /> ); } • RefྖҬ΁ͷϗόʔΛݕग़ 11
    ### [useHover import React from "react"; import { useHover } from](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_10.jpg)
5.  const ref = useHover({ onHoverChange }); return [ref, hovered]; } ࢖͍΍͘͢ϥοϓ refͱhovered͚ͩެ։ 12
    ### [͓·͚ useHoverState function useHoverState() { const [hovered, onHoverChange] = useState(false);](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_11.jpg)
6.  hovered] = useHoverState(); return ( <View style={styles.container}> <View ref={ref} style={[ styles.card, { backgroundColor: hovered ? "\#ffa" : "\#fff" } ]} > <Image source={imageUrl} style={styles.thumbImg} /> <View style={{ justifyContent: "center" }}> <Text accessibilityRole="heading" accessibilityLevel={3} style={styles.title} > @Nkzn </Text> <View style={{ height: 8 }} /> <Text style={styles.description}> Matsuri 2021 Speaker </Text> </View> </View> </View> ); } • View, Text, Image • StyleSheet.create(ޙड़)Ͱ ࡞ͬͨstylesΛࢀর • ελΠϧΛ഑ྻͰϚʔδ 15 4:26
    ### [਌ͷإΑΓݟͨ React NativeͬΆ͞ export default function App() { const [ref,](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_14.jpg)
7.  hovered] = useHoverState(); return ( <View style={styles.container}> <View ref={ref} style={[ styles.card, { backgroundColor: hovered ? "\#ffa" : "\#fff" } ]} > <Image source={imageUrl} style={styles.thumbImg} /> <View style={{ justifyContent: "center" }}> <Text accessibilityRole="heading" accessibilityLevel={3} style={styles.title} > @Nkzn </Text> <View style={{ height: 8 }} /> <Text style={styles.description}> Matsuri 2021 Speaker </Text> </View> </View> </View> ); } • View, Text, Image • StyleSheet.create(ޙड़) Ͱ࡞ͬͨstylesΛࢀর • ελΠϧΛ഑ྻͰϚʔδ 16 4:45
    ### [਌ͷإΑΓݟͨ React NativeͬΆ͞ export default function App() { const [ref,](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_15.jpg)
8.  hovered] = useHoverState(); return ( <View style={styles.container}> <View ref={ref} style={[ styles.card, { backgroundColor: hovered ? "\#ffa" : "\#fff" } ]} > <Image source={imageUrl} style={styles.thumbImg} /> <View style={{ justifyContent: "center" }}> <Text accessibilityRole="heading" accessibilityLevel={3} style={styles.title} > @Nkzn </Text> <View style={{ height: 8 }} /> <Text style={styles.description}> Matsuri 2021 Speaker </Text> </View> </View> </View> ); } • View, Text, Image • StyleSheet.create(ޙड़)Ͱ ࡞ͬͨstylesΛࢀর • ελΠϧΛ഑ྻͰϚʔδ 17 5:04
    ### [਌ͷإΑΓݟͨ React NativeͬΆ͞ export default function App() { const [ref,](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_16.jpg)
9.  "\#eee", height: "100vh" }, card: { boxShadow: "2px 2px 4px \#ccc", padding: 16, backgroundColor: "\#fff", borderRadius: 8, flexDirection: "row", maxWidth: 500, width: "100%", alignSelf: "center" }, thumbImg: { width: 100, height: 100, borderWidth: 1, borderColor: "\#ccc", borderRadius: 50, marginRight: 16 }, title: { fontSize: 24, fontWeight: "700" }, description: { color: "#888" } }); ελΠϧʹ࢖͑Δϓϩύ ςΟ͸ϥϯλΠϜґଘ shadowܥ͸boxShadow ը૾Λؙ͘͢Δͷ͸ׂͱ͍ ͭ΋௨Γͷ΍Γํ 18 5:23
    ### [਌ͷإΑΓ(ུ) const styles = StyleSheet.create({ container: { padding: 24, backgroundColor:](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_17.jpg)
10.  backgroundColor: "\#fff", borderRadius: 8, flexDirection: "row", maxWidth: 500, width: "100%", alignSelf: "center" }, ελΠϧʹ࢖͑Δϓϩύ ςΟ͸ϥϯλΠϜґଘ shadowܥ͸boxShadow ը૾Λؙ͘͢Δͷ͸ׂͱ͍ ͭ΋௨Γͷ΍Γํ 19 5:42
    ### [਌ͷإΑΓ(ུ) card: { boxShadow: "2px 2px 4px #ccc", padding: 16,](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_18.jpg)
11.  "\#ccc", borderRadius: 50, marginRight: 16 }, ελΠϧʹ࢖͑Δϓϩύ ςΟ͸ϥϯλΠϜґଘ shadowܥ͸boxShadow ը૾Λؙ͘͢Δͷ͸ׂͱ͍ ͭ΋௨Γͷ΍Γํ 20 6:01
    ### [਌ͷإΑΓ(ུ) thumbImg: { width: 100, height: 100, borderWidth: 1, borderColor:](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_19.jpg)
12.  GUI͸Facebook໊͚ٛͩͲNPMͳͲͰࢯͷؔΘΓ͕ݟ͑Δ • https://www.npmjs.com/package/react-gui • React NativeͬΆ͍ίʔυΛϒϥ΢βͰಈ͔͢Ξϓϩʔν 32 10:08
    ### [React GUI͸React Native for Webͷܥේ • ͲͪΒ΋࡞ऀ͸Nicolas Gallagherࢯ • React](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_31.jpg)
13.  Lite (mobile.twitter.com) Ͱ UIϥΠϒϥϦͱͯ͠࠾༻͞Εͨ • ࡞ऀͷNicolasࢯTwitter LiteϓϩδΣΫτ౰࣌ͷςοΫϦʔυ 34 10:46
    ### [React Native for Web͓͞Β͍ᶃ • https://necolas.github.io/react-native-web/ • 2017೥9݄ʹv0.1.0͕ެ։ • 2017೥4݄ʹϦϦʔε͞ΕͨTwitter](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_33.jpg)
14.  43 13:37
    ### [ϥϯλΠϜͱͯ͠ͷReact Native • ωΠςΟϒϓϥοτϑΥʔϜͷ্ͰJavaScriptΤϯδϯΛಈ͔͢ • ϒϦοδ/JSI͔Βͷߋ৽ґཔΛड͚ͯɺωΠςΟϒUIΛߋ৽͢Δ • ϒϦοδ/JSI͔Βͷݺͼग़͠Λड͚ͯɺωΠςΟϒॲཧΛ࣮ߦ͢Δ • ωΠςΟϒॲཧͷ݁ՌΛJavaScriptଆʹ௨஌͢Δ](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_42.jpg)
15.  /BUJWF$PNQPOFOUT"1*T 3/J04 /BUJWF$PNQPOFOUT"1*T 3/8JOEPXT /BUJWF$PNQPOFOUT"1*T 3FBDU/BUJWF+BWB4DSJQU"1* 0VS"XFTPNF"QQMJDBUJPO } } ϥϯλΠϜ (Java, Obj-C, C++) UIϥΠϒϥϦ (JavaScript) 44 13:56 $PNQPOFOU"1*ͷ /BUJWF࣮૷ +4*΍+4&OHJOF
    ### ["OESPJE J04 8JOEPXT "OESPJE4%, J044%, 7JTVBM$ 3/"OESPJE3VOUJNF 3/J043VOUJNF 3/8JOEPXT3VOUJNF 3/"OESPJE](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_43.jpg)
16.  ͕ੜ͍͑ͯΔʢ಺෦࣮૷͸ͨͩͷdiv΍span΍inputʣ • React Nativeͱಉ໊͡લɾಉ͡Ҿ਺ɾಉ͡ڍಈͷAPI͕ੜ͍͑ͯΔ • ͨ·ͨ·React Nativeͱಉ͡ΠϯλʔϑΣʔεΛ͍࣋ͬͯΔ͚ͩͷɺ React Nativeͱ͸ґଘؔ܎ͷͳ͍UIϥΠϒϥϦ 46 14:34
    ### [React Native for Webͷਖ਼ମ • React Native͸ϥϯλΠϜΛ࠶ݱ͠ͳ͍ • React Nativeͱಉ໊͡લɾಉ͡propsɾಉ͡ݟͨ໨ͷίϯϙʔωϯτ](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_45.jpg)
17.  /BUJWF$PNQPOFOUT"1*T 3/J04 /BUJWF$PNQPOFOUT"1*T 3/8JOEPXT /BUJWF$PNQPOFOUT"1*T 3FBDU/BUJWF+BWB4DSJQU"1* 0VS"XFTPNF"QQMJDBUJPO \#SPXTFS %0."1*T \#VJMUJO'VODUJPOT 3FBDU%0. 3FBDU/BUJWFGPS8FC $PNQPOFOUT"1*T 47 14:53
    ### ["OESPJE J04 8JOEPXT "OESPJE4%, J044%, 7JTVBM$ 3/"OESPJE3VOUJNF 3/J043VOUJNF 3/8JOEPXT3VOUJNF 3/"OESPJE](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_46.jpg)
18.  hovered] = useHoverState(); return ( <View style={styles.container}> <View ref={ref} style={[ styles.card, { backgroundColor: hovered ? "\#ffa" : "\#fff" } ]} > <Image source={imageUrl} style={styles.thumbImg} /> <View style={{ justifyContent: "center" }}> <Text accessibilityRole="heading" accessibilityLevel={3} style={styles.title} > @Nkzn </Text> <View style={{ height: 8 }} /> <Text style={styles.description}> Matsuri 2021 Speaker </Text> </View> </View> </View> ); } • View, Text, Image • StyleSheet.create(ޙड़)Ͱ ࡞ͬͨstylesΛࢀর • ελΠϧΛ഑ྻͰϚʔδ ͜Ε͕3FBDU%0.Ͱ΋ಡΊΔܗʹͳΔΘ͚Ͱ͢ 48
    ### [਌ͷإΑΓݟͨ React NativeͬΆ͞ export default function App() { const [ref,](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_47.jpg)
19.  50 15:50
    ### [A. Nicolasͷ౒ྗʹΑͬͯ • ͔ͭͯnormalize.cssΛ࡞͍ͬͯͨఔ౓ʹ͸ɺNicolas͸CSSͷঊ • ʮScrollViewͷ಺ଆʹpaddingΛ෇͚͍ͨ৔߹͸ contentContainerStyleΛ࢖͍·͠ΐ͏ʯΈ͍ͨͳڍಈ·Ͱ࠶ݱ͞Εͯ ͍ΔʢڪΔ΂͖มଶͰ͋Δʣ • Yoga͕ͪΌΜͱϒϥ΢βͷڍಈΛ࠶ݱͯ͘͠Ε͍ͯΔͷ΋େ͖͍](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_49.jpg)
20.  } from ‘react-native-web’; XFCQBDLͷSFTPMWFBMJBT౳Ͱ ໊લΛޡຐԽͯ͠lSFBDUOBUJWFzͱͯ͠ *NQPSUͰ͖ΔΑ͏ʹ͍ͯ͠Δͷ͕&YQP8FC 51 16:09
    ### [React Native for Web͸ͨͩͷUIϥΠϒϥϦ import { Image, Text, View, StyleSheet](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_50.jpg)
21.  ProgressBar, ActivityIndicator • େྔͷσʔλΛলϝϞϦͰදࣔͰ͖ΔϦετػߏ • → FlatList 61 19:19
    ### [͓΍ɺ͜Μͳͱ͜Ζʹ੔ཧ͞ΕͨGUI͕ • ೚ҙͷྖҬ಺Λ׳ੑεΫϩʔϧ͍ͨ͠ • → ScrollView • ॲཧ଴ͪͷϓϩάϨεόʔΛग़͍ͨ͠ • →](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_60.jpg)
22.  hovered] = useHoverState(); return ( <View style={styles.container}> <View ref={ref} style={[ styles.card, { backgroundColor: hovered ? "\#ffa" : "\#fff" } ]} > <Image source={imageUrl} style={styles.thumbImg} /> <View style={{ justifyContent: "center" }}> <Text accessibilityRole="heading" accessibilityLevel={3} style={styles.title} > @Nkzn </Text> <View style={{ height: 8 }} /> <Text style={styles.description}> Matsuri 2021 Speaker </Text> </View> </View> </View> ); } • View, Text, Image • StyleSheet.create(ޙड़)Ͱ ࡞ͬͨstylesΛࢀর • ελΠϧΛ഑ྻͰϚʔδ Ͱɺ͜͏ͳͬͨΘ͚ 64
    ### [਌ͷإΑΓݟͨ React NativeͬΆ͞ export default function App() { const [ref,](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_63.jpg)
23.  Λϒϥ΢βʹ΋औΓࠐΜͰΈΑ͏ • CSSͷࠇຐज़Λ֮͑ͳͯ͘΋ҰൠతͳGUIΞϓϦέʔγϣϯΛ૊ΊΔΑ͏ʹͳΔͧʂ • ͦΕͰ͍ͯσβΠϯ্ͷΦϐχΦϯ͸ͳ͍ͷͰɺ޷͖ͳσβΠϯͷUIϥΠϒϥϦΛඃ ͤΒΕΔͧʂʢReact Native Paperͱ͔NativeBaseͱ͔࢖͑Δʣ • WAI-ARIA࢓༷ͷAccessibilityରԠ͕΍Γ΍͍͢Α͏ʹ഑ྀ͢Δ $IBLSB6*ͱͷҧ͍ 65 20:35
    ### [React Native for WebͷϞνϕʔγϣϯ • React DOMͷੈքʹ΋શ෦ೖΓGUIπʔϧΩοτ͕ཉ͍͠ • ෳ਺ϓϥοτϑΥʔϜͷதͰୟ্͖͛ΒΕͨɺReact NativeͷதཱతͳAPIσβΠϯ](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_64.jpg)
24.  { View } from 'react-native'; import { useDropzone } from 'react-dropzone'; export type Props = { onFileSelected: (file: File) => void; }; export const UploadProductDlc: React.FC<Props> = ({ onFileSelected }) => { const onDrop = useCallback( (acceptedFiles) => { if (!acceptedFiles || acceptedFiles.length === 0) return; onFileSelected(acceptedFiles[0]); }, [onFileSelected] ); const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: [ 'application/pdf' ], }); return ( <View> <div {...getRootProps()} style={{ backgroundColor: isDragActive ? 'lightgray' : ‘gray' }} > <input {...getInputProps()} /> <p>ϑΝΠϧΛ௥Ճ͢Δ (࠷େ500MB·Ͱʣ</p> </div> </View> ); }; React Nativeͷख๏Ͱղܾ͢Δͷ ͕໘౗ʹͳͬͨΒɺϒϥ΢βͷख ๏ʹಀ͛ͯ΋͍͍ ීஈͱҧͬͯϒϦοδ͕͍Βͳ͍ ࣮ՈͷΑ͏ͳ҆৺ײ ϒϥ΢β޲͚ϥΠϒϥϦ 7JFX ͷதʹ EJW Λஔ͍ͯ΋͍͍ UploadProductDlc.web.tsx 68 21:32
    ### [୤ग़ϋονͷ ࡞Γ΍͢͞ import React, { useCallback } from 'react'; import](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_67.jpg)
25.  ϦϦʔε͢Δʁ΋ͬͱ؆୯ͳํ๏͸ͳ͍ͷ͔…” 73 23:07 https://twilog.org/Nkzn/date-180306
    ### [2018.3.6 @Necolas “React Native͕ɺWeb։ൃऀʹͱͬͯ࠷΋೉͠ ͍GUIͷ໰୊ͷଟ͘Λ͢Ͱʹղܾ͍ͯ͠Δ͜ͱ ΛɺͲ͏΍ͬͯWeb։ൃऀʹೲಘͤ͞Δͷ͔ʁ աڈʹ໭ͬͯɺReact DOMͷલʹReact NativeΛ](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_72.jpg)
26.  React NativeͷAPI͔Βେ͖͘ҳ୤͢Δ͜ͱ͸Ͱ͖ͳ͍தͰ͸ରԠʹ ݶ౓͕͋ͬͨʢ@types/react-nativeͰܕ෇͚ͯ͠Δ͠Ͷʣ 86 27:14
    ### [React Nativeͷ࿮૊ΈͰ͸Ͱ͖ͳ͔ͬͨ͜ͱ • iOS΍Androidͱ͍ͬͨλονσόΠεΛલఏʹ࡞ΒΕͨͨΊɺ ϙΠϯςΟϯάσόΠε΁ͷߟྀ͕͔ͳΓബ͍ • ೖྗͷϑΥʔΧεҠಈ΍ΩʔϘʔυγϣʔτΧοτɺ΢Οϯυ΢αΠ ζͷΧδϡΞϧͳมߋͳͲ΋ಉ༷ •](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_85.jpg)
27. 
    ### [طଘͷRNϑΝϛϦʔ΋ϙΠϯςΟϯάσόΠε ͱແؔ܎Ͱ͸ͳ͍ https://microsoft.github.io/react-native-windows/ https://www.gizmodo.jp/2020/03/ipados-13-4-release.html https://www.google.co.jp/intl/ja_jp/chromebook/ 88 27:52](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_87.jpg)
28.  ͍͔ͭReact Native for WebͱReact GUI ͕౷߹ͯ͠React WebʹͳΔΜͩΖ͏͔ 90 28:30
    ### [React Native for Web ެࣜΞΧ΢ϯτΛνΣοΫ https://twitter.com/ReactWeb 8/27ʹͰ͖ͯͨ @ReactNativeWebʹ͠ͳ͔ͬͨ͋ͨΓ ʹNicolasͷࣥ೦Λײ͡Δ](https://files.speakerdeck.com/presentations/460f388b673945a19c867d978fcc2597/slide_89.jpg)