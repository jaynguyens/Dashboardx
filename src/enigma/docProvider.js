import React, { useState, useEffect, createContext } from "react";
import { openSession, closeSession } from "./configSession";

export const QDocContext = createContext();

const DocProvider = ({ children }) => {
   const [qDoc, setqDoc] = useState();

   useEffect(() => {
      const openDoc = async () => {
         setqDoc(await openSession());
      };
      openDoc();
      return closeSession;
   }, []);
   return (
      <>
         {!qDoc && <>Connection to Qlik </>}
         {qDoc && <QDocContext value={qDoc}> {children} </QDocContext>}
      </>
   );
};
console.log("QDContext", QDocContext);
export default DocProvider;
