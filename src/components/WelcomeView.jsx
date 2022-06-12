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
import GradientText from './common/GradientText'

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
		try {
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
					isClosable: true,
				})
			}
		} catch (err) {
			toast({
				title: 'An error has occurred',
				description: err.message,
				status: 'error',
				isClosable: true,
			})
		}
	}

	return (
		<Stack justifyContent="center" maxWidth="48rem" width="100%">
			<Heading>
        Welcome to your <GradientText>Stellar Wallet</GradientText>
			</Heading>
			<Text fontSize="xl">Create your stellar account quickly and easily</Text>
			<Button
				boxShadow="0 10px 15px -3px skyblue,0 4px 6px -4px blue;"
				mt="24px"
				size="lg"
				variantColor="blue"
				onClick={handleCreateAccount}
			>
        Create Account
			</Button>

			<Divider borderColor="lightgrey" borderWidth="1px" my={8} />

			<Text mt={8}>Or import an account with your secret key:</Text>
			<InputGroup>
				<Input
					isInvalid={secretToImport.length !== 56 && secretToImport.length > 0}
					mr={2}
					placeholder="Account to check"
					roundRight="0"
					value={secretToImport}
					onChange={({ target: { value } }) => setSecretToImport(value)}
				/>
				<Button variantColor="green" onClick={importAccount}>
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
