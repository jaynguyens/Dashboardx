import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DocProvider from "./enigma/docProvider";
ReactDOM.render(
   <React.StrictMode>
      <DocProvider>
         <App />
      </DocProvider>
   </React.StrictMode>,
   document.getElementById("root")
);
