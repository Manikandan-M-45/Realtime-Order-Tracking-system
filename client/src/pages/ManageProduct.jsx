import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageProduct() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    if (role !== "admin") navigate("/admin/orders");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  const validate = () => {
    if (!form.name.trim()) return "Product name is required";
    if (Number(form.price) <= 0) return "Price must be greater than 0";
    if (Number(form.stock) < 0) return "Stock cannot be negative";
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", form);
        toast.success("Product added successfully");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", stock: "" });
    setEditingId(null);
  };

  const editProduct = product => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock
    });
  };

  const deleteProduct = async id => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Product Management</h2>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Product Name"
            className="border rounded p-2"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Price"
            type="number"
            className="border rounded p-2"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Stock Quantity"
            type="number"
            className="border rounded p-2"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="border rounded p-2 md:col-span-2"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="border px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="bg-white shadow rounded-lg">
        {products.length === 0 ? (
          <p className="p-6 text-gray-500">No products found</p>
        ) : (
          products.map(p => (
            <div
              key={p._id}
              className="flex justify-between items-center border-b p-4 last:border-none"
            >
              <div>
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p className="text-sm mt-1">
                  ₹{p.price} · Stock: {p.stock}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => editProduct(p)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
