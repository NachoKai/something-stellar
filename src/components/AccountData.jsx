import React from 'react'
import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useClipboard,
	Stack,
	Divider,
} from '@chakra-ui/react'
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
				<Stack align="center" direction="row" justify="space-between" mb={3} spacing="2">
					<Text fontSize="xl" fontWeight={600}>
            Public Key
					</Text>
					<GrKey size={16} />
				</Stack>
			</GradientText>

			<InputGroup>
				<Input readOnly placeholder="Public Key" pr="4.5rem" value={publicKey} />
				<InputRightElement w="4.5rem">
					<Button h="1.75rem" size="sm" onClick={onCopy}>
						{hasCopied ? 'Copied' : 'Copy'}
					</Button>
				</InputRightElement>
			</InputGroup>

			<Divider py={2} />

			<GradientText>
				<Stack
					align="center"
					direction="row"
					justify="space-between"
					mb={3}
					mt={6}
					spacing="2"
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
						<AccountBalance key={index} balance={balance} />
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
