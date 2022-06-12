import React from 'react'
import { Box, ThemeProvider, CSSReset, Image } from '@chakra-ui/core'

import SaturnSVG from './assets/saturn.svg'
import Main from './components/Main'

function App() {
	return (
		<ThemeProvider>
			<CSSReset />
			<Box
				alignItems="center"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				mt={4}
				p={2}
			>
				<Image alt="Saturn" mb={8} objectFit="cover" size="10vw" src={SaturnSVG} />
				<Main />
			</Box>
		</ThemeProvider>
	)
}

export default App
