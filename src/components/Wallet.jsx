import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
	Box,
	Button,
	Stack,
	Divider,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/core'
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
	const { isOpen, onOpen, onClose } = useDisclosure()

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
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Are you sure you want to close your account?</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
            Your account data will be removed from your browser, so if you haven&apos;t
            saved your secret key, you will have lost it forever.
					</ModalBody>
					<ModalFooter>
						<Button variantColor="red" mr={3} onClick={resetAccount}>
              Yes
						</Button>
						<Button variantColor="gray" onClick={onClose}>
              No
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box display="flex" justifyContent="center" width="100%" orderWidth="2px" p={8}>
				<Stack width="100%" justifyContent="center">
					<AccountData account={account} publicKey={publicKey} />
					<Divider my={8} borderWidth="1px" borderColor="grey" />
					<SendTransaction
						secret={secret}
						updateAccount={updateAccount}
						updateOperations={updateOperations}
					/>
					<Divider my={8} borderWidth="1px" borderColor="grey" />
					<BalanceChecker />
				</Stack>
			</Box>

			<Info operations={operations} />

			<Stack direction="row" justifyContent="flex-end" alignItems="center" p={6}>
				<Button onClick={onOpen} variant="outline" variantColor="red">
          Close
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
    background: linear-gradient(to right, #63b3ed, #2b6cb0);
  }
`
