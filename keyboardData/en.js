const keys = [
	[
		{ code: 'Escape', label: 'Esc' },
		{ code: 'F1' },
		{ code: 'F2' },
		{ code: 'F3' },
		{ code: 'F4' },
		{ code: 'F5' },
		{ code: 'F6' },
		{ code: 'F7' },
		{ code: 'F8' },
		{ code: 'F9' },
		{ code: 'F10' },
		{ code: 'F11' },
		{ code: 'F12' }
	],
	[
		{
			code: 'Backquote',
			main: '`',
			shifted: '~',
			shiftedName: 'tilde',
			mainName: 'backquote'
		},
		{
			code: 'Digit1',
			main: '1',
			shifted: '!',
			shiftedName: 'exclamation mark'
		},
		{
			code: 'Digit2',
			main: '2',
			shifted: '@',
			shiftedName: 'at sign'
		},
		{
			code: 'Digit3',
			main: '3',
			shifted: '#',
			shiftedName: 'hash'
		},
		{
			code: 'Digit4',
			main: '4',
			shifted: '$',
			shiftedName: 'dollar sign'
		},
		{
			code: 'Digit5',
			main: '5',
			shifted: '%',
			shiftedName: 'percent sign'
		},
		{
			code: 'Digit6',
			main: '6',
			shifted: '^',
			shiftedName: 'carat'
		},
		{
			code: 'Digit7',
			main: '7',
			shifted: '&',
			shiftedName: 'ampersand'
		},
		{
			code: 'Digit8',
			main: '8',
			shifted: '*',
			shiftedName: 'asterisk'
		},
		{
			code: 'Digit9',
			main: '9',
			shifted: '(',
			shiftedName: 'left parenthesis'
		},
		{
			code: 'Digit0',
			main: '0',
			shifted: ')',
			shiftedName: 'right parenthesis'
		},
		{
			code: 'Minus',
			main: '-',
			mainName: 'minus',
			shifted: '_',
			shiftedName: 'underscore'
		},
		{
			code: 'Equal',
			main: '=',
			mainName: 'equal',
			shifted: '+',
			shiftedName: 'plus'
		},
		{ code: 'Backspace' }
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
		},
		{
			code: 'KeyT',
			main: 't',
			shifted: 'T'
		},
		{
			code: 'KeyY',
			main: 'y',
			shifted: 'Y'
		},
		{
			code: 'KeyU',
			main: 'u',
			shifted: 'U'
		},
		{
			code: 'KeyI',
			main: 'i',
			shifted: 'I'
		},
		{
			code: 'KeyO',
			main: 'o',
			shifted: 'O'
		},
		{
			code: 'KeyP',
			main: 'p',
			shifted: 'P'
		},
		{
			code: 'BracketLeft',
			main: '[',
			mainName: 'left bracket',
			shifted: '{',
			shiftedName: 'left curly bracket'
		},
		{
			code: 'BracketRight',
			main: ']',
			mainName: 'right bracket',
			shifted: '}',
			shiftedName: 'right curly bracket'
		},
		{
			code: 'Backslash',
			main: '\\',
			shifted: '|',
			mainName: 'backslash',
			shiftedName: 'vertical pipe'
		}
	],
	[
		{
			code: 'CapsLock',
			label: 'CapsLk',
			mainName: 'caps lock'
		},
		{
			code: 'KeyA',
			main: 'a',
			shifted: 'A'
		},
		{
			code: 'KeyS',
			main: 's',
			shifted: 'S'
		},
		{
			code: 'KeyD',
			main: 'd',
			shifted: 'D'
		},
		{
			code: 'KeyF',
			main: 'f',
			shifted: 'F'
		},
		{
			code: 'KeyG',
			main: 'g',
			shifted: 'G'
		},
		{
			code: 'KeyH',
			main: 'h',
			shifted: 'H'
		},
		{
			code: 'KeyJ',
			main: 'j',
			shifted: 'J'
		},
		{
			code: 'KeyK',
			main: 'k',
			shifted: 'K'
		},
		{
			code: 'KeyL',
			main: 'l',
			shifted: 'L'
		},
		{
			code: 'Semicolon',
			main: ';',
			mainName: 'semicolon',
			shifted: ':',
			shiftedName: 'colon'
		},
		{
			code: 'Quote',
			main: "'",
			shifted: '"',
			mainName: 'single quote',
			shiftedName: 'double quote'
		},

		{ code: 'Enter' }
	],
	[
		{
			code: 'ShiftLeft',
			label: 'Shift',
			mainName: 'left shift',
			shiftedName: 'left shift'
		},
		{
			code: 'KeyZ',
			main: 'z',
			shifted: 'Z'
		},
		{
			code: 'KeyX',
			main: 'x',
			shifted: 'X'
		},
		{
			code: 'KeyC',
			main: 'c',
			shifted: 'C'
		},
		{
			code: 'KeyV',
			main: 'v',
			shifted: 'V'
		},
		{
			code: 'KeyB',
			main: 'b',
			shifted: 'B'
		},
		{
			code: 'KeyN',
			main: 'n',
			shifted: 'N'
		},
		{
			code: 'KeyM',
			main: 'm',
			shifted: 'M'
		},
		{
			code: 'Comma',
			main: ',',
			mainName: 'comma',
			shifted: '<',
			shiftedName: 'less than'
		},
		{
			code: 'Period',
			main: '.',
			mainName: 'period',
			shifted: '>',
			shiftedName: 'greater than'
		},
		{
			code: 'Slash',
			main: '/',
			mainName: 'slash',
			shifted: '?',
			shiftedName: 'question mark'
		},
		{
			code: 'ArrowUp',
			label: '↑',
			mainName: 'arrow up'
		},
		{
			code: 'ShiftRight',
			label: 'Shift',
			mainName: 'right shift',
			shiftedName: 'right shift'
		}
	],
	[
		{
			code: 'ControlLeft',
			label: 'ctrl',
			mainName: 'left control'
		},
		{
			code: 'AltLeft',
			label: 'alt',
			mainName: 'left alt'
		},
		{
			code: 'MetaLeft',
			label: 'cmd',
			mainName: 'left command'
		},
		{
			code: 'Space',
			label: 'space',
			main: ' ',
			mainName: 'space'
		},
		{
			code: 'MetaRight',
			label: 'cmd',
			mainName: 'right command'
		},
		{
			code: 'AltRight',
			label: 'alt',
			mainName: 'right alt'
		},
		{
			code: 'ControlRight',
			label: 'ctrl',
			mainName: 'right control'
		},
		{
			code: 'ArrowLeft',
			label: '←',
			mainName: 'arrow left'
		},
		{
			code: 'ArrowDown',
			label: '↓',
			mainName: 'arrow down'
		},
		{
			code: 'ArrowRight',
			label: '→',
			mainName: 'arrow right'
		}
	]
]

export default keys
