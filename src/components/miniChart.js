import React from "react"
import styled from "styled-components"

const MiniChart = ({ children }) => {
	return <Div>{children}</Div>
}

export default MiniChart

const Div = styled.div`
	width: 250px;
	height: 200px;
	background-color: #fff;
	margin: 25px;
	border-radius: 4px;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05);
`
