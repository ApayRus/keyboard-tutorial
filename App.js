import Keyboard from './components/Keyboard.js'
import LangSwitcher from './components/LangSwitcher.js'

const App = {
	template: `App-{{currentLang}} 
	<div>activeKey: {{activeKey}}</div>
	<div>shiftKey: {{shiftKey}}</div>
	<vue-lang-switcher 
		:langs="langs" 
		:switchLang="switchLang" 
		:currentLang="currentLang" 
	/>
	<vue-keyboard 
		:keyboardData="keyboardData" 
		:activeKey="activeKey"
		:setActiveKey="setActiveKey"
		:toggleShiftKey="toggleShiftKey"
		:shiftKey="shiftKey"
	/>
	`,
	components: {
		'vue-lang-switcher': LangSwitcher,
		'vue-keyboard': Keyboard
	},
	mounted() {
		this.getKeyboardData(this.currentLang)

		window.addEventListener('keydown', event => {
			event.preventDefault()
			const { code } = event
			const keyContent = this.keyboardData
				.flat()
				.find(elem => elem.code === code)
			this.setActiveKey(keyContent)
		})

		window.addEventListener('keydown', event => {
			if (event.key === 'Shift') {
				this.shiftKey = true
			}
		})

		window.addEventListener('keyup', event => {
			if (event.key === 'Shift') {
				this.shiftKey = false
			}
		})
	},
	data() {
		return {
			langs: ['en', 'ru', 'ar'],
			keyboardData: [],
			currentLang: 'en',
			/* add: */
			activeKey: { code: '' },
			shiftKey: false
		}
	},
	methods: {
		switchLang(lang) {
			this.currentLang = lang
			this.getKeyboardData(lang)
		},
		async getKeyboardData(lang) {
			const { default: keyboardData } = await import(
				`./keyboardData/${lang}.js`
			)
			this.keyboardData = keyboardData
		},
		setActiveKey(keyContent) {
			const audio = new Audio(`./keyboardData/ar/وَاحِدٌ.mp3`)
			audio.play()
			this.activeKey = keyContent
			clearTimeout(this.timeout)
			this.timeout = setTimeout(
				() => (this.activeKey = { code: '' }),
				1000
			)
		},
		toggleShiftKey() {
			this.shiftKey = !this.shiftKey
		}
	}
}

export default App
