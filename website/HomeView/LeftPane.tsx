import { Box, Button, Flex, Stack, Text } from "@twilio-paste/core";

const LeftPane = () => {
  return (
      <Box width={300} style={{ textAlign: "center" }} marginRight='space200'>
        <Stack orientation="vertical" spacing="space150">
          <Text fontSize="fontSize90" as="h1">
            Owl Shoes
          </Text>
          <Text fontSize="fontSize60" as="p" style={{ fontWeight: "500" }}>
            New year, new style
          </Text>
          <Text
            as="h2"
            style={{ fontFamily: "impact", fontSize: 60, lineHeight: "73px" }}
          >
            OWL RUNNING KIT 2023
          </Text>
          <Text fontSize="fontSize60" as="p" style={{ fontWeight: "300" }}>
            Members get a sneak peek at our newest lineup starting now. Hurry
            before they sell out!
          </Text>
          <Button variant="secondary">
            <Box paddingLeft="space100" paddingRight="space100">
              Shop Now
            </Box>
          </Button>
        </Stack>
      </Box>
  );
};
export default LeftPane;
