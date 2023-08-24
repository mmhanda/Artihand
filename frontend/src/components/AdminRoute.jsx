import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {

  const { userInfo } = useSelector((state) => state.auth);
  return ( userInfo && userInfo.isAdmin? <Outlet/> : <Navigate to="/login" replace /> ); //replace is to replace ant pass hitory like if we was in the shipping it will clear that history
};

export default AdminRoute;