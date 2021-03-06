import { useState, useEffect, useContext } from "react";
import { QDocContext } from "../enigma/docProvider";

const useGetObjectGetLayout = object => {
   const [data, setData] = useState();
   const qdoc = useContext(QDocContext);

   useEffect(() => {
      (async function() {
         const model = await qdoc.getObject(object);
         const layout = await model.getLayout();
         const qTitle = layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;

         if (!layout.qHyperCube.qDataPages[0]) {
            setData(layout);
            return;
         }
         const qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
         setData([qTitle, qMatrix]);
      })();
   }, [qdoc, object]);

   return data;
};

export default useGetObjectGetLayout;
