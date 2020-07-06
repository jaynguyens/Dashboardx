import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DocProvider from "./enigma/docProvider";
ReactDOM.render(
	<DocProvider>
		<App />
	</DocProvider>,
	document.getElementById("root")
);
