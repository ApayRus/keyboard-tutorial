- [Play audio](#play-audio)
  - [Prepare audio files](#prepare-audio-files)
  - [HTML5 audio element](#html5-audio-element)
  - [Data model extension](#data-model-extension)
  - [Testing getAudioFileName](#testing-getaudiofilename)
  - [Dynamic audio playing](#dynamic-audio-playing)
  - [Keyboard layout: global and local parts](#keyboard-layout-global-and-local-parts)
    - [Fallback `keyboardData.en`](#fallback-keyboarddataen)
    - [Method `playKey`](#method-playkey)

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
