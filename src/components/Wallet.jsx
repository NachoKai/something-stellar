import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Stack, Text, Divider } from '@chakra-ui/core'

import AccountData from './AccountData'
import SendTransaction from './SendTransaction'
import BalanceChecker from './BalanceChecker'
import loadAccount from '../utils/loadAccount'
import getOperations from '../utils/getOperations'
import Info from './Info'

const Wallet = ({ publicKey, secret, resetAccount }) => {
	const [account, setAccount] = useState(undefined)
	const [operations, setOperations] = useState(undefined)

	const updateAccount = () => {
		const getData = async () => {
			const account = await loadAccount(publicKey)
			setAccount(account)
		}

		getData()
	}

	const updateOperations = () => {
		const getData = async () => {
			const operations = await getOperations(publicKey)
			setOperations(operations)
		}

		getData()
	}

	useEffect(updateAccount, [publicKey])
	useEffect(updateOperations, [publicKey])

	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				width="100%"
				maxWidth="48rem"
				orderWidth="2px"
				borderWidth="2px"
				borderColor="black"
				borderRadius="8px"
				p={8}
			>
				<Stack width="100%" maxWidth="48rem" justifyContent="center">
					<AccountData account={account} publicKey={publicKey} />
					<Divider my={8} borderWidth="2px" borderColor="black" />
					<SendTransaction secret={secret} updateAccount={updateAccount} updateOperations={updateOperations} />
					<Divider my={8} borderWidth="2px" borderColor="black" />
					<BalanceChecker />
					<Divider my={8} borderWidth="2px" borderColor="black" />

					<Box display="flex" justifyContent="space-between" alignItems="center" mt={6}>
						<Text fontSize="sm" maxWidth="50%" overflow="hidden" textOverflow="ellipsis">
							{publicKey}
						</Text>
						<Button onClick={resetAccount} variant="outline" variantColor="red">
              Close Account
						</Button>
					</Box>
				</Stack>
			</Box>

			<Info operations={operations} />
		</>
	)
}

export default Wallet

Wallet.propTypes = {
	publicKey: PropTypes.string,
	secret: PropTypes.string,
	resetAccount: PropTypes.func,
}
