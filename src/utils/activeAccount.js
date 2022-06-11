const activeAccount = async publicKey => {
	const response = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`)
	const responseJSON = await response.json()

	return responseJSON
}

export default activeAccount
