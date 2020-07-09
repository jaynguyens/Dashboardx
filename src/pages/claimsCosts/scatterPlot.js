import React, { useRef, useEffect, useContext } from "react"
import * as d3 from "d3"
import useResizeObserver from "../../hooks/useResizeObserver"
import SelectionContext from "./selectionContext"

const ScatterPlot = ({ dataset }) => {
	const { setSelection } = useContext(SelectionContext)
	// console.log(selection)
	// Process data
	// return [ {}, {}, {} ]
	/* { 
        "VRG": "", 
        "Ave total Claims Cost": "", 
        "Ave Annual Premium": "", 
        "Loss Ratio": ""
    }
    */

	const svgRef = useRef()
	const wrapperRef = useRef()
	const dimension = useResizeObserver(wrapperRef)

	useEffect(() => {
		if (!dimension) return
		//margin
		const margin = {
			top: 10,
			bottom: 20,
			left: 40,
			right: 20,
		}

		//svg
		const svg = d3
			.select(svgRef.current)
			.attr("width", dimension.width)
			.attr("height", dimension.height)

		// scale
		const scale = {
			// x is the ave total claims cost
			x: d3
				.scaleLinear()
				.domain(
					d3.extent(dataset.map((d) => d["Ave Total Claims Cost"]))
				)
				.range([margin.left, dimension.width - margin.right])
				.nice(),
			// y is the annual premium
			y: d3
				.scaleLinear()
				.domain(d3.extent(dataset.map((d) => d["Ave Annual Premium"])))
				.range([dimension.height - margin.bottom, margin.top])
				.nice(),
			// z is the loss ratio for the radius of the bubble
			z: d3
				.scaleLinear()
				.domain(d3.extent(dataset.map((d) => d["Loss Ratio"])))
				.range([7, 12]),
		}
		// axis
		const axis = {
			x: (g) =>
				g
					.attr(
						"transform",
						`translate(0, ${dimension.height - margin.bottom})`
					)
					.call(d3.axisBottom(scale.x)),
			y: (g) =>
				g
					.attr("transform", `translate(${margin.left}, 0)`)
					.call(d3.axisLeft(scale.y)),
		}

		svg.select(".x-axis").call(axis.x)
		svg.select(".y-axis").call(axis.y)

		// plots
		svg.selectAll("circle")
			.data(dataset)
			.join("circle")
			.attr("cx", (d) => scale.x(d["Ave Total Claims Cost"]))
			.attr("cy", (d) => scale.y(d["Ave Annual Premium"]))
			.attr("r", (d) => scale.z(d["Loss Ratio"]))
			.style("fill", "#69b3a2")
			.style("opacity", "0.7")
			.attr("stroke", "#000")

		// interactive
		// TODO: assumption make context and pass data to the parent
		d3.selectAll("circle").on("click", function (d, i) {
			const listSelection = []
			listSelection.push(d)
			setSelection(listSelection)
			d3.selectAll("circle").style("opacity", "0.3")
			d3.select(this).style("fill", "#f04")
		})
	}, [dataset, dimension])

	return (
		<div ref={wrapperRef} style={{ height: "100%" }}>
			<svg ref={svgRef}>
				<g className="x-axis" />
				<g className="y-axis" />
			</svg>
		</div>
	)
}

export default ScatterPlot
