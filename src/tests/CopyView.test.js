import React from 'react'
import { render, screen } from './test-utils'
import CopyView from '../components/CopyView'

describe('CopyView', () => {
	test('Renders component sections', () => {
		render(<CopyView />)
		const alertBox = screen.getByRole('alert')
		const alertMessage = screen.getByText(
			/before continuing, copy and save your secret in a private place, otherwise you will not be able to return to your account\./i
		)
		const keyInput = screen.getByRole('textbox')
		const copyButton = screen.getByRole('button', { name: /copy/i })
		const backButton = screen.getByRole('button', { name: /back/i })
		const continueButton = screen.getByRole('button', { name: /continue/i })

		expect(alertBox).toBeInTheDocument()
		expect(alertMessage).toBeInTheDocument()
		expect(keyInput).toBeInTheDocument()
		expect(copyButton).toBeInTheDocument()
		expect(backButton).toBeInTheDocument()
		expect(continueButton).toBeInTheDocument()
	})
})
