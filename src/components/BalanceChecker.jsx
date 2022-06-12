import React, { useState } from 'react'
import { Button, Input, InputGroup, Text, useToast, Stack } from '@chakra-ui/react'
import { AiOutlineKey } from 'react-icons/ai'

import loadAccount from '../utils/loadAccount'
import AccountBalance from './AccountBalance'
import GradientText from './common/GradientText'

const BalanceChecker = () => {
	const toast = useToast()
	const [checkedAccount, setCheckedAccount] = useState(undefined)
	const [accountToCheck, setAccountToCheck] = useState('')

	const checkBalance = async () => {
		try {
			const account = await loadAccount(accountToCheck)

			setCheckedAccount(account)
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
		<>
			<GradientText>
				<Stack align="center" direction="row" justify="space-between" mt={8} spacing="2">
					<Text fontSize="xl" fontWeight={600}>
            Balance Checker
					</Text>
					<AiOutlineKey size={20} />
				</Stack>
			</GradientText>
			<InputGroup mt={6}>
				<Input
					isInvalid={accountToCheck.length !== 56 && accountToCheck.length > 0}
					mr={2}
					placeholder="Account to check"
					value={accountToCheck}
					onChange={({ target: { value } }) => setAccountToCheck(value)}
				/>
				<Button colorScheme="green" onClick={checkBalance}>
          Check
				</Button>
			</InputGroup>
			{checkedAccount?.balances?.map((balance, index) => (
				<AccountBalance key={index} balance={balance} index={index} />
			))}
		</>
	)
}

export default BalanceChecker
