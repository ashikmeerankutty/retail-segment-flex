import { Box, Flex, Stack, Text } from "@twilio-paste/core";
import React from "react";
import OrderedItem from "./OrderedItem";

export interface ThankYouViewProps {
  orderDate?: string;
  orderNumber?: string;
  customerEmail?: string;
}

const ThankYouView = ({
  orderDate = "October 25, 2022, 1:43 PM EST",
  orderNumber = "C00143680700",
  customerEmail = "Mary.Doe@gmail.com",
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
              <OrderedItem />
              <OrderedItem
                name={"Orange Joggers"}
                category={"Women's Joggers"}
                size={"Medium"}
                imageUrl={"/images/products/product3_0.png"}
              />
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ThankYouView;
