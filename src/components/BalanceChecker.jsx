import React, { useState } from 'react'
import { Button, Input, InputGroup, Text, useToast } from '@chakra-ui/core'

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
			<Text fontSize="xl" fontWeight={600} mt={8}>
        Balance Checker
			</Text>
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
