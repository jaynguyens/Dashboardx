import React, { useState, createContext } from "react";
import ClaimsVehicle from "../../enigma/definition/claims-costs/vehicleInsurance";
import useLayoutSessionObject from "../../hooks/useLayoutSessionObject";
import useGetObjectGetLayout from "../../hooks/useGetObjectGetLayout";
import ScatterPlot from "./scatterPlot";
import BarChart from "./barChart";
import ProcessData2 from "../../helper/processData2";
import Indicators from "../../components/indicators";
import Indicator from "./indicator";

export const SelectionContext = createContext();

const ClaimsCosts = () => {
   const [selection, setSelection] = useState([]);
   const scatterPlotDataset = useLayoutSessionObject(ClaimsVehicle);
   const barChartDataset = useGetObjectGetLayout("eRsGevp");
   const aveAnnual = useGetObjectGetLayout("Gcnnpgm");
   const aveClaim = useGetObjectGetLayout("YUgnRj");
   const lossRatio = useGetObjectGetLayout("uRCGnRV");

   return (
      <>
         <SelectionContext.Provider value={[selection, setSelection]}>
            <Indicators>
               <Indicator data={aveAnnual} />
               <Indicator data={aveClaim} />
               <Indicator data={lossRatio} />
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
         </SelectionContext.Provider>
      </>
   );
};

export default ClaimsCosts;
