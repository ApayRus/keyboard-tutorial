import Key from './Key.js'
import { playKeyAudio, loadKeyboardData } from '../utils.js'

const Keyboard = {
	template: `<div class="keyboard">
					<div 
						v-for="(row, index) in keyboardData[currentLang]" 
						:class="['row', 'row-'+(index+1)]"
					>
						<vue-key 
							v-for="keyContent in row" 
							:keyContent="keyContent" 
							:activeKey="activeKey" 
							:setActiveKey="setActiveKey"
							:playKey="playKey"
							:toggleShiftKey="toggleShiftKey" 
							:shiftKey="shiftKey"
						/>
					</div>
				</div>`,
	components: {
		'vue-key': Key
	},
	mounted() {
		this.setKeyboardData(this.currentLang)

		window.addEventListener('keydown', event => {
			event.preventDefault()
			const { code } = event
			const keyContent = this.getKeyContent(this.currentLang, code)
			this.setActiveKey(keyContent)
			this.playKey(keyContent)
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
	props: {
		currentLang: String
	},
	watch: {
		currentLang: function (currentLang) {
			this.setKeyboardData(currentLang)
		}
	},
	data() {
		return {
			keyboardData: [],
			activeKey: { code: '' },
			shiftKey: false
		}
	},
	methods: {
		setActiveKey(keyContent) {
			this.activeKey = keyContent
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
		},
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
		toggleShiftKey() {
			this.shiftKey = !this.shiftKey
		},
		async setKeyboardData(lang) {
			this.keyboardData[lang] = await loadKeyboardData(lang)
		},
		getKeyContent(lang, code) {
			return this.keyboardData[lang].flat().find(elem => elem.code === code)
		}
	}
}

export default Keyboard
