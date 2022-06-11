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
} from '@chakra-ui/core'
import PropTypes from 'prop-types'

import activeAccount from '../utils/activeAccount'

const CopyView = ({ publicKey, secret, setKeyCopied, resetAccount }) => {
	const toast = useToast()
	const { onCopy, hasCopied } = useClipboard(secret)

	const handleCopied = async () => {
		toast({
			title: 'Creating Account',
			description: 'Please wait...',
			status: 'warning',
			duration: 5000,
			isClosable: true,
		})

		localStorage.setItem('keyCopied', true)
		const account = await activeAccount(publicKey)
		const hash = account?.hash

		toast({
			title: 'Account created and funded',
			description: `Transaction hash: ${hash}`,
			status: 'success',
			duration: 5000,
			isClosable: true,
		})
		setKeyCopied(true)
	}

	return (
		<Box borderWidth="2px" borderColor="black" p={8} borderRadius="8px">
			<Stack width="100%" maxWidth="48rem" justifyContent="center">
				<Alert status="warning">
					<AlertIcon />
					<Text>
            Before continuing, copy and save your secret in a private place, otherwise you
            will not be able to return to your account.
					</Text>
				</Alert>
				<InputGroup>
					<Input readOnly pr="4.5rem" value={secret} />
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={onCopy}>
							{hasCopied ? 'Copied' : 'Copy'}
						</Button>
					</InputRightElement>
				</InputGroup>
				<Box display="flex" justifyContent="space-between">
					<Button onClick={resetAccount}>Back</Button>
					<Button onClick={handleCopied} variantColor="blue" disabled={!hasCopied}>
            Continue
					</Button>
				</Box>
			</Stack>
		</Box>
	)
}

export default CopyView

CopyView.propTypes = {
	publicKey: PropTypes.string,
	secret: PropTypes.string,
	setKeyCopied: PropTypes.func,
	resetAccount: PropTypes.func,
}
