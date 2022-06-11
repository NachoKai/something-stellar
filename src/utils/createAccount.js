import StellarSdk from 'stellar-sdk'

// Keypair represents public and secret keys of the account
const randomPair = StellarSdk.Keypair.random() // Create a random Keypair object

const createAccount = () => {
	const secret = randomPair.secret()
	const publicKey = randomPair.publicKey()

	return {
		secret,
		publicKey,
	}
}

export default createAccount
