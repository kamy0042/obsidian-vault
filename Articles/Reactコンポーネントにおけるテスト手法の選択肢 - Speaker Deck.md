---
URL: https://speakerdeck.com/sakito/reactkonponentoniokeru-tesutoshou-fa-falsexuan-ze-zhi
Created: 2022-08-17T23:12:00
Tags: [topic/技術/テスト]
---
# Reactコンポーネントにおける テスト手法の選択肢

[Reactでアプリケーションを構築する多様化](https://speakerdeck.com/sakito/reactdeapurikesiyonwogou-zhu-suruduo-yang-hua)

![[preview_slide_0 52.jpg]]

[Svelte + TypeScriptで chrome拡張を作る](https://speakerdeck.com/sakito/svelte-plus-typescriptde-chromekuo-zhang-wozuo-ru)

![[preview_slide_0 53.jpg]]

[Babel plugin を作ってAST と Babel を学ぶ](https://speakerdeck.com/sakito/babel-plugin-wozuo-tuteast-to-babel-woxue-bu)

![[preview_slide_0 54.jpg]]

![[preview_slide_0 55.jpg]]

[これからはじめるReact Hooks](https://speakerdeck.com/sakito/korekarahazimerureact-hooks)

![[preview_slide_0 56.jpg]]

![[preview_slide_0 57.jpg]]

[2022 COSCUP - GKE Backend Cluster 除雷分享](https://speakerdeck.com/brentchang/2022-coscup-gke-backend-cluster-chu-lei-fen-xiang)

![[preview_slide_0 58.jpg]]

[ECS on EC2 で Auto Scaling やってみる！](https://speakerdeck.com/sayjoy/ecs-on-ec2-te-auto-scaling-yatutemiru)

![[preview_slide_0 59.jpg]]

[A3-1 IBM Championが本音で語る「IBM Cloud」](https://speakerdeck.com/kolinz/a3-1-ibm-championgaben-yin-deyu-ru-ibm-cloud)

![[preview_slide_0 60.jpg]]

[psql, my favorite tool!](https://speakerdeck.com/nuko_yokohama/psql-my-favorite-tool)

![[preview_slide_0 61.jpg]]

[Power BI のうらがわ](https://speakerdeck.com/hanaseleb/power-bi-falseuragawa)

![[preview_slide_0 62.jpg]]

![[preview_slide_0 63.jpg]]

![[preview_slide_0 64.jpg]]

[COSCUP x KCD Taiwan 2020 - 那些年我們在開源社群的日子 - Cloud Native Taiwan](https://speakerdeck.com/pohsien/coscup-x-kcd-taiwan-2020-na-xie-nian-wo-men-zai-kai-yuan-she-qun-de-ri-zi-cloud-native-taiwan)

![[preview_slide_0 65.jpg]]

![[preview_slide_0 66.jpg]]

![[preview_slide_0 67.jpg]]

![[preview_slide_0 68.jpg]]

![[preview_slide_0 69.jpg]]

[StorybookのUI Testing Handbookを読んだ](https://speakerdeck.com/zakiyama/ui-testing-handbook-by-storybook)

![[preview_slide_0 70.jpg]]

[Ruby is Unlike a Banana](https://speakerdeck.com/tanoku/ruby-is-unlike-a-banana)

![[preview_slide_0 71.jpg]]

![[preview_slide_0 72.jpg]]

[Design and Strategy: How to Deal with People Who Don’t "Get" Design](https://speakerdeck.com/morganepeng/design-and-strategy-how-to-deal-with-people-who-dont-get-design)

![[preview_slide_0 73.jpg]]

[It's Worth the Effort](https://speakerdeck.com/3n/its-worth-the-effort)

![[preview_slide_0 74.jpg]]

[Fantastic passwords and where to find them - at NoRuKo](https://speakerdeck.com/philnash/fantastic-passwords-and-where-to-find-them-at-noruko)

![[preview_slide_0 75.jpg]]

## Transcript

1.  w FTMJOUQMVHJOUFTUJOHMJCSBSZ΋͋Γ·͢
    ### [3FBDU5FTUJOH-JCSBSZ֓ཁ w 3FBDUͷίϯϙʔωϯτςετΛॻ͘ϥΠϒϥϦ w +FTU΍7JUFTUͳͲͷςετϥϯφʔΛ࢖ͬͯKTEPN্Ͱಈ͘ w ςετϥϯφʔΛ࢖༻͠ͳͯ͘΋͍͍ w KTEPNΛ࢖͍ɺ/PEFKT্ͰΤϛϡϨʔτ͢ΔͷͰϒϥ΢β্Ͱ࠶ݱ͢Δ ΑΓ࣮ߦಈ࡞͕ૣ͍](https://files.speakerdeck.com/presentations/6da2b0110105445d809104bfdcfa7752/slide_4.jpg)
2.  &YQFSJNFOUBMͱͯ͠࢖༻Ͱ͖Δ w αʔόʔαΠυͱ߹ΘͤͨςετΛ͢Δ&&༻ͷ5FTUϑϨʔϜϫʔΫͰ͸ ͳ͘ɺ୯ʹϒϥ΢β্Ͱ࣮ߦͰ͖ΔϑϨʔϜϫʔΫͱͯ͠ͷ໾ׂ΋
    ### [$ZQSFTT 1MBZXSJHIU w ϒϥ΢β্Ͱಈ͔͢ςετπʔϧ w ίϯϙʔωϯτ୯ମͰͷςετ͕Ͱ͖ΔΑ͏ʹͳ͖͍ͬͯͯΔ w $ZQSFTT͸೥݄ʹϦϦʔε͞ΕͨWͰCFUBͱͯ͠࢖༻Ͱ͖Δ w 1MBZXSJHIU͸೥݄ʹϦϦʔε͞ΕͨWͰ](https://files.speakerdeck.com/presentations/6da2b0110105445d809104bfdcfa7752/slide_8.jpg)
3.  ϒϥ΢β$ZQSFTT 1MBZXSJHIU w KTEPN͸ϨΠΞ΢τॾʑʹؔ͢Δ"1*͕࢖͑ͳ͍ w جຊతͳίϯϙʔωϯτͷػೳςετ͸3FBDU5FTUJOH-JCSBSZ w ϨΠΞ΢τͳͲʹؔΘΔػೳ͸$ZQSFTT΍1MBZXSJHIUΛ࢖͏ w .PDL͕ͳ͘ͳΔ͜ͱͰςετͷ৴པ౓͕͋Γɺίʔυͷ؆ུʹͳΔ
    ### [KTEPN /PEFKT ͱϒϥ΢β্Ͱ࣮ߦ͢Δҧ͍ w ࣮ߦ؀ڥ͕ҧ͏ w KTEPN /PEFKT 3FBDU5FTUJOH-JCSBSZ w](https://files.speakerdeck.com/presentations/6da2b0110105445d809104bfdcfa7752/slide_10.jpg)
4.  !TUPSZCPPLUFTUJOHMJCSBSZͱҰॹʹ࢖༻͢Δ w 4UPSZ UFTUJOHMJCSBSZ
    ### [4UPSZCPPL!TUPSZCPPLUFTUJOHSFBDU w 4UPSZCPPL্ʹఆٛͨͭͭ͠ͷ4UPSZΛ࢖༻ͯ͠ɺ ίϯϙʔωϯτ͕Ͱ͖Δ w 4UPSZͰঢ়ଶͳͲ͸ݟ͑ΔΑ͏ʹ͍ͯ͠ΔͷͰɺ ͦΕʹରͯ͠ςετ͢Δ͜ͱ͕Ͱ͖Δ w](https://files.speakerdeck.com/presentations/6da2b0110105445d809104bfdcfa7752/slide_13.jpg)
5.  ͕͋Δ΋ͷ͸ɺ*OUFSBDUJPO5FTU͕௨Βͳ͚ Ε͹མͪΔ w *OUFSBDUJPO5FTU͕ͳ͍΋ͷ͸4UPSZ͕ϨϯμϦϯάͰ͖Δ͔ݕূ͞ΕΔ ͷͰɺ4NPLF5FTUʹͳΔ
    ### [4UPSZCPPL!TUPSZCPPLUFTUSVOOFS w 4UPSZCPPL্ͷίϯϙʔωϯτςετΛOQNTDUJQUͰಈ͔͢ w $*Ͱ΋ಈ͔͢͜ͱ͕Ͱ͖Δ w +FTUͱ1MBZXSJHIUͰಈ͘ w *OUFSBDUJPO5FTU 1MBZؔ਺](https://files.speakerdeck.com/presentations/6da2b0110105445d809104bfdcfa7752/slide_18.jpg)