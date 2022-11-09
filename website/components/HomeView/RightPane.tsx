import { Box, Column, Flex, Grid, Stack, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getImageTest, getProducts } from "../../redux/actions";
import { imageTestSelector, productsSelector } from "../../redux/selectors";
import { useAppDispatch } from "../../redux/store";
import { IProduct, IServerImageMetadata } from "./HomeView.types";
import Axios from "axios";

const RightPane = () => {
  const {
    data,
    fetching: fetchingProducts,
    fetchingFailure: fetchingProductsFailure,
    fetchingSuccess: fetchingProductsSuccess,
  } = useSelector(productsSelector);
  const {
    data: images,
    fetching: fetchingImages,
    fetchingFailure: fetchingImagesFailure,
    fetchingSuccess: fetchingImagesSuccess,
  } = useSelector(imageTestSelector);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (
      data.length > 0 &&
      !fetchingImages &&
      !fetchingImagesFailure &&
      !fetchingImagesSuccess
    ) {
      const names = data.map((product: IProduct) => product.imagePaths[0]);
      dispatch(
        getImageTest({
          names,
        })
      );
    }
  }, [
    data,
    data.length,
    dispatch,
    fetchingImages,
    fetchingImagesFailure,
    fetchingImagesSuccess,
  ]);

  const products = useMemo(() => {
    if (data.length > 0 && images.length > 0) {
      return data.map((product: IProduct) => (
        <Box
          key={product.id}
          style={{
            display: "inline-block",
            paddingRight: 50,
            paddingBottom: 50,
          }}
        >
          <Stack orientation="vertical" spacing="space0">
            <Image
              src={`data:image/png;base64,${
                images.find((image: IServerImageMetadata) =>
                  product.imagePaths[0].includes(image.name)
                ).b64
              }`}
              width={248}
              height={248}
              alt={`image-${product.id}`}
            />
            <Text as='p' fontWeight='fontWeightBold' paddingLeft='space30'>{product.title}</Text>
            <Text as='p' color='colorTextWeaker' paddingLeft='space30'>{product.subTitle}</Text>
          </Stack>
        </Box>
      ));
    }
    return <></>;
  }, [data, images]);

  return (
    <Flex
      grow
      vAlignContent="center"
      hAlignContent="center"
      height="100%"
      width="50%"
    >
      <Box width={600}>{products}</Box>
    </Flex>
  );
};
export default RightPane;
