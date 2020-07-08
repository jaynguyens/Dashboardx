const ClaimsVehicle = {
	qInfo: {
		qType: "stackbarchart",
	},
	qHyperCubeDef: {
		qDimensions: [
			{
				qDef: {
					qFieldDefs: ["Vehicle Rating Group"],
				},
			},
		],
		qMeasures: [
			{
				qDef: {
					qDef: "Avg([Total Claim Cost])",
					qLabel: "Average Claims Cost",
				},
			},
			{
				qDef: {
					qDef: "Avg([Annual Premium])",
					qLabel: "Average Annual Premium",
				},
			},
			{
				qDef: {
					qDef:
						"Num(Sum([Total Claim Cost])/Sum([Annual Premium]),'#,##0%')",
					qLabel: "Lost Ratio",
				},
			},
		],
		qAlwaysFullyExpanded: true,
		qInitialDataFetch: [
			{
				qTop: 0,
				qLeft: 0,
				qWidth: 5,
				qHeight: 100,
			},
		],
	},
}

export default ClaimsVehicle
