import { Box, Flex, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../../public/redux/actions";
import { productsSelector } from "../../public/redux/selectors";
import { useAppDispatch } from "../../public/redux/store";
import { IProduct } from "../../Global.types";
import { getBaseUrl } from "../../util";
import { useRouter } from "next/router";

const LeftPane = () => {
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
    if (data.length > 0) {
      const product = data.find(
        (p: IProduct) => p.id.toString() === router.query.productId
      );
      return product.imagePaths.map((path: string) => (
        <Box
          onClick={() => router.push("/ProductView")}
          key={`div-${path}`}
          style={{
            display: "inline-block",
            cursor: "pointer",
            paddingRight: 15,
            paddingBottom: 15,
          }}
        >
          <Stack orientation="vertical" spacing="space0">
            <Image
              src={`${getBaseUrl()}/images/products/${path}`}
              width={326}
              height={326}
              alt={`image-${path}`}
            />
          </Stack>
        </Box>
      ));
    }
    return <></>;
  }, [data, router]);

  return (
    <Box width={700} marginRight="space100">
      {products}
    </Box>
  );
};
export default LeftPane;
