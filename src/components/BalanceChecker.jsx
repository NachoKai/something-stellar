import React, { useState } from 'react'
import { Button, Input, InputGroup, Text, useToast, Stack } from '@chakra-ui/core'
import { AiOutlineKey } from 'react-icons/ai'

import loadAccount from '../utils/loadAccount'
import AccountBalance from './AccountBalance'

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
				duration: 5000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<Stack direction="row" alignItems="center" spacing="2" mt={8}>
				<Text fontSize="xl" fontWeight={600}>
          Balance Checker
				</Text>
				<AiOutlineKey size={24} />
			</Stack>
			<InputGroup mt={6}>
				<Input
					onChange={({ target: { value } }) => setAccountToCheck(value)}
					value={accountToCheck}
					placeholder="Account to check"
					roundRight="0"
					mr={2}
				/>
				<Button onClick={checkBalance} variantColor="green">
          Check Balance
				</Button>
			</InputGroup>
			{checkedAccount?.balances?.map((balance, index) => (
				<AccountBalance balance={balance} index={index} key={index} />
			))}
		</>
	)
}

export default BalanceChecker
