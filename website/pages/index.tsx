import Footer from "../components/Footer";
import { fetchPosts } from "../redux/actions";
import { useAppDispatch } from "../redux/store";

const Test = () => {
  const t = "d";
  const x = "d";
  const dispatch = useAppDispatch()
  return (
    <div onClick={(e)=>dispatch(fetchPosts())}>
      <span>test</span>
      <Footer />
    </div>
  );
};
export default Test;
