import { Box } from "@twilio-paste/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SyncMapItem } from "twilio-sync";
import { CartProduct } from "../../Global.types";
import { getBaseUrl } from "../../util";
import CheckoutSummary from "./CheckoutSummary";
import OTPForm from "./OTPForm";
import ThankYouView from "./ThankYouView";

export interface CheckoutContentProps {
  setShowNavOnly: Dispatch<SetStateAction<boolean>>;
}

const CheckoutContent = ({ setShowNavOnly }: CheckoutContentProps) => {
  const [showOtp, setShowOtp] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [orderedItems, setOrderedItems] = useState<CartProduct[]>([]);

  useEffect(() => {
    const getCartItems = async () => {
      const data = await fetch(getBaseUrl() + "/website/cart");
      const itemsJson = await data.json();
      console.log(itemsJson, "rsult baby");
      const products = itemsJson.result.map((mapItem: SyncMapItem) => mapItem.data);
      console.log(products[0], "products");
      setOrderedItems(products);
    }

    try {
      getCartItems();
    } catch (err) {
      console.log("No more sync items found: ", err);
    }
  }, []);

  const handleSignIn = () => {
    setShowOtp((old) => !old);
    setShowSummary((old) => !old);
    //setShowNavOnly(old => !old);
  };

  const handlePlaceOrder = () => {
    setShowSummary((old) => !old);
    setShowThankYou((old) => !old);
  };

  return (
    <Box
      marginTop={"space80"}
      height={"100%"}
      width={"100%"}
      className="checkout-content"
    >
      {showOtp ? <OTPForm handleSignIn={handleSignIn} /> : <></>}
      {showSummary ? (
        <CheckoutSummary
          handlePlaceOrder={handlePlaceOrder}
          orderedItems={orderedItems}
        />
      ) : (
        <></>
      )}
      {showThankYou ? <ThankYouView orderedItems={orderedItems} /> : <></>}
    </Box>
  );
};

export default CheckoutContent;
