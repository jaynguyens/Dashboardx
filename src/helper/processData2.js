const ProcessData2 = (data, ...key) => {
	const result = []
	data.forEach((datum) => {
		if (datum.length !== key.length) {
			console.error(
				"The dataset length isn't the same as the number of keys"
			)
		}
		let dataset = {}
		for (var i = 0; i < key.length; i++) {
			dataset[`${key[i]}`] = datum[i].qNum
		}
		return result.push(dataset)
	})
	return result
}

export default ProcessData2
