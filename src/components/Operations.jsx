import React from 'react'
import PropTypes from 'prop-types'

import Operation from './Operation'

const Operations = ({ operations }) => {
	return (
		<>
			{operations?.records?.map((operation, index) => {
				return <Operation operation={operation} index={index} key={index} />
			})}
		</>
	)
}

export default Operations

Operations.propTypes = {
	operations: PropTypes.object,
}
