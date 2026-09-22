---
Created: 2024-09-22T22:30:00
URL: https://uxdesign.cc/designing-for-forgiveness-how-to-create-error-tolerant-interfaces-af9146c8072b
Tags: [topic/デザイン/UIデザイン]
---
## Exploring how to design interfaces that feel intuitive and forgiving, even when users make mistakes.

·

[Follow](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fsubscribe%2Fuser%2Fe1c231ac5933&operation=register&redirect=https%3A%2F%2Fuxdesign.cc%2Fdesigning-for-forgiveness-how-to-create-error-tolerant-interfaces-af9146c8072b&user=Tetiana%20Sydorenko&userId=e1c231ac5933)

Published in

[UX Collective](https://uxdesign.cc/)

·

Source: [https://dribbble.com/shots/4291349-Mistake](https://dribbble.com/shots/4291349-Mistake)

We’ve all been there. You’re rushing to book a flight, fingers flying across the keyboard, and just as you’re about to click “Confirm,” BAM! You accidentally select the wrong departure date. A wave of panic washes over you as you scramble to fix the mistake, hoping it hasn’t cost you a small fortune. Errors like these are a common occurrence when interacting with digital interfaces, and they can be a real pain to deal with.

These little hiccups, these moments of frustration, often expose areas where technology falls short of providing a smooth and intuitive user experience. They’re the digital equivalent of a banana peel on the sidewalk, and they happen to the best of us. But while some errors are simply minor annoyances, others can have significant consequences, leading to lost time, data, or even financial losses.

In this article, I am going to take a closer look at interface errors. I’ll explain the difference between slips and mistakes, and share some ways to design intuitive, error-tolerant interfaces that make it easier for users to recover when they make errors.

# Slips vs. Mistakes

When it comes to interface errors, it’s important to understand [the difference between slips and mistakes.](https://dl.acm.org/doi/pdf/10.1145/2163.358092)

**Slips**

Slips occur when **the user’s intent is correct, but they accidentally execute the wrong action** — like clicking the wrong button or entering an unintended value.

Imagine scheduling a team meeting using Google Calendar. You diligently set the date, time, and carefully add all participants. However, while fine-tuning the meeting agenda, you accidentally overlook the “Notify participants” checkbox before saving the event. As a result, no notifications are sent, leaving your team uninformed about the meeting. This is a classic slip: your overall intention was correct, but a simple oversight in the workflow led to a communication breakdown.

**Mistakes**

Mistakes, on the other hand, happen when **the user’s underlying goal or plan is flawed, leading them to take the wrong action in the first place**.

You’re setting up a team meeting in Google Calendar, aiming for a productive one-hour brainstorming session. You carefully select a time slot that appears free for all participants and send out the invitations. However, what you *don’t realize* is that your free Google Calendar account has a 40-minute limit for meetings.

Because you’re unaware of this limitation, the meeting unexpectedly ends after 40 minutes, disconnecting all participants. This interruption causes confusion and disrupts the flow of discussion, potentially leading to frustration and wasted time.

The mistake stems from an incorrect mental model of the system’s functionality, highlighting how a user’s understanding (or lack thereof) can significantly impact their experience and lead to unintended consequences.

# Designing for Error Prevention

While some errors are simply unavoidable, interfaces can be designed in a way that minimizes the occurrence of both slips and mistakes, and makes it easier for users to recover when they do happen.

**Preventing Slips**When it comes to slips, the key is to design interfaces that make it difficult for users to accidentally take the wrong action. This could involve:

- A **clear visual hierarchy** acts as a roadmap for users, guiding their attention to the interactive elements. A well-structured hierarchy aligns with users’ natural tendencies to scan for visual prominence. By strategically using size, color, contrast, and placement, designers can signal which elements are clickable buttons, editable fields, or draggable components, making the interface’s functionality instantly understandable.
- Implementing** inline validation** to provide immediate feedback as users fill out forms can helps users correct errors in real-time, reducing frustration and improving the completion rate.
- **Chunking and progressive disclosure** can help to reduce cognitive load and minimize the risk of users losing track of their current step in a multi-step process.
- Providing **clear and unambiguous labels** for buttons, links, and other controls, so there’s no confusion about what each element does.
- Implementing safeguards, such as **confirmation dialogues**, to catch potentially harmful actions before they’re executed.

For example, [Jitter](https://jitter.video/), a tool for creating animations from Figma designs, demonstrates how progressive disclosure can help prevent slips caused by cognitive overload. Instead of bombarding users with information about how to instal the Figma plugin right away, Jitter strategically reveals instructions based on the user’s chosen workflow. This measured approach ensures users receive only the information they need at each step, reducing cognitive load and minimizing the risk of errors or accidental clicks due to feeling overwhelmed.

[Intercom](https://www.intercom.com/?utm_source=google&utm_medium=sem&utm_campaign=16438355659&utm_term=intercom&utm_ad_collection=135354092873&_bt=701655582400&_bg=135354092873&utm_ad=701655582400&offer=platform&utm_campaign_name=go_b_pm_acq_core_demo_kw-e_pros_core-e_alls_alld_emea_fr_en&utm_ad_collection_name=fr_core-e_intercom&utm_ad_name=platform_rsa_25q2&gad_source=1&gclid=CjwKCAjwko21BhAPEiwAwfaQCI_MTfNXywI70iSId0_TZO1SMf7sCPql9dJ48f342C_rkvR35eXDkxoCvRkQAvD_BwE) effectively implements confirmation dialogues to prevent slips, especially when dealing with potentially irreversible actions. For example, the “Archive” and “Block” options for contacts, both of which can have significant consequences, are positioned closely together. To mitigate the risk of users accidentally selecting the wrong option, Intercom requires explicit confirmation before proceeding. This confirmation step not only acts as a safety net to catch potential slips but also empowers users to reverse an accidental click before any unintended consequences occur.

The registration pop-up in [Figma](https://www.figma.com/) provides users with inline validation for the email input field. In the example below, the mistype is detected and the user is prompted to correct it with a single click

# Preventing Mistakes

Mistakes, on the other hand, require a slightly different approach. Since these errors** stem from the user’s underlying goal or plan being flawed**, the focus should be on helping them [develop a correct mental model](https://uxdesign.cc/designing-for-the-mental-model-b6aa5b3a814d) of how the system works.

This could involve:

- Using [**familiar metaphors**](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.00198/full#:~:text=Metaphors%20in%20HCI,-Metaphors%20are%20widely&text=The%20role%20of%20a%20metaphor,it%20(Saffer%2C%202005).)[ and metaphors that align with the user’s existing mental models](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.00198/full#:~:text=Metaphors%20in%20HCI,-Metaphors%20are%20widely&text=The%20role%20of%20a%20metaphor,it%20(Saffer%2C%202005).). Users don’t approach systems in isolation; they bring expectations shaped by their experiences with other products and interfaces. As[ Jakob Nielsen’s Law of Internet User Experience](https://www.uxtigers.com/post/jakobs-law#:~:text=Summary%3A%20Users%20spend%20most%20of,users%27%20expectations%2C%20usability%20suffers.), often applied more broadly, suggests, users prefer systems that work in ways they already understand. By incorporating familiar metaphors and [design patterns](https://uxdesign.cc/patterns-are-good-279dad29f338), you tap into those existing mental models, [reducing the learning curve](https://uxdesign.cc/change-generates-learning-curves-ffbe8d0ec675) and minimizing the potential for mistakes caused by unfamiliarity or confusion.
- Sometimes it is impossible to follow only established patterns, especially when dealing with novel features. In these situations, **nudges and contextual guidance** can help users discover the correct actions and avoid mistakes. By providing helpful tooltip, hints, or suggestions at the point of interaction, designers can gently steer users towards the optimal path, reducing the likelihood of errors stemming from uncertainty or a lack of understanding.
- [Nielsen’s ‘Help and Documentation’ heuristic](https://www.nngroup.com/articles/help-and-documentation/) emphasizes that while it’s ideal for a system to be usable without any extra help, it is necessary to provide help and documentation to assist users. However, a knowledge base can be overwhelming, especially to novice users. Generative AI suggests a great approach: incorporating chatbots trained on the knowledge base, which can communicate with users in natural language and help them in context, for example [IBM Watson Assistant](https://www.ibm.com/products/watsonx-assistant?utm_content=SRCWW&p1=Search&p4=43700074895048257&p5=e&p9=58700008246061338&gad_source=1&gclid=CjwKCAjwko21BhAPEiwAwfaQCDZfdy4wJEHfLQcu_8jwFi_dDo4JldwvALNv1Zl3vxWJwh1eVqjgqxoCvUsQAvD_BwE&gclsrc=aw.ds) or [Google Dialogflow](https://cloud.google.com/dialogflow?hl=en).

Novice users often make mistakes when faced with unfamiliar systems or features. This is where proactive guidance, like the contextual suggestions provided by the Otter chat interface, can be invaluable in preventing errors. For example, new Otter users might not fully grasp the full potential of the chat feature, leading to unproductive interactions or a sense of being lost. By offering contextually relevant suggestions, Otter guides users towards meaningful actions, preventing the “Blank Canvas Syndrome” that can lead to frustration and mistakes. This proactive approach helps users learn by doing, fostering a smoother and more error-free experience from the outset.

[Intercom](https://www.intercom.com/) employs several effective approaches to introduce users to the interface:

- They leverage metaphors, using familiar categories like *inboxes* and *views* to explain the information architecture.
- The visual hierarchy is designed to guide user attention. A dimmed background draws focus to the side panel. The inclusion of a human photo in the tooltip leverages Gestalt principles, ensuring it’s the first place users look. The tooltip message effectively uses chunking, separating the information into two one-sentence parts, utilizing the [Serial Position Effect](https://lawsofux.com/serial-position-effect/).

# Graceful recovery

In an ideal world, our designs would be so intuitive and error-resistant that missteps would be rare. However, the reality is that users are human, and human error is a natural part of any interaction. Even with the most well-intentioned design efforts, unforeseen circumstances, slips of attention, or gaps in understanding can lead to unintended actions. That’s why it’s not enough to focus solely on error prevention; we must also design for graceful recovery. When errors do happen, it’s crucial to provide users with a clear, straightforward path to get back on track, minimizing frustration and helping them achieve their goals.

Here are some key ways to design for graceful error recovery:

- A key principle of graceful error recovery is ensuring **users can quickly recognize when they’ve made a mistake**. A system that clearly communicates its status empowers users to self-correct. By providing clear and timely feedback about the system’s state — whether an action was successful, what’s currently processing, or any changes resulting from their input — users can readily track the impact of their actions and identify any unintended outcomes. This aligns with [Nielsen’s heuristic “Visibility of System Status,”](https://www.nngroup.com/articles/visibility-system-status/) which emphasizes the importance of keeping users informed about what’s happening inside the system at all times.
- Once a user has identified a mistake, **the system should provide clear and readily accessible options for reversing the action or getting assistance**. This could include prominent “Undo” buttons, readily available help documentation linked within error messages, the option to connect with a human support agent, etc.
- Even when errors occur, the **system should be designed to minimize their impact and prevent data loss or other irreversible damage**. This could involve: a) **Autosaving user progress:** Regularly saving the user’s work can help to easily recover it if an error forces them to restart or lose their current session.b) **Providing clear warnings before irreversible actions: **If an action cannot be undone (e.g., deleting a file permanently), the system should clearly warn the user and require confirmation before proceeding.c) **Offering “safe modes” or sandboxes for experimentation:** Allow users to explore features or make changes in a safe environment where mistakes won’t have lasting consequences.

Recovery codes for two-factor authentication are a great example of this proactive approach. By generating and prompting users to store these codes, services like [Basecamp](https://basecamp.com/) provide a safety net if a user ever loses access to their second authentication factor.

Basecamp further emphasizes the importance of these codes by employing a [Von Restorff Effect or the Isolation Effect](https://lawsofux.com/von-restorff-effect/) visually highlighting the potential threat of losing access and strategically placing the recovery code option within that message. This combination of proactive problem-solving and clever design effectively guides users towards a solution before they encounter a critical error

# Additional resources

Designing for error recovery is an ongoing learning process. Here are some additional resources that can provide further insight:

- [What Is Error and Types of Errors in Human-Computer Interaction (HCI)](https://www.youtube.com/watch?v=NXih69VPVnI) in video by Alan Dix
- [Usability Heuristic 5: Error Prevention](https://www.youtube.com/watch?v=imS9s1DUY-I) by Katie Sherwin from NN/g
- [The Design of Everyday Things](https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654), Chapter 5 — “Human error? No, bad design” by Don Norman
- [Designing Better Error Messages UX](https://www.smashingmagazine.com/2022/08/error-messages-ux-design/) by Vitaly Friedman
- [The Nature of User Errors](https://app.uxcel.com/courses/ux-design-psychology/the-nature-of-user-errors-902) lesson by Uxcel

# Final thoughts

In the end, embracing errors as a natural part of the human experience and proactively designing for their prevention and graceful recovery is crucial for creating delightful, user-friendly interfaces. By understanding the different types of errors users might make, such as slips and mistakes, and employing thoughtful strategies to address both, designers can empower users to confidently engage with digital products and services, fostering a sense of trust, control, and satisfaction.

Do you know any other effective techniques for designing for error tolerance and recovery? Feel free to share your thoughts in the comments below!

![](https://miro.medium.com/v2/resize:fit:679/1*ScJnJDl5inZVqxzU5j4GpA.png)

This image outlines challenges in AI system design within the Double Diamond model, divided into four phases: Discover, Define, Develop, and Deliver. Each phase highlights specific issues such as articulating AI capabilities, prototyping behaviour, designing interactions, and managing AI performance. Challenges also include foreseeing AI effects, avoiding the Uncanny Valley, and accountability for AI errors, emphasizing the complex process from initial problem identification to final solution

![](https://miro.medium.com/v2/resize:fit:679/0*rw248tf1IpJYyjI8)

Steve Jobs Hated User Research. Here’s Why I Agree With Him.