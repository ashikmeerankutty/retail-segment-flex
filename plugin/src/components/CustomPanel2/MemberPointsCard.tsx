import { Box, Card, Flex, Heading, Text } from '@twilio-paste/core'
import { EditIcon } from '@twilio-paste/icons/esm/EditIcon'
import React from 'react'

const MemberPointsCard = () => {
  return (
    <Box marginBottom={"space30"} minWidth={"100%"}>
      <Card>
        <Flex>
          <Flex width={"90%"}>
            <Box marginBottom={"space50"} marginRight={"space30"} minWidth={"100%"}>
              <Text as="h2" fontSize={"fontSize40"} fontWeight={"fontWeightSemibold"}>
                Member Points
              </Text>
              <Text as={'p'} fontSize={"fontSize20"}>
                July - December 2022
              </Text>
            </Box>
          </Flex>
          <Flex width={"10%"}>
            <EditIcon decorative={false} title="Description of icon" />
          </Flex>
        </Flex>
        <Flex>
          <Flex vertical width={"50%"}>
            <Text as={'p'} fontWeight={"fontWeightMedium"}>Earned</Text>
            <Text as={'p'} fontWeight={"fontWeightLight"}>500</Text>
          </Flex>
          <Flex vertical width={"50%"}>
            <Text as={'p'} fontWeight={"fontWeightMedium"}>Redeemed</Text>
            <Text as={'p'} fontWeight={"fontWeightLight"}>0</Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  )
}

export default MemberPointsCard