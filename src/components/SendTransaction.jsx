import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	InputGroup,
	Input,
	InputLeftAddon,
	Button,
	useToast,
} from '@chakra-ui/core'

import sendTransaction from '../utils/sendTransaction'

const SendTransaction = ({ secret, updateAccount }) => {
	const toast = useToast()
	const [destination, setDestination] = useState('')
	const [amount, setAmount] = useState()

	const sendXLM = async () => {
		// All secret keys are 56 characters long
		if (destination.length === 56 && amount > 0) {
			try {
				toast({
					title: 'Sending XLM',
					description: 'Please wait...',
					status: 'warning',
					duration: 5000,
					isClosable: true,
				})

				const result = await sendTransaction(secret, destination, amount)

				toast({
					title: `${amount} XLM have been sent`,
					description: `Transaction hash: ${result.hash}`,
					status: 'success',
					duration: 5000,
					isClosable: true,
				})

				updateAccount()
			} catch (err) {
				toast({
					title: 'An error has occurred',
					description: err.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				})
			}
		} else {
			toast({
				title: 'Invalid data',
				description: 'Be sure to enter a correct address and send a valid amount.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<Text fontSize="xl" fontWeight={600} mt={6}>
        Send XLM
			</Text>
			<NumberInput
				step="0.001"
				mt={6}
				value={amount}
				onChange={value => setAmount(value)}
			>
				<InputLeftAddon>XLM</InputLeftAddon>
				<NumberInputField roundLeft="0" />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<InputGroup mt={6}>
				<Input
					onChange={({ target: { value } }) => setDestination(value)}
					value={destination}
					placeholder="Recipient"
					roundRight="0"
				/>
			</InputGroup>
			<Button mt={6} onClick={sendXLM} variantColor="blue">
        Send
			</Button>
		</>
	)
}

export default SendTransaction

SendTransaction.propTypes = {
	secret: PropTypes.string,
	updateAccount: PropTypes.func,
}
