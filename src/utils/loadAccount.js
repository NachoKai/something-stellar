import server from './server'

const loadAccount = async accountId => {
	const account = await server.loadAccount(accountId) // Fetches an account's most current state in the ledger, then creates and returns an AccountResponse object

	return account
}

export default loadAccount
