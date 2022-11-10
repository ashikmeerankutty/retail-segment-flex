import { Box, Flex, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import { productsSelector } from "../redux/selectors";
import { useAppDispatch } from "../redux/store";
import { IProduct } from "../Global.types";
import { getBaseUrl } from "../util";
import { useRouter } from "next/router";

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

  const products = useMemo(() => {
    if (data && data.length > 0) {
      return data.map((product: IProduct) => {
        if (product) {
          return (
            <Box
              onClick={() =>
                router.push({
                  pathname: "/ProductView",
                  query: { productId: product.id },
                })
              }
              key={product.id}
              style={{
                display: "inline-block",
                cursor: "pointer",
                paddingRight: 50,
                paddingBottom: 50,
              }}
            >
              <Stack orientation="vertical" spacing="space0">
                <Image
                  src={`${getBaseUrl()}/images/products/${
                    product.imagePaths[0]
                  }`}
                  width={248}
                  height={248}
                  alt={`image-${product.id}`}
                />
                <Text as="p" fontWeight="fontWeightBold" paddingLeft="space30">
                  {product.title}
                </Text>
                <Text as="p" color="colorTextWeaker" paddingLeft="space30">
                  {product.subTitle}
                </Text>
              </Stack>
            </Box>
          );
        }
      });
    }
    return <></>;
  }, [data, router]);

  return (
      <Box width={600} marginLeft='space100'>{products}</Box>
  );
};
export default RightPane;
