import { Box } from "@twilio-paste/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Paginator, SyncMapItem } from "twilio-sync";
import { IProduct } from "../../Global.types";
import useSyncClient from "../../hooks/useSyncClient";
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
  const [orderedItems, setOrderedItems] = useState<IProduct[]>([]);
  const syncClient = useSyncClient();

  useEffect(() => {
    try {
      const pageHandler = async (paginator: Paginator<SyncMapItem>): Promise<IProduct> => {
        paginator.items.forEach((item: SyncMapItem) => {
          console.log(`SyncMapItem ${item.key}: `, item.data);
          setOrderedItems(old => [...old, item.data as IProduct]);
        });
        return await paginator.nextPage().then(pageHandler)
      };
      if (syncClient) {
        syncClient.map("Cart").then(async (map) => {
          const mapItems = await map.getItems().then(pageHandler).catch((error) => {
            console.log("Error: ", error);
          });
          console.log("item", mapItems);
        });
      }
    } catch (err) {
      console.log("No more sync items found: ", err)
    }
  }, [syncClient]);

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
        <CheckoutSummary handlePlaceOrder={handlePlaceOrder} orderedItems={orderedItems}/>
      ) : (
        <></>
      )}
      {showThankYou ? <ThankYouView orderedItems={orderedItems}/> : <></>}
    </Box>
  );
};

export default CheckoutContent;
