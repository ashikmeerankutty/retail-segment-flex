import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCart, getProducts } from "../redux/actions";
import { cartSelector, productsSelector } from "../redux/selectors";
import { useAppDispatch } from "../redux/store";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { data, fetching, fetchingSuccess, fetchingFailure } =
    useSelector(cartSelector);

  useEffect(() => {
    if (!fetching && !fetchingSuccess && !fetchingFailure) {
      dispatch(getCart());
    }
  }, [fetching, fetchingSuccess, fetchingFailure, dispatch]);
  
  return data
};
export default useCart;
