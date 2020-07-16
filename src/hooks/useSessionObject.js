import { useState, useEffect, useContext } from "react";
import { QDocContext } from "../enigma/docProvider";

const useSessionObject = definition => {
   const [object, setObject] = useState();
   const qdoc = useContext(QDocContext);

   useEffect(() => {
      const GetSessionObject = async () => {
         const sessioObject = await qdoc.createSessionObject(definition);
         const result = await sessioObject;

         setObject(result);
      };
      GetSessionObject();
   }, [qdoc, definition]);

   return object;
};

export default useSessionObject;
