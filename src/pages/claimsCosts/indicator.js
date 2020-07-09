import React, { useContext } from "react"
import styled from "styled-components"
import SelectionContext from "./selectionContext"

const Indicator = ({ title }) => {
	const { selection } = useContext(SelectionContext)

	const annualPremium =
		selection
			.map((d) => d["Ave Annual Premium"])
			.reduce((a, b) => a + b, 0) / selection.length

	const totalCost =
		selection
			.map((d) => d["Ave Total Claims Cost"])
			.reduce((a, b) => a + b, 0) / selection.length

	const lossRatio =
		selection.map((d) => d["Loss Ratio"]).reduce((a, b) => a + b, 0) /
		selection.length

	return (
		<Div>
			<Title>{title}</Title>
			<Number>
				{title === "Loss Ratio"
					? `${lossRatio.toFixed(2)}%`
					: title === "Ave Annual Premium"
					? `£ ${annualPremium.toFixed(2)}`
					: `£ ${totalCost.toFixed(2)}`}
				<p>{selection[title]}</p>
			</Number>
		</Div>
	)
}

export default Indicator

const Title = styled.h1`
	font-size: 1.125rem;
	color: #4a5568;
`
const Div = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`
const Number = styled.h1`
	font-size: 2rem;
	padding: 1rem 0.5rem;
	margin: 0;
	color: #2d3748;
`
