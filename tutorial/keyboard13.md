## Refactoring

When you write code initially, it is like a draft. You do it fast and your only goal is to make it working, and to see how things fits to each other. After I while you do a revision of your code, and edit it, making it clearer, shorter, more reusable, split it into logical modules.

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

Write `export` before each of functions, so we can import them from other files.

On top of `Keyboard.js` add line:

```js
import { getAudioFileName } from '../utils.js'
```

On top of `Key.js` add line:

```js
import { getKeyLabels } from '../utils.js'
```

Code of 2 components became clearer.

Everything without `this.` in your code is better to move somewhere.

If you look at our project file structure, you'll notice, that there are components and `assets` -- additional files that we read and use from components.

It is good to move such functionality into separate module. Maybe we decide to change our file structure in the future, and it will be easy rewrite paths to files in one place, instead of seeking for them in all components.

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

In `utils` change path in `playKeyAudio`

utils.js

```js
const audio = new Audio(`../keyboardData/sounds/${lang}/${fileName}.mp3`)
```

Open the app. It should work as before.

Still we changed file structure of our project, we are not afraid that we forget to change some path somewhere in components. Because every functions that use files are placed in one place.
