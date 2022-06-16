import Key from './Key.js'

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
	props: {
		keyboardData: Array,
		activeKey: Object,
		setActiveKey: Function,
		toggleShiftKey: Function,
		shiftKey: Boolean
	}
}

export default Keyboard
