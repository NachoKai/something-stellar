import React, { useState, useEffect } from 'react'
import {
	Box,
	Stack,
	Text,
	Accordion,
	AccordionItem,
	AccordionHeader,
	AccordionPanel,
	AccordionIcon,
	Tooltip,
} from '@chakra-ui/core'

const Info = () => {
	const [data, setData] = useState(null)
	const [feeStats, setFeeStats] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		getData()
		getFeeStats()
	}, [])

	const getData = async () => {
		try {
			const response = await fetch('https://horizon-testnet.stellar.org/')
			const data = await response.json()
			setData(data)
		} catch (error) {
			console.error('Error fetching data: ', error)
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	const getFeeStats = async () => {
		try {
			const response = await fetch('https://horizon-testnet.stellar.org/fee_stats')
			const data = await response.json()
			setFeeStats(data)
		} catch (error) {
			console.error('Error fetching fee stats: ', error)
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box
			display="flex"
			justifyContent="center"
			width="100%"
			maxWidth="48rem"
			borderWidth="2px"
			borderColor="black"
			borderRadius="8px"
			p={8}
			m={8}
		>
			<Stack width="100%" maxWidth="48rem" justifyContent="center">
				{loading ? (
					<Text fontSize="xl">Loading...</Text>
				) : error ? (
					<Text fontSize="xl">Error!</Text>
				) : (
					<Accordion allowToggle>
						<AccordionItem>
							<AccordionHeader>
								<Box flex="1" textAlign="left">
									<Text fontSize="xl" fontWeight={600}>
                    Fee Stats
									</Text>
								</Box>
								<AccordionIcon />
							</AccordionHeader>
							<AccordionPanel pb={4}>
								<Text>
									<Tooltip placement="top" label="The last ledger's sequence number.">
										<b>Last Ledger: </b>
									</Tooltip>
									{feeStats?.last_ledger}
								</Text>
								<Text>
									<Tooltip
										placement="top"
										label="The base fee as defined in the last ledger."
									>
										<b>Last Ledger Base Fee: </b>
									</Tooltip>
									{feeStats?.last_ledger_base_fee}
								</Text>
								<Text>
									<Tooltip
										placement="top"
										label="The average capacity usage over the last 5 ledgers (0 is no usage, 1.0 is completely full ledgers)."
									>
										<b>Ledger Capacity Usage: </b>
									</Tooltip>
									{feeStats?.ledger_capacity_usage}
								</Text>

								<br />

								<Tooltip
									placement="top"
									label="Information about the fee charged for transactions in the last 5 ledgers."
								>
									<Text fontWeight={600}>Fee Charged</Text>
								</Tooltip>
								<Text>
									<b>Min:</b> {feeStats?.fee_charged.min}
								</Text>
								<Text>
									<b>Max:</b> {feeStats?.fee_charged.max}
								</Text>

								<br />

								<Tooltip
									placement="top"
									label="Information about max fee bid for transactions over the last 5 ledgers."
								>
									<Text fontWeight={600}>Max Fee</Text>
								</Tooltip>
								<Text>
									<b>Min:</b> {feeStats?.max_fee.min}
								</Text>
								<Text>
									<b>Max:</b> {feeStats?.max_fee.max}
								</Text>
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<AccordionHeader>
								<Box flex="1" textAlign="left">
									<Text fontSize="xl" fontWeight={600}>
                    More Info
									</Text>
								</Box>
								<AccordionIcon />
							</AccordionHeader>
							<AccordionPanel pb={4}>
								<Text>Core latest ledger: {data?.core_latest_ledger}</Text>
								<Text>
                  Core supported protocol_version: {data?.core_supported_protocol_version}
								</Text>
								<Text>Core version: {data?.core_version}</Text>
								<Text>Current protocol_version: {data?.current_protocol_version}</Text>
								<Text>History elder ledger: {data?.history_elder_ledger}</Text>
								<Text>History latest ledger: {data?.history_latest_ledger}</Text>
								<Text>
                  History latest ledger closed_at: {data?.history_latest_ledger_closed_at}
								</Text>
								<Text>Horizon version: {data?.horizon_version}</Text>
								<Text>Ingest latest ledger: {data?.ingest_latest_ledger}</Text>
								<Text>Network passphrase: {data?.network_passphrase}</Text>
								<Text>
                  Supported protocol version: {data?.supported_protocol_version}
								</Text>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				)}
			</Stack>
		</Box>
	)
}

export default Info
