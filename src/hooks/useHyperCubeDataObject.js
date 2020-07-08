import { useState, useEffect, useContext } from "react"
import { QDocContext } from "../enigma/docProvider"

const useHyperCubeDataObject = (object, definition) => {
	const [data, setData] = useState()
	const qdoc = useContext(QDocContext)

	useEffect(() => {
		const GetDataFromObject = async () => {
			// const session = await qdoc.createSessionObject(SummaryClaimsOpened)
			const layout = await qdoc.getObject(object)
			const data = await layout.getHyperCubeData(definition)
			setData(data[0].qMatrix)
		}
		GetDataFromObject()
	}, [qdoc, object, definition])

	return data
}

export default useHyperCubeDataObject
