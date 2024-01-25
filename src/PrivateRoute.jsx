import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";

const PrivateRoute = () => {
   const { auth } = useAuth();
   if (auth === undefined) return <Loading />;
   return auth === true ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
