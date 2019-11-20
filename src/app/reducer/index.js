//Actions
import { SET_WEATHER_DATA, FAIL_SET_WEATHER_DATA } from '../actions'

const initialState = {
	data: {},
	error: ''
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_WEATHER_DATA:
			return {
				data: payload.data,
				error: ''
			}
		case FAIL_SET_WEATHER_DATA:
			return {
				data: {},
				error: payload.error
			}
		default:
			return state
	}
}