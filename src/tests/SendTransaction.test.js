import React from 'react'
import { render, screen } from './test-utils'
import SendTransaction from '../components/SendTransaction'

describe('SendTransaction', () => {
	test('Renders component sections', () => {
		render(<SendTransaction />)
		const sendXlmTitle = screen.getByText(/send xlm/i)
		const input = screen.getByRole('spinbutton')
		const sendButton = screen.getByRole('button', { name: /send/i })
		const recipientInput = screen.getByPlaceholderText('Recipient')

		expect(sendXlmTitle).toBeInTheDocument()
		expect(input).toBeInTheDocument()
		expect(sendButton).toBeInTheDocument()
		expect(recipientInput).toBeInTheDocument()
	})
})
