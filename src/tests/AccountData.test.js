import React from 'react'
import { render, screen } from './test-utils'
import AccountData from '../components/AccountData'

describe('AccountData', () => {
	test('Renders component sections', () => {
		render(<AccountData />)
		const publicKeyTitle = screen.getByText(/public key/i)
		const copyButton = screen.getByRole('button', { name: /copy/i })
		const accountBalanceTitle = screen.getByText(/account balance/i)
		const keyInput = screen.getByPlaceholderText('Public Key')

		expect(publicKeyTitle).toBeInTheDocument()
		expect(copyButton).toBeInTheDocument()
		expect(accountBalanceTitle).toBeInTheDocument()
		expect(keyInput).toBeInTheDocument()
	})
})
