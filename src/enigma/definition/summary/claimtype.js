const SummaryClaimType = {
	qInfo: {
		qType: "stackbarchart",
	},
	qHyperCubeDef: {
		qDimensions: [
			{
				qDef: {
					qFieldDefs: ["Claim Notification Date.Year"],
				},
			},
		],
		qMeasures: [
			{
				qDef: {
					qDef:
						"Sum($<[Notification Date.autoCalendar.InYTD]={1}>}[ClaimCounter])",
				},
			},
		],
		qMode: "EQ_DATA_MODE_PIVOT_STACK",
		qNoOfLeftDims: -1,
		qAlwaysFullyExpanded: true,
		qInitialDataFetch: [
			{
				qTop: 0,
				qLeft: 0,
				qWidth: 5,
				qHeight: 50,
			},
		],
	},
};

export default SummaryClaimType;
