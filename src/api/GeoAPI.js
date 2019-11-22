export const Geolocation = async (latitude, longitude) => {
	try {
		const url = 'https://api.opencagedata.com/geocode/v1/json'
		const urlAPI = `${url}?q=${latitude}+${longitude}&key=c63386b4f77e46de817bdf94f552cddf&language=pt-BR`

		const res = await fetch(urlAPI)
		const data = await res.json()

		if (data.results && data.results.length > 0) {
			const { city, state } = data.results[0].components
			
			return {
				city,
				state
			}
		}

		if (res.status && res.status.code !== 200)
			throw new Error(res.status.message)
	} catch(e) {
		return {
			error: e.message
		}
	}
}