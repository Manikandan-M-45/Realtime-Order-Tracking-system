import { useEffect, useState } from "react";
import api from "../api/axios";
import { socket } from "../context/SocketContext";

const stages = ["Placed", "Accepted", "Packed", "Out for Delivery", "Delivered"];

export default function Timeline() {
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    api.get("/orders")
      .then(res => {
        const orders = res.data;
        if (orders.length > 0) {
          setLatestOrder(orders[orders.length - 1]);
        }
      })
      .catch(err => console.error("Failed to fetch orders:", err));

    const handleStatusUpdate = (updatedOrder) => {
      setLatestOrder(prev =>
        prev && prev._id === updatedOrder._id ? updatedOrder : prev
      );
    };

    socket.on("orderStatusUpdated", handleStatusUpdate);

    return () => {
      socket.off("orderStatusUpdated", handleStatusUpdate);
    };
  }, []);

  if (!latestOrder) {
    return (
      <p className="text-gray-500 text-center mt-10">
        Loading order timeline...
      </p>
    );
  }

  return (
    <div className="w-100 mx-auto bg-white rounded-xl shadow p-6">
      <h2>Arrives in 30 mins</h2>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Order #{latestOrder.orderNumber}
      </h2>
      <p className="text-sm font-semibold mb-6">
        Total: ₹{latestOrder.totalAmount}
      </p>

      <div className="relative">
        <div className="absolute left-5 top-0 w-1 bg-gray-300 h-full"></div>

        <div className="space-y-8">
          {stages.map((stage, idx) => {
            const isCompleted = stages.indexOf(latestOrder.status) > idx;
            const isCurrent = latestOrder.status === stage;

            return (
              <div key={idx} className="flex items-start gap-4 relative">
                <div className="relative z-10">
                  <span
                    className={`block w-4 h-4 rounded-full 
                      ${isCurrent ? "bg-blue-500 animate-pulse" : isCompleted ? "bg-green-500" : "bg-gray-300"}`}
                  ></span>
                </div>

                {/* Label */}
                <div>
                  <p className={`text-sm font-medium ${isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500"}`}>
                    {stage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Items */}
      <div className="border-t pt-4 mt-6 space-y-2">
        {latestOrder.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm text-gray-700">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
