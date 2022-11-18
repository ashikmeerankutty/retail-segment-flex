import { Box, Button, Flex, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IProduct } from "../../Global.types";
import { getBaseUrl } from "../../util";
import SizeGrid from "../SizeSelection/SizeGrid";

const RightPane = () => {
  return (
    <Box width={536}>
      {" "}
      <Stack orientation="vertical" spacing="space50">
        <Flex hAlignContent="center" paddingTop="space50">
          <Stack orientation="vertical" spacing="space50">
            <Box width={238}>
              <Button fullWidth variant="primary">
                Add to cart
              </Button>
            </Box>
            <Box width={238}>
              <Button fullWidth variant="secondary">
                Add to favorites
              </Button>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};
export default RightPane;
