import React from "react";
import ClaimsVehicle from "../../enigma/definition/claims-costs/vehicleInsurance";
import useLayoutSessionObject from "../../hooks/useLayoutSessionObject";
import useGetObjectGetLayout from "../../hooks/useGetObjectGetLayout";
import ScatterPlot from "./scatterPlot";
import BarChart from "./barChart";
import ProcessData2 from "../../helper/processData2";
import Indicators from "../../components/indicators";
import Indicator from "./indicator";

const ClaimsCosts = () => {
   const scatterPlotDataset = useLayoutSessionObject(ClaimsVehicle);
   const barChartDataset = useGetObjectGetLayout("eRsGevp");

   if (!barChartDataset || !scatterPlotDataset) {
      return <div> no dataset -- still wating for dataset</div>;
   }
   console.log(barChartDataset);
   const datasetBarChart = ProcessData2(
      barChartDataset,
      "Year",
      "Total Claim Cost"
   );

   const datasetScatterPlot = ProcessData2(
      scatterPlotDataset,
      "Rating Group",
      "Ave Total Claims Cost",
      "Ave Annual Premium",
      "Loss Ratio"
   );

   return (
      <>
         <Indicators>
            <Indicator title="Ave Annual Premium" />
            <Indicator title="Ave Total Claims Cost" />
            <Indicator title="Loss Ratio" />
         </Indicators>
         <Indicators>
            <ScatterPlot dataset={datasetScatterPlot} />
            <BarChart dataset={datasetBarChart} />
         </Indicators>
      </>
   );
};

export default ClaimsCosts;
