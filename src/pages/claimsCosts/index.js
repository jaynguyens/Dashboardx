import React, { useState } from "react"
import ClaimsVehicle from "../../enigma/definition/claims-costs/vehicleInsurance"
import useLayoutSessionObject from "../../hooks/useLayoutSessionObject"
import useGetObjectGetLayout from "../../hooks/useGetObjectGetLayout"
import MiniChart from "../../components/miniChart"
import BigChart from "../../components/bigChart"
import Indicator from "./indicator"
import ScatterPlot from "./scatterPlot"
import BarChart from "./barChart"

import SelectionContext from "./selectionContext"
import ProcessData2 from "../../helper/processData2"

const ClaimsCosts = () => {
	const [selection, setSelection] = useState([])
	const [toggle, setToggle] = useState(true)
	const scatterPlotDataset = useLayoutSessionObject(ClaimsVehicle)
	const barChartDataset = useGetObjectGetLayout("eRsGevp")

	// When dataset stil waiting from qlik
	// data is undefined

	if (!barChartDataset || !scatterPlotDataset) {
		return <div> no dataset -- still wating for dataset</div>
	}

	const datasetBarChart = ProcessData2(
		barChartDataset,
		"Year",
		"Total Claim Cost"
	)
	const datasetScatterPlot = ProcessData2(
		scatterPlotDataset,
		"Rating Group",
		"Ave Total Claims Cost",
		"Ave Annual Premium",
		"Loss Ratio"
	)

	if (toggle) {
		setSelection(datasetScatterPlot)
		setToggle(false)
	}

	return (
		<SelectionContext.Provider value={{ selection, setSelection }}>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					backgroundColor: "rgba(247, 250, 252)",
					justifyContent: "center",
				}}
			>
				<MiniChart>
					<Indicator title="Ave Annual Premium" />
				</MiniChart>
				<MiniChart>
					<Indicator title="Ave Total Claims Cost" />
				</MiniChart>
				<MiniChart>
					<Indicator title="Loss Ratio" />
				</MiniChart>
			</div>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					backgroundColor: "rgba(247, 250, 252)",
					justifyContent: "center",
					paddingBottom: "1rem",
				}}
			>
				<BigChart>
					<ScatterPlot dataset={datasetScatterPlot} />
				</BigChart>
				<BigChart>
					<BarChart dataset={datasetBarChart} />
				</BigChart>
			</div>
		</SelectionContext.Provider>
	)
}

export default ClaimsCosts
