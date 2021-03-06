import React from 'react'
import { InputGroup, Input, InputRightAddon, Tooltip } from '@chakra-ui/react'
import { startCase } from 'lodash'
import PropTypes from 'prop-types'

const AccountBalance = ({ balance }) => {
	return (
		<InputGroup>
			<Input readOnly value={balance?.balance} />
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
