import { Box, Flex, Stack } from "@twilio-paste/core";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftPane from "../HomeView/LeftPane";
import RightPane from "../HomeView/RightPane";
import useSegment from "../hooks/useSegment";
import useWebchat from "../hooks/useWebchat";

const HomeView = () => {
  useSegment();
  useWebchat();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex>
        <Box width="100%">
          <Header />
        </Box>
      </Flex>
      <Flex grow>
        <Flex
          grow
          vAlignContent="center"
          hAlignContent="center"
          height="100%"
        >
          <Stack orientation='horizontal' spacing="space200">
          <LeftPane />
          <RightPane />
          </Stack>

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
export default HomeView;
