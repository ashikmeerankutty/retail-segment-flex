import { Box, Flex } from "@twilio-paste/core";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeftPane from "../components/ProductView/LeftPane";
import RightPane from "../components/ProductView/RightPane";
import useSegment from "../hooks/useSegment";
import useWebchat from "../hooks/useWebchat";
import Modal from "react-modal";
import { useEffect, useMemo, useState } from "react";
import CartModal from "../components/CartModal";
import { useSelector } from "react-redux";
import { productsSelector } from "../redux/selectors";
import { useAppDispatch } from "../redux/store";
import { useRouter } from "next/router";
import { getProducts } from "../redux/actions";
import { IProduct } from "../Global.types";
import useSyncClient from "../hooks/useSyncClient";
import LoadingIcons from "react-loading-icons";

const customStyles = {
  content: {
    top: "auto",
    left: "auto",
    right: "50%",
    bottom: "auto",
    marginTop: "1%",
    marginRight: "-49%",
  },
  overlay: {
    zIndex: 2, //without this, the cart badge will show thru the modal.
    backgroundColor: "rgb(0,0,0,0.75)",
  },
};

const ProductView = () => {
  useSegment();
  useWebchat();
  const syncClient = useSyncClient();

  const {
    data,
    fetching: fetchingProducts,
    fetchingFailure: fetchingProductsFailure,
    fetchingSuccess: fetchingProductsSuccess,
  } = useSelector(productsSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>();

  useEffect(() => {
    if (
      !fetchingProducts &&
      !fetchingProductsFailure &&
      !fetchingProductsSuccess
    ) {
      dispatch(getProducts());
    }
  }, [
    dispatch,
    fetchingProducts,
    fetchingProductsFailure,
    fetchingProductsSuccess,
  ]);

  const product = useMemo(() => {
    if (data.length > 0) {
      return data.find(
        (p: IProduct) => p.id.toString() === router.query.productId
      );
    }
  }, [data, router.query.productId]);

  const [modalIsOpen, setIsOpen] = useState(false);

  //Modal.setAppElement('#root');

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        zIndex: 3,
      }}
    >
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CartModal
          onClose={(e) => setIsOpen(false)}
          product={product}
          productArgs={{ size: selectedSize ?? "Unknown" }}
        />
      </Modal>
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
          vAlignContent={fetchingProductsSuccess ? undefined : "center"}
        >
          {fetchingProductsSuccess ? (
            <>
              <LeftPane product={product} />
              <RightPane
                onCheckout={(size) => {
                  setIsOpen(true);
                  setSelectedSize(size);
                  syncClient?.map("Cart").then((map) => {
                    const d = Date.now();
                    map.set(`item-${d}`, { product, size }, { ttl: 7200 }); //2 hours
                  });
                }}
                product={product}
              />
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
export default ProductView;
