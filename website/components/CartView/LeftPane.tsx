import { Box, Flex, Heading, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useMemo } from "react";
import { ICartItem, IProduct } from "../../Global.types";
import { getBaseUrl } from "../../util";
import { useRouter } from "next/router";
import useCart from "../../hooks/useCart";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/actions";
import { cartSelector } from "../../redux/selectors";

const LeftPane = () => {
  const router = useRouter();

  const { data } = useSelector(cartSelector);

  return (
    <Box width={650} marginRight="space100">
      <Box
        borderWidth="borderWidth10"
        borderStyle="solid"
        borderColor={"colorBorderWeak"}
        borderRadius="borderRadius20"
        padding="space30"
      >
        <Heading as="h2" variant="heading20">
          Free Shipping for Owl Shoes members!
        </Heading>
        <Text as="p">
          Enjoy free shipping on all orders as an Owl Shoes member.
        </Text>
      </Box>
      <Heading as="h1" variant="heading10">
        Your cart
      </Heading>

      <Box width="100%">
        {data.map((cartItem: ICartItem) => (
          <Flex grow key={`cartItem-${cartItem.product.id}`}>
            <Flex paddingRight="space70">
              <Image
                src={`${getBaseUrl()}/images/products/${
                  cartItem.product.imagePaths[0]
                }`}
                width={200}
                height={200}
                alt="product image"
              />
            </Flex>
            <Flex width="100%" height="100%" vertical>
              <Flex grow>
                <Text as="p" fontWeight="fontWeightBold">
                  {cartItem.product.title}
                </Text>
              </Flex>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <Text as="p">{cartItem.product.subTitle}</Text>
                <Text as="p" textAlign="end">
                  ${cartItem.product.price}
                </Text>
              </div>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
export default LeftPane;
