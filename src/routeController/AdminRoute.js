import { Outlet } from "react-router-dom";
import NotFound from "../components/NotFound";

const AdminRoute = ({user}) => {
  console.log(user)
  return user?.type == 'Admin' ? <Outlet /> : <NotFound />;
};

export default AdminRoute;