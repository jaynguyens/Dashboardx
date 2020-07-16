import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SelectionContext } from "../../enigma/selectionContext";
import useModel from "../../hooks/useModel";

const Indicator = ({ dataset, objectId }) => {
   const [data, setData] = useState(dataset);
   const [selection, setSelection] = useContext(SelectionContext);
   const model = useModel(objectId);

   useEffect(() => {
      setData(dataset);
      if (selection && model !== undefined) {
         (async () => {
            const layout = await model.getLayout();
            const qTitle = layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
            const qMatrix = await layout.qHyperCube.qDataPages[0].qMatrix;
            setData([qTitle, qMatrix]);
         })();
      }
   }, [dataset, model, selection]);

   return (
      <Box>
         <Title>{data ? data[0] : <p>Loading...</p>}</Title>
         <Number>{data ? data[1][0][0].qText : <p>loading...</p>}</Number>
      </Box>
   );
};

export default Indicator;

const Title = styled.h1`
   font-size: 1.125rem;
   color: #4a5568;
`;

const Number = styled.h1`
   font-size: 2rem;
   padding: 1rem 0.5rem;
   margin: 0;
   color: #2d3748;
`;

const Box = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 250px;
   height: 200px;
   background-color: #fff;
   margin: 25px;
   border-radius: 4px;
   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;
