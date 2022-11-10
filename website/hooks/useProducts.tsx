import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../public/redux/actions";
import { productsSelector } from "../public/redux/selectors";
import { useAppDispatch } from "../public/redux/store";

const useProducts = () => {
  const dispatch = useAppDispatch();
  const { fetching, fetchingSuccess, fetchingFailure } = useSelector(
    productsSelector
  );

  useEffect(() => {
    if (!fetching && !fetchingSuccess && !fetchingFailure) {
      dispatch(getProducts());
    }
  }, [fetching, fetchingSuccess, fetchingFailure, dispatch]);
};
export default useProducts;
