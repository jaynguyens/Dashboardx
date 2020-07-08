import React, { useEffect, useRef } from "react"
import * as d3 from "d3"

const StackedBarChart = ({ data }) => {
	const svgRef = useRef()
	const wrapperRef = useRef()

	//TODO:
	const keys = ["Windscreen", "Collision", "Theft", "Fire"]

	const colors = {
		Windscreen: "green",
		Collision: "orange",
		Theft: "purple",
		Fire: "blue",
	}

	const dataset = [
		{
			name: 2016,
			Windscreen: 168,
			Collision: 404,
			Theft: 44,
			Fire: 2,
		},
		{
			name: 2017,
			Windscreen: 730,
			Collision: 1521,
			Theft: 189,
			Fire: 11,
		},
		{
			name: 2018,
			Windscreen: 918,
			Collision: 1811,
			Theft: 228,
			Fire: 14,
		},
		{
			name: 2019,
			Windscreen: 1076,
			Collision: 2409,
			Theft: 172,
			Fire: 11,
		},
		{
			name: 2020,
			Windscreen: 1495,
			Collision: 3110,
			Theft: 201,
			Fire: 9,
		},
	]

	useEffect(() => {
		const { width, height } = wrapperRef.current.getBoundingClientRect()
		const margin = {
			top: 20,
			right: 20,
			bottom: 30,
			left: 40,
		}

		const stackGenerator = d3
			.stack()
			.keys(keys)
			.order(d3.stackOrderAscending)
		const layers = stackGenerator(dataset)

		const extent = [
			0,
			d3.max(layers, (layer) => d3.max(layer, (sequence) => sequence[1])),
		]

		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height)

		// Scale
		// domain is the limit of the axis [0, maximum value of year]
		// range is the output in pixel
		const scale = {
			// x is the number of claims
			x: d3
				.scaleBand()
				.domain(dataset.map((d) => d.name))
				.range([margin.left, width - margin.right])
				.padding(0.25),
			// y is the year
			y: d3
				.scaleLinear()
				.domain(extent)
				.range([height - margin.bottom, margin.top]),
		}

		// Axis
		// following the margin convention for axis
		const axis = {
			x: (g) =>
				g
					.attr(
						"transform",
						`translate(0, ${height - margin.bottom})`
					)
					.call(d3.axisBottom(scale.x)),
			y: (g) =>
				g
					.attr("transform", `translate(${margin.left}, 0)`)
					.call(d3.axisLeft(scale.y))
					.call((g) => g.selectAll("line").remove()),
		}

		svg.select(".x-axis").call(axis.x)
		svg.select(".y-axis").call(axis.y)

		// Draw

		// create a stack for each year
		// console.log(layers)
		svg.selectAll(".layers")
			.data(layers)
			.join("g")
			.attr("class", "layer")
			.attr("fill", (layer) => colors[layer.key])
			.selectAll("rect")
			.data((layer) => layer)
			.join("rect")
			.attr("x", (sequence) => scale.x(sequence.data.name))
			.attr("width", scale.x.bandwidth())
			.attr("y", (sequence) => scale.y(sequence[1]))
			.attr(
				"height",
				(sequence) => scale.y(sequence[0]) - scale.y(sequence[1])
			)
	}, [keys, dataset, colors])

	return (
		<div ref={wrapperRef} style={{ height: "100%" }}>
			<svg ref={svgRef}>
				<g className="x-axis"></g>
				<g className="y-axis"></g>
			</svg>
		</div>
	)
}

export default StackedBarChart
