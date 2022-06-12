import server from './server'

const loadAccount = async accountId => {
	const account = await server.loadAccount(accountId)

	return account
}

export default loadAccount
