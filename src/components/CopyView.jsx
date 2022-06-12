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
import styled from 'styled-components'
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
		<Wrapper>
			<Box p={8}>
				<Stack justifyContent="center">
					<Alert status="warning">
						<AlertIcon />
						<Text>
              Before continuing, copy and save your secret in a private place, otherwise
              you will not be able to return to your account.
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
