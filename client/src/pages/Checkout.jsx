import { useContext, useState } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  const { cart, totalAmount, clearCart, removeFromCart, setPlaced } = useContext(CartContext);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const placeOrder = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      toast.error("Please fill all details");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const order = {
      customer,
      items: cart.map(item => ({
        productId: item._id,
        quantity: item.qty,
        price: item.price
      })),
      totalAmount
    };

    try {
      const res = await api.post("/orders", order);
      clearCart();
      setPlaced(true);
      toast.success("Order placed successfully!");
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-5">

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Checkout
        </h2>

        {/*Cart*/}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          {cart.map(item => (
            <div key={item._id} className="flex justify-between items-center text-sm">
              <div>
                <span>{item.name} × {item.qty}</span> <br />
                <span className="text-gray-500 text-xs">₹{item.price * item.qty}</span>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                -
              </button>
            </div>
          ))}

          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={e => setCustomer({ ...customer, name: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={e => setCustomer({ ...customer, phone: e.target.value })}
          />

          <textarea
            placeholder="Delivery Address"
            rows="3"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={e => setCustomer({ ...customer, address: e.target.value })}
          />
        </div>

        <button
          onClick={placeOrder}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
