import React from 'react'
import {
	Box,
	Stack,
	Text,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/react'
import { VscBook } from 'react-icons/vsc'
import PropTypes from 'prop-types'

import Operations from './Operations'
import GradientText from './common/GradientText'

const Info = ({ operations }) => {
	return (
		<Box display="flex" w="100%">
			<Stack w="100%">
				<Accordion allowToggle>
					<AccordionItem>
						<AccordionButton justify="space-between">
							<GradientText>
								<Stack
									align="center"
									direction="row"
									justify="space-between"
									spacing="2"
									w="100%"
								>
									<Text fontSize="md" fontWeight={600}>
                    Operations
									</Text>
									<VscBook size={20} />
								</Stack>
							</GradientText>
							<AccordionIcon />
						</AccordionButton>
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
