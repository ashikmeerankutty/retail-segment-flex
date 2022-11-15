import { Box, Flex, Stack } from "@twilio-paste/core";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftPane from "../components/HomeView/LeftPane";
import RightPane from "../components/HomeView/RightPane";
import useSegment from "../hooks/useSegment";
import useWebchat from "../hooks/useWebchat";
import LoadingIcons from "react-loading-icons";
import { useSelector } from "react-redux";
import { productsSelector } from "../redux/selectors";
import useProducts from "../hooks/useProducts";

const HomeView = () => {
  useProducts()
  useSegment();
  useWebchat();
  const { fetchingSuccess } = useSelector(productsSelector);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex>
        <Box width="100%">
          <Header />
        </Box>
      </Flex>
      <Flex grow>
        <Flex grow vAlignContent="center" hAlignContent="center" height="100%">
          {fetchingSuccess ? (
            <Stack orientation="horizontal" spacing="space200">
              <LeftPane />
              <RightPane />
            </Stack>
          ) : (
            <Box>
              <LoadingIcons.Puff
                stroke="#0263E0"
                strokeOpacity={0.125}
                speed={0.75}
              />
            </Box>
          )}
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
