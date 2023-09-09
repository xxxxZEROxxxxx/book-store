import BooksTab from "../components/Content/BooksTab";
import Side from "../components/Content/Side";
import { ShowHeader } from "../redux/HideSlice";
import { useAppDispatch } from "../redux/store";

const Home = () => {
  const dispatch = useAppDispatch();

  dispatch(ShowHeader());

  return (
    <div>
      <h1 className="text-center">Welcome to the home page</h1>
      <br />

      <div className="row">
        <div className="col-1 col-md-4">
          <Side />
        </div>
        <div className="col-11 col-md-8 ">
          <BooksTab />
        </div>
      </div>
    </div>
  );
};

export default Home;
