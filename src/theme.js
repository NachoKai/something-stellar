import { extendTheme, theme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import '@fontsource/roboto'
import '@fontsource/roboto-slab'

const colors = {
	primary: theme.colors.blue,
}

const fonts = {
	body: 'Roboto, sans-serif',
	heading: 'Roboto Slab, serif',
	mono: 'Menlo, monospace',
}

const breakpoints = createBreakpoints({
	sm: '320px',
	md: '500px',
	lg: '960px',
	xl: '1200px',
})

const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
}

const spacing = {
	space: {
		px: '1px',
		0.5: '0.125rem',
		1: '0.25rem',
		1.5: '0.375rem',
		2: '0.5rem',
		2.5: '0.625rem',
		3: '0.75rem',
		3.5: '0.875rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		7: '1.75rem',
		8: '2rem',
		9: '2.25rem',
		10: '2.5rem',
		12: '3rem',
		14: '3.5rem',
		16: '4rem',
		20: '5rem',
		24: '6rem',
		28: '7rem',
		32: '8rem',
		36: '9rem',
		40: '10rem',
		44: '11rem',
		48: '12rem',
		52: '13rem',
		56: '14rem',
		60: '15rem',
		64: '16rem',
		72: '18rem',
		80: '20rem',
		96: '24rem',
	},
}

export default extendTheme({
	colors,
	fonts,
	breakpoints,
	config,
	spacing,
})
