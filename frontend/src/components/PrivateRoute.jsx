import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default PrivateRoute;
