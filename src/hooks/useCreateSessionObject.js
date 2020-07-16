import { useContext } from "react";
import { QDocContext } from "../enigma/docProvider";

const useCreateSessionObject = async definition => {
   const qdoc = useContext(QDocContext);

   const session = await qdoc.createSessionObject(definition);
   const result = await session;
   /*  useEffect(() => { */
   //    const GetSession = async () => {
   //       await qdoc.createSessionObject(definition).then(setSession);
   //    };
   //    GetSession();
   // }, [definition, qdoc]);
   return result;
};

export default useCreateSessionObject;
