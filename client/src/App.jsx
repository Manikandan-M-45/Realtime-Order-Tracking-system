import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AdminRoute from "./routes/AdminRoute";
import ManageProduct from "./pages/ManageProduct";

const Products = lazy(() => import("./pages/Products"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Orders = lazy(() => import("./pages/Orders"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          {/* Common routes */}
          <Route path="/" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<Orders />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product"
            element={
              <AdminRoute>
                <ManageProduct />
              </AdminRoute>
            }
          />
        </Routes>
         <ToastContainer position="top-right" autoClose={3000} />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
