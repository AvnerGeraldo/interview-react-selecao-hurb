import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//Bootstrap
import { Form, InputGroup } from 'react-bootstrap'

//API
import { getWeatherByCity } from '../../../api/WeatherAPI'

//Actions
import { SET_WEATHER_DATA, FAIL_SET_WEATHER_DATA } from '../../actions'

//Assets
import compassIcon from '../../assets/images/compass.svg'

class SearchText extends PureComponent
{
	state = {
		textValue: ''
	}

	componentDidUpdate(prevProps, prevState) {
		const { userLocation } = this.props

		if (prevState.textValue.length === 0 && userLocation.length > 0) {
			this.setState({ textValue: userLocation })
			this.findWeatherByCity(userLocation)
		}
	}
	

	searchTextHandler = e => {
		const city = e.target.value
		
		//Find Weather
		this.findWeatherByCity(city)

		//Set State
		this.setState({ textValue: city })
	}

	findWeatherByCity = (city) => {
		const { dispatch } = this.props

		if (city.length > 2) {
			getWeatherByCity(city)
				.then(data => 
				{
					if (data.error)
						throw new Error(data.error)
						
					dispatch({
						type: SET_WEATHER_DATA,
						payload: {
							data
						}
					})
				})
				.catch(e => dispatch({
					type: FAIL_SET_WEATHER_DATA,
					payload: {
						error: e.message
					}
				}))
		}
	}

	render() {
		return (
			<Form>
				<Form.Group style={{ marginBottom: 0 }}>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text style={{ 
								padding: '0px',
								background: '#D3D3D3',
								border: '0px',
								borderRadius: '0px'
							}}>
								<img 
									src={compassIcon} 
									alt="Location Icon"
									width="40px"
									height="30px" /></InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							type="text"
							placeholder="City, State"
							required 
							onChange={this.searchTextHandler}
							value={this.state.textValue} 
							style={{
								border: '0px',
								background: '#D3D3D3',
								borderRadius: '0px',
								fontWeight: 'bold',
								color: '#8B8989'
							}}/>
					</InputGroup>
				</Form.Group>
			</Form>
		)
	}
}

const { string, object } = PropTypes

SearchText.propTypes = {
	data: object,
	error: string
}

export default connect()(SearchText)