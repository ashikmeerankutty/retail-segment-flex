import { Box, Card, Flex, Stack, Text } from "@twilio-paste/core";
import { EditIcon } from "@twilio-paste/icons/esm/EditIcon";
import { ProductHomeIcon } from "@twilio-paste/icons/esm/ProductHomeIcon";
import { ProductEmailAPIIcon } from "@twilio-paste/icons/cjs/ProductEmailAPIIcon";
import { VoiceCapableIcon } from "@twilio-paste/icons/esm/VoiceCapableIcon";

import React from "react";

const PreferredStoreCard = () => {
  return (
    <Box marginBottom={"space30"} minWidth={"100%"}>
      <Card>
        <Flex>
          <Flex width={"90%"}>
            <Box marginBottom={"space50"}>
              <Text as="h2" fontSize={"fontSize40"} fontWeight={"fontWeightSemibold"}>
                Preferred Store
              </Text>
            </Box>
          </Flex>
          <Flex width={"10%"}>
            <EditIcon decorative={false} title="Description of icon" />
          </Flex>
        </Flex>
        <Stack orientation={"vertical"} spacing={"space30"}>
          <Box marginBottom={"space30"}>
            <Flex>
              <ProductHomeIcon decorative={false} title="Description of icon" size="sizeIcon30" />
              <Box marginLeft={"space40"}>
                <Text fontWeight={"fontWeightBold"} as={"p"} fontSize={"fontSize20"}>Name</Text>
                <Text as={"p"} fontSize={"fontSize20"}>Owl Shoes</Text>
                <Text as={"p"} fontSize={"fontSize20"}>700 S. Lakeline Blvd.</Text>
                <Text as={"p"} fontSize={"fontSize20"}>Grand Rapids, Michigan 49507</Text>
              </Box>
            </Flex>
          </Box>
          <Box marginBottom={"space40"}>
            <Flex vAlignContent="center">
              <VoiceCapableIcon decorative={false} title="Description of icon" size="sizeIcon30" />
              <Box marginLeft={"space30"}>
                <Text fontWeight={"fontWeightBold"} as={"p"} fontSize={"fontSize20"}>Phone</Text>
                <Text as={"p"} fontSize={"fontSize20"}>415 555 1234</Text>
              </Box>
            </Flex>
          </Box>
          <Box marginBottom={"space20"}>
            <Flex vAlignContent="center">
              <ProductEmailAPIIcon decorative={false} title="Description of icon" size="sizeIcon30" />
              <Box marginLeft={"space30"}>
                <Text fontWeight={"fontWeightBold"} as={"p"} fontSize={"fontSize20"}>Email</Text>
                <Text as={"p"} fontSize={"fontSize20"}>OwlShoes@twilio.com</Text>
              </Box>
            </Flex>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default PreferredStoreCard;
