---
title: keyboard4
---

- [Interactivity (refactor `LangSwitcher`)](#interactivity-refactor-langswitcher)
  - [Reactive state, @click event, calling method](#reactive-state-click-event-calling-method)
  - [Conditional styling](#conditional-styling)
  - [Change parent state from a child](#change-parent-state-from-a-child)
  - [Switching keyboards (languages)](#switching-keyboards-languages)
    - [Another languages data](#another-languages-data)
    - [Dynamic import for `keyboardData`](#dynamic-import-for-keyboarddata)
  - [`Keydown` event handling](#keydown-event-handling)
    - [`activeKey` state](#activekey-state)
    - [Operational System (OS) language](#operational-system-os-language)
    - [Active key styling](#active-key-styling)
    - [Fade active key after a while](#fade-active-key-after-a-while)
    - [Set activeKey by click](#set-activekey-by-click)
      - [Method](#method)
      - [Event](#event)
      - [The key full info](#the-key-full-info)
      - [Move `shiftKey` to state](#move-shiftkey-to-state)
      - [Holding `shift` style](#holding-shift-style)
      - [CSS animation (color)](#css-animation-color)
      - [Conditional rendering `v-if`](#conditional-rendering-v-if)
      - [Additional keyframe (0% 30% 100%)](#additional-keyframe-0-30-100)
      - [Animated resize (transform)](#animated-resize-transform)
      - [The value of the pressed key](#the-value-of-the-pressed-key)
  - [Play audio](#play-audio)
    - [Prepare audio files](#prepare-audio-files)
    - [HTML5 audio element](#html5-audio-element)
    - [Data model extension](#data-model-extension)
    - [Testing getAudioFileName](#testing-getaudiofilename)
    - [Dynamic audio playing](#dynamic-audio-playing)
    - [Keyboard layout: global and local parts](#keyboard-layout-global-and-local-parts)
      - [Fallback `keyboardData.en`](#fallback-keyboarddataen)
      - [Method `playKey`](#method-playkey)

## Interactivity (refactor `LangSwitcher`)

Interactivity it is when a user interacts with an app, and see results.

Our app should handle user generated events.

### Reactive state, @click event, calling method

When we change a component variable value (state), and it causes change in a visible app (view), it is called **reactive state**. Reactivity means connection between component variables and view.

- In `vue` such **reactive variables** should be placed in the method `data()`.
- The most common approach to change them — by **methods**.
- Methods are called from **event listeners** placed in a template (e.g. `@click`).

Let’s we add to `LangSwitcher`:

- a method `data()` with a returned property (state) `currentLang: 'en'` (‘en’ as default)
- a property `methods` with a new method `switchLang(lang)`
- in the template
  - a new event handler @click to element `<div class="lang">`
  - a new `div` to display reactive variable `currentLang`. It is temporary, after testing we’ll delete it.

LangSwitcher.js

```jsx
const LangSwitcher = {
	template: `
	<div class="langSwitcher">
		<div 
			v-for="lang in langs" 
			class="lang"
			@click="switchLang(lang)"
		>
			{{lang}}
		</div>
    </div>
	<div style="text-align: center;">
		{{currentLang}}
	</div>`,
	props: {
		langs: Array
	},
	data() {
		return {
			currentLang: 'en'
		}
	},
	methods: {
		switchLang(lang) {
			this.currentLang = lang
		}
	}
}

export default LangSwitcher
```

`@click="switchLang(lang)"` -- by clicking on an element where it placed (`<div class=”lang”>`) will be called method `switchLang` with a parameter `lang` particular to each `<div>` and can be ‘en’, ‘ru’, ‘ar’.

That’s how **a user input (click) on dynamic generated elements changes a reactive state**.

Result:

![](./images/7rwpUuG.gif)

You see that after a click on a lang code, component `currentLang` state changes in the `div` below.

### Conditional styling

Instead of the `currentLang` text we need a red round background under the active lang.

Conditional styling it is when we apply some styling to an element, only if a condition is true.

`:class='["lang", {active: currentLang === lang}]'` this string will do all work for us.

1-st element in the array is a string, that means that the class `lang` will be attached to `<div>` in any case (without condition).

2-nd element is an object like `{styleName: booleanCondition}`. Class `active` will be attached to `<div class="lang">` only if the prop `lang` of the element is equal to the state `currentLang`.

In `styles.css` we defined before:

```css
.lang {
	width: 2rem;
	height: 2rem;
	border-radius: 1rem;
	...;
}

.langSwitcher .active {
	background-color: red;
	color: white;
}
```

That’s why the red round follows our clicks on lang codes — because of attaching and detaching the class `active`.

Result:

![](./images/w9ZNbnz.gif)

### Change parent state from a child

Another important approach to share data between components — is changing parent state from a child. It is kinda opposite to passing props from parent to child.

- In a parent we create a reactive state and a method to change it
- we pass this method to child as a prop
- we call it (with params) from the child

When you call a method received from a prop, notice that actually it happens where it was defined.

If the parent state was passed as a prop to multiple components, if we change this state (from any child, by method received as a prop) — then all components with this state (as prop) will be updated. That is how a little child component from hierarchy bottom can globally affect on the whole app — by calling a method, that changes parent state.

In a small apps as our, it is common to have reactive state and main logic in the top level component as `<App>` and pass the state and methods to children (`<Keyboard>`, `<LangSwitcher>`) as props.

For now `currentLang` is placed in `<LangSwitcher>`. But we need this value also in `<Keyboard>` and `<Key>`.

`<LangSwitcher>` and `<Keyboard>` are siblings, they haven’t parent-child relations, but have common parent. So, to share the state `currentLang` between siblings, we should lift it up to the common ancestor `<App>`.

Let’s we move state `currentLang` and method `switchLang` from `<LangSwitcher>` to `<App>` and then pass them as props to `<LangSwitcher>` and use them there.

Open `LangSwitcher.js` and remove `data()` and `methods`. Add to props: `currentLang`, `switchLang`.

```javascript
const LangSwitcher = {
	template: `
	<div class="langSwitcher">
		<div 
			v-for="lang in langs" 
			:class='["lang", {active: currentLang === lang}]'
			@click="switchLang(lang)"
		>
			{{lang}}
		</div>
	</div>`,
	props: {
		langs: Array,
		/* add: */
		currentLang: String,
		switchLang: Function
	}
	/* delete: 
	data() {
		return {
			currentLang: 'en'
		}
	},
	methods: {
		switchLang(lang) {
			this.currentLang = lang
		}
	} 
	*/
}

export default LangSwitcher
```

Open `App.js`. Add to `data()` a new state `currentLang: 'en'`. Paste whole `methods` from old `LangSwitcher.js`.

In the `template`

- pass to `<vue-lang-switcher>` 2 new props: `switchLang` and `currentLang`
- add `{{currentLang}}` to test our changes.

App.js

```javascript
import Keyboard from './components/Keyboard.js'
import LangSwitcher from './components/LangSwitcher.js'

const App = {
	template: `App-{{currentLang}}
	<vue-lang-switcher 
		:langs="langs" 
		:switchLang="switchLang" 
		:currentLang="currentLang" 
	/>
	<vue-keyboard />
	`,
	components: {
		'vue-lang-switcher': LangSwitcher,
		'vue-keyboard': Keyboard
	},
	mounted() {
		import(`./keyboardData/en.js`).then(result => {
			const { default: keyboardData } = result
			this.keyboardData = keyboardData
		})
	},
	data() {
		return {
			langs: ['en', 'ru', 'ar'],
			/* add: */
			currentLang: 'en'
		}
	},
	/* add: */
	methods: {
		switchLang(lang) {
			this.currentLang = lang
		}
	}
}

export default App
```

Result:

![](./images/JJw7bBO.gif)

Notice, when we do something in `LangSwitcher` it changes `App` state. We change the parent state from the child with the method that we passed from the parent to the child as a prop.

### Switching keyboards (languages)

#### Another languages data

Open a folder `keyboardData`. Copy and paste there a file `en.js` twice. Rename clones to `ru.js` and `ar.js`. Change a content (copy from here or type).

ru.js

```javascript
const keyboard = [
	[
		{ code: 'Escape', label: 'Esc' },
		{ code: 'F1' },
		{ code: 'F2' },
		{ code: 'F3' },
		{ code: 'F4' },
		{ code: 'F5' },
		{ code: 'F6' }
	],
	[
		{
			code: 'Backquote',
			main: 'ё',
			shifted: 'Ё'
		},
		{
			code: 'Digit1',
			main: '1',
			shifted: '!'
		},
		{
			code: 'Digit2',
			main: '2',
			shifted: '"'
		},
		{
			code: 'Digit3',
			main: '3',
			shifted: '№'
		},
		{
			code: 'Digit4',
			main: '4',
			shifted: ';'
		},
		{
			code: 'Digit5',
			main: '5',
			shifted: '%'
		}
	],
	[
		{ code: 'Tab' },
		{
			code: 'KeyQ',
			main: 'й',
			shifted: 'Й'
		},
		{
			code: 'KeyW',
			main: 'ц',
			shifted: 'Ц'
		},
		{
			code: 'KeyE',
			main: 'у',
			shifted: 'У'
		},
		{
			code: 'KeyR',
			main: 'к',
			shifted: 'К'
		}
	]
]

export default keyboard
```

ar.js

```javascript
const keyboard = [
	[
		{ code: 'Escape', label: 'Esc' },
		{ code: 'F1' },
		{ code: 'F2' },
		{ code: 'F3' },
		{ code: 'F4' },
		{ code: 'F5' },
		{ code: 'F6' }
	],
	[
		{
			code: 'Backquote',
			main: '٫',
			shifted: '٬'
		},
		{
			code: 'Digit1',
			main: '١',
			shifted: '!'
		},
		{
			code: 'Digit2',
			main: '٢',
			shifted: '@'
		},
		{
			code: 'Digit3',
			main: '٣',
			shifted: '#'
		},
		{
			code: 'Digit4',
			main: '٤',
			shifted: '$'
		},
		{
			code: 'Digit5',
			main: '٥',
			shifted: '٪'
		}
	],
	[
		{ code: 'Tab' },
		{
			code: 'KeyQ',
			main: 'ض',
			shifted: 'َ'
		},
		{
			code: 'KeyW',
			main: 'ص',
			shifted: 'ً'
		},
		{
			code: 'KeyE',
			main: 'ث',
			shifted: 'ُ'
		},
		{
			code: 'KeyR',
			main: 'ق',
			shifted: 'ٌ'
		}
	]
]

export default keyboard
```

Arabic diacritic symbols aren't looking good in the code. But don't worry about it. It will work well for our purposes.

#### Dynamic import for `keyboardData`

In App.js pass `currentLang` to `Keyboard`.

App.js template

```html
<vue-keyboard :currentLang="currentLang" />
```

In `Keyboard.js`:

- receive the new prop
- watch its changes
- add a new method `getKeyboardData`
- call `getKeyboardData` on `mounted()` and if prop `currentLang` changed

Keyboard.js

```js
import Key from './Key.js'

const Keyboard = {
	template: `
  <div class="keyboard">
		<div
			v-for="(row, index) in keyboardData"
			:class="['row', 'row-'+(index+1)]"
		>
			<vue-key
				v-for="keyContent in row"
				:keyContent="keyContent"
			/>
		</div>
  </div>
`,
	components: {
		'vue-key': Key
	},
	data() {
		return { keyboardData: [] }
	},
	/* receive a new prop  */
	props: {
		currentLang: String
	},
	watch: {
		/* add function, that will be called when prop changes */
		currentLang: function (currentLang) {
			this.getKeyboardData(currentLang)
		}
	},
	/* happens when app opened for the first time */
	mounted() {
		this.getKeyboardData(currentLang)
	},
	methods: {
		async getKeyboardData(lang) {
			const { default: keyboardData } = await import(
				`../keyboardData/${lang}.js`
			)
			this.keyboardData = keyboardData
		}
	}
}

export default Keyboard
```

If you noticed `async/await` in the method `getKeyboardData` -- that is an alternative syntax for promises. This code is asynchronous, because reading of a file takes time and we should wait for result to move further through our scenario.

Result:

![](./images/4q6JLOq.gif)

With a few lines of code we achieved a big improvement of functionality. That is because we organized code well: in a modular way, with an intuitive props, methods, and structure.

### `Keydown` event handling

In the file `Keyboard.js` add to `mounted()` an event listener on `keydown`:

```javascript
	mounted() {
		this.getKeyboardData(this.currentLang)

		/* add: */
		window.addEventListener('keydown', event => {
			e.preventDefault()
			console.log(event)
		})
	},
```

Save the file. Click with mouse on the app to make the window active to catch events from it.

Open Chrome dev tools tab `console`, and look at events. They will appear in a console when you press buttons on a keyboard.

![events in a console when pressed a, b, c](./images/TSBDyeI.gif)

Experiment with different keys and see result. Expand `KeyboardEvent` and look at its properties. We need only 3 of them: `code`, `key`, and `shiftKey`.

Close console (Dev tools).

#### `activeKey` state

In `Keyboard.js`, add a new state `activeKey`. It will be filled by `event` with `{ code, key, shiftKey }`. Add to template `activeKey` to see how it changes.

Keyboard.js

```js
import Key from './Key.js'

const Keyboard = {
	template: `
	<div>activeKey: {{activeKey}}</div>
	<div class="keyboard">
		<div
			v-for="(row, index) in keyboardData"
			:class="['row', 'row-'+(index+1)]"
		>
			<vue-key
				v-for="keyContent in row"
				:keyContent="keyContent"
			/>
		</div>
	</div>`,
	components: {
		'vue-key': Key
	},
	data() {
		return {
			keyboardData: [],
			/* add: */
			activeKey: { code: '' }
		}
	},
	props: {
		currentLang: String
	},
	watch: {
		currentLang: function (currentLang) {
			this.getKeyboardData(currentLang)
		}
	},
	mounted() {
		this.getKeyboardData(this.currentLang)

		window.addEventListener('keydown', event => {
			event.preventDefault()
			/* add: (read particular props of event) */
			const { code, key, shiftKey } = event
			/* write event parts to the state: */
			this.activeKey = { code, key, shiftKey }
		})
	},

	methods: {
		async getKeyboardData(lang) {
			const { default: keyboardData } = await import(
				`../keyboardData/${lang}.js`
			)
			this.keyboardData = keyboardData
		}
	}
}

export default Keyboard
```

Press `q, w` in all lang layouts (`en`, `ru`, `ar`).

Result:

![](./images/T2ju0Ig.gif)

#### Operational System (OS) language

You see, that the same events happen with any `currentLang`. That's because our web app state is not connected with OS language (for keyboard). And there is no technical ability to do that.

If a user switches a language in OS (alt+shift, ctrl+shift), an event property `key` will be different, but our app will not know what language is set in OS.

Anyway `code` is always the same. That's why we made it the required identifier in the `data model`.

#### Active key styling

Open `styles.css` and add after `.key` style:

```css
.key.active {
	background: red;
}
```

In `Keyboard.js` pass state `activeKey` as a prop to `Key`. And warn the `Key` about the new prop.

Keyboard.js template:

```html
<vue-key ... :activeKey="activeKey" />
```

Key.js props:

```js
props: {
	...
	activeKey: Object,
}
```

Now we can use `activeKey` inside the `Key` component to apply conditional styling to one of the keys (active one).

Key.js template:

replace

```html
<div class="key">...</div>
```

with:

```html
<div
	:class="[
				'key', 
				{active: activeKey.code === keyContent.code}
			]"
>
	...
</div>
```

Now `:class` is dynamic (calculated, variable).

Style `key` applied to a button in any case.

Style `active` applied only if button's `code` is the same as the code of the `activeKey`.

Result:

![](./images/Peek%202022-06-15%2015-16.gif)

It works with any language.

#### Fade active key after a while

There is a problem. If we press a button, and then don't press anything, `activeKey` stays forever. But we want it to fade after a while.

In `Keyboard.js` in `addEventListener`:

after

```javascript
this.activeKey = { code, key, shiftKey }
```

add

```javascript
setTimeout(() => (this.activeKey = { code: '' }), 1000)
```

That means, that after 1000 milliseconds (1 sec), `activeState` will be cleared.

Result:

![](./images/Peek%202022-06-15%2015-36.gif)

Looking good, the active key automatically disappears after 1 sec.

But there is another problem. When we type fast several keys in 1 sec, only one timer works, that started after pressing the first button. If we type `1, 2, 3, 4, 5` in 900 milliseconds , `5` will disappear after 100 milliseconds, which is incorrect.

![](./images/Peek%202022-06-15%2015-44.gif)

We respect `5` and will give to it the whole 1 second. To do that we need to store a particular `timeout` when key pressed, and if another key is pressed before timeout ended, we'll clear old `timeout` and create a new one. That will guarantee 1 sec for any key.

App.js

replace

```js
setTimeout(() => (this.activeKey = { code: '' }), 1000)
```

with

```javascript
/* if there was old timeout, we clear it*/
clearTimeout(this.timeout)
/* store a new timeout for the last pressed key */
this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
```

Now `5` also has 1 sec to show itself to the world:

![](./images/Peek%202022-06-15%2015-54.gif)

#### Set activeKey by click

Some people doesn't have a physical keyboard, but only a screen one. And they also want to learn letters with our cool app.

To add `@click` event to `Key` we need to encapsulate activating of a key into a method.

##### Method

Keyboard.js methods:

```js
setActiveKey(keyContent) {
	this.activeKey = keyContent
	clearTimeout(this.timeout)
	this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
}
```

And call this new method from `mounted()`

Keyboard.js

```js
mounted() {
	this.getKeyboardData(this.currentLang)

	window.addEventListener('keydown', event => {
		event.preventDefault()
		const { code, key, shiftKey } = event
		this.setActiveKey({ code, key, shiftKey })
	})
},
```

##### Event

Send a new method `setActiveKey` from the `Keyboard` to the `Key`:

Keyboard.js template:

```html
<vue-keyboard ... :setActiveKey="setActiveKey" />
```

Key.js props:

```js
props: {
	...,
	setActiveKey: Function
}
```

Now we see, that key became active also by mouse click (or tap from phone).

![](./images/Peek%202022-06-15%2020-15.gif)

##### The key full info

On the previous gif animation you can notice, that `activeKey` is different for `keydown` and `@click`. E.g. for russian Й:

activeKey on keydown: `{ code: KeyQ, shiftKey: false }`

activeKey on @click: `{ code: KeyQ, main: "й", shifted:"Й" }`

That's because on `keydown` we assign to the `activeKey` an object `{code, shiftKey}` that we get from event.

And on `@click` we set `activeKey` from our data `keyboardData/lang.js` -- which we filled with useful data before.

In `Key` component it is easy to get this data by `@click` -- it is a prop `keyContent`. But `keydown` event doesn't contain these data.

In `Keyboard` component we can extract key full info from `keyboardData` by event `code`.

Keyboard.js mounted()

```js
...
window.addEventListener('keydown', event => {
	event.preventDefault()
	const { code, shiftKey } = event
	const keyContent = this.keyboardData
		.flat()
		.find(elem => elem.code === code)
	this.setActiveKey(keyContent)
})
...
```

`keyboardData` is 2D array (array with arrays). So we did it flat -- 1D, and find key full info by `code`. Then pass it to the method `setActiveKey`.

You can test it out: `keydown` and `@click` now returns almost the same value.

##### Move `shiftKey` to state

For now we get `shiftKey` only with `keydown`. And there is no way to get `shiftKey` on `@click`. To make `keydown` and `@click` events equivalent, lets create a new keyboard state: `shiftKey`. So we'll have the ability to get and change it on mouse/tap events, not only with keyboard on `keydown`.

Add to the end of each `keyboardData/lang.js` a new row with 2 buttons:

en.js, ru.js, ar.js

```js
, [
	{
		code: 'ShiftLeft',
		label: 'Shift'
	},
	{
		code: 'ShiftRight',
		label: 'Shift'
	}
]
```

Result

![](./images/Peek%202022-06-15%2021-09.gif)

Add a new state to

Keyboard.js data()

```js
{
	...
	shiftKey: false
}
```

Add 2 keyboard event listeners, that change the app state

Keyboard.js mounted()

```js
...
window.addEventListener('keydown', event => {
	if (event.key === 'Shift') {
		this.shiftKey = true
	}
})

window.addEventListener('keyup', event => {
	if (event.key === 'Shift') {
		this.shiftKey = false
	}
})
```

Add `shiftKey` state to template, to test how it works

Keyboard.js template

```html
...
<div>shiftKey: {{shiftKey}}</div>
...
```

Result

![](./images/Peek%202022-06-15%2021-29.gif)

When we hold `shift` on keyboard, state `shiftKey` is `true` even when `activeKey` faded. When we `@click` `shift` by mouse, `shiftKey` is false, even when `activeKey` shows to us `shift` as active.

We can't hold shift on the screen as on physical keyboard. So we need to set `shiftKey` by click on the screen button, and the app will think that we hold `shift` key. On the second click the app will think, that we released the button.

For that, in Keyboard.js add a new method `toggleShiftKey` and pass it down to `Key`

Keyboard.js methods:

```js
toggleShiftKey(){
	this.shiftKey = !this.shiftKey
}
```

Keyboard.js template

```html
<vue-key ... :toggleShiftKey="toggleShiftKey" />
```

Key.js props

```js
{
	...
	toggleShiftKey: Function
}
```

`@click` will call multiple methods, not one like before. So we need to create an additional method calling all these methods. And call it from the template `@click`.

Key.js methods

```js
methods: {
	keyClick(keyContent) {
		this.setActiveKey(keyContent)
		if (keyContent.code.includes('Shift')) {
			this.toggleShiftKey()
		}
	}
}

In Key.js template replace `@click="setActiveKey(keyContent)"` with `@click="keyClick(keyContent)"`

```

Key.js template

```html
<div
	:class="['key', {active: activeKey.code === keyContent.code}]"
	@click="keyClick(keyContent)"
>
	<div class="main">{{main}}</div>
	<div class="shifted">{{shifted}}</div>
</div>
```

Result

![](./images/Peek%202022-06-16%2001-06.gif)

`shiftKey` state works fine with `keydown` and `@click`. But we don'w see it on the keyboard.

##### Holding `shift` style

Add to `styles.css` an especial style for pressed (not released) `shift` buttons.

styles.css

```css
.key.shiftKeyPressed {
	color: red;
}
```

To do that we need in the `Key` component the prop `shiftKey`. Pass it from `Keyboard` to `Key`

Keyboard.js template

```html
<vue-key ... :shiftKey="shiftKey" />
```

Key.js props

```js
props: {
	...
	shiftKey: Boolean,
},
```

Add to `computed` 2 methods:

Key.js computed

```js
isActive() {
	return this.activeKey.code === this.keyContent.code
},
isShift() {
	return this.keyContent.code.includes('Shift')
}
```

Then use these new computed values in a template:

Key.js template

```html
<div
	:class="[
				'key', 
				keyContent.code, 
				{ active: isActive }, 
				{ shiftKeyPressed: isShift && shiftKey && !isActive }
			]"
	@click="keyClick(keyContent)"
></div>
```

Style `shiftKeyPressed` will be applied to key only if:

- it is `shift` key (with code: ShiftLeft or ShiftRight),
- keyboard state `shiftKey: true` -- the key is holding,
- key is not active

Result

![](./images/Peek%202022-06-16%2002-40.gif)

##### CSS animation (color)

We are making the app for our children first. Let's make the active key appearance more attractive, to get better educational effect.

In `styles.css` create `pulse` animation. And replace `background-color` with it in `.key.active`.

styles.css

```css
.key.active {
	/* background-color: red; */
	animation: pulse 1s;
	position: relative;
}

@keyframes pulse {
	0% {
		background-color: black;
	}
	100% {
		background-color: red;
	}
}
```

Result

![](./images/Peek%202022-06-16%2014-58.gif)

Now `background-color` changes smoothly. `@keyframes` shows how style properties changes over time. In our case from `black` to `red` in 1 second.

You can try to add to `@keyframes` also size change (`width`, `height`).

```css
@keyframes pulse {
	0% {
		background-color: black;
		width: 100%;
		height: 100%;
	}
	100% {
		width: 150%;
		height: 150%;
		background-color: red;
	}
}
```

And you will see, that it doesn't work. That's because `Key`s are displayed inside `flex` container.

##### Conditional rendering `v-if`

To achieve more freedom to animate active key size, we need a new independent element over old active `key`. We will display it only when key is active.

To show one element over another, the first one should be with style `position: relative` and thie second one with `position: absolute`.

styles.css

```css
.key {
  ... position: relative;
}

.key.active {
  animation: pulse 1s;
  position: absolute;
  z-index: 2;
}
```

`z-index:2` means that element will be displayed over elements with `z-index:1` (default).

Add to `Key` template conditional rendered element (active key).

Key.js template

```html
<div
	:class="[
				'key', 
				keyContent.code, 
				{ shiftKeyPressed: isShift && shiftKey && !isActive }
			]"
	@click="keyClick(keyContent)"
>
	<!-- add: -->
	<div v-if="isActive" :class="['key', 'active', keyContent.code]">
		<div>{{main}}</div>
		<div>{{shifted}}</div>
	</div>
	<div class="main">{{main}}</div>
	<div class="shifted">{{shifted}}</div>
</div>
```

Result

![](./images/Peek%202022-06-16%2016-46.gif)

##### Additional keyframe (0% 30% 100%)

Now animated resizing works. But it is too slow. Let's make resizing 3 times faster, and color pulse leave as it is. We need an additional keyframe for that.

styles.css

```css
@keyframes pulse {
	0% {
		background-color: black;
		width: 100%;
		height: 100%;
	}
	/* add: */
	30% {
		width: 150%;
		height: 150%;
	}
	100% {
		background-color: red;
		width: 150%;
		height: 150%;
	}
}
```

Result

![](./images/Peek%202022-06-16%2016-52.gif)

Now resizing happens in 30% of 1 sec, and color pulsation in 100% of 1 sec.

##### Animated resize (transform)

Instead of `width/height` changing, lets we use another css prop `transform`.

styles.css

```css
.key.active {
	animation: pulse 1s;
	/* position (4 lines) : */
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;

	width: 100%;
	height: 100%;

	/* to compensate .key style: */
	padding: -0.5rem;
	margin: -0.2rem;

	/* to center content vertically and horizontally: */
	display: flex;
	align-items: center;
	justify-content: center;

	transform-origin: center;
}

@keyframes pulse {
	0% {
		background-color: black;
		transform: scale(100%);
	}
	30% {
		transform: scale(130%);
	}
	80% {
		transform: scale(130%);
	}
	100% {
		background-color: red;
		transform: scale(100%);
	}
}
```

Result

![](./images/Peek%202022-06-16%2018-27.gif)

Now it looks better, isn't it?

##### The value of the pressed key

When key contains 2 values: `main` and `shifted` we don't want to activate both of them. Because we will sound each of them separately.

Let's create a new `computed` value, that returns only 1 value for active key:

Key.js computed

```js
value() {
	const { main, shifted, code } = this.keyContent
	return (this.shiftKey ? shifted : main) || code
}

```

If `shiftKey` is true (holding) value is `shifted`, otherwise value is `main`. If value doesn't exist we return `code`.

Put this value to the template:

Key.js template

```html
<div v-if="isActive" :class="['key', 'active', keyContent.code]">
	<div>{{value}}</div>
</div>
```

Result

![](./images/Peek%202022-06-16%2018-59.gif)

Now we see only 1 value in the active box, which is correct. This is especially important since we want to sound all keyboard symbols.

### Play audio

#### Prepare audio files

We will use a short files for each key/value. If you haven't them yet, and didn't split files before, I highly recommend free audio editor `Audacity`. There you can select part of the audio and attach label to it `ctrl+b`.

For example you have 1 audio file with numbers from 0 to 9.

![](./images/Screenshot%20from%202022-06-17%2015-31-01.png)

Then in menu: `File` --> `Export` --> `Export Multiple` --> `Split based on: Label`.

You will get files: `0.mp3`, `1.mp3`, ... `9.mp3`.

Create in the folder `keyboardData` a new folder `sounds`, and inside it folders `en`, `ru`, `ar`. Move to the folders audio files with numbers (for 3 langs).

#### HTML5 audio element

Open `App.js`. In `methods`, at the beginning of `setActiveKey` add 2 lines:

App.js methods

```js
setActiveKey(keyContent) {
  const audio = new Audio(`./keyboardData/en/1.mp3`);
  audio.play();
  ...
}
```

That's how audio element works.

Now when you click on any button, will be played one file `en/1.mp3`. You guess that we need to play different files. But there is a problem to identify them in our data model. If you remember, it is:

```javascript
const key = {
	code,
	label,
	main,
	shifted
}
```

#### Data model extension

Our data model isn't filled evenly. The keys have such different set of props

1. Only `code`

```js
{
	code: 'F1'
}
```

File name `F1.mp3` is good for such keys.

2. `main` and `shifted`

```js
{
	code: 'Digit1',
	main: '1',
	shifted: '!',
	// should to add:
	shiftedName: 'exclamation mark'
},
```

Here we cannot use `code` as before. Because there is only 1 `code`, but we need 2 audio files.

Furthermore `!` is forbidden symbol for file names. So it would be good to have an additional field `shiftedName: 'exclamation mark'`, that we'll use in file name.

For such `keyContent` we want to output `1.mp3` or `exclamation mark.mp3`

`mainName` is also necessary sometimes.

3. lower and upper case letters

```js
{
	code: 'KeyH',
	main: 'h',
	shifted: 'H'
},
```

It is enough here to have only 1 file `h.mp3` for both values `h` and `H`.

How do we fill our data now? We add to every `main` and `shifted` values that we can't or don't want to use as a file name, an additional values `mainName` and `shiftedName`.

#### Testing getAudioFileName

```js
const getAudioFileName = (keyContent, shiftKey) => {
	const { main, mainName, shifted, shiftedName, code } = keyContent

	let fileName

	if (shiftKey) {
		// will be returned 1 of 3 values (if it exist). priority to the first one
		fileName = shiftedName || shifted || code
	} else {
		fileName = mainName || main || code
	}

	// to have a guarantee, that everything is written in the same (lower) case
	return fileName.toLowerCase()
}
```

You can copy/paste the function, that you have written and not sure how it works, to console (`Chrome --> DevTools --> Console`).

Also copy to the console `keyContent` examples that we wrote before. Put them to the array `input`:

```js
const input = [
	{ code: 'F1' },
	{
		code: 'Digit1',
		main: '1',
		shifted: '!',
		shiftedName: 'exclamation mark'
	},
	{
		code: 'KeyH',
		main: 'h',
		shifted: 'H'
	}
]
```

Then call `getAudioFileName` with these data entities and different shiftKey, in the console.

```js
getAudioFileName(input[0], false) // f1
getAudioFileName(input[0], true) // f1
getAudioFileName(input[1], false) // 1
getAudioFileName(input[1], true) // exclamation mark
getAudioFileName(input[2], false) // h
getAudioFileName(input[2], true) // h
```

That is called `testing`. Programmers save such a code with:

- `input`,
- `call(input)`,
- `correct output`

to special files -- `tests`. Then, after codebase was changed, we run the `tests` to check that we haven't broken anything.

#### Dynamic audio playing

Add that function definition at the top of `App.js`, just after imports:

App.js

```js
import Keyboard from './components/Keyboard.js'
import LangSwitcher from './components/LangSwitcher.js'

const getAudioFileName = (keyContent, shiftKey) => {
	...
}
```

And call it when we before played static audio.

App.js methods

```js
setActiveKey(keyContent) {
	const fileName = getAudioFileName(keyContent, this.shiftKey)
	const audio = new Audio(
		`./keyboardData/${this.currentLang}/${fileName}.mp3`
	)
	audio.play()
	...
}
```

Now if you click on a different buttons, you'll hear a particular for a key sound, even when you switch languages. Don't forget, that for now we have files only for numbers `0, 1, ..., 9`. For playing Arabic numbers you should add their names to `keyboardData/ar.js`.

keyboardData/ar.js

```js
{
	code: 'Digit1',
	main: '١',
	// add:
	mainName: '1',
	shifted: '!'
},
...

```

Or, if you don't want to add `mainName`, you should rename files to `١.mp3`, `٢.mp3` e.t.c. So, our approach to file naming and data filling is flexible.

#### Keyboard layout: global and local parts

Any keyboard has local specific keys, and common keys for all languages (they are without titles on the picture below):

![](./images/XEoC735.png)

Most of common keys don’t have specific names in different languages. E.g. Escape, Tab, Caps Lock, Shift, Ctrl, Alt, Enter, Delete -- they all sound in 90% cases in English. Space, Arrows, F1-F12 usually have local names.

For now, to play audio of a key, we should put a sound file into `keyboardData/langCode/` folder. So it will be good, if we can use sounds from `keyboardData/en/` like `escape.mp3` for any language. But we will also leave the option to use local sounds for any of keys. `en/` sounds will be played only if other were not specified.

In programming such approach is called `fallback` -- when something doesn't work, and me make it works in another way.

Fortunately, `audio.play()` returns a promise, and we can catch error if file doesn't exist, and play another file.

Add to folder `keyboardData/en/` a "global layout" sounds. In our pice of keyboard they are `escape`, `left shift`, `right shift`, `tab`, `f1`-`f6`.

Now, if we try to play them, they will work only for `currentLang: 'en'`. In other languages after click/keydown will be played silent (joking).

In `Keyboard.js`, `methods`, `setActiveKey`, after `audio.play()` add:

Keyboard.js

```js
...
setActiveKey(keyContent) {
	const fileName = getAudioFileName(keyContent, this.shiftKey)
	const audio = new Audio(
		`../keyboardData/${this.currentLang}/${fileName}.mp3`
	)
	/* add catch after play:  */
	audio.play().catch(() => {
		if (this.currentLang !== 'en') {
			const audio = new Audio(`./keyboardData/en/${fileName}.mp3`)
			audio.play()
		}
	})
	...
}
```

Now new audio files that we added to folder `en/` sounds also for langs `ru` and `ar`. Except `ShiftRight` and `ShiftLeft`.

That is because of difference of `keyContent` for languages. In `en.js`, `ru.js` and `ar.js` keys `escape`, `tab`, `f1`-`f6` -- are identic and getAudioFileName returns the same name for any language. You can get these data from `keyboardData/en.js`, `ru.js`, `ar.js` and compare them, or even test the function `getAudioFileName` with each `keyContent` in the browser console.

Keys `ShiftLeft`, `ShiftRight` for `en` have additional field: `mainName`. Because of it for `en` file names will be `left shift`, `right shift`. For `ru` and `ar` file names will be generated from `code`: `shiftleft`, `shiftright`. We can add `mainName` as in `en` for each `global` key in every language keyboard data, end audios will sound. But it is a lot of work if we have lots of keyboards. It is better to improve our code.

##### Fallback `keyboardData.en`

That is how we get `keyContent` on `keydown` event.

Keyboard.js

```js
mounted() {
	this.getKeyboardData(this.currentLang)

	window.addEventListener('keydown', event => {
		event.preventDefault()
		const { code } = event
		const keyContent = this.keyboardData
			.flat()
			.find(elem => elem.code === code)
		this.setActiveKey(keyContent)
	})
...
}
```

We load `keyboardData` asynchronously from the file `/keyboardData/langCode.js`. Then we get from it `keyContent` by key `code`.

For `currentLang` we always have `keyboardData` -- it is loaded to component state on `mounted()` or when user clicked on `langCode` in `LanguageSwitcher`.

It would be good if `keyboardData` for `en` loaded by default at first time, will be always available as a fallback, when we haven't enough `keyContent` in a local `keyboardData`.

Let's refactor `Keyboard` state, to store there all loaded `keyboardData` for all langs. We find all `this.keyboardData` in code, and add to it `[lang]`. In template `this.` is'nt written, so we find there `keyboardData` and to it `currentLang`.

Keyboard.js methods

```js
	async getKeyboardData(lang) {
		const { default: keyboardData } = await import(
			`../keyboardData/${lang}.js`
		)
		/* add [lang]: */
		this.keyboardData[lang] = keyboardData
	}
```

Keyboard.js mounted

```js
/* add [currentLang] */
const keyContent = this.keyboardData[currentLang]
	.flat()
	.find(elem => elem.code === code)
```

Keyboard.js template

```html
<!-- add [currentLang] -->
<div
	v-for="(row, index) in keyboardData[currentLang]"
	:class="['row', 'row-'+(index+1)]"
></div>
```

Open the app. It should work as before.

##### Method `playKey`

Now we have immediate access to keyboards, that we opened before, without loading them every time. For now we need only `en` keyboardData as a fallback, which is loaded by default at first app opening. Let's made our code more universal by creating a new method:

Keyboard.js methods:

```js
getKeyContent(lang, code) {
	return this.keyboardData[lang].flat().find(elem => elem.code === code)
}
```

Rewrite code responsible for audio playing with this method:

Keyboard.js methods

```js
setActiveKey(keyContent) {
			const { code } = keyContent
			const { shiftKey, currentLang } = this

			// we created a new function
			// because we call all this code twice in this method
			const playKeyAudio = (lang, code, shiftKey) => {
				const keyContent = this.getKeyContent(lang, code)
				const fileName = getAudioFileName(keyContent, shiftKey)
				const audio = new Audio(`../keyboardData/${lang}/${fileName}.mp3`)
				return audio.play()// promise, we can catch error if file doesn't exist
			}

			playKeyAudio(currentLang, code, shiftKey).catch(() => { // fallback
				if (this.currentLang !== 'en') {
					playKeyAudio('en', code, shiftKey)
				}
			})

			this.activeKey = keyContent
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
		},
```

Check how app works. `Shift` should sound with any language layout.

But in such a code there is something wrong. Playing audio happens inside `setActiveKey` which is ok now. But what if we want to play audio without activating key, or activate key without playing audio?

Let's create a new method `playKey` and remove playing logic from `setActiveKey`.

Keyboard.js methods

```js
setActiveKey(keyContent) {
		this.activeKey = keyContent
		clearTimeout(this.timeout)
		this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
	},
playKey(keyContent) {
	const { code } = keyContent
	const { shiftKey, currentLang } = this

	const playKeyAudio = (lang, code, shiftKey) => {
		const keyContent = this.getKeyContent(lang, code)
		const fileName = getAudioFileName(keyContent, shiftKey)
		const audio = new Audio(`../keyboardData/${lang}/${fileName}.mp3`)
		return audio.play()
	}

	playKeyAudio(currentLang, code, shiftKey).catch(() => {
		// fallback
		if (this.currentLang !== 'en') {
			playKeyAudio('en', code, shiftKey)
		}
	})
},
```

Find in code every `setActiveKey` call, and place after it `playKey`, to keep previous functionality.

Keyboard.js mounted

```js
window.addEventListener('keydown', event => {
	event.preventDefault()
	const { code } = event
	const keyContent = this.getKeyContent(this.currentLang, code)
	this.setActiveKey(keyContent)
	/* add: */
	this.playKey(keyContent)
})
```

Also pass it to `Key` component and use it there.

Keyboard.js template

```html
<vue-key ... :playKey="playKey" />
```

Key.js props

```js
props: {
	...
	setActiveKey: Function,
	},
```

Key.js methods

```js
keyClick(keyContent) {
			this.setActiveKey(keyContent)
			// add:
			this.playKey(keyContent)

			if (keyContent.code.includes('Shift')) {
				this.toggleShiftKey()
			}
		}
```

Check the app. It should work as before. But now code is more flexible, we can use it in more ways.
