import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

export default function AdminRoute({ children }) {
  const { admin } = useContext(AdminContext);

  if (!admin) return <Navigate to="/admin/login" />;

  return children;
}
