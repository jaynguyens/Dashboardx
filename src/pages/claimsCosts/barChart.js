import React, {
   useState,
   useEffect,
   useRef,
   useCallback,
   useContext
} from "react";
import BigChart from "../../components/bigChart";
import useResizeObserver from "../../hooks/useResizeObserver";
import * as d3 from "d3";
import useModel from "../../hooks/useModel";
import ProcessData2 from "../../helper/processData2";

import { SelectionContext } from "../../enigma/selectionContext";

const BarChart = ({ dataset }) => {
   const [data, setData] = useState(dataset);
   const wrapperRef = useRef();
   const svgRef = useRef();
   const dimension = useResizeObserver(wrapperRef);
   const model = useModel("eRsGevp");
   const [selection, setSelection] = useContext(SelectionContext);

   // console.log("selection in barchart", selection);

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
         setSelection(selection => [
            ...selection,
            { model: layout, elemNumber: d.qElemNumber }
         ]);

         setData(result);
      },
      [model, setSelection]
   );

   // useeffect for diffrent selection

   useEffect(() => {
      if (selection && model !== undefined) {
         (async () => {
            const layout = await model.getLayout();
            const dataset = await layout.qHyperCube.qDataPages[0].qMatrix;
            const result = ProcessData2(dataset, "Cause", "Total Claim Cost");
            setData(result);
         })();
      }
   }, [selection, model]);

   // ---------------------------------
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

      const color = d3
         .scaleOrdinal()
         .range(d3.schemePaired)
         .domain(data.map(d => d["Year"] || d["Cause"]));

      svg.select(".x-axis")
         .call(axis.x)
         .attr("opacity", 0);
      svg.select(".y-axis")
         .call(axis.y)
         .attr("opacity", 0);

      svg.selectAll("rect")
         .data(data)
         .join("rect")
         .attr("x", d => scale.x(d["Year"] || d["Cause"]))
         .attr("width", scale.x.bandwidth())
         .attr("y", scale.y(0))
         .attr("height", dimension.height - margin.bottom - scale.y(0))
         .attr("fill", d => color(d["Year"] || d["Cause"]));

      // transition axis
      svg.select(".x-axis")
         .transition()
         .duration(1000)
         .attr("opacity", 1);
      svg.select(".y-axis")
         .transition()
         .duration(1000)
         .attr("opacity", 1);

      // transition bar from bottom to top
      svg.selectAll("rect")
         .transition()
         .duration(2000)
         .delay((d, i) => i * 3)
         .attr("y", d => scale.y(d["Total Claim Cost"]))
         .attr(
            "height",
            d =>
               dimension.height - margin.bottom - scale.y(d["Total Claim Cost"])
         );

      // handle click - with qlik selection
      d3.selectAll("rect").on("click", d => HandleClick(d));

      // handle tooltips
      /* d3.selectAll("rect").on("mouseover", (d, i) => { */
      // console.log(d, i);
      /* }); */
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
