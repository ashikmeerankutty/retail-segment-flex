import { Box, Button, Flex, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { IProduct } from "../../Global.types";
import { getProducts } from "../../redux/actions";
import { productsSelector } from "../../redux/selectors";
import { useAppDispatch } from "../../redux/store";
import { getBaseUrl } from "../../util";
import SizeGrid from "../SizeSelection/SizeGrid";

const RightPane = () => {
  const {
    data,
    fetching: fetchingProducts,
    fetchingFailure: fetchingProductsFailure,
    fetchingSuccess: fetchingProductsSuccess,
  } = useSelector(productsSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (
      !fetchingProducts &&
      !fetchingProductsFailure &&
      !fetchingProductsSuccess
    ) {
      dispatch(getProducts());
    }
  }, [
    dispatch,
    fetchingProducts,
    fetchingProductsFailure,
    fetchingProductsSuccess,
  ]);

  const product: IProduct = useMemo(() => {
    if (data.length > 0 && router.query.productId) {
      return data.find(
        (products: IProduct) =>
          products.id.toString() === router.query.productId
      );
    }
    return undefined;
  }, [data, router.query.productId]);

  return (
    <Flex grow hAlignContent="center" height="100%" width="50%">
      <Box>
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

          <Flex hAlignContent="center">
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
    </Flex>
  );
};
export default RightPane;
