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
			main: 'ё',
			shifted: 'Ё'
		},
		{
			code: 'Digit1',
			main: '1',
			shifted: '!',
			shiftedName: 'восклицательный знак'
		},
		{
			code: 'Digit2',
			main: '2',
			shifted: '"',
			shiftedName: 'двойная кавычка'
		},
		{
			code: 'Digit3',
			main: '3',
			shifted: '№',
			shiftedName: 'знак номер'
		},
		{
			code: 'Digit4',
			main: '4',
			shifted: ';',
			shiftedName: 'точка с запятой'
		},
		{
			code: 'Digit5',
			main: '5',
			shifted: '%',
			shiftedName: 'процент'
		},
		{
			code: 'Digit6',
			main: '6',
			shifted: ':',
			shiftedName: 'двоеточие'
		},
		{
			code: 'Digit7',
			main: '7',
			shifted: '?',
			shiftedName: 'вопросительный знак'
		},
		{
			code: 'Digit8',
			main: '8',
			shifted: '*',
			shiftedName: 'звездочка'
		},
		{
			code: 'Digit9',
			main: '9',
			shifted: '(',
			shiftedName: 'открывающая скобка'
		},
		{
			code: 'Digit0',
			main: '0',
			shifted: ')',
			shiftedName: 'закрывающая скобка'
		},
		{
			code: 'Minus',
			main: '-',
			shifted: '_',
			mainName: 'минус',
			shiftedName: 'нижнее подчеркивание'
		},
		{
			code: 'Equal',
			main: '=',
			shifted: '+',
			mainName: 'равно',
			shiftedName: 'плюс'
		},
		{
			code: 'Backspace'
		}
	],
	[
		{ code: 'Tab' },
		{
			main: 'й',
			shifted: 'Й',
			code: 'KeyQ'
		},
		{
			main: 'ц',
			shifted: 'Ц',
			code: 'KeyW'
		},
		{
			main: 'у',
			shifted: 'У',
			code: 'KeyE'
		},
		{
			main: 'к',
			shifted: 'К',
			code: 'KeyR'
		},
		{
			main: 'е',
			shifted: 'Е',
			code: 'KeyT'
		},
		{
			main: 'н',
			shifted: 'Н',
			code: 'KeyY'
		},
		{
			main: 'г',
			shifted: 'Г',
			code: 'KeyU'
		},
		{
			main: 'ш',
			shifted: 'Ш',
			code: 'KeyI'
		},
		{
			main: 'щ',
			shifted: 'Щ',
			code: 'KeyO'
		},
		{
			main: 'з',
			shifted: 'З',
			code: 'KeyP'
		},
		{
			main: 'х',
			shifted: 'Х',
			code: 'BracketLeft'
		},
		{
			main: 'ъ',
			shifted: 'Ъ',
			code: 'BracketRight'
		},
		{
			code: 'Backslash',
			main: '\\',
			shifted: '/',
			mainName: 'обратный слэш',
			shiftedName: 'слэш'
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
			main: 'ф',
			shifted: 'Ф'
		},
		{
			code: 'KeyS',
			main: 'ы',
			shifted: 'Ы'
		},
		{
			code: 'KeyD',
			main: 'в',
			shifted: 'В'
		},
		{
			code: 'KeyF',
			main: 'а',
			shifted: 'А'
		},
		{
			code: 'KeyG',
			main: 'п',
			shifted: 'П'
		},
		{
			code: 'KeyH',
			main: 'р',
			shifted: 'Р'
		},
		{
			code: 'KeyJ',
			main: 'о',
			shifted: 'О'
		},
		{
			code: 'KeyK',
			main: 'л',
			shifted: 'Л'
		},
		{
			code: 'KeyL',
			main: 'д',
			shifted: 'Д'
		},
		{
			code: 'Semicolon',
			main: 'ж',
			shifted: 'Ж'
		},
		{
			code: 'Quote',
			main: 'э',
			shifted: 'Э'
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
			main: 'я',
			shifted: 'Я'
		},
		{
			code: 'KeyX',
			main: 'ч',
			shifted: 'Ч'
		},
		{
			code: 'KeyC',
			main: 'с',
			shifted: 'С'
		},
		{
			code: 'KeyV',
			main: 'м',
			shifted: 'М'
		},
		{
			code: 'KeyB',
			main: 'и',
			shifted: 'И'
		},
		{
			code: 'KeyN',
			main: 'т',
			shifted: 'Т'
		},
		{
			code: 'KeyM',
			main: 'ь',
			shifted: 'Ь'
		},
		{
			code: 'Comma',
			main: 'б',
			shifted: 'Б'
		},
		{
			code: 'Period',
			main: 'ю',
			shifted: 'Ю'
		},
		{
			code: 'Slash',
			main: '.',
			shifted: ',',
			mainName: 'точка',
			shiftedName: 'запятая'
		},
		{
			code: 'ArrowUp',
			label: '↑',
			mainName: 'стрелка вверх'
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
			mainName: 'пробел'
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
			mainName: 'стрелка влево'
		},
		{
			code: 'ArrowDown',
			label: '↓',
			mainName: 'стрелка вниз'
		},
		{
			code: 'ArrowRight',
			label: '→',
			mainName: 'стрелка вправо'
		}
	]
]

export default keys
