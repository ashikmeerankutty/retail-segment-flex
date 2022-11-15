import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSyncToken } from "../redux/actions";
import { syncTokenSelector } from "../redux/selectors";
import { useAppDispatch } from "../redux/store";
import { SyncClient } from "twilio-sync";

const useSyncClient = () => {
  const [syncClient, setSyncClient] = useState<SyncClient>();
  const dispatch = useAppDispatch();
  const {
    fetching,
    fetchingFailure,
    fetchingSuccess,
    data: tokenData,
  } = useSelector(syncTokenSelector);

  useEffect(() => {
    if (!fetching && !fetchingFailure && !fetchingSuccess) {
      dispatch(getSyncToken());
    }
  }, [dispatch, fetching, fetchingFailure, fetchingSuccess]);

  useEffect(() => {
    if (!!tokenData.token) {
      const client = new SyncClient(tokenData.token, { logLevel: "debug" });
      setSyncClient(client);
    }
  }, [tokenData.token]);

  return syncClient;
};
export default useSyncClient;
