import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Drawer from "../components/Drawer";
import Orders from "../pages/Orders";
import { CartContext } from "../context/CartContext";
import Timeline from "../components/Timeline";

export default function Products() {
  const { placed } = useContext(CartContext)
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      <div className="flex-1 p-4">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {filtered.length === 0 && (
          <p className="text-gray-500 text-center mt-10">No products found</p>
        )}

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {placed &&
        <>
          <div className="md:w-100 w-full flex flex-col justify-start py-5 gap-6 items-center shadow-2xl">
            <h2 className="text-2xl">Track your order</h2>
            <Timeline />
          </div></>}
    </div>
  );
}
