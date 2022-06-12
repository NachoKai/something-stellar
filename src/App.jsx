import React from 'react'
import { Box, Image, useColorMode } from '@chakra-ui/react'
import styled from 'styled-components'

import SaturnSVG from './assets/saturn.svg'
import Main from './components/Main'

function App() {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Box
			alignItems="center"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			p={3}
			pt={6}
		>
			<Saturn
				alt="Saturn"
				boxSize="10vw"
				colormode={colorMode}
				mb={8}
				objectFit="cover"
				src={SaturnSVG}
				onClick={toggleColorMode}
			/>
			<Main colorMode={colorMode} />
		</Box>
	)
}

export default App

const Saturn = styled(Image)`
  ${p => (p.colormode === 'dark' ? 'filter: invert(1);' : '')}
`
