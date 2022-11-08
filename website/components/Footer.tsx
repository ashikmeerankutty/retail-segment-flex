import { Anchor, Box, Flex, Stack, Text } from "@twilio-paste/core";

const Footer = () => {
  return (
    <Flex vertical width="100%">
      <Box
        backgroundColor="colorBackgroundStrong"
        width="100%"
        padding="space70"
        marginTop="space100"
      >
        <Flex grow vertical height="100%" vAlignContent="center">
          <Stack orientation="horizontal" spacing="space100">
            <Text as="p">&copy; 2022 Cloud City Healthcare</Text>
            <Anchor href="#">Privacy Policy</Anchor>
            <Anchor href="#">Terms of Service</Anchor>
          </Stack>
        </Flex>
      </Box>
      <Box backgroundColor="colorBackgroundBrand" width="100%" height={10} />
    </Flex>
  );
};

export default Footer;
