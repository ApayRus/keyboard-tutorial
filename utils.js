export const getAudioFileName = (keyContent, shiftKey) => {
	const { main, mainName, shifted, shiftedName, code } = keyContent

	let fileName

	if (shiftKey) {
		fileName = shiftedName || shifted || code
	} else {
		fileName = mainName || main || code
	}

	return fileName.toLowerCase()
}

/**
 * For languages with upper case letters,
 * we should invert main and shifted values --
 * show in main slot shifted value (uppercase)
 * and don't show shifted at all
 *
 **/
export const getKeyLabels = keyContent => {
	const { main = '', shifted = '', label, code } = keyContent
	const isUpperCaseLang = main.toUpperCase() === shifted
	const mainOutput = isUpperCaseLang ? shifted : main
	const shiftedOutput = isUpperCaseLang ? '' : shifted

	return {
		main: label || mainOutput || code,
		shifted: shiftedOutput
	}
}
