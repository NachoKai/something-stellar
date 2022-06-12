import StellarSdk from 'stellar-sdk'

import server from './server'

const sendTransaction = async (secret, destination, amount) => {
	try {
		const sourceKeys = StellarSdk.Keypair.fromSecret(secret) // Creates a new Keypair instance from secret
		await server.loadAccount(destination) // Fetches an account's most current state in the ledger, then creates and returns an AccountResponse object
		const sourceAccount = await server.loadAccount(sourceKeys.publicKey())

		const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
			// Transaction builder helps constructs a new Transaction using the given Account as the transaction's "source account"
			fee: StellarSdk.BASE_FEE, // Minimum base fee for transactions. If this fee is below the network minimum, the transaction will fail. The more operations in the transaction, the greater the required fee
			networkPassphrase: StellarSdk.Networks.TESTNET, // Passphrase of the target Stellar network
		})
			.addOperation(
				StellarSdk.Operation.payment({
					// Create a payment operation
					destination,
					asset: StellarSdk.Asset.native(), // Returns an asset object for the native asset.
					amount,
				})
			)
			.setTimeout(60 * 10) // Sets timeout flag globally. When set to anything besides 0, the request will timeout after specified time (ms)
			.build()

		transaction.sign(sourceKeys) // Signs the transaction with the given Keypair
		const result = await server.submitTransaction(transaction) // Submits a transaction to the network

		return result
	} catch (err) {
		console.error('An error has occurred', err)
	}
}

export default sendTransaction
