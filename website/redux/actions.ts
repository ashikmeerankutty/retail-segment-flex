import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { ICartItem, IProduct } from "../Global.types";
import { getBaseUrl } from "../util";

export const getSegmentCredentials = createAsyncThunk(
  "Get Segment Credentials",
  async (_params, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${getBaseUrl()}/website/segment`).then(
        (resp) => resp.data.result
      );
      if (!res) return rejectWithValue("Request failed");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getProducts = createAsyncThunk(
  "Get Products",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${getBaseUrl()}/website/products`).then(
        (resp) => resp.data.result
      );
      if (!res) return rejectWithValue("Request failed");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSyncToken = createAsyncThunk(
  "Get Sync Token",
  async (_param, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${getBaseUrl()}/website/sync-token`, {
        token: "<not_implemented>",
      }).then((resp) => resp.data.result);
      if (!res) return rejectWithValue("Request failed");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCart = createAsyncThunk<ICartItem[], void>(
  "Get Cart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${getBaseUrl()}/website/cart`).then(
        (resp) => resp.data.result
      );
      if (!res) return rejectWithValue("Request failed");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
