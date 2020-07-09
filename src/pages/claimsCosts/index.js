import React, { useState } from "react"
import ClaimsVehicle from "../../enigma/definition/claims-costs/vehicleInsurance"
// import useSelectionFromHyperCube from "../../hooks/useSelectionFromHyperCube"
import useLayoutSessionObject from "../../hooks/useLayoutSessionObject"
import MiniChart from "../../components/miniChart"
import BigChart from "../../components/bigChart"
import Indicator from "./indicator"
import ScatterPlot from "./scatterPlot"

import SelectionContext from "./selectionContext"

const ClaimsCosts = () => {
	const [selection, setSelection] = useState([])
	const [toggle, setToggle] = useState(true)
	const data = useLayoutSessionObject(ClaimsVehicle)

	// const selection = useSelectionFromHyperCube(ClaimsVehicle, [3, 5, 7, 8])
	// console.log(selection)

	const Process = (data) => {
		const result = []
		data.forEach((datum) =>
			result.push({
				"Rating Group": datum[0].qNum,
				"Ave Total Claims Cost": datum[1].qNum,
				"Ave Annual Premium": datum[2].qNum,
				"Loss Ratio": datum[3].qNum,
				qElemNumber: datum[0].qElemNumber,
			})
		)
		return result
	}

	if (data) {
		// console.log(data)
		if (toggle) {
			setSelection(Process(data))
			setToggle(false)
		}

		//loss ratio = sum total cost/ sum annual premium
		return (
			// {!data && <div> Loading ...</div>}
			<SelectionContext.Provider value={{ selection, setSelection }}>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						backgroundColor: "rgba(247, 250, 252)",
						height: "93vh",
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
					<BigChart>
						<ScatterPlot dataset={Process(data)} />
					</BigChart>
				</div>
			</SelectionContext.Provider>
		)
	} else {
		return <>Loading...</>
	}
}

export default ClaimsCosts
