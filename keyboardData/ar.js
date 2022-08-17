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
			/* 
			on mac:
			main: '٫',
			shifted: '٬', 
			mainName: 'decimal point'
			*/
			code: 'Backquote',
			main: 'ذ',
			shifted: 'ّ',
			shiftedName: 'tashdid'
		},
		{
			code: 'Digit1',
			main: '١',
			shifted: '!',
			mainName: '1',
			shiftedName: 'exclamation mark'
		},
		{
			code: 'Digit2',
			main: '٢',
			shifted: '@',
			mainName: '2',
			shiftedName: 'at sign'
		},
		{
			code: 'Digit3',
			main: '٣',
			shifted: '#',
			mainName: '3',
			shiftedName: 'hash'
		},
		{
			code: 'Digit4',
			main: '٤',
			shifted: '$',
			mainName: '4',
			shiftedName: 'dollar sign'
		},
		{
			code: 'Digit5',
			main: '٥',
			shifted: '٪',
			mainName: '5',
			shiftedName: 'percent sign'
		},
		{
			code: 'Digit6',
			main: '٦',
			shifted: '^',
			mainName: '6',
			shiftedName: 'carat'
		},
		{
			code: 'Digit7',
			main: '٧',
			shifted: '&',
			mainName: '7',
			shiftedName: 'ampersand'
		},
		{
			code: 'Digit8',
			main: '٨',
			shifted: '*',
			mainName: '8',
			shiftedName: 'asterisk'
		},
		{
			code: 'Digit9',
			main: '٩',
			shifted: '(',
			mainName: '9',
			shiftedName: 'left parenthesis'
		},
		{
			code: 'Digit0',
			main: '٠',
			shifted: ')',
			mainName: '0',
			shiftedName: 'right parenthesis'
		},
		{
			code: 'Minus',
			main: '-',
			shifted: 'ـ',
			mainName: 'minus',
			shiftedName: 'underscore'
		},
		{
			code: 'Equal',
			main: '=',
			shifted: '+',
			mainName: 'equal',
			shiftedName: 'plus'
		},
		{
			code: 'Backspace'
		}
	],
	[
		{ code: 'Tab' },
		{
			code: 'KeyQ',
			main: 'ض',
			shifted: 'َ',
			shiftedName: 'fatha'
		},
		{
			code: 'KeyW',
			main: 'ص',
			shifted: 'ً',
			shiftedName: ''
		},
		{
			code: 'KeyE',
			main: 'ث',
			shifted: 'ُ',
			shiftedName: ''
		},
		{
			code: 'KeyR',
			main: 'ق',
			shifted: 'ٌ',
			shiftedName: ''
		},
		{
			code: 'KeyT',
			main: 'ف',
			shifted: 'لإ',
			shiftedName: ''
		},
		{
			code: 'KeyY',
			main: 'غ',
			shifted: 'إ',
			shiftedName: ''
		},
		{
			code: 'KeyU',
			main: 'ع',
			shifted: '‘',
			shiftedName: ''
		},
		{
			code: 'KeyI',
			main: 'ه',
			shifted: '÷',
			shiftedName: ''
		},
		{
			code: 'KeyO',
			main: 'خ',
			shifted: '×',
			shiftedName: ''
		},
		{
			code: 'KeyP',
			main: 'ح',
			shifted: '؛',
			shiftedName: ''
		},
		{
			code: 'BracketLeft',
			main: 'ج',
			shifted: '<',
			shiftedName: 'less than'
		},
		{
			code: 'BracketRight',
			main: 'د',
			shifted: '>',
			shiftedName: 'greater than'
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
			main: 'ش',
			shifted: 'ِ',
			shiftedName: 'kasra'
		},
		{
			code: 'KeyS',
			main: 'س',
			shifted: 'ٍ',
			shiftedName: 'tanwin kasra'
		},
		{
			code: 'KeyD',
			main: 'ي',
			shifted: ']',
			shiftedName: 'right bracket'
		},
		{
			code: 'KeyF',
			main: 'ب',
			shifted: '[',
			shiftedName: 'left bracket'
		},
		{
			code: 'KeyG',
			main: 'ل',
			shifted: 'لأ',
			shiftedName: ''
		},
		{
			code: 'KeyH',
			main: 'ا',
			shifted: 'أ',
			shiftedName: ''
		},
		{
			code: 'KeyJ',
			main: 'ت',
			shifted: 'ـ',
			shiftedName: ''
		},
		{
			code: 'KeyK',
			main: 'ن',
			shifted: '،',
			shiftedName: ''
		},
		{
			code: 'KeyL',
			main: 'م',
			shifted: '’',
			shiftedName: ''
		},
		{
			code: 'Semicolon',
			main: 'ك',
			shifted: ':',
			shiftedName: 'colon'
		},
		{
			code: 'Quote',
			main: 'ط',
			shifted: '"',
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
			main: 'ئ',
			mainName: 'ya mahmuza',
			shifted: '~',
			shiftedName: 'tilde'
		},
		{
			code: 'KeyX',
			main: 'ء',
			mainName: 'hamza',
			shifted: 'ْ',
			shiftedName: ''
		},
		{
			code: 'KeyC',
			main: 'ؤ',
			mainName: 'waw mahmuza',
			shifted: '}',
			shiftedName: 'right curly bracket'
		},
		{
			code: 'KeyV',
			main: 'ر',
			shifted: '{',
			shiftedName: 'left curly bracket'
		},
		{
			code: 'KeyB',
			main: 'لا',
			shifted: 'لآ',
			shiftedName: ''
		},
		{
			code: 'KeyN',
			main: 'ى',
			mainName: 'alif maqsura',
			shifted: 'آ',
			shiftedName: ''
		},
		{
			code: 'KeyM',
			main: 'ة',
			shifted: '’',
			shiftedName: ''
		},
		{
			code: 'Comma',
			main: 'و',
			shifted: ',',
			shiftedName: 'comma'
		},
		{
			code: 'Period',
			main: 'ز',
			shifted: '.',
			shiftedName: 'period'
		},
		{
			code: 'Slash',
			main: 'ظ',
			shifted: '؟',
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
			main: ' ',
			label: 'space',
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
