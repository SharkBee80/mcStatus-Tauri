
// minecraft motd color
export function parseMOTD(input) {
	if (!input) return 'A minecraft server.';
	const colorMap = {
		'§0': 'mc-black',
		'§1': 'mc-dark-blue',
		'§2': 'mc-dark-green',
		'§3': 'mc-dark-aqua',
		'§4': 'mc-dark-red',
		'§5': 'mc-dark-purple',
		'§6': 'mc-gold',
		'§7': 'mc-gray',
		'§8': 'mc-dark-gray',
		'§9': 'mc-blue',
		'§a': 'mc-green',
		'§b': 'mc-aqua',
		'§c': 'mc-red',
		'§d': 'mc-light-purple',
		'§e': 'mc-yellow',
		'§f': 'mc-white'
	};

	const formatMap = {
		'§l': 'mc-bold',
		'§m': 'mc-strikethrough',
		'§n': 'mc-underline',
		'§o': 'mc-italic'
	};

	let result = '';
	let currentSpan = '';
	let currentClasses = [];

	for (let i = 0; i < input.length; i++) {
		if (input[i] === '§' && i + 1 < input.length) {
			if (currentSpan) {
				result += `<span class=${currentClasses.join(' ')}>${currentSpan}</span>`;
				currentSpan = '';
			}

			const code = input.substr(i, 2);
			if (colorMap[code]) {
				currentClasses = [colorMap[code]];
			} else if (formatMap[code]) {
				currentClasses.push(formatMap[code]);
			} else if (code === '§r') {
				currentClasses = [];
			}
			i++;
		} else {
			currentSpan += input[i];
		}
	}

	if (currentSpan) {
		result += `<span class=${currentClasses.join(' ')}>${currentSpan}</span>`;
	}

	return result || 'A minecraft server.';
}

// export { parseMOTD };