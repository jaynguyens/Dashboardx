import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import useResizeObserver from "../../hooks/useResizeObserver";
import BigChart from "../../components/bigChart";

import useCreateSessionObject from "../../hooks/useCreateSessionObject";
import ClaimsVehicle from "../../enigma/definition/claims-costs/vehicleInsurance";
import ProcessData2 from "../../helper/processData2";

const ScatterPlot = ({ dataset }) => {
   const [data, setData] = useState(dataset);
   const svgRef = useRef();
   const wrapperRef = useRef();
   const dimension = useResizeObserver(wrapperRef);
   const SessionObject = useCreateSessionObject(ClaimsVehicle);

   const HandleClick = useCallback(
      async d => {
         if (SessionObject !== undefined) {
            const session = await SessionObject;
            await session.selectHyperCubeValues(
               "/qHyperCubeDef",
               0,
               [d.qElemNumber],
               false
            );
            const layout = await session.getLayout();
            const dataset = await layout.qHyperCube.qDataPages[0].qMatrix;
            const result = ProcessData2(
               dataset,
               "Rating Group",
               "Ave Total Claims Cost",
               "Ave Annual Premium",
               "Loss Ratio"
            );
            setData(result);
         }
      },
      [SessionObject]
   );

   useEffect(() => {
      if (!dimension) return;
      //margin
      const margin = {
         top: 10,
         bottom: 20,
         left: 40,
         right: 20
      };

      //svg
      const svg = d3
         .select(svgRef.current)
         .attr("width", dimension.width)
         .attr("height", dimension.height);

      // scale
      const scale = {
         // x is the ave total claims cost
         x: d3
            .scaleLinear()
            .domain(d3.extent(data.map(d => d["Ave Total Claims Cost"])))
            .range([margin.left, dimension.width - margin.right])
            .nice(),
         // y is the annual premium
         y: d3
            .scaleLinear()
            .domain(d3.extent(data.map(d => d["Ave Annual Premium"])))
            .range([dimension.height - margin.bottom, margin.top])
            .nice(),
         // z is the loss ratio for the radius of the bubble
         z: d3
            .scaleLinear()
            .domain(d3.extent(data.map(d => d["Loss Ratio"])))
            .range([7, 12])
      };
      // axis
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

      // plots
      svg.selectAll("circle")
         .data(data)
         .join("circle")
         .attr("cx", d => scale.x(d["Ave Total Claims Cost"]))
         .attr("cy", d => scale.y(d["Ave Annual Premium"]))
         .attr("r", d => scale.z(d["Loss Ratio"]))
         .style("fill", "#69b3a2")
         .style("opacity", "0.7")
         .attr("stroke", "#000");

      // interactive
      // TODO: assumption make context and pass data to the parent
      d3.selectAll("circle")
         // ---------------------
         // TODO: This is where qlik interactive
         .on("click", d => HandleClick(d))

         //---------------------
         // standard display additional information
         .on("mouseover", function(d, i) {
            // console.log(d, i)
         })
         .on("mousemove", function(d, i) {
            // console.log(d, i)
         })
         .on("mouseout", function(d, i) {
            // console.log(d, i)
         });
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

export default ScatterPlot;
