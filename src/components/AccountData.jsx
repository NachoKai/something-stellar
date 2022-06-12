import React from 'react'
import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useClipboard,
	Stack,
} from '@chakra-ui/core'
import { formatDistance } from 'date-fns'
import { BsWallet2 } from 'react-icons/bs'
import { GrKey } from 'react-icons/gr'
import PropTypes from 'prop-types'

import AccountBalance from './AccountBalance'
import GradientText from './common/GradientText'

const AccountData = ({ publicKey, account }) => {
	const { onCopy, hasCopied } = useClipboard(publicKey)

	return (
		<>
			<GradientText>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing="2"
					mb={3}
				>
					<Text fontSize="xl" fontWeight={600}>
            Public Key
					</Text>
					<GrKey size={16} />
				</Stack>
			</GradientText>

			<InputGroup>
				<Input readOnly pr="4.5rem" value={publicKey} placeholder="Public Key" />
				<InputRightElement width="4.5rem">
					<Button h="1.75rem" size="sm" onClick={onCopy}>
						{hasCopied ? 'Copied' : 'Copy'}
					</Button>
				</InputRightElement>
			</InputGroup>

			<GradientText>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing="2"
					mt={6}
					mb={3}
				>
					<Text fontSize="xl" fontWeight={600}>
            Account Balance
					</Text>
					<BsWallet2 size={16} />
				</Stack>
			</GradientText>

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
				<Text>Loading...</Text>
			)}
		</>
	)
}

export default AccountData

AccountData.propTypes = {
	publicKey: PropTypes.string,
	account: PropTypes.object,
}
