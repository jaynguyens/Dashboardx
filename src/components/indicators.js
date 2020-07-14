import React from "react";
import styled from "styled-components";

const Indicators = ({ children }) => {
   return <Div>{children}</Div>;
};

export default Indicators;

const Div = styled.div`
   display: flex;
   flex-wrap: wrap;
   background-color: rgba(247, 250, 252);
   justify-content: center;
`;
