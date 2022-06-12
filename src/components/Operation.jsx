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
			borderColor="lightgrey"
			borderRadius="8px"
			borderWidth="1px"
			boxShadow="0 10px 15px -3px white,0 4px 6px -4px grey;"
			my={3}
			p={4}
		>
			<Stack alignItems="center" direction="row" justifyContent="space-between" mb={2}>
				<Stack alignItems="center" direction="row" spacing={1}>
					<Text color="green.600" fontSize="xl">
						{operation?.amount ? <b>{Number(operation.amount).toFixed(2)}</b> : null}
					</Text>
					<Text color="green.600" fontSize="md">
						<b>{startCase(operation.asset_type)}</b>
					</Text>
				</Stack>

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
				<SectionText title="Account:" value={operation.account} />
			) : null}
			{operation?.source_account ? (
				<SectionText title="Source:" value={operation.source_account} />
			) : null}
			{operation?.to ? <SectionText title="To:" value={operation.to} /> : null}

			<Stack alignItems="center" direction="row" justifyContent="space-between" mt={2}>
				<Stack alignItems="center" direction="row" spacing={1}>
					<MdSend />
					<Text fontSize="sm" ml={1}>
						<b>{startCase(operation.type)}</b>
					</Text>
				</Stack>
				{operation?.transaction_successful ? (
					<Badge variantColor="green">Successful</Badge>
				) : (
					<Badge variantColor="red">Not Successful</Badge>
				)}
			</Stack>
		</Box>
	)
}

const SectionText = ({ title, value }) => {
	return (
		<Stack direction="row">
			<Text fontSize="sm" fontWeight="500">
				{title}
			</Text>
			<Text
				color="grey"
				fontSize="sm"
				maxWidth="95%"
				overflow="hidden"
				textOverflow="ellipsis"
			>
				{value}
			</Text>
		</Stack>
	)
}

export default Operation

Operation.propTypes = {
	operation: PropTypes.object,
	index: PropTypes.number,
}

SectionText.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string,
}
