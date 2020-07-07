import React, { useState, useEffect, useContext } from "react"
import { QDocContext } from "../../enigma/docProvider"
import SummaryClaimsType from "../../enigma/definition/summary/claimstype"
import styled from "styled-components"
import StackedBarChart from "./stackedBarChart"
import HyperCubeData from "../../enigma/definition/summary/dataFromHyperCubeObject"
import ClaimsOpened from "./claimsOpened"

const SummaryPage = () => {
	const [Data, setData] = useState([])
	const [Opened, setOpened] = useState()
	const [Settled, setSettled] = useState()
	const [Payments, setPayments] = useState()

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

	// TODO: send the data in to StackedBarChart in the given structure

	// TODO: make a custom hooks
	useEffect(() => {
		const ClaimOpened = async () => {
			// const session = await qdoc.createSessionObject(SummaryClaimsOpened)
			const layout = await qdoc.getObject("YAJMNj")
			const data = await layout.getHyperCubeData(HyperCubeData)
			setOpened(data[0].qMatrix)
		}
		ClaimOpened()
	}, [qdoc])

	//
	useEffect(() => {
		const ClaimOpened = async () => {
			const layout = await qdoc.getObject("KrmuYX")
			const data = await layout.getHyperCubeData(HyperCubeData)
			setSettled(data[0].qMatrix)
		}
		ClaimOpened()
	}, [qdoc])

	useEffect(() => {
		const ClaimOpened = async () => {
			const layout = await qdoc.getObject("nqdxN")
			const data = await layout.getHyperCubeData(HyperCubeData)
			setPayments(data[0].qMatrix)
		}
		ClaimOpened()
	}, [qdoc])

	return (
		<Div>
			<MiniCharts>
				<ClaimsOpened data={Opened} />
			</MiniCharts>

			<MiniCharts>
				<ClaimsOpened data={Settled} />
			</MiniCharts>
			<MiniCharts>
				<ClaimsOpened data={Payments} />
			</MiniCharts>
			<BigChart>
				<StackedBarChart />
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
