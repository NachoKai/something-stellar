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
			<Input readOnly roundRight="0" roundedLeft="0" value={balance?.balance} />
			<InputRightAddon>XLM</InputRightAddon>
			<InputRightAddon>
				<Tooltip label="Asset Type" placement="top">
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
