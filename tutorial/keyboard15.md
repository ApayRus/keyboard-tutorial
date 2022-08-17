## Extending app

How to think right when you want to extend your app with new functionality?

When you organized app well, with good intuitive naming and logical separated modules -- it is easy to extend your app and use it in different ways.

Imagine, that we have an idea to animate spelling of a word with our keyboard. The word will be sent by link, like: https://keyboard.apayrus.cc/?spell=Hello.

We should reproduce all user actions with the app by a text parameter "Hello".

First we should set task in terms of our app.

When a user opens and clicks/presses on keyboard, there are 3 parameters necessary to activate and play a symbol:

- language
- shift position
- key code

Language and key code defines particular key content, and audio folder. Shift defines particular symbol and audio file from key content.

`lang` + `key code` = `key content`

`key content` + `shift` + `lang` =

- a place on the keyboard and a symbol to popup
- audio file to play

We need to provide the app with all these initial data from a link with a word we want to spell.

`key code` and `shift` can be extracted from a letter itself (`h` or `H`). For our case with 3 langs we could also get `lang` from letters, but the same alphabet can be used for different languages, with different letter names. So it is better to put language as a parameter to the link : `address.com/?spell=Hello&lang=en`.

While writing this I came up with an idea of a function, that will generate array with all data needed to activate and play letters from the link param `spell`.

```js

```

### Contribute to Open Source

The tutorial and the app are open source [^opensource]. That means you can improve them (with me), or clone and use for your purposes. E.g. you can take this project and build upon it a real keyboard trainer for any language you are interested in.

I am sorry for grammar and spelling mistakes. I am not a native English speaker, so I would be happy to receive text improvements.

If you are a user of the app and want to expand it with additional keyboard layouts (languages) or app features -- share your ideas with me.

If you are a programmer -- pull requests are welcomed.
