import React from 'react'
import { shallow } from 'enzyme'

//Component
import SearchText from '../SearchText'

//Store
import store from '../../../store'

describe('Test SearchText component', () => {
	describe('Receiving \'userLocation\' props from out of component', () => {
		const props = {
			userLocation: ''
		}

		let wrapper

		beforeEach(() => {
			wrapper = shallow(
					<SearchText {...props} store={store}/>
			).dive()
		})

		it('Set state correctly when component receive \'userLocation\' props', () => {
			const newProps = {
				userLocation: 'Rio de Janeiro, Rio de Janeiro'
			}

			//Set props after receiving location name
			wrapper.setProps(newProps)

			//Check call of findWeatherByCity
			expect(wrapper.state().textValue).toEqual(newProps.userLocation)
		})

		it('Call \'findWeatherByCity\' when component receiving \'userLocation\' props', () => {
			const spy = jest.spyOn(wrapper.instance(), "findWeatherByCity")

			//Set props after receiving location name
			wrapper.setProps({ userLocation: 'Rio de Janeiro, Rio de Janeiro' })

			//Check call of findWeatherByCity
			expect(spy).toHaveBeenCalled()
		})
	})
})