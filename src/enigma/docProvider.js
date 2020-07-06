import React, { useState, useEffect, createContext } from "react"
import { openSession, closeSession } from "./configSession"

export const QDocContext = createContext()

const DocProvider = ({ children }) => {
	const [qDoc, setqDoc] = useState()

	useEffect(() => {
		const openDoc = async () => {
			setqDoc(await openSession())
		}
		openDoc()
		return closeSession
	}, [])
	return (
		<React.StrictMode>
			{qDoc && (
				<QDocContext.Provider value={qDoc}>
					{children}
				</QDocContext.Provider>
			)}
		</React.StrictMode>
	)
}
export default DocProvider
