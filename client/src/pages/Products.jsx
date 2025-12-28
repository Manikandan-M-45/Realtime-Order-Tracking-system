import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import Timeline from "../components/Timeline";
import ImageCarousel from "../components/ImageCarousel";
import { ProductContext } from "../context/ProductContext";
import { AdminContext } from "../context/AdminContext";

export default function Products() {
  const { placed } = useContext(CartContext)
  // const [products, setProducts] = useState([]);
  const { filteredProducts, search, setProducts } = useContext(ProductContext);
  const { admin } = useContext(AdminContext);

  // const { filteredProducts, setProducts, search } = useContext(ProductContext);


  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);



  return (
    <>
      {filteredProducts.length > 0 && !search && <ImageCarousel />}
      <h1 className="text-3xl font-bold text-center py-5">Explore Our <span className="text-orange-600">Products</span></h1>

      <div className="flex flex-wrap gap-5 justify-around lg:text-2xl m-5 text-center">
        <span className="inline-block w-fit flex-1 py-2 border border-orange-500 font-serif font-extrabold hover:bg-orange-600 hover:cursor-pointer hover:text-white text-orange-400 rounded-lg">Fashion</span><span className="inline-block w-fit flex-1 py-2 border border-orange-500 font-serif font-extrabold hover:bg-orange-600 hover:cursor-pointer hover:text-white text-orange-400 rounded-lg">Clothing</span><span className="inline-block w-fit flex-1 py-2 border border-orange-500 font-serif font-extrabold hover:bg-orange-600 hover:cursor-pointer hover:text-white text-orange-400 rounded-lg">Apparels</span><span className="inline-block w-fit flex-1 py-2 border border-orange-500 font-serif font-extrabold hover:bg-orange-600 hover:cursor-pointer hover:text-white text-orange-400 rounded-lg">Jewells</span><span className="inline-block w-fit flex-1 py-2 border border-orange-500 font-serif font-extrabold hover:bg-orange-600 hover:cursor-pointer hover:text-white text-orange-400 rounded-lg">Mens wear</span>
      </div>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

        <div className="flex-1 p-4">
          {filteredProducts.length === 0 && (
            <p className="text-gray-500 text-center mt-10">No products found</p>
          )}

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 flex-wrap md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product._id} imgIndex={index} product={product} />
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
    </>
  );
}
