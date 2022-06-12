import React from 'react'
import { Box, Image } from '@chakra-ui/react'

import SaturnSVG from './assets/saturn.svg'
import Main from './components/Main'

function App() {
	return (
		<Box
			alignItems="center"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			p={3}
			pt={6}
		>
			<Image alt="Saturn" boxSize="10vw" mb={8} objectFit="cover" src={SaturnSVG} />
			<Main />
		</Box>
	)
}

export default App
