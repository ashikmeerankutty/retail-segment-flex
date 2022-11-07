import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createReducer from "redux-toolkit-asyncthunk-wrapper";
import { fetchPosts, fetchTodos } from "./actions";

const asyncThunkCollection = [
  {
    stateName: "todos",
    asyncThunk: fetchTodos,
    options: {
      payloadTransformer: (payload: any) => {
        console.log("I can modify the payload from a successful promise here.");
        return { count: payload.length };
      },
      initialState: [],
    },
  },
  {
    stateName: "posts",
    asyncThunk: fetchPosts,
    options: {},
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
