---
title: keyboard1
---

# How to build Keyboard trainer app (html/css/js/?vue)

- [How to build Keyboard trainer app (html/css/js/?vue)](#how-to-build-keyboard-trainer-app-htmlcssjsvue)
  - [Initial idea and features](#initial-idea-and-features)
  - [Idea for an educational project](#idea-for-an-educational-project)
  - [Reserch on similar apps](#reserch-on-similar-apps)
  - [Tools](#tools)
  - [Basic HTML/CSS](#basic-htmlcss)
    - [Layout](#layout)
    - [index.html](#indexhtml)
    - [Key](#key)
    - [styles.css](#stylescss)
    - [Row](#row)
    - [Row with extra wide key](#row-with-extra-wide-key)
    - [Row with smaller keys](#row-with-smaller-keys)
    - [Language switcher](#language-switcher)
    - [Conclusion](#conclusion)

## Initial idea and features

When my son was 1.5 y.o. I noticed that he enjoy playing with keyboard, and I thought: it would be good if he get more feedback from the laptop than password hidden symbols on Ubuntu lock screen, or text somewhere as in text editor. The idea became more relevant after a news: “[Two kids found a screensaver bypass in Linux Mint](https://securityaffairs.co/wordpress/113518/hacking/screensaver-bypass-linux-mint.html)” -- it became dangerous to leave a child with Ubuntu lock sreen (joking).

That's how I planned to code a screen keyboard with:

- event handler “on key down”
- popup-like animation highlighting the letter itself and its place on the keyboard,
- playing sound with its name
- switching between languages (English, Arabic, Russian)

## Idea for an educational project

After I made the app, I thought that it can be a good educational project because:

- it emulates a real world complex looking hardware -- it is interesting to reproduce it as an app (digitalize it)
- it is easy to layout with a couple of HTML, CSS tricks
- it touches basic programming topics, like:
  - web app initialization
  - components approach (`App > SwitchLang, Keyboard > Key`)
  - pass parent state to child (via props)
  - change parent state from child (via methods)
  - CSS flex and animation
  - user events handling (keyboard, click, tap)
  - playing sound

I thought after all that `vue without build` will be a good stack for newbies because it hasn't:

- terminal commands (install, run, build)
- side packages (dependencies)
- compiler, bundler settings e.t.c.

You just write components in separate files in a code editor, and they work together as an app without extra steps.

## Reserch on similar apps

As a smart person (I hope I am), before coding such an app, I did a research to find something similar. And I didn’t find what I wanted. Most similar apps are:

- screen keyboards — allows you to type text without phisycal keybord, by clicks/taps on the screen
- keyboard trainers — give predefined text to type, and then give you feedback — did you type right or wrong, and can stop process if you type wrong symbols

Non of these shows/plays additional info about pressed letters (as I know). They are apps for using keyboard in a new way.

My idea was somewhere between these apps. I want informational app, to provide a user with info about pressed keys: how it looks, sounds and what is its official name.

## Tools

1. Install code editor VS Code.
2. Install extension to it: `Live server`. ([How to install Visual Studio Code extensions](https://code.visualstudio.com/learn/get-started/extensions))
3. Install Google Chrome browser

## Basic HTML/CSS

In this section we will code simple layout for 3 rows of 5 keys each, to understand: what parameters we should include into HTML and CSS to achieve a realistic view. We will use this test layout (3 rows, 15 keys) as a draft to design a data model and will scale it to the whole app (6 rows, 80 keys).

### Layout

Let's take a close look at the physical keyboard to understand its layout.

1. rows have different height (1st is smaller)
2. buttons

- are black rounded rectangles
- have 0-2 text slots (`1!` or `Q`)
- have different width (some of them)
- have the same height inside a row

![picture of a keyboard](https://i.imgur.com/oMRABlK.png)

### index.html

Make a folder for the project `keybord-trainer`, open it with VS code, and create a file `index.html`. Type `!` and press `Tab`, you will see a template for empty HTML5 document. Write inside `<body>` tag something like: “Hello world”, save the file (ctrl+s). And run the app with the Live server (mouse right button click on `index.html` —> Open with Live Server).

Place the code editor on the left side of the screen, and running app on the right side, so you can see immediately how code updates affect on the app.

![](https://i.imgur.com/uOhlIco.png)

### Key

Let’s write html code for one key:

```html
<div class="key">
	<div class="main">1</div>
	<div class="shifted">!</div>
</div>
```

And repeat it for a next four keys:

```html
<div class="key">
	<div class="main">`</div>
	<div class="shifted">~</div>
</div>
<div class="key">
	<div class="main">1</div>
	<div class="shifted">!</div>
</div>
<div class="key">
	<div class="main">2</div>
	<div class="shifted">@</div>
</div>
<div class="key">
	<div class="main">3</div>
	<div class="shifted">#</div>
</div>
<div class="key">
	<div class="main">4</div>
	<div class="shifted">$</div>
</div>
```

It becomes a plain text column:

```
`
1
!
2
@
3
#
4
$
```

It’s time to add some styling.

### styles.css

Create a file `styles.css` next to `index.html`.

Write in it style for our keys:

```css
.key {
	min-height: 3.4375rem;
	/*3.4375*16 = 55px (16px is default font size)*/
	background-color: black;
	color: white;
	padding: 0.5rem; /*spacing inside the button*/
	margin: 0.2rem; /*spacing outside the button*/
	border-radius: 0.2rem; /*rounded corners*/
	font-size: 1.5rem;
	cursor: pointer;
}
```

In `index.html` in the end of a `<head>` tag type “link” and press `tab`. There will appear import css code template. Then press `ctrl+space` and choose in the menu `styles.css`. Or, if you don’t like using shortcuts, just type this code:

```jsx
<link rel="stylesheet" href="styles.css">
```

Save all changed files `ctrl+k s` (or with other shortcuts, or save files separately by `ctrl+s`) and you should see the result:

![](https://i.imgur.com/ZomxeZM.png)

### Row

Wrap all keys in `index.html` with

```html
<div class="row">... here is keys code</div>
```

We need row style to wrap our keys. Add to `styles.css`:

```css
.row {
	display: flex;
	/* 
flex-direction: row; - default value
that's why or divs arranged in a row
*/
}
```

Save both files. And you will see the result:

![](https://i.imgur.com/MzTcj6s.png)

Keys have a minimal width. If we want them to take all available place in the row, we should add to `styles.css`:

```css
.key {
	...
	flex: 1;
	/*
	1 is proportion compared to other elements in a flex row
	if we set 2 for one of keys, it will be 2 times wider than other
	*/
}
```

Now the keys look more realistic:

![](https://i.imgur.com/3l4V4bx.png)

### Row with extra wide key

Lets add a second row with first 5 keys: Tab, Q, W, E, R. Copy all previous code from opening `<div class="row">` to `</div>` and paste it below. Then change text inside each `<div class="key">`:

```html
...
<div class="row">
	<div class="key">
		<div class="main">Tab</div>
		<div class="shifted"></div>
	</div>
	<div class="key">
		<div class="main">Q</div>
		<div class="shifted"></div>
	</div>
	<div class="key">
		<div class="main">W</div>
		<div class="shifted"></div>
	</div>
	<div class="key">
		<div class="main">E</div>
		<div class="shifted"></div>
	</div>
	<div class="key">
		<div class="main">R</div>
		<div class="shifted"></div>
	</div>
</div>
```

Maybe you’ve noticed, that these keys don’t have “shifted” values, and it’s ok, we leave related divs empty.

![](https://i.imgur.com/G2zOhkp.png)

`Tab` key should have extra width compared to other keys in a row. We need to specify it somehow in `html` and `css`.

index.html

```html
<div class="key Tab">...</div>
```

styles.css

```css
.key.Tab {
	flex: 1.3;
}
```

### Row with smaller keys

Actually in the keyboard this row is first. But it is third inside our working process.

Copy the first row with all code inside it, and paste it above the first row. Then rewrite content of keys to: Esc, F1, F2, F3, F4, F5.

![](https://i.imgur.com/QZwiZXm.png)

1st row should have smaller keys than other rows. It means that we need to specify row number in every `<div class="row">`

index.html:

```html
<div class="row row-1">...</div>
<div class="row row-2">...</div>
<div class="row row-3">...</div>
```

styles.css

```css
.row-1 .key {
	height: 1rem;
	min-height: 1rem;
	font-size: 0.7rem;
}
```

![](https://i.imgur.com/wRpIHqo.png)

### Language switcher

It will be 3 rounds with language codes. One of them is active (red background).

index.html

```html
<div class="langSwitcher">
	<div class="lang active">en</div>
	<div class="lang">ru</div>
	<div class="lang">ar</div>
</div>
```

To get round we need a div with equal width and height (square) 2rem, and border-radius with half of width/height. Cursor pointer (a hand), and opacity changing on hover invites the user to click the element.

styles.css

```css
.lang {
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
	cursor: pointer;
}

.lang:hover {
	opacity: 0.7;
}

.langSwitcher .active {
	background-color: red;
	color: white;
}
```

![](https://i.imgur.com/efh3mky.png)

To place lang code in center of the round (vertically and horizontally), add styles:

```css
.lang {
...
	display: flex;
	align-items: center;
	justify-content: center;
}
```

![](https://i.imgur.com/PWBsIgw.png)

To display lang switcher as a row and center it on the page, add styles:

```css
.langSwitcher {
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
}
```

![](https://i.imgur.com/6uoiwPr.png)

Congratulations. We have made almost all html/css layout for our app. Now we know, that we need to specify:

- row number, to style row keys
- key name, to style key extra width
- active language in a lang switcher

### Conclusion

Now we have 3 rows and 16 buttons, and it is already a 90 line HTML file. If we add all 6 rows and 80 buttons, it will be about a 500 line HTML file for 1 language. Our code becomes messy and not understandable. Also we want to add another languages.

To make code clear, modular, and maintainable, we should split our app into **data** and **view**.

What we have now is an unorganized `view` and `data` mixed together.
