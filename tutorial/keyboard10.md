- [CSS animation (color)](#css-animation-color)
- [Conditional rendering `v-if`](#conditional-rendering-v-if)
- [Additional keyframe (0% 30% 100%)](#additional-keyframe-0-30-100)
- [Animated resize (transform)](#animated-resize-transform)
- [The value of the pressed key](#the-value-of-the-pressed-key)

### CSS animation (color)

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

### Conditional rendering `v-if`

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

### Additional keyframe (0% 30% 100%)

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

### Animated resize (transform)

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

### The value of the pressed key

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
