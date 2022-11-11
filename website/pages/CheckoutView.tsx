import { Box, Flex } from "@twilio-paste/core";
import { useState } from "react";
import CheckoutContent from "../components/CheckoutView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useSegment from "../hooks/useSegment";
import useWebchat from "../hooks/useWebchat";

const CheckoutView = () => {
  useSegment();
  useWebchat();

  const [showNavOnly, setShowNavOnly] = useState<boolean>(true)

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex>
        <Box width="100%">
          <Header showNavOnly={showNavOnly}/>
        </Box>
      </Flex>
      <Flex grow>
        <CheckoutContent setShowNavOnly={setShowNavOnly}/>
      </Flex>
      <Flex>
        <Box width="100%">
          <Footer />
        </Box>
      </Flex>
    </div>
  );
};
export default CheckoutView;