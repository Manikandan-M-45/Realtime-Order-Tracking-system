import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { socket } from "../context/SocketContext";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoCard from "../components/InfoCard";
import { CalendarCheck, CalendarCheck2, ClipboardClock, Package, Van } from "lucide-react";

const stages = ["Placed", "Accepted", "Packed", "Out for Delivery", "Delivered"];

export default function AdminDashboard() {
  const { admin } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewOrder, setViewOrder] = useState(null);

  const ordersStyle = {
    backgroundColor: "orange",
    color: "White"
  }
  const deliveredStyle = {
    backgroundColor: "green",
    color: "White"
  }
  const pendingStyle = {
    backgroundColor: "red",
    color: "White"
  }
  const ofdStyle = {
    backgroundColor: "blue",
    color: "White"
  }

  useEffect(() => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => toast.error("Failed to fetch orders"));

    const handleStatusUpdate = (updatedOrder) => {
      setOrders(prev =>
        prev.map(order => order._id === updatedOrder._id ? updatedOrder : order)
      );
    };

    const handleNewOrder = (order) => {
      setOrders(prev => {
        const exists = prev.some(o => o._id === order._id);
        if (exists) return prev;
        return [...prev, order];
      });
    };
    socket.on("orderStatusUpdated", handleStatusUpdate);
    socket.on("newOrderPlaced", handleNewOrder);

    return () => {
      socket.off("orderStatusUpdated", handleStatusUpdate);
      socket.off("newOrderPlaced", handleNewOrder);
    };
  }, []);

  const updateStatus = (orderId, status) => {
    api.put(`/orders/${orderId}/status`, { status })
      .then(res => {
        setOrders(prev =>
          prev.map(order => order._id === orderId ? res.data : order)
        );
        // socket.emit("orderStatusUpdated", res.data);
        toast.success(`Order #${res.data.orderNumber} status updated to ${status}`);
      })
      .catch(err => toast.error("Failed to update status"));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(search.toLowerCase())
      || order.orderNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
  const sortOrder = filteredOrders.reverse();
  const totalOrders = orders.length;
  const delivered = orders.filter(o => o.status === "Delivered")
  const pending = orders.filter(o => o.status !== "Delivered" && o.status !== "Out for Delivery")
  const outforDelivery = orders.filter(o => o.status === "Out for Delivery")

  console.log(delivered)
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-orange-400 leading-10 py-3 font-serif">Welcome Admin,<p> You have to visit the orders and their statuses</p></h1>
      {/* <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Orders</h2> */}
      <div className="flex flex-wrap gap-5 my-5">
        <InfoCard status="Orders" count={totalOrders} icon={<Package size={54} />} styles={ordersStyle} />
        <InfoCard status="Delivered" count={delivered.length} icon={<CalendarCheck2 size={54} />} styles={deliveredStyle} />
        <InfoCard status="Out for Delivery" count={outforDelivery.length} icon={<Van size={54} />} styles={ofdStyle} />
        <InfoCard status="pending" count={pending.length} icon={<ClipboardClock size={54} />} styles={pendingStyle} />
      </div>
      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by customer or order #"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded w-60"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">All Statuses</option>
          {stages.map(stage => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Order #</th>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Update Status</th>
                <th className="py-2 px-4 text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {sortOrder.map(order => (
                <tr key={order._id} className="border-t">
                  <td className="py-2 px-4">{order.orderNumber}</td>
                  <td className="py-2 px-4">{order.customer.name}</td>
                  <td className="py-2 px-4">₹{order.totalAmount}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded ${order.status === "Placed" ? "bg-yellow-200 text-yellow-800" :
                      order.status === "Accepted" ? "bg-blue-200 text-blue-800" :
                        order.status === "Packed" ? "bg-purple-200 text-purple-800" :
                          order.status === "Out for Delivery" ? "bg-orange-200 text-orange-800" :
                            order.status === "Delivered" ? "bg-green-200 text-green-800" :
                              "bg-gray-200 text-gray-800"
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => setViewOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-auto py-10">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative transition-all">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setViewOrder(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Order #{viewOrder.orderNumber}</h3>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700">Customer Details</h4>
              <p className="text-gray-600">
                <strong>Name:</strong> {viewOrder.customer.name} <br />
                <strong>Phone:</strong> {viewOrder.customer.phone} <br />
                <strong>Address:</strong> {viewOrder.customer.address}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700">Order Items</h4>
              {viewOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-700 text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 font-semibold text-gray-800">
              Total Amount: ₹{viewOrder.totalAmount}
            </div>
            <div className="mt-2 text-gray-700">
              <strong>Status:</strong> {viewOrder.status}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
