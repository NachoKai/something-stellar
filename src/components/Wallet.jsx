import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Stack, Text, Divider } from '@chakra-ui/core'
import styled from 'styled-components'

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
		<Wrapper>
			<Box display="flex" justifyContent="center" width="100%" orderWidth="2px" p={8}>
				<Stack width="100%" justifyContent="center">
					<AccountData account={account} publicKey={publicKey} />
					<Divider my={8} borderWidth="2px" borderColor="black" />
					<SendTransaction
						secret={secret}
						updateAccount={updateAccount}
						updateOperations={updateOperations}
					/>
					<Divider my={8} borderWidth="2px" borderColor="black" />
					<BalanceChecker />
				</Stack>
			</Box>

			<Info operations={operations} />

			<Stack direction="row" justifyContent="space-between" alignItems="center" p={6}>
				<Text fontSize="sm" maxWidth="60%" overflow="hidden" textOverflow="ellipsis">
					{publicKey}
				</Text>
				<Button onClick={resetAccount} variant="outline" variantColor="red">
          Close Account
				</Button>
			</Stack>
		</Wrapper>
	)
}

export default Wallet

Wallet.propTypes = {
	publicKey: PropTypes.string,
	secret: PropTypes.string,
	resetAccount: PropTypes.func,
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 48rem;
  flex-direction: column;
  position: relative;
  color: #000;
  background: #fff;
  background-clip: padding-box;
  border: solid 5px transparent;
  border-radius: 1em;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -4px;
    border-radius: inherit;
    background: linear-gradient(to right, blue, violet);
  }
`
