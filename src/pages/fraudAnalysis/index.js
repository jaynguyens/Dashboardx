import React, { useState, useContext } from "react";
import { QDocContext } from "../../enigma/docProvider";

const FraudAnalysis = () => {
   const qdoc = useContext(QDocContext);
   const object = "5cab8f15-5702-48ec-b51c-a39d31857de8";

   (async () => {
      const session = await qdoc.getObject(object);
      const layout = await session.getLayout();
      const hypercube = await session.getHyperCubeData({
         qPath: "/qHyperCubeDef",
         qPages: [
            {
               qTop: 0,
               qLeft: 0,
               qWidth: layout.qHyperCube.qSize.qcx,
               qHeight: 500
            }
         ]
      });
      const qMatrix = await hypercube;

      console.log(qMatrix);
   })();
   return <div> Fraud analysis </div>;
};

export default FraudAnalysis;
