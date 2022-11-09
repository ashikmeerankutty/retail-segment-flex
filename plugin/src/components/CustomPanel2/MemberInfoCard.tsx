import { Box, Card, Flex, Heading, Stack, Text } from "@twilio-paste/core";
import { EditIcon } from "@twilio-paste/icons/esm/EditIcon";
import { UserIcon } from "@twilio-paste/icons/esm/UserIcon";
import { CalendarIcon } from "@twilio-paste/icons/esm/CalendarIcon";

import React from "react";

const MemberInfoCard = () => {
  return (
    <Box marginBottom={"space30"} minWidth={"100%"}>
      <Card>
        <Flex>
          <Flex width={"90%"}>
            <Box marginBottom={"space50"} marginRight={"space20"}>
              <Text as="h2" fontSize={"fontSize40"} fontWeight={"fontWeightSemibold"}>
                Owl Shoes Member Info
              </Text>
            </Box>
          </Flex>
          <Flex width={"10%"}>
            <EditIcon decorative={false} title="Description of icon" />
          </Flex>
        </Flex>
        <Stack orientation={"vertical"} spacing={"space30"}>
          <Box marginBottom={"space40"}>
            <Flex vAlignContent="center">
              <UserIcon decorative={false} title="Description of icon" size="sizeIcon40" />
              <Box marginLeft={"space30"}>
                <Text fontWeight={"fontWeightBold"} as={"p"} fontSize={"fontSize20"}>Member ID</Text>
                <Text as={"p"} fontSize={"fontSize20"}>C569294FEST</Text>
              </Box>
            </Flex>
          </Box>
          <Box marginBottom={"space40"}>
            <Flex vAlignContent="center">
              <UserIcon decorative={false} title="Description of icon" size="sizeIcon40" />
              <Box marginLeft={"space30"}>
                <Text fontWeight={"fontWeightBold"} as={"p"} fontSize={"fontSize20"}>Account Type</Text>
                <Text as={"p"} fontSize={"fontSize20"}>A-list</Text>
              </Box>
            </Flex>
          </Box>
          <Box marginBottom={"space20"}>
            <Flex vAlignContent="center">
              <CalendarIcon decorative={false} title="Description of icon" size="sizeIcon40" />
              <Box marginLeft={"space30"}>
                <Text fontWeight={"fontWeightBold"} as={"p"} fontSize={"fontSize20"}>Member ID</Text>
                <Text as={"p"} fontSize={"fontSize20"}>July 21, 2022</Text>
              </Box>
            </Flex>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default MemberInfoCard;
