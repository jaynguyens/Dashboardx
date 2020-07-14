import { useState, useEffect, useContext } from "react";
import { QDocContext } from "../enigma/docProvider";

const useModel = objectId => {
   const [model, setModel] = useState();
   const qdoc = useContext(QDocContext);
   useEffect(() => {
      const GetModel = async () => {
         await qdoc.getObject(objectId).then(setModel);
      };
      GetModel();
   }, [objectId, qdoc]);

   return model;
};

export default useModel;
