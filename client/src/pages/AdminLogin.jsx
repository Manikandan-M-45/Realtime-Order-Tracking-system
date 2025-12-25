import { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = () => {
    if (form.username === "admin" && form.password === "123") {
      login({ username: "admin", role: "admin" });
      localStorage.setItem("role", "admin");
      toast.success("Logged in as Admin!");
      navigate("/admin/orders");
    } else if (form.username === "staff" && form.password === "staff123") {
      login({ username: "staff", role: "staff" });
      localStorage.setItem("role", "staff");
      toast.success("Logged in as Staff!");
      navigate("/admin/orders");
    } else {
      toast.error("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="bg-orange-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
