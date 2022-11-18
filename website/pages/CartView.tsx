import { Box, Flex } from "@twilio-paste/core";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftPane from "../components/CartView/LeftPane";
import RightPane from "../components/CartView/RightPane";
import useSegment from "../hooks/useSegment";
import useWebchat from "../hooks/useWebchat";
import Modal from "react-modal";
import { useEffect, useMemo, useState } from "react";
import CartModal from "../components/CartModal";
import { useSelector } from "react-redux";
import { cartSelector, productsSelector } from "../redux/selectors";
import { useAppDispatch } from "../redux/store";
import { useRouter } from "next/router";
import { getProducts } from "../redux/actions";
import { IProduct } from "../Global.types";
import useSyncClient from "../hooks/useSyncClient";
import LoadingIcons from "react-loading-icons";
import useCart from "../hooks/useCart";

const CartView = () => {
  useSegment();
  useWebchat();
  useCart();

  const { fetchingSuccess } = useSelector(cartSelector);

  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        zIndex: 3,
      }}
    >
      <Flex>
        <Box width="100%">
          <Header />
        </Box>
      </Flex>
      <Flex grow paddingTop="space60">
        <Flex
          grow
          hAlignContent="center"
          height="100%"
          vAlignContent={fetchingSuccess ? undefined : "center"}
        >
          {fetchingSuccess ? (
            <>
              <LeftPane />
              <RightPane />
            </>
          ) : (
            <Box>
              <LoadingIcons.Puff
                stroke="#0263E0"
                strokeOpacity={0.125}
                speed={0.75}
              />
            </Box>
          )}
        </Flex>
      </Flex>
      <Flex>
        <Box width="100%">
          <Footer />
        </Box>
      </Flex>
    </div>
  );
};
export default CartView;
