const deepMerge = (source: object, target: object): object => {
	for (const key of Object.keys(source)) {
		if (source[key] instanceof Object && key in target) {
			Object.assign(source[key], deepMerge(target[key], source[key]))
		}
	}
	Object.assign(target || {}, source)
	return target
}

export default deepMerge