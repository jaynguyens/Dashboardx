import React from "react";
import styled from "styled-components";

const Indicator = ({ title }) => {
   /*
   const annualPremium =
      selection.map(d => d["Ave Annual Premium"]).reduce((a, b) => a + b, 0) /
      selection.length;

   const totalCost =
      selection
         .map(d => d["Ave Total Claims Cost"])
         .reduce((a, b) => a + b, 0) / selection.length;

   const lossRatio =
      selection.map(d => d["Loss Ratio"]).reduce((a, b) => a + b, 0) /
      selection.length;
      */
   return (
      <Box>
         <Title>{title}</Title>
         {/*	<Number>
				{title === "Loss Ratio"
					? `${lossRatio.toFixed(2)}%`
					: title === "Ave Annual Premium"
					? `£ ${annualPremium.toFixed(2)}`
					: `£ ${totalCost.toFixed(2)}`}
				<p>{selection[title]}</p>
         </Number>*/}
      </Box>
   );
};

export default Indicator;

const Title = styled.h1`
   font-size: 1.125rem;
   color: #4a5568;
`;
// eslint-disable-next-line
const Div = styled.div`
   display: flex;
   height: 100%;
   width: 100%;
   justify-content: center;
   flex-direction: column;
   align-items: center;
`;
// eslint-disable-next-line
const Number = styled.h1`
   font-size: 2rem;
   padding: 1rem 0.5rem;
   margin: 0;
   color: #2d3748;
`;

const Box = styled.div`
   width: 250px;
   height: 200px;
   background-color: #fff;
   margin: 25px;
   border-radius: 4px;
   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;
