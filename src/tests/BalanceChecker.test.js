import React from 'react'
import { render, screen } from './test-utils'
import BalanceChecker from '../components/BalanceChecker'

describe('BalanceChecker', () => {
	test('Renders component sections', () => {
		render(<BalanceChecker />)
		const balanceCheckerTitle = screen.getByText(/balance checker/i)
		const checkButton = screen.getByRole('button', { name: /check/i })
		const input = screen.getByPlaceholderText('Account to check')

		expect(balanceCheckerTitle).toBeInTheDocument()
		expect(checkButton).toBeInTheDocument()
		expect(input).toBeInTheDocument()
	})
})
