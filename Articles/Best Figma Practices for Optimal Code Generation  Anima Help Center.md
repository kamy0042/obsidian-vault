---
タグ: []
作成日時: 2024-01-20T19:10:00
URL: https://support.animaapp.com/en/articles/6445795-best-figma-practices-for-optimal-code-generation
Tags: [topic/ツール/Figma]
---
Following these best practices will generate squeaky clean, high quality code that your developers will fall in love with!

# **Skip to a section**

- [Name it and keep it clean](https://support.animaapp.com/en/articles/6445795-best-figma-practices-for-optimal-code-generation#h_7c00236fd2)
- [Frame it](https://support.animaapp.com/en/articles/6445795-best-figma-practices-for-optimal-code-generation#h_184afc7244)
- [Make it responsive](https://support.animaapp.com/en/articles/6445795-best-figma-practices-for-optimal-code-generation#h_03ccec327b)
- [Use Components (but listen to your Devs!)](https://support.animaapp.com/en/articles/6445795-best-figma-practices-for-optimal-code-generation#h_d6745f7022)
- [Know when to mark layers for export](https://support.animaapp.com/en/articles/6445795-best-figma-practices-for-optimal-code-generation#h_03ccec327b)

# **1. Name it and keep it clean:**

One of the most important habits to implement as a designer is to name and clean up all of your design assets. Naming each and every one of your layers will make your project more organized and easy to navigate, especially if you’re handing it off to another designer or a developer!

Don't forget, these are the same names that will appear in the exported code so be sure to** ask your developers about their preferred naming conventions!**

**Do not** leave your layer panel looking like this:

![[Screenshot2022-08-11at15.36.09.png]]

**Instead, **make it look something like this. Descriptive and easy to read:

![[Screenshot2022-08-09at17.07.48.png]]

Additionally, make sure to delete any layers, styles, frames and elements that are unused or hidden. And double check that all your text layers are set to “Auto-width” or “Auto-Height” instead of “Fixed”.

These might seem like tedious tasks, but they will ensure that the exported code is clean and free of unnecessary clutter!

![[s_818AD2529DD049756F9D269B0C031373D94D85084002387D63E856AD41B4EA8D_1654767046129_Keeping2Bit2BClean2BGif.gif]]

# **2. Frame it:**

If you have multiple related layers, it's always better to combine them into more organized, manageable layers, such as frames.

**Use frames:**

- If there is any relationship between layers
- To define the resizing behavior of child elements
- To control the frame size independently of its contents
- To apply styles

💡 Tip: Frames are suitable for Layout Grids, Auto Layouts, Constraints, Components and Styles.

---

Multiple objects (made of vector elements or images) that together make up a single symbol can be combined as groups as well, but we recommend using frames instead. Generally speaking, frames can do everything groups can do and contain logic that groups can’t.❗️**Too many groups, especially***** nested groups***** (*****groups within groups),***** can complicate your design and code.**

# **3. Use Components (but listen to your Devs!):**

If you're interested in efficient designing and optimal code generation, components are your friend! Components are time-saving assets that you can reuse multiple times throughout your design. However, even in cases when you're not reusing certain assets, it may still be better to convert them into components anyway, so just **ask your developers which elements they would like to see as components and make it happen 💪🏻**!

**How to create a component?**

1. **Select the elements you want to include within your component.**
2. **Right-click the desired layers and select “Create component”.**
3. **Rename it** (remember to name everything in your project!).
4. **Locate it within the “Assets" tab and drag it in to use an instance.**

![[ComponentVideo.gif]]

# **4. Make it responsive:**

Be sure to use the right responsive definitions that match your needs. Our number one recommendation is to use **auto layout**! This can be translated into nice and clean flex properties in the code. Adding **auto layout** to your design allows you to create dynamic frames that will automatically resize to maintain the layout structure you’ve established, according to the added content. We recommend using **auto layout** whenever relevant, especially between breakpoints. There’s no need to revert to constraints because auto layout covers constraints and adds a lot more functionality as well.

If you need to swap UI elements between screen sizes, you can also use Anima’s breakpoints feature.

💡 Tip: Check out [this article](https://support.animaapp.com/en/articles/6431384-responsive-design-in-figma#h_8dd7043674) to learn more about responsiveness with Figma and Anima, as well as some practice tutorials for using auto layout in Figma!

---

# **5. Know when to mark layers for export**

When syncing to Anima, make sure to enable **“mark for export”** for any element that you wish to convert into an Image. This applies to any images you have as well as to any design effects you're using that are not currently supported in CSS but you still wish to export as is ([see guidelines here](https://support.animaapp.com/en/articles/6228806-how-anima-translates-figma-design-settings-into-code)).

And if you want to receive the live code for all the assets, make sure it is **not** marked for export!

See the full article [here](https://support.animaapp.com/en/articles/5543068-when-should-i-mark-layers-for-export).

![[new.png]]

That’s it! You are now ready to take your designs to the next level while significantly improving the quality of your exported code!

## Get involved in our [Anima Community Forum](https://forum.animaapp.com/)!

## **New to Anima?**

- [Create an account for free!](https://projects.animaapp.com/signup)
- Learn more about using Anima with [Figma](https://www.animaapp.com/figma), [XD](https://www.animaapp.com/xd) and [Sketch](https://www.animaapp.com/sketch)
- [How to Download the Anima Plugin](https://support.animaapp.com/en/articles/2350134-how-to-download-the-anima-plugin-for-sketch-adobe-xd-or-figma)

## **Learn More**