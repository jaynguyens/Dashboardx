import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import useResizeObserver from "../../hooks/useResizeObserver";
import BigChart from "../../components/bigChart";

const LineChart = ({ dataset }) => {
   const [data, setData] = useState(dataset);
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimensions = useResizeObserver(wrapperRef); //get the width, height from div

   useEffect(() => {
      console.log(data);
      if (!dimensions) return;

      //margin
      const margin = {
         top: 20,
         bottom: 30,
         left: 40,
         right: 20
      };

      // set the initial svg element
      const svg = d3
         .select(svgRef.current)
         .attr("width", dimensions.width)
         .attr("height", dimensions.height);

      // ---------------------- scale
      const scale = {
         x: d3
            .scaleLinear()
            .domain(d3.extent(data.map(d => d["TP Age"])))
            .range([margin.left, dimensions.width - margin.right]),
         y: d3
            .scaleLinear()
            .domain(d3.extent(data.map(d => d["Count of Claims"])))
            .range([dimensions.height - margin.bottom, margin.top])
      };

      // ----------------------- axis
      const axis = {
         x: g =>
            g
               .attr(
                  "transform",
                  `translate(0, ${dimensions.height - margin.bottom})`
               )
               .call(d3.axisBottom(scale.x)),
         y: g =>
            g
               .attr("transform", `translate(${margin.left}, 0)`)
               .call(d3.axisLeft(scale.y))
      };

      // ------ draw axis on the svg ---------
      svg.select(".x-axis").call(axis.x);
      svg.select(".y-axis").call(axis.y);

      // chart lines
      const line = d3
         .line()
         .x(d => scale.x(d["TP Age"]))
         .y(d => scale.y(d["Count of Claims"]));

      svg.selectAll("lines")
         .data(data)
         .join("path")
         .attr("d", d => line(d))
         .attr("stroke", "black")
         .attr("stroke-width", 2)
         .style("fill", "none");
   }, [data, dimensions]);
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

export default LineChart;
