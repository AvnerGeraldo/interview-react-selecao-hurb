import React, { PureComponent } from 'react'

//Css
import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap
import { Row, Col } from 'react-bootstrap'

//Components
import AppConfig from './config'
import SearchText from './components/SearchText/SearchText'
import WeatherBox from './components/WeatherBox/WeatherBox'

//Bing API
import { getBackgroundImage } from '../api/backgroundAPI'

//Geolocation API
import { Geolocation } from '../api/GeoAPI'

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
		backgroundImage: '',
		userLocation: ''
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
			.catch(e => console.error(`Error: ${e.message}`))

		//Check Geolocation API
		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(position => {
				const latitude = position.coords.latitude
				const longitude = position.coords.longitude

				Geolocation(latitude, longitude)
					.then(res => {
						if (res.error)
							throw new Error(res.error)
						
						this.setState({ userLocation: `${res.city}, ${res.state}` })
					})
					.catch(e => console.error(e.message))
			}, error => console.error(error.message))
	}

	render() {
		const { backgroundImage, userLocation } = this.state

		return (
			<AppConfig>
				<Container className="container-fluid" style={{
					background: `url(${backgroundImage}) no-repeat`
				}}>
					<Row className="justify-content-center">
						<Col lg="4" md="6" xs="12">
							<SearchText userLocation={userLocation} />
							<WeatherBox />
						</Col>
					</Row>
				</Container>
			</AppConfig>
		)
	}
}

export default App