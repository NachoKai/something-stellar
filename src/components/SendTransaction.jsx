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
	Button,
	useToast,
	Stack,
} from '@chakra-ui/react'
import { TbSend } from 'react-icons/tb'

import sendTransaction from '../utils/sendTransaction'
import GradientText from './common/GradientText'

const SendTransaction = ({ secret, updateAccount, updateOperations }) => {
	const toast = useToast()
	const [destination, setDestination] = useState('')
	const [amount, setAmount] = useState()

	const sendXLM = async () => {
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
					title: `${amount} XLM have been sent!`,
					description: `Transaction hash: ${result?.hash}`,
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
					align="center"
					direction="row"
					justify="space-between"
					mt={3}
					spacing="2"
				>
					<Text fontSize="xl" fontWeight={600}>
            Send XLM
					</Text>
					<TbSend size={20} />
				</Stack>
			</GradientText>

			<NumberInput
				max={922337203685}
				min={0.0000001}
				mt={6}
				step={0.001}
				value={amount}
				onChange={value => setAmount(value)}
			>
				<NumberInputField placeholder="0.000" />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>

			<InputGroup mt={6}>
				<Input
					isInvalid={destination.length !== 56 && destination.length > 0}
					placeholder="Recipient"
					value={destination}
					onChange={({ target: { value } }) => setDestination(value)}
				/>
			</InputGroup>
			<Button
				boxShadow="0 10px 15px -3px skyblue,0 4px 6px -4px blue;"
				colorScheme="blue"
				mt={6}
				onClick={sendXLM}
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
