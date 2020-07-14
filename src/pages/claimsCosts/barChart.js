import React, { useState, useEffect, useRef, useCallback } from "react";
import BigChart from "../../components/bigChart";
import useResizeObserver from "../../hooks/useResizeObserver";
import * as d3 from "d3";
import useModel from "../../hooks/useModel";
import ProcessData2 from "../../helper/processData2";

const BarChart = ({ dataset }) => {
   const [data, setData] = useState(dataset);
   const wrapperRef = useRef();
   const svgRef = useRef();
   const dimension = useResizeObserver(wrapperRef);
   const model = useModel("eRsGevp");

   const HandleClick = useCallback(
      async d => {
         await model.selectHyperCubeValues(
            "/qHyperCubeDef",
            0,
            [d.qElemNumber],
            false
         );
         const layout = await model.getLayout();
         const dataset = await layout.qHyperCube.qDataPages[0].qMatrix;
         const result = ProcessData2(dataset, "Cause", "Total Claim Cost");

         setData(result);
         console.log(dataset, result);
      },
      [model]
   );

   useEffect(() => {
      if (!dimension) return;

      const margin = {
         top: 20,
         bottom: 20,
         left: 60,
         right: 40
      };
      const svg = d3
         .select(svgRef.current)
         .attr("width", dimension.width)
         .attr("height", dimension.height);

      const scale = {
         x: d3
            .scaleBand()
            .domain(data.map(d => d["Year"] || d["Cause"]))
            .range([margin.left, dimension.width - margin.right])
            .padding(0.2),
         y: d3
            .scaleLinear()
            .domain(d3.extent(data.map(d => d["Total Claim Cost"])))
            .range([dimension.height - margin.bottom, margin.top])
            .nice()
      };

      const axis = {
         x: g =>
            g
               .attr(
                  "transform",
                  `translate(0, ${dimension.height - margin.bottom})`
               )
               .call(d3.axisBottom(scale.x)),
         y: g =>
            g
               .attr("transform", `translate(${margin.left}, 0)`)
               .call(d3.axisLeft(scale.y))
      };

      svg.select(".x-axis").call(axis.x);
      svg.select(".y-axis").call(axis.y);

      svg.selectAll("rect")
         .data(data)
         .join("rect")
         .attr("x", d => scale.x(d["Year"] || d["Cause"]))
         .attr("width", scale.x.bandwidth())
         .attr("y", d => scale.y(d["Total Claim Cost"]))
         .attr(
            "height",
            d =>
               dimension.height - margin.bottom - scale.y(d["Total Claim Cost"])
         );

      d3.selectAll("rect").on("click", d => HandleClick(d));
   }, [data, dimension, HandleClick]);

   return (
      <BigChart>
         <div ref={wrapperRef} style={{ height: "100%" }}>
            <svg ref={svgRef}>
               <g className="x-axis" />
               <g className="y-axis" />
            </svg>
         </div>
      </BigChart>
   );
};

export default BarChart;
