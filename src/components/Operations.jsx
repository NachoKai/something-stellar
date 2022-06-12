import React from 'react'
import PropTypes from 'prop-types'

import Operation from './Operation'

const Operations = ({ operations }) => {
	return (
		<>
			{operations?.records
				?.sort((a, b) => {
					const dateA = new Date(a.created_at)
					const dateB = new Date(b.created_at)
					return dateB - dateA
				})
				.map((operation, index) => {
					return <Operation key={index} index={index} operation={operation} />
				})}
		</>
	)
}

export default Operations

Operations.propTypes = {
	operations: PropTypes.object,
}
