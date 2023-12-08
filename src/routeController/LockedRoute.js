import { Navigate, Outlet } from "react-router-dom";
import NotFound from "../components/NotFound";

const LockedRoute = ({user}) => {
  return user? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default LockedRoute;