import { Box, Card, Flex, Text } from "@twilio-paste/core";
import React from "react";

export interface Journey {
  time: string;
  title: string;
  description: string;
  passed: boolean;
  link?: string;
}

function timeSince(date: any) {
  var seconds = Math.floor(
    (new Date().valueOf() - new Date(date).valueOf()) / 1000
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " y ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " m ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " d ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " h ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " min ago";
  }
  return "less min ago";
}

export const CustomerJourneyCard = ({ data }: { data: Journey[] }) => {
  return (
    <Box minWidth={"100%"} minHeight={"50vh"}>
      <Card>
        <Box marginBottom={"space40"}>
          <Text as="h2" fontSize={"fontSize40"} fontWeight={"fontWeightSemibold"}>
            Customer Journey
          </Text>
        </Box>
        <Box>
          {data && data.length ? (
            <Box>
              <Box marginBottom={"space20"}>
                <Text fontSize={"fontSize40"} fontWeight={"fontWeightMedium"} as={"h3"}>Newest Events</Text>
              </Box>
              {data.map((item: Journey, index: number) => (
                <Box className="journey-item" key={index}>
                  <Flex>
                    <Text marginBottom={"space40"} as={"span"}>{timeSince(item.time)}</Text>
                    <Box className="image-block">
                      {index == 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.50039 17.0999C13.6978 17.0999 17.1004 13.6973 17.1004 9.4999C17.1004 5.30254 13.6978 1.8999 9.50039 1.8999C5.30303 1.8999 1.90039 5.30254 1.90039 9.4999C1.90039 13.6973 5.30303 17.0999 9.50039 17.0999ZM9.22517 12.0694L13.0213 8.27561C13.2 8.09701 13.3004 7.85479 13.3004 7.60222C13.3004 7.34965 13.2 7.10742 13.0213 6.92883C12.8426 6.75023 12.6002 6.6499 12.3475 6.6499C12.0947 6.6499 11.8524 6.75023 11.6737 6.92883L8.55136 10.0587L7.32712 8.82571C7.14841 8.64711 6.90603 8.54678 6.65331 8.54678C6.40057 8.54678 6.1582 8.64711 5.9795 8.82571C5.80078 9.0043 5.70039 9.24652 5.70039 9.4991C5.70039 9.75167 5.80078 9.99389 5.9795 10.1725L7.87755 12.0694C7.96578 12.1583 8.07074 12.2288 8.18639 12.277C8.30204 12.3251 8.42607 12.3499 8.55136 12.3499C8.67665 12.3499 8.80068 12.3251 8.91633 12.277C9.03198 12.2288 9.13694 12.1583 9.22517 12.0694Z"
                            fill="#030B5D"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                        >
                          <circle
                            cx="8.5"
                            cy="8.5"
                            r="7.5"
                            fill="white"
                            stroke="#606B85"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                      <div className="border" />
                    </Box>
                    <Box className="description">

                      <Text fontWeight={"fontWeightMedium"} as={"p"} className={index == 0 ? "passed" : ""}>{item.title}</Text>
                      <Text as={"span"}>{item.description}</Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
              <Box marginTop={"space40"}>
                <Text fontSize={"fontSize40"} fontWeight={"fontWeightMedium"} as={"h3"}>Oldest Events</Text>
              </Box>
            </Box>
          ) : (
            <Box width={"100%"}>
              <Text as={"h3"}>No Journeys Found</Text>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default CustomerJourneyCard;
