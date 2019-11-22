import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//Actions
import { SET_WEATHER_DATA, FAIL_SET_WEATHER_DATA } from '../../actions'

//API
import { getWeatherByCity } from '../../../api/WeatherAPI'

//Components
import WeatherDetails from './WeatherDetails'

const Box = styled.div`
	.weather-box:nth-child(3) {
		background: rgba(0,0,0,.4);
	}
	.weather-box:first-child {
		height: 14rem;
		background: rgba(0,0,0,.5);
	}
	.weather-box {
		background-color: rgba(0,0,0,.7);
		opacity: 0.9;
		min-height: 5rem;
	}
`

const Col = styled.div`
	${props => props.background ? `background: rgba(${props.background},${props.opacity}) !important;`: ''}
`
class WeatherBox extends Component
{
	changeWeatherUnit = async (city, unit) => {
		const { dispatch } = this.props

		try {
			const data = await getWeatherByCity(city, unit)

			if (data.error)
				throw new Error(data.error)

			dispatch({
				type: SET_WEATHER_DATA,
				payload: {
					data
				}
			})
		} catch(e) {
			dispatch({
				type: FAIL_SET_WEATHER_DATA,
				payload: {
					error: e.message
				}
			})
		}
	}

	render() {
		const { data, error } = this.props

		if (Object.keys(data).length === 0 || error) {
			return (
				<Box className="justify-content-center">
					<Col className="col-12 weather-box" style={{
						textAlign: 'center',
						padding: '6rem 0',
						fontWeight: 'bold',
						color: 'red',
						textTransform: 'capitalize'
					}}>{error || "Nothing to Show"}</Col>		
					<Col className="col-12 weather-box"></Col>
					<Col className="col-12 weather-box"></Col>
				</Box>	
			)
		}

		//Change unit
		const changeUnit = data.city.unit === 'metric' ? 'imperial' : 'metric'

		return (
			<Box className="justify-content-center">
				{data && data.list.map((item, index) => {
					const temperature = item.main.temp
					

					let color = "255, 215, 0"
					let opacity = ''

					if (temperature < 15) {
						color = "70, 130, 180"
						opacity = ""
					} else if (temperature > 35) {
						color = "255, 0, 0"
					}

					//Define opacity
					switch (index + 1) {
						case 1:
							opacity = ".5"
							break
						case 3:
							opacity = ".4"
							break;				
						default:
							opacity = ".7"
							break;
					}
		
					return (
						<Col
							className="col-12 weather-box" 
							key={index}
							background={color}
							opacity={opacity}
							onClick={_=>this.changeWeatherUnit(data.city.name, changeUnit)}>
							
							<WeatherDetails
								index={index}
								date={item.dt_txt} 
								temperature={temperature}
								description={item.weather[0].description}
								wind={item.wind.speed}
								humidity={item.main.humidity}
								pressure={item.main.pressure} 
								unit={data.city.unit === 'metric' ? 'C' : 'F'}
								icon={item.weather[0].icon} />
						</Col>
					)
				})}
			</Box>
		)
	}
}

const { string, object } = PropTypes

WeatherBox.propTypes = {
	data: object.isRequired,
	error: string
}

const mapStateToProps = ({ data, error }) => ({
	data,
	error
})

export default connect(mapStateToProps)(WeatherBox)