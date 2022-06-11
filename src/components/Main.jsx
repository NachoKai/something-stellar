import React, { useState } from 'react'

import WelcomeView from './WelcomeView'
import CopyView from './CopyView'
import Wallet from './Wallet'
import Info from './Info'

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
				setSecret={setSecret}
				setPublicKey={setPublicKey}
				setKeyCopied={setKeyCopied}
			/>
		)
	} else if (!isKeyCopied) {
		return (
			<CopyView
				secret={secret}
				publicKey={publicKey}
				setKeyCopied={setKeyCopied}
				resetAccount={resetAccount}
			/>
		)
	}

	return (
		<>
			<Wallet publicKey={publicKey} secret={secret} resetAccount={resetAccount} />
			<Info />
		</>
	)
}

export default Main
