
export default {}

/* import { configureStore } from "@reduxjs/toolkit";
import createReducer from "redux-toolkit-asyncthunk-wrapper"
import { fetchPosts, fetchTodos } from "./actions";

const asyncThunkCollection = [
  {
    stateName: "todos",
    asyncThunk: fetchTodos,
    options: {
      payloadTransformer: (payload) => {
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

export default configureStore({
  reducer: createReducer(asyncThunkCollection),
}); */