import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.hook";

export default function PrivateRoute() {
  const { authUser } = useAuth();
  return authUser ? <Outlet /> : <Navigate to="/signIn" />;
}
