import {  Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { HideHeader } from "./redux/HideSlice";

const ProtectedRoute = () => {
    const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return <Outlet />;
  } else{ dispatch(HideHeader()); return <Navigate to={"/Login"}  /> }
};

export default ProtectedRoute;