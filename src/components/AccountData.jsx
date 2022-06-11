import React from 'react'
import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useClipboard,
	// InputLeftAddon,
	// InputRightAddon,
	// Tooltip,
} from '@chakra-ui/core'
import PropTypes from 'prop-types'
import AccountBalance from './AccountBalance'

const AccountData = ({ publicKey, account }) => {
	const { onCopy, hasCopied } = useClipboard(publicKey)

	return (
		<>
			<Text fontSize="xl" fontWeight={600} mb={3}>
        Public Key
			</Text>
			<InputGroup>
				<Input readOnly pr="4.5rem" value={publicKey} />
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={onCopy}>
						{hasCopied ? 'Copied' : 'Copy'}
					</Button>
				</InputRightElement>
			</InputGroup>

			<Text mt={6} mb={3} fontSize="xl" fontWeight={600}>
        Account Balance
			</Text>
			{account?.last_modified_time ? (
				<Text fontSize="sm">Last modified time: {account?.last_modified_time}</Text>
			) : null}
			{account?.balances?.map((balance, index) => (
				<AccountBalance balance={balance} index={index} key={index} />
			))}

			{/* <Text mt={6} mb={3} fontSize="md" fontWeight={500}>
        Account Signers
			</Text>
			{account?.signers?.map((signer, index) => (
				<InputGroup key={index}>
					<InputLeftAddon>{index}</InputLeftAddon>
          Weight: {signer?.weight}
					<Input readOnly value={signer?.key} />
					<InputRightAddon>
						<Tooltip placement="top" label="Type">
							{signer?.type}
						</Tooltip>
					</InputRightAddon>
				</InputGroup>
			))} */}
		</>
	)
}

export default AccountData

AccountData.propTypes = {
	publicKey: PropTypes.string,
	account: PropTypes.object,
}
