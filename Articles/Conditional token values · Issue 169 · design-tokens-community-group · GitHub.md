---
タグ: []
作成日時: 2023-11-28T01:24:00
URL: https://github.com/design-tokens/community-group/issues/169
Tags: [topic/デザイントークン]
---
![[169.bin]]

see : [#2](https://github.com/design-tokens/community-group/issues/2)

That issue was focussed on "theming" and already contains some great thoughts on that but I don't think that themes are the right abstraction. I also do not want to derail that thread.

The basic premise is fairly simple and shared with the concept of themes :

**Change token values when X changes, where X is something external to the tokens file**

Examples of factors that could affect token values :

- screen size
- ability to display certain colors on a screen (srgb, display-p3)
- user preferences for color schemes (dark, light)
- applying different branding (brand X, brand Y)
- platform type (Android, iOS, Web)
- media type (screen, print)
- support for features

The most mature system/API that exists for this is most likely Conditional At Rules in CSS (`@supports` and `@media` specifically)

In CSS Conditional At Rules "wrap" around style declarations.

```plain text
.foo {
  color: cyan;
}


@media (min-width: 300px) {
  .foo {
    color: purple;
  }
}

@media screen and (prefers-color-scheme: dark) {
  .foo {
    color: yellow;
  }
}
```

For Design Tokens I think the inverse makes the most sense.

A token describes a base value and a list of conditional values.

```plain text
{
  "$value": "cyan",
  "$conditionalValues": [
    {
      "conditions": [{
        "name": "screen-min-width",
        "value": "300px"
      }],
      "value": "purple"
    },
    {
      "conditions": [
        {
          "name": "media-type",
          "value": "screen"
        },
        {
          "name": "color-scheme",
          "value": "dark"
        }
      ],
      "value": "yellow"
    }
  ]
}
```

The exact data shape for `"conditions"` is likely non-ideal for all possible cases.

But I think it illustrates the point.

Condition names would need to be a specced list.

Condition values per name would also need to be specced.

Design tools would provide UI to assign conditional values on tokens and would also use them.

- Artboards might match certain conditions based on config (artboard size, color scheme, ...)
- Certain actions might trigger certain conditions (printing a document)
- ....

Translation tools could generate the code for the conditionals so that developers can use a single token name while still having a dynamic outcome.

Specialised tools could provide validation.

You might want to "lint" a tokens file and check that all colors have a dark and light variant.

---

![[64982999-307bf680-d8c8-11e9-933d-9c62a6bdcda1.png]]

Really interesting ideas here!

I'm going to throw another idea into the mix: The ability to define "interfaces" (similar to object-oriented programming) for tokens.

My thinking is that some of the use-cases being discussed here could be addressed by having an interface that defines the "slots" (feel free to suggest a better name!) - i.e. things values are required for and what type those values should have.

You could then define a sort of abstract color scheme, or UI widget or complete UI theme as interfaces. Then there could be one or more implementations that fill them with values (e.g. "light" and "dark" color schemes, "pill button" and "primary button" UI widgets, "brand A", "brand B" and "brand C" UI themes, etc. etc.)

Here's some pseudo code to illustrate my idea. This example implies a few ideas being discussed over in issue [#1](https://github.com/design-tokens/community-group/issues/1):

- tokens can be grouped arbitrarily (similar to how [StyleDictionary](https://amzn.github.io/style-dictionary/) lets you do)
- each token has an explicit type (color, length,...), specified by its `type` property
- tokens can reference the value of another token (aka "aliasing"). 
    - For this example, I've recycled how I propose doing this in [UDT](https://github.com/universal-design-tokens/udt/tree/master/packages/spec): Tokens can optionally have an `id` property whose value is a string that should be unique amongst all the IDs defined in the same file. Other tokens can then reference that token's value by setting their value to `@[other toke's ID]`.

```plain text
{
  // Let's begin by defining a few "plain" design tokens.
  // This part is essentially the basic file format we're tying
  // to define over in #1:
  "tokens": {
    "brand-colors": {
      "radioactive-red": {
        "id": "color-rr",
        "value": "#ff0000",
        "type": "color"
      },
      "gross-green": {
        "id": "color-gg",
        "value": "#00ff00",
        "type": "color"
      },
      "brilliant-blue": {
        "id": "color-bb",
        "value": "#0000ff",
        "type": "color"
      },
      "demo-dupe": {
        "id": "color-dd",
        // References the value of the token
        // with ID "color-gg"
        "value": "@color-gg"
      }
    },
    "sizes": {
      "small": {
        "id": "size-xs",
        "value": "0.1rem",
        "type": "length"
      },
      "medium": {
        "id": "size-s",
        "value": "0.2rem",
        "type": "length"
      },
      "large": {
        "id": "size-m",
        "value": "0.4rem",
        "type": "length"
      }
    }


    // An interface could just be a special type of design token
    // whose value defines the names, types and optional
    // default values that make up that interface.
    "my-color-scheme": {
      "id": "mcs",
      "type": "interface",
      "value": {
        "foreground": {
          "type": "color"
        },
        "background": {
          "type": "color"
        },
        "accent": {
          "type": "color",
          "id": "page-cols-ln"
        },
        "accent-2": {
          "type": "color",
          // References a default value
          // from within this interface
          // using a special interface-relative
          // syntax
          "value": "@mcs/accent-2"
        },
        "danger": {
          "type": "color",
          // Reference an explicit token value
          "value": "@color-rr"
        }
      }
    },

    // Other "plain" design tokens (and also interfaces)
    // can now reference yet-to-be-defined values from within
    // an interface. This uses the same interface-relative
    // syntax shown above.
    "link-color": {
        "value": "@mcs/accent"
    },

    "button": {
        "fill": {
            "value": "@mcs/accent-2"
        },
        "label": {
            "value": "@mcs/foreground"
        }
    }



    // Interfaces can be implemented by other design tokens
    // by setting their type to the interface's ID reference.
    "page-color-theme-a": {
      "type": "@mcs",

      "value": {
        "foreground": {
          "value": "@color-bb"
        },
        "background": {
          "value": "#ffffff"
        },
        "accent": {
          "value": "@color-gg"
        }
        // accent-2 and danger
        // will resolve to the default
        // values specified in the interface
      }
    },

    "page-color-theme-b": {
      "type": "@mcs",

      "value": {
        "foreground": {
          "value": "@color-gg"
        },
        "background": {
          "value": "#000000"
        },
        "accent": {
          "value": "@color-bb"
        },
        "accent-2": {
          // Override default value from interface
          "value": "@color-rr"
        },
        "danger": {
          // Override default value from interface
          "value": "#cc0000"
        }
      }
    }
  }
}
```

### "Plain" design tokens

There's no surprises in the first part, a tool like Theo or StyleDictionary could render out those "plain" design tokens to SASS, JS, XML or whatever. For example:

```plain text
// SCSS output
$brand-colors-radioactive-red: #ff0000;
$brand-colors-gross-green: #00ff00;
$brand-colors-brilliant-blue: #0000ff;
$brand-colors-demo-dupe: #00ff00;
$sizes-small: 0.1rem;
// ...
```

Similarly, a visual design tool like Sketch might make all those color tokens available in its color picker, or show a dropdown of the available length tokens when setting things like font-sizes, dimensions, border radii, etc.

### Interfaces

On to the new, exotic "interface" tokens. For many tools, these might be inert and not get exported or exposed in any way. However, I think a case could be made for something like Theo or StyleDictionary to export them as a TypeScript `interface` or something like that.

```plain text
import { Color } from '@dtcg/types';

export interface PageColors {
  foreground: Color;
  background: Color;
  link: Color;
  linkVisited: Color;
  danger: Color;
}
```

Likewise you could imagine a GUI tool that displays a kind of form to the user with all of the slots an appropriate inputs for each (color pickers, font pickers, etc.) and/or dropdowns of compatible design tokens (based on their type) that can be assigned to each slot. Such a tool could then save the assignments back out to a design token file as a new implementation (see below).

### References to interface values

Any tokens the reference an interface value are essentially inert until an implementation of that interface is chosen. So, a tool like StyleDictionary might simply ignore such tokens, when no implementation is chosen or available.

I suppose tools might use their own conventions to either auto-select one of the available implementations, or pre-fill some default values if none is available. Of course, if a tool can find a sensible use or representation of such "abstract" design tokens, then it is free to do so.

### Implementing an interface

As shown in my example, an interface implementation is simply a special type of design token. My example contains 2 implementations for the `color-scheme` interface: `page-color-theme-a` and `page-color-theme-b`. So, let's imagine that a hypothetical future version of Theo has some kind of option for choosing an implementation and the user has chosen `page-color-theme-a`. *Then* it can output code for the abstract design tokens as follows (using SASS as an example):

```plain text
$link-color: #00ff00;
$button-fill: #00ff00;
$button-label: #0000ff;
```

In this example, the value of `$button-fill` was resolved as follows:

- Token `button.fill` references interface slot: `@mcs/accent-2`.
- Selected `@mcs` implementation, `page-color-theme-a`, does not define an explicit value for this slot, so we fall back to the interface's default... 
    - `@mcs` interface's default value for slot `@mcs/accent-2` references interface slot `@mcs/accent`.
- Selected `@mcs` implementation, `page-color-theme-a`, defines the value of slot `@mcs/accent` as a reference to design token `@color-gg`.
- Token with ID `@color-gg` has the value `#00ff00`.

### Strong typing

The reason I think a strong notion of design token types is important in all of this, is that it allows tools to do some useful things for the users:

- **Error checking** 
    - If an interface slot, or just another design token, references another token that has a different type, then it can report a useful error to the user. Imagine, in my example, we tried to assign one of the sizes to a slot in the color scheme interface. Without typing there'd be no way for a tool to recognise that as "wrong", but with typing it could tell the user something useful like: "Tokens assigned to interface slot `@mcs/accent` must be of type color. however, chosen value `@size-s` references a token of type length."
- **Smarter UI** 
    - A tool that requires users to select a value from the available tokens can narrow that list down to only the tokens of the required type. For instance, a color picker in a design tool could just find all tokens of type color and provide those as options to the user.
    - Interfaces could take this a step further. You might want to force an abstraction layer between the properties of a UI element and the "plain" design tokens. In this case, a design tool could only provide available interface slots of the correct type to the user when the style up a component. For example, a designer choosing the border color of a card might only be given the `@mcs/foreground`, `@mcs/background`, `@mcs/accent` etc. slots as options to choose from. In conjunction with one or more implementations this would then ensure that every UI component becomes easily themeable.

### Multiple design token files

While my example above is one, big design token file, I would expect there to be some ability to divide things up across multiple files. The rules and syntax for that will be something we'll need to define as part of the basic design token file format (see [#1](https://github.com/design-tokens/community-group/issues/1)).

Aside from letting teams split their code into smaller, more manageable chunks, this could provide an interesting opportunity: If we allow URL-based imports, so you can reference remote design token files, then teams could expose interfaces for others to implement in their design systems.

Imagine a 3rd party UI widget being able to expose a sort of public design token API for all its themeable properties via an interface. Design systems that want to use that widget could them import that interface and implement it within their design token files using their own design token values.

If I've understood the intent of [System UI's theme specification](https://github.com/system-ui/theme-specification) correctly, that could potentially be converted into a design token interface as well. (And if I got that totally wrong, please do enlighten me!)

### Relationship to System States

I'm undecided whether this is an alternative to [@applinist](https://github.com/applinist)'s system states, or if they are complementary. My hunch is that they are complementary, but I'm unsure how exactly they might be combined. If I've understood system states correctly, there's an implication that all possible variants described by a set of states must be of the same design token *type* (e.g. a color, a length, a font name, etc.). So perhaps states could therefore be incorporated as a way of defining the permitted value variants that tokens of a particular type may have.

---

![[65966426-fc700c00-e457-11e9-9123-639e551def24.png]]

![[65966969-c0897680-e458-11e9-8418-ae7eea3bbf22.png]]

![[65969749-38f23680-e45d-11e9-97b3-804275099022.png]]

(If my previous comment was confusing, hopefully this clears things up a bit!)

![[65982706-d8222880-e473-11e9-8089-ea4f1ccde5d7.gif]]