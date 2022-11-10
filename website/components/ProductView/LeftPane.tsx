import { Box, Stack } from "@twilio-paste/core";
import Image from "next/image";
import { useMemo } from "react";
import { IProduct } from "../../Global.types";
import { getBaseUrl } from "../../util";
import { useRouter } from "next/router";

export interface IProductLeftPaneProps {
  product: IProduct;
}

const LeftPane = ({ product }: IProductLeftPaneProps) => {
  const router = useRouter();

  const products = useMemo(() => {
    if (product) {
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
  }, [product, router]);

  return (
    <Box width={700} marginRight="space100">
      {products}
    </Box>
  );
};
export default LeftPane;
