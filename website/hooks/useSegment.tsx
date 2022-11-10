import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSegmentCredentials } from "../public/redux/actions";
import { segmentCredentialsSelector } from "../public/redux/selectors";
import { useAppDispatch } from "../public/redux/store";

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
