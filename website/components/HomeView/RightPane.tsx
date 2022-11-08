import { Box, Column, Flex, Grid, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getImageTest, getProducts } from "../../redux/actions";
import { imageTestSelector, productsSelector } from "../../redux/selectors";
import { useAppDispatch } from "../../redux/store";
import { IProduct, IServerImageMetadata } from "./HomeView.types";

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
        <Column key={product.id} span={6}>
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
        </Column>
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
      <Box width="100%">
        <Grid>{products}</Grid>
      </Box>
    </Flex>
  );
};
export default RightPane;
