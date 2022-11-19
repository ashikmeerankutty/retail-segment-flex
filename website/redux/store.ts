import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createReducer from "redux-toolkit-asyncthunk-wrapper";
import { getCart, getProducts, getSyncToken } from "./actions";
import { getSegmentCredentials } from "./actions-segment";

const asyncThunkCollection = [
  {
    stateName: "segmentCredentials",
    asyncThunk: getSegmentCredentials,
    options: {
      initialState: "",
    },
  },
  {
    stateName: "products",
    asyncThunk: getProducts,
  },
  {
    stateName: "syncToken",
    asyncThunk: getSyncToken,
  },
  {
    stateName: "cart",
    asyncThunk: getCart,
  },
];
const reducer = createReducer(asyncThunkCollection);
const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof reducer>;
export default store;
