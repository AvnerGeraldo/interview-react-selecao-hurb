import React from 'react'

//Css
import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap
import { Container, Row, Col } from 'react-bootstrap'

//Components
import AppConfig from './config'
import SearchText from './components/SearchText/SearchText'

export default _=> (
	<AppConfig>
		<Container fluid>
			<Row className="justify-content-center align-items-center">
				<Col md="auto" lg="4" xs="6">
					<SearchText />
				</Col>
			</Row>
		</Container>
	</AppConfig>
)