import { Box, Flex } from "@twilio-paste/core";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftPane from "../components/HomeView/LeftPane";
import RightPane from "../components/HomeView/RightPane";
import useProducts from "../hooks/useProducts";
import useSegment from "../hooks/useSegment";
import useWebchat from "../hooks/useWebchat";

const Test = () => {
  useSegment();
  useWebchat();
  useProducts()

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex>
        <Box width="100%">
          <Header />
        </Box>
      </Flex>
      <Flex grow>
        <LeftPane />
          <RightPane />
      </Flex>
      <Flex>
        <Box width="100%">
          <Footer />
        </Box>
      </Flex>
    </div>
  );
};
export default Test;
