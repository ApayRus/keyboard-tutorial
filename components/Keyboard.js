import Key from './Key.js'
import {
	playKeyAudio,
	loadKeyboardData,
	getKeyContent,
	getSpellQueue
} from '../utils.js'

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
					<!-- <div class="spell">
						<input @keydown.stop v-model="spellText" />
						<button @click="spell">Spell</button> 
						<div>{{spellText}}</div>
					</div> -->
				</div>`,
	components: {
		'vue-key': Key
	},
	mounted() {
		this.setKeyboardData(this.currentLang)

		window.addEventListener('keydown', event => {
			event.preventDefault()
			const { code } = event
			const keyboardData = this.keyboardData[this.currentLang]
			const keyContent = getKeyContent({ keyboardData, code })

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
			shiftKey: false,
			spellText: ''
		}
	},
	methods: {
		setActiveKey(keyContent) {
			this.activeKey = keyContent
			clearTimeout(this.timeout)
			const promise = new Promise(resolve => {
				this.timeout = setTimeout(() => {
					this.activeKey = { code: '' }
					resolve(() => {})
				}, 1000)
			})
			return promise
		},
		playKey(keyContent) {
			const { code } = keyContent
			const { shiftKey, currentLang } = this

			return playKeyAudio(currentLang, keyContent, shiftKey).catch(err => {
				console.log(err)
				// fallback
				if (this.currentLang !== 'en') {
					/* replace: 
					const keyContent = this.getKeyContent('en', code)
					with next 2 lines */
					const keyboardData = this.keyboardData['en']
					const keyContent = getKeyContent({ keyboardData, code })

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
		async spell() {
			const { spellText, currentLang } = this
			await this.setKeyboardData(currentLang)
			const keyboardData = this.keyboardData[currentLang]
			const spellQueue = getSpellQueue({ keyboardData, spellText })
			for (let spellItem of spellQueue) {
				const { keyContent, shiftKey } = spellItem
				const playKey = () => {
					const playSound = this.playKey(keyContent)
					const animateSymbol = this.setActiveKey(keyContent)
					return Promise.all([playSound, animateSymbol])
				}
				if (!this.shiftKey === shiftKey) {
					this.toggleShiftKey()
					await playKey()
					this.toggleShiftKey()
				} else {
					await playKey()
				}
			}
		}
	}
}

export default Keyboard
