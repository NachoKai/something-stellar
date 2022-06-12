import React from 'react'
import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
	useClipboard,
	useToast,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

import activeAccount from '../utils/activeAccount'
import Wrapper from './common/Wrapper'

const CopyView = ({ publicKey, secret, setKeyCopied, resetAccount, colormode }) => {
	const toast = useToast()
	const { onCopy, hasCopied } = useClipboard(secret)

	const handleCopied = async () => {
		toast({
			title: 'Creating Account',
			description: 'Please wait...',
			status: 'warning',
			isClosable: true,
		})

		localStorage.setItem('keyCopied', true)
		const account = await activeAccount(publicKey)
		const hash = account?.hash

		toast({
			title: 'Account created and funded',
			description: `Transaction hash: ${hash}`,
			status: 'success',
			isClosable: true,
		})
		setKeyCopied(true)
	}

	return (
		<Wrapper colormode={colormode} p={8}>
			<Stack justify="center" spacing={4}>
				<Alert status="warning">
					<AlertIcon />
					<Text>
            Before continuing, copy and save your secret in a private place, otherwise you
            will not be able to return to your account.
					</Text>
				</Alert>
				<InputGroup>
					<Input readOnly pr="4.5rem" value={secret} />
					<InputRightElement w="4.5rem">
						<Button h="1.75rem" size="sm" onClick={onCopy}>
							{hasCopied ? 'Copied' : 'Copy'}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Box display="flex" justifyContent="space-between">
					<Button onClick={resetAccount}>Back</Button>
					<Button colorScheme="blue" disabled={!hasCopied} onClick={handleCopied}>
            Continue
					</Button>
				</Box>
			</Stack>
		</Wrapper>
	)
}

export default CopyView

CopyView.propTypes = {
	publicKey: PropTypes.string,
	secret: PropTypes.string,
	setKeyCopied: PropTypes.func,
	resetAccount: PropTypes.func,
}
