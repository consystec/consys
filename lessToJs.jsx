import defaultLess from '!raw-loader!antd/lib/style/themes/default.less';
import colorsLess from '!raw-loader!antd/lib/style/color/colors.less';

function lessToJs(sheet) {
	if (typeof sheet === 'undefined') {
		return;
	}
	const lessVars = {};
	const matches = sheet.match(/@(.*:[^;]*)/g) || [];

	matches.forEach(variable => {
		const definition = variable.split(/:\s*/);
		lessVars[definition[0].replace(/['"]+/g, '').trim()] = definition[1];
	});


	return lessVars;
}

function defaultTheme() {
	const defaultKeys = lessToJs(defaultLess);
	const colors = lessToJs(colorsLess);
	for (var key in defaultKeys) {
		const name = defaultKeys[key];
		if (defaultKeys[name]) {
			defaultKeys[key] = defaultKeys[name];
		}
		if (colors[name]) {
			defaultKeys[key] = colors[name];
		}
	}
	return { ...colors, ...defaultKeys };
}

export default lessToJs;
export { defaultTheme };