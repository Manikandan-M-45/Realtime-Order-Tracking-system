import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../context/SocketContext";
import api from "../api/axios";

export default function Orders() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error("Failed to fetch order:", err));

    const handleStatusUpdate = (updatedOrder) => {
      if (updatedOrder._id === id) {
        setOrder(updatedOrder);
      }
    };

    socket.on("orderStatusUpdated", handleStatusUpdate);

    return () => {
      socket.off("orderStatusUpdated", handleStatusUpdate);
    };
  }, [id]);

  if (!order) return <p className="text-gray-500 text-center mt-10">Loading order...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Ref Number: <span className="text-indigo-600">{order.orderNumber}</span></h2>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        Status:
        <span className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full animate-pulse
      ${order.status === "Placed" ? "bg-yellow-500" :
              order.status === "Accepted" ? "bg-blue-500" :
                order.status === "Packed" ? "bg-purple-500" :
                  order.status === "Out for Delivery" ? "bg-orange-500" :
                    order.status === "Delivered" ? "bg-green-500" :
                      "bg-gray-500"
            }`}>
          </span>
          <span className={`px-2 py-1 rounded 
      ${order.status === "Placed" ? "bg-yellow-200 text-yellow-800" :
              order.status === "Accepted" ? "bg-blue-200 text-blue-800" :
                order.status === "Packed" ? "bg-purple-200 text-purple-800" :
                  order.status === "Out for Delivery" ? "bg-orange-200 text-orange-800" :
                    order.status === "Delivered" ? "bg-green-200 text-green-800" :
                      "bg-gray-200 text-gray-800"
            }`}>
            {order.status}
          </span>
        </span>
      </h3>


      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Customer Details</h4>
        <p className="text-gray-600">
          <strong>Name:</strong> {order.customer.name} <br />
          <strong>Phone:</strong> {order.customer.phone} <br />
          <strong>Address:</strong> {order.customer.address}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Order Items</h4>
        {order.items && order.items.length > 0 ? (
          <ul className="list-disc list-inside text-gray-600">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - Qty: {item.quantity} - ₹{item.price}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items in this order.</p>
        )}
      </div>

      <div className="mt-4 text-gray-800 font-semibold">
        Total Amount: ₹{order.totalAmount}
      </div>
    </div>
  );
}
