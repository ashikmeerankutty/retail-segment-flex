import { Box, Flex, Text } from "@twilio-paste/core";
import { useMemo } from "react";
import { BackgroundColor, TextColor } from "@twilio-paste/core/style-props";

export interface ISizeButtonProps {
  disabled?: boolean;
  onClick: (size: string) => void;
  selected?: boolean;
  value: string;
}

const SizeButton = ({ disabled, onClick, value, selected }: ISizeButtonProps) => {
  const bgColor = useMemo<BackgroundColor | undefined>(() => {
    if (disabled) return "colorBackground";

    if (selected) return "colorBackgroundPrimary";

    return undefined;
  }, [disabled, selected]);

  const textColor = useMemo<TextColor | undefined>(() => {
    if (disabled) return "colorTextWeaker";

    if (selected) return "colorTextWeakest";

    return undefined;
  }, [disabled, selected]);

  return (
    <Box
      borderWidth="borderWidth10"
      borderStyle="solid"
      borderColor={"colorBorder"}
      borderRadius="borderRadius20"
      backgroundColor={bgColor}
      _hover={{ cursor: "pointer" }}
      onClick={()=>onClick(value)}
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
          color={textColor}
        >
          {value}
        </Text>
      </Flex>
    </Box>
  );
};

export default SizeButton;
