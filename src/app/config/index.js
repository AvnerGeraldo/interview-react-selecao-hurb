import React from 'react'
import { Provider } from 'react-redux'

//Store
import store from '../store'

export default ({ children }) => (
	<Provider store={store}>
		{children}
	</Provider>
)