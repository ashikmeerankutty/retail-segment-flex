import {
  Box,
  Button,
  Card,
  Checkbox,
  Column,
  Flex,
  Grid,
  Heading,
  Input,
  Label,
  Text
  
} from "@twilio-paste/core";
import React, { useState } from "react";
import CheckoutSummary from "./CheckoutSummary";
import OTPForm from "./OTPForm";
import ThankYouView from "./ThankYouView";

const CheckoutContent = () => {
  const [showOtp, setShowOtp] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  const handleSignIn = () => {
    setShowOtp(old => !old);
    setShowSummary(old => !old);
  }

  const handlePlaceOrder = () => {
    setShowSummary(old => !old);
    setShowThankYou(old => !old);
  }

  return (
    <Box height={"80vh"} width={"100%"} className="checkout-content">
      {showOtp ? <OTPForm handleSignIn={handleSignIn}/> : <></>}
      {showSummary ? <CheckoutSummary handlePlaceOrder={handlePlaceOrder}/> : <></>}
      {showThankYou ? <ThankYouView/> : <></>}
    </Box>
  );
};

export default CheckoutContent;
