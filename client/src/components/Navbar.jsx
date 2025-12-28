import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AdminContext } from "../context/AdminContext";
import { Menu, SidebarClose, ShoppingBag, LogOut, LogIn } from "lucide-react";
import Checkout from "../pages/Checkout";
import { toast } from "react-toastify";
import { ProductContext } from "../context/ProductContext";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const { admin, logout } = useContext(AdminContext);
  const { setSearch, search } = useContext(ProductContext);

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/", role: "user" },
    { name: "Orders", path: "/admin/orders", role: "admin" },
    { name: "Orders", path: "/admin/orders", role: "staff" },
    { name: "Products", path: "/admin/product", role: "admin" },
  ];

  const filteredLinks = navLinks.filter(link => admin?.role === link.role);

  const handleLogout = () => {
    toast.success("Logout success")
    logout(null);
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const handleLogin = () => {
    navigate("/admin/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-600">
            Ohoo
          </Link>

          {/* Search Bar */}
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {filteredLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700 hover:text-indigo-500"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {admin && (
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-red-500"
              >
                <LogOut className="w-5 h-5 mr-1" /> Logout
              </button>
            )}

            {!admin && <button
              onClick={handleLogin}
              className="flex items-center text-gray-700 hover:text-red-500 hover:cursor-pointer"
            >
              <LogIn className="w-5 h-5 mr-1" /> Login
            </button>}

            <button
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-indigo-500 hover:cursor-pointer" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Cart Drawer */}
            {isCartOpen && (
              <div className="fixed inset-0 z-40">
                <div
                  className="absolute inset-0 bg-black opacity-50"
                  onClick={() => setIsCartOpen(false)}
                ></div>
                <div className="absolute top-0 right-0 h-full w-96 bg-white shadow-lg p-4 overflow-y-auto">
                  <div className="flex justify-end">
                    <button onClick={() => setIsCartOpen(false)}>
                      <SidebarClose />
                    </button>
                  </div>
                  <Checkout />
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
              {isMobileOpen ? <SidebarClose /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {filteredLinks.map(link => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-semibold text-indigo-600"
                    : "block px-3 py-2 rounded-md text-base text-gray-700 hover:text-indigo-500"
                }
              >
                {link.name}
              </NavLink>
            ))}

            {admin && (
              <button
                onClick={() => { handleLogout(); setIsMobileOpen(false); }}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-red-500"
              >
                <LogOut className="w-5 h-5 mr-1" /> Logout
              </button>
            )}

            {/* Cart */}
            <button
              onClick={() => { setIsCartOpen(true); setIsMobileOpen(false); }}
              className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-500"
            >
              <ShoppingBag className="w-6 h-6 mr-2" />
              Cart ({cart.length})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
