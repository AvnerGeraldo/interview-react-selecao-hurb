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

	searchTextHandler = e => {
		const city = e.target.value
		
		//Find Weather
		this.findWeatherByCity(city)

		//Set State
		this.setState({ textValue: city })
	}

	findWeatherByCity = (city) => {
		const { dispatch } = this.props

		if (city.length > 4) {
			getWeatherByCity(city)
				.then(res => dispatch({
						type: SET_WEATHER_DATA,
						payload: {
							data: res.json()
						}
				}))
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
				<Form.Group>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text style={{ padding: '0px' }}>
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
							value={this.state.textValue} />
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