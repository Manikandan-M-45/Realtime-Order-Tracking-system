import { useState } from "react";
import CartSummary from "./CartSummary";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2 m-2 text-gray-800 bg-gray-200 rounded-md">
        Cart
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={`fixed top-0 right-0 h-full w-96 bg-white z-50 transform
        ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg flex flex-col`}>
        
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <CartSummary closeDrawer={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default Drawer;
