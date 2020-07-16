import React, { useState } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   useRouteMatch,
   useParams
} from "react-router-dom";
import Homepage from "./pages/homepage";
import SummaryPage from "./pages/summary";
import NavBar from "./components/navBar";
import ClaimsCosts from "./pages/claimsCosts";
import FraudAnalysis from "./pages/fraudAnalysis";
import { Provider } from "./enigma/selectionContext";

const Routes = () => {
   return (
      <Router>
         <div>
            <Switch>
               <Route path="/dashboard">
                  <Dashboards />
               </Route>
               <Route path="/">
                  <Homepage />
               </Route>
            </Switch>
         </div>
      </Router>
   );
};

function Dashboards() {
   let match = useRouteMatch();
   const [selection, setSelection] = useState([]);
   return (
      <>
         <Provider value={[selection, setSelection]}>
            <NavBar />
            <div
               style={{
                  minHeight: "93vh",
                  backgroundColor: "rgba(247,250,252)"
               }}
            >
               <Switch>
                  <Route exact path={`${match.path}/claims-costs-analysis`}>
                     <ClaimsCosts />
                  </Route>
                  <Route exact path={`${match.path}/fraud-analysis`}>
                     <FraudAnalysis />
                  </Route>

                  <Route exact path={`${match.path}/:topicId`}>
                     <NotAvail />
                  </Route>
                  <Route exact path={match.path}>
                     <SummaryPage />
                  </Route>
               </Switch>
            </div>
         </Provider>
      </>
   );
}

const NotAvail = () => {
   let { topicId } = useParams();
   return (
      <h3>Requested dashboard ID: {topicId}. Not Available At the Moment.</h3>
   );
};
export default Routes;
