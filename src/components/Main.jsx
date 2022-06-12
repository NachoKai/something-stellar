import React, { useState } from 'react'

import WelcomeView from './WelcomeView'
import CopyView from './CopyView'
import Wallet from './Wallet'

const Main = () => {
	const [secret, setSecret] = useState(localStorage.secret)
	const [publicKey, setPublicKey] = useState(localStorage.publicKey)
	const [isKeyCopied, setKeyCopied] = useState(localStorage.keyCopied)

	const resetAccount = () => {
		localStorage.removeItem('keyCopied')
		localStorage.removeItem('publicKey')
		localStorage.removeItem('secret')
		setKeyCopied(undefined)
		setSecret(undefined)
		setPublicKey(undefined)
	}

	if (!secret || !publicKey) {
		return (
			<WelcomeView
				setKeyCopied={setKeyCopied}
				setPublicKey={setPublicKey}
				setSecret={setSecret}
			/>
		)
	} else if (!isKeyCopied) {
		return (
			<CopyView
				publicKey={publicKey}
				resetAccount={resetAccount}
				secret={secret}
				setKeyCopied={setKeyCopied}
			/>
		)
	}

	return <Wallet publicKey={publicKey} resetAccount={resetAccount} secret={secret} />
}

export default Main
