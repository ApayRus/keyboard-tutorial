import Key from './Key.js'

const getAudioFileName = (keyContent, shiftKey) => {
	const { main, mainName, shifted, shiftedName, code } = keyContent

	let fileName

	if (shiftKey) {
		fileName = shiftedName || shifted || code
	} else {
		fileName = mainName || main || code
	}

	return fileName.toLowerCase()
}

const Keyboard = {
	template: `<div class="keyboard">
					<div 
						v-for="(row, index) in keyboardData" 
						:class="['row', 'row-'+(index+1)]"
					>
						<vue-key 
							v-for="keyContent in row" 
							:keyContent="keyContent" 
							:activeKey="activeKey" 
							:setActiveKey="setActiveKey"
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
			const fileName = getAudioFileName(keyContent, this.shiftKey)
			const audio = new Audio(
				`../keyboardData/${this.currentLang}/${fileName}.mp3`
			)
			audio.play()
			this.activeKey = keyContent
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
		},
		toggleShiftKey() {
			this.shiftKey = !this.shiftKey
		},
		async getKeyboardData(lang) {
			const { default: keyboardData } = await import(
				`../keyboardData/${lang}.js`
			)
			this.keyboardData = keyboardData
		}
	}
}

export default Keyboard
