import React from 'react'
import { Text, Box, Flex, Badge } from '@chakra-ui/core'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'

const Operation = ({ operation, index }) => {
	return (
		<Box
			key={index}
			p={4}
			borderColor="black"
			borderWidth="1px"
			borderRadius="8px"
			my={2}
		>
			<Flex justifyContent="space-between" alignItems="center" mb={2}>
				<Text fontSize="sm">
					<b>{index}</b>
				</Text>
				<Text fontSize="sm">
					{formatDistance(
						new Date(),
						operation?.created_at ? new Date(operation.created_at) : new Date()
					) + ' ago'}
				</Text>
			</Flex>

			{operation?.account ? (
				<Text fontSize="sm">
					<b>Account:</b> {operation.account}
				</Text>
			) : null}
			{operation?.source_account ? (
				<Text fontSize="sm">
					<b>Source:</b> {operation.source_account}
				</Text>
			) : null}
			{operation?.funder ? (
				<Text fontSize="sm">
					<b>Funder:</b> {operation.funder}
				</Text>
			) : null}

			<Flex justifyContent="space-between" alignItems="center" mt={2}>
				{operation?.type ? (
					<Text fontSize="sm">
						<b>Type:</b> {operation.type}
					</Text>
				) : null}
				{operation?.transaction_successful ? (
					<Badge variantColor="green">Successful</Badge>
				) : (
					<Badge variantColor="red">Not Successful</Badge>
				)}
			</Flex>
		</Box>
	)
}

export default Operation

Operation.propTypes = {
	operation: PropTypes.object,
	index: PropTypes.number,
}
