import { Box, Stack, Text } from '@twilio-paste/core';
import Image from "next/image";
import React from 'react'
import { getBaseUrl } from '../../util';

export interface ItemsSummaryProps {
  arrivalDate: string;
}

const ItemsSummary = ({arrivalDate}: ItemsSummaryProps) => {
  return (
    <Box>
      <Stack orientation={"vertical"} spacing={"space70"}>
        <Text as={"div"} fontWeight={"fontWeightSemibold"}>Arriving by {arrivalDate}</Text>
        <Stack orientation="vertical" spacing="space80">
          <Box display={"flex"}>
            <Box marginRight={"space60"}>
              <Image
                src={`${getBaseUrl()}/images/products/product1_1.png`}
                width={100}
                height={100}
                alt={`image-product1_1.png`}
              />
            </Box>
            <Stack orientation={"vertical"} spacing={'space30'} >
              <Text as={'p'} fontWeight={"fontWeightSemibold"} fontSize={"fontSize20"}>Owl Shoes Flynit 2023</Text>
              <Text as={'p'} fontSize={"fontSize20"}>Women&apos;s Running Shoes</Text>
              <Text as={'p'} fontSize={"fontSize20"}>Size 7</Text>
            </Stack>
          </Box>
          <Box display={"flex"}>
            <Box marginRight={"space60"}>
              <Image
                src={`${getBaseUrl()}/images/products/product3_0.png`}
                width={100}
                height={100}
                alt={`image-product3_0.png`}
              />
            </Box>
            <Stack orientation={"vertical"} spacing={'space30'}>
              <Text as={'p'} fontSize={"fontSize20"} fontWeight={"fontWeightSemibold"}>Winter Sports Beanie</Text>
              <Text as={'p'} fontSize={"fontSize20"}>Beanie</Text>
              <Text as={'p'} fontSize={"fontSize20"}>One Size</Text>
            </Stack>
          </Box>
          
        </Stack>
      </Stack>
    </Box>
  )
}

export default ItemsSummary;