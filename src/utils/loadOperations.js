import server from './server'

const loadOperations = async () => {
	const operations = await server.loadOperations()
	return operations
}
loadOperations()
export default loadOperations
