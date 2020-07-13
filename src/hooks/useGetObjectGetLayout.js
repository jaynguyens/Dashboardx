import { useState, useEffect, useContext } from "react"
import { QDocContext } from "../enigma/docProvider"

const useGetObjectGetLayout = (object) => {
	const [data, setData] = useState()
	const qdoc = useContext(QDocContext)

	useEffect(() => {
		;(async function () {
			const model = await qdoc.getObject(object)
			const layout = await model.getLayout()
			setData(layout.qHyperCube.qDataPages[0].qMatrix)
		})()
	}, [qdoc, object])

	return data
}

export default useGetObjectGetLayout
