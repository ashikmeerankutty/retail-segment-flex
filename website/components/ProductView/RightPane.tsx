import { Box, Button, Flex, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useMemo } from "react";
import { IProduct } from "../../Global.types";
import { getBaseUrl } from "../../util";
import SizeGrid from "../SizeSelection/SizeGrid";

export interface IProductRightPaneProps {
  onCheckout: () => void;
  product: IProduct;
}

const RightPane = ({ onCheckout, product }: IProductRightPaneProps) => {
  const productView = useMemo(() => {
    if (product) {
      return (
        <Stack orientation="vertical" spacing="space50">
          <Text fontSize="fontSize50" as="p">
            {product.title ?? ""}
          </Text>
          <Text as="p" color="colorTextWeaker">
            {product.subTitle ?? ""}
          </Text>
          <Text as="p" fontWeight="fontWeightBold" fontSize="fontSize50">
            ${product.price ?? ""}
          </Text>
          <Image
            src={`${getBaseUrl()}/images/website/color_selection.png`}
            width={540}
            height={85}
            alt="color selection"
          />

          <SizeGrid sizes={product.availbleSizes} />

          <Flex hAlignContent="center" paddingTop="space50">
            <Stack orientation="vertical" spacing="space50">
              <Box width={238}>
                <Button fullWidth variant="primary" onClick={onCheckout}>
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
      );
    }
    return <></>;
  }, [onCheckout, product]);

  return <Box>{productView}</Box>;
};
export default RightPane;
