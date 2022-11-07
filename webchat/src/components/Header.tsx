import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";

import { CloudCityHealthLogo }from "./CloudCityHealthLogo";
import { containerStyles, titleStyles } from "./styles/Header.styles";


export const Header = ({ customTitle }: { customTitle?: string }) => {
    return (
        <Box as="header" {...containerStyles}>
            <CloudCityHealthLogo/>
            <Text as="h2" {...titleStyles}>
                {customTitle || "Chat with us"}
            </Text>
        </Box>
    );
};
