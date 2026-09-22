---
タグ: []
作成日時: 2025-02-17T01:28:00
URL: https://www.whocanuse.com/
Tags: [topic/アクセシビリティ]
---
The quick brown fox jumps over the lazy dog

#

H

S

L

Text

px

Bold

#

H

S

L

Contrast Ratio

8.41:1

WCAG Grading

AAA

| AAA | Regular Vision (Trichromatic)<br>Can distinguish all three primary color, little to no blurriness | What I see<br>68%<br>affected |
| --- | --- | --- |
| AAA | Protanomaly<br>Reduced sensitivity to red - trouble distinguishing reds and greens | What I see<br>1.3%<br>affected |
| AAA | Protanopia<br>Red blind - Can’t see reds at all | What I see<br>1.5%<br>affected |
| AAA | Deuteranomaly<br>Reduced sensitivity to green - Trouble distinguishing reds and greens | What I see<br>5.3%<br>affected |
| AAA | Deuteranopia<br>Green blind - Can’t see greens at all | What I see<br>1.2%<br>affected |
| AAA | Tritanomaly<br>Trouble distinguishing blues and greens, and yellows and reds | What I see<br>0.02%<br>affected |
| AAA | Tritanopia<br>Unable to distinguish between blues and greens, purples and reds, and yellows and pinks | What I see<br>0.03%<br>affected |
| AAA | Achromatomaly<br>Partial color blindness, sees the absence of most colors | What I see<br>0.09%<br>affected |
| AAA | Achromatopsia<br>Complete color blindness, can only see shades | What I see<br>0.05%<br>affected |
| AA | Cataracts<br>Clouding of the lens in the eye that affects vision | What I see<br>33%<br>affected |
| AAA | Glaucoma<br>Slight vision loss | What I see<br>2%<br>affected |
| AA | Low Vision<br>Decreased and/or blurry vision (not fixable by usual means such as glasses) | What I see<br>31%<br>affected |

Situational Events

| AA | Direct Sunlight<br>Simulating the effect of direct sunlight on a phone or screen | What I see |
| --- | --- | --- |
| AAA | Night Shift Mode<br>Simulating the effect of night mode on a phone or screen | What I see |

# What is whocanuse.com?

It's a tool that brings attention and understanding to how color contrast can affect different people with visual impairments.

The [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/) covers a wide range of recommendations for making Web content more accessible. Just a tiny part of making the web more accessible is accommodating for those with a form of blindness or low vision.

The standard grading system is a great start, but I thought I'd try to humanize the people who are affected by the different grades.

## Where did you get the info from?

The percentages are sourced from both [colour-blindness.com](https://www.colour-blindness.com/) and [Vision Australia](https://www.visionaustralia.org/). P.S. You're both the best, thankyou ✌️

## Your maths is off, it doesn't add up to 100%...?

Good eyes! (haha) The population data provided are estimates for individual impairments, and don't cover the vast amount of visual impairments in the world. This is to give you not just an understanding of **how** color contrast affects different people but also **who** it can affect.

## I'm fascinated by how this works, can you tell me more?

Of course! There's a few stages to get to this point. First we figure out the contrast between two HEX values. For this we're using a plugin called [Chroma.js](https://vis4.net/chromajs/) - this does the heavy lifting for us. Once we have the ratio (and using font size and font weight) we can apply a grade to that specific color combo.

For the color blindness options we're using another plugin aptly called [Color-blind](https://github.com/skratchdot/color-blind) that converts our HEX codes in to ones that would be seen by people with the different impairments, then we can apply our same process to obtain the color ratios and determine their grade.

For cataracts, glaucoma, low vision, and the situational events I've personally created simulations to help identify their rating.

## What does a failing grade mean?

The grading uses a combination of color contrast, text size and text weight. A fail simply means that the color combination offers some visual strain to the person seeing it and should be avoided if possible.

## Can I help contribute?

Absolutely! Feel free to fork the repo and submit a PR with any helpful additions or changes.