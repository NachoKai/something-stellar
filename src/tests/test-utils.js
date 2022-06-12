import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'
import PropTypes from 'prop-types'

const Providers = ({ children }) => <ThemeProvider>{children}</ThemeProvider>

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }

Providers.propTypes = {
	children: PropTypes.node,
}
