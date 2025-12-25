import { createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [placed, setPlaced] = useState(false);


  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(p => p._id === product._id);

      if (exists) {
        return prev.map(p => p._id === product._id ? { ...p, qty: p.qty + 1 } : p)
      }

      return [...prev, { ...product, qty: 1 }]
    })
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalAmount, clearCart, removeFromCart, placed, setPlaced }}>
      {children}
    </CartContext.Provider>
  )
}