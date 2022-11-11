import { Box, Text } from "@twilio-paste/core";
import { EditIcon } from "@twilio-paste/icons/cjs/EditIcon";
import React from "react";

export interface CheckoutHeaderProps {
  index: number;
  title: string;
}

const CheckoutHeader = ({ index, title }: CheckoutHeaderProps) => {
  return (
    <Box marginBottom={"space40"} width={"100%"} display={"flex"}>
      <Box width={"60%"}>
        <Text
          fontWeight={"fontWeightSemibold"}
          as={"span"}
          fontSize={"fontSize40"}
        >
          {index + ". " + title}
        </Text>
      </Box>
      <Box
        display={"flex"}
        width={"40%"}
        _hover={{
          cursor: "pointer",
        }}
      >
        <Box marginRight={"space20"}>
          <Text
            as={"span"}
            color={"colorTextLink"}
            fontWeight={"fontWeightMedium"}
          >
            Edit
          </Text>
        </Box>
        <EditIcon
          decorative={false}
          color={"colorTextLink"}
          title="Description of icon"
        />
      </Box>
    </Box>
  );
};

export default CheckoutHeader;
