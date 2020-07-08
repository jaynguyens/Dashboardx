import React from "react"
import styled from "styled-components"

const Indicator = ({ data, title }) => {
	if (!data) {
		return <Div> Processing.. </Div>
	}
	const [thisYear, lastYear] = data[0].map((datum) => datum.qText)
	const percentage = Math.floor(
		((Number(thisYear) - Number(lastYear)) / Number(lastYear)) * 100
	)

	return (
		<Div>
			<Title>{title}</Title>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<CurrentYear>
					{thisYear > 1000000
						? `${(thisYear / 1000000).toFixed(2)}M`
						: `${thisYear}`}
				</CurrentYear>
				<Percentage>
					{percentage >= 0 ? `⬆${percentage}%` : `⬇${percentage}%`}
				</Percentage>
			</div>
			<LastYear>
				{lastYear > 1000000
					? `${(lastYear / 1000000).toFixed(2)}M`
					: `${lastYear}`}{" "}
				claims YTD
			</LastYear>
		</Div>
	)
}

export default Indicator

const Div = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`

const Title = styled.h1`
	font-size: 1.125rem;
	color: #4a5568;
`

const CurrentYear = styled.h1`
	font-size: 2rem;
	padding: 1rem 0.5rem 0.5rem 0;
	margin: 0;
	color: #2d3748;
`
const LastYear = styled.p`
	color: #718096;
	font-size: 1rem;
`
const Percentage = styled.p`
	color: #f56565;
`
