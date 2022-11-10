import {
  Box,
  Button,
  Column,
  Flex,
  Grid,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@twilio-paste/core";
import { StarIcon } from "@twilio-paste/icons/cjs/StarIcon";
import SearchForm from "./SearchForm";
import Image from "next/image";
import { useSelector } from "react-redux";
import { syncTokenSelector } from "../redux/selectors";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { getSyncToken } from "../redux/actions";
import { SyncClient } from "twilio-sync";

const Header = () => {
  const [syncClient, setSyncClient] = useState<SyncClient>();
  const [cartItems, setCartItems] = useState<number>(0);
  const {
    fetching,
    fetchingFailure,
    fetchingSuccess,
    data: tokenData,
  } = useSelector(syncTokenSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fetching && !fetchingFailure && !fetchingSuccess) {
      dispatch(getSyncToken());
    }
  }, [dispatch, fetching, fetchingFailure, fetchingSuccess]);

  useEffect(() => {
    if (!!tokenData.token) {
      const client = new SyncClient(tokenData.token, { logLevel: "debug" });
      setSyncClient(client);
      client.map("Cart").then((map) => {
        map.on("itemAdded", (args) => {
          setCartItems((state) => state + 1);
          //console.log('args.item.data:', args.item.data);
        });
      });
    }
  }, [tokenData.token]);

  return (
    <Box>
      <Stack orientation="vertical" spacing="space30">
        <Box padding="space0" boxShadow="shadowLow">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 24,
            }}
          >
            <Box>
              <Text fontSize="fontSize80" as="h1">
                Owl Shoes
              </Text>
            </Box>
            <Stack orientation="horizontal" spacing="space50">
              <Text as="a" color="colorTextLink">
                Help
              </Text>
              <Text as="a" color="colorTextLink">
                Join Us
              </Text>
              <Text as="a" color="colorTextLink">
                Welcome back, Mary Doe!
              </Text>
            </Stack>
          </div>
        </Box>
        <Box paddingRight="space100" paddingLeft="space100">
          <Grid>
            <Column offset={3} span={6}>
              <Flex hAlignContent="center" paddingTop="space40">
                <Tabs selectedId={"0"} baseId="horizontal-tabs">
                  <TabList aria-label="Horizontal product tabs">
                    <Tab id="0">New & Featured</Tab>
                    <Tab>Men</Tab>
                    <Tab>Women</Tab>
                    <Tab>Kids</Tab>
                    <Tab>Sale</Tab>
                    <Tab>Gifts</Tab>
                  </TabList>
                </Tabs>
              </Flex>
            </Column>
            <Column span={3}>
              <Flex height="100%" hAlignContent="right" paddingTop="space30">
                <Stack orientation="horizontal" spacing="space50">
                  <SearchForm />
                  <Button variant="secondary">
                    <StarIcon decorative={false} title="Description of icon" />
                  </Button>
                  <Box style={{ position: "relative" }}>
                    {cartItems > 0 && (
                      <span className="badge">{cartItems}</span>
                    )}
                    <Button variant="secondary">
                      <Image
                        src="/cart_logo.svg"
                        height={20}
                        width={20}
                        alt="cart"
                      />
                    </Button>
                  </Box>
                </Stack>
              </Flex>
            </Column>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
