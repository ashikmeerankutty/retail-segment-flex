import { Box, Button, Flex, Heading, Stack, Text } from "@twilio-paste/core";
import { SuccessIcon } from "@twilio-paste/icons/cjs/SuccessIcon";
import Image from "next/image";
import { IProduct } from "../Global.types";
import { getBaseUrl } from "../util";
import { CloseIcon } from "@twilio-paste/icons/cjs/CloseIcon";
import { MouseEventHandler } from "react";

export interface ICartModalProps {
  numberOfItems?: number;
  onClose: MouseEventHandler<HTMLElement>;
  product: IProduct;
}

const CartModal = ({ numberOfItems, onClose, product }: ICartModalProps) => {
  return product ? (
    <Box width="500px" height="400px">
      <Flex vertical height="100%" width="100%">
        <Flex width="100%" paddingBottom="space50" padding="space50">
          <Flex>
            <Heading variant="heading30" as="h3" marginBottom="space0">
              Your cart has been updated
            </Heading>
          </Flex>
          <Flex grow hAlignContent="right">
            <Box onClick={onClose}>
              <CloseIcon
                decorative={false}
                title="Description of icon"
                color="colorTextWeak"
                size="sizeIcon50"
              />
            </Box>
          </Flex>
        </Flex>
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            borderTop: "solid",
            borderWidth: 1,
            padding: 32,
            borderColor: "#CACDD8",
          }}
        >
          <Box>
            <Stack orientation="horizontal" spacing="space30">
              <SuccessIcon
                color="colorTextSuccess"
                decorative={false}
                title="Description of icon"
              />
              <Heading variant="heading30" as="h3" marginBottom="space0">
                Added to cart!
              </Heading>
            </Stack>
          </Box>

          <Stack orientation="horizontal" spacing="space100">
            <Image
              src={`${getBaseUrl()}/images/products/${product.imagePaths[0]}`}
              height={141}
              width={141}
              alt="product cart image"
            />
            <Stack orientation="vertical" spacing="space50">
              <Text as="p" fontWeight="fontWeightBold">
                {product.title}
              </Text>
              <Text as="p">{product.subTitle}</Text>
              <Text as="p">Size 7 {/** TODO: Update this */}</Text>
              <Text as="p">${product.price}</Text>
            </Stack>
          </Stack>
          <Flex>
            <Flex grow paddingRight="space50">
              <Button fullWidth variant="secondary">
                View cart {numberOfItems ? `(${numberOfItems})` : undefined}
              </Button>
            </Flex>
            <Flex grow paddingLeft="space50">
              <Button fullWidth variant="primary">
                Checkout
              </Button>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Box>
  ) : (
    <></>
  );
};

export default CartModal;
