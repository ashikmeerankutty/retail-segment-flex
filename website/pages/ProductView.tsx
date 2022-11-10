import { Box, Flex } from "@twilio-paste/core";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftPane from "../components/ProductView/LeftPane"
import RightPane from "../components/ProductView/RightPane";
import useSegment from "../hooks/useSegment";
import useWebchat from "../hooks/useWebchat";

const ProductView = () => {
  useSegment();
  useWebchat();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex>
        <Box width="100%">
          <Header />
        </Box>
      </Flex>
      <Flex grow paddingTop='space60'>
      <Flex grow hAlignContent="center" height="100%">
        <LeftPane />
        <RightPane />
        </Flex>
      </Flex>
      <Flex>
        <Box width="100%">
          <Footer />
        </Box>
      </Flex>
    </div>
  );
};
export default ProductView;
