import React, { useState } from 'react'
import PropTypes from 'prop-types'
import StellarSdk from 'stellar-sdk'
import {
	Heading,
	Text,
	Button,
	InputGroup,
	Input,
	useToast,
	Divider,
	Stack,
} from '@chakra-ui/core'

import createAccount from '../utils/createAccount'

const WelcomeView = ({ setPublicKey, setSecret, setKeyCopied }) => {
	const toast = useToast()
	const [secretToImport, setSecretToImport] = useState('')

	const handleCreateAccount = () => {
		const keys = createAccount()

		localStorage.setItem('secret', keys?.secret)
		localStorage.setItem('publicKey', keys?.publicKey)
		setPublicKey(keys?.publicKey)
		setSecret(keys?.secret)
	}

	const importAccount = () => {
		// All secret keys are 56 characters long
		if (secretToImport.length === 56) {
			const sourceKeys = StellarSdk.Keypair.fromSecret(secretToImport)

			localStorage.setItem('secret', secretToImport)
			localStorage.setItem('publicKey', sourceKeys?.publicKey())
			localStorage.setItem('keyCopied', true)

			setPublicKey(sourceKeys?.publicKey())
			setSecret(secretToImport)
			setKeyCopied(true)
		} else {
			toast({
				title: 'Error',
				description: 'Make sure your secret key is correct',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return (
		<Stack width="100%" maxWidth="48rem" justifyContent="center">
			<Heading>Welcome to your Stellar Wallet</Heading>
			<Text fontSize="xl">Create your stellar account quickly and easily</Text>
			<Button onClick={handleCreateAccount} size="lg" variantColor="blue" mt="24px">
        Create Account
			</Button>

			<Divider my={8} borderWidth="2px" borderColor="black" />

			<Text mt={8}>Or import an account with your secret key:</Text>
			<InputGroup>
				<Input
					onChange={({ target: { value } }) => setSecretToImport(value)}
					value={secretToImport}
					placeholder="Account to check"
					roundRight="0"
					mx={2}
				/>
				<Button onClick={importAccount} variantColor="green">
          Import
				</Button>
			</InputGroup>
		</Stack>
	)
}

export default WelcomeView

WelcomeView.propTypes = {
	setPublicKey: PropTypes.func,
	setSecret: PropTypes.func,
	setKeyCopied: PropTypes.func,
}
