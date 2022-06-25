- [Set activeKey by click](#set-activekey-by-click)
  - [Method](#method)
  - [Event](#event)
  - [The key full info](#the-key-full-info)
  - [Move `shiftKey` to state](#move-shiftkey-to-state)
  - [Holding `shift` style](#holding-shift-style)

### Set activeKey by click

Some people doesn't have a physical keyboard, but only a screen one. And they also want to learn letters with our cool app.

To add `@click` event to `Key` we need to encapsulate activating of a key into a method.

#### Method

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

#### Event

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

#### The key full info

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

#### Move `shiftKey` to state

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

#### Holding `shift` style

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
