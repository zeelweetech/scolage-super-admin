import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";

const PrivateRoute = () => {
  const { auth } = useAuth();
  console.log("auth", auth);
  const token = localStorage.getItem("token")
  if (auth === undefined) return <Loading />;
  return token ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
