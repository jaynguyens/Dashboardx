import React from "react"
import { NavLink, useRouteMatch } from "react-router-dom"
import styled from "styled-components"

const NavBar = () => {
	let match = useRouteMatch()

	return (
		<Div>
			<Links exact to={`${match.url}`}>
				Summary
			</Links>
			<Links exact to={`${match.url}/claims-cost-analysis`}>
				Claims Cost Analysis
			</Links>
			<Links exact to={`${match.url}/fraud-analysis`}>
				Fraud Analysis
			</Links>
		</Div>
	)
}

export default NavBar

const Div = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 7vh;
	border-bottom: 1px solid #e2e8f0;
`
const Links = styled(NavLink)`
	/* margin: 0.5rem; */
	height: 100%;
	text-decoration: none;
	display: flex;
	text-align: center;
	align-items: center;
	padding: 0 0.5rem;
	margin: 0 0.25rem;
	font-size: 1rem;
	font-weight: bold;
	color: #4a5568;
	&.active {
		color: #3182ce;
		border-bottom: 1px solid #2b6cb0;
	}
`
