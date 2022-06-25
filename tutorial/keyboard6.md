- [Modularity 3. Loop in a template (v-for). Dynamic import](#modularity-3-loop-in-a-template-v-for-dynamic-import)
  - [Rows](#rows)
    - [1st loop — rows of the keyboard](#1st-loop--rows-of-the-keyboard)
    - [2nd loop — keys of a row](#2nd-loop--keys-of-a-row)
  - [Dynamic import of `keyboardData`](#dynamic-import-of-keyboarddata)
  - [LangSwitcher — refactor with props and v-for](#langswitcher--refactor-with-props-and-v-for)
  - [Conclusion](#conclusion)

## Modularity 3. Loop in a template (v-for). Dynamic import

### Keyboard rows

Keyboard.js

Have you thought that it is annoying to output data with template in such way:

Keyboard.js template

```html
<div class="keyboard">
	<div class="row row-1">
		<vue-key :keyContent="keyboardData[0][0]" />
		<vue-key :keyContent="keyboardData[0][1]" />
		<vue-key :keyContent="keyboardData[0][2]" />
		<vue-key :keyContent="keyboardData[0][3]" />
		<vue-key :keyContent="keyboardData[0][4]" />
		<vue-key :keyContent="keyboardData[0][5]" />
	</div>
	<div class="row row-2">
		<vue-key :keyContent="keyboardData[1][0]" />
		<vue-key :keyContent="keyboardData[1][1]" />
		<vue-key :keyContent="keyboardData[1][2]" />
		<vue-key :keyContent="keyboardData[1][3]" />
		<vue-key :keyContent="keyboardData[1][4]" />
		<vue-key :keyContent="keyboardData[1][5]" />
	</div>
	<div class="row row-3">
		<vue-key :keyContent="keyboardData[2][0]" />
		<vue-key :keyContent="keyboardData[2][1]" />
		<vue-key :keyContent="keyboardData[2][2]" />
		<vue-key :keyContent="keyboardData[2][3]" />
		<vue-key :keyContent="keyboardData[2][4]" />
	</div>
</div>
```

`v-for` directive [^directive] allows us to loop elements in template.

[^directive]: Directive is a programming element, that we put into template. E.g. loop.

We could guess by template structure, that there are 2 nested loops.

- 1st for rows
- 2nd for keys inside the row

#### 1st loop — rows of the keyboard

First let’s output row containers.

Keyboard.js

```javascript
import Key from './Key.js'
import keyboardData from '../keyboardData/en.js'

const Keyboard = {
	template: `
    <div class="keyboard">
        <div 
            v-for="(row, index) in keyboardData"
            :class="['row', 'row-'+(index+1)]" 
        >
            row {{index+1}}
        </div>
    </div>`,
	components: {
		'vue-key': Key
	},
	data() {
		return { keyboardData }
	}
}

export default Keyboard
```

`v-for="(row, index) in keyboardData"` loops through `keyboardData` array.

On each iteration `v-for` creates the same element (like element that contains `v-for`), with 2 new params: `index` and `row` that we can use inside our template. For now, we use only index.

Result:

![](./images/my0DVwH.png)

`:class="['row', 'row-'+(index+1)]"` generates `class="row row-1"` e.t.c. Сolon `:` tells framework that class value should be interpreted as a variable, not string. We use in class a variable `index` gotten from `v-for`.

On the image above there is opened Developer tools. (In browser click mouse right button —> Inspect).

In the DevTools code (tab `elements`) we see that each row are represented by a `div` with classes `row` and `row-index`. That’s important for us, because 1st row has different styles: smaller buttons and font size, if you remember.

#### 2nd loop — keys of a row

In `Keyboard.js` let’s replace line `row {{index+1}}` with another loop with keys.

```html
<vue-key v-for="keyContent in row" :keyContent="keyContent" />
```

This template part receives `row` from the loop before, and makes another loop for keys of the `row`.

Keyboard.js

```javascript
import Key from './Key.js'
import keyboardData from '../keyboardData/en.js'

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
    </div>`,
	components: {
		'vue-key': Key
	},
	data() {
		return { keyboardData }
	}
}

export default Keyboard
```

Result:

![](./images/cFIbVIN.png)

Add to `keyboardData/en.js` a new key F6, and you'll see the result immediately.

Now we don’t care even if our keyboard data contains hundreds of rows and keys — they will be displayed automatically by the 2 loops, with these 25 lines of code. This is because **we have separated view and data**. When we extend data, view extends automatically.

### Dynamic import of `keyboardData`

For now, we have only 1 keyboard layout -- English (en). But then we will have different layouts (langs), so we need a feature to load them from different files.

Open `Keyboard.js` and:

- add `mounted()`, and load there `keyboardData` from a file
- update state with received data

Keyboard.js

```js
import Key from './Key.js'
/* delete: 
import keyboardData from '../keyboardData/en.js'
* we receive it from prop 
*/

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
	/* add: */
	mounted() {
		/* dynamic import from file */
		import(`../keyboardData/en.js`).then(result => {
			const { default: keyboardData } = result
			/* update state with received data */
			this.keyboardData = keyboardData
		})
	},
	data() {
		return { keyboardData: [] }
	}
}

export default Keyboard
```

Method `mounted()` is called when user opens the app at the first time.

`import('path-to-file')` works as `import` in the top of a page. But you can put it anywhere and call it anytime, with variable params. It is a promise (works asynchronous), so it returns a `result` -- object `{default: }` with code from an external module after a while. We wait it and `.then` we use received code (`keyboardData/en.js`) to update our `Keyboard` state.

If you have done everything right, the app will work just as before, without any visible changes. But we made our code better. Now we import `keyboardData` dynamically, that allows us to switch between different language keyboards on next steps.

### LangSwitcher — refactor with props and v-for

Open `index.html` and copy commented code for `LangSwitcher`, then paste it to `template` in

LangSwitcher.js

```javascript
const LangSwitcher = {
	template: `
    <div class="langSwitcher">
        <div class="lang active">en</div>
        <div class="lang">ru</div>
        <div class="lang">ar</div>
    </div>`
}

export default LangSwitcher
```

Result:

![](./images/l4oO9M4.png)

Let's rewrite LangSwitcher with `props` and `v-for`.

In `App.js` we add a new param `langs` to `data()`. Then in `template` we'll pass it to `<vue-lang-switcher />`

App.js

```javascript
import Keyboard from './components/Keyboard.js'
import LangSwitcher from './components/LangSwitcher.js'

const App = {
	template: `App 
	<vue-lang-switcher :langs="langs" />
	<vue-keyboard />
	`,
	components: {
		'vue-lang-switcher': LangSwitcher,
		'vue-keyboard': Keyboard
	},
	/* add: */
	data() {
		return {
			langs: ['en', 'ru', 'ar']
		}
	}
}

export default App
```

In `<LangSwitcher.js>` we receive this new param (array) `langs`, and output it in a `v-for` loop in the template.

LangSwitcher.js

```javascript
const LangSwitcher = {
	template: `
    <div class="langSwitcher">
        <div 
            v-for="lang in langs" 
            class="lang"
        >
            {{lang}}
        </div>
    </div>`,
	/* add: */
	props: {
		langs: Array
	}
}

export default LangSwitcher
```

Result:

![](./images/bDu0Mom.png)

The red circle disappeared because style `active` isn't attached to any of elements.

### Conclusion

What we coded until now are static elements, that doesn’t react on user input, and aren't changed dynamically (except dynamic import of a `keyboardData`, but for now it happens without user interaction).

By using components with props we made our code modular.

By using loops in templates we made code short, clear, extensible, and maintainable. Now we can display data of any length within a loop in a small template.
