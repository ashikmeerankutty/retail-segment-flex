import { Box, Heading, Text } from "@twilio-paste/core";
import React from "react";

export interface PriceSummaryProps {
  subtotal?: number;
  shippingAndHandling?: number;
  total?: number;
  tax?: number;
}

const PriceSummary = ({
  subtotal = 0,
  shippingAndHandling = 0,
  tax = 0,
}: PriceSummaryProps) => {

  const total = subtotal + shippingAndHandling + tax;

  return (
    <Box>
      <Heading as={"label"} variant={"heading30"}>
        Summary
      </Heading>
      <Box display={"flex"} width={"100%"}>
        <Box width={"50%"}>Subtotal</Box>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          width={"50%"}
          marginBottom={"space40"}
        >
          <Text as={"span"}>{subtotal ? `$${subtotal.toFixed(2)}` : "-"}</Text>
        </Box>
      </Box>
      <Box display={"flex"} width={"100%"} marginBottom={"space40"}>
        <Box width={"50%"}>Estimated Shipping & Handling</Box>
        <Box display={"flex"} justifyContent={"flex-end"} width={"50%"}>
          <Text as={"span"}>
            {shippingAndHandling ? `$${shippingAndHandling.toFixed(2)}` : "-"}
          </Text>
        </Box>
      </Box>
      <Box display={"flex"} width={"100%"} marginBottom={"space40"}>
        <Box width={"50%"}>Estimated Tax</Box>
        <Box display={"flex"} justifyContent={"flex-end"} width={"50%"}>
          <Text as={"span"}>{tax ? `$${tax.toFixed(2)}` : "-"}</Text>
        </Box>
      </Box>
      <Box
        borderStyle="solid"
        borderTopWidth={"borderWidth10"}
        borderBottomWidth={"borderWidth10"}
        borderLeftWidth={"borderWidth0"}
        borderRightWidth={"borderWidth0"}
        borderColor={"colorBorderWeak"}
        paddingY={"space30"}
        overflow="hidden"
        display={"flex"}
      >
        <Box width={"50%"}>Total</Box>
        <Box display={"flex"} justifyContent={"flex-end"} width={"50%"}>
          <Text as={"span"}>
            {total ? `$${total.toFixed(2)}` : "-"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PriceSummary;
