import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
	Box,
	Button,
	Stack,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Divider,
} from '@chakra-ui/react'

import AccountData from './AccountData'
import SendTransaction from './SendTransaction'
import BalanceChecker from './BalanceChecker'
import loadAccount from '../utils/loadAccount'
import getOperations from '../utils/getOperations'
import Info from './Info'
import Wrapper from './common/Wrapper'

const Wallet = ({ publicKey, secret, resetAccount, colormode }) => {
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
		<Wrapper colormode={colormode}>
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
						<Button colorScheme="red" mr={3} onClick={resetAccount}>
              Yes
						</Button>
						<Button colorScheme="gray" onClick={onClose}>
              No
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box display="flex" justifyContent="center" p={8} w="100%">
				<Stack justify="center" w="100%">
					<AccountData account={account} publicKey={publicKey} />
					<Divider py={2} />
					<BalanceChecker />
					<Divider py={2} />
					<SendTransaction
						secret={secret}
						updateAccount={updateAccount}
						updateOperations={updateOperations}
					/>
				</Stack>
			</Box>

			<Info operations={operations} />

			<Stack align="center" direction="row" justify="flex-end" p={6}>
				<Button colorScheme="red" variant="outline" onClick={onOpen}>
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
