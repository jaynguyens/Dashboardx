import React, { useEffect, useContext } from "react"
import { QDocContext } from "./enigma/docProvider"
import { SummaryClaimType } from "./enigma/definition/summary/claimtype"

function App() {
	const qdoc = useContext(QDocContext)
	useEffect(() => {
		const ClaimType = async () => {
			const session = await qdoc.createSessionObject(SummaryClaimType)
			//const layout = await session.getLayout()
			//const dataset = layout.qHyperCube.qDataPages[0].qMatrix

			console.log(session)
		}
		ClaimType()
	}, [qdoc])

	return <div className="App">hello this is App.js</div>
}

export default App
