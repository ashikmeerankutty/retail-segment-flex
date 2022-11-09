import React from "react";

import { Theme } from "@twilio-paste/core/theme";
import NameHeader from "./NameHeader";
import ContentGrid from "./ContentGrid";
import { Box } from "@twilio-paste/box";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@twilio-paste/tabs";

const CustomPanel2 = (): JSX.Element | null => {
  return (
    <Theme.Provider theme="default">
      <Box
        borderStyle="solid"
        borderLeftWidth={"borderWidth10"}
        borderColor={"colorBorderWeak"}
      >
        <NameHeader />
        <Tabs>
          <TabList aria-label="Horizontal product tabs">
            <Tab>Member Details</Tab>
            <Tab>Store and Products</Tab>
            <Tab>Purchase History</Tab>
            <Tab>Documents</Tab>
            <Tab>Cart</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ContentGrid />
            </TabPanel>
            <TabPanel>
              Hello
            </TabPanel>
            <TabPanel>
              World
            </TabPanel>
            <TabPanel>
              Hello2
            </TabPanel>
            <TabPanel>
              World2
            </TabPanel>
          </TabPanels>
        </Tabs>
        
      </Box>
    </Theme.Provider>
  );
};

export default CustomPanel2;
