import { Box, Flex, Text } from "@twilio-paste/core";

export interface ISizeButtonProps {
  value: string;
  disabled?: boolean;
}

const SizeButton = ({ disabled, value }: ISizeButtonProps) => {
  return (
    <Box
      borderWidth="borderWidth10"
      borderStyle="solid"
      borderColor={"colorBorder"}
      borderRadius="borderRadius20"
      backgroundColor={disabled ? "colorBackground" : undefined}
    >
      <Flex
        vAlignContent="center"
        hAlignContent="center"
        width={92}
        height={64}
      >
        <Text
          as="p"
          fontWeight="fontWeightBold"
          color={disabled ? "colorTextWeaker" : undefined}
        >
          {value}
        </Text>
      </Flex>
    </Box>
  );
};

export default SizeButton;
