import { Box, Column, Flex, Grid, Text } from "@twilio-paste/core";
import Image from "next/image";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { productsSelector } from "../../redux/selectors";
import { IProduct } from "./HomeView.types";

const RightPane = () => {
  const { data } = useSelector(productsSelector);
  const products = useMemo(() => {
    if (data.length > 0) {
      return data.map((product: IProduct) => (
        <Column key={product.id} span={6}>
          Image
        </Column>
      ));
    }
    return <></>;
  }, [data]);

  return (
    <Flex grow vAlignContent="center" hAlignContent="center" height="100%">
      <Box width="100%">
        <Grid>{products}</Grid>
      </Box>
    </Flex>
  );
};
export default RightPane;
