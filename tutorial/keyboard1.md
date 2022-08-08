# How to build a Keyboard Trainer App from the scratch with HTML/CSS/JS/?vue. Step-by-step tutorial for very beginners

- [Initial idea and features](#initial-idea-and-features)
- [An idea for an educational project](#an-idea-for-an-educational-project)
- [Research on similar apps](#research-on-similar-apps)
- [Tutorial](#tutorial)
  - [Entry level](#entry-level)
  - [Manner](#manner)
  - [Contribute](#contribute)
  - [Contacts](#contacts)
  - [Tools](#tools)

## Initial idea and features

When my son was 1.5 years old I noticed that he enjoys playing with keyboard, and I thought: it would be good if he got more feedback from the laptop than hidden password symbols on Ubuntu lock screen, or text somewhere as in text editor.

The idea became more attractive after a news: “[Two kids found a screensaver bypass in Linux Mint](https://securityaffairs.co/wordpress/113518/hacking/screensaver-bypass-linux-mint.html)” -- it became dangerous to leave the child with Ubuntu lock screen (joking).

That's how I planned to code a screen keyboard with:

- event handler “on key down”
- popup-like animation for pressed key
- playing audio with its name
- switching between languages (English, Arabic, Russian)

## An idea for an educational project

After I made the app, I thought that it could be a good educational project because:

- it emulates a real world complex looking hardware -- and it is interesting to reproduce it as an app (digitalize it)
- it is easy to layout it with a basic HTML, CSS, JS
- it touches basic programming topics, like:
  - web app initialization
  - components approach (`App > SwitchLang, Keyboard > Key`)
  - passing parent state to children (via props)
  - change parent state from a child (via methods)
  - CSS flex and animation
  - user events handling (keyboard, click, tap)
  - playing sounds

I thought that `vue without build`[^vuewithoutbuild] will be a good stack for newbies because it hasn't overloading extra steps:

- terminal commands (install, run, build)
- side packages (dependencies)
- compiler, bundler settings etc

You just write components in separate files in a code editor, and they work together as an app.

But I insist that it is not a tutorial about `vue`. We just use `vue` a bit to organize code. This tutorial is about web (frontend) programming in general, because all ideas written above are common for any web app and framework.

This tutorial is also about programming thinking. How to:

- design an app (data model, components)
- make decisions how to develop code further
- improve code step by step

I hope that every newbie who follows this tutorial will feel the spirit of a programming. You will touch lots of concepts with depth enough to have known them, but not much to be overloaded. You'll see immediate feedback by the app after each code changing.

## Research on similar apps

As a smart person (I believe I am), before coding such an app, I did research to find something similar. And I didn’t find what I wanted. Most similar apps are:

- screen keyboards — allows you to type text without physical keyboard, by clicks/taps on the screen
- keyboard trainers — give predefined text you should type, and feedback — was your typing right or not. The process can be stopped if you type wrong.

None of these show/play additional info about pressed letters (as I know). They are apps to use keyboard in a new way, not to learn its content.

My idea was somewhere between these apps. I want informational app, to provide a user with info about a pressed key: how it looks, sounds and named.

## Tutorial

### Entry level

I'll try to explain every new thing we meet for the first time, so even the most beginner can figure out what happens in general and with details. If you feel interested about something touched in the tutorial but not covered in depth -- please google it.

Reference info for very beginners are placed in footnotes, to protect more experienced people from boring details.

If you are stuck with something, feel free to open issues with questions on GitHub [^github].

### Manner

At any step I write minimal possible parts of code, with description about what it does, and where to add or remove it. This is to save place on the screen, and keep your attention (to not distract you with a large old code fragments). So even if you copy/paste code [^copypaste], you should do that consciously. But if you faced some problems while working with pieces of code, you can always find the full code version of a chapter on the GitHub by a link at the end of the chapter.

Write your questions here in comments, I read them all.

### Contribute to Open Source

The tutorial and the app are open source [^opensource]. That means you can improve them (with me), or clone and use for your purposes. E.g. you can take this project and build upon it a real keyboard trainer for any language you are interested in.

I am sorry for grammar and spelling mistakes. I am not a native English speaker, so I would be happy to receive text improvements.

If you are a user of the app and want to expand it with additional keyboard layouts (languages) or app features -- share your ideas with me.

If you are a programmer -- pull requests are welcomed.

### Tools

1. Install code editor [VS Code](https://code.visualstudio.com/).
2. Install extension to it: `Live server`[^vscodeextension].
3. Install [Google Chrome](https://www.google.com/chrome/downloads/) browser -- to have guarantee that we are in the same environment end everything what we do are looking the same.

[Next >>>](./keyboard2.md)

[^github]: [GitHub](https://GitHub.com) is a web platform, where programmers publish their code with instructions how to use it, and work on projects together.
[^copypaste]: Copy/paste of code is not recommended by coding teachers. They say: it is good to type code, to understand it better.
[^opensource]: `Open source` means that: 1) a project has permissive license -- so you can use its content for free, share it, change it etc. 2) It is published on GitHub like platforms, and you can be a part of a community around the project: contribute to it, add improvements, open issues with questions, bug reports etc.
[^vuewithoutbuild]: I wrote an article about how I decided to use Vue for this project: [How I discovered an ideal stack for mastering HTML and CSS - Vue without build](https://dev.to/apayrus/how-i-discovered-an-ideal-stack-for-small-funny-web-projects-vue-without-build-3i46)
[^vscodeextension]: [How to install Visual Studio Code extensions](https://code.visualstudio.com/learn/get-started/extensions)
