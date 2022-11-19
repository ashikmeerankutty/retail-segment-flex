import { createAsyncThunk } from "@reduxjs/toolkit";
import { AnalyticsBrowser } from "@segment/analytics-next";
import Axios from "axios";
import { getBaseUrl } from "../util";
import { RootState } from "./store";

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

export const segmentTrackAction = createAsyncThunk<
  void,
  { eventName: string; properties: any }
>("Segment Track Action", async (params, { getState, rejectWithValue }) => {
  try {
    const { eventName, properties } = params;
    const { writeKey } = (getState() as RootState).segmentCredentialsState.data;
    if (writeKey) {
      const analytics = AnalyticsBrowser.load({ writeKey });
      analytics.track(eventName, {
        ...properties,
      });
    }
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const segmentIdentifyAction = createAsyncThunk<void, { id: string }>(
  "Segment Identify Event Action",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { id } = params;
      const { writeKey } = (getState() as RootState).segmentCredentialsState
        .data;
      if (writeKey) {
        const analytics = AnalyticsBrowser.load({ writeKey });
        analytics.identify(id);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const segmentPageEvent = createAsyncThunk<
  void,
  { name: string; page: string; title: string }
>(
  "Segment Page Event Action",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { name, page, title } = params;
      const { writeKey } = (getState() as RootState).segmentCredentialsState
        .data;
      if (writeKey) {
        const analytics = AnalyticsBrowser.load({ writeKey });
        analytics.page(page, name, { title });
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);