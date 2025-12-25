import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

export default function CartSummary({ closeDrawer }) {
  const { cart, totalAmount, removeFromCart, clearCart } = useContext(CartContext);

  if (cart.length === 0) return <p className="p-4 text-gray-500">Cart is empty</p>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.map(item => (
          <div key={item._id} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.name} × {item.qty}</p>
              <p className="text-gray-500 text-sm">₹{item.price * item.qty}</p>
            </div>
            <button
              onClick={() => {
                removeFromCart(item._id);
                toast.info(`${item.name} removed from cart`);
              }}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex flex-col gap-3">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
        <button
          onClick={() => {
            closeDrawer();
            window.location.href = "/checkout";
          }}
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
        >
          Go to Checkout
        </button>
        <button
          onClick={() => clearCart()}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
