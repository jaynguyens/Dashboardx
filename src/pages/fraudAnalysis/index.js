import React, { useState, useEffect } from "react";
import DataFromqMatrix from "../../helper/dataFromqMatrix";
import useGetLayoutFromGetObject from "../../hooks/useGetLayoutFromGetObject";
import Indicators from "../../components/indicators";
import LinearChart from "./lineChart";
/* FraudAnalysis consists of:
 * - A line chart
 * - A Table
 */

const FraudAnalysis = () => {
   const TableObject = useGetLayoutFromGetObject(
      "5cab8f15-5702-48ec-b51c-a39d31857de8"
   );
   const LineObject = useGetLayoutFromGetObject(
      "144f304f-ffad-4f73-9ae1-0019d925c347"
   );
   const [tableDataset, setTableDataset] = useState();
   const [lineDataset, setLineDataset] = useState();

   useEffect(() => {
      TableObject &&
         (async () => {
            const { model, layout } = await TableObject;
            const { qDimensionInfo, qMeasureInfo } = await layout.qHyperCube;
            const hypercube = await model.getHyperCubeData({
               qPath: "/qHyperCubeDef",
               qPages: [
                  {
                     qTop: 0,
                     qLeft: 0,
                     qWidth: layout.qHyperCube.qSize.qcx,
                     qHeight: 5
                  }
               ]
            });
            const qMatrix = await hypercube[0].qMatrix;
            const result = await qMatrix;
            const data = DataFromqMatrix(result, qDimensionInfo, qMeasureInfo);
            //setTableDataset(data);
         })();

      LineObject &&
         (async () => {
            const { layout } = await LineObject;
            const { qDimensionInfo, qMeasureInfo } = await layout.qHyperCube;
            const qMatrix = await layout.qHyperCube.qDataPages[0].qMatrix;
            const data = DataFromqMatrix(qMatrix, qDimensionInfo, qMeasureInfo);
            setLineDataset(data);
         })();
   }, [TableObject, LineObject, setLineDataset]);

   return (
      <div>
         <Indicators>
            {lineDataset && <LinearChart dataset={lineDataset} />}
         </Indicators>
      </div>
   );
};

export default FraudAnalysis;
