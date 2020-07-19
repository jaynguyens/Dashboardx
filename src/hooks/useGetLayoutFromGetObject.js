import { useState, useEffect, useContext } from "react";
import { QDocContext } from "../enigma/docProvider";

const useGetLayoutFromGetObject = objectId => {
   const [data, setData] = useState();
   const qdoc = useContext(QDocContext);

   useEffect(() => {
      (async function() {
         const model = await qdoc.getObject(objectId);
         const layout = await model.getLayout();
         setData({ model, layout });
      })();
   }, [qdoc, objectId]);
   return data;
};

export default useGetLayoutFromGetObject;
