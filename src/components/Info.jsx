import React from 'react'
import {
	Box,
	Stack,
	Text,
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/core'
import { VscBook } from 'react-icons/vsc'
import PropTypes from 'prop-types'

import Operations from './Operations'

const Info = ({ operations }) => {
	return (
		<Box display="flex" justifyContent="center" width="100%">
			<Stack width="100%" justifyContent="center">
				<Accordion allowToggle>
					<AccordionItem>
						<AccordionHeader>
							<Stack direction="row" alignItems="center" spacing="2">
								<Text fontSize="md" fontWeight={600}>
                  Operations
								</Text>
								<VscBook size={18} />
							</Stack>
							<AccordionIcon />
						</AccordionHeader>
						<AccordionPanel pb={4}>
							<Operations operations={operations} />
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</Stack>
		</Box>
	)
}

export default Info

Info.propTypes = {
	operations: PropTypes.object,
}
