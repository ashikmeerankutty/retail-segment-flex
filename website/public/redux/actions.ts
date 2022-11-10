import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { getBaseUrl } from "../../util";

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

export const getImageTest = createAsyncThunk<string, { names: string[] }>(
  "Get Image Test",
  async (params, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`${getBaseUrl()}/website/images`, {
        names: params.names,
      }).then((resp) => resp.data.result);
      if (!res) return rejectWithValue("Request failed");
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
