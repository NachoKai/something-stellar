import StellarSdk from 'stellar-sdk'

import server from './server'

const sendTransaction = async (secret, destination, amount) => {
	try {
		const sourceKeys = StellarSdk.Keypair.fromSecret(secret)
		await server.loadAccount(destination)
		const sourceAccount = await server.loadAccount(sourceKeys.publicKey())

		const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
			fee: StellarSdk.BASE_FEE,
			networkPassphrase: StellarSdk.Networks.TESTNET,
		})
			.addOperation(
				StellarSdk.Operation.payment({
					destination,
					asset: StellarSdk.Asset.native(),
					amount,
				})
			)
			.setTimeout(60 * 10)
			.build()

		transaction.sign(sourceKeys)
		const result = await server.submitTransaction(transaction)

		return result
	} catch (err) {
		console.error('An error has occurred', err)
	}
}

export default sendTransaction
