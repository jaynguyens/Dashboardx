import React, { useEffect, useContext } from "react"
import QDocContext from "../../enigma/docProvider"
import SummaryClaimsType from "../../enigma/definition/summary/claimstype"

const SummaryPage = () => {
	const qdoc = useContext(QDocContext)

	useEffect(() => {
		const ClaimType = async () => {
			const session = await qdoc.createSessionObject(SummaryClaimsType)
			const layout = await session.getLayout()
			const dataset = layout.qHyperCube.qDataPages[0].qMatrix

			dataset
				? console.log(dataset)
				: console.log(layout.qHyperCube.qMatrix)
		}
		ClaimType()
	}, [qdoc])

	return <div></div>
}

export default SummaryPage
