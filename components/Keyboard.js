import Key from './Key.js'
import { getAudioFileName } from '../utils.js'

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
		this.getKeyboardData(this.currentLang)

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
			this.getKeyboardData(currentLang)
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

			const playKeyAudio = (lang, code, shiftKey) => {
				const keyContent = this.getKeyContent(lang, code)
				const fileName = getAudioFileName(keyContent, shiftKey)
				const audio = new Audio(`../keyboardData/${lang}/${fileName}.mp3`)
				return audio.play()
			}

			playKeyAudio(currentLang, code, shiftKey).catch(() => {
				// fallback
				if (this.currentLang !== 'en') {
					playKeyAudio('en', code, shiftKey)
				}
			})
		},
		toggleShiftKey() {
			this.shiftKey = !this.shiftKey
		},
		async getKeyboardData(lang) {
			const { default: keyboardData } = await import(
				`../keyboardData/${lang}.js`
			)
			this.keyboardData[lang] = keyboardData
		},
		getKeyContent(lang, code) {
			return this.keyboardData[lang].flat().find(elem => elem.code === code)
		}
	}
}

export default Keyboard
