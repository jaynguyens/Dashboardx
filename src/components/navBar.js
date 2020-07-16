import React, { useContext } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { QDocContext } from "../enigma/docProvider";
import { SelectionContext } from "../enigma/selectionContext";

const NavBar = () => {
   let match = useRouteMatch();
   const qdoc = useContext(QDocContext);
   const [selection, setSelection] = useContext(SelectionContext);
   const handleClick = async () => {
      try {
         await qdoc.clearAll();
         //  window.location.reload(false);
         setSelection([]);
      } catch (e) {
         console.error("Error on clear selection", e);
      }
   };
   return (
      <Div>
         <Links exact to={`${match.url}`}>
            Summary
         </Links>
         <Links exact to={`${match.url}/claims-costs-analysis`}>
            Claims Cost Analysis
         </Links>
         <Links exact to={`${match.url}/fraud-analysis`}>
            Fraud Analysis
         </Links>
         <button onClick={handleClick}>Clear Selection</button>
      </Div>
   );
};

export default NavBar;

const Div = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 7vh;
   border-bottom: 1px solid #e2e8f0;
   box-sizing: border-box;
`;
const Links = styled(NavLink)`
   /* margin: 0.5rem; */
   height: 100%;
   text-decoration: none;
   display: flex;
   text-align: center;
   align-items: center;
   padding: 0 0.5rem;
   margin: 0 0.25rem;
   font-size: 1rem;
   font-weight: bold;
   color: #4a5568;
   &.active {
      color: #3182ce;
      border-bottom: 1px solid #2b6cb0;
   }
`;
