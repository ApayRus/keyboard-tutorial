- [Set activeKey by click](#set-activekey-by-click)
  - [Method](#method)
  - [Event](#event)
  - [The key full info](#the-key-full-info)
  - [Move `shiftKey` to state](#move-shiftkey-to-state)
  - [Holding `shift` style](#holding-shift-style)

## Interactivity 3. Set `activeKey` by click. `shiftKey` app state

### Set activeKey by click

Some people don't have a physical keyboard, but only a screen one. And they also want to learn letters with our cool app.

To add `@click` event to `Key` we need first to encapsulate key activation into a method.

#### Method

Add a new method to `Keyboard.js`.

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

In Key.js receive this method (add it to props), and add its call to the template.

Key.js props:

```js
props: {
	...,
	setActiveKey: Function
}
```

Key.js template

```html
<div
	:class="['key', {active: activeKey.code === keyContent.code}]"
	@click="setActiveKey(keyContent)"
>
	<div class="main">{{main}}</div>
	<div class="shifted">{{shifted}}</div>
</div>
```

Now we see, that key became active also by mouse click (or tap from phone).

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/z6owotlfmtnp0c3j0pj1.gif)

COMMIT 9.1

#### The key full info

On the previous gif animation you can notice, that `activeKey` is different for `keydown` and `@click`. E.g. for q:

activeKey on keydown: `{ code: KeyQ, shiftKey: false }`

activeKey on @click: `{ code: KeyQ, main: "q", shifted:"Q" }`

That's because on `keydown` we assign to the `activeKey` an object `{code, shiftKey}` that we get from keyboard event.

And on `@click` we set `activeKey` from our data `keyboardData/en.js` -- which we filled with useful data before.

It is easy to get this data by `@click` in `Key` component -- because it is a prop `keyContent`. But `keydown` event doesn't contain these data.

We should add some code to extract `keyContent` from `keyboardData` by `keydown` event `code`.

Keyboard.js mounted

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

`keyboardData` is 2D array (array with arrays). So we did it flat -- 1D, and find full key info by `code`. Then pass it to the method `setActiveKey`.

You can test it out: `keydown` and `@click` now returns almost the same value.

#### Move `shiftKey` to state

For now, we get `shiftKey` only with `keydown`, can't get `shiftKey` on `@click`. To make `keydown` and `@click` events equivalent, let's create a new keyboard state: `shiftKey`. So we'll have the ability to manipulate `shiftKey` not only from keyboard `keydown`, but also from mouse/tap screen events.

Add to the end of each `keyboardData/lang.js` a new row with 2 buttons:

en.js, ru.js, ar.js

```js
	...,
 [
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

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sco39taier5pbggu3sjm.gif)

Add a new state to

Keyboard.js data()

```js
{
	...
	shiftKey: false
}
```

Add 2 keyboard event listeners, that change the new app state

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

  ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tjpja6f6rdhtqu4rnjf5.gif)

When we hold `shift` on keyboard, state `shiftKey` is `true` even when `activeKey` faded. When we `@click` `shift` by mouse, `shiftKey` is false, even when `shift` is the `activeKey`.

We can't hold shift on the screen as on physical keyboard. So we need to set `shiftKey` by click on the screen button, and the app will think that we hold `shift` key. On the second click on `shift` the app will think, that we released the button.

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

Now `@click` should call multiple methods, not only one `@click="setActiveKey(keyContent)"` as before. So we need to create an additional method calling all these methods. And call it from the template `@click`.

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
```

In Key.js template replace `@click="setActiveKey(keyContent)"` with `@click="keyClick(keyContent)"`

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

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/co2tf2et3gmcflw6ftdr.gif)

`shiftKey` state works fine with `keydown` and `@click`. But we don't see that `shift` is holding on the keyboard.

#### Holding `shift` style

Add to `styles.css` an especial style for pressed (not released) `shift` buttons.

styles.css

```css
.key.shiftKeyPressed {
	color: red;
	font-weight: bold;
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

- it is a `shift` key (with code: ShiftLeft or ShiftRight),
- keyboard state `shiftKey` is `true` -- the key is holding,
- key is not active (we can't see red text on red background)

Result

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rr7vepwhnvb033meai9x.gif)

COMMIT 9.2.
