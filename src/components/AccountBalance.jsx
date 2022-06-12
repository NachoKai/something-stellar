import React from 'react'
import {
	InputGroup,
	InputLeftAddon,
	Input,
	InputRightAddon,
	Tooltip,
} from '@chakra-ui/core'
import { startCase } from 'lodash'
import PropTypes from 'prop-types'

const AccountBalance = ({ balance, index }) => {
	return (
		<InputGroup mt={6}>
			<InputLeftAddon>{index}</InputLeftAddon>
			<Input roundedLeft="0" roundRight="0" readOnly value={balance?.balance} />
			<InputRightAddon>XLM</InputRightAddon>
			<InputRightAddon>
				<Tooltip placement="top" label="Asset Type">
					{startCase(balance?.asset_type)}
				</Tooltip>
			</InputRightAddon>
		</InputGroup>
	)
}

export default AccountBalance

AccountBalance.propTypes = {
	balance: PropTypes.object,
	index: PropTypes.number,
}
