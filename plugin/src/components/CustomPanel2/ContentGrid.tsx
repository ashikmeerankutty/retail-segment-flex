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
    <Box padding={"space40"} width={"100%"}>
      <Grid gutter={"space20"}>
        <Column span={5}>
          <Box width={"100%"}> 
            <Flex vertical>
              <MemberInfoCard/>
              <PreferredStoreCard/>
              <MemberPointsCard/>
            </Flex>
          </Box>
        </Column>
        <Column span={7}>
          <CustomerJourneyCard data={journeys}/>
        </Column>
      </Grid>
    </Box>
  );
};

export default ContentGrid;
