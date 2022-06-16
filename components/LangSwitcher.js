const LangSwitcher = {
	template: `<div class="langSwitcher">
					<div 
						v-for="lang in langs" 
						:class='["lang", {active: currentLang === lang}]'
						@click="switchLang(lang)"
					>
						{{lang}}
					</div>
					
				</div>
				`,
	props: {
		langs: Array,
		/* add: */
		currentLang: String,
		switchLang: Function
	}
	/* delete: 
	data() {
		return {
			currentLang: 'en'
		}
	},
	methods: {
		switchLang(lang) {
			this.currentLang = lang
		}
	} 
	*/
}

export default LangSwitcher
