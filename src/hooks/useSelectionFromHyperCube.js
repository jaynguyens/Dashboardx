import { useState, useEffect, useContext } from "react"
import { QDocContext } from "../enigma/docProvider"
// https://godoc.org/github.com/qlik-oss/enigma-go#GenericObject.SelectHyperCubeValues

const useSelectionFromHyperCube = (definition, values) => {
	const [data, setData] = useState()
	const qdoc = useContext(QDocContext)

	useEffect(() => {
		const DataFromSessionObject = async () => {
			const app = await qdoc.createSessionObject(definition)
			app.selectHyperCubeValues("/qHyperCubeDef", 0, values, false)
			const layout = await app.getLayout()
			const dataset = await layout.qHyperCube.qDataPages[0].qMatrix
			setData(dataset)
		}
		DataFromSessionObject()
		// eslint-disable-next-line
	}, [qdoc, definition])
	return data
}

export default useSelectionFromHyperCube
