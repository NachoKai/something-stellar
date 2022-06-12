import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import getOperations from '../utils/getOperations'
import Operation from './Operation'

const Operations = ({ publicKey }) => {
	const [operations, setOperations] = useState(undefined)

	const updateOperations = () => {
		const getData = async () => {
			const operations = await getOperations(publicKey)
			setOperations(operations)
		}

		getData()
	}

	useEffect(updateOperations, [publicKey])

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
	publicKey: PropTypes.string,
}
