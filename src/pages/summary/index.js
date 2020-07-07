import React, { useState, useEffect, useContext } from "react"
import { QDocContext } from "../../enigma/docProvider"
import SummaryClaimsType from "../../enigma/definition/summary/claimstype"
import styled from "styled-components"
import StackedBarChart from "./stackedBarChart"

const SummaryPage = () => {
	const [Data, setData] = useState([])
	const [Dataset, setDataset] = useState([])

	const qdoc = useContext(QDocContext)

	//TODO: maybe extract the useeffect as a custom hooks
	// with 1 argument - the chart definition sheet.
	// return an array -q Matrix-
	useEffect(() => {
		const ClaimType = async () => {
			const session = await qdoc.createSessionObject(SummaryClaimsType)
			const layout = await session.getLayout()
			const dataset = layout.qHyperCube.qDataPages[0].qMatrix
			setData(dataset)
		}
		ClaimType()
	}, [qdoc])

	//TODO: extract data from raw dataset
	/** GOAL is to extract data in this type of structure
	[
		["2016", "Windscreen", "148"],
		["2016", "Theft", "32"],
		["2016", "Fire", "2"]
	]
	 */

	useEffect(() => {
		const ExtractData = async () => {
			setDataset(
				Data.map((datum) =>
					datum.map((d) => {
						return d.qText
					})
				)
			)
		}
		ExtractData()
	}, [Data])

	/**
	 * pass dataset to the component
	 */

	return (
		<Div>
			<MiniCharts />
			<MiniCharts />
			<MiniCharts />
			<BigChart>
				<StackedBarChart data={Dataset} />
			</BigChart>
		</Div>
	)
}

export default SummaryPage

const Div = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background-color: lightgray;
	height: 100vh;
`

const MiniCharts = styled.div`
	width: 250px;
	height: 200px;
	background-color: #fff;
	margin: 25px;
	border-radius: 4px;
	box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`
const BigChart = styled.div`
	width: 80vw;
	height: 600px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`
