import React from 'react'
import { Box, ChakraProvider, CSSReset, Image } from '@chakra-ui/react'

import SaturnSVG from './assets/saturn.svg'
import Main from './components/Main'

function App() {
	return (
		<ChakraProvider>
			<CSSReset />
			<Box
				alignItems="center"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				p={2}
				pt={6}
			>
				<Image alt="Saturn" boxSize="10vw" mb={8} objectFit="cover" src={SaturnSVG} />
				<Main />
			</Box>
		</ChakraProvider>
	)
}

export default App
