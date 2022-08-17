import Keyboard from './components/Keyboard.js'
import LangSwitcher from './components/LangSwitcher.js'

const App = {
	template: `
	<vue-lang-switcher 
		:langs="langs" 
		:switchLang="switchLang" 
		:currentLang="currentLang" 
	/>
	<vue-keyboard :currentLang="currentLang" />
	`,
	components: {
		'vue-lang-switcher': LangSwitcher,
		'vue-keyboard': Keyboard
	},
	data() {
		return {
			langs: ['en', 'ru', 'ar'],
			currentLang: 'en'
		}
	},
	methods: {
		switchLang(lang) {
			this.currentLang = lang
		}
	}
}

export default App
