import { Box, Button, Flex, Heading, Stack, Text } from "@twilio-paste/core";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { ICartItem, ICartTotals } from "../../Global.types";
import useCart from "../../hooks/useCart";

const RightPane = () => {
  const router = useRouter();
  const cart = useCart();
  const [cartTotals, setCartTotals] = useState<ICartTotals>();

  const gotoCheckout = useCallback(() => {
    router.push("/CheckoutView");
  }, [router]);

  useEffect(() => {
    if (cart) {
      const subtotal = cart.reduce(
        (total: number, curr: ICartItem) =>
          total + parseFloat(curr.product.price),
        0.0
      );
      const tax = subtotal * 0.1;
      const shipping = subtotal * 0.13;
      const total = subtotal + tax + shipping;
      setCartTotals({ subtotal, tax, shipping, total });
    }
  }, [cart]);

  return (
    <Box width={536}>
      <Stack orientation={"vertical"} spacing="space50">
        <Heading as="h2" variant="heading20">
          Summary
        </Heading>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text as="p">Subtotal</Text>
          <Text as="p">${cartTotals?.subtotal.toFixed(2)}</Text>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text as="p">Estimated Shipping & Handling</Text>
          <Text as="p">${cartTotals?.shipping.toFixed(2)}</Text>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text as="p">Estimated Tax</Text>
          <Text as="p">${cartTotals?.tax.toFixed(2)}</Text>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text as="p">Total</Text>
          <Text as="p">${cartTotals?.total.toFixed(2)}</Text>
        </div>
        <hr style={{ marginBottom: 50 }} />
      </Stack>
      <Stack orientation="vertical" spacing="space50">
        <Flex hAlignContent="center" paddingTop="space50">
          <Stack orientation="vertical" spacing="space50">
            <Box width={335}>
              <Button fullWidth variant="primary" onClick={gotoCheckout}>
                Checkout
              </Button>
            </Box>
            <Box width={335}>
              <Button fullWidth variant="secondary">
                Paypal
              </Button>
            </Box>
            <Box width={335}>
              <Button fullWidth variant="secondary">
                Apple Pay
              </Button>
            </Box>
            <Box width={335}>
              <Button fullWidth variant="secondary">
                Google Pay
              </Button>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};
export default RightPane;
