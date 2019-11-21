import moment from 'moment'

const url = "http://api.openweathermap.org/data/2.5/forecast"
const token = "7ba73e0eb8efe773ed08bfd0627f07b8"

export const getWeatherByCity = async (city, units = 'metric') => {
	try {
		let endpoint = `${url}?q=${encodeURIComponent(city)}&APPID=${token}&lang=pt`
		endpoint += `&units=${units}`
		const response = await fetch(endpoint)
		const data = await response.json()

		if (data.message)
			throw new Error(data.message)

		const actualHour = moment(data.list[0].dt_txt).format('HH:mm:ss')
		
		//Filter data with starter hour
		data.list = data.list.filter(i => actualHour === moment(i.dt_txt).format('HH:mm:ss'))
			.filter((i, index) => index < 3)

		return { ...data }
	} catch(e) {
		return {
			error: e.message
		}
	}
}