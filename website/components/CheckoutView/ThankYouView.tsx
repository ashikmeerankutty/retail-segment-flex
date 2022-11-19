import { Box, Flex, Stack, Text } from "@twilio-paste/core";
import React from "react";
import { ICartItem } from "../../Global.types";
import OrderedItem from "./OrderedItem";

export interface ThankYouViewProps {
  orderDate?: string;
  orderNumber?: string;
  customerEmail?: string;
  orderedItems: ICartItem[];
}

const ThankYouView = ({
  orderDate = "October 25, 2022, 1:43 PM EST",
  orderNumber = "C00143680700",
  customerEmail = "Mary.Doe@gmail.com",
  orderedItems,
}: ThankYouViewProps) => {
  return (
    <Box paddingX={"space200"} height={"auto"} className="thankyou-box">
      <Stack orientation={"vertical"} spacing={"space200"}>
        <Box marginTop={"space40"}>
          <Box marginBottom={"space80"}>
            <Box marginBottom={"space50"}>
              <Text as={"h2"} fontSize={"fontSize80"}>
                Thank you!
              </Text>
            </Box>
            <Text as={"p"} fontSize={"fontSize20"} color={"colorTextWeak"}>
              Please check your email for your order for your confirmation.
            </Text>
          </Box>
          <Box className="order-details" marginBottom={"space60"}>
            <Text
              as={"h3"}
              fontWeight={"fontWeightLight"}
              color={"colorTextWeaker"}
              fontSize={"fontSize40"}
            >
              Order placed: {orderDate}
            </Text>
            <Text
              as={"h3"}
              fontWeight={"fontWeightLight"}
              color={"colorTextWeaker"}
              fontSize={"fontSize40"}
            >
              Order number: {orderNumber}
            </Text>
          </Box>
          <Box>
            <Text as={"p"} fontSize={"fontSize20"} color={"colorTextWeak"}>
              We have sent the order confirmation details to: {customerEmail}
            </Text>
          </Box>
        </Box>
        <Box>
          <Box marginBottom={"space60"}>
            <Text
              as={"h3"}
              fontWeight={"fontWeightBold"}
              color={"colorTextSuccess"}
              fontSize={"fontSize50"}
            >
              Ordered
            </Text>
          </Box>
          <Box width={"100%"}>
            <Flex wrap>
              {orderedItems.map((item, idx) => {
                console.log(item, "MY ITEMS")
                return (
                  <OrderedItem
                    key={idx}
                    name={item.product.title}
                    category={item.product.subTitle}
                    size={item.size}
                    imageUrl={item.product.imagePaths[0]}
                  />
                );
              })}
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ThankYouView;
