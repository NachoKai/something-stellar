import StellarSdk from 'stellar-sdk'

const simpleSignerURL = 'https://sign.plutodao.finance'
const sampleXdr =
  'AAAAAgAAAADhqXT1t6e85DlUDyM5OzmJ2KPmujX8gegA027HvKSMpQAAAZAADGyCAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAQAAAADhqXT1t6e85DlUDyM5OzmJ2KPmujX8gegA027HvKSMpQAAAAAAAAAAAvrwgAAAAAAAAAABAAAAAOGpdPW3p7zkOVQPIzk7OYnYo+a6NfyB6ADTbse8pIylAAAAAAAAAAAC+vCAAAAAAAAAAAEAAAAA4al09benvOQ5VA8jOTs5idij5ro1/IHoANNux7ykjKUAAAAAAAAAAAL68IAAAAAAAAAAAQAAAADhqXT1t6e85DlUDyM5OzmJ2KPmujX8gegA027HvKSMpQAAAAAAAAAAAvrwgAAAAAAAAAAA'

let signWindow
let connectWindow

export function openConnectWindow() {
	console.info('Opening connect window')
	connectWindow = window.open(
		`${simpleSignerURL}/connect`,
		'Connect_Window',
		'width=360, height=450'
	)
}

export function openSignWindowUsingUrlParams() {
	console.info('Opening sign window using URL params')
	window.open(
		`${simpleSignerURL}/sign?xdr=${sampleXdr}&description=A sample description`,
		'Sign_Window',
		'width=360, height=700'
	)
}

export function openSignWindowUsingPostMessage() {
	console.info('Opening sign window without URL params')
	signWindow = window.open(
		`${simpleSignerURL}/sign`,
		'Sign_Window',
		'width=360, height=700'
	)
}

async function handleMessage(e) {
	if (e.origin !== `${simpleSignerURL}`) {
		return
	}

	const eventMessage = e.data

	console.info('Message from simple signer received: ', eventMessage)

	if (eventMessage.type === 'onReady') {
		if (eventMessage.page === 'connect') {
			console.info('The connect page is ready')
		}

		if (eventMessage.page === 'sign') {
			console.info('The sign page is ready')

			if (signWindow) {
				console.info('Sending parameters via postMessage')
				signWindow.postMessage(
					{
						xdr: sampleXdr,
						description: 'This is the transaction description',
						operationGroups: [
							{
								from: 0,
								to: 1,
								title: 'This is an operation group title',
								description: 'This is the description for operations 1 and 2',
							},
						],
					},
					simpleSignerURL
				)
			}
		}
	}

	if (eventMessage.type === 'onConnect') {
		const publicKey = eventMessage.message.publicKey

		// validate the public key
		if (StellarSdk.Keypair.fromPublicKey(publicKey)) {
			console.info('User connected with public key', publicKey)
		}
	}

	if (eventMessage.type === 'onSign') {
		const signedXdr = eventMessage.message.signedXDR

		// validate the transaction
		if (StellarSdk.xdr.TransactionEnvelope.validateXDR(signedXdr, 'base64')) {
			console.info('The user has signed the transaction, the result is', signedXdr)

			const server = new StellarSdk.Server('https://horizon-testnet.stellar.org/')

			// Construct the transaction from the signedXDR
			// see https://stellar.github.io/js-stellar-sdk/TransactionBuilder.html#.fromXDR
			const transaction = StellarSdk.TransactionBuilder.fromXDR(
				signedXdr,
				'Test SDF Network ; September 2015'
			)

			try {
				const transactionResult = await server.submitTransaction(transaction)

				console.info(transactionResult)
			} catch (err) {
				console.error('This is expected to fail.', err)
			}
		}
	}

	if (eventMessage.type === 'onCancel') {
		if (eventMessage.page === 'connect') {
			console.info('The user canceled the connect action')
		}

		if (eventMessage.page === 'sign') {
			console.info('The user canceled the sign action')
		}
	}
}

window.addEventListener('message', handleMessage)
