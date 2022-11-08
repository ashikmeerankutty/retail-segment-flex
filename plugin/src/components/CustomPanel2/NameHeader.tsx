import { Box } from "@twilio-paste/box";
import { Avatar, Flex, Text } from "@twilio-paste/core";
import React from "react";

const NameHeader = ({
  name = "Mary Ann, Doe",
  avatarUrl = "",
  description = "Patient since 2012",
}) => {
  return (
    <Box padding="space60">
      <Flex vAlignContent="center">
        <Flex>
          <Box marginRight={"space10"}>
            <Avatar
              size="sizeIcon100"
              name="avatar example"
              src={
                avatarUrl
                  ? avatarUrl
                  : "https://www.gravatar.com/avatar/16587fc91d5c2e198807b3c88d567378?d=mp"
              }
            />
          </Box>
        </Flex>
        <Flex vertical>
          <Box padding="space20">
            <Text
              as="h1"
              fontSize={"fontSize90"}
              color={"colorText"}
              fontWeight={"fontWeightBold"}
            >
              {name}
            </Text>
          </Box>
          <Box padding="space20">
            <Text
              as="p"
              fontSize={"fontSize20"}
              color={"colorTextWeak"}
            >
              {description}
            </Text>
            </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NameHeader;
