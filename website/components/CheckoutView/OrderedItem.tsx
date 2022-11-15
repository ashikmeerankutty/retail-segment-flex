import { Box, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import React from "react";
import { getBaseUrl } from "../../util";

export interface OrderedItemProps {
  name?: string;
  category?: string;
  size?: string | number;
  imageUrl?: string;
}

const OrderedItem = ({
  name = "Owl Shoes Flynit 2023",
  category = "Women's Running Shoes",
  size = 7,
  imageUrl = "/images/products/product1_1.png",
}: OrderedItemProps) => {
  return (
    <Box marginRight={"space140"} display={"flex"} marginBottom={"space80"}>
      <Box marginRight={"space50"}>
        <Image
          src={getBaseUrl() + imageUrl}
          width={100}
          height={100}
          alt={`image-product1_1.png`}
        />
      </Box>
      <Box>
        <Stack orientation={"vertical"} spacing={"space20"}>
          <Text as={"p"} fontSize={"fontSize20"} fontWeight={"fontWeightBold"}>
            {name}
          </Text>
          <Text as={"p"} fontSize={"fontSize20"}>
            {category}
          </Text>
          <Text as={"p"} fontSize={"fontSize20"}>
            Size {size}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderedItem;
