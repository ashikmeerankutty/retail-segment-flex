import { BoxStyleProps } from "@twilio-paste/core/box";
import { TextStyleProps } from "@twilio-paste/core/text";

export const containerStyles: BoxStyleProps = {
    display: "flex",
    backgroundColor: "colorBackground",
    paddingTop: "space40",
    paddingBottom: "space20",
    borderTopLeftRadius: "borderRadius20",
    borderTopRightRadius: "borderRadius20"
};

export const titleStyles: TextStyleProps = {
    color: "colorText",
    paddingLeft: "space30"
};
