import React, { useRef } from "react"

const BarChart = () => {
	const svgRef = useRef()

	return (
		<div>
			<svg ref={svgRef}></svg>
		</div>
	)
}

export default BarChart
