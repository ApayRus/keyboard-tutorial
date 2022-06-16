---
title: keyboard2
---

- [Data model](#data-model)
  - [Key](#key)
  - [Row](#row)
  - [Keyboard](#keyboard)
  - [`keyboardData/en.js`](#keyboarddataenjs)
  - [Data source](#data-source)
  - [Conclusion](#conclusion)

## Data model

**Data model** is a set of JS objects that describes all data inside an app.

### Key

Key is an object with the structure:

```javascript
const key = {
	code,
	label,
	main,
	shifted
}
```

Only `code` is required. Other properties are optional.

`code` identifies a place on a physical keyboard. This code is the same for keyboards in all languages.

`label` is the text on the key if it doesn't match with `main` or `code`. For “Escape” `label` is “Esc”, for “Space” it is an empty string.

`main` is the value returned after key pressed.

`shifted` is the value returned after key pressed while holding shift key.

We don't always specify all these props, because sometimes we don’t need them, or they can be calculated from other props. E.g. `Tab` has only `code`, because it doesn’t have a returned value `main` or `shifted`, and its label are the same as the code. `Escape` has `label: Esc` because we want to display on the key shorter version of `code: 'Escape'`. And it also hasn’t returned value (symbol), so it hasn't `main` or `shifted`.

### Row

Row is an array with keys.

```javascript
const row = [key1, key2, key3, ...]
```

### Keyboard

Keyboard is an array with rows.

```javascript
const keyboard = [row1, row2, row3]
```

### `keyboardData/en.js`

Inside root project folder create a new folder `keyboardData` and create there a file `en.js`:

keyboardData/en.js

```javascript
const keyboard = [
	[
		{ code: 'Escape', label: 'Esc' },
		{ code: 'F1' },
		{ code: 'F2' },
		{ code: 'F3' },
		{ code: 'F4' },
		{ code: 'F5' }
	],
	[
		{
			code: 'Backquote',
			main: '`',
			shifted: '~'
		},
		{
			code: 'Digit1',
			main: '1',
			shifted: '!'
		},
		{
			code: 'Digit2',
			main: '2',
			shifted: '@'
		},
		{
			code: 'Digit3',
			main: '3',
			shifted: '#'
		},
		{
			code: 'Digit4',
			main: '4',
			shifted: '$'
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
			main: 'q',
			shifted: 'Q'
		},
		{
			code: 'KeyW',
			main: 'w',
			shifted: 'W'
		},
		{
			code: 'KeyE',
			main: 'e',
			shifted: 'E'
		},
		{
			code: 'KeyR',
			main: 'r',
			shifted: 'R'
		}
	]
]

export default keyboard
```

The whole data model is a 2 dimensional array.

```javascript
// you can get any row from keyboard by index:
const row = keyboard[rowIndex]
//rowIndex is 0, 1, ..., 6

// you can get any key from keyboard by 2 indexes
const key = keyboard[rowIndex][keyIndex]
//keyIndex is 0, 1, .., 16
```

### Data source

Where to get the data from?

`main`, `shifted` and `label` are written on keys on phisical keyabord.

We'll explain how to get `code` in the chapter "Event `keydown`".

### Conclusion

We need to have this data model in front of our eyes to design the app in a modular way. We will create small components that are responsible for each logical part of the app. And before we do that, it's important to know wich data will be passed to these components.
