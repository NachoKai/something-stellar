import React from 'react'
import { Box, ThemeProvider, CSSReset, Image } from '@chakra-ui/core'

import SaturnSVG from './assets/saturn.svg'
import Main from './components/Main'

function App() {
	return (
		<ThemeProvider>
			<CSSReset />
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				p={8}
			>
				<Image src={SaturnSVG} size="10vw" objectFit="cover" alt="Saturn" mb={8} />
				<Main />
			</Box>
		</ThemeProvider>
	)
}

export default App
