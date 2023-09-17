// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import PieChart from 'components/charts/PieChart';
import { pieChartData, pieChartOptions } from 'variables/charts';
import { VSeparator } from 'components/separator/Separator';
import {useState, useEffect} from "react";
import { supabase } from 'db/supabase';
export default function Conversion(totalManagedAssets: number, ...props: { [x: string]: any[] }) {
	const { ...rest } = props;
	// Chakra Color Mode
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const cardColor = useColorModeValue('white', 'navy.700');
	const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
	const [topTypes, settopTypes] = useState([{"Type": "Elevator", "Value": 30}, {"Type": "Plumbing System", "Value": 20}, {"Type": "Fire Alarm", "Value": 10}, {"Type": "HVAC", "Value": 10}, {"Type": "Others", "Value": 30},]);
	const [types, setTypes] = useState([]);
	const [values, setValues] = useState([]);
	const [assetTypes, setAssetTypes] = useState([]);

	const loadAssetTypes = async () => {
		let {data, error} = await supabase
		.from('top_assets')
		.select('*');
		setAssetTypes(data);
		console.log(data);
	  }

	useEffect(() => {
		const typesArr = assetTypes.map(item => item.Type);
		const valuesArr = assetTypes.map(item => item.Value);
		setTypes(typesArr);
		setValues(valuesArr);
	}, [assetTypes]);

	useEffect(() => {
		loadAssetTypes();
	}, [])

	return (
		<Card p='20px' alignItems='center' flexDirection='column' w='100%' {...rest}>
			<Flex
				px={{ base: '0px', '2xl': '10px' }}
				justifyContent='space-between'
				alignItems='center'
				w='100%'
				mb='8px'>
				<Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
					Asset Types
				</Text>
			</Flex>

			<PieChart h='100%' w='100%' chartData={values} chartOptions={pieChartOptions} />
			<Card
				bg={cardColor}
				flexDirection='row'
				boxShadow={cardShadow}
				w='100%'
				p='15px'
				px='20px'
				mt='15px'
				mx='auto'>
				{topTypes.map((t, i) => {
					return (
						<Flex key={i} direction='column' py='5px' me='10px'>
							<Flex align='center'>
								<Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
								<Text fontSize='xs' color='secondaryGray.600' fontWeight='700' mb='5px'>
									{t.Type}
								</Text>
							</Flex>
							<Text fontSize='lg' color={textColor} fontWeight='700'>
								{t.Value}
							</Text>
							<VSeparator mx={{ base: '60px', xl: '60px', '2xl': '60px' }} />
						</Flex>
					)
				})}
			</Card>
		</Card>
	);
}
