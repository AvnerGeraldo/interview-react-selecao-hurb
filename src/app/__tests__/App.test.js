import React from 'react'
import { shallow } from 'enzyme'

//Component
import App from '../index'

//API
import { getBackgroundImage } from '../../api/backgroundAPI'
import { Geolocation } from '../../api/GeoAPI'

jest.mock('../../api/backgroundAPI')

describe('Check if background image is fetch from Bing API', () => {
	it('Function \'getBackgroundImage\' is called after componentDidMount', () => {
		getBackgroundImage.mockImplementation(() => Promise.resolve({
			urlImage: 'https://url-image',
			alt: 'Image'
		}))

		shallow(<App />)		
		expect(getBackgroundImage).toHaveBeenCalled()
	})

	it('Change \'backgroundImage\' state after componentDidMount is called', () => {
		const wrapper = shallow(<App />)
		
		//Calls componentDidMount
		wrapper.instance().componentDidMount()

		expect(wrapper.state().backgroundImage).not.toEqual(expect(""))
	})
})

describe('Geolocation API', () => {
	const mockPromiseResult = {
		coords: {
			latitude: -20.5,
			longitude: -21.7
		}
	}

	it('Receive coords from Geolocation API', () => {
		const mockGeolocation = {
			getCurrentPosition: jest.fn()
				.mockImplementation((success) => Promise.resolve(mockPromiseResult))
		}

		global.navigator.geolocation = mockGeolocation

		global.navigator.geolocation.getCurrentPosition()
			.then(res => expect(res).toBe(mockPromiseResult))
	})

	it('Get name of location by receive coords', () => {
		const { latitude, longitude } = mockPromiseResult.coords
		const result = {
			city: 'Rio de Janeiro',
			state: 'Rio de Janeiro'
		}

		jest.mock('../../api/GeoAPI', (latitude, longitude) => Promise.resolve({
			city: 'Rio de Janeiro',
			state: 'Rio de Janeiro'
		}))

		Geolocation(latitude, longitude)
		.then(res => expect(res).toBe(result))
	})

	it('Check if \'userLocation\' State change when location name is received', () => {
		const { latitude, longitude } = mockPromiseResult.coords
		const locationName = {
			city: 'Rio de Janeiro',
			state: 'Rio de Janeiro'
		}

		jest.mock('../../api/GeoAPI', (latitude, longitude) => Promise.resolve({
			city: 'Rio de Janeiro',
			state: 'Rio de Janeiro'
		}))

		const wrapper = shallow(<App />)
		wrapper.instance()

		Geolocation(latitude, longitude)
		.then(success => expect(wrapper.state().userLocation).toEqual(`${locationName.city}, ${locationName.state}`))
	})
})