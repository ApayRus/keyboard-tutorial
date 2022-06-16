/**
 * For languages with upper case letters,
 * we should invert main and shifted values --
 * show in main slot shifted value (uppercase)
 * and don't show shifted at all
 *
 *
 *
 **/
const getKeyLabels = keyContent => {
	const { main = '', shifted = '', label, code } = keyContent
	const isUpperCaseLang = main.toUpperCase() === shifted
	const mainOutput = isUpperCaseLang ? shifted : main
	const shiftedOutput = isUpperCaseLang ? '' : shifted

	return {
		main: label || mainOutput || code,
		shifted: shiftedOutput
	}
}

const Key = {
	template: `<div 
				:class="[
							'key', 
							keyContent.code, 
							{ shiftKeyPressed: isShift && shiftKey && !isActive }
						]"
				@click="keyClick(keyContent)"
				>
				<div v-if="isActive" :class="['key', 'active', keyContent.code]">
					<div>{{value}}</div>
				</div>
					<div class="main">{{main}}</div>
					<div class="shifted">{{shifted}}</div>
				</div>
				`,
	props: {
		keyContent: Object,
		activeKey: Object,
		setActiveKey: Function,
		toggleShiftKey: Function,
		shiftKey: Boolean
	},
	computed: {
		main() {
			const { main } = getKeyLabels(this.keyContent)
			return main
		},
		shifted() {
			const { shifted } = getKeyLabels(this.keyContent)
			return shifted
		},
		isActive() {
			return this.activeKey.code === this.keyContent.code
		},
		isShift() {
			return this.keyContent.code.includes('Shift')
		},
		value() {
			const { main, shifted, code } = this.keyContent
			return (this.shiftKey ? shifted : main) || code
		}
	},
	methods: {
		keyClick(keyContent) {
			this.setActiveKey(keyContent)
			if (keyContent.code.includes('Shift')) {
				this.toggleShiftKey()
			}
		}
	}
}

export default Key
