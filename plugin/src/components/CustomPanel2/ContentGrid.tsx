import { Box, Column, Flex, Grid } from "@twilio-paste/core";

import React from "react";
import CustomerJourneyCard, { Journey } from "./CustomerJourneyCard";
import MemberInfoCard from "./MemberInfoCard";
import MemberPointsCard from "./MemberPointsCard";
import PreferredStoreCard from "./PreferredStoreCard";

const ContentGrid = () => {
  const journeys: Journey[] = [{
    title: "Hello",
    time: "Tuesday",
    description: "Page Viewed",
    passed: true,
  }]
  
  return (
    <Box padding={"space40"}>
      <Grid equalColumnHeights>
        <Column span={5}>
          <Flex vertical>
            <Flex grow>
              <MemberInfoCard/>
            </Flex>
            <Flex grow>
              <PreferredStoreCard/>
            </Flex>
            <Flex grow>
              <MemberPointsCard/>
            </Flex>
          </Flex>
        </Column>
        <Column span={7}>
          <CustomerJourneyCard data={journeys}/>
        </Column>
      </Grid>
    </Box>
  );
};

export default ContentGrid;
