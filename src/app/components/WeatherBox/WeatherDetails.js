import React from 'react'

//Boostrap
import { Row, Col } from 'react-bootstrap'

//Styled Components
import styled from 'styled-components'

const BoxDetail = styled.div`
	padding: 0px;
	font-weight: bold;
	color: #FFF;
`

const ImgWeather = styled.img`
	width: 85%;
    margin: 16px 5px;
    filter: invert(1);
`

export default props => {
	const { index, temperature, unit, description, wind, humidity, pressure, icon } = props
	let iconImage = ''

	//Require Icon
	if (icon)
		iconImage = require(`../../assets/images/${icon}.svg`)

	//Day
	let day = ""
	switch (index) {
		case 1:
			day = "Amanhã"
			break;
		case 2:
			day = "Depois de Amanhã"
			break;	
		default:
			day = "Hoje"
			break;
	}
	return (
		<Row>
			<BoxDetail className="col-5">
				{(index === 0 && iconImage) && (
					<ImgWeather src={iconImage} alt={description}/>
				)}
			</BoxDetail>
			<BoxDetail className="col-7">
				<Col xs={12} style={{ paddingRight: 0 }}>
					<span>{day.toUpperCase()}</span><br />
					<span>{temperature} º{unit}</span>
				</Col>
				{(index === 0) && (
					<Col xs={12} style={{ paddingRight: 0 }}>
						<div>
							<span style={{ textTransform: 'capitalize' }}>{description}</span>
						</div>
						<div>
							<span>Vento: NO {wind} km/h</span><br />
							<span>Humidade: {humidity} %</span><br />
							<span>Pressão: {pressure} hPA</span>
						</div>
					</Col>
				)}
			</BoxDetail>
		</Row>
	)
}