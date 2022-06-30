## Refactoring

When you write code initially, it is like a draft. You do it fast and your only goal is to make it working and to see how things fits to each other. After a while you do a revision of your code, and edit it, making it clearer, shorter, more reusable, split it into logical modules.

Everything without `this.` in your code is better to move somewhere. Another hint for you is a length of file: a module with more than 100 lines is better to split.

If you look at our project file structure, you'll notice, that there are components and `assets` -- additional files that we read and use from components.

It is good to move functionality related to external files into separate module. Maybe we decide to change our file structure in the future, and it will be easy to rewrite paths to files in one place, instead of seeking for them in all components.

### `getAudioFileName` and `getKeyLabels`

If you remember, on top of `Keyboard.js` and `Key.js` we placed functions, that aren't part of components. Create in the project root directory a new file `utils.js` and move them there (remove from components, and place to utils.js).

utils.js

```js
export const getAudioFileName = (keyContent, shiftKey) => {
	...
}

export const getKeyLabels = keyContent => {
	...
}
```

Write `export` before each function, so we can import them from other files.

On top of `Keyboard.js` add line:

```js
import { getAudioFileName } from '../utils.js'
```

On top of `Key.js` add line:

```js
import { getKeyLabels } from '../utils.js'
```

Code of 2 components became clearer.

### `loadKeyboardData`

Add to `utils.js` a new function:

utils.js

```js
export const loadKeyboardData = async lang => {
	const { default: keyboardData } = await import(`../keyboardData/${lang}.js`)
	return keyboardData
}
```

In `Keyboard.js` import it, and use inside `getKeyboardData` method:

Keyboard.js

```js
import { getAudioFileName, /* add:  */loadKeyboardData } from '../utils.js'
...
methods: {
	...
	async getKeyboardData(lang) {
				this.keyboardData[lang] = await loadKeyboardData(lang)
			},
	...
}
```

Have you noticed, that we removed path to files from the component? It is good.

Rename `getKeyboardData` to `setKeyboardData`. Find/Replace old name with the new one (`Ctrl+h`).

Open the app, it should work as before.

### `playKeyAudio`

Also in `Keyboard.js` look at function `playKeyAudio`. There is also path to external file, and only one `this.`. So it is candidate to travel to `utils.js`.

Keyboard.js

```js
const playKeyAudio = (lang, code, shiftKey) => {
	const keyContent = this.getKeyContent(lang, code)
	const fileName = getAudioFileName(keyContent, shiftKey)
	const audio = new Audio(`../keyboardData/${lang}/${fileName}.mp3`)
	return audio.play()
}
```

Move this code to `utils.js` and rewrite it without `this.`, because `this` is a component, and it is not available in `utils` module.

```js
export const playKeyAudio = (lang, keyContent, shiftKey) => {
	const fileName = getAudioFileName(keyContent, shiftKey)
	const audio = new Audio(`../keyboardData/${lang}/${fileName}.mp3`)
	return audio.play()
}
```

In top of `Keyboard.js` import this new function, and remove `getAudioFileName` import, because we use it now only in utils.

Keyboard.js

```js
import { playKeyAudio, loadKeyboardData } from '../utils.js'
...
methods: {
	...
	playKey(keyContent) {
		const { code } = keyContent
		const { shiftKey, currentLang } = this

		playKeyAudio(currentLang, keyContent, shiftKey).catch(() => {
			// fallback
			if (this.currentLang !== 'en') {
				const keyContent = this.getKeyContent('en', code)
				playKeyAudio('en', keyContent, shiftKey)
			}
		})
	},
}
```

Open your app. It should work as before.

In the folder `keyboardData` create a folder `sounds` and move there `en`, `ru`, `ar` folders.

In `utils` for path in `playKeyAudio` add `/sounds/`:

utils.js

```js
const audio = new Audio(`../keyboardData/sounds/${lang}/${fileName}.mp3`)
```

Open the app. It should work as before.

Despite the fact that we have changed file structure of our project, we are not afraid that we forget to change some path somewhere in components. Because every functions that use files are compactly placed in one module.

### `getKeyContent`

`getKeyContent` looks like something working outside components, universal for any `keyboardData` and key `code`. Let's move it to utils:

utils.js

```js
export const getKeyContent = (keyboardData, code) => {
	return keyboardData.flat().find(elem => elem.code === code)
}
```

We replaced argument `lang` with `keyboardData` to take `this` out of the function. We should rewrite code using `lang` and `this` to calculate `keyboardData` before every call of `getKeyContent`.

Import `getKeyContent` to `Keyboard`.

Keyboard.js first lines

```js
import { playKeyAudio, loadKeyboardData, getKeyContent } from '../utils.js'
...
```

Find (`ctrl+f`) all `getKeyContent` matches in `Keyboard.js`, and replace it with the rewritten imported function:

Keyboard.js mounted

```js
/* replace: 
const keyContent = this.getKeyContent(this.currentLang, code)
with next 2 lines */
const keyboardData = this.keyboardData[this.currentLang]
const keyContent = getKeyContent(keyboardData, code)
```

Keyboard.js methods `playKey`

```js
/* replace: 
const keyContent = this.getKeyContent('en', code)
with next 2 lines */
const keyboardData = this.keyboardData['en']
const keyContent = getKeyContent(keyboardData, code)
```

Open the app. It should work as before.

Now we have the universal function to work with `keyboardData`, that we can improve easily in the future.
