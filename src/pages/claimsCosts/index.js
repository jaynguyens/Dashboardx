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
   const aveAnnual = useGetObjectGetLayout("Gcnnpgm");
   const aveClaim = useGetObjectGetLayout("YUgnRj");
   const lossRatio = useGetObjectGetLayout("uRCGnRV");

   return (
      <>
         <Indicators>
            <Indicator dataset={aveAnnual} objectId="Gcnnpgm" />
            <Indicator dataset={aveClaim} objectId="YUgnRj" />
            <Indicator dataset={lossRatio} objectId="uRCGnRV" />
         </Indicators>
         <Indicators>
            {scatterPlotDataset ? (
               <ScatterPlot
                  dataset={ProcessData2(
                     scatterPlotDataset,
                     "Rating Group",
                     "Ave Total Claims Cost",
                     "Ave Annual Premium",
                     "Loss Ratio"
                  )}
               />
            ) : (
               <p>Loading</p>
            )}
            {barChartDataset ? (
               <BarChart
                  dataset={ProcessData2(
                     barChartDataset[1],
                     "Year",
                     "Total Claim Cost"
                  )}
               />
            ) : (
               <p>Loading</p>
            )}
         </Indicators>
      </>
   );
};

export default ClaimsCosts;
