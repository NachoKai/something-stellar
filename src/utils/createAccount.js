import StellarSdk from 'stellar-sdk'

const randomPair = StellarSdk.Keypair.random()

const createAccount = () => {
	const secret = randomPair.secret()
	const publicKey = randomPair.publicKey()

	return {
		secret,
		publicKey,
	}
}

export default createAccount
