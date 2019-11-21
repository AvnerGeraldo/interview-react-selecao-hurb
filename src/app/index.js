import React, { PureComponent } from 'react'

//Css
import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap
import { Row, Col } from 'react-bootstrap'

//Components
import AppConfig from './config'
import SearchText from './components/SearchText/SearchText'
import WeatherBox from './components/WeatherBox/WeatherBox'

import { getBackgroundImage } from '../api/backgroundAPI'

//styled
import styled from 'styled-components'

const Container = styled.div`
	min-height: 100vh;
    min-width: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

class App extends PureComponent
{
	state = {
		backgroundImage: ''
	}

	componentDidMount() {
		getBackgroundImage()
			.then(res => {

				if (res.error)
					throw new Error(res.error)
					
				this.setState({
					backgroundImage: res.urlImage
				})
			})
			.catch(e => alert(`Error: ${e.message}`))
	}

	render() {
		const { backgroundImage } = this.state

		return (
			<AppConfig>
				<Container className="container-fluid" style={{
					background: `url(${backgroundImage}) no-repeat`
				}}>
					<Row className="justify-content-center">
						<Col md="auto" lg="4" md="6" xs="12">
							<SearchText />
							<WeatherBox />
						</Col>
					</Row>
				</Container>
			</AppConfig>
		)
	}
}

export default App