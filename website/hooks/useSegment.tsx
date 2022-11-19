import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSegmentCredentials } from "../redux/actions-segment";
import { segmentCredentialsSelector } from "../redux/selectors";
import { useAppDispatch } from "../redux/store";

const useSegment = () => {
  const dispatch = useAppDispatch();
  const { fetching, fetchingSuccess, fetchingFailure } = useSelector(
    segmentCredentialsSelector
  );

  useEffect(() => {
    if (!fetching && !fetchingSuccess && !fetchingFailure) {
      dispatch(getSegmentCredentials());
    }
  }, [fetching, fetchingSuccess, fetchingFailure, dispatch]);
};
export default useSegment;
