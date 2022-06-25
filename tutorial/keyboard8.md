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
