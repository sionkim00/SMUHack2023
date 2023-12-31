'use client';
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Box,
  Icon,

  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';

import IconBox from 'components/icons/IconBox';
import {
  MdAddTask,
  MdBarChart,

} from 'react-icons/md';
import ComplexTable from 'views/admin/default/components/ComplexTable';

import AssetTypes from 'views/admin/default/components/AssetTypes';
import TotalSpent from 'views/admin/default/components/TotalSpent';

import tableDataComplex from 'views/admin/default/variables/tableDataComplex';
// Assets
import { useEffect, useState } from 'react';

// Data
import {supabase} from "db/supabase.js";

// Push Notification
// import PushNotificationLayout from 'components/PushNotificationLayout';
// import "react-toastify/dist/ReactToastify.css";

// Send emails:
// import sendMail  from 'service/mailService'; 


export default function Default() {
  // Chakra Color Mode
  const [data, setData] = useState([]);
  const [totalManagedAssets, setTotalManagedAssets] = useState(500);
  const [criticalAssets, setcriticalAssets] = useState(100);
  const [assetHealthRatio, setassetHealthRatio] = useState(23);
  const [assetTypes, setAssetTypes] = useState([]);

  const loadCount = async () => {
      let { count, error } = await supabase
      .from('cbre')
      .select('*', { count: 'exact' })
      setTotalManagedAssets(count);
  }

  // const loadAssetTypes = async () => {
  //   let {data, error} = await supabase
  //   .from('top_assets')
  //   .select('*');
    
  //   setAssetTypes(data);
  // }

  useEffect(() => {
    loadCount();
    // loadAssetTypes();
  }, [])
  

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');



  return (
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
          gap="20px"
          mb="20px"
        >
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
                }
              />
            }
            name="Total Managed Assets"
            value={totalManagedAssets}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg="orange"
                icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
              />
            }
            name="Assets that require attention"
            value={criticalAssets}
          />
          {/* <HealthRatioStatistics growth="+23%" name="Assets health ratio" value={assetHealthRatio} /> */}
        </SimpleGrid>

        {/* Test email system */}
        {/* <button onClick={
          sendMail(
            "Please",
            "jonathanle1111@gmail.com",
            "please work",
          )
        }> 
          Click to send email
        </button>
*/}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          <TotalSpent />
          <AssetTypes totalAssets={data.length} />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <ComplexTable tableData={tableDataComplex} />
        </SimpleGrid>
      </Box>
    
  );
}
