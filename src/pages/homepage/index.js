import React from "react"
import { Link } from "react-router-dom"
const Homepage = () => {
	return (
		<div>
			Homepage
			<Link to="/dashboard">Access Dashboard</Link>
		</div>
	)
}

export default Homepage
