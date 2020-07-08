import React from "react"
import ClaimsVehicle from "../../enigma/definition/claims-costs/vehicleInsurance"
import useSelectionFromHyperCube from "../../hooks/useSelectionFromHyperCube"
import useLayoutSessionObject from "../../hooks/useLayoutSessionObject"

const ClaimsCosts = () => {
	// const data = useLayoutSessionObject(ClaimsVehicle)
	// console.log(data)

	const selection = useSelectionFromHyperCube(ClaimsVehicle, [3, 5, 7, 8])
	console.log(selection)
	return <div>Claims Cost Analysis here</div>
}

export default ClaimsCosts
