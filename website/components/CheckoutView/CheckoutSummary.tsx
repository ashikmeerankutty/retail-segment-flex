import {
  Box,
  Button,
  Column,
  Grid,
  Heading,
  Stack,
  Text,
} from "@twilio-paste/core";
import React from "react";
import LoadingIcons from "react-loading-icons";
import { CartProduct } from "../../Global.types";
import CheckoutHeader from "./CheckoutHeader";
import ItemsSummary from "./ItemsSummary";
import PriceSummary from "./PriceSummary";

export interface CheckoutSummaryProps {
  handlePlaceOrder: () => void;
  orderedItems: CartProduct[];
}

const CheckoutSummary = ({
  handlePlaceOrder,
  orderedItems,
}: CheckoutSummaryProps) => {
  const getSubTotal = () => {
    let total = 0;
    console.log("ordered", orderedItems);
    orderedItems.forEach((item) => (total += Number(item.product.price)));
    return total;
  };

  return (
    <Box marginX={"space200"} marginBottom={"space80"}>
      <Grid>
        <Column span={7}>
          <Box paddingRight={"space200"}>
            <Heading as={"label"} variant={"heading20"}>
              Checkout
            </Heading>
            <Box>
              <CheckoutHeader index={1} title={"Delivery Options"} />
              <Box marginBottom={"space80"}>
                <Stack orientation={"vertical"} spacing={"space10"}>
                  <Text
                    fontSize={"fontSize20"}
                    fontWeight={"fontWeightBold"}
                    as={"p"}
                  >
                    Shipping Address
                  </Text>
                  <Text
                    color={"colorTextWeak"}
                    fontSize={"fontSize20"}
                    as={"p"}
                  >
                    Mary Doe
                  </Text>
                  <Text
                    color={"colorTextWeak"}
                    fontSize={"fontSize20"}
                    as={"p"}
                  >
                    1234 Robbin St.
                  </Text>
                  <Text
                    color={"colorTextWeak"}
                    fontSize={"fontSize20"}
                    as={"p"}
                  >
                    Grand Rapids, MI 49507
                  </Text>
                  <Text
                    color={"colorTextWeak"}
                    fontSize={"fontSize20"}
                    as={"p"}
                  >
                    Mary.Doe@gmail.com
                  </Text>
                  <Text
                    color={"colorTextWeak"}
                    fontSize={"fontSize20"}
                    as={"p"}
                  >
                    123-456-7890
                  </Text>
                </Stack>
              </Box>
              <Box marginBottom={"space80"}>
                <Stack orientation={"vertical"} spacing={"space10"}>
                  <Text
                    fontSize={"fontSize20"}
                    fontWeight={"fontWeightBold"}
                    as={"p"}
                  >
                    Shipping Speed
                  </Text>
                  <Text
                    color={"colorTextWeak"}
                    fontSize={"fontSize20"}
                    as={"p"}
                  >
                    UPS Ground - $0.00
                  </Text>
                  <Text
                    color={"colorTextWeak"}
                    fontSize={"fontSize20"}
                    as={"p"}
                  >
                    Arrive by Monday, October 31
                  </Text>
                </Stack>
              </Box>
              <CheckoutHeader index={2} title={"Payment"} />
              <Box marginBottom={"space80"}>
                <Stack orientation={"vertical"} spacing={"space40"}>
                  <Box>
                    <Text
                      fontSize={"fontSize20"}
                      fontWeight={"fontWeightBold"}
                      as={"p"}
                    >
                      Payment Method
                    </Text>
                    <Text
                      color={"colorTextWeak"}
                      fontSize={"fontSize20"}
                      as={"p"}
                    >
                      5412 Exp: 04/26
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize={"fontSize20"}
                      fontWeight={"fontWeightBold"}
                      as={"p"}
                    >
                      Billing Details
                    </Text>
                    <Text
                      color={"colorTextWeak"}
                      fontSize={"fontSize20"}
                      as={"p"}
                    >
                      123-456-7890
                    </Text>
                  </Box>
                </Stack>
              </Box>
              <CheckoutHeader index={3} title={"Review Order"} />
              <Box marginBottom={"space60"}>
                <Text as={"symbol"} fontSize={"fontSize20"}>
                  By clicking the &quot;Place Order&quot; button, you confirm
                  that you have read, understood, and accepted our Terms of Use,
                  Terms of Sale, Privacy Policy, and Return Policy
                </Text>
              </Box>
              <Box width={"30%"}>
                <Button
                  variant={"primary"}
                  fullWidth
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          </Box>
        </Column>
        <Column span={5} height={"100%"}>
          {orderedItems && orderedItems.length ? (
            <Box>
              <Box marginBottom={"space130"}>
                <PriceSummary
                  subtotal={getSubTotal()}
                  shippingAndHandling={10.0}
                  tax={16}
                />
              </Box>
              <Box>
                <ItemsSummary
                  arrivalDate={new Date().toLocaleDateString("en-us", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                  orderedItems={orderedItems}
                />
              </Box>
            </Box>
          ) : (
            <Box display={"flex"} justifyContent={"center"}>
              <LoadingIcons.Puff
                stroke="#0263E0"
                strokeOpacity={0.125}
                speed={0.75}
              />
            </Box>
          )}
        </Column>
      </Grid>
    </Box>
  );
};

export default CheckoutSummary;
