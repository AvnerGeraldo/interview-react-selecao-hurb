const url = 'https://www.bing.com'
const urlBase = encodeURIComponent(`${url}/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR`)
const urlAPI = `https://jsonp.afeld.me/?url=${urlBase}`

export const getBackgroundImage = async _=> {
	try {
		const response = await fetch(urlAPI)
		const data = await response.json()

		if (data.images && Object.keys(data.images).length > 0) {
			return {
				urlImage: `${url}${data.images[0].url}`,
				alt: data.images[0].copyright
			}
		}

		throw new Error('No background found!')
	} catch(e) {
		return {
			error: e.message
		}
	}
}