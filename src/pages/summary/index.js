import React from "react"
import styled from "styled-components"

import SummaryClaimsType from "../../enigma/definition/summary/claimstype"
import StackedBarChart from "./stackedBarChart"
import HyperCubeData from "../../enigma/definition/summary/dataFromHyperCubeObject"
import ClaimsOpened from "./claimsOpened"

import useHyperCubeDataObject from "../../hooks/useHyperCubeDataObject"
import useLayoutSessionObject from "../../hooks/useLayoutSessionObject"

const SummaryPage = () => {
	// Stacked bar chart - claims by claim type
	const claimsTypeYearly = useLayoutSessionObject(SummaryClaimsType)

	// Indicators
	const openedClaims = useHyperCubeDataObject("YAJMNj", HyperCubeData)
	const settledClaims = useHyperCubeDataObject("KrmuYX", HyperCubeData)
	const paymentsClaims = useHyperCubeDataObject("nqdxN", HyperCubeData)

	return (
		<Div>
			<MiniCharts>
				<ClaimsOpened data={openedClaims} />
			</MiniCharts>
			<MiniCharts>
				<ClaimsOpened data={settledClaims} />
			</MiniCharts>
			<MiniCharts>
				<ClaimsOpened data={paymentsClaims} />
			</MiniCharts>
			<BigChart>
				<StackedBarChart data={claimsTypeYearly} />
			</BigChart>
		</Div>
	)
}

export default SummaryPage

const Div = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background-color: rgba(247, 250, 252);
	height: 100vh;
`

const MiniCharts = styled.div`
	width: 250px;
	height: 200px;
	background-color: #fff;
	margin: 25px;
	border-radius: 4px;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
	/* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06); */
`
const BigChart = styled.div`
	width: 80vw;
	height: 600px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
`
