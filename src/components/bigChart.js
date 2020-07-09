import React from "react"
import styled from "styled-components"

const MiniChart = ({ children }) => {
	return <Div>{children}</Div>
}

export default MiniChart

const Div = styled.div`
	width: 80vw;
	height: 600px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
`
