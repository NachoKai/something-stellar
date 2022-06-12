import loadAccount from './loadAccount'

const getOperations = async publicKey => {
	const account = await loadAccount(publicKey)
	const operations = await account?.operations()
	return operations
}

export default getOperations
