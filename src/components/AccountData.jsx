import React from 'react'
import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useClipboard,
} from '@chakra-ui/core'
import { formatDistance } from 'date-fns'
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
			{account ? (
				<>
					{account?.last_modified_time ? (
						<Text fontSize="sm">
              Last modified time:{' '}
							{formatDistance(new Date(), new Date(account.last_modified_time)) + ' ago'}
						</Text>
					) : null}

					{account.balances?.map((balance, index) => (
						<AccountBalance balance={balance} index={index} key={index} />
					))}
				</>
			) : (
				'Loading...'
			)}
		</>
	)
}

export default AccountData

AccountData.propTypes = {
	publicKey: PropTypes.string,
	account: PropTypes.object,
}
