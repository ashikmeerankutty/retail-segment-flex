import { RootState } from "./store";

export const segmentCredentialsSelector = (state:RootState) => state.segmentCredentials
export const productsSelector = (state:RootState) => state.products
export const syncTokenSelector = (state:RootState) => state.syncToken
