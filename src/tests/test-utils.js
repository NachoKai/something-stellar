import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const Providers = ({ children }) => <ChakraProvider>{children}</ChakraProvider>

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }

Providers.propTypes = {
	children: PropTypes.node,
}
