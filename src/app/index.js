import React from 'react'

//Css
import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap
import { Row, Col } from 'react-bootstrap'

//Components
import AppConfig from './config'
import SearchText from './components/SearchText/SearchText'
import WeatherBox from './components/WeatherBox/WeatherBox'

//styled
import styled from 'styled-components'

const Container = styled.div`
	min-height: 100vh;
    min-width: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export default _=> (
	<AppConfig>
		<Container className="container-fluid">
			<Row className="justify-content-center">
				<Col md="auto" lg="6" md="6" xs="12">
					<SearchText />
					<WeatherBox />
				</Col>
			</Row>
		</Container>
	</AppConfig>
)