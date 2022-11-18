import { Box } from "@twilio-paste/core";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SyncMapItem } from "twilio-sync";
import { CartProduct } from "../../Global.types";
import { getBaseUrl } from "../../util";
import CheckoutSummary from "./CheckoutSummary";
import OTPForm from "./OTPForm";
import ThankYouView from "./ThankYouView";
import Modal from "react-modal";
import { setWithExpiry } from "./helpers";

export interface CheckoutContentProps {
  setShowNavOnly: Dispatch<SetStateAction<boolean>>;
}

const customStyles = {
  content: {
    top: "40%",
    left: "auto",
    right: "39%",
    bottom: "auto",
    width: "auto",
    marginTop: "auto",
    marginRight: "auto",
  },
  overlay: {
    zIndex: 2, //without this, the cart badge will show thru the modal.
    backgroundColor: "rgb(0,0,0,0.75)",
  },
};

const CheckoutContent = ({ setShowNavOnly }: CheckoutContentProps) => {
  const [showOtp, setShowOtp] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [orderedItems, setOrderedItems] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  useEffect(() => {
    const getCartItems = async () => {
      const data = await fetch(getBaseUrl() + "/website/cart");
      const itemsJson = await data.json();
      const products = itemsJson.result.map(
        (mapItem: SyncMapItem) => mapItem.data
      );
      setOrderedItems(products);
    };

    try {
      getCartItems();
    } catch (err) {
      console.log("No more sync items found: ", err);
    }
  }, []);
  
  const handleSignIn = async (code: string) => {
    try {
      const resp = await fetch(getBaseUrl() + "/website/one-time-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "check",
          code,
        }),
      }).then((res) => res.json());

      const errorStatus = resp.error;
      if (errorStatus) {
        setModalMessage(resp.errorObject);
        setIsOpen(true);
      } else {
        if (resp.result.status === "pending") {
          setModalMessage("Incorrect code entered");
          setIsOpen(true);
        } else if (resp.result.status === "approved") {
          setWithExpiry("verify", code, 300000);
          setShowOtp((old) => !old);
          setShowSummary((old) => !old);
        }
      }
    } catch (err) {
      console.log("err", err);
      setModalMessage("Password expired, sending another password");
      setIsOpen(true);
      fetch(getBaseUrl() + "/website/one-time-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "verify",
        }),
      });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
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
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Box>{modalMessage}</Box>
      </Modal>
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
