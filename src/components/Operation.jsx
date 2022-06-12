import React from 'react'
import { Text, Box, Badge, Stack, Tooltip } from '@chakra-ui/core'
import { format, isValid, formatDistance } from 'date-fns'
import { startCase } from 'lodash'
import { MdSend } from 'react-icons/md'
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
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
				<Text fontSize="sm">
					<b>{index}</b>
				</Text>
				<Text fontSize="sm">
					{operation?.created_at ? (
						<Tooltip
							label={format(
								isValid(new Date(operation.created_at))
									? new Date(operation.created_at)
									: new Date(),
								'dd MMM yyyy - HH:mm'
							)}
							placement="top"
						>
							{formatDistance(new Date(), new Date(operation.created_at)) + ' ago'}
						</Tooltip>
					) : null}
				</Text>
			</Stack>

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

			<Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
				{operation?.type ? (
					<Stack direction="row" alignItems="center">
						<MdSend />
						<Text fontSize="sm" ml={1}>
							<b>{startCase(operation.type)}</b>
						</Text>
					</Stack>
				) : null}
				{operation?.transaction_successful ? (
					<Badge variantColor="green">Successful</Badge>
				) : (
					<Badge variantColor="red">Not Successful</Badge>
				)}
			</Stack>
		</Box>
	)
}

export default Operation

Operation.propTypes = {
	operation: PropTypes.object,
	index: PropTypes.number,
}
