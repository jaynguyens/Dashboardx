import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Homepage = () => {
	return (
		<Div>
			<h1>Insurance Claims 2020</h1>
			<Button to="/dashboard">Access Dashboard</Button>
		</Div>
	)
}

export default Homepage

const Div = styled.div`
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image: url("/email-pattern.png");
`
const Button = styled(Link)`
	margin: 1rem;
	text-transform: uppercase;
	text-decoration: none;
	font-weight: bold;
	color: darkorange;
	padding: 20px;
	border: 4px solid #494949;
	transition: all 0.4s ease 0s;
	&:hover {
		color: #fff;
		background-color: #f6b93b;
		border-color: #f6b93b;
		transition: all 0.4s ease 0s;
	}
`
