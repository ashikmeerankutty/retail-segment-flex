import { Box, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import React from "react";
import { CartProduct } from "../../Global.types";
import { getBaseUrl } from "../../util";

export interface ItemsSummaryProps {
  arrivalDate: string;
  orderedItems: CartProduct[];
}

const ItemsSummary = ({ arrivalDate, orderedItems }: ItemsSummaryProps) => {
  return (
    <Box>
      <Stack orientation={"vertical"} spacing={"space70"}>
        <Text as={"div"} fontWeight={"fontWeightSemibold"}>
          Arriving by {arrivalDate}
        </Text>
        <Stack orientation="vertical" spacing="space80">
          {orderedItems.map((item, index) => {
            return (
              <Box display={"flex"} key={index}>
                <Box marginRight={"space60"}>
                  <Image
                    src={`${getBaseUrl()}/images/products/${
                      item.product.imagePaths[0]
                    }`}
                    width={100}
                    height={100}
                    alt={item.product.imagePaths[0]}
                  />
                </Box>
                <Stack orientation={"vertical"} spacing={"space30"}>
                  <Text
                    as={"p"}
                    fontWeight={"fontWeightSemibold"}
                    fontSize={"fontSize20"}
                  >
                    {item.product.title}
                  </Text>
                  <Text as={"p"} fontSize={"fontSize20"}>
                    {item.product.subTitle}
                  </Text>
                  <Text as={"p"} fontSize={"fontSize20"}>
                    {/* NEED TO CHANGE THIS TO SELECTED SIZE */}
                    Size {item.size}
                  </Text>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ItemsSummary;
