import React from 'react'
import { render, screen } from './test-utils'
import WelcomeView from '../components/WelcomeView'

describe('WelcomeView', () => {
	test('Renders component sections', () => {
		render(<WelcomeView />)
		const title = screen.getByRole('heading', {
			name: /welcome to your stellar wallet/i,
		})
		const subtitle = screen.getByText(/create your stellar account quickly and easily/i)
		const createAccount = screen.getByRole('button', { name: /create account/i })
		const importSubtitle = screen.getByText(
			/or import an account with your secret key:/i
		)
		const importInput = screen.getByRole('textbox')
		const importButton = screen.getByRole('button', { name: /import/i })

		expect(title).toBeInTheDocument()
		expect(subtitle).toBeInTheDocument()
		expect(createAccount).toBeInTheDocument()
		expect(importSubtitle).toBeInTheDocument()
		expect(importInput).toBeInTheDocument()
		expect(importButton).toBeInTheDocument()
	})
})
