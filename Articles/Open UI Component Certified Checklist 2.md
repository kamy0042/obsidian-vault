---
タグ: []
作成日時: 2024-09-19T21:51:00
URL: https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#heading=h.jjvcvbvmo8v1
Tags: [topic/デザインシステム/リファレンス]
---
![[AHkbwyIoalXabbDJb0OfBJYzSVGsVioqoj4l3yxmKmIQ4zP8RZe8Pd_4qP7AKxJtMwIiPjimZW4NdJ5As5YupMU49U4quXt4ajIVuEwV_KmaWFc5olrI8BSRw1200-h630-p.bin]]

[[a]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt1)

DOCUMENT STATUS: DRAFT/SKETCH PHASE

[PLEASE USE SUGGESTION MODE]

# Overview

The below checklist is meant to be reviewed by the component author first and then validated by at least two Open UI community group members[[b]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt2). This checklist helps ensure that the component that is submitted adheres to Open UI’s principles of providing users with the best experience.

1. Accessibility
2. Privacy and Security
3. Internationalization
4. Performance
5. Style and Structure
6. Miscellaneous
7. W3C Intellectual Property
8. Blueprint

Notes about this checklist: The below tables are for general purpose testing, this section will not be duplicating the [Accessible Name Computation Spec](https://www.google.com/url?q=https%3A%2F%2Fwww.google.com%2Furl%3Fq%3Dhttps%3A%2F%2Fw3c.github.io%2Faccname%2F%26amp%3Bsa%3DD%26amp%3Bsource%3Deditors%26amp%3Bust%3D1726753881647788%26amp%3Busg%3DAOvVaw1XZ_2SbOGaTu1TBw6t277Z&sa=D&ust=1726753881725309&usg=AOvVaw1DBx5tyfsXn3b4xZUkct38), [Web Content Accessibility Guidelines](https://www.google.com/url?q=https%3A%2F%2Fwww.google.com%2Furl%3Fq%3Dhttps%3A%2F%2Fwww.w3.org%2FWAI%2Fstandards-guidelines%2Fwcag%2F%26amp%3Bsa%3DD%26amp%3Bsource%3Deditors%26amp%3Bust%3D1726753881648145%26amp%3Busg%3DAOvVaw0FcC5nKewb9GZ3EvWXfUDn&sa=D&ust=1726753881725487&usg=AOvVaw0_AJzk7Fjbq9TDkkrVra1g) (WCAG), [Privacy Interest Group](https://www.google.com/url?q=https%3A%2F%2Fwww.google.com%2Furl%3Fq%3Dhttps%3A%2F%2Fwww.w3.org%2FPrivacy%2FIG%2F%26amp%3Bsa%3DD%26amp%3Bsource%3Deditors%26amp%3Bust%3D1726753881648366%26amp%3Busg%3DAOvVaw1ebf1_72ycKgEaCUeiNQ7X&sa=D&ust=1726753881725574&usg=AOvVaw1xv0MKZTh_AYQbtJH0t4Nv) (PING), [Internationalization](https://www.google.com/url?q=https%3A%2F%2Fwww.google.com%2Furl%3Fq%3Dhttps%3A%2F%2Fwww.w3.org%2FInternational%2Fi18n-drafts%2Fnav%2Flearn%26amp%3Bsa%3DD%26amp%3Bsource%3Deditors%26amp%3Bust%3D1726753881648578%26amp%3Busg%3DAOvVaw1MSxMsF_pSAjRuFMmIx5uA&sa=D&ust=1726753881725624&usg=AOvVaw0KBcb25WB8AwXi1Tb6NA4-), [Web Performance Working Group](https://www.google.com/url?q=https%3A%2F%2Fwww.google.com%2Furl%3Fq%3Dhttps%3A%2F%2Fwww.w3.org%2Fwebperf%2F%26amp%3Bsa%3DD%26amp%3Bsource%3Deditors%26amp%3Bust%3D1726753881648803%26amp%3Busg%3DAOvVaw3L_H4sD3h9hK5y9WTX5Sq_&sa=D&ust=1726753881725709&usg=AOvVaw3nOO8qcado1OdRKXQsLdQO) or other documents/specifications provided by the standards community. As testing begins on a component more specific test cases should be produced by the reviewer(s) and then leveraged for additional components of the same variety moving forward[[c]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt3)[[d]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt4)[[e]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt5).

## Accessibility

Web UI needs to be accessible to all users across a variety of form-factors, with or without assistive technology to ensure a great user experience for everyone.[[f]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt6)[[g]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt7)[[h]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt8)

| # | Name | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| 1 | Keyboard | All focusable elements are accessible and invokable via keyboard[[i]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt9)[[j]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt10)[[k]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt11) |   | TBD |
| 2 | Assistive Technology | Accessible name and description[[l]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt12)s are correct as traversal occurs[[m]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt13) |   | TBD |
| 3 | Assistive Technology | If there are status updates surfaced to the end-user are these likewise surfaced via an AT using aria-live |   | TBD |
| 4 | Cognitive | No animations[[n]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt14)[[o]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt15) are provided in the default base styles. |   | TBD |
| 5 | Zoom | Does the component render in an acceptable manner |   | TBD |

Example of more [granular test case](https://www.google.com/url?q=https%3A%2F%2Fwww.google.com%2Furl%3Fq%3Dhttps%3A%2F%2Fthepaciellogroup.github.io%2FAT-browser-tests%2Ftest-files%2Farticle.html%26amp%3Bsa%3DD%26amp%3Bsource%3Deditors%26amp%3Bust%3D1726753881657829%26amp%3Busg%3DAOvVaw0ZBEEyMIECTzoSK2xRBDoF&sa=D&ust=1726753881728039&usg=AOvVaw0xngDtfj8eVAviEKf5VSAs) for <article> on html5accessibility.com

## Privacy and Security

There are always feature enhancements that can be introduced into a component that can provide a better user-experience. However, Open UI in most scenarios will not have sufficient context in order to provide these enhancements. Additionally, no information should be reported back to any third-party origin. (eg: A drop down component that fetches data 100 at a time and upon getting half-way through the scrollable container the next 100 options are retrieved)

| # | Name | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| 1 | Network activity | No utilization of un-necessary fetch, service workers or other network APIs? |   | TBD |
| 2 | Storage of data | No utilization of un-necessary storage of information that can be accessed by third-parties? |   | TBD |
| 3 | Eval | No utilization of unsafe-inline or unsafe-eval which increases potential for XSS |   | TBD |
| 4 | Global re-writes | Does not augment or proxy APIs on the window object. |   | TBD |

## Performance

| # | Name | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| 1 | Sanitization | If the component takes user input no sanitization is done as that will vary by consumer of the component |   | TBD |
| 2 | Asset budget[[p]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt16)[[q]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt17)[[r]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt18) | We want to limit the size assets provided to the end user. Each component should be under 100kb un-minified |   | TBD |
| 3 | Core web vitals | 20 of the component on a single page with 10 runs and median of on mobile:<br><br>LCP: < 150ms<br>INP: < 200ms<br>…TBD… |   | TBD |
| 4 | Declarative shadow DOM | Leverage declarative shadow DOM to ensure that SSR of the component is possible |   | TBD |
| 5 | setTimeout | setTimeout is only used where absolutely necessary |   | TBD |

## Internationalization[[s]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt19)[[t]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt20)

| # | Name | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| 1 | Logical properties | Within CSS there shouldn’t be any utilization of physical properties |   | TBD |
|   | No lang attribute | While this is typically not applied at the component level, we should ensure it doesn’t sneak its way in somehow[[u]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt21) |   | TBD |

Note about localization: We will not focus on localization early on but as adoption grows we can add in additional translations of default text.

## Style and Structure

| # | Name | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| 1 | z-index | No utilization of z-index is used |   | TBD |
| 2 | Structural styles only[[v]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt22) | There should only be styles needed for layout and behavior support |   | TBD |
| 3 | Extensible Styles | Leverage parts and custom properties to enable theming |   | TBD |
| 4 | No images | There should be no images or SVGs in the component. [[w]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt23)[[x]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt24)[[y]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt25)[[z]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt26)Unicode emojis are acceptable for the base layer. |   | TBD |
|   | Extensible structure | Leverage named slots to enable replacement of entire parts |   | TBD |
|   | Events & Behaviors | When attaching events and behaviors to an element use low specificity selectors to ensure they can be attached even if the parts are replaced. |   | TBD |
|   | Responsive web design | It should focus on the container and not the form factor for a good user experience |   | TBD |
|   | Pointer | If the component has interactions make sure that it is touch friendly and has settings for coarse ([MDN](https://www.google.com/url?q=https%3A%2F%2Fwww.google.com%2Furl%3Fq%3Dhttps%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2F%40media%2Fpointer%26amp%3Bsa%3DD%26amp%3Bsource%3Deditors%26amp%3Bust%3D1726753881686563%26amp%3Busg%3DAOvVaw3X1JqFy0Kwbm57O_zeC0Uw&sa=D&ust=1726753881735448&usg=AOvVaw1Eg3d4l5WoUfA-1do33iiX)). |   | TBD |
|   | Touch friendly | If it has interaction, it must have a minimum of 44x44 pixels ([WCAG](https://www.google.com/url?q=https%3A%2F%2Fwww.google.com%2Furl%3Fq%3Dhttps%3A%2F%2Fwww.w3.org%2FWAI%2FWCAG22%2Fquickref%2F%3Fversions%253D2.1%2523target-size-enhanced%26amp%3Bsa%3DD%26amp%3Bsource%3Deditors%26amp%3Bust%3D1726753881688446%26amp%3Busg%3DAOvVaw0LePb7Obj8yUF8vR9MFdal&sa=D&ust=1726753881735889&usg=AOvVaw27ajUWnH9IwDLXriN4BwAx)) |   | TBD |
|   | No variations | Do not have variations through attributes, classes or other mechanisms. This should be handled at the defined at the component library level. |   | TBD |

## Blueprint

While the component may pass all of the above it is important that a blueprint is produced that outlines all the structure, events, and specifics around the behaviors and the implications on attribute modifications due to the behavior changes. These should include:

- Keyboard interactions for accessibility and user-experience behavior
- Anatomy including parts and slot names
- Custom properties for adjustments
- ARIA attributes and reasoning
- Events that bubble
- Hooks if provided
- Form involvement

## W3C Intellectual Property

The user that submits the PR to Open UI is a part of the W3C Open UI community group which will require them to agree to IPR policy set forward by the W3C. This is action is already integrated within the Open UI Github organization and so it will be initiated on any PR to validate the Github user adheres to this policy.

## Expert Reviewers

This general test checkbox was produced and reviewed by the following experts:

- Accessibility:
- Performance:
- Style & Structure:
- Internationalization:
- Privacy and Security:
- Web Developer:
- Design Systems:

# Open Questions

9. How is testing done?
10. We’re going to need to dictate how to test each component and example artifacts that need to be shared. EG: Performance should have all 10 runs of testpage.html against <foo> browser with <device>, CPU speed, etc.
11. What AT systems should we require (VoiceOver, Narrator, NVDA, etc)
12. Should we make it so that the shadow roots are open or closed by default?
[[aa]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt27)
[[ab]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt28)

Additional Resources

- USWDS: https://designsystem.digital.gov/components/button/accessibility-tests/
[[ac]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt29)

[[a]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref1)Question/comment that doesn't quite fit?

https://gist.github.com/bkardell/3c5160fdd83088ff1a34c232055b9997

[[b]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref2)So you're saying 'two approve and none oppose' or something? I'm not sure what it means?

[[c]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref3)How should these be tracked? It would be good to have them in Github in some form and a part of the PR actions in some manner.

[[d]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref4)Also, as we've discussed in the past - a test suite will be one of the most valuable aspects we can provide so even in document form this will be valuable to the web community even if their parts might vary a bit.

[[e]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref5)Imo attempting to define this upfront in the abstract is probably naive - what I think we need is rather a way to define how we get that - I'm going to add a separate comment

[[f]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref6)Should we just replace this table with the conformance list but in table format? https://www.w3.org/WAI/WCAG21/Understanding/conformance

[[g]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref7)If we define which level of conformance we're aiming for, the criteria are given. That could be easier than (re-)defining own criteria.

[[h]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref8)not all criteria apply to each thing being built. too many unnecessary checks tends to make people glaze over ones they shouldn't.

[[i]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref9)trying to add some nuance here. but the point being that not "everything" needs to be directly keyboard accessible. for instance, the clear button of a search/text field. or the up/down arrows of a number input. those aren't directly accessible via keyboard, nor should they be, since someone can use other keyboard keys to delete the text of a field, or up/down arrows to increment/decrement a value without having to get to those buttons directly.

1 total reaction

Brian Kardell reacted with ➕ at 2024-08-15 05:55 AM

[[j]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref10)What do you think about the question immediately above as to whether the table is the right thing to do?

[[k]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref11)i think it makes sense to call out that anything built should pass applicable wcag SCs, but i don't see the value in copying over wcag into this doc (especially since wcag doesn't even get into ux best practices which this could cover). better to provide high level buckets of things to check, and then link to more details. Same rational for all sections, this doc should aim to cover the most applicable concepts for each section, but other docs / instructions exist for all the various details that people need to know.

[[l]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref12)this should probably also include roles, properties and states; as its own row or grouped together with names and descriptions

[[m]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref13)what do we mean by traversal occurring?

[[n]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref14)Sometimes animations can *help*, not *hurt*, I believe. E.g. subtle appear/disappear animations help link an action to the result.

[[o]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref15)maybe this rule could instead be about no repeating or flashing animations? agree with mason that the complete absence of animation is not generally what people are after

[[p]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref16)Unsure if we should do this at the component level, it makes sense for the library to have a budget especially minified. Also, in the library scenario we should be extrapolating common paradigms that are shared utilities and thus will reduce code size.

[[q]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref17)Gzipped size could also be an additional criteria. As a user of the library I would like to know the size of the library I'm using but also the size of individual components if I'm just using one of them and not the whole library.

[[r]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref18)There could (possibly) be a simple extra performance check that it's _only_ some very reasonably sized CSS and JS by default?

[[s]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref19)Is there any criteria about supporting RTL which is needed here?

[[t]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref20)That's the purpose of logical property testing. But I would love an internationalization expert to provide high-level guidance.

[[u]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref21)does this mean like no hard coded lang - but would still allow for an author to specify a lang if necessary?

[[v]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref22)Sometimes visual styles make a control usable. E.g. borders around things so you can see them.

[[w]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref23)What is the reasoning behind this?

- [x] [[x]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref24)At a components most basic level it shouldn't require graphical assets and thus increase binary size for something that the component libraries should modify down stream.

[[y]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref25)I could imagine some cases where it would be beneficial to have a standard graphic that can be replaced easily (checkbox, radios, switch, select arrow). Maybe in the form of default content for a slot.

[[z]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref26)but having a slot does not necessarily mean an img/svg is required by default. a unicode character could be used as the default, and then it'd even benefit from automatic high contrast restyling. using an svg or graphic, you'd either need to swap that out based on a high contrast theme being present, or design it in a way that it had multiple borders to account for being used on a light/dark background (which is not necessarily unique to high contrast - but often overlooked, particularly by people who are working on non-windows machines.)

[[aa]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref27)open, naturally. :-)

[[ab]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref28)I would like to agree - I don't know that I believe closed roots should even exist :). ... but I think some component libraries that are legit/we'd love for them to participate are closed - I think Fast has moved to closed roots. It's a good questions I guess.

[[ac]](https://docs.google.com/document/u/0/d/1eTSxCWd3yRMxTCAs3a74NzQ6C9gikYQLZeVdCMODwOg/mobilebasic?pli=1#cmnt_ref29)USWDS addresses some of that by adding 'these are accessibility tests WE did (as component authors), these are the tests YOU need to do (when you touch it)'