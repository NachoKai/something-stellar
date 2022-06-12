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
	Stack,
} from '@chakra-ui/core'
import { GrSend } from 'react-icons/gr'

import sendTransaction from '../utils/sendTransaction'
import GradientText from './common/GradientText'

const SendTransaction = ({ secret, updateAccount, updateOperations }) => {
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
					isClosable: true,
				})

				const result = await sendTransaction(secret, destination, amount.toString())

				toast({
					title: `${amount} XLM have been sent`,
					description: `Transaction hash: ${result.hash}`,
					status: 'success',
					isClosable: true,
				})

				updateAccount()
				updateOperations()
				setDestination('')
			} catch (err) {
				toast({
					title: 'An error has occurred',
					description: err.message,
					status: 'error',
					isClosable: true,
				})
				setDestination('')
			}
		} else {
			toast({
				title: 'Invalid data',
				description: 'Be sure to enter a correct address and send a valid amount.',
				status: 'error',
				isClosable: true,
			})
			setDestination('')
		}
	}

	return (
		<>
			<GradientText>
				<Stack
					direction="row"
					alignItems="center"
					spacing="2"
					mt={6}
					justifyContent="space-between"
				>
					<Text fontSize="xl" fontWeight={600}>
            Send XLM
					</Text>
					<GrSend size={18} />
				</Stack>
			</GradientText>

			<NumberInput
				step="0.001"
				mt={6}
				value={amount}
				onChange={value => setAmount(value)}
			>
				<InputLeftAddon>XLM</InputLeftAddon>
				<NumberInputField roundLeft="0" placeholder="0.000" />
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
					isInvalid={destination.length !== 56 && destination.length > 0}
				/>
			</InputGroup>
			<Button
				mt={6}
				onClick={sendXLM}
				variantColor="blue"
				boxShadow="0 10px 15px -3px skyblue,0 4px 6px -4px blue;"
			>
        Send
			</Button>
		</>
	)
}

export default SendTransaction

SendTransaction.propTypes = {
	secret: PropTypes.string,
	updateAccount: PropTypes.func,
	updateOperations: PropTypes.func,
}
