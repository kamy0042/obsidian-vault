---
タグ: []
作成日時: 2026-01-23T02:41:00
URL: https://www.knapsack.cloud/blog/garth-braithwaite-on-design-tokens-governance-and-scaling-spectrum-at-adobe
Tags: [topic/デザインシステム/デザイントークン]
---
![](https://cdn.prod.website-files.com/61826e16a7bbc9deb3c691c2/656844a27cecf2032c882702_THE%20DSP%20THUMBNAIL.webp)

The Design Systems Podcast – Exploring the world of design systems, UX, and digital product development. Featuring a stylized green map and compass graphic over a subtle topographic background.

The design token nerds are taking over the pod! In this episode, guest host Christopher Bloom sits down with Garth Braithwaite, Lead Senior Staff Design Engineer at Adobe, for a deep dive into the inner workings of Spectrum’s design tokens. Garth shares how Adobe manages the complexity of scaling a multi-platform design system, and how thoughtful collaboration across teams builds real value for users.

They get into the weeds on cross-team communication, naming conventions, accessibility, versioning, and Garth’s own *front-end manifesto*. If you’re building, scaling, or just geeking out over design tokens—this one’s pure gold.

### **Guest**

[Garth Braithwaite ](https://www.linkedin.com/in/garthdb/)is a Lead Senior Staff Design Engineer at Adobe, where he plays a key role in maintaining the Spectrum design system. With a background in both design and engineering, Garth brings a unique perspective to scaling design systems and improving workflows across teams.

### Transcript

Chris Strahl [00:00:00]:

Hi, welcome to the Design Systems Podcast. This is the place where we explore where design development and product overlap, hear from experts about their experiences and the lessons they've learned along the way, and get insights into the latest trends impacting digital product development and design systems from the people who pioneered the industry. As always, this podcast is brought to you by Knapsack. Check us out at Knapsack.cloud. If you want to get in touch with the show, ask some questions, or tell us what you think, send us a message over on LinkedIn. You can find a direct link to our page in the show Notes. We'd love to hear from you.

Christopher Bloom [00:00:26]:

Hello and welcome back to the Design Systems Podcast. I am your guest host Christopher Bloom, who you will notice is not your usual host who is usually Christopher Strahl. Here at Knapsack, we must have some kind of rule that only Chris's can host this podcast and I'm glad to help. Before we get started, Knapsack has a patterns Summit on May 22 in New York City and we also have a webinar panel that our own Senior Director of Product, Robin Cannon is leading on May 28th. Robin is formerly Director of Design Systems at IBM and Platforms Design at JP Morgan. That webinar will be all about democratizing digital production. It's called how do we get more people using what we already have? Check out these events and more at our site Knapsack.cloud. That's C L O U D, Cloud.

Christopher Bloom [00:01:18]:

Now. I am grateful to have our guest with us today, Garth Braithwaite. Garth is on the Adobe Spectrum team and has agreed to let me pepper him with deeply nerdy questions about all things design systems. Garth, tell us about yourself and your career journey that led you here to talking to me.

Garth Braithwaite [00:01:40]:

Thanks Chris for having me on. First of all, I really appreciate the chance to chat about design systems and tokens primarily, but I am originally a designer. I was hired by Adobe. I've been with Adobe for almost 14, almost 15 years. In January it'll be 15. Originally hired as a designer I worked on Flex and designed the default skins for Flex components. So I say it's design system adjacent, but it was very much before design systems were a thing and I've been a part of a couple projects, mostly open source like Brackets and then moving to Topcoat, which is another design system like project. I moved into being an engineer or a front end engineer and then I found myself working with Phonegap and now working on Spectrum and I've been on Spectrum for a number of years, more than Five and one of the initial engineers that were brought onto the team.

Garth Braithwaite [00:02:36]:

So I have a deep love of design systems and trying to help designer developer collaboration. So I'm super excited to chat.

Christopher Bloom [00:02:45]:

Awesome. I wonder, you know, when Spectrum, you know, was getting started and they were, you know, there was this initial push to make it happen. Why you? Why were you one of the initial people to get involved in that? What was that foundation?

Garth Braithwaite [00:02:59]:

When I was working on phonegap, we were trying to solve a similar problem. Which phonegap was an open source project that enabled you to build native mobile applications using web technology. It's pretty much just a wrapper for the web view that had some APIs that let you tap into the native functionality that wasn't available otherwise. And we were finding that a lot of people, they liked having that platform to build applications on, but that even though they were web developers or comfortable with the web, that doesn't mean that they were really comfortable with building mobile web applications. And so we started to put together the idea of maybe we can build a UI kit that would be more performant and be optimized for that. And so we started working on how do we go about building this in a way that could be useful to everybody? And at the same time, Spectrum was just kind of forming, but it was mostly just designs. And at the time when we first started working on Spectrum, the designers were working primarily in Illustrator. This predates XD or figma.

Garth Braithwaite [00:04:01]:

And so there was no implementation per se. There was a REACT implementation that was floating around. And I should say implementations are what we call the platform. When we build a version of Spectrum for a specific platform, we call that the implementation. So there was a REACT implementation that was floating around, and there was an angular one as well, but there wasn't any unification of that at all. It was just a designer who was working kind of part time, putting together some ideas, and there was a new designer who was jumping on to start doing some mobile ideas around how some of these components could be optimized for mobile. And so we tried to touch base with them. And we ended up starting to work on building Spectrum as a CSS implementation first.

Garth Braithwaite [00:04:44]:

And the big reason there was the REACT implementation that existed. They were more than happy to give us the CSS at the time. And we found it was a really good place to provide value without getting in the trenches about Tech Stack, because just about everybody was happy to not write css, have someone else do that for them. And it gave us a place to be really close to the design itself and still kind of contribute in a code fashion to that.

Christopher Bloom [00:05:10]:

I kind of love CSS as sort of like the universal language that being closer to design you can be doing and then handing it off to the implementations in React. I love that.

Garth Braithwaite [00:05:22]:

Yeah. And we were hoping it would be used by other things and it has been, but it really was that it was trying to be close and eventually they brought us into the Design. Org. So that's where I have been since that time. And sadly, phonegap is not as big of a project that Adobe works on and we never did build that UI kit. It just turned into us working on Spectrum, which is just a bigger one for everybody to use, not just a specific product platform. But yeah, it was kind of full circle. I originally hired in the Design.

Garth Braithwaite [00:05:52]:

Org and found my way coming back as an engineer into the Design. Org.

Christopher Bloom [00:05:56]:

Tell me about that journey of going from designer to engineer. And you've described yourself to me as like a design focused engineer. Tell me about how you kind of like gained those skills and flex those muscles.

Garth Braithwaite [00:06:11]:

Yeah, I would say that I was hired from the beginning because of my engineering background. I had spent time architecting Flex and Flash applications and so before joining Adobe I worked at an agency as the head of their UX that they were trying to do. And so I'd already made that transition there as well. I feel very comfortable wherever the greater need is. So when I'm working with designers who know what they're doing but don't have the engineering skills, I'm really happy to fill in that gap. And sometimes I've worked with, especially like when I worked on Brackets, which is an open source editor that Adobe built, I worked with fantastic engineers and so I didn't feel the need to fill that void. And I was more than happy to just work on the design side where I felt like they could use the most help. I just go where kind of where it's needed.

Garth Braithwaite [00:06:59]:

But I will say I've been now an engineer on the design system long enough that people forget that I even was a designer before. So it's pretty well entrenched now.

Christopher Bloom [00:07:09]:

How would you describe the current role that you have if you came up from engineering but now you fit kind of more into this design space? What is the role that you find yourself doing day to day on a design system this large? And by the way, for anyone listening, I'd really encourage you to pull up spectrum.adobe.com and go look at this right as you're listening to this, please start flipping through this because it is a monumental achievement. So talk to me. Yeah. What role are you at right now today?

Garth Braithwaite [00:07:37]:

Similar to the same thing. I would also recommend. There's two other episodes of this podcast where Chris interviewed Sean Charis and I believe he, Chris Strahl again interviewed Matt May and Vida Rosier about accessibility, but they give really good insights on that. But my current role, I went from CSS to managing the design data, which is primarily tokens, design tokens. So those design decisions and values that come out of design, how do we codify them in code that can then be consumed by multiple platforms? Because Spectrum has grown from just that, CSS and React implementation to web components, iOS, native desktop, and we are adding Android right now. So if anybody knows an engineer in Romania who wants to work on Android, we have an opening.

Christopher Bloom [00:08:28]:

Excellent. All right, great to know. If you don't mind me asking. A little nerdy. In your world of Spectrum, when you go to build for these, like, very specific technologies, right when you have your Android version, what are you delivering? You can't give them a CSS file in Android. What are you delivering for the Android? Or having the Android team use.

Garth Braithwaite [00:08:44]:

It's a bit of the wild west, right? There is a W3C token group, and we have some people at Adobe who actually are editors on that draft for design tokens. But it's still very bare bones as far as like, trying to distill the complexity of a designed component into design tokens, which are just name value pairs for the most part. And so what ends up happening is we're building more and more structure around what our design data is, and we hand off a JSON file as the most common transport format or communication format, but it's using JSON schema, which is similar to like a strong typed language where we can validate what we're doing. And we have some authoring experience that we allow the designers to author these design tokens in figma, and we use some plugins and some custom workflows to then bring that into our public GitHub repository for our design tokens. We pass it through a couple of things, including we're currently using the Token Studio plugin for helping with that. But there's a lot of desire to build more custom stuff that is more strictly applied to the way our designers think about things.

Christopher Bloom [00:10:02]:

We can definitely get into tokens discussion here because it is just so fundamental to what y' all are doing, especially at this level of, like, discussion, design suggestions, right? You're at the CSS level, you're not telling people how to write their react or how to write their Android Kotlin code. Right. You're saying like here is tokens, please apply them in this way. Are you finding any limitations in the spec or in the current structure of the JSON that you deliver?

Garth Braithwaite [00:10:28]:

Absolutely. Really? It's impossible to perfectly find a way to distill a design into a universal format that can then be used by all implementations and platforms. We run up against that all the time. A big one is font rendering and the way that it renders, trying to get baseline stuff, it's a full time problem. And like Adobe, of all the places that have good resources, Adobe has our own type foundry. And we created products like Adobe Fonts that was previously typekit, like the ability to deliver type assets and to build our own type assets, things that no other company has the same access to. And we still struggle with trying to do that. So we're in the process right now of trying to rethink how we do that.

Garth Braithwaite [00:11:16]:

And we have a proprietary typeface called Adobe Clean and trying to figure out how we can manage that. But right now, what it really entails is we provide everything as pixels, iOS has to convert it to points and then everyone has to tweak everything. We also provide Figma assets, which is another huge important part of this, is we can't just give JSON data because that doesn't describe it enough to know what if it looks right. So you have to have the visual asset as well to validate it.

Christopher Bloom [00:11:45]:

You know, for anyone listening, if you've ever had difficulties implementing fonts and font faces in your design system, I really want to take this moment to let you know, like, even Adobe, even Adobe, it's taken a little work, right?

Garth Braithwaite [00:12:01]:

Yeah, it's ongoing still. It's not even. And I would not say we've figured it out, we're getting closer, but.

Christopher Bloom [00:12:06]:

Wow. I want to talk a little bit about Spectrum. The system right there is the, you know, spectrum.adobe.com site. There is also the standalone Storybook that y' all have. I believe you can find it@open source.adobe.com and we can see when we go to your spectrum.adobe.com, every one of your components, you do this amazing job of showing the designs, showing the code, and then linking out to the actual component itself running inside of both storybook and web components.dev. can you kind of explain that flow, how y' all did this? I mean, it feels like a tremendous amount of work. Do you automate this? How do you do that work?

Garth Braithwaite [00:12:50]:

Yeah. So I will say, like, there's an aspect to this that is going public and some of this is my own personal belief. I can't speak for all of Spectrum and definitely not all of Adobe, but I found that when we went public with the Spectrum website, our standard of quality increased. The things that were sufficient for documentation like this for internal only suddenly wasn't good enough for external. It wasn't anything that anyone was calling out that way, but it just was a natural thing when you realize that more people are going to see it and the types of people who are going to see it might be a little bit different. And we're not like a material design system. We're not expecting anyone to build a lot with Spectrum that are third party designers and programmers. For the most part, Spectrum is an internal only project as far as the people who use it.

Garth Braithwaite [00:13:39]:

We have a couple of things where there's some platform stuff where people might be building with Spectrum for plugins or aspects of some web products, but for the most part we're fairly internal. So I have to point out that the documentation was a big push to get this right and to create it publicly. And then we have several other teams. Some have come into our design. Org. The web components team is one of those teams. They used to be external, they just recently came internal to the design. Org.

Garth Braithwaite [00:14:09]:

But React Spectrum, that is an external project to our design. Org. That's that same React implementation that pre existed before any other thing. And then we have our Spectrum CSS implementation and those are all the ones that are currently public. We do have, like I said, iOS working on Android and some desktop application implementations that they're not currently public. But these other ones, they are all managed by these individual engineering teams. So it's very much a team effort. But you'll see that as you're going through these different storybooks, because now they all are storybooks.

Garth Braithwaite [00:14:42]:

The Spectrum css, web components, React Spectrum all have their own storybook. They are not 100% the same. We have visual differences, we've got some API differences between components. Some of that is known and some of that is just the nature of being a large distributed team that are trying to build the same thing. So we are always trying to figure out ways to automate to improve the authoring experience for documentation and to figure out ways that we could build some sort of automated reporting or linting, which is just to try and help improve the quality in a way that isn't an extra burden on top of our Implementation engineering teams, but actually make it easier for them to do their job. And we haven't found it, but we're still working on that.

Christopher Bloom [00:15:28]:

I was just going to ask, you know you're effectively doing this in like hard mode, right? Because it's not just your team, it is a team of teams. You've got to communicate across, right? There's messaging, there's obviously inter team politics. How do you manage change when it's this big and it's an organization as large as Adobe? How do you say, like, this thing needs to be different or I propose something new or we should change this rounded corner to some other radius, like what is that process to kind of make this happen?

Garth Braithwaite [00:15:58]:

We put a lot of workflows in place to try and make this better and we're always improving those. We have some great program managers and product managers who help with that. And then we've got design leadership and engineering leadership because we go from our design system engineering team, which is primarily me when it comes to the token data, and then that goes out to the implementation teams, downstream css React web components, they're consuming that data, they're authoring their own stuff, and then you have downstream from that the product engineering teams who then have to use those libraries. And so we have a bit of a separation there from the designers all the way down to the product designers and the product engineers. So we're always trying to figure out not how to flatten that, but how to increase communications between all of these groups. Because it's also really hard. Like if you think you found a bug in React Spectrum or in Spectrum web components, you're not sure where that bug exists. Is it the tokens that are wrong? Is it css? Like, there's so many places where that value could be coming from.

Garth Braithwaite [00:17:01]:

We have to be very open and sharing of information. But we do things like RFCs, request for comments when we are trying to build something new and we try to be very open about it. We are working on standardizing the way that we discuss component options or like the component API and similarly the anatomy of a component. Like we're trying to break these down into somewhat standardized ways that we're talking about them. So it makes it easier for a new team to check the change log and to understand where they were and what's changed and to be informed, but only when they're ready. We understand that product teams, they can't be watching the design system and all the updates that come with it all the time. They're going to Lock into a version while they're working on features of our design system and then after they're done with their release or whatever they're working on, then they're going to consider. Hey, is now a good time to update to the latest version of Spectrum?

Christopher Bloom [00:17:52]:

I'm very interested when you mentioned standardization of an API to a component. Right. Because you get to be the source of the way something is done. When a lot of people implement design systems or I work with teams that are just starting out for the first time with this, there's a lot of fear about doing it wrong or there's a lot of fear of, well, we did it this way on one component, it's totally different on this other component. We could have just standardized and saved all this time. Do you have any suggestions for teams that are starting out on things they should think about early on around. I know there's no magic silver bullet to this, but standardization, yeah, we very.

Garth Braithwaite [00:18:32]:

Much get siloed into our own problems and the things that we're solving. It's really helpful to go out and talk to other people and I've missed a little bit of this. I've spoken at a few conferences about design systems and that's really helpful. But I also try and do open office hours with anybody who's working on a design system. And I always say that I'm happy to chat for free if I've got the time available. One time I was giving a whole conference talk on the lessons that I've learned about scaling a design system as an engineer, and at the end I asked if there was any questions and somebody said, yeah, what's a design system? And just realizing that like what you are swimming in, some people are not even sure what that is and it's not that far removed. Like if I'm trying to think of my leadership and I try to Describe up to VPs and above and trying to describe what a design token is and the value of that, that's not something that they have to deal with. And so trying to just like be aware that we've got to simplify these discussions to the point where anybody can understand it and then we can get deeper where people need to get deeper.

Garth Braithwaite [00:19:35]:

But the big thing is just like starting anybody who wants to build a design system like thing all that I really consider design systems to be. And I think it's good for everyone to have their own definition or every organization to have their own definition, but it really comes down to trying to find design decisions that are made across components that are the same for the same reason and consolidating that in a codified way and so that we can be on the same page as much as possible. Like things are the same corner radius for the same reason in the same situations. And all those design decisions, I will say most design systems that I've chatted with, it usually starts with a single platform. So just starting on the web, it's crazy to think that, like, hey, I need to start with the web and iOS usually they don't have the resources to do it. And it usually starts with colors. Sometimes it's a Google spreadsheet or an Excel spreadsheet. Here's our list of colors and the names.

Garth Braithwaite [00:20:26]:

And these are the only colors that we use. And then the next step usually is okay, and here's what it looks like between light and dark mode. And like, those are usually the very first steps to starting. That's all it really needs to be, is trying to find how do I communicate this in the way that's easiest for my engineers to consume so that they're not having to try and hunt through my design assets. And then it turns into how do I do this for my designers as well? And Figma tries to provide a lot of tooling around that. There's lots of ways to solve the problem. And I do think that whatever you do, the evolution of a design system usually starts out with a designer doing it because they think it needs to be done and they're just spending a couple hours per sprint trying to communicate these things. And then eventually it turns into a web developer getting involved and making a CSS version of this.

Garth Braithwaite [00:21:14]:

And then it hopefully turns into engineers working on the workflow between those things. Because every organization seems like they're going to have their own needs and their own ways of working that you probably aren't going to find one out of the box solution that'll solve every problem. And so you're going to have to have little tweaks and things, translation layers and stuff that you're going to have to mess with.

Christopher Bloom [00:21:37]:

What I am hearing is that maybe a good place to start at the lowest level, at the beginning level is possibly at the design tokens definitions, because that feels like a really good way to communicate a lot of the basics in an interchangeable format. Can you tell me more? I know that you're really passionate about design tokens. I am too, over here at Knapsack. Can you tell me more about what tokens do for us at the low level and the high level?

Garth Braithwaite [00:22:08]:

Yeah. So we have some pretty good documentation on the Spectrum website. If you're on the website, you can go into the foundations section and there's some pages on design tokens. And we have some descriptions of how we think about our design tokens. And there is very much room for this in the industry where we could standardize some of the language around some of these things. But for the most part it starts with consolidating like again, colors are a great example. We only have a finite number of colors that should exist in our design system. But if you just provide those color values as hex or rgb, you're not describing how to use those.

Garth Braithwaite [00:22:46]:

And so we have on top of our values we've got token names. So we have the steps for like blues, we've got blue 100 through blue 800. But again, that really just describes what it looks like, it doesn't actually describe how to use it. And so we have alias token names. On top of that we've got accent color 800, accent visual color. And then finally we have component specific alias names like drop zone, Background color. And wayfinding is another big problem that we're always facing when it comes to design data. We have a token visualizer that is also public and it allows our engineers and our designers to look in like a node, like format, layout, node map sort of thing, look at all of our tokens and what they're called.

Christopher Bloom [00:23:36]:

Is that public?

Garth Braithwaite [00:23:37]:

Yeah, it's public. So it's opensource.adobe.com spectrum tokens visualizer. But it's not perfect because really what you're trying to do, we have like a search bar and you can search through our tokens and we have some amount of categorization here. But really what you're trying to do is somebody's going to come on here and they're going to say I need to know what color to make my custom component. Because what is provided with Spectrum is great, but my product is special and it needs this other thing and it needs to look and fit in with Spectrum, but it needs to be its own thing that's slightly different. So how do I know which color to use? So hopefully we've created a semantic name that describes what to use, like a component background color for the different states, something that makes it a little bit obvious. And then they can also go and look through the code for our existing components and they can say, oh well, in the standard button this is how they did it. I'm going to be able to use that same thing.

Garth Braithwaite [00:24:33]:

The Worst case scenario that still sometimes happens is they say, I know it needs to be 2 pixels. And so I found a token that equals 2 pixels and so I'm just going to use that token. But they kind of bypass all of the semantic naming and we're trying to build tooling around. Like, how can we provide a linter that says, hey, it looks like you're using a pretty low level token name. Can we help find you something that's more semantic?

Christopher Bloom [00:24:59]:

I would kill for a tool. I run into this constantly of, you know, at a certain number of tokens, they're manageable. After that number, like you said, developers reach for the first one. That's two pixels. Right. And it is not necessarily semantically correct. It's not componently correct. We've also kicked around the idea of an eslint rule or some form of engine that can say, hey, I see what you're trying to do.

Christopher Bloom [00:25:25]:

Have you considered this token name instead? I'm very interested in your approach to that or your thoughts on that.

Garth Braithwaite [00:25:31]:

There's nothing that beats office hours. Like we have office hours with our designers, meaning product designers can come and talk to our design system designers and our engineers. But we find that like people are on tight timelines and they've got a lot of requirements and stuff. So like, I don't fault engineers for grabbing the wrong token. They are not token engineers. And you pretty much like could be a token specialist. That is my job. You can be a token specialist and still not have your head around everything that's in the system.

Garth Braithwaite [00:26:01]:

So I don't fault them for it, but there's gotta be a way that we can improve and make this easier for them to do their job. There was a product that they just had a linting checker that just made sure that nobody was using hard coded values for anything. And you would think that that would make things better, but really that just pushed them towards, well, I'll grab any token that gets me what I want.

Christopher Bloom [00:26:19]:

The first token, that's two pixels. Yeah, yeah.

Garth Braithwaite [00:26:21]:

And then we change that token to be something else and they get a breaking change that they were not expecting, we didn't expect. Because you're like, well, you shouldn't have been using that one for the two pixels. So I don't fault them. And we also try to provide things like our implementations use visual regression testing where they're doing snapshot tests and they're trying to be able to visually see if we change a token that anything that breaks that they notice it. We try to help encourage our product teams to do the same. But again, they've got a lot of requirements, so if we can make any tools that make that easier. We're also working right now on a help bot that is driven by AI that consumes all of our documentation and hopefully can answer questions. It's still very early days, but we're hoping that we can use a large language model for helping just get support and answers out there in a way that we can't scale perfectly.

Garth Braithwaite [00:27:11]:

But these are all things that we're trying to do hey everyone,

Chris Strahl [00:27:15]:

I'd like to take a quick break and tell you about Knapsack's leadership Summits. Every month we host an exclusive in person event in different cities all around the country, bringing together design, engineering and product leaders. These summits are all about sharing our learning with tailored discussions to address the challenges you're facing. The best part? It's totally free. Head over to Knapsack.cloud/events to find an upcoming summit near you and apply to join us. We'd love to see you there.

Christopher Bloom [00:27:41]:

So related to Tokens and you know, as I look over this Design tokens page@spectrum.adobe.com page token design-Tokens by the way, I recommend everybody listening to this podcast as you are going down your Tokens journey and you're feeling overwhelmed about how you should structure and how you should name things, please read this page. This page is about as good as a 101 on how to do this correctly as I have ever seen and there are a lot of resources out there. This is very good. Follow this guide, you'll get most of the way there. It also does bring up a very interesting question about naming things, right? They say like there are two hard problems in computer science, right? Cache invalidation, naming things and off by one errors. How do you name stuff? Right? I see in your hierarchy in these diagrams you have very clear naming. How do you get there? Is that all you? Are you the one figuring out all these names? How do you get these names?

Garth Braithwaite [00:28:36]:

Yeah, I would add a third problem to that which is versioning because we don't have to deal with too much with those other low level ones. But for a design system, naming and versioning are the hardest ones. But yeah, right now it is a combination of a few things and the lesson here that I would pull out because again, you can't just take anybody's existing way of doing things because they're very much organically grown to what they need on their design system and in their organization. But don't Try and build everything perfectly from the beginning. Assume that it's never done. We're always iterating and that includes even like our workflows. So the way that we are working right now, as of today, our designers are designing out components and they are listing the tokens, sometimes in a spec file and they are creating change logs that describe what the tokens used to be in the last version and what the tokens are now being used in the new version that includes creation.

Christopher Bloom [00:29:35]:

The designers.

Garth Braithwaite [00:29:35]:

The designers.

Christopher Bloom [00:29:36]:

The designers are doing a changelog. That is fantastic.

Garth Braithwaite [00:29:40]:

Yeah, yeah. And you can actually see even on the Spectrum website, it has a version of this. If you go into the components and you click on like button, there is a change log listed on the website where it has at least a text description of what has changed. And the designer, this version very much is trying to communicate the visual change or the reason, the design motivation for any changes that happened. But we have versions of this that are in the tokens that when we get to the authoring stage, I have a script that generates a diff that communicates here are the changes from the previous version to the new version. And it's actually one that you could run across any two versions to compare them within reason, because we did change formats at one point. But the idea here, like, when it comes to naming, our designers are listing out these names and then I go in and as like the engineering representation, I validate that they are following what we have as our guidelines for naming tokens. And then we also have a content strategist.

Garth Braithwaite [00:30:41]:

And this is the other secret that we learned on Spectrum. And Jess Satel was our first content strategist and she actually has written some blog posts or I think one blog post for you on the Knapsack Design System blog. But like, I feel bad telling any design system for fan, engineer or designer at a company that, hey, you need to have a content strategist. You don't. You need to grow your team. And when you get to a certain size, realize, hey, our next hire needs to be a content strategist. Because content strategy really does help with naming. Trying to, like, come up with a universal language that applies to how we describe things to designers and then engineers on multiple platforms is a very hard problem.

Garth Braithwaite [00:31:29]:

And so having a content strategist there to do things like research, like, they're not copy editors. Their job is to help us define the right words to use and really to facilitate the discussion to land on the right thing, not to, like, I went and found it and here it.

Christopher Bloom [00:31:47]:

Is ultimately, they're literally like defining the structure of your token's JSON file. They have the hand in the shape of that giant object, don't they?

Garth Braithwaite [00:31:57]:

Yeah. And they don't have to know JSON to do that. Their role. Yeah. So our next step, our next iteration, and this is like future thinking. But I have some of this written on the Spectrum Tokens wiki that's public. I'm building something that I'm calling anonymous tokens. And really what it is is taking what we have right now, all of the structural semantic information about what a token is.

Garth Braithwaite [00:32:22]:

It exists in the name itself a little bit in, like, what value type it is. Like, whether it's a color or a dimension or a number, all of the information is stored in that string. And it's very brittle as a solution because it's really easy to have typos, but it's also very hard to ensure that you're naming things in a consistent way. Like you talked about, as we scale up these things, the problem just becomes much harder. You can't work on it alone. I have lots of designers who are working on writing these specs and including new design tokens, and they're all naming their own design tokens what they think is best, and they're trying to follow the rules, but there's not a clear way to, like, enforce those things. So we're working right now on a way to bring that metadata or that contextual data out of a string and into an object that can be validated with some strict typing rules. So we've got some proof of concepts that we're playing around with that.

Garth Braithwaite [00:33:23]:

But I keep joking that, like, the tokens must flow. It doesn't matter like that. I want to build and improve the system. The number one step is right now, I'm spitting out JSON from the designers that the engineers know what to do with. And I will change that. We'll make it better as we collaborate together. But I can't do anything to put in peril their ability to consume that data. It's constantly balancing that.

Garth Braithwaite [00:33:49]:

How do I spit out the data? How do I keep the tokens flowing while also adjusting the way that we do it? And it would be nice if I could just take a year and rewrite everything. I would love to do that, but that's never going to happen. And I think I probably end up going in a direction that we don't actually need. So trying to have that balance of. I'm going to adjust the process with other tooling engineers that we have and in collaboration with the implementation teams that consume this JSON, how can I adjust and improve it and make it easier for us to have more trust? And it all comes back to that. How do we build more trust into the system so when an engineer gets the new data, they know what to do with it a little bit easier and not have to hunt us down for every question.

Christopher Bloom [00:34:34]:

It feels like versioning would be a big part of this. Right. As you're talking about change and trust, what's more a declaration of trust than like a new semver that you promise will not break the teams that are, you know, the minor version, I noticed that Spectrum is at version seven for these components. Seven something right now. That means there has been at least, you know, six breaking changes up to this point, right. In this, you know, design system, how do you manage this? How do you decide what a breaking change is? How do you let a team know? It feels daunting.

Garth Braithwaite [00:35:11]:

Yeah. And it can be very paralyzing as well. Like similar to I don't know how to get the perfect design token management system or I don't know how to name things perfectly. It can be very paralyzing because it can feel like I've got to get this right from the beginning. Sure, it's nice to have if you could figure out the way to do it, but you're most likely going to do it wrong because you're going to do something that somebody else did that worked for them and doesn't work for what you need. So when you said seven, that's actually a per component version number. We have version numbers on the designs on a per component basis. Some of our implementations do the same thing.

Garth Braithwaite [00:35:47]:

So Spectrum css, we have a version of Spectrum CSS that actually publishes the NPM packages for the CSS on a per component basis. You could in theory mix and match a la carte some different components from different versions and use them together. There's some universal stuff that would make some of that hard, but it is possible. The idea there is again, product teams are going to be locked into a certain version number while they're working on things. But then if it turns out that we released a new version of a component that fixes a problem that they have, they don't want to have to update everything to get that one problem fix. And so here's a new version of just the one component, they can try and bring that in in a kind of, we do say a la carte, bringing it in an a la Carte fashion, but that doesn't work for all implementations. IOS not very interested in doing it that way. And so some of it's a culture thing, depending on the way that certain platforms work or expect to work.

Garth Braithwaite [00:36:41]:

And some of it's also technology, like bringing in a ton of NPM packages for managing that. That seems very doable for a web platform team, but maybe not for some other teams. So we do try to version it. We have found that our designers are pretty good at doing semantic versioning if we give them a good set of rules and they help come up with them together. But we find that like, what is a breaking change for a design is not the same thing as what's a breaking change for an implementation, because you can do things that maybe don't look visually different, but cause a structural change in the DOM structure on the web. And so now that's a breaking change. That design that you made, even though it looks just a little bit different or you're adding a new feature, right? Like if it's a new variant to a component that feels like just a new feature. So maybe it's a minor release, but on the actual web implementation, I have to completely redo the way that I was thinking about building this component.

Garth Braithwaite [00:37:39]:

And so now it's a breaking change. So we haven't found a universal semantic versioning method. But one of the implementations, if you look in the documentation, they try to describe what is a breaking change for them to help make it better to communicate. But again, you're not going to get it right. You're going to say, hey, this isn't a breaking change. You're going to send it out and it's going to turn out it is a breaking change. We thought colors, we're like, as long as you have the contrast ratio, changing colors can't be a breaking change. Turns out, well, you don't really know what that component is on top of and depending on what that background color is.

Garth Braithwaite [00:38:11]:

Now all of a sudden you introduce an accessibility problem and that could feel like a breaking change because you're forcing them to have to make a change. So it's a hard one. It takes a lot of over communicating, I should say.

Christopher Bloom [00:38:21]:

You mentioned accessibility. What are y' all using to help manage this? To automatically test what are some tools kind of off the top of your head.

Garth Braithwaite [00:38:30]:

So we don't have any perfect solutions for everything. And some of them we built ourselves, but we built Leonardo, which is at Leonardocolor I.O. and this is an open source project that Nate Baldwin, one of Our designers that's worked at Spectrum for quite a while, he actually left and recently came back. He's been back for I think about a year. But he built Leonardo. It is a tool for generating color systems that have specific contrast ratios so you can input your constraints that you need for your color system. And it's very helpful when you have to do a lot of things. So we have like a data visualization library that needs to do a lot of charts and those have a lot of different colors that aren't really UI colors that we need.

Garth Braithwaite [00:39:14]:

They need to be somehow distinct. Like we have crazy color systems where you've got like Celery and some of them are great names, Coral. But you need these, like additional ones that the majority of UIs don't need, but they need to be distinct and they still need to have the same contrast ratio requirements to meet WCAG standards. So we do manage it that way. We work towards WCAG and then we have. If you go back and listen to the episode with Matt maybe and Vida, Matt is one of the accessibility advocates that we've had at Adobe. We've got a couple other and they work directly with. Again, it's just really nice to have the resources.

Garth Braithwaite [00:39:50]:

We're very fortunate. It always feels like we don't have enough resources, but at the same time we have a great many of resources that many teams starting out don't. So at this point, after eight years of hard work, we've grown it up to the point where we have these dedicated accessibility experts that we can ask any questions that we need to, and they work across Adobe and so we have to be respectful of their time. But for the most part, anytime we have any questions or making sure that we are hitting accessibility requirements, they're great resources. And then we have individual engineers who are super passionate and designers. But like, we have a project that Devin Govatt, who works on the REACT implementation, he built React ARIA with some other engineers and it's a fantastic project that is all around bringing in ARIA roles into REACT applications. And it's a fantastic project that engineers can use. And he built it in such a smart, generalized way that anytime I bring up, hey, I work on Spectrum, I'm an engineer, so many times I'll get engineers who are like, oh, did you work on React aria? Like, they don't care about Spectrum because they don't need it.

Garth Braithwaite [00:40:55]:

But React ARIA is generalized enough that any team could bring it in and use it and it's super helpful.

Christopher Bloom [00:41:01]:

What's amazing about React ARIA is it's so prevalent now that a lot of like starter kits out there, like, you know, next JS starter kits come with React ARIA just baked in. So there's an entire generation of developers that are getting lint warnings to include roles. Whereas, you know, I learned I had none of that context. Right. That wasn't something that was even part of the way that I coded. But now it is kind of the way a lot of new people are learning to do stuff from the start because of that library. That's amazing.

Garth Braithwaite [00:41:30]:

Yeah. And I will say like 100% kudos to the React Spectrum team. That includes Devin and Danny Robinson and Rob Snow and there's other engineers who work on it. But like that thing exists because of their dedication and their love of open source and React and accessibility. Like, that's 100% because they love it. I don't know if there's any business reason that any leader would really have recognized, hey, it would be really good if we, for strategic reasons, if we built this thing and everyone became reliant on it. Right? Like, that's not really the goal. So a lot of kudos to them for the work they put into that and continue to, because again, it's a fantastic project.

Garth Braithwaite [00:42:12]:

There's lots of people who do that across Adobe. But that's another thing that I would recommend is like, anytime you can share things in an open source fashion, again, being public helps force you to improve quality because you're realizing other people might use this or at least look at it. So how do we make this good enough for external use? And I feel like design systems are a particularly special place that you can do open source because nothing's really secret, unlike product features where you're like, I'm doing something special no one else can do. I'm just making css and anyone can already grab that, right? They can grab my CSS and JavaScript. So let's open source it and then they can actually see maybe the source code before we do some of the optimizations. Not because they want to steal it and look like Spectrum, but because they're like, I want to know what my starting point is. How do I make this easier to do? Then it has a couple of extra benefits. Like when we're recruiting, people will come to interviews and be like, oh yeah, I'm very familiar with React Spectrum.

Garth Braithwaite [00:43:09]:

I've been going through your code base. I built a couple of applications with it. And like starting a hiring process with somebody like a product engineer who already knows something about your engineering implementation, it's huge. So there's lots of benefits and there's very little downside. We were very worried at first that like, hey, we open sourced React Spectrum pretty early and also Spectrum CSS as its own project. And there were some concerns of. All your time is going to be with the governance of an open source project. You're going to have everyone making pull requests and wanting things.

Garth Braithwaite [00:43:39]:

And that hasn't been the case. Like maybe if you're building an design system that's design for a platform that people are building on, that would be one thing. But for the most part, most design systems, they're for internal use. There's very few people making pull requests or filing issues that are like, hey, you don't have the component that I wish you had from like some external thing. So the governance, it's a very low load, but you get all the benefits of working in the public. A lot of our engineers are very happy to be working in public GitHub and not having to be on the VPN just to work on their code. So there's lots of nice benefits to being open source where it makes sense.

Christopher Bloom [00:44:16]:

That's awesome. A little bit ago we talked and, you know, we kind of came up with Garth's front end manifesto. You gave me three bullet points and I've been, you know, I've thought about them a fair amount since I'm going to. I'm going to read these out. I want you to talk a little bit about each one of them because they really do show the lessons that you've learned from your time doing this. Right. And bullet point one on the manifesto is a design system is infrastructure. Number two is the purpose of a design system is to change and manage change.

Christopher Bloom [00:44:48]:

And three is you must build value for product owners. I think number three is going to sit really well with a lot of folks that listen to this podcast. Can you walk through those three for me?

Garth Braithwaite [00:44:58]:

Yeah. And I can't take credit for all of them. Everything that we've done, our team has very much grown together. We have some long standing people who have worked for a long time. But Sean Charis, who you have an episode with him talking about the way he thinks about Spectrum, he's the one that I first heard say design system is infrastructure. And thinking about it that way gives really good context and perspective on like the design system. It's really hard to get investment into it. It's like trying to ask a bunch of businesses to build roads.

Garth Braithwaite [00:45:28]:

It's hard because everyone wants the benefits of it. Nobody wants to Pay for it. And the same thing applies for a design system for an organization. If you could just have a turnkey design system that solves all your problems. And there's a lot of design systems out there that you can grab and use that way, but you find that you quickly scale outside of the benefits of grabbing an off the shelf one. But I don't fault anyone for starting at that point. But oftentimes, as you grow far enough, you're going to realize we have to build something custom, which means somebody's going to have to be building these roads, we all have to pay for it, and we have to constantly be showing the value. But there's so many good metaphors here.

Garth Braithwaite [00:46:03]:

It feels like being a public employee or a government worker where everyone wishes that it was cheaper and it was faster and it was better. Nobody really wants to pay taxes to make that happen. So trying to find, how do you get this to be done the best way? It really involves being open and transparent and being clear with what you're trying to accomplish, trying to find optimization so that you're not burdened by every little thing that anybody wants. And that also involves, like telling people, no, we can't build roads to Everybody's House Day 1. We have to start with the main thoroughfares and building the things that are most important. And then individual products might have to build the road to their house off of that until we have more systems, which, taking that metaphor not too far in practice, what that means is we can't be on the critical path for every single product. We have to tell some products, if you need that component, we might have it in Spectrum one day, but you need it for your release. You better go out and build it.

Garth Braithwaite [00:47:04]:

And we'll try and help you build it in the right way, but that's your responsibility. And we can't be everything for everyone. So that's number one. It's one of my favorite metaphors for a design system. Number two is related. The purpose of a design system is to change and manage those changes. Right now, we're going through a large change. We're building Spectrum 2, and we have some documentation about it publicly.

Garth Braithwaite [00:47:26]:

But it's a big shift for us in a lot of ways that we're thinking about things. But I have heard engineers say, like, why do you keep changing things? It would be really nice if you could just figure it out right from the beginning and then just plan to never change. But you'd be antiquated. You wouldn't meet needs. You're Just going to end up with problems if you're not planning for change from the beginning. So we were notorious for this. With Spectrum css we would realize that we have to re architect every single component to enable something. And then as soon as we were done going through and rearchitecting every single component, we'd realize it's time to do it again.

Garth Braithwaite [00:48:02]:

So it's like painting the Golden Gate Bridge, right? Like it's pretty much by the time you're done, you gotta start over again. Not exactly that way, but it does feel like that. So just plan that you're going to get it wrong. And some of that's freeing because that means I don't need to be perfect right now. I know I'm going to come back and change it anyway. So get it as close to what we need for today's needs. And then have in mind that I'm probably going to be the one who comes back and has to update this code. So I better write it in a way that makes sense to me and future generations.

Garth Braithwaite [00:48:33]:

But just plan on that and bake that into product engineers as well. Like the goal of a design system is not to take away the need for product engineers, especially front end engineers. This is just to provide resources. And that's the number three, which is you have to build value for product owners. I've been a part of lots of organizations that have tried to do design system like things, which really just means like we were trying to do a unified ui, but we were doing it by mandate, where we were telling people this is what you have to do. You have to use our tech stack, you have to do it the way that we tell you, you have to use these components. Culturally, some engineers just chafe at the idea of being told of what tech stack they have to use. And so they just kind of bypass those things.

Garth Braithwaite [00:49:15]:

We found people like building their own versions of things in different tech stacks that we weren't expecting. And rather than talk to us about it because they were worried they would get in trouble or be told to not do it, they would just try and do it silently. So that's dangerous because we just miss out. Everybody loses out on the benefit of a design system. So instead you can't be the design system police, you have to again be the infrastructure. You have to be there to provide value. We provide CSS was an early, easy place to provide value because we found a lot of our product engineers did not want to write the css. They were happy to hand that off to somebody else.

Garth Braithwaite [00:49:55]:

So similarly, we try to make like with our design tokens, we try to make it as easy as possible to read. We're not shipping it out as CSS and telling iOS good luck. We're trying to consume rc. You got to figure that out. We're writing it in JSON and we're trying to find universal ways and we're trying to make it as easy as possible. Because if we're making more work for them than value that we provide, they're just going to stop listening to us. And there is still some pressure from the top where, like with Spectrum 2 coming out, there still is some pressure from leadership to encourage products like, hey, you got to figure out how you're going to build this into your roadmap to bring in the breaking changes from spectrum 2. We benefit from that and I would say there's a place for that.

Garth Braithwaite [00:50:39]:

But we don't have any leadership, responsibility or dominion over any products. We can't tell them what to do. So if we're not making it appealing to them, they just won't use it.

Christopher Bloom [00:50:53]:

That's a unique position that y' all are in because, you know, you said something a little bit earlier about like being the design systems police, and I think a lot of people think about design systems being this just sort of arbiter of truth. Right. You will use this. There's anything outside of this, then it's bad and there's problems, you'll be punished and your situation is like you said it is. Here is value. We've made something that is useful and will save you time. Other teams, look what we made for you. Please use it.

Christopher Bloom [00:51:21]:

I think that's a thing that a lot of discussion around design systems doesn't communicate is that this is not about being necessarily like the design system police. Governance is a big word over here in design systems. Right. And I think governance often really means, like, getting teams to work together on this kind of stuff. Not telling them, you know, they have to do X, but you have to structure it right, so it's actually useful. Like you guys are doing.

Garth Braithwaite [00:51:47]:

Trying.

Christopher Bloom [00:51:49]:

Trying, Yep. What is some practical advice for teams that are starting out? We do a lot of webinars and a lot of people show up brand new and they're terrified. This is huge. They might be new to this. How should they start?

Garth Braithwaite [00:52:06]:

Yeah, some of it we touched on a little bit, but just the fact that people are trying, recognizing and giving grace to people who are just trying, nobody is going to get it perfect. And you have to also realize that, like if you're trying to do this, you're going to be collaborating with people with their own pressures and their own timelines and stresses. And what you might see as like a communication breakdown usually is a symptom of a bigger problem that is systemic, which is they're not mad at the design system. They're mad that they have requirements that they're not sure how they're going to meet. And that sometimes gets expressed as anger at the design system not having something. So those sorts of things can be hard. So you gotta kind of have a thick skin, realize that they're not attacking you personally, hopefully not. And that you're going to be wrong to start, but that it's better to do the wrong thing than to do nothing.

Garth Braithwaite [00:52:58]:

It's better to make the choice between good, better and best, rather than, I can't figure it out. So we probably just aren't going to do it. And you're going to have to probably rewrite things and there's going to be compromises where sometimes you're right, but your solution that you're proposing is not the one that's accepted by everybody. And that's frustrating. But design systems aren't hard to do. It's the people like having relationships that's really the hard part. And that feeds into the naming and that feeds into the versioning and the documentation. That's why those things are so important and why they become so hard is because you're dealing with people coming from different perspectives.

Garth Braithwaite [00:53:39]:

But that's also the strength. If we can figure out how to communicate, how we can collaborate, we make something better than any individual could possibly make. So start wherever you can. Don't look at the giant design systems and think that that's where you have to be. It's just not reasonable. And maybe, you know, down the line we'll have tooling that'll make it faster for teams to scale with smaller design system teams. That would be great because that would open this up to more people. But the state of things now, you just have to start with whatever makes the most sense to you and your teams that are consuming this data, whether that's a Google Doc or a completely custom database of design tokens that you are managing.

Garth Braithwaite [00:54:21]:

Like, start with whatever you can do with what you have and then figure out where you want to go, what would provide the most value and what it would take to get there, and then patiently work on that. That's a lesson that I have to keep learning. Like, I can't trust that someday I'll get more resources to accomplish something. I have to assume that I'm going to be working with what I've got now. And if anyone else shows up, that's great. But I can't say, oh, I can't work on doing it the right way because I don't have enough resources. Got to figure out how to do it the right way for what I have now.

Christopher Bloom [00:54:51]:

What is missing in design systems? Hey, we got a lot of tools, right? I'm one of, over here at NavSec, we're one of those tools. There's a lot of really, really great resources out there. What do you find that's missing?

Garth Braithwaite [00:55:04]:

What I feel is missing is engineers getting as excited or interested in what a design system can provide as our designers are. Designers really oftentimes are the ones leading the push to try to standardize some things, try to improve standards consistency that ends up turning into a design system. And engineers, oftentimes our front end engineers, just think of them as UI libraries. And they're more than that, they're different than that. It's a good starting place. But a design system grows to something more than just a UI library. So I think a big part of what we're missing is design system advocacy and culture of design system in the engineering community. And there's some people who are working on it who are trying.

Garth Braithwaite [00:55:51]:

But again, like even the community people that I think of when I think of design systems, oftentimes it's easier to talk about it from the design side because there's some universal concepts there that are a little bit easier to share. But like engineers, we understand open source. We really should be able to figure out how to share and collaborate and, you know, lose our ego a little bit and figure out how we can improve this community. I'd love to see it be more of a focus. I'd love to see more design system engineers. Engineers with that title at organizations. Heck, I'd love a principal engineer. I'd love to, to be close to like the chief product officer or the chief technology officer at companies.

Garth Braithwaite [00:56:28]:

I'd love to see more engineering realizing that, hey, if we provide some more of this infrastructure, it can improve things for everybody at the whole organization. So I feel like that's what's missing the most. But that's very biased towards what I would love to see personally.

Christopher Bloom [00:56:44]:

Last question for you. Where's all this going? What's the future trend here? Is AI going to revolutionize this? Is it going to do this for us? Can we automate this? Should it Be automated. What's your opinions there?

Garth Braithwaite [00:56:57]:

I think AI is a great tool to have in your tool belt. I feel like the same way, like I love it when designers learn how to code. Not because I'm thinking that they're going to code production level code, but because they have better appreciation and it's just one more tool in their tool belt. I have designers who are using AI to build Figma plugins and they're not production quality out of the box. At some point, if they did try to hand it over to like, hey, we need to make this production quality, this is going out to other people to use it would have some problems and we'd probably have to rewrite it. But if you treat it as they're building a prototype, if you can get AI to help you ideate, that's where AI is great is like, hey, let's generate something new and then I can look at it and get inspired from that. Maybe I don't use what it came up with because it's got too many fingers, but this gives me an idea of what I do actually want and helps me to communicate my vision. So I think AI has its place and as it gets better to be able to like create constraints where you'd be able to say, hey, use these components.

Garth Braithwaite [00:57:57]:

Here's my library or implementation of components from my design system implementation. It can get a little bit better at helping to build this UI within those constraints. But from what I've seen and what we've done, it's not quite there. It's just a good place to play around.

Christopher Bloom [00:58:12]:

Awesome. Well, thank you so, so much for your time. I really appreciate this. Where can we find you out on the Internet if people want to reach out? I don't know if you have public office hours quite yet, but where can we find you out there?

Garth Braithwaite [00:58:26]:

Yeah, I'll be honest, I'm a little bit lost. I used to be Twitter was the place and I would say that now I kind of just spend a lot less time on social media, so it is a little bit harder to get me. But I will say blue sky. I try to be on that one. GarthDB. I'm also GarthDB.com if you want to try emailing me. I'm kind of Garthy b everywhere. So LinkedIn probably actually LinkedIn is one of the better places if you want to just ping me with some questions.

Garth Braithwaite [00:58:52]:

But I do do some office hours, public office hours, and again, I don't charge for those because I'm not building anything for you. But I'M always happy to talk through things and we've had some great communications and collaborations with different design system teams and I'm better for it for chatting with different design system teams at different places and I can't provide how to solve all your problems and solutions, but maybe some hope that it can get better if you keep working at it. There is hope that things can improve, but definitely look@spectrum.adobe.com and there's an Adobe Design blog at adobe.design and there is less technical stuff on there. But if you're interested in how Adobe Design works, which is a team within Adobe and we actually also have job listings and stuff on there. So it's a great resource and it's a great website. So I would highly recommend checking out that website if you're interested.

Christopher Bloom [00:59:43]:

Thank you so much for your time. Really appreciate it. For everybody listening to the podcast, thank you for joining us. Appreciate your time as well and everybody have a great day.

Chris Strahl [00:59:53]:

Hey everyone, thanks for listening to another episode of the Design Systems Podcast. If you have any questions, topic suggestions, or want to share feedback, go ahead and reach out to us on LinkedIn. Our questions profile is linked in the Show Notes. As always, the podcast is brought to you by Knapsack. Check us out at Knapsack.cloud. Have a great day everyone.

![](https://cdn.prod.website-files.com/61826e16a7bbc9deb3c691c2/69725b097b4d5b647263e611_AI%20for%20Founders%20-%20Strah.jpeg)