import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col gap-3">
      <div className="w-50 h-50 m-auto">

        <img
          src={product.imageUrl ? product.imageUrl : "https://static.vecteezy.com/system/resources/previews/048/910/778/original/default-image-missing-placeholder-free-vector.jpg"}
          alt={product.name}
          className="object-contain w-full h-full"
        />
      </div>


      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

      <p className="text-xl font-bold text-orange-600">₹{product.price}</p>

      <p
        className={`text-sm inline-block p-2 w-fit rounded-lg text-white font-medium ${product.stock > 0 ? "bg-green-700" : "bg-red-600"
          }`}
      >
        {product.stock > 0 ? "Available" : "Out of stock"}
      </p>

      <button
        disabled={product.stock === 0}
        onClick={handleAddToCart}
        className={`mt-auto py-2 rounded-lg font-medium text-white transition-all ${product.stock > 0
          ? "bg-orange-500 hover:bg-orange-600 active:scale-95"
          : "bg-gray-300 cursor-not-allowed"
          } hover:cursor-pointer`}
      >
        Add to Cart
      </button>
    </div>
  );
}
